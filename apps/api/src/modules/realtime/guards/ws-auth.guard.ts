import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger = new Logger(WsAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client = context.switchToWs().getClient();
    const handshake = client.handshake;

    // Lấy token từ handshake auth, query hoặc headers
    const token = handshake.auth?.token || handshake.query?.token || handshake.headers['authorization'];
    const userIdHeader = handshake.headers['x-user-id'] || handshake.query?.userId;
    const tenantIdHeader = handshake.headers['x-tenant-id'] || handshake.query?.tenantId || 'default-tenant-id';

    // Mock decode đơn giản phục vụ dev testing
    let userId = userIdHeader || 'default-user-id';
    if (token && token.startsWith('Bearer ')) {
      userId = 'user-' + token.substring(7, 12);
    }

    // Gắn thông tin vào client.data để các websocket handler khác tái sử dụng
    client.data = client.data || {};
    client.data.userId = userId;
    client.data.tenantId = tenantIdHeader;

    this.logger.log(`WS Connection authenticated for User: ${userId}, Tenant: ${tenantIdHeader}`);
    return true;
  }
}
