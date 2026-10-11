import { Injectable } from '@nestjs/common';
import { IIdentityRepository } from '../../domain/repositories/identity.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class PrismaIdentityRepository implements IIdentityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      include: {
        studentProfile: true,
        teacherProfile: true,
        employerProfile: true,
      },
    });
  }

  async findByAuth0Sub(auth0Sub: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { auth0Sub, deletedAt: null },
      include: {
        studentProfile: true,
        teacherProfile: true,
        employerProfile: true,
      },
    });
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async createUser(data: {
    auth0Sub: string;
    email: string;
    name?: string;
    role?: string;
    tenantId: string;
  }): Promise<any> {
    const role = (data.role as any) || 'STUDENT';
    return this.prisma.user.create({
      data: {
        auth0Sub: data.auth0Sub,
        email: data.email,
        name: data.name,
        role,
        tenantId: data.tenantId,
        studentProfile: role === 'STUDENT' ? { create: {} } : undefined,
        teacherProfile: role === 'TEACHER' ? { create: {} } : undefined,
        employerProfile: role === 'EMPLOYER' ? { create: { companyName: 'Chưa cập nhật' } } : undefined,
      },
      include: {
        studentProfile: true,
        teacherProfile: true,
        employerProfile: true,
      },
    });
  }

  async updateUser(id: string, data: {
    name?: string;
    email?: string;
  }): Promise<any> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findUsersByTenant(tenantId: string): Promise<any[]> {
    return this.prisma.user.findMany({
      where: { tenantId, deletedAt: null },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
