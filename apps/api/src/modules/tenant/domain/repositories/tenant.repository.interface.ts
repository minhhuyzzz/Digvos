export interface ITenantRepository {
  findTenantById(id: string): Promise<any>;
  findTenantByDomain(domain: string): Promise<any>;
  createTenant(data: { name: string; domain?: string }): Promise<any>;
  updateTenant(id: string, data: { name?: string; domain?: string }): Promise<any>;
  listTenants(): Promise<any[]>;
}
