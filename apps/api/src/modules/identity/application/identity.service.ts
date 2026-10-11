import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IIdentityRepository } from '../domain/repositories/identity.repository.interface';

@Injectable()
export class IdentityService {
  constructor(
    @Inject('IIdentityRepository')
    private readonly identityRepository: IIdentityRepository,
  ) {}

  async getUser(id: string): Promise<any> {
    const user = await this.identityRepository.findUserById(id);
    if (!user) throw new NotFoundException(`User with ID '${id}' not found`);
    return user;
  }

  async getProfile(auth0Sub: string): Promise<any> {
    const user = await this.identityRepository.findByAuth0Sub(auth0Sub);
    if (!user) throw new NotFoundException(`User not found for auth0Sub '${auth0Sub}'`);
    return user;
  }

  /**
   * Sync user from Auth0 JWT payload on first login.
   * If user exists (by auth0Sub), return it. Otherwise create a new record.
   */
  async syncAuth0User(payload: {
    auth0Sub: string;
    email: string;
    name?: string;
    role?: string;
    tenantId: string;
  }): Promise<any> {
    const existing = await this.identityRepository.findByAuth0Sub(payload.auth0Sub);
    if (existing) return existing;

    return this.identityRepository.createUser({
      auth0Sub: payload.auth0Sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      tenantId: payload.tenantId,
    });
  }

  async updateProfile(id: string, data: { name?: string; email?: string }): Promise<any> {
    const user = await this.identityRepository.findUserById(id);
    if (!user) throw new NotFoundException(`User with ID '${id}' not found`);
    return this.identityRepository.updateUser(id, data);
  }

  async getUsersByTenant(tenantId: string): Promise<any[]> {
    return this.identityRepository.findUsersByTenant(tenantId);
  }
}
