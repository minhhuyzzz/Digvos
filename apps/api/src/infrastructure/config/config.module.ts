import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection URL'),
  PORT: z.coerce.number().default(4000),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  BLOCKCHAIN_MOCK: z.enum(['true', 'false']).default('true'),
  AI_MOCK: z.enum(['true', 'false']).default('true'),
  EMAIL_MOCK: z.enum(['true', 'false']).default('true'),
});

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '../../.env',
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          console.error('❌ Invalid environment configuration:');
          console.error(parsed.error.format());
          throw new Error('Config validation failed');
        }
        return parsed.data;
      },
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
