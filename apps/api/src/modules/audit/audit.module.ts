import { Module, Global } from '@nestjs/common';
import { AuditService } from './application/audit.service';
import { PrismaAuditRepository } from './infrastructure/repositories/prisma-audit.repository';

@Global()
@Module({
  providers: [
    AuditService,
    {
      provide: 'IAuditRepository',
      useClass: PrismaAuditRepository,
    },
  ],
  exports: [AuditService],
})
export class AuditModule {}
