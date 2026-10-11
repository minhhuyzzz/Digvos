import { Injectable } from '@nestjs/common';
import { ITenantRepository } from '../../domain/repositories/tenant.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class PrismaTenantRepository implements ITenantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findTenantById(id: string): Promise<any> {
    return this.prisma.tenant.findUnique({
      where: { id },
    });
  }

  async findTenantByDomain(domain: string): Promise<any> {
    return this.prisma.tenant.findUnique({
      where: { domain },
    });
  }

  async createTenant(data: { name: string; domain?: string }): Promise<any> {
    return this.prisma.tenant.create({ data });
  }

  async updateTenant(id: string, data: { name?: string; domain?: string }): Promise<any> {
    return this.prisma.tenant.update({
      where: { id },
      data,
    });
  }

  async listTenants(): Promise<any[]> {
    return this.prisma.tenant.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }
}
