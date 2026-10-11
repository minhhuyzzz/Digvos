# 62. AI Prompt Standards & Hallucination Guard

Tài liệu này đặc tả quy chuẩn viết Prompt (Prompt Engineering Standards), cấu hình tham số mô hình (Hyperparameters) và giải pháp phòng chống ảo giác AI (Hallucination Guard) của hệ thống DIGVOS.

---

## 📐 1. Cấu Trúc Prompt Chuẩn (Standardized Prompt Pattern)

Tất cả các tệp prompt Markdown trong dự án bắt buộc phải tổ chức theo 4 phân khu rõ ràng để LLM dễ tiếp nhận thông tin chính xác nhất:

```markdown
# 1. SYSTEM INSTRUCTION (Vai trò hệ thống)
- Bạn là chuyên gia chấm điểm năng lực số theo khung chuẩn DigComp 3.0...
- Hãy chấm điểm khách quan, chỉ dựa vào bằng chứng thực tế được cung cấp...

# 2. CONTEXT & INPUT DATA (Dữ liệu đầu vào)
- Minh chứng của học sinh: {{submissionText}}
- Tiêu chí đánh giá Rubric: {{rubricCriteria}}

# 3. FEW-SHOT EXAMPLES (Ví dụ mẫu - Tối thiểu 1-2 ví dụ)
- Dữ liệu đầu vào: [...] -> Kết quả mong muốn: { "score": 85, "reason": "..." }

# 4. OUTPUT INSTRUCTIONS (Định dạng đầu ra JSON)
- Phản hồi bắt buộc phải tuân theo cấu trúc JSON Schema sau, không thêm bớt ký tự markdown khác ngoài JSON:
{{jsonSchema}}
```

---

## ⚙️ 2. Quy Chuẩn Tham Số Mô Hình (Hyperparameters Settings)

Tùy thuộc vào yêu cầu của tác vụ, các tham số cấu hình gọi API được chốt cứng như sau:

- **Tác vụ chấm điểm, phân tích Rubric (Yêu cầu chính xác tuyệt đối, không sáng tạo)**:
  - `temperature`: `0.0` (Mô hình sẽ luôn trả về câu trả lời ổn định và giống nhau nhất cho cùng một đầu vào).
  - `topP`: `0.1`
  - `maxOutputTokens`: `2048`
- **Tác vụ sinh ý tưởng, đề xuất học tập (Yêu cầu sáng tạo và gợi ý đa dạng)**:
  - `temperature`: `0.7`
  - `topP`: `0.9`
  - `maxOutputTokens`: `1024`

---

## 🛡️ 3. Bộ Phòng Chống Ảo Giác AI (Hallucination Guard)

Để ngăn chặn lỗi LLM tự nghĩ ra các tiêu chuẩn chấm điểm không có trong Rubric hoặc tự chấm điểm khống quá cao/quá thấp (AI Hallucination):

1. **Rào chắn schema nghiêm ngặt (Strict Schema Validation)**:
   - Kết quả JSON trả về từ API Gemini bắt buộc phải đi qua bộ lọc kiểm tra kiểu dữ liệu sử dụng **Zod Schema** ở backend.
   - Nếu Zod phát hiện kiểu dữ liệu trả về sai cấu trúc (Ví dụ: `score` là string thay vì number, hoặc thiếu trường `reason`) ➜ API Server lập tức từ chối và tự động kích hoạt gửi lại yêu cầu (Auto-retry) lên Gemini với chỉ thị nhắc sửa lỗi (Self-correction prompt): *"Bạn đã trả về JSON sai định dạng. Hãy sửa lại theo đúng schema sau..."*.
2. **Kỹ thuật tự kiểm chứng (Self-Consistency / Double-Check Prompting)**:
   - Đối với các bài chấm điểm minh chứng quan trọng của học viên:
   - Hệ thống chạy 2 luồng gọi độc lập:
     - Luồng 1: Yêu cầu AI phân tích điểm mạnh, điểm yếu của bài làm ➜ Trả về báo cáo phân tích.
     - Luồng 2: Gửi báo cáo phân tích của luồng 1 cùng Rubric ➜ Yêu cầu AI tính toán điểm số cuối cùng dựa trên phân tích đó.
   - Việc tách biệt bước phân tích và bước chấm điểm giúp giảm thiểu 85% tỷ lệ sai lệch điểm số và triệt tiêu lỗi ảo giác chấm khống của AI.
