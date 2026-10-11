import { Test, TestingModule } from '@nestjs/testing';
import { IdentityService } from '../application/identity.service';
import { NotFoundException } from '@nestjs/common';

describe('IdentityService', () => {
  let service: IdentityService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findUserById: jest.fn(),
      findByAuth0Sub: jest.fn(),
      findByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      findUsersByTenant: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentityService,
        {
          provide: 'IIdentityRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<IdentityService>(IdentityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user if found', async () => {
      const user = { id: '1', email: 'test@digvos.com' };
      mockRepository.findUserById.mockResolvedValue(user);

      const result = await service.getUser('1');
      expect(result).toEqual(user);
      expect(mockRepository.findUserById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if user not found', async () => {
      mockRepository.findUserById.mockResolvedValue(null);

      await expect(service.getUser('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('syncAuth0User', () => {
    it('should return existing user if found by auth0Sub', async () => {
      const existingUser = { id: '1', auth0Sub: 'auth0|123', email: 'test@digvos.com' };
      mockRepository.findByAuth0Sub.mockResolvedValue(existingUser);

      const result = await service.syncAuth0User({
        auth0Sub: 'auth0|123',
        email: 'test@digvos.com',
        tenantId: 'tenant-1',
      });

      expect(result).toEqual(existingUser);
      expect(mockRepository.createUser).not.toHaveBeenCalled();
    });

    it('should create new user if not found by auth0Sub', async () => {
      mockRepository.findByAuth0Sub.mockResolvedValue(null);
      const newUser = { id: '2', auth0Sub: 'auth0|456', email: 'new@digvos.com', tenantId: 'tenant-1' };
      mockRepository.createUser.mockResolvedValue(newUser);

      const result = await service.syncAuth0User({
        auth0Sub: 'auth0|456',
        email: 'new@digvos.com',
        tenantId: 'tenant-1',
      });

      expect(result).toEqual(newUser);
      expect(mockRepository.createUser).toHaveBeenCalledWith({
        auth0Sub: 'auth0|456',
        email: 'new@digvos.com',
        name: undefined,
        role: undefined,
        tenantId: 'tenant-1',
      });
    });
  });
});
