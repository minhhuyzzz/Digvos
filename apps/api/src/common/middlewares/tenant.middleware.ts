import { Injectable, NestMiddleware, BadRequestException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../infrastructure/prisma/services/prisma.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantIdHeader = req.headers['x-tenant-id'] as string;
    const origin = req.headers.origin;
    let resolvedTenantId = tenantIdHeader;

    if (!resolvedTenantId && origin) {
      // Logic phân giải từ domain (chỉ demo, thực tế parse origin)
      const domain = new URL(origin).hostname;
      const cacheKey = `tenant:domain:${domain}`;
      const client = this.redisService.getClient();
      
      let cachedTenantId: string | null = null;
      try {
        if (client && client.status === 'ready') {
          cachedTenantId = await client.get(cacheKey);
        }
      } catch (err) {
        console.warn('Failed to read from Redis cache, falling back to DB:', err);
      }

      if (cachedTenantId) {
        resolvedTenantId = cachedTenantId;
      } else {
        const tenant = await this.prisma.tenant.findUnique({ where: { domain } });
        if (tenant) {
          resolvedTenantId = tenant.id;
          try {
            if (client && client.status === 'ready') {
              await client.set(cacheKey, tenant.id, 'EX', 3600); // cache 1 hour
            }
          } catch (err) {
            console.warn('Failed to write to Redis cache:', err);
          }
        }
      }
    }

    if (!resolvedTenantId) {
      // Fallback for local development
      resolvedTenantId = 'default-tenant-id';
    }

    req['tenantId'] = resolvedTenantId;
    next();
  }
}
