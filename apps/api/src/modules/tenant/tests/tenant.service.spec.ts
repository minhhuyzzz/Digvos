import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from '../application/tenant.service';
import { IdentityService } from '../../identity/application/identity.service';
import { NotFoundException } from '@nestjs/common';

describe('TenantService', () => {
  let service: TenantService;
  let mockTenantRepository: any;
  let mockIdentityService: any;

  beforeEach(async () => {
    mockTenantRepository = {
      findTenantById: jest.fn(),
      findTenantByDomain: jest.fn(),
      createTenant: jest.fn(),
      listTenants: jest.fn(),
    };

    mockIdentityService = {
      getUsersByTenant: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        {
          provide: 'ITenantRepository',
          useValue: mockTenantRepository,
        },
        {
          provide: IdentityService,
          useValue: mockIdentityService,
        },
      ],
    }).compile();

    service = module.get<TenantService>(TenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTenant', () => {
    it('should return a tenant if found', async () => {
      const tenant = { id: 'tenant-1', name: 'Tenant A' };
      mockTenantRepository.findTenantById.mockResolvedValue(tenant);

      const result = await service.getTenant('tenant-1');
      expect(result).toEqual(tenant);
      expect(mockTenantRepository.findTenantById).toHaveBeenCalledWith('tenant-1');
    });

    it('should throw NotFoundException if tenant not found', async () => {
      mockTenantRepository.findTenantById.mockResolvedValue(null);

      await expect(service.getTenant('tenant-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('listUsers', () => {
    it('should call IdentityService to get users by tenant', async () => {
      const users = [{ id: '1', email: 'test@digvos.com' }];
      mockIdentityService.getUsersByTenant.mockResolvedValue(users);

      const result = await service.listUsers('tenant-1');
      expect(result).toEqual(users);
      expect(mockIdentityService.getUsersByTenant).toHaveBeenCalledWith('tenant-1');
    });
  });
});
