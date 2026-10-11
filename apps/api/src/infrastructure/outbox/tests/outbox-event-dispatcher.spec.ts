import { Test, TestingModule } from '@nestjs/testing';
import { DomainEventDispatcher } from '../../../common/core/domain-event-dispatcher';
import { IEventPublisher } from '../../../common/core/event-publisher.interface';
import { AggregateRoot } from '../../../common/core/aggregate-root';
import { IDomainEvent } from '../../../common/core/domain-event';

// 1. Tạo Mock Event
class DummyEvent implements IDomainEvent {
  occurredAt = new Date();
  constructor(public readonly id: string, public readonly payload: string) {}
  getAggregateId(): string {
    return this.id;
  }
  get eventName(): string {
    return 'DummyEventOccurred';
  }
}

// 2. Tạo Mock Aggregate
class DummyAggregate extends AggregateRoot<{ name: string }> {
  constructor(id: string) {
    super({ name: 'dummy' }, id);
  }

  doSomething(payload: string) {
    this.addDomainEvent(new DummyEvent(this.id, payload));
  }
}

describe('DomainEventDispatcher & AggregateRoot', () => {
  let dispatcher: DomainEventDispatcher;
  let mockPublisher: jest.Mocked<IEventPublisher>;

  beforeEach(async () => {
    mockPublisher = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainEventDispatcher,
        {
          provide: 'IEventPublisher',
          useValue: mockPublisher,
        },
      ],
    }).compile();

    dispatcher = module.get<DomainEventDispatcher>(DomainEventDispatcher);
  });

  it('should pull domain events from aggregate and clear them', () => {
    const aggregate = new DummyAggregate('agg-123');
    aggregate.doSomething('test payload');

    // Lần đầu tiên pull sẽ có 1 event
    const events = aggregate.pullDomainEvents();
    expect(events.length).toBe(1);
    expect((events[0] as DummyEvent).eventName).toBe('DummyEventOccurred');
    expect((events[0] as DummyEvent).payload).toBe('test payload');

    // Lần tiếp theo pull sẽ rỗng vì đã tự động clear
    const emptyEvents = aggregate.pullDomainEvents();
    expect(emptyEvents.length).toBe(0);
  });

  it('should dispatch events to the publisher', async () => {
    const aggregate = new DummyAggregate('agg-456');
    aggregate.doSomething('dispatched payload');

    await dispatcher.dispatch(aggregate);

    // Kiểm tra xem publisher đã được gọi với event chính xác
    expect(mockPublisher.publish).toHaveBeenCalledTimes(1);
    const publishedEvents = mockPublisher.publish.mock.calls[0][0];
    expect(publishedEvents.length).toBe(1);
    const publishedEvent = publishedEvents[0] as DummyEvent;
    expect(publishedEvent.eventName).toBe('DummyEventOccurred');
    expect(publishedEvent.id).toBe('agg-456');
    expect(publishedEvent.payload).toBe('dispatched payload');
  });
});
