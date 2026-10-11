import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITenantRepository } from '../domain/repositories/tenant.repository.interface';
import { IdentityService } from '../../identity/application/identity.service';

@Injectable()
export class TenantService {
  constructor(
    @Inject('ITenantRepository')
    private readonly tenantRepository: ITenantRepository,
    private readonly identityService: IdentityService,
  ) {}

  async getTenant(id: string): Promise<any> {
    const tenant = await this.tenantRepository.findTenantById(id);
    if (!tenant) throw new NotFoundException(`Tenant with ID '${id}' not found`);
    return tenant;
  }

  async createTenant(data: { name: string; domain?: string }): Promise<any> {
    return this.tenantRepository.createTenant(data);
  }

  async updateTenant(id: string, data: { name?: string; domain?: string }): Promise<any> {
    await this.getTenant(id); // Ensure exists
    return this.tenantRepository.updateTenant(id, data);
  }

  async getTenantByDomain(domain: string): Promise<any> {
    const tenant = await this.tenantRepository.findTenantByDomain(domain);
    if (!tenant) throw new NotFoundException(`Tenant with domain '${domain}' not found`);
    return tenant;
  }

  async listTenants(): Promise<any[]> {
    return this.tenantRepository.listTenants();
  }

  async listUsers(tenantId: string): Promise<any[]> {
    return this.identityService.getUsersByTenant(tenantId);
  }
}
