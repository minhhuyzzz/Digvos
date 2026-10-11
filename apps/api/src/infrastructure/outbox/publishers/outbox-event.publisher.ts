import { Injectable } from '@nestjs/common';
import { IEventPublisher } from '../../../common/core/event-publisher.interface';
import { IDomainEvent } from '../../../common/core/domain-event';
import { PrismaService } from '../../prisma/services/prisma.service';
import { OutboxStatus } from '../domain/enums/outbox-status.enum';

@Injectable()
export class OutboxEventPublisher implements IEventPublisher {
  constructor(private readonly prisma: PrismaService) {}

  public async publish(events: IDomainEvent[]): Promise<void> {
    const data = events.map(event => ({
      eventName: event.constructor.name,
      payload: JSON.parse(JSON.stringify(event)),
      status: OutboxStatus.PENDING,
    }));

    await this.prisma.eventLog.createMany({
      data,
    });
  }
}
