import { Injectable } from '@nestjs/common';
import { IClassroomRepository } from '../../domain/repositories/classroom.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class PrismaClassroomRepository implements IClassroomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClassroom(data: { tenantId: string; teacherId: string; name: string; code: string }): Promise<any> {
    return this.prisma.classroom.create({ data });
  }

  async findClassroomById(id: string): Promise<any> {
    return this.prisma.classroom.findUnique({ where: { id } });
  }

  async listClassroomsByTenant(tenantId: string): Promise<any[]> {
    return this.prisma.classroom.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listClassroomsByTeacher(teacherId: string): Promise<any[]> {
    return this.prisma.classroom.findMany({
      where: { teacherId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listClassroomsByStudent(studentId: string): Promise<any[]> {
    const studentClasses = await this.prisma.classroomStudent.findMany({
      where: { studentId },
      include: { classroom: true },
    });
    return studentClasses.map(sc => sc.classroom).filter(c => c.deletedAt === null);
  }

  async updateClassroom(id: string, data: { name?: string }): Promise<any> {
    return this.prisma.classroom.update({
      where: { id },
      data,
    });
  }

  async addStudentToClassroom(classroomId: string, studentId: string): Promise<any> {
    return this.prisma.classroomStudent.create({
      data: { classroomId, studentId },
    });
  }

  async listStudentsInClassroom(classroomId: string): Promise<any[]> {
    const records = await this.prisma.classroomStudent.findMany({
      where: { classroomId },
      include: {
        student: {
          include: {
            user: true,
          }
        }
      }
    });
    return records.map(r => r.student);
  }
}
