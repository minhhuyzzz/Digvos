import { Injectable } from '@nestjs/common';
import { IAuthorizationRepository, PermissionValue } from '../../domain/repositories/authorization.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';
import { Role } from '@digvos/database';

@Injectable()
export class PrismaAuthorizationRepository implements IAuthorizationRepository {
  // Bản đồ phân quyền tĩnh (Hardcoded static mapping)
  private readonly rolePermissionsMap: Record<Role, PermissionValue[]> = {
    [Role.ADMIN]: [
      { resource: '*', action: '*' }, // Toàn quyền
    ],
    [Role.TEACHER]: [
      { resource: 'Evidence', action: 'Approve' },
      { resource: 'Evidence', action: 'Read' },
      { resource: 'Assessment', action: 'Grade' },
      { resource: 'Assessment', action: 'Read' },
      { resource: 'Classroom', action: 'Read' },
      { resource: 'Classroom', action: 'Write' },
      { resource: 'StudentProfile', action: 'Read' },
    ],
    [Role.STUDENT]: [
      { resource: 'Assessment', action: 'Read' },
      { resource: 'Assessment', action: 'Write' }, // Nộp bài test
      { resource: 'Evidence', action: 'Read' },
      { resource: 'Evidence', action: 'Write' }, // Nộp minh chứng
      { resource: 'Classroom', action: 'Read' },
      { resource: 'Certificate', action: 'Read' },
    ],
    [Role.EMPLOYER]: [
      { resource: 'StudentProfile', action: 'Read' }, // Tìm kiếm học viên/tuyển dụng
      { resource: 'JobCampaign', action: 'Read' },
      { resource: 'JobCampaign', action: 'Write' },
    ],
  };

  constructor(private readonly prisma: PrismaService) {}

  async findRolesByUser(userId: string): Promise<string[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    
    if (!user) return [];
    return [user.role];
  }

  async findPermissionsByRole(role: string): Promise<PermissionValue[]> {
    const roleEnum = role as Role;
    return this.rolePermissionsMap[roleEnum] || [];
  }

  async hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
    const roles = await this.findRolesByUser(userId);
    if (roles.length === 0) return false;

    for (const role of roles) {
      // 1. Kiểm tra Admin - Toàn quyền
      if (role === Role.ADMIN) return true;

      // 2. Kiểm tra permissions tương ứng của role
      const permissions = this.rolePermissionsMap[role as Role] || [];
      const matches = permissions.some(
        p => 
          (p.resource === '*' || p.resource.toLowerCase() === resource.toLowerCase()) &&
          (p.action === '*' || p.action.toLowerCase() === action.toLowerCase())
      );

      if (matches) return true;
    }

    return false;
  }
}
