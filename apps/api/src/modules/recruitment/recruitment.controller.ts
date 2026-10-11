import { Controller, Get, Query } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';

@Controller('v1/recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Get('campaigns')
  async getCampaigns(@Query('tenantId') tenantId?: string) {
    return this.recruitmentService.getCampaigns(tenantId);
  }

  @Get('candidates')
  async getCandidates(@Query('campaignId') campaignId?: string) {
    return this.recruitmentService.getCandidates(campaignId);
  }
}
