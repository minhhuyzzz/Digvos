import { Module } from '@nestjs/common';
import { TenantController } from './presentation/controllers/tenant.controller';
import { TenantService } from './application/tenant.service';
import { PrismaTenantRepository } from './infrastructure/repositories/prisma-tenant.repository';
import { IdentityModule } from '../identity/identity.module';


@Module({
  imports: [IdentityModule],
  controllers: [TenantController],
  providers: [
    TenantService,
    {
      provide: 'ITenantRepository',
      useClass: PrismaTenantRepository,
    },
  ],
  exports: [TenantService],
})
export class TenantModule {}
