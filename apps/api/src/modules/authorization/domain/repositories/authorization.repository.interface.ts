export interface PermissionValue {
  resource: string; // e.g., 'Evidence', 'Assessment', 'Classroom'
  action: string;   // e.g., 'Approve', 'Grade', 'Read', 'Write', 'Delete'
}

export interface IAuthorizationRepository {
  findRolesByUser(userId: string): Promise<string[]>;
  findPermissionsByRole(role: string): Promise<PermissionValue[]>;
  hasPermission(userId: string, resource: string, action: string): Promise<boolean>;
}
