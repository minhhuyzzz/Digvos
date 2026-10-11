import { SubmissionStatus, ProficiencyLevel } from '@digvos/database';

export interface IEvidenceRepository {
  findSubmissionById(id: string): Promise<any>;
  createSubmission(data: {
    studentId: string;
    competencyId: string;
    fileUrl: string;
    tenantId: string;
    status?: SubmissionStatus;
  }): Promise<any>;
  updateSubmission(
    id: string,
    data: {
      status?: SubmissionStatus;
      score?: number;
      feedback?: string;
      isGradedByAI?: boolean;
    },
  ): Promise<any>;
  createEventLog(eventName: string, payload: any): Promise<void>;
  findCompetencyById(id: string): Promise<any>;
  updateStudentCompetency(
    studentId: string,
    competencyId: string,
    level: ProficiencyLevel,
  ): Promise<any>;
}
