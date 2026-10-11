# 58. Design Tokens Specification

Tài liệu này đặc tả và đóng băng hệ thống các đơn vị thiết kế cơ sở (Design Tokens) của DIGVOS, đồng bộ hóa giữa thiết kế UI Figma và tệp cấu hình `tailwind.config.js` hoặc biến CSS toàn cục (`variables.css`).

---

## 📐 1. Quy Chuẩn Khoảng Cách (Spacing Tokens - 4px Grid Scale)

DIGVOS áp dụng hệ thống khoảng cách lũy thừa cơ số 4 để đảm bảo sự cân đối hoàn hảo trong thiết kế layout:

- `space-1`: `4px` (`0.25rem`) - Dành cho các khoảng cách cực nhỏ (Padding icon trong button).
- `space-2`: `8px` (`0.5rem`) - Padding nhỏ (Khoảng cách giữa label và input).
- `space-3`: `12px` (`0.75rem`) - Gap nhỏ (Khoảng cách giữa các phần tử nhỏ trong hàng).
- `space-4`: `16px` (`1rem`) - Khoảng cách chuẩn (Padding trong card, gap giữa các trường form).
- `space-6`: `24px` (`1.5rem`) - Khoảng cách lớn (Padding của Dashboard card lớn).
- `space-8`: `32px` (`2rem`) - Gap lớn (Khoảng cách giữa các Widget trên màn hình chính).

---

## 💎 2. Bo Góc & Đổ Bóng (Radii & Elevation)

### A. Bo góc (Border Radii Tokens)
- `radius-sm`: `6px` - Dành cho badge, select options nhỏ.
- `radius-md`: `12px` - Dành cho nút bấm (Buttons), ô nhập liệu (Inputs).
- `radius-lg`: `16px` - Dành cho các khối thẻ chính (Dashboard Cards).
- `radius-xl`: `24px` - Dành cho các cửa sổ nổi lớn (Modals, Dialogs).
- `radius-full`: `9999px` - Bo tròn hoàn toàn (Avatar, Pill badges).

### B. Đổ bóng & Phát sáng (Elevation & Glow Tokens)
- `shadow-glass-sm`: `0 2px 10px rgba(0, 0, 0, 0.1)` - Shadow nhẹ của tooltip.
- `shadow-glass-md`: `0 8px 32px rgba(0, 0, 0, 0.15)` - Shadow của Glass Card.
- `shadow-glow-emerald`: `0 0 20px rgba(16, 185, 129, 0.15)` - Phát sáng viền màu xanh lục (Khi đạt năng lực).
- `shadow-glow-cyan`: `0 0 20px rgba(6, 182, 212, 0.15)` - Phát sáng viền màu xanh lam (Khi có tương tác).

---

## ⚡ 3. Thang Đo Z-Index (Z-Index Scale Layering)

Để phòng tránh lỗi các thành phần giao diện đè chồng lộn xộn lên nhau (Ví dụ: Menu dropdown bị che bởi biểu đồ radar, toast bị lấp bởi modal):

- `z-base`: `0` - Nền chính.
- `z-card`: `10` - Các widget lơ lửng.
- `z-dropdown`: `100` - Popover, select dropdown.
- `z-sticky`: `200` - Header topbar ghim cố định.
- `z-drawer`: `300` - Sidebar, notification drawer bên hông.
- `z-modal`: `1000` - Hộp thoại modal thi CAT, xác minh SBT.
- `z-toast`: `2000` - Toasts thông báo góc màn hình (Luôn ở lớp cao nhất).

---

## 🕒 4. Hoạt Ảnh & Thời Gian (Animation Tokens)

- **Thời gian chuyển động (Durations)**:
  - `duration-fast`: `150ms` (Dành cho hiệu ứng click, hover nút bấm).
  - `duration-normal`: `300ms` (Dành cho hiệu ứng mở modal, trượt drawer).
  - `duration-slow`: `500ms` (Dành cho hiệu ứng tải trang, radar rotation).
- **Timing Functions (Độ mượt)**:
  - `ease-standard`: `cubic-bezier(0.4, 0, 0.2, 1)` - Mượt mà tiêu chuẩn cho UI.
  - `ease-decelerate`: `cubic-bezier(0, 0, 0.2, 1)` - Nhanh dần khi mở cửa sổ.
  - `ease-accelerate`: `cubic-bezier(0.4, 0, 1, 1)` - Chậm dần khi đóng cửa sổ.
