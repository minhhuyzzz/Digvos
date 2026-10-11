import { Injectable } from '@nestjs/common';
import { IProfilesRepository } from '../../domain/repositories/profiles.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class PrismaProfilesRepository implements IProfilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProfileByUserId(userId: string, role: string): Promise<any> {
    if (role === 'STUDENT') return this.prisma.studentProfile.findUnique({ where: { userId } });
    if (role === 'TEACHER') return this.prisma.teacherProfile.findUnique({ where: { userId } });
    if (role === 'EMPLOYER') return this.prisma.employerProfile.findUnique({ where: { userId } });
    return null; // ADMIN doesn't have a specific profile table in this context
  }

  async updateProfile(userId: string, role: string, data: any): Promise<any> {
    if (role === 'STUDENT') return this.prisma.studentProfile.update({ where: { userId }, data });
    if (role === 'TEACHER') return this.prisma.teacherProfile.update({ where: { userId }, data });
    if (role === 'EMPLOYER') return this.prisma.employerProfile.update({ where: { userId }, data });
    return null;
  }

  async createProfile(userId: string, role: string, tenantId: string): Promise<any> {
    if (role === 'STUDENT') return this.prisma.studentProfile.create({ data: { userId } });
    if (role === 'TEACHER') return this.prisma.teacherProfile.create({ data: { userId } });
    if (role === 'EMPLOYER') return this.prisma.employerProfile.create({ data: { userId, companyName: '' } });
    return null;
  }
}
