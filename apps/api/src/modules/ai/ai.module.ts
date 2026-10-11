import { Module } from '@nestjs/common';
import { AIController } from './presentation/controllers/ai.controller';
import { AIService } from './application/ai.service';
import { GeminiGradingProvider } from './infrastructure/providers/gemini-grading.provider';

@Module({
  controllers: [AIController],
  providers: [
    AIService,
    {
      provide: 'IAIGradingProvider',
      useClass: GeminiGradingProvider,
    },
  ],
  exports: [
    AIService,
    'IAIGradingProvider',
  ],
})
export class AIModule {}
