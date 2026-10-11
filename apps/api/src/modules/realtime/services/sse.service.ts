import { Injectable, Logger } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OnEvent } from '@nestjs/event-emitter';

export interface SseEvent {
  data: any;
  type?: string;
  id?: string;
  retry?: number;
}

@Injectable()
export class SseService {
  private readonly logger = new Logger(SseService.name);
  private readonly sseSubject = new Subject<{ userId: string; notification: any }>();

  subscribe(userId: string): Observable<SseEvent> {
    this.logger.log(`User subscribed to SSE events: ${userId}`);
    return this.sseSubject.asObservable().pipe(
      filter(event => event.userId === userId),
      map(event => ({
        data: event.notification,
        type: 'notification',
      })),
    );
  }

  @OnEvent('notification.created')
  handleNotificationCreated(event: { userId: string; notification: any }) {
    this.logger.log(`Forwarding notification via SSE to User: ${event.userId}`);
    this.sseSubject.next(event);
  }
}
