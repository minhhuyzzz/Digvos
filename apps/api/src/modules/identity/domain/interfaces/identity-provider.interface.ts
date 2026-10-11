import { User } from '@prisma/client';
import { RegisterDto, LoginDto } from '@digvos/api-contract';

export interface IIdentityProvider {
  register(dto: RegisterDto): Promise<User>;
  validateUser(dto: LoginDto): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
}
