import { Controller, Get, Patch, Param, Query, Sse, MessageEvent } from '@nestjs/common';
import { Observable, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationService } from '../../application/notification.service';
import { NotificationStatus } from '../../domain/enums/notification-status.enum';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('notification')
@Controller('api/v1/notifications')
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Tenant ID phục vụ phân tách dữ liệu đa doanh nghiệp (SaaS)',
  required: false,
})
@ApiHeader({
  name: 'X-User-ID',
  description: 'Mock User ID phục vụ dev testing',
  required: false,
})
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Sse('sse')
  @ApiOperation({ summary: 'Đăng ký nhận thông báo thời gian thực qua Server-Sent Events (SSE)' })
  subscribeToNotifications(@CurrentUser() userId: string): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'notification.created').pipe(
      filter((event: any) => event.userId === userId),
      map((event: any) => ({
        data: event.notification,
      } as MessageEvent)),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thông báo của người dùng hiện tại' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách thông báo.' })
  async getNotifications(
    @CurrentUser() userId: string,
    @Query('status') status?: NotificationStatus,
  ) {
    return this.notificationService.getUserNotifications(userId, status);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Đánh dấu tất cả thông báo của người dùng là đã đọc' })
  @ApiResponse({ status: 200, description: 'Thực hiện thành công.' })
  async readAllNotifications(@CurrentUser() userId: string) {
    await this.notificationService.markAllAsRead(userId);
    return { success: true };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Đánh dấu một thông báo cụ thể là đã đọc' })
  @ApiResponse({ status: 200, description: 'Thực hiện thành công.' })
  async readNotification(@Param('id') id: string) {
    await this.notificationService.markAsRead(id);
    return { success: true };
  }
}
