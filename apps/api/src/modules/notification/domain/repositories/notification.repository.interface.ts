import { NotificationType } from '../enums/notification-type.enum';
import { NotificationStatus } from '../enums/notification-status.enum';

export interface INotificationRepository {
  create(
    userId: string,
    type: NotificationType,
    payload: Record<string, unknown>,
  ): Promise<any>;
  findByUser(userId: string, status?: NotificationStatus): Promise<any[]>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
}
