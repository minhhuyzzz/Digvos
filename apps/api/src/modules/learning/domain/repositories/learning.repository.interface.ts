export interface ILearningRepository {
  findClassroomById(id: string): Promise<any>;
  findClassroomsByTeacher(teacherId: string): Promise<any[]>;
  findClassroomsByStudent(studentId: string): Promise<any[]>;
}
