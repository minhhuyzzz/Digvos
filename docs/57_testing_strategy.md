# 57. Multi-Tier Testing Strategy Specification

Tài liệu này đặc tả chiến lược kiểm thử phần mềm đa lớp (Multi-Tier Testing Strategy) của DIGVOS, đảm bảo mã nguồn luôn hoạt động chính xác, ổn định và không phát sinh lỗi cũ khi nâng cấp (Regression Testing).

---

## 🏛️ 1. Các Cấp Độ Kiểm Thử (Testing Pyramid)

DIGVOS phân bổ nỗ lực kiểm thử theo cấu trúc hình tháp chuẩn, ưu tiên các bài test nhanh, rẻ ở dưới chân và kiểm thử giao diện E2E ở trên đỉnh:

```
      /\
     /  \       [1. E2E Tests] ➜ Playwright (Kiểm thử 5 luồng nghiệp vụ chính)
    /    \      [2. Integration] ➜ NestJS + Prisma DB (Kiểm thử Event Bus, API)
   /      \     [3. Component] ➜ Vitest + RTL (Kiểm thử logic tương tác UI)
  /________\    [4. Unit Tests] ➜ Jest / Vitest (Kiểm thử thuật toán Bayes, IRT, Math)
```

---

## 📋 2. Đặc Tả Chi Tiết Các Lớp Test

### A. Kiểm Thử Đơn Vị (Unit Testing - Chạy nhanh nhất < 10ms/test)
- **Công cụ**: **Jest** cho Backend NestJS, **Vitest** cho Frontend Next.js.
- **Phạm vi bắt buộc**:
  - Các hàm tính toán toán học thuần túy.
  - Thuật toán thích ứng CAT tính Theta và sai số SEM.
  - Thuật toán đối khớp kỹ năng Radar của Doanh nghiệp.
- **Tiêu chuẩn**: Đạt tối thiểu **80% Code Coverage** cho thư mục `services/` (lớp Domain Service).

### B. Kiểm Thử Component (Component Testing)
- **Công cụ**: **React Testing Library (RTL)** kết nối **Storybook**.
- **Mục tiêu**: Xác minh một component giao diện (Ví dụ: `LevelBadge`, `Button`) render chính xác theo các trạng thái props khác nhau (Loading, Disabled, Error) và phản hồi đúng sự kiện nhấp chuột (onClick callback).

### C. Kiểm Thử Tích Hợp (Integration Testing)
- **Công cụ**: NestJS `Test.createTestingModule` kết hợp cơ sở dữ liệu Postgres test biệt lập.
- **Phạm vi bắt buộc**:
  - Xác minh luồng chạy của Event Bus cục bộ: Phát sự kiện `AssessmentCompleted` ➜ Kiểm chứng dữ liệu level năng lực của học sinh trong database được cập nhật tương ứng.
  - Kiểm thử cơ chế Retry của Scheduler Outbox: Đóng database tạm thời ➜ Phát sự kiện ➜ Mở lại database ➜ Xác minh Scheduler quét và gửi lại sự kiện thành công.

### D. Kiểm Thử Toàn Diện (End-to-End Testing - E2E)
- **Công cụ**: **Playwright**.
- **Mục tiêu**: Giả lập trình duyệt thực tế, nhấp chuột chạy thông suốt 3 luồng tác nghiệp lõi:
  1. *Luồng CAT*: Đăng nhập ➜ Bắt đầu thi CAT ➜ Trả lời 5 câu hỏi ➜ Bài thi đóng ➜ Kiểm tra radar cập nhật.
  2. *Luồng Evidence*: Đăng nhập sinh viên ➜ Upload file ➜ Nộp minh chứng ➜ Đăng nhập giáo viên ➜ Mở Review Queue ➜ Phê duyệt bài nộp ➜ Đăng nhập lại sinh viên xác nhận level thăng cấp.
  3. *Luồng Verify*: Doanh nghiệp nhập hash ví Polygon ➜ Đọc blockchain ➜ Hiển thị chứng chỉ tích xanh hợp lệ.

---

## 🤝 3. Kiểm Thử Hợp Đồng API (Contract Testing)

- Để đảm bảo Backend đổi API mà không làm sập Frontend (API mismatch):
- DIGVOS sử dụng thư mục trung gian **`packages/api-contract`** chứa toàn bộ các TypeScript interfaces của DTOs và Response Envelopes.
- Cả `apps/api` (Backend) và `apps/web` (Frontend) đều bắt buộc phải kế thừa interfaces này. Nếu backend đổi tên một trường trong DTO ➜ Trình biên dịch TypeScript compiler sẽ lập tức báo lỗi đỏ ở phía Frontend trong quá trình build, chặn đứng hoàn toàn lỗi mismatch API trước khi deploy.
