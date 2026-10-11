import { AsyncLocalStorage } from 'async_hooks';

export interface IRequestContext {
  requestId: string;
  traceId?: string;
  tenantId?: string;
  userId?: string;
  role?: string;
}

export const requestContextStorage = new AsyncLocalStorage<IRequestContext>();
