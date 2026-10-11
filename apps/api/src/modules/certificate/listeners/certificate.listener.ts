import { Injectable, Inject, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ICertificateRepository } from '../domain/repositories/certificate.repository.interface';
import { CertificateStatus, ProficiencyLevel } from '@digvos/database';
import { CompetencyAchievedEvent } from '../../competency/domain/events/competency-achieved.event';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CertificateListener {
  private readonly logger = new Logger(CertificateListener.name);

  constructor(
    @Inject('ICertificateRepository')
    private readonly certificateRepository: ICertificateRepository,
    @InjectQueue('blockchain-minting')
    private readonly blockchainQueue: Queue,
  ) {}

  /**
   * Listen to CompetencyAchievedEvent and request certificate issuance via BullMQ
   */
  @OnEvent('CompetencyAchievedEvent')
  async handleCompetencyAchieved(event: CompetencyAchievedEvent) {
    const { studentId, competencyId, level, tenantId } = event;
    this.logger.log(`Handling CompetencyAchievedEvent for student: ${studentId}, competency: ${competencyId}, level: ${level}`);

    try {
      // 1. Idempotency Check: Verify if a certificate already exists for this composite key
      const existing = await this.certificateRepository.findCertificateByUniqueComposite(
        studentId,
        competencyId,
        level,
      );

      if (existing) {
        this.logger.warn(`Idempotency trigger: Certificate already exists for Student: ${studentId}, Competency: ${competencyId}, Level: ${level}. Skipping.`);
        return;
      }

      // 2. Generate a unique verification code (UUID)
      const verificationCode = uuidv4();

      // 3. Create Certificate in PENDING status
      const certificate = await this.certificateRepository.createCertificate({
        studentId,
        competencyId,
        level,
        status: CertificateStatus.PENDING,
        verificationCode,
        tenantId,
      });

      // 4. Enqueue BullMQ job for async blockchain processing
      await this.blockchainQueue.add(
        'issue-certificate',
        {
          certificateId: certificate.id,
          studentId,
          competencyId,
          level,
          tenantId,
        },
        {
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 10000,
          },
          removeOnComplete: true,
        },
      );

      this.logger.log(`Queued blockchain minting job for Certificate: ${certificate.id}`);
    } catch (err) {
      this.logger.error(`Failed to handle CompetencyAchievedEvent: ${err.message}`);
    }
  }
}
