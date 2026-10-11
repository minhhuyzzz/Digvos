import { Module, NestModule, MiddlewareConsumer, Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import Redis from 'ioredis';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { ContextMiddleware } from './common/middlewares/context.middleware';
import { CompetencyModule } from './modules/competency/competency.module';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { EvidenceModule } from './modules/evidence/evidence.module';
import { OutboxModule } from './infrastructure/outbox/outbox.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { BlockchainModule } from './infrastructure/blockchain/blockchain.module';
import { EmailModule } from './infrastructure/email/email.module';
import { IdentityModule } from './modules/identity/identity.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AIModule } from './modules/ai/ai.module';
import { LearningModule } from './modules/learning/learning.module';

import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { BillingModule } from './modules/billing/billing.module';
import { NotificationModule } from './modules/notification/notification.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { AuditModule } from './modules/audit/audit.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { HealthModule } from './infrastructure/health/health.module';
import { SchedulerModule } from './infrastructure/scheduler/scheduler.module';
import { FeatureFlagModule } from './infrastructure/feature-flag/feature-flag.module';
import { CacheModule } from './infrastructure/cache/cache.module';
import { EventBusModule } from './infrastructure/event-bus/event-bus.module';

@Injectable()
export class SafeThrottlerGuard extends ThrottlerGuard {
  private readonly guardLogger = new Logger(SafeThrottlerGuard.name);

  protected async handleRequest(
    options: any,
  ): Promise<boolean> {
    try {
      return await super.handleRequest(options);
    } catch (err: any) {
      this.guardLogger.warn(`Throttler storage error, bypassing check: ${err.message}`);
      return true; // Fail-Open: bypass rate limit check if Redis is offline
    }
  }
}


@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    RedisModule,
    QueueModule,
    StorageModule,
    BlockchainModule,
    EmailModule,
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const throttlerRedisClient = new Redis({
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get('REDIS_PORT', 6379),
          password: config.get('REDIS_PASSWORD') || undefined,
          maxRetriesPerRequest: null,
          enableOfflineQueue: false,
          lazyConnect: true,
        });

        throttlerRedisClient.on('error', (err) => {
          // Silent catch to prevent process crash
        });

        return {
          throttlers: [
            {
              name: 'short',
              ttl: 1000,
              limit: 3,
            },
            {
              name: 'medium',
              ttl: 10000,
              limit: 20,
            },
            {
              name: 'long',
              ttl: 60000,
              limit: 100,
            }
          ],
          storage: new ThrottlerStorageRedisService(throttlerRedisClient),
        };
      },
    }),
    PrismaModule,
    CompetencyModule,
    AssessmentModule,
    EvidenceModule,
    OutboxModule,
    IdentityModule,
    TenantModule,
    ProfilesModule,
    WorkspaceModule,
    CertificateModule,
    AnalyticsModule,
    AIModule,
    LearningModule,
    RecruitmentModule,
    BillingModule,
    NotificationModule,
    RealtimeModule,
    AuditModule,
    AuthorizationModule,
    HealthModule,
    SchedulerModule,
    FeatureFlagModule,
    CacheModule,
    EventBusModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SafeThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ContextMiddleware, TenantMiddleware)
      .forRoutes('*');
  }
}
