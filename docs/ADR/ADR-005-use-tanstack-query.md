# ADR-005: Sử Dụng TanStack Query Làm Trình Quản Lý API Cache Phía Client

- **Trạng thái**: APPROVED
- **Người quyết định**: Software Architect / Tech Lead
- **Ngày**: 2026-07-11

---

## 📋 1. Bối cảnh (Context)
Trong các trang Dashboard của ứng dụng Next.js, chúng ta cần liên tục tương tác với Backend API để lấy dữ liệu (Ví dụ: Danh sách minh chứng, điểm radar, hàng đợi chấm bài). Nếu tự viết `useEffect` kết hợp `fetch/axios` truyền thống:
- Gây ra lỗi gọi trùng API liên tiếp (Over-fetching) khi render lại component.
- Không có cơ chế tự động đồng bộ làm mới dữ liệu ngầm (Background refetching).
- Quản lý trạng thái tải (`loading`), lỗi (`error`) và cache dữ liệu thủ công rất phức tạp và dễ phát sinh bug giao diện.

---

## 🚀 2. Quyết định (Decision)
Quyết định sử dụng **TanStack Query (React Query) phiên bản 5** làm giải pháp đồng bộ và quản lý cache dữ liệu từ API Server phía Client:
- Toàn bộ các API lấy dữ liệu (GET) bắt buộc phải bọc qua hook `useQuery`.
- Toàn bộ các API ghi dữ liệu (POST, PATCH, DELETE) bắt buộc bọc qua hook `useMutation`.
- Thiết lập `staleTime: 60000` (1 phút) làm cấu hình mặc định để giữ dữ liệu luôn mới mà không gây quá tải cho API Server.

---

## ⚖️ 3. Các Phương Án Đã Cân Nhắc (Alternatives Considered)

### Phương án A: SWR (Stale-While-Revalidate của Vercel)
- *Ưu điểm*: Cực kỳ nhẹ (dung lượng JS nhỏ), dễ sử dụng, tích hợp mượt mà với Next.js.
- *Nhược điểm*: Thiếu các tính năng quản lý nâng cao như: Mutation side-effects phức tạp, Query Invalidation có hệ thống, và bộ công cụ gỡ lỗi trực quan (Devtools) mạnh mẽ như TanStack Query.

### Phương án B: Redux Toolkit (RTK) Query
- *Ưu điểm*: Cực kỳ mạnh mẽ đối với các ứng dụng có cấu trúc state phức tạp cao độ.
- *Nhược điểm*: Viết code quá rườm rà (Boilerplate code lớn). Khai báo endpoints, slice, store cấu hình rất mất thời gian, không phù hợp với triết lý lập trình Agile phát triển nhanh của DIGVOS.

---

## 📈 4. Hệ quả (Consequences)
- **Tích cực**:
  - Code frontend cực kỳ sạch và khai báo (Declarative): Không còn các khối `useState/useEffect` phục vụ fetch dữ liệu.
  - Tích hợp sẵn cơ chế xử lý tải trễ (Loading skeletons) và tự động thử lại khi mất mạng.
  - Tự động làm mới dữ liệu trên màn hình khi người dùng focus lại vào tab trình duyệt.
- **Thử thách**:
  - Lập trình viên phải hiểu rõ cơ chế vòng đời của cache (Garbage collection, stale, active) để tránh lỗi hiển thị dữ liệu cũ (stale data) hoặc viết sai cơ chế invalidate query.
