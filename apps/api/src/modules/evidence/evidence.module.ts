import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EvidenceController } from './presentation/controllers/evidence.controller';
import { EvidenceService } from './application/evidence.service';
import { PrismaEvidenceRepository } from './infrastructure/repositories/prisma-evidence.repository';
import { EvidenceProcessor } from './infrastructure/processors/evidence.processor';
import { AIModule } from '../ai/ai.module';

@Module({
  imports: [
    AIModule,
    BullModule.registerQueue({
      name: 'evidence-processing',
    }),
  ],
  controllers: [EvidenceController],
  providers: [
    EvidenceService,
    EvidenceProcessor,
    {
      provide: 'IEvidenceRepository',
      useClass: PrismaEvidenceRepository,
    },
  ],
  exports: [EvidenceService],
})
export class EvidenceModule {}
