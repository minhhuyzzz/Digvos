import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/services/prisma.service';
import { ProficiencyLevel } from '@digvos/database';

@Injectable()
export class CompetencyService implements OnApplicationBootstrap {
  constructor(private prisma: PrismaService) {}

  // Tự động chạy khi NestJS khởi động xong để nạp Khung năng lực DigComp 3.0
  async onApplicationBootstrap() {
    await this.seedDigCompFramework();
  }

  private async seedDigCompFramework() {
    const tenantId = 'default-tenant-id';

    // 1. Tạo Default Tenant nếu chưa có
    await this.prisma.tenant.upsert({
      where: { id: tenantId },
      update: {},
      create: {
        id: tenantId,
        name: 'Default Tenant University',
        domain: 'digvos.edu.vn',
      },
    });

    // 2. Kiểm tra xem framework DigComp 3.0 đã tồn tại chưa
    const existingFramework = await this.prisma.competencyFramework.findFirst({
      where: {
        name: 'DigComp 3.0',
        tenantId,
      },
    });

    if (existingFramework) {
      console.log('[Competency Engine] DigComp 3.0 framework already seeded.');
      return;
    }

    console.log('[Competency Engine] Seeding DigComp 3.0 framework...');

    // 3. Tạo Framework DigComp 3.0
    const framework = await this.prisma.competencyFramework.create({
      data: {
        name: 'DigComp 3.0',
        description: 'Khung Năng lực số Châu Âu dành cho công dân (European Digital Competence Framework)',
        tenantId,
      },
    });

    // Định nghĩa 5 Vùng và 21 Năng lực cụ thể
    const frameworkData = [
      {
        code: 'AREA_1',
        name: 'Thông tin và dữ liệu (Information and data literacy)',
        description: 'Khả năng duyệt tìm, lọc, đánh giá và quản lý dữ liệu số.',
        competencies: [
          { code: '1.1', name: 'Duyệt, tìm kiếm và lọc dữ liệu (Browsing, searching and filtering data)', description: 'Tìm kiếm thông tin số và lọc kết quả.' },
          { code: '1.2', name: 'Đánh giá dữ liệu và thông tin (Evaluating data, information and digital content)', description: 'Đánh giá độ tin cậy của thông tin số.' },
          { code: '1.3', name: 'Quản lý dữ liệu và thông tin (Managing data, information and digital content)', description: 'Tổ chức, lưu trữ và xử lý dữ liệu.' },
        ],
      },
      {
        code: 'AREA_2',
        name: 'Giao tiếp và hợp tác (Communication and collaboration)',
        description: 'Tương tác, chia sẻ và hợp tác thông qua công nghệ số.',
        competencies: [
          { code: '2.1', name: 'Tương tác qua công nghệ (Interacting through digital technologies)', description: 'Sử dụng các thiết bị số để giao tiếp.' },
          { code: '2.2', name: 'Chia sẻ qua công nghệ (Sharing through digital technologies)', description: 'Chia sẻ tài liệu và liên kết số.' },
          { code: '2.3', name: 'Tham gia hoạt động công dân (Engaging in citizenship through digital technologies)', description: 'Sử dụng dịch vụ số công.' },
          { code: '2.4', name: 'Hợp tác qua môi trường số (Collaborating through digital technologies)', description: 'Sử dụng công cụ cộng tác trực tuyến.' },
          { code: '2.5', name: 'Văn hóa mạng (Netiquette)', description: 'Ứng xử chuẩn mực trên môi trường internet.' },
          { code: '2.6', name: 'Quản lý danh tính số (Managing digital identity)', description: 'Bảo vệ danh tiếng và thông tin cá nhân trực tuyến.' },
        ],
      },
      {
        code: 'AREA_3',
        name: 'Sáng tạo nội dung số (Digital content creation)',
        description: 'Tạo, tích hợp tài liệu số và hiểu biết bản quyền, lập trình.',
        competencies: [
          { code: '3.1', name: 'Phát triển nội dung số (Developing digital content)', description: 'Tạo tài liệu, hình ảnh, video số.' },
          { code: '3.2', name: 'Tích hợp nội dung (Integrating and re-elaborating digital content)', description: 'Tổng hợp và chỉnh sửa nội dung có sẵn.' },
          { code: '3.3', name: 'Bản quyền và giấy phép (Copyright and licences)', description: 'Hiểu luật sở hữu trí tuệ trên mạng.' },
          { code: '3.4', name: 'Lập trình (Programming)', description: 'Viết code và hướng dẫn lập trình cơ bản.' },
        ],
      },
      {
        code: 'AREA_4',
        name: 'An toàn (Safety)',
        description: 'Bảo vệ thiết bị, dữ liệu cá nhân, sức khỏe và môi trường.',
        competencies: [
          { code: '4.1', name: 'Bảo vệ thiết bị (Protecting devices)', description: 'Bảo mật máy tính, điện thoại tránh virus.' },
          { code: '4.2', name: 'Bảo vệ dữ liệu riêng tư (Protecting personal data and privacy)', description: 'Thiết lập bảo mật thông tin cá nhân.' },
          { code: '4.3', name: 'Bảo vệ sức khỏe (Protecting health and well-being)', description: 'Tránh mỏi mắt, stress khi dùng thiết bị số.' },
          { code: '4.4', name: 'Bảo vệ môi trường (Protecting the environment)', description: 'Tiết kiệm năng lượng khi dùng công nghệ.' },
        ],
      },
      {
        code: 'AREA_5',
        name: 'Giải quyết vấn đề (Problem solving)',
        description: 'Xử lý lỗi kỹ thuật, đưa ra giải pháp và cập nhật năng lực.',
        competencies: [
          { code: '5.1', name: 'Giải quyết lỗi kỹ thuật (Solving technical problems)', description: 'Sửa các lỗi kết nối hoặc phần mềm cơ bản.' },
          { code: '5.2', name: 'Xác định nhu cầu giải pháp (Identifying needs and technological responses)', description: 'Lựa chọn công cụ phù hợp nhu cầu.' },
          { code: '5.3', name: 'Sử dụng sáng tạo công nghệ (Creatively using digital technologies)', description: 'Áp dụng công nghệ vào bài toán thực tế.' },
          { code: '5.4', name: 'Khắc phục khoảng cách năng lực số (Identifying digital competence gaps)', description: 'Tự học tập nâng cao trình độ công nghệ.' },
        ],
      },
    ];

    // 4. Tạo lần lượt các Area và Competency
    for (const areaData of frameworkData) {
      const area = await this.prisma.competencyArea.create({
        data: {
          frameworkId: framework.id,
          code: areaData.code,
          name: areaData.name,
          description: areaData.description,
        },
      });

      for (const compData of areaData.competencies) {
        await this.prisma.competency.create({
          data: {
            areaId: area.id,
            code: compData.code,
            name: compData.name,
            description: compData.description,
          },
        });
      }
    }

    console.log('[Competency Engine] Seeding DigComp 3.0 completed successfully.');
  }

  // Lấy dữ liệu phổ Radar (trung bình cộng điểm level từng vùng năng lực)
  async getStudentRadarData(studentId: string) {
    const progress = await this.prisma.studentCompetency.findMany({
      where: { studentId },
      include: {
        competency: {
          include: { area: true },
        },
      },
    });

    // Bản đồ số hóa mức độ thành thạo từ Enum thành số (1-8)
    const levelMap: Record<ProficiencyLevel, number> = {
      [ProficiencyLevel.FOUNDATION_1]: 1,
      [ProficiencyLevel.FOUNDATION_2]: 2,
      [ProficiencyLevel.INTERMEDIATE_3]: 3,
      [ProficiencyLevel.INTERMEDIATE_4]: 4,
      [ProficiencyLevel.ADVANCED_5]: 5,
      [ProficiencyLevel.ADVANCED_6]: 6,
      [ProficiencyLevel.HIGHLY_SPECIALIZED_7]: 7,
      [ProficiencyLevel.HIGHLY_SPECIALIZED_8]: 8,
    };

    // Khởi tạo 5 Vùng năng lực của DigComp
    const areaScores: Record<string, { sum: number; count: number; name: string }> = {
      AREA_1: { sum: 0, count: 0, name: 'Thông tin & Dữ liệu' },
      AREA_2: { sum: 0, count: 0, name: 'Giao tiếp & Hợp tác' },
      AREA_3: { sum: 0, count: 0, name: 'Sáng tạo nội dung' },
      AREA_4: { sum: 0, count: 0, name: 'An toàn bảo mật' },
      AREA_5: { sum: 0, count: 0, name: 'Giải quyết vấn đề' },
    };

    // Cộng dồn điểm số của học viên
    for (const item of progress) {
      const areaCode = item.competency.area.code;
      if (areaScores[areaCode]) {
        areaScores[areaCode].sum += levelMap[item.proficiencyLevel];
        areaScores[areaCode].count += 1;
      }
    }

    // Tính điểm trung bình từng vùng
    return Object.keys(areaScores).map((key) => {
      const area = areaScores[key];
      const avg = area.count > 0 ? parseFloat((area.sum / area.count).toFixed(2)) : 0;
      return {
        area: key,
        name: area.name,
        level: avg,
      };
    });
  }

  // Hàm cập nhật năng lực của sinh viên
  async updateStudentCompetency(studentId: string, competencyId: string, level: ProficiencyLevel) {
    return this.prisma.studentCompetency.upsert({
      where: {
        studentId_competencyId: {
          studentId,
          competencyId,
        },
      },
      update: {
        proficiencyLevel: level,
      },
      create: {
        studentId,
        competencyId,
        proficiencyLevel: level,
      },
    });
  }

  // Phân tích Skill Gap (so sánh năng lực hiện tại với năng lực mục tiêu)
  async getStudentSkillGap(studentId: string) {
    const currentRadar = await this.getStudentRadarData(studentId);

    // Mẫu chuẩn năng lực mục tiêu cho một "Digital Citizen" (DigComp Level 4.0 - Trung cấp)
    const targetLevels: Record<string, number> = {
      AREA_1: 4.5,
      AREA_2: 5.0,
      AREA_3: 4.0,
      AREA_4: 5.5,
      AREA_5: 4.0,
    };

    return currentRadar.map((item) => {
      const target = targetLevels[item.area] || 4.0;
      const gap = parseFloat((item.level - target).toFixed(2));
      return {
        area: item.area,
        name: item.name,
        current: item.level,
        target,
        gap, // Nếu gap < 0 có nghĩa học viên đang thiếu hụt năng lực vùng này
      };
    });
  }
}
