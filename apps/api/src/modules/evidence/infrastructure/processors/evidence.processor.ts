import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { IEvidenceRepository } from '../../domain/repositories/evidence.repository.interface';
import { IAIGradingProvider } from '../../../ai/domain/providers/ai-provider.interface';
import { IEventBus } from '../../../../common/core/event-bus.interface';
import { AIGradingCompletedEvent } from '../../domain/events/ai-grading-completed.event';
import { SubmissionStatus } from '@digvos/database';

@Processor('evidence-processing')
export class EvidenceProcessor extends WorkerHost {
  private readonly logger = new Logger(EvidenceProcessor.name);

  constructor(
    @Inject('IEvidenceRepository')
    private readonly evidenceRepository: IEvidenceRepository,
    @Inject('IAIGradingProvider')
    private readonly aiGradingProvider: IAIGradingProvider,
    @Inject('IEventBus')
    private readonly eventBus: IEventBus,
  ) {
    super();
  }

  async process(job: Job<any>): Promise<any> {
    const { submissionId, fileUrl, competencyId, tenantId } = job.data;
    this.logger.log(`Processing evidence grading job: ${job.id} for submission: ${submissionId}`);

    try {
      // 1. Fetch submission details
      const submission = await this.evidenceRepository.findSubmissionById(submissionId);
      if (!submission) {
        this.logger.warn(`Submission with ID '${submissionId}' not found.`);
        return;
      }

      // Update status to PROCESSING during execution
      await this.evidenceRepository.updateSubmission(submissionId, {
        status: SubmissionStatus.PROCESSING,
      });

      // 2. Fetch competency and criteria
      const competency = await this.evidenceRepository.findCompetencyById(competencyId);
      const criteria = competency?.description || 'Hãy đánh giá năng lực công nghệ thông tin tương ứng.';

      // 3. Extract text content from file
      const textContent = await this.extractTextContent(fileUrl);

      // 4. Call AI Grading provider
      const aiResult = await this.aiGradingProvider.gradeSubmission(textContent, criteria);

      // 5. Emit AIGradingCompletedEvent to EventBus
      const gradingCompletedEvent = new AIGradingCompletedEvent(
        submissionId,
        aiResult.score,
        aiResult.feedback,
        aiResult.status,
        tenantId,
      );

      this.logger.log(`AI grading completed for submission: ${submissionId}. Score: ${aiResult.score}`);
      await this.eventBus.publish('AIGradingCompletedEvent', gradingCompletedEvent);
    } catch (err) {
      this.logger.error(`Error processing job ${job.id}: ${err.message}`);
      await this.evidenceRepository.updateSubmission(submissionId, {
        status: SubmissionStatus.FAILED,
        feedback: `Lỗi chấm điểm tự động: ${err.message}`,
      });
      throw err; // Allow BullMQ retry
    }
  }

  private async extractTextContent(fileUrl: string): Promise<string> {
    if (!fileUrl) {
      return 'Không có nội dung minh chứng được cung cấp.';
    }

    try {
      // Simulated Text Extraction for Dev/Demo
      if (fileUrl.startsWith('http')) {
        return `Nội dung báo cáo thực hành năng lực số của sinh viên.
        Đường dẫn file: ${fileUrl}
        Tóm tắt: Đã hoàn thành bài tập thực hành tìm kiếm thông tin và lọc dữ liệu trên Google Search nâng cao.
        Học viên đã sử dụng các toán tử tìm kiếm nâng cao như site:vinamilk.com.vn "báo cáo tài chính" filetype:pdf.
        Kết quả tìm kiếm được tổng hợp chính xác và lọc bỏ các nguồn tin không đáng tin cậy.`;
      }
      return fileUrl;
    } catch (err) {
      this.logger.warn(`Failed to extract text from URL: ${err.message}`);
      return `Nội dung văn bản được lấy trực tiếp từ URL: ${fileUrl}`;
    }
  }
}
