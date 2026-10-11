import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AIService } from '../../application/ai.service';

@ApiTags('ai')
@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('grade')
  @ApiOperation({ summary: 'Yêu cầu AI chấm điểm bài nộp dựa trên tiêu chí đánh giá' })
  @ApiResponse({ status: 200, description: 'Trả về điểm số, feedback tiếng Việt và trạng thái (PASSED/FAILED).' })
  async grade(
    @Body('submissionContent') submissionContent: string,
    @Body('criteria') criteria: string,
  ) {
    // Dự phòng trường hợp gửi dạng prompt cũ
    const content = submissionContent || 'Không có nội dung bài nộp';
    const evalCriteria = criteria || 'Chấm điểm đạt yêu cầu tối thiểu';
    return this.aiService.gradeSubmission(content, evalCriteria);
  }
}
