import { Module } from '@nestjs/common';
import { CompetencyService } from './services/competency.service';
import { CompetencyController } from './controllers/competency.controller';
import { CompetencyListener } from './listeners/competency.listener';

@Module({
  controllers: [CompetencyController],
  providers: [CompetencyService, CompetencyListener],
  exports: [CompetencyService],
})
export class CompetencyModule {}
