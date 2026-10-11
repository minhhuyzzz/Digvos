# 53. API Rate Limiting & Throttling Specification

Tài liệu này đặc tả cơ chế giới hạn tần suất truy cập API (Rate Limiting) nhằm bảo vệ hệ thống DIGVOS khỏi các cuộc tấn công từ chối dịch vụ (DDoS), spam API và kiểm soát chi phí sử dụng tài nguyên AI/Blockchain.

---

## 🏛️ 1. Lựa Chọn Công Nghệ (NestJS Throttler & Redis Store)

Hệ thống sử dụng module `@nestjs/throttler` làm chốt chặn rate limit ở API Gateway.
- **Phân tán (Distributed Lock)**: Để đồng bộ số lượng request giới hạn khi scale nhiều node backend NestJS, hệ thống sử dụng **Redis Store** (`throttler-storage-redis`) để lưu trữ số lượng click của client thay vì lưu ở bộ nhớ RAM cục bộ của từng node server.
- **Khóa định danh (Identifier Key)**: 
  - Đối với người dùng chưa đăng nhập: Giới hạn theo địa chỉ IP của client (`req.ip`).
  - Đối với người dùng đã đăng nhập: Giới hạn theo mã định danh tài khoản (`req.user.id`).

---

## 📋 2. Bản Đồ Giới Hạn Tần Suất (Rate Limit Policies)

Hệ thống cấu hình 6 cấp độ giới hạn tần suất khác nhau tùy thuộc vào mức độ tiêu tốn tài nguyên của API:

| Nhóm API | URL Pattern | Cấu hình giới hạn | Mục tiêu bảo vệ |
| :--- | :--- | :--- | :--- |
| **Global Default** | `/api/v1/*` | 100 reqs / 15 phút | Chống crawl dữ liệu hàng loạt |
| **Xác thực (Auth)** | `/api/v1/auth/login` | 5 reqs / 1 phút | Chống brute-force mật khẩu |
| **Nộp bài thi (CAT)** | `/api/v1/assessment/submit` | 10 reqs / 1 phút | Chống spam gửi đáp án khống |
| **Tải file (Upload)** | `/api/v1/storage/presigned` | 20 reqs / 1 phút | Chống spam sinh URL lưu trữ ảo |
| **Trí tuệ nhân tạo (AI)**| `/api/v1/ai/*` | 30 reqs / 1 phút | Tiết kiệm chi phí API Token Gemini |
| **Thời gian thực (SSE)** | `/api/v1/notifications/*` | 100 reqs / 1 phút | Hạn chế spam kết nối stream |

---

## 🔒 3. Định Dạng Phản Hồi Khi Bị Chặn (429 Too Many Requests)

Khi Client vượt quá số lượng request cho phép trong khung thời gian quy định, API Gateway lập tức từ chối xử lý và trả về HTTP Status Code `429 Too Many Requests` kèm payload lỗi JSON tiêu chuẩn:

```json
{
  "success": false,
  "error": {
    "statusCode": 429,
    "errorCode": "RATE_LIMIT_EXCEEDED",
    "message": "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 45 giây.",
    "path": "/api/v1/ai/generate-rubric",
    "details": {
      "retryAfterSeconds": 45
    }
  },
  "meta": {
    "timestamp": "2026-07-11T13:40:00.000Z"
  }
}
```

---

## 🚀 4. Phản Hồi Headers Chuẩn (Rate Limit HTTP Headers)

Mỗi phản hồi API của DIGVOS (ngay cả khi thành công) đều chứa thông tin rate limit ở HTTP Headers để client Next.js có thể đọc và chủ động hiển thị giao diện vô hiệu hóa nút bấm trước khi bị chặn thật:
- `X-RateLimit-Limit`: Tổng số request tối đa được phép trong chu kỳ.
- `X-RateLimit-Remaining`: Số lượng request còn lại khả dụng.
- `X-RateLimit-Reset`: Thời gian timestamp (Epoch seconds) khi giới hạn được làm mới lại.
