import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ICertificateRepository } from '../../domain/repositories/certificate.repository.interface';
import { BlockchainService } from '../../../../infrastructure/blockchain/blockchain.service';
import { StorageService } from '../../../../infrastructure/storage/storage.service';
import { IEventBus } from '../../../../common/core/event-bus.interface';
import { CertificateIssuedEvent } from '../../domain/events/certificate-issued.event';
import { CertificateStatus } from '@digvos/database';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Processor('blockchain-minting')
export class BlockchainProcessor extends WorkerHost {
  private readonly logger = new Logger(BlockchainProcessor.name);

  constructor(
    @Inject('ICertificateRepository')
    private readonly certificateRepository: ICertificateRepository,
    private readonly blockchainService: BlockchainService,
    private readonly storageService: StorageService,
    @Inject('IEventBus')
    private readonly eventBus: IEventBus,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async process(job: Job<any>): Promise<any> {
    const { certificateId, studentId, competencyId, level, tenantId } = job.data;
    this.logger.log(`Processing blockchain certificate minting job: ${job.id} for certificate: ${certificateId}`);

    try {
      // 1. Fetch certificate
      const certificate = await this.certificateRepository.findCertificateById(certificateId);
      if (!certificate) {
        this.logger.warn(`Certificate with ID '${certificateId}' not found.`);
        return;
      }

      // Update status to PROCESSING
      await this.certificateRepository.updateCertificate(certificateId, {
        status: CertificateStatus.PROCESSING,
      });

      // 2. Fetch student profile and competency info
      const student = await this.certificateRepository.findStudentWithProfile(studentId);
      const competency = await this.certificateRepository.findCompetencyWithArea(competencyId);

      if (!student || !competency) {
        throw new Error('Student profile or Competency info not found in DB.');
      }

      // Wallet Validation: Fail if missing in production environment
      const isMock = this.configService.get<string>('BLOCKCHAIN_MOCK', 'true') === 'true';
      if (!student.walletAddress && !isMock) {
        throw new Error('Ví Web3 của học viên chưa được liên kết. Không thể phát hành SBT ở production.');
      }

      // Fallback wallet address only for simulated development
      const recipientWallet = student.walletAddress ||
        '0x' + crypto.createHash('sha256').update(studentId).digest('hex').substring(0, 40);

      // 3. Compile metadata JSON matching enterprise schema v1.0
      const rawHash = crypto.createHash('sha256').update(JSON.stringify({ studentId, competencyId, level })).digest('hex');
      const metadata = {
        version: '1.0',
        issuedAt: new Date().toISOString(),
        issuer: 'DIGVOS University',
        studentId: studentId,
        studentName: student.user.name || 'Học Viên',
        competency: competency.name,
        level: level,
        verificationCode: certificate.verificationCode,
        hash: rawHash,
        metadataHash: {
          value: rawHash,
          algorithm: 'sha256',
        },
      };

      // 4. Upload metadata to storage
      const metadataKey = `metadata/${certificate.verificationCode}.json`;
      const metadataBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
      
      let metadataUri = '';
      if (this.storageService['s3Client']) {
        // Real upload if configured
        const { PutObjectCommand } = require('@aws-sdk/client-s3');
        await this.storageService['s3Client'].send(
          new PutObjectCommand({
            Bucket: this.storageService['bucketName'],
            Key: metadataKey,
            Body: metadataBuffer,
            ContentType: 'application/json',
          })
        );
        metadataUri = `${this.configService.get('STORAGE_ENDPOINT')}/${this.storageService['bucketName']}/${metadataKey}`;
      } else {
        // Fallback simulated URL
        metadataUri = `https://supabase.storage.digvos.vn/metadata/${certificate.verificationCode}.json`;
      }

      // 5. Mint Soulbound Token on Polygon Amoy
      const mintResult = await this.blockchainService.mintSoulboundToken(recipientWallet, metadataUri);

      // Gas limit / simulated gas details
      const gasUsed = mintResult['gasUsed'] || 155200;
      const blockNumber = mintResult.blockNumber;

      this.logger.log({
        message: `Blockchain minting completed successfully`,
        certificateId,
        verificationCode: certificate.verificationCode,
        jobId: job.id,
        txHash: mintResult.transactionHash,
        blockNumber,
        gasUsed,
      });

      // 6. Generate Verification QR code URL (Redirecting to public verification route)
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://digvos.edu.vn/verify/${certificate.verificationCode}`;

      // 7. Update Certificate status to ISSUED
      await this.certificateRepository.updateCertificate(certificateId, {
        status: CertificateStatus.ISSUED,
        tokenId: mintResult.tokenId,
        txHash: mintResult.transactionHash,
        qrCode: qrCodeUrl,
        metadata: metadata,
      });

      // 8. Publish Domain Event to EventBus
      const issuedEvent = new CertificateIssuedEvent(
        certificateId,
        studentId,
        competencyId,
        level,
        mintResult.tokenId,
        mintResult.transactionHash,
        tenantId,
      );

      await this.certificateRepository.createEventLog('CertificateIssuedEvent', issuedEvent);
      await this.eventBus.publish('CertificateIssuedEvent', issuedEvent);

      this.logger.log(`Blockchain minting succeeded for Certificate: ${certificateId}, Token ID: ${mintResult.tokenId}`);
    } catch (err) {
      this.logger.error(`Error minting certificate ${certificateId}: ${err.message}`);
      
      // Update Certificate status to FAILED on exception
      await this.certificateRepository.updateCertificate(certificateId, {
        status: CertificateStatus.FAILED,
      });

      throw err; // Throw to trigger BullMQ retry / backoff
    }
  }
}
