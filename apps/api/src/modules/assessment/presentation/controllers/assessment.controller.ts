import { Controller, Post, Body, Get, Patch, Delete, Param, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AssessmentService } from '../../application/assessment.service';
import { CreateQuestionDto } from '../../dto/create-question.dto';
import { UpdateQuestionDto } from '../../dto/update-question.dto';
import { SubmitAnswerDto } from '../../dto/submit-answer.dto';
import { SubmitAssessmentDto } from '../../dto/submit-assessment.dto';
import { Roles } from '../../../authorization/presentation/decorators/roles.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';

@ApiTags('assessment')
@ApiBearerAuth()
@Controller('api/v1/assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  // =========================================================================
  // 1. Question Bank CRUD (Admin & Teachers Only)
  // =========================================================================

  @Post('questions')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Tạo câu hỏi thi mới trong ngân hàng câu hỏi' })
  async createQuestion(@Req() req: any, @Body() dto: CreateQuestionDto) {
    const tenantId = req.user?.tenantId || 'default-tenant-id';
    return this.assessmentService.createQuestion(dto, tenantId);
  }

  @Get('questions/:id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết câu hỏi theo ID' })
  async getQuestion(@Param('id') id: string) {
    return this.assessmentService.getQuestion(id);
  }

  @Patch('questions/:id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Cập nhật nội dung/đáp án của câu hỏi' })
  async updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.assessmentService.updateQuestion(id, dto);
  }

  @Delete('questions/:id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Xóa câu hỏi khỏi ngân hàng đề' })
  async deleteQuestion(@Param('id') id: string) {
    return this.assessmentService.deleteQuestion(id);
  }

  @Get('questions')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi thuộc năng lực số' })
  async listQuestions(@Req() req: any, @Query('competencyId') competencyId?: string) {
    const tenantId = req.user?.tenantId || 'default-tenant-id';
    return this.assessmentService.listQuestions(tenantId, competencyId);
  }

  // =========================================================================
  // 2. CAT Adaptive Testing Endpoints (Students)
  // =========================================================================

  @Post('cat/start')
  @Roles('STUDENT', 'ADMIN')
  @ApiOperation({ summary: 'Bắt đầu bài thi đánh giá thích ứng CAT cho một năng lực' })
  async startCatSession(
    @CurrentUser() userId: string,
    @Req() req: any,
    @Body('competencyId') competencyId: string,
  ) {
    const tenantId = req.user?.tenantId || 'default-tenant-id';
    return this.assessmentService.startSession(userId, competencyId, tenantId);
  }

  @Post('cat/submit/:sessionId')
  @Roles('STUDENT', 'ADMIN')
  @ApiOperation({ summary: 'Nộp câu trả lời cho câu hỏi hiện tại và nhận câu hỏi tiếp theo' })
  async submitAnswer(
    @Param('sessionId') sessionId: string,
    @Body() dto: SubmitAnswerDto,
  ) {
    return this.assessmentService.submitAnswer(sessionId, dto);
  }

  // =========================================================================
  // 3. Legacy Direct Submission Endpoint
  // =========================================================================

  @Post('submit')
  @Roles('STUDENT', 'ADMIN')
  @ApiOperation({ summary: 'Nộp kết quả bài thi truyền thống' })
  async submit(@Body() dto: SubmitAssessmentDto, @Req() req: any) {
    const tenantId = req.user?.tenantId || 'default-tenant-id';
    return this.assessmentService.submitAssessment(
      dto.studentId,
      dto.competencyId,
      dto.score,
      tenantId,
    );
  }
}
