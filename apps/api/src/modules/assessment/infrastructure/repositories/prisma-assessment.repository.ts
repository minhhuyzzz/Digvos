import { Injectable } from '@nestjs/common';
import { IAssessmentRepository } from '../../domain/repositories/assessment.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';
import { ProficiencyLevel } from '@digvos/database';

@Injectable()
export class PrismaAssessmentRepository implements IAssessmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEventLog(eventName: string, payload: any): Promise<void> {
    await this.prisma.eventLog.create({
      data: {
        eventName,
        payload,
        status: 'PENDING',
      },
    });
  }

  // Questions Bank CRUD
  async createQuestion(data: {
    competencyId: string;
    level: ProficiencyLevel;
    content: string;
    options: any;
    tenantId: string;
  }): Promise<any> {
    return this.prisma.question.create({
      data: {
        competencyId: data.competencyId,
        level: data.level,
        content: data.content,
        options: data.options,
        tenantId: data.tenantId,
      },
    });
  }

  async findQuestionById(id: string): Promise<any> {
    return this.prisma.question.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async updateQuestion(id: string, data: {
    level?: ProficiencyLevel;
    content?: string;
    options?: any;
  }): Promise<any> {
    return this.prisma.question.update({
      where: { id },
      data,
    });
  }

  async deleteQuestion(id: string): Promise<any> {
    return this.prisma.question.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async listQuestions(tenantId: string, competencyId?: string): Promise<any[]> {
    return this.prisma.question.findMany({
      where: {
        tenantId,
        competencyId,
        deletedAt: null,
      },
    });
  }

  // CAT Adaptive Testing Sessions
  async createCatSession(data: {
    studentId: string;
    competencyId: string;
    maxQuestions?: number;
    tenantId: string;
  }): Promise<any> {
    return this.prisma.catSession.create({
      data: {
        studentId: data.studentId,
        competencyId: data.competencyId,
        maxQuestions: data.maxQuestions || 10,
        status: 'STARTED',
        currentLevel: 'FOUNDATION_1',
        estimatedTheta: 0.0,
        tenantId: data.tenantId,
      },
    });
  }

  async findCatSessionById(id: string): Promise<any> {
    return this.prisma.catSession.findUnique({
      where: { id },
      include: {
        responses: true,
      },
    });
  }

  async updateCatSession(
    id: string,
    data: {
      status?: string;
      currentLevel?: ProficiencyLevel;
      estimatedTheta?: number;
      questionsAsked?: number;
    },
  ): Promise<any> {
    return this.prisma.catSession.update({
      where: { id },
      data,
    });
  }

  async createCatResponse(data: {
    sessionId: string;
    questionId: string;
    isCorrect: boolean;
  }): Promise<any> {
    return this.prisma.catResponse.create({
      data: {
        sessionId: data.sessionId,
        questionId: data.questionId,
        isCorrect: data.isCorrect,
      },
    });
  }

  async getQuestionsByCompetency(competencyId: string): Promise<any[]> {
    return this.prisma.question.findMany({
      where: {
        competencyId,
        deletedAt: null,
      },
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
