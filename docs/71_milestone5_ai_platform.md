# 71. AI Platform Architecture (Milestone 5)

Tài liệu này đặc tả kiến trúc của phân hệ **AI Platform**, là module cốt lõi trong DIGVOS đảm nhiệm vai trò giao tiếp với các LLM (Large Language Models), quản lý Prompt, và điều phối các AI Jobs bất đồng bộ.

---

## 🏛️ 1. Kiến Trúc Cấp Thấp (Layered Architecture)

Hệ thống tuân thủ thiết kế phân lớp Clean Architecture và Provider Pattern:

```text
[HTTP Controllers / Event Listeners]
       │
       ▼
[Use Case Layer] ➜ (GradeSubmission, GenerateRubric, ChatAssistant...)
       │
       ▼
[AI Service Layer] ➜ Điều phối chung, Rate Limiting, tính toán Token Caching
       │
       ▼
[AI Provider Registry] ➜ Quyết định chọn Provider nào dựa trên Setting của Tenant/System
       │
       ▼ (Implement AIProvider Interface)
├── [GeminiProvider]
├── [OpenAIProvider]
└── [ClaudeProvider]
```

### 1.1 Lớp Use Case
Các logic nghiệp vụ (Ví dụ: Chấm điểm bài làm) được đóng gói trong các Use Case cụ thể. Controller không trực tiếp gọi `AIService` để tránh bloated service.

### 1.2 Provider Registry
Giao diện `AIProvider` định nghĩa các hàm chung:
```typescript
interface AIProvider {
  generate(prompt: string, options: AIProviderOptions): Promise<AIResponse>;
  chat(messages: ChatMessage[], options: AIProviderOptions): Promise<AIResponse>;
  embedding(text: string): Promise<number[]>;
}
```

---

## ⚙️ 2. AI Settings & Feature Flags

Thay vì hardcode, hệ thống quản lý cấu hình LLM thông qua Cơ sở dữ liệu, cho phép quản trị viên thay đổi Model/Temperature mà không cần khởi động lại Server.

- Bảng `AIProviderSetting`: Lưu cấu hình ưu tiên (Ví dụ: Tenant A dùng OpenAI GPT-4, Tenant B dùng Gemini 1.5 Pro).
- Bảng `TenantFeatureFlag`: Bật/tắt các tính năng (VD: `AI_GRADING`, `AI_CHAT`) cho từng Tenant riêng biệt.

---

## 📝 3. Prompt Engine (Quản Lý Prompt)

Prompt không lưu dưới dạng Text trong Source Code, mà được lưu trong bảng `PromptTemplate` trên Database với hệ thống Versioning rõ ràng.

- **Phiên bản (Versioning)**: Khi Admin chỉnh sửa Prompt, version cũ vẫn được giữ lại để đối chiếu Audit.
- **Biến động (Variables)**: `PromptVariable` quy định rõ những tham số nào được truyền vào (Ví dụ: `submissionText`, `rubricCriteria`).
- **Phân loại (Categories)**: `GRADING`, `SUMMARY`, `RECOMMENDATION`, `FEEDBACK`.

---

## 🕒 4. Xử Lý Bất Đồng Bộ (Queue & Scheduler)

AI Tasks thường có độ trễ lớn (Latency từ 5s - 60s). DIGVOS không thực thi đồng bộ để tránh Time-out request.

1. **AI Job Queue**:
   - Sử dụng **BullMQ + Redis**.
   - Input được hash (`inputHash`) để chống duplicate job. Nếu Teacher click chấm điểm 2 lần, hệ thống sẽ bỏ qua job thứ hai.
   - Các job lưu trong bảng `AIJob`.
2. **Scheduler**:
   - Tự động Retry các Job bị lỗi (Network Error, 429 Too Many Requests).
   - Tự động xóa các kết quả Cache quá hạn (TTL).

---

## 📡 5. Event-Driven Integration (Event Bus)

Mọi quá trình chạy xong đều không trả về Response HTTP thông thường, mà sẽ Emit ra một Event theo chuẩn Naming Convention:

- `ai.job.queued`
- `ai.job.completed`
- `ai.job.failed`

Các module khác (như Notification, Activity Feed) sẽ Subscribe (lắng nghe) vào Event này để thực hiện các nghiệp vụ tiếp theo (Gửi Email, Toast Notification).
