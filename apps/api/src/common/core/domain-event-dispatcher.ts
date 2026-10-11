import { Injectable, Inject } from '@nestjs/common';
import { AggregateRoot } from './aggregate-root';
import { IEventPublisher } from './event-publisher.interface';

@Injectable()
export class DomainEventDispatcher {
  constructor(
    @Inject('IEventPublisher')
    private readonly publisher: IEventPublisher,
  ) {}

  public async dispatch(aggregate: AggregateRoot<any>): Promise<void> {
    const events = aggregate.pullDomainEvents();
    if (events.length === 0) return;

    await this.publisher.publish(events);
  }

  public async dispatchMany(aggregates: AggregateRoot<any>[]): Promise<void> {
    for (const aggregate of aggregates) {
      await this.dispatch(aggregate);
    }
  }
}
