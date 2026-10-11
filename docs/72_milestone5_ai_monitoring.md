# 72. AI Monitoring & Analytics (Milestone 5)

Tài liệu này đặc tả kiến trúc cho phân hệ **AI Monitoring**, đảm nhận việc theo dõi sát sao, log lại hành vi gọi LLM (Large Language Model) của toàn bộ hệ thống, tính toán Quota và tạo ra Audit Log minh bạch cho cấp Enterprise.

---

## 📊 1. Ghi Nhận Giao Dịch AI (AI Transaction Logging)

Mọi lệnh gọi API đến các dịch vụ LLM (Gemini, OpenAI, Claude) đều sinh ra một bản ghi trong bảng `AITransactionLog`. 
Đây là nền tảng cốt lõi cho việc thanh toán (Billing) trong mô hình B2B SaaS.

- **Đối chiếu độc lập (Reconciliation)**:
  - Bảng log lưu trữ trường `providerResponseId` để đối chiếu chéo (cross-check) trực tiếp với Dashboard của OpenAI hoặc Google Cloud, bảo vệ hệ thống khỏi sai sót tính toán Token.
- **Chi tiết phân mảnh**:
  - Ghi nhận rành mạch số Token đầu vào (`promptTokens`), đầu ra (`completionTokens`), và chi phí ước tính ra USD (`cost`).
  - Ghi nhận `endpoint` (VD: `/grade`, `/chat`) để phân tích xem tính năng nào đang "ngốn" tiền nhiều nhất.

---

## ⚖️ 2. Quản Lý Hạn Mức (Tenant Quota & Rate Limiting)

Hệ thống B2B cho phép các trường Đại học (Tenant) mua gói AI theo lưu lượng.

- **AITenantQuota**:
  - Bảng này theo dõi lượng Token và chi phí (Cost) mà mỗi Tenant tiêu thụ trong ngày và trong tháng.
  - Khi một Tenant vượt quá `limitCost`, API Gateway tự động từ chối các yêu cầu mới, ném ra lỗi `429 Too Many Requests` (Quota Exceeded) và gửi cảnh báo đến Tenant Admin.
- **Thanh lọc định kỳ (Scheduler Cleanup)**:
  - Mỗi nửa đêm, Scheduler sẽ khởi chạy các luồng Job để reset lại `dailyTokens` về 0. Mỗi cuối tháng reset lại `monthlyTokens` và `monthlyCost`.

---

## 🛡️ 3. Audit Log (Theo Dõi Hành Vi Bằng Event-Driven)

Audit Log không can thiệp trực tiếp vào Business Logic. Hệ thống tuân theo chuẩn Event-Driven để đảm bảo Loose Coupling.

### Mô hình Pub/Sub:
1. Admin chỉnh sửa Prompt: Emit event `ai.prompt.edited`.
2. AI Job chấm điểm xong: Emit event `ai.job.completed`.
3. Tenant xài hết Quota: Emit event `ai.quota.exceeded`.

Module Monitoring đóng vai trò **Subscriber**, lắng nghe toàn bộ các Event có prefix `ai.*` hoặc `plugin.*` trên Event Bus, và ghi lưu vết bảo mật vào bảng `AIAuditLog` với thông tin về `userId`, `tenantId`, `ipAddress`, và `userAgent`. Điều này giúp hệ thống truy vết chính xác ai đã làm gì, vào lúc nào.
