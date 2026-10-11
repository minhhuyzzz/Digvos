import { z } from 'zod';

export const CreateTenantSchema = z.object({
  name: z.string().min(2),
  domain: z.string().optional(),
});
export type CreateTenantDto = z.infer<typeof CreateTenantSchema>;

export const UpdateTenantSchema = z.object({
  name: z.string().min(2).optional(),
  domain: z.string().optional(),
});
export type UpdateTenantDto = z.infer<typeof UpdateTenantSchema>;

export const TenantResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  domain: z.string().nullable(),
  createdAt: z.date(),
});
export type TenantResponseDto = z.infer<typeof TenantResponseSchema>;
