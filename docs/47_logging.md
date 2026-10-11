# 47. Enterprise Logging & Auditing Strategy

Tài liệu này đặc tả kiến trúc ghi nhật ký hệ thống (Logging) và kiểm toán (Auditing) của DIGVOS, đảm bảo tính minh bạch, hỗ trợ gỡ lỗi nhanh và tuân thủ các quy định bảo mật an toàn thông tin.

---

## 📋 1. Phân Loại Nhật Ký (Logging Categories)

Hệ thống ghi nhận 5 nhóm nhật ký độc lập để phục vụ các đối tượng phân tích khác nhau:

1. **Nhật ký Ứng dụng (Application Logs)**:
   - *Mô tả*: Trạng thái hoạt động nội bộ của API Server (Ví dụ: Server khởi động, kết nối DB thành công, seed DigComp hoàn tất).
   - *Cấp độ*: `info`, `warn`, `error`, `debug`.
2. **Nhật ký Kết nối HTTP (HTTP Request/Response Logs)**:
   - *Mô tả*: Lưu vết mọi cuộc gọi API đến hệ thống (IP, Method, Path, Status Code, Response Time).
   - *Thực thi*: Sử dụng middleware logging (ví dụ `morgan` hoặc NestJS `LoggerInterceptor`).
3. **Nhật ký Lỗi Hệ thống (Error Logs)**:
   - *Mô tả*: Stack traces chi tiết của các lỗi ngoại lệ 500 phát sinh trong mã nguồn.
   - *Cảnh báo*: Tự động đẩy cảnh báo về kênh Discord/Slack của Dev team hoặc Sentry khi có lỗi critical xảy ra liên tục.
4. **Nhật ký Kiểm toán Nghiệp vụ (Business Audit Logs)**:
   - *Mô tả*: Lưu vết các hành động quan trọng của người dùng (Ai làm gì, lúc nào, thay đổi những gì).
   - *Ví dụ*: *"Giảng viên A phê duyệt minh chứng của sinh viên B đạt 90 điểm"*, *"Admin B khóa Tenant C"*.
   - *Lưu trữ*: Lưu vào bảng `AuditLog` hoặc `EventLog` trong database để phục vụ truy xuất nghiệp vụ.
5. **Nhật ký An ninh (Security Logs)**:
   - *Mô tả*: Lưu vết các hành vi đáng nghi (Ví dụ: Thử đăng nhập sai mật khẩu quá 5 lần, cố tình gọi API admin bằng tài khoản Student, IP thay đổi đột ngột).

---

## 🎨 2. Định Dạng Cấu Trúc Nhật Ký (Structured Logging Format)

DIGVOS áp dụng chuẩn **Structured Logging** ghi log dưới định dạng **JSON** để các công cụ phân tích log tự động (Elasticsearch/Grafana Loki) dễ dàng lọc và phân tích:

*Cấu trúc JSON Log mẫu*:
```json
{
  "timestamp": "2026-07-11T13:40:00.000Z",
  "level": "error",
  "context": "EvidenceService",
  "message": "Submission id validation failed: submission-789 not found",
  "trace": "Error: Submission not found\n    at EvidenceService.validateEvidence...",
  "meta": {
    "tenantId": "default-tenant-id",
    "userId": "teacher-123",
    "requestId": "req-abc-123"
  }
}
```

---

## 🔒 3. Bảo Vệ Thông Tin Nhạy Cảm (Log Masking)

Để tuân thủ các chuẩn an toàn thông tin (GDPR / HIPAA), hệ thống bắt buộc phải áp dụng bộ lọc che giấu thông tin nhạy cảm trước khi ghi ra file hoặc đẩy lên Cloud:
- **Thông tin cần che giấu (Redacted fields)**: Mật khẩu, mã pin, token khóa bảo mật, số thẻ tín dụng, địa chỉ email, và số điện thoại cá nhân.
- **Giải thuật**: Sử dụng middleware tự động regex thay thế giá trị của các trường nhạy cảm trong `req.body` thành chuỗi `[REDACTED]`.

---

## 🏛️ 4. Lưu Trữ & Xoay Vòng Nhật Ký (Log Rotation & Shipping)

- **Log Rotation (Xoay vòng log)**:
  - Máy chủ NestJS lưu log cục bộ vào file thông qua thư viện `winston` hoặc `pino`.
  - Cấu hình tự động cắt file log (`winston-daily-rotate-file`): Mỗi file tối đa `20 MB` hoặc tự động cắt theo ngày. Giữ lại tối đa log của 30 ngày gần nhất để bảo vệ bộ nhớ đĩa cứng.
- **Log Shipping (Đẩy log tập trung)**:
  - Sử dụng các agent chạy ngầm (như FluentBit hoặc Vector) tự động thu thập các file log JSON này và đẩy về hệ thống quản lý log tập trung **Grafana Loki / Elasticsearch** để Dev/Ops team dễ dàng tìm kiếm và vẽ đồ thị đo lường lỗi.
