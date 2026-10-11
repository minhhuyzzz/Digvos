import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { requestContextStorage } from '../core/als.context';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    // 1. Lấy từ ALS request context
    const store = requestContextStorage.getStore();
    if (store?.userId) {
      return store.userId;
    }
    
    // 2. Fallback từ Request Headers (cho dev testing)
    const request = ctx.switchToHttp().getRequest();
    const userIdHeader = request.headers['x-user-id'] as string;
    if (userIdHeader) {
      return userIdHeader;
    }

    // 3. Fallback từ request.user (sau khi qua JWT Auth Guard)
    if (request.user && request.user.id) {
      return request.user.id;
    }

    // Trả về mock userId mặc định nếu không có để dev tiện test
    return 'default-user-id';
  },
);
