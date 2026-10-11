import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@digvos/database';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleService } from '../../application/role.service';
import { requestContextStorage } from '../../../../common/core/als.context';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // Lấy userId từ request hoặc ALS context
    const userId = requestContextStorage.getStore()?.userId 
      || request.user?.auth0Sub 
      || request.headers['x-user-id'] 
      || request.user?.id 
      || 'default-user-id';

    // Mock dev role check nhanh nếu truyền từ header
    const devRole = request.headers['x-user-role'] as Role;
    if (devRole && requiredRoles.includes(devRole)) {
      return true;
    }

    // Lấy roles thực tế của user từ database thông qua RoleService
    const userRoles = await this.roleService.getUserRoles(userId);
    
    const hasRole = userRoles.some(role => requiredRoles.includes(role as Role));
    if (!hasRole) {
      throw new ForbiddenException(`User role(s) [${userRoles.join(', ')}] is not authorized to access this resource`);
    }

    return true;
  }
}
