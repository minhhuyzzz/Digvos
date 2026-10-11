import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../application/notification.service';
import { NotificationType } from '../domain/enums/notification-type.enum';

@Injectable()
export class NotificationListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('EvidenceSubmittedEvent')
  async handleEvidenceSubmitted(payload: {
    submissionId: string;
    studentId: string;
    competencyId: string;
    fileUrl: string;
    tenantId: string;
  }) {
    await this.notificationService.notify(payload.studentId, NotificationType.EVIDENCE_SUBMITTED, {
      submissionId: payload.submissionId,
      competencyId: payload.competencyId,
      message: 'Minh chứng của bạn đã được tải lên thành công và đang được xử lý.',
    });
  }

  @OnEvent('EvidenceAIGradedEvent')
  async handleEvidenceAIGraded(payload: {
    submissionId: string;
    studentId: string;
    competencyId: string;
    score: number;
    feedback: string;
    status: string;
    tenantId: string;
  }) {
    await this.notificationService.notify(payload.studentId, NotificationType.AI_FINISHED, {
      submissionId: payload.submissionId,
      competencyId: payload.competencyId,
      score: payload.score,
      feedback: payload.feedback,
      status: payload.status,
      message: `AI đã chấm điểm minh chứng của bạn. Điểm: ${payload.score}. Nhận xét: ${payload.feedback}`,
    });
  }

  @OnEvent('EvidenceApprovedEvent')
  async handleEvidenceApproved(payload: {
    submissionId: string;
    studentId: string;
    competencyId: string;
    score: number;
    feedback: string;
    tenantId: string;
  }) {
    await this.notificationService.notify(payload.studentId, NotificationType.EVIDENCE_APPROVED, {
      submissionId: payload.submissionId,
      competencyId: payload.competencyId,
      score: payload.score,
      feedback: payload.feedback,
      message: `Minh chứng của bạn đã được phê duyệt thành công bởi Giảng viên. Điểm số: ${payload.score}`,
    });
  }

  @OnEvent('EvidenceRejectedEvent')
  async handleEvidenceRejected(payload: {
    submissionId: string;
    studentId: string;
    competencyId: string;
    score: number;
    feedback: string;
    tenantId: string;
  }) {
    await this.notificationService.notify(payload.studentId, NotificationType.EVIDENCE_REJECTED, {
      submissionId: payload.submissionId,
      competencyId: payload.competencyId,
      score: payload.score,
      feedback: payload.feedback,
      message: `Minh chứng của bạn đã bị từ chối phê duyệt bởi Giảng viên. Nhận xét: ${payload.feedback}`,
    });
  }

  @OnEvent('CertificateIssuedEvent')
  async handleCertificateIssued(payload: {
    certificateId: string;
    studentId: string;
    competencyId: string;
    level: string;
    tokenId: string;
    txHash: string;
    tenantId: string;
  }) {
    await this.notificationService.notify(payload.studentId, NotificationType.CERTIFICATE_ISSUED, {
      certificateId: payload.certificateId,
      competencyId: payload.competencyId,
      level: payload.level,
      tokenId: payload.tokenId,
      txHash: payload.txHash,
      message: `Chúc mừng! Chứng chỉ Soulbound Token (SBT) cấp độ ${payload.level} cho năng lực của bạn đã được đúc thành công trên blockchain Polygon Amoy.`,
    });
  }

  @OnEvent('CertificateRevokedEvent')
  async handleCertificateRevoked(payload: {
    certificateId: string;
    studentId: string;
    competencyId: string;
    level: string;
    reason: string;
    tenantId: string;
  }) {
    await this.notificationService.notify(payload.studentId, NotificationType.CERTIFICATE_REVOKED, {
      certificateId: payload.certificateId,
      competencyId: payload.competencyId,
      level: payload.level,
      reason: payload.reason,
      message: `Cảnh báo: Chứng chỉ Soulbound Token (SBT) cấp độ ${payload.level} của bạn đã bị thu hồi. Lý do: ${payload.reason}`,
    });
  }
}
