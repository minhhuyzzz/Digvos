import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../../domain/repositories/notification.repository.interface';
import { NotificationType } from '../../domain/enums/notification-type.enum';
import { NotificationStatus } from '../../domain/enums/notification-status.enum';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    type: NotificationType,
    payload: Record<string, unknown>,
  ): Promise<any> {
    return this.prisma.notification.create({
      data: {
        userId,
        type,
        payload: payload as any,
        status: NotificationStatus.UNREAD,
      },
    });
  }

  async findByUser(userId: string, status?: NotificationStatus): Promise<any[]> {
    return this.prisma.notification.findMany({
      where: {
        userId,
        ...(status ? { status } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(id: string): Promise<void> {
    await this.prisma.notification.update({
      where: { id },
      data: {
        status: NotificationStatus.READ,
      },
    });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.prisma.notification.updateMany({
      where: {
        userId,
        status: NotificationStatus.UNREAD,
      },
      data: {
        status: NotificationStatus.READ,
      },
    });
  }
}
