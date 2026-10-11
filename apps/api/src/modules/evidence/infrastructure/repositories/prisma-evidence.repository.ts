import { Injectable } from '@nestjs/common';
import { IEvidenceRepository } from '../../domain/repositories/evidence.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';
import { SubmissionStatus, ProficiencyLevel } from '@digvos/database';

@Injectable()
export class PrismaEvidenceRepository implements IEvidenceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findSubmissionById(id: string): Promise<any> {
    return this.prisma.submission.findUnique({
      where: { id },
      include: { student: true },
    });
  }

  async createSubmission(data: {
    studentId: string;
    competencyId: string;
    fileUrl: string;
    tenantId: string;
    status?: SubmissionStatus;
  }): Promise<any> {
    return this.prisma.submission.create({
      data: {
        studentId: data.studentId,
        competencyId: data.competencyId,
        fileUrl: data.fileUrl,
        tenantId: data.tenantId,
        status: data.status || SubmissionStatus.UPLOADED,
        score: null,
        feedback: null,
      },
    });
  }

  async updateSubmission(
    id: string,
    data: {
      status?: SubmissionStatus;
      score?: number;
      feedback?: string;
      isGradedByAI?: boolean;
    },
  ): Promise<any> {
    return this.prisma.submission.update({
      where: { id },
      data,
    });
  }

  async createEventLog(eventName: string, payload: any): Promise<void> {
    await this.prisma.eventLog.create({
      data: {
        eventName,
        payload,
        status: 'PENDING',
      },
    });
  }

  async findCompetencyById(id: string): Promise<any> {
    return this.prisma.competency.findUnique({
      where: { id },
    });
  }

  async updateStudentCompetency(
    studentId: string,
    competencyId: string,
    level: ProficiencyLevel,
  ): Promise<any> {
    return this.prisma.studentCompetency.upsert({
      where: {
        studentId_competencyId: {
          studentId,
          competencyId,
        },
      },
      update: {
        proficiencyLevel: level,
      },
      create: {
        studentId,
        competencyId,
        proficiencyLevel: level,
      },
    });
  }
}
