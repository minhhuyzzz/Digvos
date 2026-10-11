import { Test, TestingModule } from '@nestjs/testing';
import { EvidenceService } from '../application/evidence.service';
import { SubmissionStatus } from '@digvos/database';
import { NotFoundException } from '@nestjs/common';

describe('EvidenceService', () => {
  let service: EvidenceService;
  let mockEvidenceRepository: any;
  let mockEventBus: any;
  let mockQueue: any;

  beforeEach(async () => {
    mockEvidenceRepository = {
      findSubmissionById: jest.fn(),
      createSubmission: jest.fn(),
      updateSubmission: jest.fn(),
      createEventLog: jest.fn(),
      findCompetencyById: jest.fn(),
      updateStudentCompetency: jest.fn(),
    };

    mockEventBus = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    mockQueue = {
      add: jest.fn().mockResolvedValue({ id: 'job-123' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvidenceService,
        {
          provide: 'IEvidenceRepository',
          useValue: mockEvidenceRepository,
        },
        {
          provide: 'IEventBus',
          useValue: mockEventBus,
        },
        {
          provide: 'BullQueue_evidence-processing', // NestJS BullMQ inject token pattern
          useValue: mockQueue,
        },
      ],
    }).compile();

    service = module.get<EvidenceService>(EvidenceService);
  });

  describe('submitEvidence', () => {
    it('should create submission, queue BullMQ job, and publish event', async () => {
      mockEvidenceRepository.createSubmission.mockResolvedValue({
        id: 'submission-123',
        status: SubmissionStatus.UPLOADED,
      });

      const result = await service.submitEvidence(
        'student-1',
        'competency-1.1',
        'http://example.com/file.pdf',
        'tenant-1',
      );

      expect(result.success).toBe(true);
      expect(result.submissionId).toBe('submission-123');
      expect(mockEvidenceRepository.createSubmission).toHaveBeenCalled();
      expect(mockQueue.add).toHaveBeenCalledWith(
        'grade-evidence',
        expect.objectContaining({
          submissionId: 'submission-123',
          fileUrl: 'http://example.com/file.pdf',
        }),
        expect.objectContaining({
          attempts: 3,
          backoff: expect.any(Object),
        }),
      );
      expect(mockEventBus.publish).toHaveBeenCalledWith('EvidenceSubmittedEvent', expect.any(Object));
      expect(mockEvidenceRepository.createEventLog).toHaveBeenCalledWith('EvidenceSubmittedEvent', expect.any(Object));
    });
  });

  describe('handleAIGradingCompleted', () => {
    it('should update submission, log outbox, and publish EvidenceAIGradedEvent', async () => {
      mockEvidenceRepository.findSubmissionById.mockResolvedValue({
        id: 'submission-123',
        studentId: 'student-1',
        competencyId: 'competency-1.1',
      });
      mockEvidenceRepository.updateSubmission.mockResolvedValue({});

      await service.handleAIGradingCompleted({
        submissionId: 'submission-123',
        score: 85,
        feedback: 'Good work',
        status: 'PASSED',
        tenantId: 'tenant-1',
      });

      expect(mockEvidenceRepository.updateSubmission).toHaveBeenCalledWith(
        'submission-123',
        expect.objectContaining({
          score: 85,
          feedback: 'Good work',
          status: SubmissionStatus.AI_GRADED,
          isGradedByAI: true,
        }),
      );
      expect(mockEventBus.publish).toHaveBeenCalledWith('EvidenceAIGradedEvent', expect.any(Object));
      expect(mockEvidenceRepository.createEventLog).toHaveBeenCalledWith('EvidenceAIGradedEvent', expect.any(Object));
    });
  });

  describe('validateEvidence', () => {
    it('should update submission as APPROVED, update competency, and publish EvidenceApprovedEvent', async () => {
      mockEvidenceRepository.findSubmissionById.mockResolvedValue({
        id: 'submission-123',
        studentId: 'student-1',
        competencyId: 'competency-1.1',
      });
      mockEvidenceRepository.updateSubmission.mockResolvedValue({});

      const result = await service.validateEvidence(
        'submission-123',
        true, // Approved
        90,
        'Excellent job',
        'tenant-1',
      );

      expect(result.success).toBe(true);
      expect(mockEvidenceRepository.updateSubmission).toHaveBeenCalledWith(
        'submission-123',
        expect.objectContaining({
          status: SubmissionStatus.APPROVED,
          score: 90,
          feedback: 'Excellent job',
        }),
      );
      expect(mockEvidenceRepository.updateStudentCompetency).toHaveBeenCalled();
      expect(mockEventBus.publish).toHaveBeenCalledWith('EvidenceApprovedEvent', expect.any(Object));
      expect(mockEvidenceRepository.createEventLog).toHaveBeenCalledWith('EvidenceApprovedEvent', expect.any(Object));
    });

    it('should update submission as REJECTED and publish EvidenceRejectedEvent', async () => {
      mockEvidenceRepository.findSubmissionById.mockResolvedValue({
        id: 'submission-123',
        studentId: 'student-1',
        competencyId: 'competency-1.1',
      });
      mockEvidenceRepository.updateSubmission.mockResolvedValue({});

      const result = await service.validateEvidence(
        'submission-123',
        false, // Rejected
        30,
        'Please redo',
        'tenant-1',
      );

      expect(result.success).toBe(true);
      expect(mockEvidenceRepository.updateSubmission).toHaveBeenCalledWith(
        'submission-123',
        expect.objectContaining({
          status: SubmissionStatus.REJECTED,
          score: 30,
          feedback: 'Please redo',
        }),
      );
      expect(mockEvidenceRepository.updateStudentCompetency).not.toHaveBeenCalled();
      expect(mockEventBus.publish).toHaveBeenCalledWith('EvidenceRejectedEvent', expect.any(Object));
      expect(mockEvidenceRepository.createEventLog).toHaveBeenCalledWith('EvidenceRejectedEvent', expect.any(Object));
    });
  });
});
