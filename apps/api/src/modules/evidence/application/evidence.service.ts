import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { IEvidenceRepository } from '../domain/repositories/evidence.repository.interface';
import { IEventBus } from '../../../common/core/event-bus.interface';
import { SubmissionStatus } from '@digvos/database';
import { EvidenceSubmittedEvent } from '../domain/events/evidence-submitted.event';
import { EvidenceAIGradedEvent } from '../domain/events/evidence-ai-graded.event';
import { EvidenceApprovedEvent } from '../domain/events/evidence-approved.event';
import { EvidenceRejectedEvent } from '../domain/events/evidence-rejected.event';

@Injectable()
export class EvidenceService {
  constructor(
    @Inject('IEvidenceRepository')
    private readonly evidenceRepository: IEvidenceRepository,
    @Inject('IEventBus')
    private readonly eventBus: IEventBus,
    @InjectQueue('evidence-processing')
    private readonly evidenceQueue: Queue,
  ) {}

  /**
   * Submit new student evidence (Trigger Upload & AI process pipeline)
   */
  async submitEvidence(
    studentId: string,
    competencyId: string,
    fileUrl: string,
    tenantId: string,
  ) {
    // 1. Create Submission in DB with UPLOADED status
    const submission = await this.evidenceRepository.createSubmission({
      studentId,
      competencyId,
      fileUrl,
      tenantId,
      status: SubmissionStatus.UPLOADED,
    });

    // 2. Queue BullMQ job for async AI processing with attempts/backoff retry logic
    await this.evidenceQueue.add(
      'grade-evidence',
      {
        submissionId: submission.id,
        fileUrl,
        competencyId,
        tenantId,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: true,
      },
    );

    // 3. Write outbox event log
    const event = new EvidenceSubmittedEvent(
      submission.id,
      studentId,
      competencyId,
      fileUrl,
      tenantId,
    );
    await this.evidenceRepository.createEventLog('EvidenceSubmittedEvent', event);

    // 4. Publish Event to EventBus
    await this.eventBus.publish('EvidenceSubmittedEvent', event);

    return {
      success: true,
      message: 'Evidence submitted successfully. Queued for AI assessment.',
      submissionId: submission.id,
      status: SubmissionStatus.UPLOADED,
    };
  }

  /**
   * Listen to AIGradingCompletedEvent from Processor and update Submission details.
   * This keeps business logic inside the Application layer!
   */
  @OnEvent('AIGradingCompletedEvent')
  async handleAIGradingCompleted(payload: {
    submissionId: string;
    score: number;
    feedback: string;
    status: 'PASSED' | 'FAILED' | 'NEEDS_REVIEW';
    tenantId: string;
  }) {
    const submission = await this.evidenceRepository.findSubmissionById(payload.submissionId);
    if (!submission) return;

    // Update Submission in DB
    const updated = await this.evidenceRepository.updateSubmission(payload.submissionId, {
      score: payload.score,
      feedback: payload.feedback,
      isGradedByAI: true,
      status: SubmissionStatus.AI_GRADED,
    });

    // Create Outbox Log for EvidenceAIGradedEvent
    const aiGradedEvent = new EvidenceAIGradedEvent(
      submission.id,
      submission.studentId,
      submission.competencyId,
      payload.score,
      payload.feedback,
      payload.status,
      payload.tenantId,
    );
    await this.evidenceRepository.createEventLog('EvidenceAIGradedEvent', aiGradedEvent);

    // Publish to EventBus
    await this.eventBus.publish('EvidenceAIGradedEvent', aiGradedEvent);
  }

  /**
   * Teacher manual validation / approval
   */
  async validateEvidence(
    submissionId: string,
    isApproved: boolean,
    score: number,
    feedback: string,
    tenantId: string,
  ) {
    const submission = await this.evidenceRepository.findSubmissionById(submissionId);
    if (!submission) {
      throw new NotFoundException(`Submission '${submissionId}' not found`);
    }

    const finalStatus = isApproved ? SubmissionStatus.APPROVED : SubmissionStatus.REJECTED;

    const updatedSubmission = await this.evidenceRepository.updateSubmission(submissionId, {
      score,
      feedback,
      status: finalStatus,
    });

    // Outbox & EventBus dispatching based on approval result
    if (isApproved) {
      const approvedEvent = new EvidenceApprovedEvent(
        submissionId,
        submission.studentId,
        submission.competencyId,
        score,
        feedback,
        tenantId,
      );

      await this.evidenceRepository.createEventLog('EvidenceApprovedEvent', approvedEvent);
      await this.eventBus.publish('EvidenceApprovedEvent', approvedEvent);

      // If approved and score >= 50, update student competency level
      if (score >= 50 && submission.competencyId) {
        // Map score to proficiency level (standard mapping helper)
        const level = this.mapScoreToLevel(score);
        await this.evidenceRepository.updateStudentCompetency(
          submission.studentId,
          submission.competencyId,
          level,
        );
      }
    } else {
      const rejectedEvent = new EvidenceRejectedEvent(
        submissionId,
        submission.studentId,
        submission.competencyId,
        score,
        feedback,
        tenantId,
      );

      await this.evidenceRepository.createEventLog('EvidenceRejectedEvent', rejectedEvent);
      await this.eventBus.publish('EvidenceRejectedEvent', rejectedEvent);
    }

    return {
      success: true,
      message: `Evidence has been ${isApproved ? 'APPROVED' : 'REJECTED'}.`,
      submission: updatedSubmission,
    };
  }

  private mapScoreToLevel(score: number) {
    const { ProficiencyLevel } = require('@digvos/database');
    if (score >= 90) return ProficiencyLevel.HIGHLY_SPECIALIZED_8;
    if (score >= 80) return ProficiencyLevel.HIGHLY_SPECIALIZED_7;
    if (score >= 70) return ProficiencyLevel.ADVANCED_6;
    if (score >= 60) return ProficiencyLevel.ADVANCED_5;
    if (score >= 50) return ProficiencyLevel.INTERMEDIATE_4;
    if (score >= 40) return ProficiencyLevel.INTERMEDIATE_3;
    if (score >= 20) return ProficiencyLevel.FOUNDATION_2;
    return ProficiencyLevel.FOUNDATION_1;
  }
}
