import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from '../application/analytics.service';
import { ProficiencyLevel } from '@digvos/database';
import { ConfigService } from '@nestjs/config';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let mockAnalyticsRepository: any;
  let mockCacheService: any;
  let mockConfigService: any;

  beforeEach(async () => {
    mockAnalyticsRepository = {
      getStudentProgress: jest.fn().mockResolvedValue([
        { competencyId: 'comp-1', proficiencyLevel: ProficiencyLevel.FOUNDATION_2 },
        { competencyId: 'comp-2', proficiencyLevel: ProficiencyLevel.ADVANCED_5 },
      ]),
      getFrameworkAreasAndCompetencies: jest.fn().mockResolvedValue([
        {
          code: 'AREA_1',
          name: 'Information and data literacy',
          competencies: [{ id: 'comp-1' }, { id: 'comp-2' }],
        },
      ]),
      getSystemMetrics: jest.fn().mockResolvedValue({
        studentCount: 10,
        submissionCount: 5,
      }),
    };

    mockCacheService = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
    };

    mockConfigService = {
      get: jest.fn().mockImplementation((key: string, defaultValue?: any) => {
        if (key === 'GEMINI_API_KEY') return 'YOUR_GEMINI_API_KEY_HERE';
        return defaultValue;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        {
          provide: 'IAnalyticsRepository',
          useValue: mockAnalyticsRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'ICacheService',
          useValue: mockCacheService,
        },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  describe('getStudentRadarData', () => {
    it('should compute average proficiency score per DigComp area and cache result', async () => {
      const radar = await service.getStudentRadarData('student-123');

      expect(radar).toHaveLength(1);
      expect(radar[0].areaCode).toBe('AREA_1');
      // comp-1 (FOUNDATION_2 = 2) + comp-2 (ADVANCED_5 = 5) -> average = 3.5
      expect(radar[0].score).toBe(3.5);
      expect(mockCacheService.get).toHaveBeenCalledWith('analytics:student:student-123:radar');
      expect(mockCacheService.set).toHaveBeenCalledWith(
        'analytics:student:student-123:radar',
        expect.any(Array),
        120,
      );
    });
  });

  describe('getStudentSkillGaps', () => {
    it('should compute distance from target level', async () => {
      const analysis = await service.getStudentSkillGaps('student-123', 5);

      expect(analysis.targetLevel).toBe(5);
      expect(analysis.gaps[0].gap).toBe(1.5); // 5 - 3.5 = 1.5
    });
  });

  describe('getStudentRecommendations', () => {
    it('should return fallback/mock recommendations if Gemini key is missing/default', async () => {
      const response = await service.getStudentRecommendations('student-123', 5);

      expect(response.status).toBe('SUCCESS');
      expect(response.recommendations).toHaveLength(1);
      expect(response.recommendations[0].priority).toBe('MEDIUM');
      expect(response.recommendations[0].resources).toContain('https://digcomp.edu.vn/courses/area_1');
    });
  });
});
