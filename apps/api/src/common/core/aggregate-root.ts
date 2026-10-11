import { Entity } from './entity';
import { IDomainEvent } from './domain-event';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  public get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    // Console log để audit ngầm chế độ debug/dev
    console.log(`[Domain Event Registered]:`, domainEvent.constructor.name);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public pullDomainEvents(): IDomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }
}
