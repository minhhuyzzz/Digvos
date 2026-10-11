import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompetencyService } from '../services/competency.service';
import { Roles } from '../../authorization/presentation/decorators/roles.decorator';
import { Role } from '@digvos/database';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { UpdateCompetencyDto } from '../dto/update-competency.dto';

@ApiTags('competency')
@Controller('competency')
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
export class CompetencyController {
  constructor(private readonly competencyService: CompetencyService) {}

  @Get('radar/:studentId')
  @ApiOperation({ summary: 'Lấy dữ liệu Radar Chart của học viên' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách 5 vùng năng lực và điểm trung bình tích lũy tương ứng.' })
  async getRadarData(@Param('studentId') studentId: string) {
    return this.competencyService.getStudentRadarData(studentId);
  }

  @Get('gap/:studentId')
  @ApiOperation({ summary: 'Phân tích khoảng trống năng lực (Skill Gap Analysis)' })
  @ApiResponse({ status: 200, description: 'So sánh mức độ thành thạo hiện tại của sinh viên với mức chuẩn mục tiêu.' })
  async getSkillGap(@Param('studentId') studentId: string) {
    return this.competencyService.getStudentSkillGap(studentId);
  }

  @Post('update')
  @Roles(Role.TEACHER, Role.ADMIN) // Chỉ Giảng viên và Admin được phép cập nhật trực tiếp
  @ApiOperation({ summary: 'Cập nhật trực tiếp mức độ thành thạo của học viên đối với một năng lực' })
  @ApiResponse({ status: 201, description: 'Cập nhật thành công và trả về bản ghi tiến độ mới.' })
  async updateCompetency(@Body() dto: UpdateCompetencyDto) {
    return this.competencyService.updateStudentCompetency(
      dto.studentId,
      dto.competencyId,
      dto.level,
    );
  }
}
