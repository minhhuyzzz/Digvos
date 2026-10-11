import { Controller, Get, Query } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('v1/billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('subscription')
  async getSubscription(@Query('tenantId') tenantId?: string) {
    return this.billingService.getSubscription(tenantId);
  }

  @Get('credits')
  async getCredits(@Query('tenantId') tenantId?: string) {
    return this.billingService.getCredits(tenantId);
  }
}
