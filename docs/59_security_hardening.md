# 59. Security Hardening Specifications

Tài liệu này đặc tả các chính sách và giải pháp thắt chặt an ninh (Security Hardening) của DIGVOS nhằm phòng chống 10 lỗ hổng bảo mật phổ biến nhất (OWASP Top 10) và bảo vệ hạ tầng máy chủ Enterprise SaaS.

---

## 🚦 1. Các Trụ Cột Phòng Thủ Mạng (Network & HTTP Security)

### A. Helmet Integration (Security Headers)
- API Server NestJS bắt buộc tích hợp thư viện `helmet` để tự động chèn các tiêu đề HTTP bảo mật cao vào mọi phản hồi:
  - `X-DNS-Prefetch-Control`: Tắt prefetch DNS để chống lộ lịch sử lướt web.
  - `X-Frame-Options: DENY`: Chống tấn công Clickjacking (chèn website vào trong iframe lậu).
  - `X-Content-Type-Options: nosniff`: Ép trình duyệt tuân thủ chặt chẽ định dạng tệp tin phản hồi, chống thực thi shell script trá hình.

### B. Chính Sách Bảo Mật Nội Dung (Content Security Policy - CSP)
- Cấu hình CSP nghiêm ngặt trên cả Next.js và NestJS chỉ cho phép tải script, css, và hình ảnh từ các domain đáng tin cậy:
  ```
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://assets.auth0.com;
  img-src 'self' data: https://supabase.co https://cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  connect-src 'self' https://*.polygon.technology https://api.gemini.google.com;
  ```
- Việc này giúp triệt tiêu hoàn toàn nguy cơ bị hacker chèn mã độc đánh cắp token bằng XSS.

### C. Ép HTTPS (HTTP Strict Transport Security - HSTS)
- Cấu hình header `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- Ép toàn bộ trình duyệt của người dùng bắt buộc phải giao tiếp với hệ thống qua cổng bảo mật mã hóa HTTPS, ngăn chặn tấn công trung gian (Man-in-the-Middle - MITM).

---

## 🔑 2. Phòng Chống Tấn Công Giả Mạo Yêu Cầu (CSRF Hardening)

- Toàn bộ các API dạng Mutation (POST, PATCH, DELETE) bắt buộc phải kiểm tra và xác minh an toàn nguồn gốc:
  - Access Token lưu ở cookie được gán cờ `SameSite = Strict` ➜ Ngăn chặn trình duyệt tự động gửi cookie khi nhấp link từ trang web lậu.
  - Bật cấu hình kiểm tra tiêu đề **`Origin`** và **`Referer`** ở lớp CORS của NestJS, chỉ cho phép các yêu cầu gửi trực tiếp từ các subdomain được phê duyệt của Tenant (Ví dụ: `https://*.digvos.com`).

---

## 🔒 3. Bảo Vệ Thông Tin Bí Mật (Secrets Rotation Policy)

- **Cấm lưu trữ Secrets trong Docker Image**:
  - Toàn bộ khóa API Gemini, ví tiền Polygon, DB connection strings cấm được ghi thẳng vào tệp Dockerfile hoặc lưu trữ tĩnh trong container registry.
- **Nạp động (Runtime Injection)**:
  - Biến môi trường chỉ được nạp động vào container lúc khởi động (Runtime injection) thông qua các dịch vụ bảo mật (AWS Secrets Manager / Google Secret Manager).
- **Giải thuật xoay vòng (Rotation)**:
  - Khóa API được tự động đổi mới (Rotate) định kỳ **90 ngày một lần**. Hệ thống có bộ script tự động cập nhật khóa mới trong Redis và AWS Secrets Manager mà không cần khởi động lại máy chủ.
