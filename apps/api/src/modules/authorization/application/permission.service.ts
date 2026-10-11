import { Injectable, Inject } from '@nestjs/common';
import { IAuthorizationRepository, PermissionValue } from '../domain/repositories/authorization.repository.interface';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('IAuthorizationRepository')
    private readonly authRepository: IAuthorizationRepository,
  ) {}

  async hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
    return this.authRepository.hasPermission(userId, resource, action);
  }

  async getRolePermissions(role: string): Promise<PermissionValue[]> {
    return this.authRepository.findPermissionsByRole(role);
  }
}
