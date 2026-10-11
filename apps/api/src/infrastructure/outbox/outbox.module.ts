import { Module, Global } from '@nestjs/common';
import { OutboxService } from './services/outbox.service';
import { OutboxEventPublisher } from './publishers/outbox-event.publisher';
import { DomainEventDispatcher } from '../../common/core/domain-event-dispatcher';

@Global()
@Module({
  providers: [
    OutboxService,
    {
      provide: 'IEventPublisher',
      useClass: OutboxEventPublisher,
    },
    DomainEventDispatcher,
  ],
  exports: [
    OutboxService,
    'IEventPublisher',
    DomainEventDispatcher,
  ],
})
export class OutboxModule {}
