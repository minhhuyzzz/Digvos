import { Module } from '@nestjs/common';
import { AssessmentController } from './presentation/controllers/assessment.controller';
import { AssessmentService } from './application/assessment.service';
import { PrismaAssessmentRepository } from './infrastructure/repositories/prisma-assessment.repository';
import { CatEngineDomainService } from './domain/services/cat-engine.service';

@Module({
  controllers: [AssessmentController],
  providers: [
    AssessmentService,
    CatEngineDomainService,
    {
      provide: 'IAssessmentRepository',
      useClass: PrismaAssessmentRepository,
    },
  ],
  exports: [AssessmentService, CatEngineDomainService],
})
export class AssessmentModule {}
