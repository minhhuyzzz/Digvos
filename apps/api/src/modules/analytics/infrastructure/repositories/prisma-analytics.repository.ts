import { Injectable } from '@nestjs/common';
import { IAnalyticsRepository } from '../../domain/repositories/analytics.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class PrismaAnalyticsRepository implements IAnalyticsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSystemMetrics(): Promise<any> {
    const studentCount = await this.prisma.user.count({ where: { role: 'STUDENT' } });
    const teacherCount = await this.prisma.user.count({ where: { role: 'TEACHER' } });
    const submissionCount = await this.prisma.submission.count();
    const certificateCount = await this.prisma.certificate.count({ where: { status: 'ISSUED' } });
    
    // Average proficiency level distribution
    const studentCompetencies = await this.prisma.studentCompetency.findMany();
    
    return {
      studentCount,
      teacherCount,
      submissionCount,
      certificateCount,
      competencyDistribution: studentCompetencies.reduce((acc: any, curr) => {
        acc[curr.proficiencyLevel] = (acc[curr.proficiencyLevel] || 0) + 1;
        return acc;
      }, {}),
    };
  }

  async getStudentProgress(studentIdOrUserId: string): Promise<any[]> {
    const profile = await this.prisma.studentProfile.findFirst({
      where: {
        OR: [
          { id: studentIdOrUserId },
          { userId: studentIdOrUserId },
        ],
      },
    });

    if (!profile) return [];

    return this.prisma.studentCompetency.findMany({
      where: { studentId: profile.id },
      include: {
        competency: {
          include: {
            area: true,
          },
        },
      },
    });
  }

  async getFrameworkAreasAndCompetencies(): Promise<any[]> {
    return this.prisma.competencyArea.findMany({
      include: {
        competencies: true,
      },
      orderBy: { code: 'asc' },
    });
  }
}
