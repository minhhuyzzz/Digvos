# 44. Authentication & Authorization Security Architecture

Tài liệu này đặc tả kiến trúc xác thực (Authentication), phân quyền (Authorization) và lưu giữ phiên đăng nhập an toàn chống tấn công mạng cho hệ thống DIGVOS.

---

## 🔐 1. Kiến Trúc Xác Thực (Authentication Flow)

DIGVOS sử dụng mô hình xác thực một lần duy nhất (Single Sign-On - SSO) qua **Auth0 OIDC (OpenID Connect)** kết hợp mã thông báo bảo mật JWT:

1. **Đăng nhập**: Người dùng nhấn "Đăng nhập" ➜ Chuyển hướng sang Auth0 login page ➜ Đăng nhập thành công ➜ Auth0 redirect ngược về Next.js API route kèm `code`.
2. **Cấp Token**: Next.js Server trao đổi `code` lấy bộ đôi Token:
   - **Access Token (JWT)**: Chứa thông tin user, vai trò (role) và thời hạn ngắn (15 phút).
   - **Refresh Token**: Chuỗi ngẫu nhiên dài dùng để lấy Access Token mới, thời hạn dài (7 ngày).

---

## 🛡️ 2. Lưu Giữ Token An Toàn (Cookie-Based Security)

Để triệt tiêu nguy cơ bị đánh cắp Token qua lỗ hổng XSS (Cross-Site Scripting), DIGVOS cấm tuyệt đối việc lưu Access Token và Refresh Token trong `localStorage` hoặc `sessionStorage` của trình duyệt.
- **Quy chuẩn lưu trữ**: Toàn bộ Token bắt buộc phải lưu dưới dạng **HttpOnly Cookie** cấu hình bảo mật nghiêm ngặt:
  - `HttpOnly`: Trình duyệt không cho phép mã JavaScript (mã độc) đọc cookie này.
  - `Secure`: Cookie chỉ được gửi qua kết nối HTTPS mã hóa bảo mật.
  - `SameSite = Strict`: Cookie chỉ được gửi cùng domain chính, chống hoàn toàn tấn công CSRF (Cross-Site Request Forgery).
  - `Path = /`: Khả dụng cho toàn bộ dự án Next.js.

---

## 🔄 3. Cơ Chế Xoay Vòng Token (Refresh Token Rotation)

- **Tự động gia hạn**: Khi Access Token chuẩn bị hết hạn (còn 2 phút):
  - Next.js Client tự động gọi API ngầm `/api/v1/auth/refresh` bằng phương thức POST.
  - Backend kiểm tra tính hợp lệ của Refresh Token trong Cookie. Nếu hợp lệ, cấp cặp Access/Refresh Token mới tinh và lưu đè vào cookie.
- **Refresh Token Rotation (RTR)**: Mỗi khi Refresh Token cũ được sử dụng để lấy cặp token mới, Refresh Token cũ đó lập tức bị thu hồi vô hiệu hóa. Nếu phát hiện một Refresh Token đã thu hồi cố tình gửi yêu cầu refresh lại, hệ thống hiểu đây là hành vi tấn công nhân bản token ➜ Lập tức hủy bỏ toàn bộ session của tài khoản đó và bắt buộc đăng nhập lại từ đầu.

---

## 🧠 4. Bộ Nhớ Đệm Phân Quyền (RBAC Permission Caching)

Để tăng tốc độ kiểm soát phân quyền ở API Gateway của NestJS mà không cần liên tục truy vấn SQL vào PostgreSQL:
- **Redis Permission Cache**:
  - Khi user đăng nhập thành công, danh sách các quyền hạn (Permissions) và vai trò (Role) của user được lưu tạm vào **Redis Cache** với key: `user:permissions:{userId}` có thời gian sống (TTL) bằng thời hạn của Access Token (15 phút).
  - `RolesGuard` của NestJS sẽ ưu tiên đọc thông tin quyền hạn trực tiếp từ Redis trong vòng 0.2 mili-giây. Nếu không tìm thấy (cache miss) mới truy vấn PostgreSQL và nạp lại vào cache.
  - **Cơ chế xoá cache (Eviction)**: Khi Admin điều chỉnh quyền hạn hoặc vô hiệu hóa một người dùng, hệ thống lập tức phát sự kiện xóa key tương ứng trong Redis để có tác dụng khóa tài khoản ngay lập tức.
