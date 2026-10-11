import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IProfilesRepository } from '../../domain/repositories/profiles.repository.interface';
import { UpdateProfileDto } from '@digvos/api-contract';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('IProfilesRepository')
    private readonly profilesRepository: IProfilesRepository,
  ) {}

  async getProfile(userId: string, role: string) {
    let profile = await this.profilesRepository.findProfileByUserId(userId, role);
    if (!profile && role !== 'ADMIN') {
       throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async updateProfile(userId: string, role: string, data: UpdateProfileDto) {
    // Basic validation based on role
    const updateData: any = {};
    if (data.name) updateData.name = data.name;

    if (role === 'EMPLOYER' && data.companyName) {
      updateData.companyName = data.companyName;
    }
    
    if (role === 'STUDENT' && data.walletAddress) {
      updateData.walletAddress = data.walletAddress;
    }

    return this.profilesRepository.updateProfile(userId, role, updateData);
  }

  // Called automatically when user signs up / is created
  async createProfile(userId: string, role: string, tenantId: string) {
    return this.profilesRepository.createProfile(userId, role, tenantId);
  }
}
