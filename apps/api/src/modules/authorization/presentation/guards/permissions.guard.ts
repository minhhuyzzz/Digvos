import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../../application/permission.service';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PermissionValue } from '../../domain/repositories/authorization.repository.interface';
import { requestContextStorage } from '../../../../common/core/als.context';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<PermissionValue[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // Lấy userId từ request hoặc ALS request context
    const userId = requestContextStorage.getStore()?.userId 
      || request.user?.auth0Sub 
      || request.headers['x-user-id'] 
      || request.user?.id 
      || 'default-user-id';

    for (const perm of requiredPermissions) {
      const hasPerm = await this.permissionService.hasPermission(userId, perm.resource, perm.action);
      if (!hasPerm) {
        throw new ForbiddenException(
          `User is not authorized to access resource '${perm.resource}' with action '${perm.action}'`
        );
      }
    }

    return true;
  }
}
