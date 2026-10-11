import { Module, Global } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { requestContextStorage } from '../../common/core/als.context';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport: process.env.NODE_ENV !== 'production' ? {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            ignore: 'pid,hostname',
          },
        } : undefined,
        customProps: (req, res) => {
          const store = requestContextStorage.getStore();
          return store ? {
            traceId: store.traceId,
            tenantId: store.tenantId,
            userId: store.userId,
            role: store.role,
          } : {};
        },
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
