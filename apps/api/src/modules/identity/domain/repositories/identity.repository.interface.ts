export interface IIdentityRepository {
  findUserById(id: string): Promise<any>;
  findByAuth0Sub(auth0Sub: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
  createUser(data: {
    auth0Sub: string;
    email: string;
    name?: string;
    role?: string;
    tenantId: string;
  }): Promise<any>;
  updateUser(id: string, data: {
    name?: string;
    email?: string;
  }): Promise<any>;
  findUsersByTenant(tenantId: string): Promise<any[]>;
}
