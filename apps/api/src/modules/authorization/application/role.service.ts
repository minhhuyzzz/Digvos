import { Injectable, Inject } from '@nestjs/common';
import { IAuthorizationRepository } from '../domain/repositories/authorization.repository.interface';

@Injectable()
export class RoleService {
  constructor(
    @Inject('IAuthorizationRepository')
    private readonly authRepository: IAuthorizationRepository,
  ) {}

  async getUserRoles(userId: string): Promise<string[]> {
    return this.authRepository.findRolesByUser(userId);
  }
}
