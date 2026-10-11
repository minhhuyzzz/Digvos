import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthCheckError } from '@nestjs/terminus';
import { PrismaService } from '../prisma/services/prisma.service';
import { RedisService } from '../redis/redis.service';
import { StorageService } from '../storage/storage.service';
import { ConfigService } from '@nestjs/config';
import { ListBucketsCommand } from '@aws-sdk/client-s3';
import { Public } from '../../modules/identity/presentation/decorators/public.decorator';

@Public()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly storage: StorageService,
    private readonly config: ConfigService,
  ) {}

  @Get('readiness')
  @HealthCheck()
  async checkReadiness() {
    return this.health.check([
      // 1. Postgres Database check (Prisma)
      async () => {
        try {
          await this.prisma.$queryRaw`SELECT 1`;
          return { database: { status: 'up' } };
        } catch (err) {
          throw new HealthCheckError('Database is down', { database: { status: 'down', message: err.message } });
        }
      },
      
      // 2. Redis check
      async () => {
        try {
          const client = this.redis.getClient();
          if (client && client.status === 'ready') {
            return { redis: { status: 'up' } };
          }
          throw new Error(`Redis status is ${client?.status || 'undefined'}`);
        } catch (err) {
          throw new HealthCheckError('Redis is down', { redis: { status: 'down', message: err.message } });
        }
      },

      // 3. Supabase Storage check (S3 client)
      async () => {
        const s3Client = (this.storage as any).s3Client;
        if (!s3Client) {
          return { supabase_storage: { status: 'up', mode: 'simulated' } };
        }
        try {
          // Thử ping Supabase Storage S3 client
          await s3Client.send(new ListBucketsCommand({}));
          return { supabase_storage: { status: 'up', mode: 'live' } };
        } catch (err) {
          throw new HealthCheckError('Supabase Storage is down', { supabase_storage: { status: 'down', message: err.message } });
        }
      },

      // 4. Gemini API connection check (sử dụng native fetch)
      async () => {
        const apiKey = this.config.get<string>('GEMINI_API_KEY');
        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
          return { gemini_api: { status: 'up', mode: 'unconfigured' } };
        }
        try {
          const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models');
          if (res.ok || res.status < 500) {
            return { gemini_api: { status: 'up' } };
          }
          throw new Error(`HTTP status ${res.status}`);
        } catch (err) {
          throw new HealthCheckError('Gemini API connection failed', { gemini_api: { status: 'down', message: err.message } });
        }
      },

      // 5. Auth0 JWKS connection check (sử dụng native fetch)
      async () => {
        const issuer = this.config.get<string>('AUTH0_ISSUER_BASE_URL');
        if (!issuer || issuer.includes('YOUR_DOMAIN')) {
          return { auth0_jwks: { status: 'up', mode: 'unconfigured' } };
        }
        try {
          const url = `${issuer.replace(/\/$/, '')}/.well-known/jwks.json`;
          const res = await fetch(url);
          if (res.ok) {
            return { auth0_jwks: { status: 'up' } };
          }
          throw new Error(`HTTP status ${res.status}`);
        } catch (err) {
          throw new HealthCheckError('Auth0 JWKS connection failed', { auth0_jwks: { status: 'down', message: err.message } });
        }
      }
    ]);
  }

  @Get('liveness')
  @HealthCheck()
  async checkLiveness() {
    return this.health.check([
      () => ({ liveness: { status: 'up' } })
    ]);
  }
}
