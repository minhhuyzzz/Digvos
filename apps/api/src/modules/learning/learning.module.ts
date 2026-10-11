import { Module } from '@nestjs/common';
import { LearningController } from './presentation/controllers/learning.controller';
import { LearningService } from './application/learning.service';
import { PrismaLearningRepository } from './infrastructure/repositories/prisma-learning.repository';

@Module({
  controllers: [LearningController],
  providers: [
    LearningService,
    {
      provide: 'ILearningRepository',
      useClass: PrismaLearningRepository,
    },
  ],
  exports: [LearningService],
})
export class LearningModule {}
