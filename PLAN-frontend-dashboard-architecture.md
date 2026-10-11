# Kế hoạch Kiến trúc: Frontend Dashboard Architecture & Routes

Tài liệu này định nghĩa kiến trúc tổng thể cho hệ thống Dashboard của DIGVOS, phục vụ đa phân quyền (Student, Teacher, Enterprise, Admin) với tiêu chuẩn Enterprise SaaS. Dựa trên Database Schema, chúng ta sẽ thiết kế các thư mục trang (Routes) để khớp hoàn toàn với các Domain (Năng lực, Khảo thí, Chứng chỉ, AI...).

## 1. Cấu trúc Thư mục Frontend (Route Directories)

Dưới đây là sơ đồ thư mục sẽ được tạo trong `apps/web/src/app/(dashboard)/...`. Các thư mục này đại diện cho Menu của từng phân quyền.

### 🎓 1. Student Dashboard (`/student`)
Dành cho người học, tập trung vào việc học, thi, chứng chỉ và việc làm.
- `/student/dashboard` *(Tổng quan, Biểu đồ Radar năng lực)*
- `/student/classrooms` *(Danh sách lớp học/khóa học đang tham gia)*
- `/student/competencies` *(Chi tiết tiến trình năng lực chuẩn DigComp)*
- `/student/assessments` *(Làm bài thi trắc nghiệm, bài thi thích ứng CAT)*
- `/student/submissions` *(Nộp bài thực hành)*
- `/student/certificates` *(Chứng chỉ số, Soulbound Token)*
- `/student/jobs` *(Cơ hội việc làm phù hợp năng lực)*
- `/student/wallet` *(Ví lưu trữ token)*

### 👨‍🏫 2. Teacher Dashboard (`/teacher`)
Dành cho giáo viên/giảng viên, tập trung vào giảng dạy và khảo thí.
- `/teacher/dashboard` *(Tổng quan lớp học, thống kê)*
- `/teacher/classrooms` *(Quản lý lớp học, thêm học viên)*
- `/teacher/students` *(Theo dõi tiến độ năng lực của học viên)*
- `/teacher/question-bank` *(Quản lý Ngân hàng câu hỏi)*
- `/teacher/assessments` *(Tạo đề thi, cấu hình CAT Session)*
- `/teacher/submissions` *(Chấm điểm bài thực hành)*
- `/teacher/marketplace` *(Mua bán/chia sẻ Rubric, bộ câu hỏi)*

### 🏢 3. Enterprise Dashboard (`/employer` hoặc `/enterprise`)
Dành cho doanh nghiệp tuyển dụng hoặc đào tạo nội bộ.
- `/enterprise/dashboard` *(Tổng quan)*
- `/enterprise/employees` *(Quản lý nhân viên đào tạo nội bộ - tương tự Classroom)*
- `/enterprise/campaigns` *(Đăng chiến dịch tuyển dụng)*
- `/enterprise/candidates` *(Tìm kiếm ứng viên khớp với khung năng lực)*
- `/enterprise/verify` *(Xác minh chứng chỉ số)*
- `/enterprise/billing` *(Quản lý thanh toán SaaS)*
- `/enterprise/ai-quota` *(Theo dõi dung lượng sử dụng AI)*

### ⚙️ 4. Admin Dashboard (`/admin`)
Dành cho Super Admin điều hành nền tảng SaaS.
- `/admin/dashboard` *(Tổng quan hệ thống)*
- `/admin/tenants` *(Quản lý các tổ chức/khách hàng thuê SaaS)*
- `/admin/users` *(Quản lý người dùng toàn hệ thống)*
- `/admin/frameworks` *(Quản lý cấu trúc chuẩn năng lực, VD: DigComp 3.0)*
- `/admin/ai-settings` *(Cấu hình Provider AI, Quản lý Prompts)*
- `/admin/marketplace` *(Duyệt tài nguyên trên chợ)*
- `/admin/plugins` *(Quản lý hệ sinh thái Plugin)*
- `/admin/billing` *(Quản lý doanh thu toàn nền tảng)*
- `/admin/system-logs` *(System Audit Logs & AI Logs)*

---

## 2. Đánh giá Backend hiện tại (Backend Gap Analysis)

Sau khi phân tích `schema.prisma` và đối chiếu với thư mục `apps/api/src/modules`, dưới đây là tình trạng của Backend:

✅ **Đã hoàn thành**:
- **Identity Module**: Quản lý User, Session, RBAC, Đăng nhập, Đổi mật khẩu.
- **Security & Observability**: Logger, Throttler, Mailer, Tenant Middleware.

❌ **Các Module Backend đang thiếu (Cần làm trong các Sprint tiếp theo)**:
Hiện tại Backend *chưa có bất kỳ business logic nào* cho các Domain dưới đây:
1. **Tenant Module**: Quản lý SaaS Tenants (`Tenant`).
2. **Workspace Module**: Quản lý lớp học, học viên (`Classroom`, `ClassroomStudent`).
3. **Competency Module**: Khung năng lực (`CompetencyFramework`, `CompetencyArea`, `Competency`, `StudentCompetency`).
4. **Assessment Module**: Khảo thí & Chấm điểm (`Question`, `CatSession`, `Submission`).
5. **Certification Module**: Chứng chỉ số (`Certificate`).
6. **Talent/Employer Module**: Tuyển dụng (`JobCampaign`).
7. **Billing Module**: Thanh toán (`Wallet`, `Transaction`).
8. **AI Platform Module**: Cấu hình AI, Prompts, Jobs (`AIProviderSetting`, `PromptTemplate`, `AIJob`).
9. **Marketplace & Plugin Module**: Mở rộng hệ sinh thái.

> **💡 Kết luận**: Việc thiếu các API này ở Backend là **hoàn toàn bình thường** vì chúng ta mới chỉ kết thúc Sprint 3 (Làm móng Identity & Security). 

---

## 3. Kiến trúc Layout Component (Phase-by-Phase)

### Phase 1: Core Layout Components
- `DashboardSidebar.tsx`: Chứa danh sách navigation (Menu đọc từ Config).
- `DashboardHeader.tsx`: Thanh công cụ ngang, chứa Search, Notification, và User Menu.
- `DashboardContainer.tsx`: Wrapper bao bọc main content.

### Phase 2: Role-based Navigation Configuration
Tạo `src/config/navigation.ts` chứa mảng các Menu (href, icon, label) tương ứng với cấu trúc thư mục ở **Phần 1**. Khi chuyển đổi Role, Sidebar sẽ render Menu array tương ứng.

### Phase 3: Hợp nhất Layouts
Import chung một `SharedDashboardLayout` vào `(dashboard)/[role]/layout.tsx`. Layout này nhận tham số `role` để tự động render UI phù hợp, tránh lặp lại code Sidebar/Header ở 4 nơi.

---

> [!WARNING]
> Mình đã thiết kế cấu trúc thư mục Frontend bao phủ **toàn bộ 13 phân vùng của Database Schema**. Tuy nhiên, vì Backend hiện tại chưa có API cho các chức năng này, trong giai đoạn thiết kế Frontend (Sprint 4), chúng ta sẽ **tạo các trang tĩnh (Mock UI) trước**. Bạn có đồng ý với việc dựng khung UI bằng dữ liệu giả trước khi quay lại xây dựng các Module Backend không?

> [!IMPORTANT]
> Đối với không gian của doanh nghiệp tuyển dụng, bạn muốn đường dẫn (URL) là `/enterprise/*` hay `/employer/*`? Trong DB có model `EmployerProfile`, nhưng tenant SaaS lại liên quan đến Enterprise. Mình tạm đề xuất `/enterprise/*`.
