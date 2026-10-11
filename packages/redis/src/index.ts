import { Redis } from 'ioredis';
import { Queue, Worker, QueueEvents } from 'bullmq';

// Configuration can be injected or read from env
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';
const REDIS_TLS = process.env.REDIS_TLS === 'true';

const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  ...(REDIS_TLS ? { tls: {} } : {}),
};

export const redis = new Redis(redisConfig);

export function createQueue(name: string) {
  return new Queue(name, { connection: redisConfig });
}

export function createWorker(name: string, processor: any) {
  return new Worker(name, processor, { connection: redisConfig });
}

export function createQueueEvents(name: string) {
  return new QueueEvents(name, { connection: redisConfig });
}
