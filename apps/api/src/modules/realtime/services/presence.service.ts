import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../../infrastructure/redis/redis.service';

@Injectable()
export class PresenceService {
  private readonly logger = new Logger(PresenceService.name);
  private readonly inMemoryPresence = new Set<string>();

  constructor(private readonly redisService: RedisService) {}

  async setOnline(userId: string): Promise<void> {
    try {
      const client = this.redisService.getClient();
      if (client && client.status === 'ready') {
        await client.sadd('online_users', userId);
        return;
      }
    } catch (err) {
      this.logger.error(`Redis setOnline failed, using fallback: ${err.message}`);
    }
    this.inMemoryPresence.add(userId);
  }

  async setOffline(userId: string): Promise<void> {
    try {
      const client = this.redisService.getClient();
      if (client && client.status === 'ready') {
        await client.srem('online_users', userId);
        return;
      }
    } catch (err) {
      this.logger.error(`Redis setOffline failed, using fallback: ${err.message}`);
    }
    this.inMemoryPresence.delete(userId);
  }

  async isOnline(userId: string): Promise<boolean> {
    try {
      const client = this.redisService.getClient();
      if (client && client.status === 'ready') {
        const result = await client.sismember('online_users', userId);
        return result === 1;
      }
    } catch (err) {
      this.logger.error(`Redis isOnline failed, using fallback: ${err.message}`);
    }
    return this.inMemoryPresence.has(userId);
  }

  async getOnlineUsers(): Promise<string[]> {
    try {
      const client = this.redisService.getClient();
      if (client && client.status === 'ready') {
        return await client.smembers('online_users');
      }
    } catch (err) {
      this.logger.error(`Redis getOnlineUsers failed, using fallback: ${err.message}`);
    }
    return Array.from(this.inMemoryPresence);
  }
}
