# ADR-006: Sử Dụng Zustand Làm Trình Quản Lý Trạng Thái UI Toàn Cục Phía Client

- **Trạng thái**: APPROVED
- **Người quyết định**: Software Architect / Tech Lead
- **Ngày**: 2026-07-11

---

## 📋 1. Bối cảnh (Context)
Ứng dụng giao diện DIGVOS có nhiều trạng thái tương tác cần chia sẻ giữa các components nằm ở các nhánh cây DOM xa nhau (Ví dụ: Nút bấm trên Topbar cần đóng/mở Sidebar; Phím tắt `Ctrl + K` bất kỳ đâu cần bật mở Command Palette; Role Switcher thay đổi vai trò cần đồng bộ toàn bộ menu điều hướng).
Nếu truyền props thủ công (Prop Drilling) sẽ gây nát cấu trúc code. Nếu dùng Context API của React sẽ dẫn tới hiện tượng re-render toàn bộ cây component con khi một giá trị nhỏ thay đổi, gây giật lag giao diện (INP tăng cao).

---

## 🚀 2. Quyết định (Decision)
Quyết định sử dụng **Zustand** làm thư viện quản lý trạng thái UI toàn cục (Global UI State) chính thức:
- Cấu hình các Store cực nhỏ, độc lập (Ví dụ: `useSidebarStore`, `useCommandPaletteStore`).
- Sử dụng selectors để chỉ lắng nghe và render lại đúng component cần dùng biến đó, tối ưu hóa tối đa hiệu năng render của React.

---

## ⚖️ 3. Các Phương Án Đã Cân Nhắc (Alternatives Considered)

### Phương án A: React Context API
- *Ưu điểm*: Được tích hợp sẵn trong React, không cần cài đặt thêm thư viện ngoài.
- *Nhược điểm*: Khi một giá trị trong Context Provider thay đổi ➜ Tất cả các component con đang tiêu thụ Context đó bắt buộc phải re-render lại, bất kể chúng có dùng biến thay đổi đó hay không. Khó tách biệt logic store và component.

### Phương án B: Redux / Redux Toolkit
- *Ưu điểm*: Cực kỳ chuẩn hóa, có hệ thống Devtools theo dõi lịch sử state mạnh mẽ nhất.
- *Nhược điểm*: Quá nặng nề (Over-engineering). Đòi hỏi khai báo Actions, Reducers, Dispatches, và Store wrapper rất phức tạp chỉ để lưu trữ một vài trạng thái bật/tắt giao diện đơn giản.

---

## 📈 4. Hệ quả (Consequences)
- **Tích cực**:
  - Mã nguồn khai báo store siêu ngắn (Chỉ khoảng 10-15 dòng code cho mỗi store).
  - Không cần bọc ứng dụng trong các thẻ Provider phức tạp ở file `layout.tsx`.
  - Hiệu năng cực cao nhờ cơ chế fine-grained subscription của Zustand.
- **Thử thách**:
  - **Quy tắc kỷ luật**: Lập trình viên bắt buộc phải phân định ranh giới: Zustand chỉ dùng để lưu trạng thái UI thuần túy (Sidebar toggle, theme, active workspace). Dữ liệu nghiệp vụ lấy từ API (Radar, Student list) tuyệt đối không được lưu vào Zustand mà phải để cho TanStack Query quản lý cache, tránh lỗi bất đồng bộ dữ liệu (State desynchronization).
