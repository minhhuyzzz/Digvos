# ADR-002: Sử Dụng Auth0 OIDC Làm Giải Pháp Xác Thực

- **Trạng thái**: APPROVED
- **Người quyết định**: Software Architect / Tech Lead
- **Ngày**: 2026-07-11

---

## 📋 1. Bối cảnh (Context)
Hệ thống DIGVOS phục vụ các tổ chức giáo dục đại học và doanh nghiệp lớn (SaaS Enterprise). Yêu cầu xác thực phải đạt các chứng chỉ an ninh cao nhất, hỗ trợ đăng nhập một lần (Single Sign-On - SSO), dễ dàng tích hợp với danh bạ nội bộ của doanh nghiệp (SAML, Active Directory/LDAP), và có cơ chế quản lý vòng đời tài khoản an toàn mà không làm tăng khối lượng bảo trì mã nguồn bảo mật của dev team.

---

## 🚀 2. Quyết định (Decision)
Quyết định sử dụng **Auth0 OIDC (OpenID Connect)** làm giải pháp xác thực (Authentication Provider) chính thức cho hệ thống:
- Sử dụng Auth0 Hosted Login Page để loại bỏ nguy cơ rò rỉ form đăng nhập.
- Next.js Server nhận Authorization Code ➜ Đổi lấy JWT và lưu trữ an toàn trong Secure HttpOnly Cookies của trình duyệt.
- Tích hợp cổng phân quyền RBAC và lưu cache quyền hạn trong Redis để phục vụ truy vấn tốc độ cao tại NestJS API Gateway.

---

## ⚖️ 3. Các Phương Án Đã Cân Nhắc (Alternatives Considered)

### Phương án A: Tự phát triển hệ thống Auth từ đầu (Custom NestJS JWT Auth)
- *Ưu điểm*: Miễn phí hoàn toàn, toàn quyền kiểm soát cấu trúc bảng dữ liệu.
- *Nhược điểm*: Chi phí bảo trì bảo mật cực kỳ cao. Đội ngũ phải tự lập trình chống brute-force, tự thiết kế luồng reset password, gửi mail OTP, và tự cấu hình kết nối SAML với doanh nghiệp. Dễ để lại lỗ hổng bảo mật nghiêm trọng nếu cấu hình sai.

### Phương án B: Clerk
- *Ưu điểm*: Giao diện components làm sẵn cực kỳ đẹp, dễ tích hợp với Next.js trong vòng 10 phút.
- *Nhược điểm*: Khả năng tùy biến sâu cho Enterprise SSO (như liên kết LDAP/SAML của trường đại học) rất hạn chế ở gói cơ bản. Chi phí bản quyền gói Enterprise phình to nhanh hơn nhiều so với Auth0.

---

## 📈 4. Hệ quả (Consequences)
- **Tích cực**:
  - Đạt chuẩn bảo mật Enterprise ngay từ ngày đầu tiên (SOC2, ISO 27001 compliance).
  - Tích hợp nhanh gọn đăng nhập bằng Google, Microsoft, GitHub, và các cổng Enterprise SSO của doanh nghiệp khách hàng.
  - Loại bỏ hoàn toàn gánh nặng lưu trữ mật khẩu mã hóa trong database cục bộ của DIGVOS.
- **Thử thách**:
  - Giao diện đăng nhập bị phụ thuộc vào domain của Auth0 (cần cấu hình Custom Domain ở bản trả phí để giữ đồng bộ thương hiệu).
  - Giới hạn 7.000 người dùng hoạt động hàng tháng (MAU) ở gói Free đòi hỏi hệ thống phải tối ưu hóa việc quản lý tài khoản và lên kế hoạch nâng cấp gói dịch vụ khi dự án mở rộng quy mô thương mại.
