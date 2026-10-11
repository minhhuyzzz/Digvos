# 31. Dashboard System Layout & Shell Design

Tài liệu này đặc tả kiến trúc của **Dashboard Shell** – khung giao diện dùng chung (Global Layout) cho toàn bộ 4 Workspaces của hệ thống DIGVOS.

---

## 🏛️ 1. Cấu Trúc Tổng Quan (Grid Layout)

Dashboard Shell sử dụng mô hình CSS Grid và Flexbox kết hợp để tạo ra một bố cục 2 cột cố định đáp ứng (Responsive Grid):
- **Cột Trái (Sidebar)**: Cố định độ rộng `256px` (`w-64`). Khi thu nhỏ (Collapsed) chuyển về `80px` (`w-20`). Trên di động hiển thị dạng Drawer trượt qua lớp Backdrop.
- **Cột Phải (Content Area)**: Chiếm toàn bộ không gian còn lại (`flex-1`), chia thành 2 phần dọc:
  - **Topbar (Header)**: Cao `64px` (`h-16`), ghim cố định (`sticky top-0`), sử dụng hiệu ứng kính mờ (Glassmorphism backdrop-blur).
  - **Main Viewport (Content)**: Phần cuộn chính (`overflow-y-auto`), bọc trong `Container` có đệm lề (`p-6` hoặc `p-8`).

```
+--------------------------------------------------+
|          |  Topbar (Breadcrumbs, Search, Alert)  |
|          +---------------------------------------+
|  Sidebar |                                       |
|  (Menu)  |  Main Viewport (Content Area)         |
|          |                                       |
|          |                                       |
+----------+---------------------------------------+
```

---

## 🎨 2. Hiệu Ứng Glassmorphism (Premium Aesthetic)

Bản thiết kế áp dụng các Token thẩm mỹ cao cấp để tạo hiệu ứng chiều sâu (Z-index layering):
- **Background chính**: `#07111a` (Màu tối xanh thẳm không gian vũ trụ).
- **Lớp kính (Glass Overlay)**: `bg-slate-900/60 backdrop-blur-md`.
- **Viền sáng (Border Highlight)**: `border border-white/10` hoặc `border-slate-800`.
- **Đổ bóng (Shadow)**: `shadow-[0_8px_30px_rgb(0,0,0,0.12)]`.

---

## ⚙️ 3. Các Thành Phần Cốt Lõi (Core Widgets)

### A. Sidebar (Thanh Điều Hướng)
- **Brand Logo**: Logo "DIGVOS" kèm gradient từ `#ffffff` sang xanh ngọc `#10b981`.
- **Dev Role Switcher**: Danh sách thả xuống (`select` dropdown) chỉ hiện ở chế độ Development để test nhanh quyền hạn giữa `STUDENT`, `TEACHER`, `ENTERPRISE`, `ADMIN`.
- **Menu Links**: Liệt kê các link điều hướng lấy từ `config/menu.ts` kèm icon `lucide-react`. Khi hover áp dụng hiệu ứng dịch chuyển nhẹ sang phải (`hover:translate-x-1 duration-200`).
- **Footer Section**: Hiển thị ảnh đại diện (avatar) của tài khoản đang đăng nhập, tên hiển thị, và nút đăng xuất (logout).

### B. Topbar (Thanh Tiêu Đề Cố Định)
- **Breadcrumbs (Đường dẫn tiện ích)**: Tự động phân tích đường dẫn URL (`usePathname`) để hiển thị dạng `Home / Học viên / Đánh giá`.
- **Global Search & Command Palette trigger**: Nút tìm kiếm nhanh kích hoạt Command Palette bằng tổ hợp phím `Ctrl + K`.
- **Notification Bell**: Chuông báo động hiển thị badge đỏ bất đồng bộ (SSE/WebSocket) khi giảng viên chấm bài xong hoặc doanh nghiệp phê duyệt.
- **Tenant Brand Indicator**: Badge hiển thị logo/tên của Tenant hiện tại (ví dụ: "Đại học Bách Khoa") để tăng tính cá nhân hóa đa doanh nghiệp.

### C. Workspace Switcher (Đối với tài khoản đa vai trò)
- Khi một user thuộc cả vai trò Teacher và Admin, một nút chọn nhanh (Quick Switcher) sẽ xuất hiện cạnh ảnh đại diện ở góc dưới Sidebar để đổi ngữ cảnh làm việc mà không cần đăng xuất.

---

## 🛠️ 4. Cấu Trúc Component Next.js

```typescript
// apps/web/src/components/layout/DashboardShell.tsx
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07111a] flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar />
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```
