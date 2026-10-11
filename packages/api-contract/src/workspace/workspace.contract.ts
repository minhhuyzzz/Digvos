import { z } from 'zod';

export const CreateClassroomSchema = z.object({
  name: z.string().min(2),
});
export type CreateClassroomDto = z.infer<typeof CreateClassroomSchema>;

export const UpdateClassroomSchema = z.object({
  name: z.string().min(2).optional(),
});
export type UpdateClassroomDto = z.infer<typeof UpdateClassroomSchema>;

export const AddStudentSchema = z.object({
  studentId: z.string(),
});
export type AddStudentDto = z.infer<typeof AddStudentSchema>;

export const ClassroomResponseSchema = z.object({
  id: z.string(),
  code: z.string(),
  tenantId: z.string(),
  teacherId: z.string(),
  name: z.string(),
  createdAt: z.date(),
});
export type ClassroomResponseDto = z.infer<typeof ClassroomResponseSchema>;
