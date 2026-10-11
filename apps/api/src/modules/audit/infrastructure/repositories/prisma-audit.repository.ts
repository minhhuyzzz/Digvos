import { Injectable } from '@nestjs/common';
import { IAuditRepository, IAuditEvent } from '../../domain/repositories/audit.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class PrismaAuditRepository implements IAuditRepository {
  constructor(private readonly prisma: PrismaService) {}

  async log(event: IAuditEvent): Promise<void> {
    const detailsObj = {
      entityType: event.entityType,
      entityId: event.entityId,
      tenantId: event.tenantId,
      changes: event.changes,
    };

    await this.prisma.auditLog.create({
      data: {
        userId: event.actorId,
        action: event.action,
        details: JSON.stringify(detailsObj),
      },
    });
  }

  async findByEntity(entityType: string, entityId: string): Promise<IAuditEvent[]> {
    const logs = await this.prisma.auditLog.findMany({
      where: {
        details: {
          contains: `"entityType":"${entityType}"`,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const results: IAuditEvent[] = [];
    for (const log of logs) {
      try {
        if (!log.details) continue;
        const details = JSON.parse(log.details);
        if (details.entityId === entityId) {
          results.push({
            action: log.action,
            actorId: log.userId || '',
            entityType: details.entityType,
            entityId: details.entityId,
            tenantId: details.tenantId,
            changes: details.changes,
          });
        }
      } catch (err) {
        // Bỏ qua nếu parse lỗi
      }
    }

    return results;
  }
}
