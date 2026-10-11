import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAIGradingProvider, IGradingResult } from '../../domain/providers/ai-provider.interface';

@Injectable()
export class GeminiGradingProvider implements IAIGradingProvider {
  private readonly logger = new Logger(GeminiGradingProvider.name);
  private genAI: GoogleGenerativeAI | null = null;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
      this.genAI = new GoogleGenerativeAI(apiKey);
    } else {
      this.logger.warn('GEMINI_API_KEY is not configured. GeminiGradingProvider will run in mock mode.');
    }
  }

  async gradeSubmission(submissionContent: string, criteria: string): Promise<IGradingResult> {
    if (!this.genAI) {
      this.logger.log('[Mock Gemini] Grading submission via mock fallback.');
      return {
        score: 80,
        feedback: 'Mock AI Feedback: Minh chứng/bài nộp đã được chấm điểm giả lập thành công.',
        status: 'PASSED',
      };
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `
        You are an expert academic evaluator. Grade the following submission content against the given evaluation criteria.
        
        Evaluation Criteria:
        ${criteria}
        
        Submission Content:
        ${submissionContent}
        
        You must return your response in a strict JSON format with the following keys:
        - "score": a number from 0 to 100
        - "feedback": a detailed text feedback in Vietnamese explaining the evaluation
        - "status": one of "PASSED", "FAILED", "NEEDS_REVIEW" (PASSED if score >= 50, FAILED if score < 50, NEEDS_REVIEW if borderline)

        Ensure only valid JSON is returned. Do not include markdown code block formatting.
      `;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      
      this.logger.log(`Gemini raw response: ${text}`);

      // Làm sạch codeblock ```json nếu có
      const cleanJsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonStr);

      return {
        score: typeof parsed.score === 'number' ? parsed.score : 50,
        feedback: parsed.feedback || 'Không có phản hồi từ AI.',
        status: ['PASSED', 'FAILED', 'NEEDS_REVIEW'].includes(parsed.status) ? parsed.status : 'NEEDS_REVIEW',
      };
    } catch (err) {
      this.logger.error(`Failed to grade submission using Gemini: ${err.message}`);
      return {
        score: 50,
        feedback: `Lỗi kết nối AI: ${err.message}. Hệ thống chuyển về chế độ cần Giảng viên review thủ công.`,
        status: 'NEEDS_REVIEW',
      };
    }
  }
}
