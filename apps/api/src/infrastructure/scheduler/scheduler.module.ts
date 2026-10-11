import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { OutboxModule } from '../outbox/outbox.module';

@Module({
  imports: [OutboxModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
