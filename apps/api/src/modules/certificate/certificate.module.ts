import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CertificateController } from './presentation/controllers/certificate.controller';
import { CertificateService } from './application/certificate.service';
import { PrismaCertificateRepository } from './infrastructure/repositories/prisma-certificate.repository';
import { CertificateListener } from './listeners/certificate.listener';
import { BlockchainProcessor } from './infrastructure/processors/blockchain.processor';
import { StorageModule } from '../../infrastructure/storage/storage.module';
import { BlockchainModule } from '../../infrastructure/blockchain/blockchain.module';

@Module({
  imports: [
    StorageModule,
    BlockchainModule,
    BullModule.registerQueue({
      name: 'blockchain-minting',
    }),
  ],
  controllers: [CertificateController],
  providers: [
    CertificateService,
    CertificateListener,
    BlockchainProcessor,
    {
      provide: 'ICertificateRepository',
      useClass: PrismaCertificateRepository,
    },
  ],
  exports: [CertificateService],
})
export class CertificateModule {}
