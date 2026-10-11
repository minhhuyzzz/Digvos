export interface IGradingResult {
  score: number;
  feedback: string;
  status: 'PASSED' | 'FAILED' | 'NEEDS_REVIEW';
}

export interface IAIGradingProvider {
  gradeSubmission(submissionContent: string, criteria: string): Promise<IGradingResult>;
}
