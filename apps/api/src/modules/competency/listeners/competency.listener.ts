import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../../infrastructure/prisma/services/prisma.service';
import { CompetencyService } from '../services/competency.service';
import { ProficiencyLevel } from '@digvos/database';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventBus } from '../../../common/core/event-bus.interface';
import { CompetencyAchievedEvent } from '../domain/events/competency-achieved.event';

@Injectable()
export class CompetencyListener {
  constructor(
    private prisma: PrismaService,
    private competencyService: CompetencyService,
    private eventEmitter: EventEmitter2,
    @Inject('IEventBus')
    private readonly eventBus: IEventBus,
  ) {}

  // Lắng nghe sự kiện AssessmentCompleted phát từ Assessment Engine
  @OnEvent('AssessmentCompleted')
  async handleAssessmentCompleted(payload: {
    studentId: string;
    competencyId: string;
    score: number;
    tenantId: string;
  }) {
    const { studentId, competencyId, score, tenantId } = payload;
    console.log(`[Competency Listener] Processing result for student: ${studentId}, score: ${score}`);

    // Quy đổi điểm số (0 - 100) sang 8 Proficiency Levels chuẩn DigComp 3.0
    let level: ProficiencyLevel = ProficiencyLevel.FOUNDATION_1;
    if (score >= 90) {
      level = ProficiencyLevel.HIGHLY_SPECIALIZED_8;
    } else if (score >= 80) {
      level = ProficiencyLevel.HIGHLY_SPECIALIZED_7;
    } else if (score >= 70) {
      level = ProficiencyLevel.ADVANCED_6;
    } else if (score >= 60) {
      level = ProficiencyLevel.ADVANCED_5;
    } else if (score >= 50) {
      level = ProficiencyLevel.INTERMEDIATE_4;
    } else if (score >= 40) {
      level = ProficiencyLevel.INTERMEDIATE_3;
    } else if (score >= 20) {
      level = ProficiencyLevel.FOUNDATION_2;
    }

    // 1. Cập nhật mức độ thành thạo của học viên vào CSDL
    await this.competencyService.updateStudentCompetency(studentId, competencyId, level);

    // 2. Cập nhật trạng thái trong EventLog sang PROCESSED
    await this.prisma.eventLog.updateMany({
      where: {
        eventName: 'AssessmentCompleted',
        status: 'PENDING',
      },
      data: {
        status: 'PROCESSED',
      },
    });

    console.log(`[Competency Engine] Updated student: ${studentId} competency to Level: ${level}`);

    // 3. Phát sự kiện CompetencyAchievedEvent lên EventBus phục vụ Certificate Minting
    const competencyAchievedEvent = new CompetencyAchievedEvent(
      studentId,
      competencyId,
      level,
      tenantId,
    );
    await this.eventBus.publish('CompetencyAchievedEvent', competencyAchievedEvent);

    // Phát sự kiện CompetencyUpdated để các module cũ khác lắng nghe
    this.eventEmitter.emit('CompetencyUpdated', {
      studentId,
      competencyId,
      level,
      tenantId,
    });
  }

  // Lắng nghe sự kiện EvidenceApprovedEvent phát từ Evidence Engine
  @OnEvent('EvidenceApprovedEvent')
  async handleEvidenceApproved(payload: {
    submissionId: string;
    studentId: string;
    competencyId: string;
    score: number;
    tenantId: string;
  }) {
    const { studentId, competencyId, submissionId, score, tenantId } = payload;
    console.log(`[Competency Listener] Processing approved evidence for student: ${studentId}, competency: ${competencyId}, score: ${score}`);

    // Đếm trực tiếp số lượng minh chứng được chấm điểm đạt từ CSDL (Đảm bảo tính Idempotent 100%)
    const evidenceCount = await this.prisma.submission.count({
      where: {
        studentId,
        competencyId,
        score: { gte: 50 },
      },
    });

    // Lấy thông tin tiến trình hiện tại của sinh viên
    const currentProgress = await this.prisma.studentCompetency.findUnique({
      where: {
        studentId_competencyId: {
          studentId,
          competencyId,
        },
      },
    });

    let currentLevel = currentProgress?.proficiencyLevel || ProficiencyLevel.FOUNDATION_1;

    // Nguyên lý: Tích lũy đủ 3 minh chứng chất lượng tốt (score >= 70) 
    // sẽ tự động thăng cấp kỹ năng lên 1 bậc
    if (evidenceCount >= 3 && score >= 70) {
      const levelsOrder = Object.values(ProficiencyLevel);
      const currentIndex = levelsOrder.indexOf(currentLevel);
      if (currentIndex < levelsOrder.length - 1) {
        currentLevel = levelsOrder[currentIndex + 1] as ProficiencyLevel;
        console.log(`[Competency Engine] Student ${studentId} promoted to ${currentLevel} due to sufficient evidence!`);
      }
    }

    // Cập nhật CSDL (Idempotent upsert)
    await this.prisma.studentCompetency.upsert({
      where: {
        studentId_competencyId: {
          studentId,
          competencyId,
        },
      },
      update: {
        evidenceCount,
        proficiencyLevel: currentLevel,
      },
      create: {
        studentId,
        competencyId,
        evidenceCount,
        proficiencyLevel: currentLevel,
      },
    });

    // Cập nhật EventLog sang PROCESSED
    await this.prisma.eventLog.updateMany({
      where: {
        eventName: 'EvidenceApprovedEvent',
        status: 'PENDING',
      },
      data: {
        status: 'PROCESSED',
      },
    });

    // Phát sự kiện CompetencyAchievedEvent lên EventBus phục vụ Certificate Minting
    const competencyAchievedEvent = new CompetencyAchievedEvent(
      studentId,
      competencyId,
      currentLevel,
      tenantId,
    );
    await this.eventBus.publish('CompetencyAchievedEvent', competencyAchievedEvent);

    // Phát sự kiện cập nhật năng lực
    this.eventEmitter.emit('CompetencyUpdated', {
      studentId,
      competencyId,
      level: currentLevel,
      tenantId,
    });
  }

  // Fallback for legacy listener hook
  @OnEvent('EvidenceValidated')
  async handleEvidenceValidated(payload: any) {
    if (payload.isApproved) {
      await this.handleEvidenceApproved(payload);
    }
  }
}
