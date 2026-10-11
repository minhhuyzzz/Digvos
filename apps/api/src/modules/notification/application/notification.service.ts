import { Injectable, Inject } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories/notification.repository.interface';
import { NotificationType } from '../domain/enums/notification-type.enum';
import { NotificationStatus } from '../domain/enums/notification-status.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async notify(
    userId: string,
    type: NotificationType,
    payload: Record<string, unknown>,
  ): Promise<any> {
    const notification = await this.notificationRepository.create(userId, type, payload);
    
    // Phát tán sự kiện để Realtime Gateway / SSE Service push tới client
    this.eventEmitter.emit('notification.created', {
      userId,
      notification,
    });

    return notification;
  }

  async getUserNotifications(userId: string, status?: NotificationStatus): Promise<any[]> {
    return this.notificationRepository.findByUser(userId, status);
  }

  async markAsRead(id: string): Promise<void> {
    return this.notificationRepository.markAsRead(id);
  }

  async markAllAsRead(userId: string): Promise<void> {
    return this.notificationRepository.markAllAsRead(userId);
  }
}
