import { Controller, Get, Post, Put, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClassroomService } from '../../application/services/classroom.service';
import { Roles } from '../../../authorization/presentation/decorators/roles.decorator';
import { CreateClassroomDto, UpdateClassroomDto, AddStudentDto } from '@digvos/api-contract';

@ApiTags('workspaces/classrooms')
@ApiBearerAuth()
@Controller('api/v1/workspaces/classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Tạo lớp học mới' })
  async createClassroom(@Req() req: any, @Body() data: CreateClassroomDto) {
    // Giả sử req.user chứa profileId của Teacher (hoặc lấy từ DB, cần map userId -> teacherId)
    // Tạm thời lấy req.user.id làm teacherId, sẽ cần service chuyển đổi
    return this.classroomService.createClassroom(req.tenantId, req.user.id, data);
  }

  @Get()
  @Roles('ADMIN', 'EMPLOYER', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Lấy danh sách lớp học' })
  async listClassrooms(@Req() req: any) {
    return this.classroomService.listClassrooms(req.tenantId, req.user.role, req.user.id);
  }

  @Get(':id')
  @Roles('ADMIN', 'EMPLOYER', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Xem chi tiết lớp học' })
  async getClassroom(@Req() req: any, @Param('id') id: string) {
    return this.classroomService.getClassroom(id, req.tenantId);
  }

  @Put(':id')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Cập nhật lớp học' })
  async updateClassroom(@Req() req: any, @Param('id') id: string, @Body() data: UpdateClassroomDto) {
    return this.classroomService.updateClassroom(id, req.tenantId, req.user.id, data);
  }

  @Post(':id/students')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Thêm học viên vào lớp' })
  async addStudent(@Req() req: any, @Param('id') id: string, @Body() data: AddStudentDto) {
    return this.classroomService.addStudent(id, req.tenantId, req.user.id, data);
  }

  @Get(':id/students')
  @Roles('ADMIN', 'EMPLOYER', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Danh sách học viên trong lớp' })
  async listStudents(@Req() req: any, @Param('id') id: string) {
    return this.classroomService.listStudents(id, req.tenantId);
  }
}
