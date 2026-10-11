# 56. Frontend Performance & Core Web Vitals Specification

Tài liệu này đặc tả quy chuẩn tối ưu hóa hiệu năng giao diện (Web Performance) của DIGVOS, đảm bảo giao diện tải tức thì, mượt mà và đạt điểm số tối đa trên công cụ Google Lighthouse (Core Web Vitals).

---

## 🎯 1. Chỉ Tiêu Hiệu Năng Mục Tiêu (Core Web Vitals Targets)

Toàn bộ các trang giao diện của DIGVOS bắt buộc phải đáp ứng 3 chỉ số Core Web Vitals chuẩn của Google trên thiết bị Mobile và Desktop:

1. **LCP (Largest Contentful Paint - Thời gian hiển thị phần tử lớn nhất)**: `< 2.5 giây` (Màn hình chính phải hiển thị nội dung hữu ích ngay lập tức).
2. **CLS (Cumulative Layout Shift - Điểm số thay đổi bố cục tích lũy)**: `< 0.1` (Cấm hiện tượng nhảy giật khung giao diện khi ảnh hoặc font chữ đang tải chậm).
3. **INP (Interaction to Next Paint - Thời gian phản hồi tương tác)**: `< 200 mili-giây` (Độ trễ khi nhấp nút hoặc gõ phím phải cực kỳ nhanh, tạo cảm giác mượt mà).

---

## 📦 2. Chia Nhỏ Mã Nguồn & Tải Trễ (Lazy Loading & Code Splitting)

Next.js tự động chia nhỏ file JS theo từng trang (Page-based splitting). Tuy nhiên, đối với các thư viện đồ họa hoặc component tương tác nặng, lập trình viên bắt buộc phải cấu hình tải trễ động (**Dynamic Imports**):

- **Áp dụng cho Radar Chart (Recharts)**:
  - Thư viện Recharts có dung lượng JS rất lớn và chỉ thực sự cần khi màn hình đã hiển thị xong.
  - Sử dụng `next/dynamic` để tải trễ đồ họa radar:
```typescript
import dynamic from 'next/dynamic';

const RadarChart = dynamic(() => import('@/features/competency/components/RadarChart'), {
  ssr: false, // Tắt render ở server vì Recharts đòi hỏi API của trình duyệt (Window/Canvas)
  loading: () => <RadarChartSkeleton />, // Hiển thị khung xương skeleton khi đang tải file JS
});
```

---

## 🖼️ 3. Tối Ưu Hóa Hình Ảnh & Phông Chữ (Images & Fonts)

- **Hình ảnh (`next/image`)**:
  - CẤM sử dụng thẻ `<img>` thô của HTML.
  - Bắt buộc dùng component `<Image />` của Next.js để tự động nén dung lượng, resize kích thước theo khung thiết bị, chuyển đổi định dạng ảnh sang WebP/AVIF siêu nhẹ, và tự động kích hoạt lazy loading.
- **Phông chữ (`next/font`)**:
  - Sử dụng Google Fonts tích hợp qua `next/font/google` (Ví dụ: font `Inter` hoặc `Outfit`).
  - Next.js tự động tải file font về máy chủ trong lúc build và tự động nhúng local CSS, triệt tiêu hoàn toàn lỗi giật font (Font flickering / FOIT) khi tải trang.

---

## 📄 4. Ảo Hóa Bảng Dữ Liệu Lớn (Virtualized Tables / Lists)

- Đối với các bảng hiển thị dữ liệu khổng lồ (Ví dụ: Bảng audit event log 5.000 dòng của Admin, Hàng đợi chấm bài 1.000 sinh viên):
  - Việc render hàng ngàn thẻ HTML `<tr>`/`<td>` cùng lúc sẽ gây nghẽn RAM trình duyệt, làm CLS nhảy cao và đẩy INP lên tới 2-3 giây.
  - **Giải pháp**: Tích hợp ảo hóa danh sách bằng thư viện `@tanstack/react-virtual` (hoặc `react-window`).
  - **Nguyên lý**: Trình duyệt chỉ render duy nhất 15-20 dòng dữ liệu thực tế đang hiển thị trong tầm mắt của người dùng (Viewport). Khi người dùng cuộn chuột, các thẻ DOM dòng cũ biến mất và được tái sử dụng để hiển thị dòng mới, duy trì tổng số lượng DOM tối thiểu, giúp giao diện cuộn mượt 120 FPS.
