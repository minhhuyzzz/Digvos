# 48. Environment & CI/CD Deployment Architecture

Tài liệu này đặc tả cấu hình biến môi trường, kiến trúc Docker hóa (Dockerization) và quy trình tích hợp/triển khai tự động (CI/CD) của hệ thống DIGVOS.

---

## ⚙️ 1. Quản Lý Biến Môi Trường (Environments Strategy)

DIGVOS phân tách rõ ràng cấu hình giữa các môi trường vận hành thông qua các tệp cấu hình `.env` tương ứng:

- **Local Development (`.env.local`)**:
  - Kết nối cơ sở dữ liệu PostgreSQL local hoặc Docker container local.
  - Tắt SSL kiểm tra an toàn, bật log debug tối đa.
- **Testing Môi Trường (`.env.test`)**:
  - Chạy dữ liệu mock hoàn toàn hoặc database Sqlite/PostgreSQL tạm thời phục vụ Jest integration/e2e testing.
- **Staging / Sandbox (`.env.staging`)**:
  - Môi trường chạy thử nghiệm giống Production 99%, kết nối mạng thử nghiệm Polygon Amoy Testnet.
- **Production (`.env.production`)**:
  - Bảo mật tuyệt đối. Truy cập thông qua AWS Secrets Manager hoặc HashiCorp Vault.
  - Kết nối PostgreSQL cụm HA (High Availability), kết nối Mainnet Polygon, bật SSL mã hóa bắt buộc.

---

## 📦 2. Docker Hóa Ứng Dụng (Dockerization)

Tất cả các dịch vụ trong monorepo đều được đóng gói thành Docker Image để đảm bảo tính nhất quán giữa các môi trường máy chủ:

- **NestJS Backend Dockerfile (`apps/api/Dockerfile`)**:
  - Sử dụng quy trình build 2 giai đoạn (Multi-stage build) để giảm kích thước image từ `1GB` xuống dưới `150MB` (chỉ chứa `node_modules` production và code build JS).
- **Next.js Frontend Dockerfile (`apps/web/Dockerfile`)**:
  - Tận dụng tính năng Output File Tracing của Next.js để tự động đóng gói ứng dụng siêu nhẹ chạy bằng Node.js thuần mà không cần cài đặt toàn bộ devDependencies.

---

## 🚀 3. Luồng Tự Động Hóa CI/CD (GitHub Actions Pipeline)

Mỗi khi có mã nguồn mới được push lên nhánh chính (`main` hoặc `develop`), luồng GitHub Actions tự động kích hoạt:

```
[Developer Push]
       │
       ▼
[CI Pipeline] ➜ 1. Install & Cache Deps ➜ 2. Run ESLint & Prettier ➜ 3. Run Jest Unit Tests
       │
       ▼ (Nếu pass 100%)
[Build Pipeline] ➜ Build NestJS & NextJS production bundles ➜ Build Docker Images
       │
       ▼
[Registry] ➜ Push Docker Images to AWS ECR / GitHub Packages (Tagged with git commit SHA)
       │
       ▼
[CD Pipeline] ➜ 1. Chạy Prisma Database Migration ➜ 2. Trigger Rolling Update Deploy
```

---

## 🔄 4. Chiến Lược Cập Nhật Database & Không Gián Đoạn (Zero-Downtime Deploy)

- **Quy tắc chạy Migration an toàn**:
  - Trong bước CD (Deploy), trước khi khởi chạy các container backend mới, hệ thống bắt buộc phải thực thi lệnh áp dụng cấu trúc dữ liệu mới:
    `npx prisma migrate deploy`
  - *Lưu ý*: Cấm chạy `prisma migrate dev` trên môi trường staging/production vì lệnh này sẽ xóa sạch dữ liệu cũ (Data loss risk).
- **Zero-Downtime Deployment (Rolling Updates)**:
  - Sử dụng cơ chế cập nhật cuốn chiếu (Rolling Update) của AWS ECS hoặc Kubernetes.
  - Container cũ chỉ bị tắt đi sau khi Container mới đã khởi động thành công và vượt qua vòng kiểm tra sức khỏe đầu vào (Health Check `/api/v1/health` trả về status 200). Điều này giúp hệ thống hoạt động liên tục 24/7 không gián đoạn dịch vụ của người dùng.
