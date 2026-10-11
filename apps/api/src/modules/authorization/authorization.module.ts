import { Module, Global } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PermissionService } from './application/permission.service';
import { RoleService } from './application/role.service';
import { PrismaAuthorizationRepository } from './infrastructure/repositories/prisma-authorization.repository';
import { PermissionsGuard } from './presentation/guards/permissions.guard';
import { RolesGuard } from './presentation/guards/roles.guard';

@Global()
@Module({
  providers: [
    PermissionService,
    RoleService,
    {
      provide: 'IAuthorizationRepository',
      useClass: PrismaAuthorizationRepository,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [
    PermissionService,
    RoleService,
  ],
})
export class AuthorizationModule {}
