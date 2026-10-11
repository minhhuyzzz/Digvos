import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';
import { RedisService } from '../../../../infrastructure/redis/redis.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    // 1. Thử lấy Permissions từ Redis Cache
    const cacheKey = `role:${user.role}:permissions`;
    const client = this.redisService.getClient();
    let userPermissions: string[] = [];
    let hasCache = false;

    try {
      if (client && client.status === 'ready') {
        const cachedPermissions = await client.get(cacheKey);
        if (cachedPermissions) {
          userPermissions = JSON.parse(cachedPermissions);
          hasCache = true;
        }
      }
    } catch (err) {
      console.warn('Failed to read permissions from Redis cache, falling back to static:', err);
    }

    if (!hasCache) {
      // 2. Nếu không có trong cache, fallback về Static Mapping (hoặc Query DB)
      const rolePermissions: Record<string, string[]> = {
        ADMIN: ['users.read', 'users.write', 'users.delete', 'system.manage'],
        TEACHER: ['users.read', 'courses.manage', 'assessments.grade'],
        EMPLOYER: ['users.read', 'campaigns.manage'],
        STUDENT: ['profile.read', 'courses.read', 'assessments.take'],
      };

      userPermissions = rolePermissions[user.role] || [];
      
      // 3. Lưu vào Redis Cache trong 1 giờ
      try {
        if (client && client.status === 'ready') {
          await client.set(cacheKey, JSON.stringify(userPermissions), 'EX', 3600);
        }
      } catch (err) {
        console.warn('Failed to write permissions to Redis cache:', err);
      }
    }
    
    // Check if the user has ALL the required permissions
    const hasAll = requiredPermissions.every(p => userPermissions.includes(p));

    if (!hasAll) {
      throw new ForbiddenException(`Insufficient permissions. Required: ${requiredPermissions.join(', ')}`);
    }

    return true;
  }
}
