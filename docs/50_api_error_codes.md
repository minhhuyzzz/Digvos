# 50. Domain API Error Codes Specification

Tài liệu này đặc tả danh sách mã lỗi nghiệp vụ (Domain Error Codes) toàn cục của hệ thống DIGVOS. Client bắt buộc phải xử lý luồng giao diện dựa trên mã lỗi (`errorCode`) thay vì hiển thị trực tiếp chuỗi thông điệp chữ (`message`) của máy chủ.

---

## 🚦 1. Quy Chuẩn Cấu Trúc Lỗi (Error Payload Schema)

Mỗi khi API trả về mã trạng thái lỗi (HTTP Status Code >= 400), payload JSON bắt buộc phải tuân theo cấu trúc sau:

```json
{
  "success": false,
  "error": {
    "statusCode": 400,
    "errorCode": "ASSESSMENT_ALREADY_SUBMITTED",
    "message": "Bài thi đánh giá này đã được nộp trước đó và không thể sửa đổi.",
    "path": "/api/v1/assessment/submit",
    "details": {}
  },
  "meta": {
    "timestamp": "2026-07-11T13:40:00.000Z"
  }
}
```

---

## 📋 2. Danh Sách Mã Lỗi Nghiệp Vụ (Error Code Registry)

### A. Xác thực & Phân quyền (Auth & RBAC - `401/403`)
- `AUTH_INVALID_TOKEN`: Token không hợp lệ hoặc đã bị chỉnh sửa chữ ký.
- `AUTH_TOKEN_EXPIRED`: Access Token hết hạn, yêu cầu refresh token.
- `AUTH_REFRESH_TOKEN_EXPIRED`: Refresh Token hết hạn, bắt buộc đăng nhập lại.
- `AUTH_REFRESH_TOKEN_REVOKED`: Refresh Token đã bị thu hồi (nguy cơ bị hacker nhân bản token).
- `PERMISSION_DENIED`: Không đủ quyền truy cập (Ví dụ: Student gọi API duyệt minh chứng).
- `TENANT_DISABLED`: Tổ chức/Tenant của bạn đã bị khóa hoặc hết hạn thanh toán.

### B. Khung Năng Lực & Minh Chứng (Competency & Evidence - `400/404`)
- `COMPETENCY_NOT_FOUND`: Mã năng lực số DigComp không tồn tại trong hệ thống.
- `EVIDENCE_NOT_FOUND`: Không tìm thấy minh chứng yêu cầu.
- `EVIDENCE_ALREADY_VALIDATED`: Minh chứng này đã được giảng viên phê duyệt trước đó, không thể sửa đổi.
- `EVIDENCE_INVALID_STATUS`: Trạng thái minh chứng không hợp lệ để thực hiện thao tác này.
- `SUBMISSION_LIMIT_EXCEEDED`: Đạt giới hạn số lần nộp minh chứng cho một kỹ năng trong ngày.

### C. Bài Thi Đánh Giá (Assessment - `400/404`)
- `ASSESSMENT_NOT_FOUND`: Bài thi đánh giá không tồn tại.
- `ASSESSMENT_ALREADY_SUBMITTED`: Bài thi đánh giá này đã được hoàn thành và nộp.
- `ASSESSMENT_SESSION_EXPIRED`: Phiên làm bài thi thích ứng đã quá hạn thời gian.
- `QUESTION_NOT_FOUND`: Không tìm thấy câu hỏi tiếp theo phù hợp trong ngân hàng câu hỏi.

### D. File & Lưu Trữ (Storage - `400/413/422`)
- `FILE_TOO_LARGE`: Dung lượng file vượt quá giới hạn cho phép (Ví dụ: PDF > 10MB).
- `FILE_INVALID_TYPE`: Định dạng file không được hỗ trợ (MIME-type check fail).
- `FILE_SCAN_FAILED`: Phát hiện mã độc hoặc virus trong tệp tải lên (ClamAV quarantine).
- `PRESIGNED_URL_GENERATION_FAILED`: Lỗi tạo đường dẫn ký trước tải file.

### E. AI & Đúc SBT Blockchain (AI & Web3 - `400/500/503`)
- `AI_PROVIDER_LIMIT_EXCEEDED`: Quota API Gemini đã cạn kiệt trong tháng.
- `AI_GENERATION_FAILED`: Gemini gặp lỗi phân tích file hoặc sinh Rubrics.
- `BLOCKCHAIN_NODE_TIMEOUT`: Kết nối với RPC Node Polygon bị gián đoạn.
- `SBT_MINT_FAILED`: Giao dịch đúc Soulbound Token trên Polygon thất bại do thiếu phí gas.
- `SBT_ALREADY_MINTED`: Kỹ năng này đã được đúc thành công thành SBT trước đó.
