# 61. AI Integration & Assistant Architecture

Tài liệu này đặc tả kiến trúc tích hợp Trí tuệ nhân tạo (AI Engine Layout) của DIGVOS, tập trung vào mô hình hóa lớp quản lý Prompt, kiểm soát chi phí (Cost Control), cơ chế tự động chuyển đổi mô hình dự phòng (Model Fallbacks) và lọc nội dung an toàn (Safety Filters).

---

## 🏛️ 1. Lớp Dịch Vụ AI Tập Trung (Dedicated AI Layer)

Để tránh việc các hàm gọi API Gemini nằm rải rác khắp codebase gây khó khăn khi nâng cấp mô hình, DIGVOS xây dựng một module AI tập trung duy nhất:

```
[EvidenceService] ➜ 1. Gửi văn bản minh chứng ➜ [AIService (NestJS)]
                                                         │
                                                         ▼ (2. Kết hợp Prompt Template)
                                                   [PromptManager]
                                                         │
                                                         ▼ (3. Gọi API mã hóa)
                                                   [Gemini API Client]
```

- **Mục tiêu**: Toàn bộ logic giao tiếp với LLMs phải được đóng gói gọn trong `apps/api/src/modules/ai/services/ai.service.ts`.

---

## 📝 2. Tách Biệt Prompt Và Quản Lý Phiên Bản (Prompt Isolation)

- **Cấm viết Prompt trực tiếp trong code**:
  - Không được phép khai báo các chuỗi string prompt dài ngoằng (như *"Hãy đánh giá bài viết này..."*) bên trong file logic service chính.
- **Tổ chức thư mục Prompt**:
  - Tất cả các Prompt được tổ chức thành các tệp tin template Markdown tĩnh nằm trong thư mục `src/modules/ai/prompts/` (Ví dụ: `rubric-generation.prompt.md`, `evidence-grading.prompt.md`).
  - Lập trình viên sử dụng bộ đọc template tự động để nạp prompt và điền các tham số động:
```typescript
const promptTemplate = this.promptManager.load('evidence-grading');
const finalPrompt = promptTemplate.compile({
  submissionText: submission.text,
  rubricCriteria: rubric.criteria,
});
```

---

## 🔄 3. Chiến Lược Mô Hình Dự Phòng & Chuyển Đổi (Model Fallbacks)

Để đảm bảo hệ thống chấm bài bằng AI hoạt động liên tục ngay cả khi dịch vụ Google Gemini gặp sự cố toàn cầu hoặc cạn kiệt hạn mức quota:

- **Lựa chọn mô hình theo cấp độ (Tiered Models)**:
  - **Tier 1 (Mặc định)**: `gemini-1.5-pro` (Dành cho chấm minh chứng tự luận dài, yêu cầu hiểu văn bản phức tạp và sinh cấu trúc JSON chính xác).
  - **Tier 2 (Tốc độ & Tiết kiệm)**: `gemini-1.5-flash` (Dành cho việc kiểm tra ngữ pháp nhanh hoặc trả lời hội thoại ngắn ở chatbot).
  - **Tier 3 (Dự phòng thảm họa - Failover Backup)**: **Claude 3.5 Sonnet** (thông qua cổng API Anthropic).
- **Cơ chế tự động chuyển đổi (Failover Mechanism)**:
  - Nếu API Google trả về lỗi `503 Service Unavailable` hoặc `429 Rate Limit Exceeded`:
  - `AIService` tự động bắt lỗi (catch), ghi log warning `AI_PRIMARY_PROVIDER_FAILED`, và lập tức chuyển hướng gửi lại yêu cầu sang mô hình Tier 3 (Claude 3.5 Sonnet).

---

## 💰 4. Kiểm Soát Chi Phí & Bộ Lọc An Toàn (Cost & Safety Controls)

- **Đóng băng cấu trúc JSON (Strict JSON Mode)**:
  - Ép mô hình luôn trả về kết quả định dạng JSON bằng cách bật cấu hình `responseMimeType: "application/json"` của Gemini API và cung cấp JSON Schema. Việc này giúp triệt tiêu hoàn toàn lỗi AI sinh thừa ký tự chữ dẫn tới crash app và tiết kiệm 30% lượng token rác.
- **Lưu cache câu trả lời (Semantic Caching)**:
  - Nếu giảng viên nhấn nút "AI gợi ý" nhiều lần cho cùng một tệp bài nộp của sinh viên mà không có thay đổi nội dung ➜ Hệ thống trả về kết quả đã chấm lưu trong Redis Cache, không gửi request mới lên Gemini, tiết kiệm 100% chi phí.
- **Bộ lọc an toàn (Safety Filters)**:
  - Bật cấu hình chặn nội dung nhạy cảm ở mức tối đa của Gemini (`Hate Speech`, `Harassment`, `Sexually Explicit`, `Dangerous Content` set to `BLOCK_LOW_AND_ABOVE`).
  - Mọi yêu cầu chứa từ khóa độc hại từ người dùng sẽ bị chốt chặn từ chối xử lý ngay tại API Server, trả về mã lỗi `SECURITY_VIOLATION`.
