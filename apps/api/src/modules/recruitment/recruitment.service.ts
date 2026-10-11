import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/services/prisma.service';

@Injectable()
export class RecruitmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getCampaigns(tenantId?: string) {
    return [
      {
        id: 'rec_1',
        title: 'Chiến dịch tuyển dụng Kỹ sư Trí tuệ Nhân tạo (AI Engineer)',
        department: 'AI & Data Lab',
        targetCount: 5,
        appliedCount: 18,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'rec_2',
        title: 'Chiến dịch Đánh giá năng lực số Nhân sự Kế toán',
        department: 'Finance & Accounting',
        targetCount: 10,
        appliedCount: 24,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getCandidates(campaignId?: string) {
    return [
      {
        id: 'cand_1',
        name: 'Nguyen Van B',
        email: 'b.nguyen@gmail.com',
        matchScore: 92,
        digCompLevel: 'ADVANCED_5',
        sbtVerified: true,
        status: 'SHORTLISTED',
      },
      {
        id: 'cand_2',
        name: 'Tran Thi C',
        email: 'c.tran@gmail.com',
        matchScore: 88,
        digCompLevel: 'INTERMEDIATE_4',
        sbtVerified: true,
        status: 'ASSESSMENT_PENDING',
      },
    ];
  }
}
