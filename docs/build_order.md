# DIGVOS - Build Order (Thứ Tự Triển Khai)

Tài liệu này hướng dẫn thứ tự xây dựng mã nguồn (build order) qua 5 giai đoạn (phases) logic cho hệ thống **DIGVOS**. Đây là bản đồ chỉ đường để AI Agent không phát triển các module bị cô lập hoặc thiếu phụ thuộc cơ sở.

---

## Tổng Quan Lộ Trình Triển Khai (Build Roadmap)

```
[Phase 1: Infrastructure] ──> [Phase 2: Business Foundation] ──> [Phase 3: Workflows] ──> [Phase 4: Verification] ──> [Phase 5: AI & Extensibility]
```

---

## Chi Tiết Các Giai Đoạn Phát Triển

### Giai Đoạn 1: Infrastructure & Platform Core (Hạ Tầng & Nền Tảng)
*Mục tiêu: Thiết lập môi trường chạy đa dự án, định danh, phân quyền và kết nối CSDL cơ bản.*

1. **Prisma Database Schema (`packages/database`)**:
   - Thiết lập cấu trúc cơ sở dữ liệu Postgres hỗ trợ Multi-tenant (mọi bảng đều chứa `tenant_id`).
   - Xây dựng các thực thể: `Tenant`, `User`, `Role`, `Permission`, `CompetencyFramework`.
2. **NestJS API Gateway & Authentication (`apps/api`)**:
   - Cài đặt xác thực người dùng (Auth) và phân quyền dựa trên vai trò (RBAC).
   - Tích hợp Middleware kiểm tra `tenant_id` trong mọi request.
3. **Redis & Event Bus Setup**:
   - Khởi tạo Redis để làm hàng đợi (Queue) và Event Bus trung chuyển các sự kiện không đồng bộ giữa các Module.

---

### Giai Đoạn 2: Business Foundation (Nền Tảng Nghiệp Vụ)
*Mục tiêu: Hiện thực hóa core domain quan trọng nhất - Khung năng lực và các động cơ đánh giá ban đầu.*

1. **Competency Engine (`packages/competency-engine`)**:
   - Nạp khung năng lực tiêu chuẩn **DigComp 3.0** vào cơ sở dữ liệu.
   - Viết các hàm tính toán chỉ số thành thạo (Proficiency levels 1 - 8) và so khớp khoảng trống kỹ năng (Skill Gap Analysis).
2. **Assessment Engine (CAT/IRT) (`packages/assessment-engine`)**:
   - Xây dựng ngân hàng câu hỏi (Question Bank) phân chia theo Bloom level và các vùng năng lực số DigComp.
   - Lập trình thuật toán **Adaptive Testing (CAT)** điều tiết độ khó câu hỏi theo thời gian thực dựa trên câu trả lời trước đó.
3. **Evidence Engine (`packages/evidence-engine`)**:
   - Tạo các thực thể lưu trữ Portfolio, dự án cá nhân, các file minh chứng năng lực của học sinh.

---

### Giai Đoạn 3: Workspaces & Workflows (Không Gian Làm Việc & Luồng Nghiệp Vụ)
*Mục tiêu: Đưa các giao diện trực quan vào hoạt động và đồng bộ các luồng tác vụ.*

1. **Next.js Workspaces (`apps/web`)**:
   - Xây dựng 4 không gian làm việc độc lập có Menu và Navigation chuyên biệt:
     - `Student Workspace`: Dashboard hiển thị biểu đồ Radar năng lực, lịch sử thi và tiến độ học tập.
     - `Teacher Workspace`: Giao diện quản lý lớp, ngân hàng câu hỏi, và chấm bài thực luận.
     - `Enterprise Workspace`: Giao diện đăng tin tuyển dụng và tìm kiếm nhân lực.
     - `Admin Control Center`: Quản trị Tenant và cấu hình hệ thống.
2. **Workflow Automation & Notifications**:
   - Xây dựng dịch vụ gửi email/SMS thông báo khi bài thi được nạp hoặc chứng chỉ sẵn sàng.
   - Triển khai Event listeners lắng nghe sự kiện `AssessmentCompleted` để tự động kích hoạt tính toán năng lực.

---

### Giai Đoạn 4: Verification & Talent matching (Xác Thực & Đối Khớp Nhân Sự)
*Mục tiêu: Kết nối thế giới on-chain blockchain và thị trường lao động.*

1. **Certification Engine (Polygon SBT ERC-4973) (`packages/blockchain`)**:
   - Viết và triển khai Smart Contract cấp chứng chỉ phi tập trung **Soulbound Token (SBT)** không thể chuyển nhượng.
   - Tích hợp dịch vụ đúc (mint) tự động lên Polygon Amoy Testnet khi Competency Engine xác nhận đạt yêu cầu.
2. **Talent Intelligence Engine**:
   - Viết thuật toán đối khớp tự động giữa yêu cầu công việc (Job requirements) với hồ sơ năng lực tổng hợp (Competency + Evidence + Certificates) của ứng viên để đưa ra tỉ lệ % Matching.

---

### Giai Đoạn 5: AI & Extensibility (AI & Mở Rộng)
*Mục tiêu: Bổ sung trí tuệ nhân tạo toàn diện và nâng cao hiệu quả SaaS.*

1. **AI Cross-Cutting Service (Gemini SDK)**:
   - Tích hợp AI để chấm bài tự luận của học sinh, tự sinh Rubrics đánh giá cho giảng viên, và đề xuất lộ trình học cá nhân hóa cho học viên dựa trên Skill Gap.
2. **Marketplace & Plugins**:
   - Mở rộng cổng chia sẻ các gói câu hỏi, bộ đề thi mẫu và tài liệu giảng dạy giữa các trường đại học/tổ chức.
