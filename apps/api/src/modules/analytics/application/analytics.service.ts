import { Injectable, Inject, Logger } from '@nestjs/common';
import { IAnalyticsRepository } from '../domain/repositories/analytics.repository.interface';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProficiencyLevel } from '@digvos/database';
import { ICacheService } from '../../../infrastructure/cache/interfaces/cache.service.interface';
import * as crypto from 'crypto';

const LEVEL_MAPPING: Record<ProficiencyLevel, number> = {
  [ProficiencyLevel.FOUNDATION_1]: 1,
  [ProficiencyLevel.FOUNDATION_2]: 2,
  [ProficiencyLevel.INTERMEDIATE_3]: 3,
  [ProficiencyLevel.INTERMEDIATE_4]: 4,
  [ProficiencyLevel.ADVANCED_5]: 5,
  [ProficiencyLevel.ADVANCED_6]: 6,
  [ProficiencyLevel.HIGHLY_SPECIALIZED_7]: 7,
  [ProficiencyLevel.HIGHLY_SPECIALIZED_8]: 8,
};

export interface LearningRecommendation {
  title: string;
  reason: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedHours: number;
  resources: string[];
}

export interface StudentRecommendationsResponse {
  status: 'SUCCESS' | 'AI_UNAVAILABLE';
  studentId: string;
  generatedAt: string;
  recommendations: LearningRecommendation[];
}

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);
  private genAI: GoogleGenerativeAI | null = null;

  constructor(
    @Inject('IAnalyticsRepository')
    private readonly analyticsRepository: IAnalyticsRepository,
    private readonly configService: ConfigService,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  async getDashboardStats(): Promise<any> {
    const cacheKey = 'analytics:dashboard';
    const cached = await this.cacheService.get<any>(cacheKey);
    if (cached) return cached;

    const data = await this.analyticsRepository.getSystemMetrics();
    await this.cacheService.set(cacheKey, data, 300); // TTL 5 mins
    return data;
  }

  /**
   * Calculates student's proficiency level average per DigComp area
   */
  async getStudentRadarData(studentId: string): Promise<any[]> {
    const cacheKey = `analytics:student:${studentId}:radar`;
    const cached = await this.cacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    const progress = await this.analyticsRepository.getStudentProgress(studentId);
    const framework = await this.analyticsRepository.getFrameworkAreasAndCompetencies();

    // Map competency progress for fast O(1) retrieval
    const progressMap = new Map<string, ProficiencyLevel>();
    progress.forEach((p) => {
      progressMap.set(p.competencyId, p.proficiencyLevel);
    });

    // Compute average numeric level per area
    const data = framework.map((area) => {
      const competencies = area.competencies;
      let totalScore = 0;

      competencies.forEach((comp: any) => {
        const level = progressMap.get(comp.id);
        const numericScore = level ? LEVEL_MAPPING[level] : 0;
        totalScore += numericScore;
      });

      const averageScore = competencies.length > 0 ? totalScore / competencies.length : 0;

      return {
        areaCode: area.code,
        areaName: area.name,
        score: parseFloat(averageScore.toFixed(2)),
      };
    });

    await this.cacheService.set(cacheKey, data, 120); // TTL 2 mins
    return data;
  }

  /**
   * Analyzes Skill Gaps based on a target level
   */
  async getStudentSkillGaps(studentId: string, targetLevel: number = 5): Promise<any> {
    const cacheKey = `analytics:student:${studentId}:gaps:${targetLevel}`;
    const cached = await this.cacheService.get<any>(cacheKey);
    if (cached) return cached;

    const radarData = await this.getStudentRadarData(studentId);

    const gaps = radarData.map((item) => {
      const gapValue = targetLevel - item.score;
      return {
        areaCode: item.areaCode,
        areaName: item.areaName,
        currentScore: item.score,
        targetScore: targetLevel,
        gap: gapValue > 0 ? parseFloat(gapValue.toFixed(2)) : 0,
      };
    });

    const data = {
      studentId,
      targetLevel,
      gaps,
    };

    await this.cacheService.set(cacheKey, data, 120); // TTL 2 mins
    return data;
  }

  /**
   * Invokes Gemini AI to get personalized learning recommendations based on gaps
   */
  async getStudentRecommendations(studentId: string, targetLevel: number = 5): Promise<StudentRecommendationsResponse> {
    const cacheKey = `analytics:student:${studentId}:recommendations:${targetLevel}`;
    const cached = await this.cacheService.get<StudentRecommendationsResponse>(cacheKey);
    if (cached) return cached;

    const gapAnalysis = await this.getStudentSkillGaps(studentId, targetLevel);
    const gaps = gapAnalysis.gaps.filter((g: any) => g.gap > 0);

    const fallbackResponse: StudentRecommendationsResponse = {
      status: 'AI_UNAVAILABLE',
      studentId,
      generatedAt: new Date().toISOString(),
      recommendations: [],
    };

    if (gaps.length === 0) {
      const successEmpty: StudentRecommendationsResponse = {
        status: 'SUCCESS',
        studentId,
        generatedAt: new Date().toISOString(),
        recommendations: [
          {
            title: 'Khóa học nâng cao năng lực DigComp',
            reason: 'Học viên đã đạt và vượt cấp độ năng lực số mục tiêu. Khuyến nghị duy trì và khám phá các chủ đề chuyên sâu.',
            priority: 'LOW',
            estimatedHours: 5,
            resources: ['https://ec.europa.eu/social/main.jsp?catId=1315&langId=en'],
          },
        ],
      };
      await this.cacheService.set(cacheKey, successEmpty, 600); // TTL 10 mins
      return successEmpty;
    }

    if (!this.genAI) {
      this.logger.warn('Gemini API key not configured or invalid. Returning mock recommendation.');
      const mockResult: StudentRecommendationsResponse = {
        status: 'SUCCESS',
        studentId,
        generatedAt: new Date().toISOString(),
        recommendations: gaps.map((g: any) => ({
          title: `Khóa học bồi dưỡng năng lực: ${g.areaName}`,
          reason: `Học viên cần bù đắp khoảng trống kỹ năng ${g.gap} để đạt cấp độ mục tiêu ${targetLevel} ở vùng này.`,
          priority: g.gap > 2 ? 'HIGH' : 'MEDIUM',
          estimatedHours: Math.ceil(g.gap * 8),
          resources: [`https://digcomp.edu.vn/courses/${g.areaCode.toLowerCase()}`],
        })),
      };
      await this.cacheService.set(cacheKey, mockResult, 600); // TTL 10 mins
      return mockResult;
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `
        You are an expert AI education strategist specializing in the European Digital Competence Framework (DigComp 3.0).
        Based on the student's Digital Competency Area gaps (Target Level: ${targetLevel}), suggest a personalized learning pathway.
        
        Current Skill Gaps:
        ${JSON.stringify(gaps, null, 2)}
        
        You must return a valid JSON array of recommendations matching this TypeScript interface structure:
        interface LearningRecommendation {
          title: string;       // Actionable course or topic title in Vietnamese
          reason: string;      // Rationale connecting to the specific skill gap in Vietnamese
          priority: 'HIGH' | 'MEDIUM' | 'LOW';
          estimatedHours: number;
          resources: string[]; // List of recommended resources or URLs
        }

        Return ONLY a raw JSON array. Do not include markdown code block formatting (like \`\`\`json).
      `;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      
      const cleanJsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonStr);

      if (Array.isArray(parsed)) {
        const result: StudentRecommendationsResponse = {
          status: 'SUCCESS',
          studentId,
          generatedAt: new Date().toISOString(),
          recommendations: parsed.map((item: any) => ({
            title: item.title || 'Khóa học năng lực số',
            reason: item.reason || 'Bồi dưỡng khoảng trống kỹ năng',
            priority: ['HIGH', 'MEDIUM', 'LOW'].includes(item.priority) ? item.priority : 'MEDIUM',
            estimatedHours: typeof item.estimatedHours === 'number' ? item.estimatedHours : 10,
            resources: Array.isArray(item.resources) ? item.resources : [],
          })),
        };
        await this.cacheService.set(cacheKey, result, 600); // TTL 10 mins
        return result;
      }

      return fallbackResponse;
    } catch (err) {
      this.logger.error(`Error requesting AI recommendation for student ${studentId}: ${err.message}`);
      return fallbackResponse;
    }
  }
}
