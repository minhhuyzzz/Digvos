import { Module } from '@nestjs/common';
import { PresenceService } from './services/presence.service';
import { SseService } from './services/sse.service';
import { RealtimeGateway } from './gateways/realtime.gateway';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { RedisModule } from '../../infrastructure/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [
    PresenceService,
    SseService,
    RealtimeGateway,
    WsAuthGuard,
  ],
  exports: [
    PresenceService,
    SseService,
    RealtimeGateway,
  ],
})
export class RealtimeModule {}
