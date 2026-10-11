# 38. Shared UI Component Library Specification

Tài liệu này đặc tả các UI Component nguyên tử dùng chung (Shared Components) nằm dưới `apps/web/src/components/ui/` để xây dựng giao diện nhanh chóng, đồng bộ và nhất quán.

---

## 📦 1. Danh Sách Các Component Nguyên Tử (Atomic Components)

### A. Card (`components/ui/card.tsx`)
- **Mục đích**: Hộp bọc nội dung thông tin.
- **Biến thể (Variants)**:
  - `default`: Nền tối, border mảnh 10% trắng.
  - `premium`: Nền gradient chéo từ góc trên trái sang dưới phải kèm hiệu ứng glow nhẹ ở viền.
  - `interactive`: Có sẵn hover scale animation nâng card lên.
- **Props**:
  ```typescript
  interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'premium' | 'interactive';
  }
  ```

### B. Button (`components/ui/button.tsx`)
- **Mục đích**: Các nút bấm tương tác hành động.
- **Biến thể (Variants)**:
  - `primary`: Nền xanh ngọc phát sáng (`bg-brand-500 hover:bg-brand-600 text-slate-950`).
  - `secondary`: Nền kính mờ, viền trắng mảnh (`bg-white/5 border border-white/10 hover:bg-white/10`).
  - `ghost`: Không nền, chỉ hiện border khi hover.
- **Props**:
  ```typescript
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    isLoading?: boolean;
  }
  ```

### C. Dropdown Select (`components/ui/select.tsx`)
- **Mục đích**: Hộp chọn tùy chọn chuẩn hóa (thay thế cho native select thô kệch).
- **Mỹ thuật**: Nền tối mờ, có icon chỉ hướng bên phải, hiển thị danh sách option dạng dropdown bay lửng (popover) bo góc 12px và border sáng 5%.

---

## 🧬 2. Các Component Nghiệp Vụ Dùng Chung (Composite Components)

### A. Radar Năng Lực Mini (`components/ui/mini-radar.tsx`)
- Phiên bản rút gọn của Radar Chart dùng để chèn vào các danh sách hoặc bảng so sánh nhanh (ví dụ hiển thị năng lực của ứng viên trong hàng đợi đối khớp của nhà tuyển dụng).

### B. Huy Hiệu Cấp Độ (`components/ui/level-badge.tsx`)
- Huy hiệu tự động đổi màu theo mức độ thành thạo DigComp (Level 1-8):
  - Level 1 - 2 (Foundation): Màu xanh dương nhạt.
  - Level 3 - 4 (Intermediate): Màu lục nhạt.
  - Level 5 - 6 (Advanced): Màu cam hổ phách.
  - Level 7 - 8 (Highly Specialized): Gradient tím hồng rực rỡ.

### C. Trình Tải Lên Minh Chứng (`components/ui/file-dropzone.tsx`)
- Trình upload file kéo thả với thanh tiến trình tải lên động, tự động từ chối các định dạng file không được phép và hiển thị dung lượng file thực tế.
- Props hỗ trợ callback nhận URL file sau khi upload thành công lên dịch vụ lưu trữ (S3/Supabase Storage).
