import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PresenceService } from '../services/presence.service';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/realtime',
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RealtimeGateway.name);

  @WebSocketServer()
  server: Server;

  // Bản đồ lưu trữ socketId -> userId phục vụ cleanup nhanh
  private readonly socketToUser = new Map<string, string>();

  constructor(private readonly presenceService: PresenceService) {}

  async handleConnection(client: Socket) {
    const handshake = client.handshake;
    const token = (handshake.auth?.token || handshake.query?.token || handshake.headers['authorization']) as string | undefined;
    const userIdHeader = (handshake.headers['x-user-id'] || handshake.query?.userId) as string | undefined;

    let userId = userIdHeader || 'default-user-id';
    if (token && token.startsWith('Bearer ')) {
      userId = 'user-' + token.substring(7, 12);
    }

    client.data = client.data || {};
    client.data.userId = userId;

    await this.presenceService.setOnline(userId);
    this.socketToUser.set(client.id, userId);

    // Join room riêng của user để push notification định hướng
    await client.join(`user:${userId}`);

    this.logger.log(`Client connected: ${client.id} (User: ${userId})`);
  }

  async handleDisconnect(client: Socket) {
    const userId = this.socketToUser.get(client.id);
    if (userId) {
      this.socketToUser.delete(client.id);
      
      // Kiểm tra xem user còn connection nào khác không trước khi set offline
      const room = this.server.sockets.adapter.rooms.get(`user:${userId}`);
      if (!room || room.size === 0) {
        await this.presenceService.setOffline(userId);
      }
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @OnEvent('notification.created')
  handleNotificationCreated(event: { userId: string; notification: any }) {
    this.logger.log(`Pushing real-time WS notification to user:${event.userId}`);
    this.server.to(`user:${event.userId}`).emit('notification', event.notification);
  }
}
