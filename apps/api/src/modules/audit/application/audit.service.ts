import { Injectable, Inject } from '@nestjs/common';
import { IAuditRepository, IAuditEvent } from '../domain/repositories/audit.repository.interface';

@Injectable()
export class AuditService {
  constructor(
    @Inject('IAuditRepository')
    private readonly auditRepository: IAuditRepository,
  ) {}

  async log(event: IAuditEvent): Promise<void> {
    await this.auditRepository.log(event);
  }

  async getEntityHistory(entityType: string, entityId: string): Promise<IAuditEvent[]> {
    return this.auditRepository.findByEntity(entityType, entityId);
  }
}
