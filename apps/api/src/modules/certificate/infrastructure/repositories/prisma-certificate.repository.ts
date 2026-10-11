import { Injectable } from '@nestjs/common';
import { ICertificateRepository } from '../../domain/repositories/certificate.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';
import { CertificateStatus, ProficiencyLevel } from '@digvos/database';

@Injectable()
export class PrismaCertificateRepository implements ICertificateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCertificateById(id: string): Promise<any> {
    return this.prisma.certificate.findUnique({
      where: { id },
      include: {
        student: {
          include: { user: true },
        },
        competency: {
          include: { area: true },
        },
      },
    });
  }

  async findCertificateByVerificationCode(verificationCode: string): Promise<any> {
    return this.prisma.certificate.findUnique({
      where: { verificationCode },
      include: {
        student: {
          include: { user: true },
        },
        competency: {
          include: { area: true },
        },
      },
    });
  }

  async findCertificateByUniqueComposite(
    studentId: string,
    competencyId: string,
    level: ProficiencyLevel,
  ): Promise<any> {
    return this.prisma.certificate.findUnique({
      where: {
        studentId_competencyId_level: {
          studentId,
          competencyId,
          level,
        },
      },
    });
  }

  async createCertificate(data: {
    studentId: string;
    competencyId: string;
    level: ProficiencyLevel;
    status?: CertificateStatus;
    verificationCode: string;
    tenantId: string;
  }): Promise<any> {
    return this.prisma.certificate.create({
      data: {
        studentId: data.studentId,
        competencyId: data.competencyId,
        level: data.level,
        status: data.status || CertificateStatus.PENDING,
        verificationCode: data.verificationCode,
        tenantId: data.tenantId,
      },
    });
  }

  async updateCertificate(
    id: string,
    data: {
      status?: CertificateStatus;
      tokenId?: string;
      txHash?: string;
      qrCode?: string;
      metadata?: any;
    },
  ): Promise<any> {
    return this.prisma.certificate.update({
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

  async findStudentWithProfile(studentId: string): Promise<any> {
    return this.prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: { user: true },
    });
  }

  async findCompetencyWithArea(competencyId: string): Promise<any> {
    return this.prisma.competency.findUnique({
      where: { id: competencyId },
      include: { area: true },
    });
  }
}
