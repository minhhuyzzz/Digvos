import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string().optional(),
  companyName: z.string().optional(), // For Employer
  walletAddress: z.string().optional(), // For Student
});
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;

export const ProfileResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  companyName: z.string().nullable().optional(),
  walletAddress: z.string().nullable().optional(),
});
export type ProfileResponseDto = z.infer<typeof ProfileResponseSchema>;
