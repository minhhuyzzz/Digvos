import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LearningService } from '../../application/learning.service';

@ApiTags('learning')
@Controller('api/v1/learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get('classroom/:id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết lớp học' })
  async getClassroom(@Param('id') id: string) {
    return this.learningService.getClassroom(id);
  }

  @Get('teacher/:teacherId/classrooms')
  @ApiOperation({ summary: 'Danh sách lớp học của giảng viên' })
  async getTeacherClassrooms(@Param('teacherId') teacherId: string) {
    return this.learningService.getTeacherClassrooms(teacherId);
  }

  @Get('student/:studentId/classrooms')
  @ApiOperation({ summary: 'Danh sách lớp học của sinh viên' })
  async getStudentClassrooms(@Param('studentId') studentId: string) {
    return this.learningService.getStudentClassrooms(studentId);
  }
}
