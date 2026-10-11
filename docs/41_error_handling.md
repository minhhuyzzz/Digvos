# 41. Error Handling Strategy & Fallback UI

Tài liệu này đặc tả cơ chế kiểm soát, xử lý lỗi toàn cục và thiết kế giao diện dự phòng (Fallback UI) của hệ thống DIGVOS ở cả Frontend Next.js và Backend NestJS.

---

## 🛡️ 1. Phân Loại Lỗi Hệ Thống (Error Classification)

DIGVOS phân loại lỗi thành 4 nhóm chính để có phương án phản hồi UX phù hợp:

1. **Lỗi Nghiệp vụ / Validate DTO (400 Bad Request)**:
   - *Hành vi*: Dữ liệu gửi lên sai định dạng, thiếu trường.
   - *UX Response*: Hiển thị thông báo viền đỏ (Inline Error) ngay dưới ô nhập liệu của form.
2. **Lỗi Phân quyền (401 Unauthorized / 403 Forbidden)**:
   - *Hành vi*: Token hết hạn hoặc truy cập trái phép workspace của vai trò khác.
   - *UX Response*: Chuyển hướng (Redirect) về `/login` hoặc hiển thị trang `/403-forbidden` dạng Glassmorphism.
3. **Lỗi Mạng / Ngoại tuyến (Offline State)**:
   - *Hành vi*: Thiết bị mất kết nối internet giữa chừng khi đang làm bài thi CAT hoặc đang nộp minh chứng.
   - *UX Response*: Hiển thị banner cảnh báo đầu trang `Banner: Bạn đang ngoại tuyến. Hệ thống sẽ tự động đồng bộ khi có mạng lại.` và kích hoạt IndexedDB lưu tạm.
4. **Lỗi Máy chủ (500 Internal Server Error)**:
   - *Hành vi*: Database crash, API crash, lỗi logic sâu.
   - *UX Response*: Hiển thị trang Fallback UI kèm nút "Thử lại" (Retry).

---

## 🎨 2. Giao Diện Tạm Thời & Dự Phòng (Fallback UI Elements)

### A. Trình Giữ Chỗ Phát Sáng (Skeleton Loading)
- Để tránh hiện tượng giật màn hình (Cumulative Layout Shift - CLS), tất cả các biểu đồ Radar Chart và bảng biểu dữ liệu lớn bắt buộc phải hiển thị Skeleton Card có hiệu ứng quét sáng (Shimmer effect) trong thời gian chờ API phản hồi.
- Tailwind class mẫu: `bg-slate-900/40 animate-pulse rounded-2xl`.

### B. Hộp Thông Báo Nổi (Toasts System - `react-hot-toast`)
- Sử dụng thư viện `react-hot-toast` được cấu hình theme tối phù hợp với Design System:
  - **Success Toast**: Viền xanh ngọc `#10b981`, icon tích xanh.
  - **Error Toast**: Viền đỏ rực `#ef4444`, icon cảnh báo chấm than.
- Cấm sử dụng hộp thoại `alert()` mặc định của trình duyệt.

### C. Giao Diện Trống (Empty States)
- Khi một bảng hoặc danh sách không có dữ liệu (ví dụ: Portfolio trống, không có ứng viên đối khớp):
  - Hiển thị hình minh họa vector Glassmorphism mờ.
  - Đoạn văn ngắn hướng dẫn hành động tiếp theo: *"Bạn chưa nộp minh chứng nào. Hãy nhấp nút bên dưới để bắt đầu."*
  - Nút bấm CTA dẫn tới hành động tạo mới dữ liệu.

---

## 🚧 3. Lớp Chặn Lỗi Biên (Next.js Error Boundaries)

- Cấu hình tệp `apps/web/src/app/(dashboard)/error.tsx` để tự động bắt tất cả các lỗi runtime xảy ra bên trong các trang dashboard:
```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '../../components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ghi log lỗi ra hệ thống giám sát (Sentry)
    console.error('[Dashboard Error Boundary]', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <h3 className="text-xl font-bold text-white">Đã xảy ra sự cố không mong muốn</h3>
      <p className="text-sm text-slate-400 max-w-md leading-relaxed">
        Hệ thống gặp lỗi khi tải trang này. Bạn có thể thử lại hoặc quay lại trang chủ.
      </p>
      <div className="flex space-x-4">
        <Button variant="primary" onClick={() => reset()}>Thử lại</Button>
        <Button variant="secondary" onClick={() => window.location.href = '/'}>Quay lại trang chủ</Button>
      </div>
    </div>
  );
}
```

---

## 🔄 4. Chiến Lược Tự Động Thử Lại (Retry Policy)
- Đối với các lệnh gọi REST API qua Axios / Fetch:
  - Tích hợp bộ chặn (interceptors) tự động thử lại tối đa **3 lần** đối với các lỗi GET Request bị timeout hoặc mất mạng đột ngột (Network Error), áp dụng giải thuật **Exponential Backoff** (Thử lại sau 1s, 2s, 4s).
  - Đối với các POST/PATCH request làm thay đổi dữ liệu (mutation): Cấm tự động thử lại ở tầng mạng để tránh trùng lặp bản ghi, thay vào đó hiển thị nút bấm để người dùng tự xác nhận gửi lại (Manual retry).
