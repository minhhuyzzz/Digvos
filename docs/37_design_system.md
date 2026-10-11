# 37. UI/UX Design System Tokens

Tài liệu này đặc tả hệ thống tokens thiết kế (Design System Tokens) của DIGVOS, định hướng cho toàn bộ giao diện Next.js sử dụng Tailwind CSS và Vanilla CSS để tạo cảm giác thẩm mỹ cực kỳ premium và nhất quán.

---

## 🎨 1. Bảng Màu Không Gian Vũ Trụ (Color Palette)

Hệ thống sử dụng tông màu tối sâu thẳm làm nền chủ đạo kết hợp các màu nhấn gradient phát sáng:

- **Nền cốt lõi (Core Backgrounds)**:
  - Deep Dark Space: `#020813` (Nền chính toàn trang).
  - Glass Card Fill: `rgba(15, 23, 42, 0.45)` (Nền của các bảng dữ liệu, cards).
- **Màu nhấn thương hiệu (Brand Highlights)**:
  - Emerald Green: `#10b981` (Tượng trưng cho sự tăng trưởng năng lực, level pass).
  - Cyan Aura: `#06b6d4` (Dành cho các liên kết hành động, thông tin bổ trợ).
  - Amber warning: `#f59e0b` (Mức độ thành thạo thấp, cần cải thiện).
- **Văn bản (Typography colors)**:
  - Title text: `#ffffff` (Nổi bật tuyệt đối).
  - Subtitle / Body text: `#94a3b8` (Màu xám Slate nhẹ dịu mắt).

---

## ✍️ 2. Hệ Thống Chữ (Typography)

- **Font chữ chính**: `Inter` hoặc `Outfit` (Đọc từ Google Fonts).
- **Cấu trúc phân cấp cỡ chữ**:
  - `h1`: `text-3xl font-extrabold tracking-tight text-white` (Tiêu đề lớn trang).
  - `h2`: `text-xl font-bold tracking-wide text-white` (Tiêu đề nhóm thẻ).
  - `body`: `text-sm font-light leading-relaxed text-slate-300` (Nội dung chính).
  - `label`: `text-[10px] font-bold text-slate-500 uppercase tracking-wider` (Nhãn form).

---

## 💎 3. Lớp Kính Thẩm Mỹ (Glassmorphism Configs)

Tạo hiệu ứng kính đục lơ lửng trên nền vũ trụ tối bằng cách kết hợp `backdrop-blur` và đường viền siêu mảnh:
- **Lớp kính chuẩn (Standard Glass)**:
  - Lớp nền: `bg-slate-950/40`
  - Kính mờ: `backdrop-blur-md`
  - Viền phát sáng: `border border-white/5`
  - Shadow: `shadow-xl shadow-black/20`
- **Lớp kính cao cấp (Premium Glass - Dành cho radar chart và card nổi bật)**:
  - Lớp nền: `bg-gradient-to-br from-slate-900/60 to-slate-950/80`
  - Kính mờ: `backdrop-blur-lg`
  - Viền phát sáng: `border border-white/10`
  - Glow bên trong: `box-shadow: inset 0 1px 1px rgba(255,255,255,0.05)`

---

## ⚡ 4. Hoạt Ảnh & Chuyển Động (Micro-animations)

- **Hover Card Effect**: Khi hover vào bất kỳ card nào, card sẽ nâng nhẹ lên và viền sáng hơn:
  - Tailwind: `hover:-translate-y-1 hover:border-white/20 transition-all duration-300`
- **Glow Button**: Các nút bấm CTA chính có hiệu ứng tỏa sáng mờ dưới chân:
  - CSS: `box-shadow: 0 0 20px rgba(16, 185, 129, 0.2)`
- **Marquee Testimonials**: Chạy mượt độc lập 3 cột dọc có tạm dừng khi hover chuột (`pause-on-hover` marquee).
- **Radar Rotation**: Hoạt ảnh xoay nhẹ biểu đồ radar khi tải trang lần đầu để cuốn hút thị giác người dùng.
