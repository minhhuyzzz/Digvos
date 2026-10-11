import { ProficiencyLevel } from '@digvos/database';

export interface IAssessmentRepository {
  createEventLog(eventName: string, payload: any): Promise<void>;

  // Questions Bank CRUD
  createQuestion(data: {
    competencyId: string;
    level: ProficiencyLevel;
    content: string;
    options: any;
    tenantId: string;
  }): Promise<any>;
  findQuestionById(id: string): Promise<any>;
  updateQuestion(id: string, data: {
    level?: ProficiencyLevel;
    content?: string;
    options?: any;
  }): Promise<any>;
  deleteQuestion(id: string): Promise<any>;
  listQuestions(tenantId: string, competencyId?: string): Promise<any[]>;

  // CAT Adaptive Testing Sessions
  createCatSession(data: {
    studentId: string;
    competencyId: string;
    maxQuestions?: number;
    tenantId: string;
  }): Promise<any>;
  findCatSessionById(id: string): Promise<any>;
  updateCatSession(
    id: string,
    data: {
      status?: string;
      currentLevel?: ProficiencyLevel;
      estimatedTheta?: number;
      questionsAsked?: number;
    },
  ): Promise<any>;
  createCatResponse(data: {
    sessionId: string;
    questionId: string;
    isCorrect: boolean;
  }): Promise<any>;
  getQuestionsByCompetency(competencyId: string): Promise<any[]>;
  updateStudentCompetency(
    studentId: string,
    competencyId: string,
    level: ProficiencyLevel,
  ): Promise<any>;
}
