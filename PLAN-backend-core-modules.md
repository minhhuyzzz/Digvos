# Kế hoạch Kiến trúc: Backend Core Modules (Sprint 4 - 7)

Dựa trên phân tích 9 module đang thiếu ở Backend so với Database Schema, chúng ta không thể làm tất cả trong một Sprint. Việc phát triển cần tuân theo **Chuỗi Phụ thuộc (Dependency Chains)** của dữ liệu. 

Ví dụ: Không thể làm Bài kiểm tra (Assessment) nếu chưa có Khung năng lực (Competency). Không thể có Khung năng lực nếu chưa cấu hình Tenant SaaS.

Dưới đây là Lộ trình chiến lược (Roadmap) chia thành các Sprint để giải quyết dứt điểm Backend.

---

## 1. Chuỗi Phụ thuộc Dữ liệu (Dependency Chains)
```text
[Tenant] 
   ├──> [Competency Framework] ──> [Assessment (Questions/CAT)] ──> [Certification]
   └──> [Workspace (Classroom)] ──> [Student Progress] ──> [Talent Matching]
```

## 2. Kế hoạch Phân bổ (Phase-by-Phase Breakdown)

### 🚀 Sprint 4: Organizational Core (Nền tảng Tổ chức & Không gian)
*Mục tiêu: Đưa Tenant và Lớp học vào hoạt động.*
- **Tenant Module**: CRUD tổ chức SaaS, cấu hình phân giải tên miền (Domain mapping).
- **Workspace Module**: 
  - Quản lý `Classroom` (Giáo viên tạo lớp).
  - Quản lý `ClassroomStudent` (Thêm học viên vào lớp).
- **Profile Module**: Tự động tạo `StudentProfile`, `TeacherProfile`, `EmployerProfile` khi người dùng đăng ký hoặc được phân quyền.

### 🧠 Sprint 5: Educational Engine (Lõi Đào tạo & Năng lực)
*Mục tiêu: Định nghĩa khung năng lực chuẩn DigComp và cấu trúc đề thi.*
- **Competency Module**: CRUD `CompetencyFramework`, `CompetencyArea`, `Competency`.
- **Assessment Module (Part 1)**: Ngân hàng câu hỏi (`Question`) gán với từng Competency.
- **Assessment Module (Part 2)**: Quản lý nộp bài thực hành (`Submission`).

### 🤖 Sprint 6: AI & Adaptive Testing (Kiểm tra Thích ứng & AI)
*Mục tiêu: Đưa AI vào chấm điểm và tạo bài thi thích ứng (CAT).*
- **AI Platform Module**: Quản lý `AIProviderSetting`, `PromptTemplate`.
- **CAT Session Module**: Logic bài thi thích ứng (tính toán tham số Theta IRT) cho `CatSession` và `CatResponse`.
- **AI Grading**: Worker (BullMQ) xử lý chấm điểm tự động cho `Submission` qua AI.

### 🏆 Sprint 7: Ecosystem & Monetization (Hệ sinh thái & Thương mại)
*Mục tiêu: Chứng chỉ số, Tuyển dụng và Thu phí.*
- **Certification Module**: Cấp phát `Certificate`, tạo QR Code/Verification Code.
- **Talent Module**: Doanh nghiệp tạo `JobCampaign` và match với năng lực học viên.
- **Billing Module**: Ví nội bộ (`Wallet`), Giao dịch (`Transaction`).
- **Marketplace & Plugins**: Quản lý chợ tài nguyên giáo dục.

---

## 3. Focus: Chi tiết Sprint 4 (Immediate Execution)

Chúng ta sẽ bắt tay vào **Sprint 4** ngay lập tức. Dưới đây là các API cần xây dựng:

**1. Tenant API (`/api/tenants`)**
- `POST /` - Tạo Tenant mới.
- `GET /` - Liệt kê Tenant (chỉ Admin).
- `GET /:id` - Chi tiết Tenant.

**2. Profile API (`/api/profiles`)**
- `GET /me` - Lấy thông tin Profile (Student/Teacher/Employer) của user đang đăng nhập.
- `PUT /me` - Cập nhật profile (ePortfolio, companyName...).

**3. Workspace API (`/api/classrooms`)**
- `POST /` - (Teacher) Tạo lớp học mới.
- `GET /` - Lấy danh sách lớp học theo Tenant.
- `POST /:id/students` - (Teacher) Thêm học viên vào lớp.
- `GET /:id/students` - Danh sách học viên trong lớp.

## 4. Kế hoạch Kiểm thử (Verification Plan)
- **Unit/E2E Tests**: Đảm bảo Tenant Isolation (Học viên lớp này không xem được dữ liệu lớp khác, dữ liệu Tenant A tách biệt Tenant B).
- **Manual API Testing**: Dùng Postman để tạo 1 Tenant -> Tạo 1 Teacher -> Teacher tạo 1 Classroom -> Thêm 1 Student vào.

---
> [!IMPORTANT]
> **Quyết định Kiến trúc Modules:**
> Mỗi Module (Tenant, Workspace, Profile) sẽ được đặt trong `apps/api/src/modules/` theo kiến trúc Clean Architecture (Presentation, Application, Domain, Infrastructure). Bạn có đồng ý với thiết kế này không?

> [!WARNING]
> **Về Tenant Isolation:**
> Chúng ta đã có `TenantMiddleware` để lấy `tenantId` gán vào `req.tenantId`. Tất cả các API trong Sprint 4 này BẮT BUỘC phải lưu trữ và truy vấn dựa trên `tenantId` này để đảm bảo bảo mật dữ liệu giữa các tổ chức SaaS.
