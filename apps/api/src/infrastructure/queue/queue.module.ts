import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>('REDIS_PASSWORD') || undefined,
          tls: configService.get<string>('REDIS_TLS') === 'true' ? {} : undefined,
          maxRetriesPerRequest: null,
          enableOfflineQueue: false,
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 1000,
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 10000,
          },
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
