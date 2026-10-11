import { IDomainEvent } from './domain-event';

export interface IEventPublisher {
  publish(events: IDomainEvent[]): Promise<void>;
}
