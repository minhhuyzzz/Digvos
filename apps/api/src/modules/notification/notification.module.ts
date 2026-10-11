import { Module } from '@nestjs/common';
import { NotificationService } from './application/notification.service';
import { PrismaNotificationRepository } from './infrastructure/repositories/prisma-notification.repository';
import { NotificationController } from './presentation/controllers/notification.controller';
import { NotificationListener } from './listeners/notification.listener';

@Module({
  providers: [
    NotificationService,
    NotificationListener,
    {
      provide: 'INotificationRepository',
      useClass: PrismaNotificationRepository,
    },
  ],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
