# 32. Student Workspace Design

Tài liệu này đặc tả giao diện làm việc cá nhân hóa của **Học viên (Student Workspace)**, tập trung trực quan hóa năng lực số theo khung DigComp 3.0 và hỗ trợ học tập thích ứng.

---

## 🖥️ 1. Cấu Trúc Trang Tổng Quan (Overview Board)

Giao diện học viên được tổ chức thành 3 khu vực chính:
1. **Header**: Chào mừng kèm thông số tổng quát (Mức năng lực trung bình, số tín chỉ đã học, số chứng chỉ SBT đã nhận).
2. **Khu vực trung tâm (Grid 2 Cột)**:
   - **Cột Trái (2/3 độ rộng)**:
     - **Radar Chart**: Trực quan hóa 5 vùng năng lực DigComp 3.0 (Tìm kiếm thông tin, Giao tiếp, Sáng tạo nội dung, An toàn bảo mật, Giải quyết vấn đề).
     - **Skill Gap Alert**: Hiển thị danh sách kỹ năng đang bị hụt so với yêu cầu của ngành/vị trí học viên đang hướng tới.
   - **Cột Phải (1/3 độ rộng)**:
     - **Tiến trình hiện tại (Daily Tasks)**: Các bài test CAT đang làm dở, hoặc các minh chứng giảng viên yêu cầu sửa đổi.
3. **Khu vực dưới**:
   - **Hồ sơ e-Portfolio**: Lịch sử nộp minh chứng, trạng thái duyệt (Đang chờ duyệt, Đã duyệt, Bị từ chối).

---

## 📊 2. Trực Quan Hóa Phổ Radar (Radar Chart Specs)

- **Thư viện đề xuất**: `Recharts` hoặc `Chart.js` (Bản gọn không ảnh hưởng bundle size).
- **Màu sắc**:
  - **Mức năng lực hiện tại**: Fill màu xanh ngọc `#10b981` với độ mờ `opacity-20`, viền xanh sáng `#34d399` dày `2px`.
  - **Mức chuẩn ngành (Target level)**: Viền nét đứt màu xám bạc `stroke-slate-500` để so sánh trực tiếp khoảng trống kỹ năng.
- **Tương tác**: Hover vào đỉnh radar sẽ hiển thị tooltip mô tả mức kỹ năng hiện tại (Ví dụ: "Level 4: Intermediate - Tự thực hiện tìm kiếm dữ liệu lớn phức tạp").

---

## 📝 3. Tiến Trình Thi Thích Ứng CAT (Adaptive Testing Flow UI)

- **Trải nghiệm phòng thi**:
  - Không hiển thị thanh tiến trình cố định (vì số câu hỏi thay đổi linh hoạt theo thuật toán thích ứng IRT).
  - Thay vào đó hiển thị chỉ số: **Độ tin cậy ước lượng (Estimated Proficiency Precision)** từ `0%` đến `100%`. Khi độ tin cậy đạt `>= 95%`, bài thi tự động đóng.
- **Component câu hỏi**:
  - Hỗ trợ Markdown rendering cho nội dung câu hỏi kỹ thuật.
  - Các nút chọn đáp án (A, B, C, D) dạng Glass Card lớn. Nhấp chọn có hiệu ứng glow sáng xung quanh viền.

---

## 📁 4. Quản Lý Portfolio Minh Chứng (Evidence Submission UI)

- **Trình tải file kéo thả (Drag-and-Drop Uploader)**:
  - Tích hợp hiệu ứng dash border xoay khi hover file qua.
  - Hỗ trợ tải trực tiếp các tệp PDF, Image, Video, và liên kết link GitHub/Figma.
- **Trình duyệt minh chứng**:
  - Bảng danh sách các minh chứng đã nộp hiển thị rõ ràng: Tên tệp, năng lực liên kết, điểm số giáo viên chấm, phản hồi (Feedback) của giáo viên, và ngày cập nhật.

---

## 🏆 5. Dòng Thời Gian Hoạt Động & Thành Tựu (Timeline & Achievements)

- **Dòng thời gian hoạt động (Recent Activity Timeline)**:
  - Hiển thị danh sách các hoạt động học tập gần đây sắp xếp theo thứ tự thời gian giảm dần:
    - *Ví dụ*: "Hôm qua: Minh chứng cho năng lực 1.2 đã được Giảng viên phê duyệt đạt 85 điểm."
    - *Ví dụ*: "2 ngày trước: Hoàn thành bài CAT Test năng lực 2.1 đạt mức Level 4 (Intermediate)."
    - *Ví dụ*: "AI Coach gợi ý: Hãy cải thiện kỹ năng 3.1 bằng cách tham gia khóa học thiết kế đồ họa cơ bản."
- **Hệ thống huy hiệu thành tựu (Achievements / Badges)**:
  - Hiển thị các Badge đạt được dưới dạng thẻ tròn 3D lấp lánh (Gold, Silver, Bronze) tương ứng với các cột mốc:
    - *Huy hiệu "Nhà Thám Hiểm Số"*: Đạt Level 3 ở tất cả năng lực thuộc Area 1.
    - *Huy hiệu "Người Bảo Vệ"*: Đạt Level 5 ở năng lực 4.1 (An toàn thiết bị).
    - *Huy hiệu "SBT Pioneer"*: Đúc thành công chứng chỉ SBT đầu tiên lên Polygon Blockchain.

---

## 🛠️ 6. Thư Mục Tổ Chức Component

```
apps/web/src/features/competency/
├── components/
│   ├── RadarChart.tsx          # Render biểu đồ Recharts radar
│   ├── SkillGapList.tsx        # Danh sách khoảng trống kỹ năng
│   └── CompetencyMatrix.tsx    # Bảng chi tiết 21 năng lực DigComp
apps/web/src/features/assessment/
├── components/
│   ├── CATInterface.tsx        # Giao diện thi thích ứng
│   └── AssessmentHistory.tsx   # Lịch sử các bài thi
```
