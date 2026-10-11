import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const host = this.configService.get<string>('REDIS_HOST', 'localhost');
    const port = this.configService.get<number>('REDIS_PORT', 6379);
    const password = this.configService.get<string>('REDIS_PASSWORD');
    const useTls = this.configService.get<string>('REDIS_TLS') === 'true';

    this.logger.log(`Connecting to Redis at ${host}:${port} (TLS: ${useTls})`);

    // Sử dụng lazyConnect hoặc retryStrategy để tránh sập app khi chạy test cục bộ không có Redis
    this.client = new Redis({
      host,
      port,
      password: password || undefined,
      tls: useTls ? {} : undefined,
      lazyConnect: true,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          this.logger.warn(`Redis connection failed. Falling back to offline mode.`);
          return null; // Dừng retry
        }
        return Math.min(times * 100, 2000);
      },
    });

    this.client.on('error', (err) => {
      this.logger.warn(`Redis client error: ${err.message}`);
    });

    this.client.connect().catch((err) => {
      this.logger.error(`Failed to connect to Redis: ${err.message}`);
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }
}
