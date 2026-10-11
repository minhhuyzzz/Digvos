# 34. Enterprise Workspace Design

Tài liệu này đặc tả giao diện làm việc của **Doanh nghiệp & Đối tác (Enterprise Workspace)**, tập trung vào đối khớp tài năng (Talent Matching), quản lý năng lực nội bộ doanh nghiệp (Internal Employee Skill Gaps) và xác thực chứng chỉ số (SBT Verification).

---

## 🔍 1. Đối Khớp Nhân Tài (AI-powered Talent Matching)

Giao diện hỗ trợ phòng nhân sự (HR) tìm kiếm ứng viên dựa trên phổ năng lực số thực tế thay vì CV chữ thông thường:
- **Trình tạo bộ lọc năng lực (Skill Profile Filter)**:
  - HR chọn các mốc tối thiểu của 5 vùng năng lực DigComp (Ví dụ: Tìm kiếm thông tin >= Level 5, An toàn bảo mật >= Level 4).
- **Danh sách ứng viên đối khớp (Matched Talents List)**:
  - Hiển thị tỷ lệ đối khớp phần trăm (`% Match Score`) tính toán bởi hệ thống.
  - Hiển thị nút "Xem Radar So Sánh" – mở cửa sổ Popup chồng biểu đồ radar ứng viên đè lên radar chuẩn của doanh nghiệp để thấy rõ mức độ đáp ứng công việc.

---

## 🏢 2. Bản Đồ Kỹ Năng Nhân Viên (Internal Skill Gap Analysis)

- **Danh sách Phòng ban & Nhân viên**:
  - Xem sơ đồ cấu trúc nhân sự kèm mức năng lực số trung bình của từng phòng ban.
- **Kế hoạch đào tạo nội bộ (Training Recommendations)**:
  - Tự động phát hiện khoảng trống kỹ năng của phòng ban (Ví dụ: Phòng Marketing bị yếu mảng Sáng tạo nội dung số - DigComp Area 3).
  - Đề xuất các khóa học thích ứng tự động từ Learning Engine để bổ khuyết lỗ hổng kỹ năng này.

---

## ⛓️ 3. Trình Xác Thực Chứng Chỉ On-chain (SBT Verification Gate)

- **Tra cứu mã băm / ID ví (On-chain Lookup)**:
  - Hộp nhập liệu nhanh mã số định danh Soulbound Token (SBT) hoặc địa chỉ ví Polygon của ứng viên.
- **Kết quả xác thực tức thì (Verified Result Card)**:
  - Kết nối trực tiếp RPC node blockchain Polygon (hoặc mô phỏng ở Dev mode) để hiển thị thông tin:
    - Trạng thái: **ĐÃ XÁC THỰC THÀNH CÔNG (VALID ON-CHAIN)** kèm dấu tích xanh lục phát sáng.
    - Chủ sở hữu chứng chỉ, tên năng lực, ngày đúc (mint date), block number, và mã băm giao dịch (transaction hash link sang Polygonscan).

---

## 💼 4. Phễu Tuyển Dụng & Lưu Ứng Viên (Recruitment Pipeline & Saved Candidates)

- **Ứng viên đã lưu (Saved Candidates Drawer)**:
  - Cho phép nhà tuyển dụng nhấp nút "Lưu ứng viên" từ danh sách đối khớp để đưa vào kho lưu trữ nội bộ riêng phục vụ các vị trí tuyển dụng tương lai.
- **Phễu tuyển dụng dạng Kanban (Recruitment Pipeline board)**:
  - Bảng kéo thả tương tự Trello/Jira chia ứng viên làm các cột:
    - *Ứng tuyển mới (Applied)*: Ứng viên có % đối khớp năng lực số cao.
    - *Đang liên hệ (Screening)*: HR đã gửi lời mời kiểm tra chi tiết.
    - *Phỏng vấn (Interviewing)*: Lịch phỏng vấn đã được thiết lập.
    - *Đã tuyển / Từ chối (Hired/Rejected)*.
  - Khi kéo thả card ứng viên qua từng cột, hệ thống tự động phát đi email thông báo trạng thái cập nhật hoặc lời mời phỏng vấn đến hòm thư của sinh viên.

---

## 🛠️ 5. Cấu Trúc Component Features

```
apps/web/src/features/talent/
├── components/
│   ├── FilterPanel.tsx        # Bảng thiết lập chuẩn năng lực tuyển dụng
│   ├── CandidateRadarRow.tsx  # Dòng so sánh radar ứng viên
│   └── MatchingScoreBadge.tsx # Huy hiệu hiển thị % đối khớp
apps/web/src/features/verification/
├── components/
│   ├── SBTLookupInput.tsx     # Ô nhập mã hash tra cứu SBT
│   └── VerificationStatus.tsx # Card hiển thị kết quả truy xuất blockchain
```
