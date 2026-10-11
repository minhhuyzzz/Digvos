export interface IProfilesRepository {
  findProfileByUserId(userId: string, role: string): Promise<any>;
  updateProfile(userId: string, role: string, data: any): Promise<any>;
  createProfile(userId: string, role: string, tenantId: string): Promise<any>;
}
