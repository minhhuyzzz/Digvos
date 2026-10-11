import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

export class OnboardDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
