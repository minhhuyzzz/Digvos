import { SetMetadata } from '@nestjs/common';
import { PermissionValue } from '../../domain/repositories/authorization.repository.interface';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: PermissionValue[]) => SetMetadata(PERMISSIONS_KEY, permissions);
