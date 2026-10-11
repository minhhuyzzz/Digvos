export interface IAuditEvent {
  action: string;        // 'APPROVE_EVIDENCE', 'GRADE_ASSESSMENT', etc.
  actorId: string;       // userId
  entityType: string;    // 'Evidence', 'Assessment', etc.
  entityId: string;
  tenantId: string;
  changes?: Record<string, unknown>; // before/after diff
}

export interface IAuditRepository {
  log(event: IAuditEvent): Promise<void>;
  findByEntity(entityType: string, entityId: string): Promise<IAuditEvent[]>;
}
