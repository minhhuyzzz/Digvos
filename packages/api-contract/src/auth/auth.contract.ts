import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).optional(),
  role: z.enum(['STUDENT', 'TEACHER', 'EMPLOYER']).optional(),
});
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const TokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});
export type TokenResponseDto = z.infer<typeof TokenResponseSchema>;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});
export type RefreshTokenDto = z.infer<typeof RefreshTokenSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8),
});
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;

export const ChangePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
});
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
