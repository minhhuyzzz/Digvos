import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentService } from '../application/assessment.service';
import { CatEngineDomainService } from '../domain/services/cat-engine.service';
import { ProficiencyLevel } from '@digvos/database';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AssessmentService & CAT Engine', () => {
  let service: AssessmentService;
  let catEngine: CatEngineDomainService;
  let mockAssessmentRepository: any;
  let mockEventBus: any;

  beforeEach(async () => {
    mockAssessmentRepository = {
      createEventLog: jest.fn().mockResolvedValue(undefined),
      createQuestion: jest.fn(),
      findQuestionById: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
      listQuestions: jest.fn(),
      createCatSession: jest.fn(),
      findCatSessionById: jest.fn(),
      updateCatSession: jest.fn(),
      createCatResponse: jest.fn(),
      getQuestionsByCompetency: jest.fn(),
      updateStudentCompetency: jest.fn(),
    };

    mockEventBus = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssessmentService,
        CatEngineDomainService,
        {
          provide: 'IAssessmentRepository',
          useValue: mockAssessmentRepository,
        },
        {
          provide: 'IEventBus',
          useValue: mockEventBus,
        },
      ],
    }).compile();

    service = module.get<AssessmentService>(AssessmentService);
    catEngine = module.get<CatEngineDomainService>(CatEngineDomainService);
  });

  describe('CatEngineDomainService', () => {
    it('should map theta to the correct ProficiencyLevel', () => {
      expect(catEngine.mapThetaToLevel(-2.5)).toBe(ProficiencyLevel.FOUNDATION_1);
      expect(catEngine.mapThetaToLevel(0.0)).toBe(ProficiencyLevel.INTERMEDIATE_4);
      expect(catEngine.mapThetaToLevel(2.5)).toBe(ProficiencyLevel.HIGHLY_SPECIALIZED_8);
    });

    it('should update theta correctly on correct/incorrect response', () => {
      const difficulty = catEngine.getDifficulty(ProficiencyLevel.INTERMEDIATE_4);
      const thetaAfterCorrect = catEngine.updateEstimation(0.0, difficulty, true);
      const thetaAfterIncorrect = catEngine.updateEstimation(0.0, difficulty, false);

      expect(thetaAfterCorrect).toBeGreaterThan(0.0);
      expect(thetaAfterIncorrect).toBeLessThan(0.0);
    });
  });

  describe('AssessmentService CAT Flow', () => {
    const mockQuestions = [
      { id: 'q-1', level: ProficiencyLevel.FOUNDATION_1, content: 'Q1', options: { choices: ['A', 'B'], correctAnswerIndex: 0 } },
      { id: 'q-2', level: ProficiencyLevel.INTERMEDIATE_4, content: 'Q2', options: { choices: ['A', 'B'], correctAnswerIndex: 1 } },
      { id: 'q-3', level: ProficiencyLevel.ADVANCED_6, content: 'Q3', options: { choices: ['A', 'B'], correctAnswerIndex: 0 } },
    ];

    it('should start a CAT session and select the first question', async () => {
      mockAssessmentRepository.getQuestionsByCompetency.mockResolvedValue(mockQuestions);
      mockAssessmentRepository.createCatSession.mockResolvedValue({
        id: 'session-123',
        maxQuestions: 5,
        status: 'STARTED',
      });

      const result = await service.startSession('student-1', 'competency-1', 'tenant-1');

      expect(result.success).toBe(true);
      expect(result.sessionId).toBe('session-123');
      expect(result.nextQuestion).toBeDefined();
      expect(mockAssessmentRepository.createCatSession).toHaveBeenCalled();
    });

    it('should process answers and transition difficulty', async () => {
      mockAssessmentRepository.findCatSessionById.mockResolvedValue({
        id: 'session-123',
        competencyId: 'competency-1',
        studentId: 'student-1',
        estimatedTheta: 0.0,
        questionsAsked: 0,
        maxQuestions: 5,
        status: 'STARTED',
        tenantId: 'tenant-1',
        responses: [],
      });
      mockAssessmentRepository.findQuestionById.mockResolvedValue(mockQuestions[1]); // Q2
      mockAssessmentRepository.getQuestionsByCompetency.mockResolvedValue(mockQuestions);

      const result = await service.submitAnswer('session-123', {
        questionId: 'q-2',
        chosenOptionIndex: 1, // Correct answer
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe('STARTED');
      expect(result.estimatedTheta).toBeGreaterThan(0.0); // Theta should increase
      expect(result.nextQuestion).toBeDefined();
      expect(mockAssessmentRepository.createCatResponse).toHaveBeenCalledWith({
        sessionId: 'session-123',
        questionId: 'q-2',
        isCorrect: true,
      });
    });

    it('should terminate the session and update competency when max questions is reached', async () => {
      mockAssessmentRepository.findCatSessionById.mockResolvedValue({
        id: 'session-123',
        competencyId: 'competency-1',
        studentId: 'student-1',
        estimatedTheta: 1.0,
        questionsAsked: 4,
        maxQuestions: 5,
        status: 'STARTED',
        tenantId: 'tenant-1',
        responses: [{ questionId: 'q-1' }, { questionId: 'q-2' }, { questionId: 'q-3' }],
      });
      mockAssessmentRepository.findQuestionById.mockResolvedValue(mockQuestions[2]); // Q3
      mockAssessmentRepository.getQuestionsByCompetency.mockResolvedValue(mockQuestions);

      const result = await service.submitAnswer('session-123', {
        questionId: 'q-3',
        chosenOptionIndex: 0, // Correct answer
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe('COMPLETED');
      expect(result.finalLevel).toBeDefined();
      expect(mockAssessmentRepository.updateStudentCompetency).toHaveBeenCalled();
      expect(mockEventBus.publish).toHaveBeenCalledWith('AssessmentCompleted', expect.any(Object));
    });
  });
});
