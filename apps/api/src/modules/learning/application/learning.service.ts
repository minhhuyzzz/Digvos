import { Injectable, Inject } from '@nestjs/common';
import { ILearningRepository } from '../domain/repositories/learning.repository.interface';

@Injectable()
export class LearningService {
  constructor(
    @Inject('ILearningRepository')
    private readonly learningRepository: ILearningRepository,
  ) {}

  async getClassroom(id: string): Promise<any> {
    return this.learningRepository.findClassroomById(id);
  }

  async getTeacherClassrooms(teacherId: string): Promise<any[]> {
    return this.learningRepository.findClassroomsByTeacher(teacherId);
  }

  async getStudentClassrooms(studentId: string): Promise<any[]> {
    return this.learningRepository.findClassroomsByStudent(studentId);
  }
}
