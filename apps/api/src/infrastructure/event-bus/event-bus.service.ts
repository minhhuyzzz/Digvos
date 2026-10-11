import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventBus } from '../../common/core/event-bus.interface';

@Injectable()
export class NestJsEventBus implements IEventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish(eventName: string, payload: any): Promise<void> {
    await this.eventEmitter.emitAsync(eventName, payload);
  }
}
