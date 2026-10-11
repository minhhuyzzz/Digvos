import { Injectable } from '@nestjs/common';
import { ILearningRepository } from '../../domain/repositories/learning.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class PrismaLearningRepository implements ILearningRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findClassroomById(id: string): Promise<any> {
    return this.prisma.classroom.findUnique({
      where: { id },
      include: { teacher: true },
    });
  }

  async findClassroomsByTeacher(teacherId: string): Promise<any[]> {
    return this.prisma.classroom.findMany({
      where: { teacherId, deletedAt: null },
    });
  }

  async findClassroomsByStudent(studentId: string): Promise<any[]> {
    return this.prisma.classroom.findMany({
      where: {
        students: { some: { studentId } },
        deletedAt: null,
      },
    });
  }
}
