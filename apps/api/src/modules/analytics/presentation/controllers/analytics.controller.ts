import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from '../../application/analytics.service';
import { Roles } from '../../../authorization/presentation/decorators/roles.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';

@ApiTags('analytics')
@ApiBearerAuth()
@Controller('api/v1/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Lấy các số liệu thống kê Dashboard hệ thống (Teacher/Admin)' })
  async getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('student/:studentId/radar')
  @Roles('STUDENT', 'TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Lấy tọa độ đồ thị Radar năng lực của học viên' })
  async getStudentRadar(
    @Param('studentId') studentId: string,
    @CurrentUser() currentUserId: string,
  ) {
    const resolvedId = studentId === 'me' ? currentUserId : studentId;
    return this.analyticsService.getStudentRadarData(resolvedId);
  }

  @Get('student/:studentId/gaps')
  @Roles('STUDENT', 'TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Phân tích khoảng trống kỹ năng so với mục tiêu' })
  async getStudentSkillGaps(
    @Param('studentId') studentId: string,
    @CurrentUser() currentUserId: string,
    @Query('targetLevel') targetLevel?: number,
  ) {
    const resolvedId = studentId === 'me' ? currentUserId : studentId;
    const target = targetLevel ? Number(targetLevel) : 5;
    return this.analyticsService.getStudentSkillGaps(resolvedId, target);
  }

  @Get('student/:studentId/recommendations')
  @Roles('STUDENT', 'TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Lấy đề xuất lộ trình học tập cá nhân hóa do AI gợi ý' })
  async getStudentRecommendations(
    @Param('studentId') studentId: string,
    @CurrentUser() currentUserId: string,
    @Query('targetLevel') targetLevel?: number,
  ) {
    const resolvedId = studentId === 'me' ? currentUserId : studentId;
    const target = targetLevel ? Number(targetLevel) : 5;
    return this.analyticsService.getStudentRecommendations(resolvedId, target);
  }
}
