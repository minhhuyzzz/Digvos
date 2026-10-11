import { Injectable, Inject } from '@nestjs/common';
import { IAIGradingProvider, IGradingResult } from '../domain/providers/ai-provider.interface';

@Injectable()
export class AIService {
  constructor(
    @Inject('IAIGradingProvider')
    private readonly aiGradingProvider: IAIGradingProvider,
  ) {}

  async gradeSubmission(submissionContent: string, criteria: string): Promise<IGradingResult> {
    return this.aiGradingProvider.gradeSubmission(submissionContent, criteria);
  }
}
