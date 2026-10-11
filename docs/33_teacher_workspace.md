# 33. Teacher Workspace Design

Tài liệu này đặc tả giao diện làm việc của **Giảng viên (Teacher Workspace)**, tối ưu hóa cho quy trình chấm duyệt hàng loạt, theo dõi tiến độ lớp học và thiết kế tiêu chí đánh giá (Rubrics) có AI hỗ trợ.

---

## 📋 1. Hàng Đợi Chấm Bài (Review Queue UI)

Thành phần cốt lõi của giảng viên là **Hàng đợi chấm duyệt (Review Queue)** nơi tổng hợp tất cả các minh chứng mới nộp từ sinh viên:
- **Bộ lọc thông minh (Smart Filters)**: Lọc nhanh theo Lớp học, Năng lực DigComp, và thời gian nộp bài.
- **Bố cục so sánh song song (Split Screen Layout)**:
  - **Cột Trái (60%)**: Trình xem trước file minh chứng (Document Viewer hỗ trợ PDF, Ảnh, Video trực tuyến mà không cần tải về máy).
  - **Cột Phải (40%)**: Bảng điều khiển chấm điểm:
    - Tiêu chí đánh giá (Rubric checklist).
    - Ô điểm số (0 - 100).
    - **Nút "AI Assist Feedbacks"**: Kích hoạt Gemini phân tích nội dung minh chứng và tạo ra bản nháp đánh giá gợi ý cho giáo viên sửa/chấp thuận.

---

## 📈 2. Theo Dõi Lớp Học (Classroom Insights Dashboard)

- **Biểu đồ phân bổ kỹ năng (Skill Distribution Heatmap)**:
  - Hiển thị lưới 2D so sánh danh sách học sinh với 21 năng lực DigComp.
  - Mỗi ô hiển thị màu sắc biểu trưng cho mức level (Nhạt ➜ Đậm tương ứng Level 1 ➜ Level 8). Giúp giảng viên phát hiện ngay lập tức phần lớn học sinh trong lớp đang yếu ở mảng năng lực nào để điều chỉnh giáo án.
- **Danh sách học sinh báo động (At-Risk Students)**:
  - Tự động liệt kê các học viên có tiến độ học tập chậm, thiếu minh chứng hoặc điểm thi CAT sụt giảm nghiêm trọng dưới trung bình.

---

## 📝 3. Trình Thiết Kế Tiêu Chí Đánh Giá (Rubric Builder)

- **Giao diện kéo thả bảng tiêu chí**:
  - Giáo viên định nghĩa các cột điểm tương ứng với các tiêu chuẩn cụ thể.
- **Tích hợp Generative AI**:
  - Giáo viên chỉ cần nhập mô tả ngắn: *"Hãy tạo Rubric đánh giá kỹ năng phòng chống lừa đảo giả mạo (Phishing) thuộc DigComp Area 4"*.
  - AI Engine sẽ tự động sinh cấu trúc bảng rubrics 4 cấp độ với các tiêu chuẩn rõ ràng trong vòng 5 giây. Giáo viên có quyền chỉnh sửa trực tiếp trên giao diện.

---

## ⚡ 4. Hành Động Hàng Loạt & Xuất Báo Cáo (Bulk Actions & Exports)

Để giảm thiểu tối đa thời gian quản lý cho giảng viên:
- **Duyệt/Từ chối hàng loạt (Bulk Approval/Rejection)**:
  - Cho phép tích chọn hộp kiểm (checkbox) ở nhiều dòng sinh viên trong Hàng đợi chấm bài.
  - Bảng hành động nổi lên ở chân trang (Sticky Action Bar) cung cấp các nút: "Duyệt hàng loạt (Điểm mặc định 80/100)", "Yêu cầu làm lại hàng loạt", hoặc "Gửi cho trợ giảng chấm".
- **Xuất báo cáo trực quan (Export CSV/Excel)**:
  - Hỗ trợ xuất dữ liệu điểm năng lực và minh chứng của cả lớp học ra tệp CSV để đồng bộ với các hệ thống quản lý đào tạo ngoài (LMS Moodle/Canvas).
- **Phân công trợ giảng (Assign Teaching Assistant - TA)**:
  - Nút phân phối nhanh 20-50 bài nộp ngẫu nhiên cho một tài khoản TA cụ thể để giảm tải áp lực chấm bài cho giảng viên chính.

---

## 🛠️ 5. Cấu Trúc Component Features

```
apps/web/src/features/grading/
├── components/
│   ├── SplitViewer.tsx        # Trình xem split file và chấm điểm
│   ├── AIAssistantPanel.tsx   # Panel AI gợi ý feedback chấm bài
│   └── RubricChecklist.tsx    # Checklist rubric động
apps/web/src/features/classroom/
├── components/
│   ├── HeatmapGrid.tsx        # Bản đồ nhiệt phân bổ kỹ năng lớp
│   └── StudentProgressRow.tsx # Dòng tiến độ chi tiết của học sinh
```
