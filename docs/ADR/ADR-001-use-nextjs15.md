# ADR-001: Sử Dụng Next.js 15 Làm Framework Frontend

- **Trạng thái**: APPROVED
- **Người quyết định**: Software Architect / Tech Lead
- **Ngày**: 2026-07-11

---

## 📋 1. Bối cảnh (Context)
Dự án DIGVOS đòi hỏi một hệ thống giao diện người dùng cao cấp, phản hồi nhanh, thân thiện với SEO đối với các trang công cộng (Landing page, Blog, Bảng giá) và có khả năng tương tác phức tạp thời gian thực đối với các màn hình Dashboard của Học viên, Giảng viên, Doanh nghiệp. Hệ thống cần được tối ưu dung lượng tải ban đầu (Initial load size) và phân tách bố cục giao diện (Route groups) sạch sẽ.

---

## 🚀 2. Quyết định (Decision)
Quyết định sử dụng **Next.js phiên bản 15** làm Framework phát triển Frontend chính thức cho ứng dụng `apps/web`.
- Áp dụng mô hình **App Router** với cấu trúc Route Groups (`(public)`, `(auth)`, `(dashboard)`) để cô lập bố cục giao diện.
- Tận dụng tối đa **React Server Components (RSC)** cho các trang tĩnh nhằm tăng tốc độ tải trang (LCP < 2.5s) và giảm tải lượng JavaScript gửi xuống trình duyệt.

---

## ⚖️ 3. Các Phương Án Đã Cân Nhắc (Alternatives Considered)

### Phương án A: Single Page Application (SPA) bằng React thuần (Vite / CRA)
- *Ưu điểm*: Đơn giản trong cấu hình ban đầu, triển khai lưu trữ static file dễ dàng.
- *Nhược điểm*: Điểm SEO cực kỳ kém vì render hoàn toàn ở Client. Bundle size phình to nhanh chóng khi dự án phát triển lớn, làm giảm trải nghiệm của người dùng trên thiết bị di động (LCP chậm).

### Phương án B: Remix (React Router Framework)
- *Ưu điểm*: Lấy dữ liệu ở Server tốt, quản lý form và mutations mượt mà.
- *Nhược điểm*: Hệ sinh thái nhỏ hơn Next.js, tài liệu cộng đồng ít phổ biến hơn và tích hợp với monorepo phức tạp hơn.

---

## 📈 4. Hệ quả (Consequences)
- **Tích cực**:
  - Tối ưu hóa SEO hoàn hảo cho Landing page và Blog qua Server-Side Rendering (SSR).
  - Tách biệt rõ ràng phần giao diện tĩnh và tương tác động.
  - Tận dụng được các tính năng tối ưu hóa hình ảnh (`next/image`) và font chữ (`next/font`) tự động.
- **Thử thách**:
  - Đội ngũ lập trình viên phải hiểu rõ sự khác biệt giữa Server Components và Client Components để tránh các lỗi import nhầm môi trường hoặc lỗi hydration.
  - Phải kiểm soát chặt chẽ việc sử dụng Server Actions, cấm viết business logic chính trong Next.js server.
