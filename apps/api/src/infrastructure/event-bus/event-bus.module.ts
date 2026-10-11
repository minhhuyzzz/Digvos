import { Module, Global } from '@nestjs/common';
import { NestJsEventBus } from './event-bus.service';

@Global()
@Module({
  providers: [
    {
      provide: 'IEventBus',
      useClass: NestJsEventBus,
    },
  ],
  exports: [
    'IEventBus',
  ],
})
export class EventBusModule {}
