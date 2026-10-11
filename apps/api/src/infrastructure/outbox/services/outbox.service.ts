import { Injectable, Logger, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { OutboxStatus } from '../domain/enums/outbox-status.enum';
import { IEventBus } from '../../../common/core/event-bus.interface';

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name);

  constructor(
    private prisma: PrismaService,
    @Inject('IEventBus')
    private eventBus: IEventBus,
  ) {}

  async processPendingEvents(): Promise<void> {
    // Chỉ lấy các sự kiện đã tạo cách đây ít nhất 5 giây để tránh tranh chấp với tiến trình vừa sinh ra
    const thresholdDate = new Date(Date.now() - 5000);

    const pendingEvents = await this.prisma.eventLog.findMany({
      where: {
        status: OutboxStatus.PENDING,
        createdAt: {
          lt: thresholdDate,
        },
      },
      take: 20, // Giới hạn batch size để tránh nghẽn luồng
    });

    if (pendingEvents.length === 0) {
      return;
    }

    this.logger.log(`Processing ${pendingEvents.length} pending outbox events...`);

    for (const event of pendingEvents) {
      try {
        const payload = event.payload as any;
        
        // 1. Phát sự kiện lên Event Bus
        await this.eventBus.publish(event.eventName, payload);
        
        // 2. Cập nhật trạng thái thành PROCESSED
        await this.prisma.eventLog.update({
          where: { id: event.id },
          data: { status: OutboxStatus.PROCESSED },
        });

        this.logger.log(`Successfully processed event: ${event.eventName} (ID: ${event.id})`);
      } catch (error) {
        this.logger.error(`Failed to process event: ${event.eventName} (ID: ${event.id}). Error: ${error.message}`);
        
        try {
          await this.prisma.eventLog.update({
            where: { id: event.id },
            data: { status: OutboxStatus.FAILED },
          });
        } catch (dbError) {
          this.logger.error(`Failed to update event status to FAILED: ${dbError.message}`);
        }
      }
    }
  }
}
