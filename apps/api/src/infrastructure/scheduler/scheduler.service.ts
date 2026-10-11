import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OutboxService } from '../outbox/services/outbox.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly outboxService: OutboxService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleOutboxProcessing() {
    this.logger.debug('Running outbox event publisher cron job...');
    try {
      await this.outboxService.processPendingEvents();
    } catch (err) {
      this.logger.error(`Error in outbox processing cron job: ${err.message}`);
    }
  }

  // Chỗ này có thể mở rộng thêm các cron job khác trong tương lai (ví dụ: quét sạch log cũ, báo cáo thống kê...)
}
