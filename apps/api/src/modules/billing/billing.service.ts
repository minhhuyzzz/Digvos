import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async getSubscription(tenantId?: string) {
    return {
      planName: 'Enterprise Unlimited',
      status: 'ACTIVE',
      expiresAt: '2026-12-31T23:59:59.000Z',
      aiCreditsTotal: 20000,
      aiCreditsUsed: 5000,
      aiCreditsRemaining: 15000,
      maxUsers: 500,
      currentUsers: 124,
    };
  }

  async getCredits(tenantId?: string) {
    return {
      balance: 15000,
      unit: 'AI Credits',
      history: [
        { id: 'tx_1', amount: +5000, type: 'RECHARGE', date: '2026-07-01' },
        { id: 'tx_2', amount: -250, type: 'AI_GRADING_USAGE', date: '2026-07-15' },
        { id: 'tx_3', amount: -120, type: 'CAT_ENGINE_USAGE', date: '2026-07-20' },
      ],
    };
  }
}
