import { Test, TestingModule } from '@nestjs/testing';
import { CompetencyService } from '../services/competency.service';
import { PrismaService } from '../../../infrastructure/prisma/services/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('CompetencyService', () => {
  let service: CompetencyService;
  let prisma: PrismaService;

  const mockPrismaService = {
    tenant: {
      upsert: jest.fn().mockResolvedValue({ id: 'default-tenant-id' }),
    },
    competencyFramework: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 'framework-id' }),
    },
    competencyArea: {
      create: jest.fn().mockResolvedValue({ id: 'area-id' }),
    },
    competency: {
      create: jest.fn().mockResolvedValue({ id: 'comp-id' }),
      findFirst: jest.fn().mockResolvedValue({ id: 'comp-id' }),
    },
    studentCompetency: {
      findMany: jest.fn().mockResolvedValue([
        {
          proficiencyLevel: 'INTERMEDIATE_3',
          competency: {
            area: {
              code: 'AREA_1',
              name: 'Thông tin & Dữ liệu',
            },
          },
        },
        {
          proficiencyLevel: 'INTERMEDIATE_4',
          competency: {
            area: {
              code: 'AREA_1',
              name: 'Thông tin & Dữ liệu',
            },
          },
        },
      ]),
      upsert: jest.fn().mockResolvedValue({}),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetencyService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: EventEmitter2,
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CompetencyService>(module.get<any>(CompetencyService) ? CompetencyService : CompetencyService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate student radar data using averaging', async () => {
    const radarData = await service.getStudentRadarData('student-123');
    
    // INTERMEDIATE_3 (value 3) + INTERMEDIATE_4 (value 4) -> Average = 3.5
    const area1 = radarData.find((item) => item.area === 'AREA_1');
    expect(area1).toBeDefined();
    expect(area1?.level).toBe(3.5);
  });
});
