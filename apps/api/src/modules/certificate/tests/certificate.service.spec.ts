import { Test, TestingModule } from '@nestjs/testing';
import { CertificateService } from '../application/certificate.service';
import { CertificateListener } from '../listeners/certificate.listener';
import { CertificateStatus, ProficiencyLevel } from '@digvos/database';
import { ConfigService } from '@nestjs/config';

describe('CertificateModule (Service & Listener)', () => {
  let service: CertificateService;
  let listener: CertificateListener;
  let mockCertificateRepository: any;
  let mockQueue: any;
  let mockConfigService: any;

  beforeEach(async () => {
    mockCertificateRepository = {
      findCertificateById: jest.fn(),
      findCertificateByVerificationCode: jest.fn(),
      findCertificateByUniqueComposite: jest.fn(),
      createCertificate: jest.fn(),
      updateCertificate: jest.fn(),
      createEventLog: jest.fn(),
    };

    mockQueue = {
      add: jest.fn().mockResolvedValue({ id: 'job-123' }),
    };

    mockConfigService = {
      get: jest.fn().mockImplementation((key: string, defaultValue?: any) => {
        if (key === 'BLOCKCHAIN_MOCK') return 'true';
        if (key === 'SBT_CONTRACT_ADDRESS') return '0xMockContract';
        return defaultValue;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificateService,
        CertificateListener,
        {
          provide: 'ICertificateRepository',
          useValue: mockCertificateRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'BullQueue_blockchain-minting', // Inject token pattern for BullMQ queue
          useValue: mockQueue,
        },
      ],
    }).compile();

    service = module.get<CertificateService>(CertificateService);
    listener = module.get<CertificateListener>(CertificateListener);
  });

  describe('CertificateListener handleCompetencyAchieved', () => {
    it('should create certificate and queue blockchain minting job', async () => {
      mockCertificateRepository.findCertificateByUniqueComposite.mockResolvedValue(null);
      mockCertificateRepository.createCertificate.mockResolvedValue({
        id: 'cert-123',
        verificationCode: 'code-123',
      });

      await listener.handleCompetencyAchieved({
        studentId: 'student-1',
        competencyId: 'competency-1.1',
        level: ProficiencyLevel.ADVANCED_5,
        tenantId: 'tenant-1',
        occurredAt: new Date(),
        getAggregateId: () => 'agg-1',
      });

      expect(mockCertificateRepository.findCertificateByUniqueComposite).toHaveBeenCalledWith(
        'student-1',
        'competency-1.1',
        ProficiencyLevel.ADVANCED_5,
      );
      expect(mockCertificateRepository.createCertificate).toHaveBeenCalled();
      expect(mockQueue.add).toHaveBeenCalledWith(
        'issue-certificate',
        expect.objectContaining({
          certificateId: 'cert-123',
          studentId: 'student-1',
        }),
        expect.objectContaining({
          attempts: 5,
          backoff: expect.any(Object),
        }),
      );
    });

    it('should skip creation if certificate already exists (Idempotence)', async () => {
      mockCertificateRepository.findCertificateByUniqueComposite.mockResolvedValue({
        id: 'cert-exists',
      });

      await listener.handleCompetencyAchieved({
        studentId: 'student-1',
        competencyId: 'competency-1.1',
        level: ProficiencyLevel.ADVANCED_5,
        tenantId: 'tenant-1',
        occurredAt: new Date(),
        getAggregateId: () => 'agg-1',
      });

      expect(mockCertificateRepository.createCertificate).not.toHaveBeenCalled();
      expect(mockQueue.add).not.toHaveBeenCalled();
    });
  });

  describe('CertificateService verifyCertificate', () => {
    it('should fetch and verify certificate status and onchain authenticity', async () => {
      mockCertificateRepository.findCertificateByVerificationCode.mockResolvedValue({
        id: 'cert-123',
        verificationCode: 'code-123',
        tokenId: '12',
        status: CertificateStatus.ISSUED,
        isValid: true,
        studentId: 'student-1',
        student: {
          walletAddress: '0xStudentWallet',
        },
      });

      const result = await service.verifyCertificate('code-123');

      expect(result.success).toBe(true);
      expect(result.isValid).toBe(true);
      expect(result.onChainVerify.valid).toBe(true);
      expect(result.onChainVerify.contractAddress).toBe('0xMockContract');
    });
  });
});
