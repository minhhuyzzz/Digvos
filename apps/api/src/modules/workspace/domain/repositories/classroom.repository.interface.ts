export interface IClassroomRepository {
  createClassroom(data: { tenantId: string; teacherId: string; name: string; code: string }): Promise<any>;
  findClassroomById(id: string): Promise<any>;
  listClassroomsByTenant(tenantId: string): Promise<any[]>;
  listClassroomsByTeacher(teacherId: string): Promise<any[]>;
  listClassroomsByStudent(studentId: string): Promise<any[]>;
  updateClassroom(id: string, data: { name?: string }): Promise<any>;
  addStudentToClassroom(classroomId: string, studentId: string): Promise<any>;
  listStudentsInClassroom(classroomId: string): Promise<any[]>;
}
