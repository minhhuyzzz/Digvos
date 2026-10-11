import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { requestContextStorage, IRequestContext } from '../core/als.context';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = (req.headers['x-request-id'] as string) || 'req-' + Math.random().toString(36).substring(2, 9);
    const traceId = (req.headers['x-trace-id'] as string) || requestId;

    // After JwtAuthGuard runs, request.user is populated by JwtStrategy.validate()
    const user = (req as any).user;

    // Priority: JWT decoded user > Header fallback > defaults
    const userId = user?.auth0Sub
      || (req.headers['x-user-id'] as string)
      || undefined;

    const tenantId = user?.tenantId
      || (req.headers['x-tenant-id'] as string)
      || 'default-tenant-id';

    const role = user?.role
      || (req.headers['x-user-role'] as string)
      || undefined;

    const context: IRequestContext = {
      requestId,
      traceId,
      tenantId,
      userId,
      role,
    };

    requestContextStorage.run(context, () => {
      next();
    });
  }
}
