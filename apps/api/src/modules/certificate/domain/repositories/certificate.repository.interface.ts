import { CertificateStatus, ProficiencyLevel } from '@digvos/database';

export interface ICertificateRepository {
  findCertificateById(id: string): Promise<any>;
  findCertificateByVerificationCode(verificationCode: string): Promise<any>;
  findCertificateByUniqueComposite(
    studentId: string,
    competencyId: string,
    level: ProficiencyLevel,
  ): Promise<any>;
  createCertificate(data: {
    studentId: string;
    competencyId: string;
    level: ProficiencyLevel;
    status?: CertificateStatus;
    verificationCode: string;
    tenantId: string;
  }): Promise<any>;
  updateCertificate(
    id: string,
    data: {
      status?: CertificateStatus;
      tokenId?: string;
      txHash?: string;
      qrCode?: string;
      metadata?: any;
    },
  ): Promise<any>;
  createEventLog(eventName: string, payload: any): Promise<void>;
  findStudentWithProfile(studentId: string): Promise<any>;
  findCompetencyWithArea(competencyId: string): Promise<any>;
}
