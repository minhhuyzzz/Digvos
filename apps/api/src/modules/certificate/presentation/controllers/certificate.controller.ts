import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CertificateService } from '../../application/certificate.service';
import { Public } from '../../../identity/presentation/decorators/public.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { Roles } from '../../../authorization/presentation/decorators/roles.decorator';

@ApiTags('certificate')
@ApiBearerAuth()
@Controller('api/v1/certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get('student')
  @Roles('STUDENT', 'ADMIN')
  @ApiOperation({ summary: 'Lấy danh sách chứng chỉ SBT của sinh viên hiện tại' })
  async getStudentCertificates(@CurrentUser() userId: string) {
    // Note: since current student's Profile ID maps to userId (or profile.id):
    // In our seed, StudentProfile's userId is default-user-id.
    // Let's resolve the StudentProfile first or query by student.userId directly.
    return this.certificateService.getStudentCertificates(userId);
  }

  @Get('verify/:verificationCode')
  @Public()
  @ApiOperation({ summary: 'Xác minh công khai tính hợp lệ của chứng chỉ số SBT' })
  async verifyCertificate(@Param('verificationCode') verificationCode: string) {
    return this.certificateService.verifyCertificate(verificationCode);
  }

  @Get(':id')
  @Roles('STUDENT', 'TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Lấy chi tiết thông tin chứng chỉ năng lực số' })
  async getCertificate(@Param('id') id: string) {
    return this.certificateService.getCertificate(id);
  }
}
