import { Module } from '@nestjs/common';
import { AnalyticsController } from './presentation/controllers/analytics.controller';
import { AnalyticsService } from './application/analytics.service';
import { PrismaAnalyticsRepository } from './infrastructure/repositories/prisma-analytics.repository';

@Module({
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    {
      provide: 'IAnalyticsRepository',
      useClass: PrismaAnalyticsRepository,
    },
  ],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
