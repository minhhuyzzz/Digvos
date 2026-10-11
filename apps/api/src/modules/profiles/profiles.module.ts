import { Module } from '@nestjs/common';
import { ProfilesController } from './presentation/controllers/profiles.controller';
import { ProfilesService } from './application/services/profiles.service';
import { PrismaProfilesRepository } from './infrastructure/repositories/prisma-profiles.repository';

@Module({
  controllers: [ProfilesController],
  providers: [
    ProfilesService,
    {
      provide: 'IProfilesRepository',
      useClass: PrismaProfilesRepository,
    },
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
