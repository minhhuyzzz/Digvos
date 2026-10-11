import { Controller, Post, Body } from '@nestjs/common';
import { EvidenceService } from '../../application/evidence.service';
import { Roles } from '../../../authorization/presentation/decorators/roles.decorator';
import { Role } from '@digvos/database';
import { TenantId } from '../../../../common/decorators/tenant-id.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { SubmitEvidenceDto } from '../../dto/submit-evidence.dto';
import { ValidateEvidenceDto } from '../../dto/validate-evidence.dto';

@ApiTags('evidence')
@ApiBearerAuth()
@Controller('api/v1/evidence')
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Tenant ID phục vụ phân tách dữ liệu đa doanh nghiệp (SaaS)',
  required: false,
})
@ApiHeader({
  name: 'X-User-Role',
  description: 'Mock user role phục vụ dev testing (STUDENT, TEACHER, EMPLOYER, ADMIN)',
  required: false,
})
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Post('submit')
  @Roles(Role.STUDENT, Role.ADMIN)
  @ApiOperation({ summary: 'Sinh viên nộp hồ sơ minh chứng học tập' })
  @ApiResponse({ status: 201, description: 'Minh chứng đã được nộp thành công, chờ AI chấm điểm và giảng viên phê duyệt.' })
  async submit(
    @CurrentUser() userId: string,
    @Body() dto: SubmitEvidenceDto,
    @TenantId() tenantId: string,
  ) {
    return this.evidenceService.submitEvidence(
      userId,
      dto.competencyId,
      dto.fileUrl,
      tenantId,
    );
  }

  @Post('validate')
  @Roles(Role.TEACHER, Role.ADMIN) // Chỉ Giảng viên hoặc Admin được duyệt
  @ApiOperation({ summary: 'Giảng viên duyệt hoặc chấm điểm bài nộp minh chứng' })
  @ApiResponse({ status: 201, description: 'Đã hoàn tất chấm điểm và phản hồi bài nộp minh chứng.' })
  async validate(
    @Body() dto: ValidateEvidenceDto,
    @TenantId() tenantId: string,
  ) {
    return this.evidenceService.validateEvidence(
      dto.submissionId,
      dto.isApproved,
      dto.score,
      dto.feedback,
      tenantId,
    );
  }
}
