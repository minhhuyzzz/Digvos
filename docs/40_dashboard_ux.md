# 40. Advanced Dashboard UX & Command Palette Design

Tài liệu này đặc tả các tính năng tương tác nâng cao (Advanced UX) của hệ thống DIGVOS Dashboard, tạo cảm giác chuyên nghiệp, mượt mà và thông minh như các nền tảng SaaS hàng đầu.

---

## ⌨️ 1. Trình Điều Khiển Phím Tắt (Command Palette - `Ctrl + K`)

Command Palette là trung tâm điều khiển bằng phím tắt toàn năng của hệ thống, giúp người dùng chuyển hướng và thực hiện tác vụ cực nhanh không cần dùng chuột:

- **Cách kích hoạt**: Nhấn phím `Ctrl + K` hoặc `Cmd + K` trên bàn phím ➜ Hiển thị popup kính mờ phủ giữa màn hình kèm ô tìm kiếm và danh sách phím tắt gợi ý.
- **Các nhóm lệnh thông dụng (Command Groups)**:
  - **Chuyển hướng nhanh (Navigation)**:
    - `/go student`: Tới Dashboard học viên.
    - `/go teacher`: Tới Dashboard giảng viên.
    - `/go profile`: Vào trang cài đặt cá nhân.
  - **Hành động nhanh (Quick Actions)**:
    - `/test start`: Bắt đầu một bài CAT test mới.
    - `/evidence submit`: Mở nhanh form nộp minh chứng.
    - `/verify [txHash]`: Xác thực chứng chỉ SBT trên blockchain Polygon.
    - `/grade queue`: Tới hàng đợi chấm bài.
    - `/tenant add`: Tạo mới Tenant/Trường học.
  - **Lệnh được ghim & Lệnh gần đây (Pinned & Recent Commands)**:
    - Hiển thị 3 lệnh sử dụng gần nhất ở đầu bảng để người dùng không cần gõ lại.
    - Cho phép ghim (pin) các lệnh yêu thích cố định lên đầu (ví dụ: ghim lệnh `/go student` và `/test start`).
  - **Lệnh AI thông minh (AI Command Bar)**:
    - Khi gõ phím `>` hoặc `/ai`, ô tìm kiếm sẽ chuyển sang giao diện hỏi đáp AI.
    - *Ví dụ*: `> Tìm các học viên yếu kỹ năng 1.1` ➜ Tự động trả về danh sách học sinh kèm đường link tới trang phân tích.
    - *Ví dụ*: `> Tạo rubric chấm bài Python` ➜ Chuyển hướng tới trang Rubric Builder và điền sẵn prompt cho AI.

---

## 🔍 2. Bộ Tìm Kiếm Toàn Cục (Global Federated Search)

Tích hợp ô tìm kiếm thông minh trên Topbar tự động gom dữ liệu từ nhiều nguồn (Federated Search):
- **Đối với học viên**: Tìm kiếm đồng thời các bài thi, các năng lực DigComp, các minh chứng đã nộp, và các bài viết trên Blog.
- **Đối với doanh nghiệp/giảng viên**: Tìm nhanh tên học sinh, lớp học, hoặc mã băm ví của ứng viên cần kiểm tra.
- **UX Thẩm mỹ**: Danh sách kết quả tìm kiếm phân nhóm rõ ràng (ví dụ: `Học sinh`, `Năng lực`, `Minh chứng`) kèm ảnh đại diện nhỏ và phím tắt `Enter` để chọn nhanh.

---

## 🔔 3. Trung Tâm Thông Báo (Realtime Notification Center)

Thanh trượt thông báo (Notification Drawer) xuất hiện bên phải màn hình khi nhấp vào icon chuông trên Topbar:
- **Phân loại thông báo (Notification Types)**:
  - `SUCCESS` (Xanh lục): Minh chứng được giảng viên phê duyệt điểm cao, hoặc kỹ năng được thăng cấp.
  - `INFO` (Xanh dương): Có bài thi CAT mới được phân công từ lớp học.
  - `WARNING` (Vàng): Bài nộp minh chứng bị giảng viên trả về yêu cầu sửa lại do chất lượng thấp.
  - `CRITICAL` (Đỏ): Thông báo hệ thống bảo trì hoặc ví blockchain lỗi kết nối.
- **Tương tác**: Có nút "Đánh dấu đã đọc tất cả" và liên kết nhấp chuột chuyển thẳng tới chi tiết đối tượng liên quan (Ví dụ: Nhấp vào thông báo chấm bài xong sẽ chuyển thẳng tới trang phản hồi của minh chứng đó).

---

## 🚀 4. Trải Nghiệm Khởi Đăng Nhập (Onboarding Tour)

Đối với người dùng mới đăng nhập hệ thống lần đầu tiên:
- Kích hoạt hướng dẫn tương tác từng bước (Interactive Walkthrough Tour) sử dụng thư viện gọn nhẹ (ví dụ `Driver.js` hoặc tương đương).
- Các bước giới thiệu:
  1. Giới thiệu Radar năng lực số DigComp (Nơi xem điểm mạnh/yếu).
  2. Cách thực hiện bài thi thích ứng CAT đầu tiên để định vị năng lực.
  3. Cách nộp minh chứng thực hành lên hệ thống.
  4. Vị trí chuyển đổi nhanh giữa các vai trò (Role Switcher).
