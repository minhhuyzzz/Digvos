export interface IAnalyticsRepository {
  getSystemMetrics(): Promise<any>;
  getStudentProgress(studentId: string): Promise<any[]>;
  getFrameworkAreasAndCompetencies(): Promise<any[]>;
}
