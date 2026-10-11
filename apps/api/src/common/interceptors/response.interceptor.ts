import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseEnvelope<T> {
  success: boolean;
  data: T;
  meta: {
    timestamp: string;
  };
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseEnvelope<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseEnvelope<T>> {
    // Không bọc các phản hồi Swagger docs hoặc SSE stream
    const req = context.switchToHttp().getRequest();
    if (req.url.includes('/api/docs') || req.headers['accept'] === 'text/event-stream') {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        // Nếu đã được bọc thủ công từ trước, trả về trực tiếp
        if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
          return data;
        }

        return {
          success: true,
          data: data !== undefined ? data : null,
          meta: {
            timestamp: new Date().toISOString(),
          },
        };
      })
    );
  }
}
