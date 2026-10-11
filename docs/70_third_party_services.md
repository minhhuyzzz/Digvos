# 70. Third-Party Services Registry & Integration Strategy

Tài liệu này đặc tả danh sách và chiến lược tích hợp các dịch vụ bên thứ ba (Third-Party Services) tham gia vào hệ sinh thái của DIGVOS, quy định rõ ràng giới hạn quota, phương án dự phòng (Fallback) khi dịch vụ gặp sự cố (Outage).

---

## 📋 1. Danh Mục Các Dịch Vụ Tích Hợp (Services Registry)

### A. Auth0 (Xác thực & Danh tính)
- **Mục đích**: Cung cấp cổng SSO OIDC, quản lý phiên đăng nhập và bảo mật tài khoản.
- **Giới hạn & Quota**: Gói Free tối đa 7.000 Active Users tháng.
- **Phương án dự phòng (Outage Policy)**: Nếu Auth0 sập ➜ Client hiển thị trang thông báo bảo trì login. API Server giữ lại session cache trong Redis để những người dùng đang đăng nhập không bị văng ra ngay lập tức.

### B. Google Gemini AI API (Trí tuệ nhân tạo)
- **Mục đích**: Chấm điểm minh chứng tự luận, phân tích rubric và đề xuất đào tạo thích ứng.
- **Phiên bản**: `gemini-1.5-pro` (độ chính xác cao cho phân tích file PDF) và `gemini-1.5-flash` (độ trễ thấp cho sinh text nhanh).
- **Phương án dự phòng (Fallback)**: Nếu Gemini quá tải hoặc hết quota ➜ Đẩy job chấm điểm vào `ai-analysis-queue` ở chế độ `DELAY` và thử lại sau 10 phút. Nếu vẫn lỗi, chuyển sang mô hình fallback **Claude 3.5 Sonnet** thông qua khóa API dự phòng.

### C. Polygon Blockchain Network (Ví & Soulbound Tokens)
- **Mục đích**: Đúc SBT bảo chứng năng lực số vĩnh viễn trên chuỗi.
- **RPC Providers**: Sử dụng nhà cung cấp chính là **Alchemy** (RPC endpoint) và nhà cung cấp dự phòng **Infura / Public Polygon RPC**.
- **Phương án dự phòng (Outage Policy)**: Nếu mạng Polygon nghẽn gas hoặc node sập ➜ Hàng đợi `mint-sbt-queue` tự động tạm dừng (pause). Khi RPC Node hoạt động bình thường, worker tự động chạy tiếp các giao dịch bị tồn đọng mà không làm mất mát dữ liệu chứng chỉ.

### D. Supabase Storage (Lưu trữ S3 tương thích)
- **Mục đích**: Lưu trữ tệp tin minh chứng (Evidence), báo cáo PDF và tài nguyên tĩnh.
- **Phương án dự phòng (Outage Policy)**: Khi Supabase S3 API lỗi không trả về Presigned URL ➜ Backend chuyển hướng tạm thời sang lưu trữ local trong ổ đĩa dự phòng và đồng bộ ngược lại S3 khi dịch vụ trực tuyến trở lại.

### E. Resend / AWS SES (Hạ tầng gửi thư)
- **Mục đích**: Gửi thư xác nhận, liên kết phỏng vấn, báo cáo tiến độ tuần.
- **Phương án dự phòng (Outage Policy)**: Khi nhà cung cấp chính sập ➜ Tự động chuyển đổi driver gửi thư trong `MailService` sang nhà cung cấp phụ (Ví dụ: Chuyển từ Resend sang AWS SES hoặc SendGrid).

---

## 🔒 2. Quy Tắc Bảo Mật API Keys & Secrets

- **CẤM hardcode** bất kỳ API Key hoặc Mật khẩu dịch vụ nào vào mã nguồn Git.
- **Quản lý Secrets**:
  - Trên local: Lưu tại `.env.local` nằm trong `.gitignore`.
  - Trên Staging/Production: Nạp thông qua AWS Secrets Manager hoặc biến môi trường Container trong ECS/Kubernetes.
- **Xoay vòng khóa (Secrets Rotation)**: Khóa API Gemini, ví tiền Polygon và thông số Auth0 bắt buộc phải được xoay vòng đổi mới 3 tháng một lần để phòng ngừa rò rỉ khóa âm thầm.
