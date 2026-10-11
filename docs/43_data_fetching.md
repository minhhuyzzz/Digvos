# 43. Data Fetching & Client State Management Strategy

Tài liệu này đặc tả kiến trúc truyền tải dữ liệu (Data Fetching) trong Next.js 15 và cấu trúc quản lý trạng thái (State Management) ở phía Client của hệ thống DIGVOS.

---

## 🚦 1. Phân Phối Chiến Lược Lấy Dữ Liệu (Data Fetching Patterns)

Next.js 15 được chia thành các phân khu lấy dữ liệu rõ ràng nhằm tối ưu hóa SEO và tốc độ tải trang (Core Web Vitals):

1. **Server-Side Rendering (SSR) & Static Generation**:
   - *Áp dụng*: Trang chủ Landing Page, Trang Blog, Trang Tính năng, Trang Bảng giá.
   - *Cách thực hiện*: Sử dụng React Server Components (RSC) mặc định của Next.js, lấy dữ liệu trực tiếp hoặc qua fetch caching từ CMS/API để render HTML hoàn chỉnh từ server.
2. **Client-Side Rendering (CSR)**:
   - *Áp dụng*: Toàn bộ khu vực Dashboard (`(dashboard)/student`, `/teacher`, `/enterprise`, `/admin`).
   - *Cách thực hiện*: Sử dụng chỉ thị `'use client'` ở các components cần tương tác cao. Fetch dữ liệu không đồng bộ thông qua **TanStack Query (React Query)** kết nối tới API NestJS.

---

## 🚫 2. Giới Hạn Nghiêm Ngặt Cho Server Actions

Theo quy chuẩn kiến trúc Enterprise của DIGVOS:
- **CẤM tuyệt đối sử dụng Server Actions để xử lý Business Logic chính** (ví dụ: Thi CAT, nộp bài, duyệt minh chứng, tuyển dụng).
- *Lý do*: NestJS đóng vai trò là API Gateway và Business Engine tập trung duy nhất (Source of Truth). Việc viết logic nghiệp vụ trong Server Actions của Next.js sẽ phá vỡ tính nhất quán kiến trúc, gây trùng lặp code, và bỏ qua hệ thống Event Bus bất đồng bộ của NestJS.
- **Server Actions chỉ được phép dùng cho các tác vụ giao diện thuần túy (UI Mutation)**:
  - Thay đổi ngôn ngữ giao diện (i18n).
  - Thay đổi giao diện Sáng/Tối (Theme toggle).
  - Đăng xuất (Clear session cookie).

---

## 🌀 3. Quản Lý Cache Dữ Liệu Bằng TanStack Query (React Query)

Toàn bộ các tác vụ gọi API nghiệp vụ ở Client bắt buộc phải đi qua TanStack Query để tận dụng cơ chế caching và tự động đồng bộ:

- **Query**:
  - Dùng để lấy dữ liệu (GET requests).
  - Tự động lưu cache, hỗ trợ `staleTime` (mặc định 1 phút) để tránh gọi API trùng lặp khi người dùng chuyển qua lại các tab.
  - Cung cấp sẵn các biến trạng thái: `isLoading`, `isError`, `data`, `refetch`.
- **Mutation**:
  - Dùng để thay đổi dữ liệu (POST, PATCH, DELETE requests).
  - Sử dụng cơ chế `onSuccess` để tự động kích hoạt `queryClient.invalidateQueries` ép các bảng liên quan tải lại dữ liệu mới nhất (Ví dụ: Chấm điểm thành công ➜ Tự động invalidate và làm mới hàng đợi chấm bài).

---

## 🧠 4. Quản Lý Trạng Thái UI Toàn Cục Bằng Zustand

Đối với các trạng thái giao diện cần chia sẻ giữa nhiều component xa nhau, chúng ta sử dụng **Zustand** làm thư viện quản lý state gọn nhẹ, hiệu năng cao:

- **Quy chuẩn phạm vi lưu trữ (Global UI State)**:
  - Trạng thái đóng/mở của Sidebar (`isCollapsed`).
  - Lịch sử vai trò hiện tại đang bật (`currentRole` phục vụ switch nhanh).
  - Trạng thái đóng/mở của Command Palette (`isCommandPaletteOpen`).
  - Hộp thư thông báo chưa đọc.
- **Quy định**: Cấm lưu trữ dữ liệu nghiệp vụ lớn trong Zustand store (dữ liệu này đã được TanStack Query quản lý cache hiệu quả).

---

## 📂 5. Quy Chuẩn Tổ Chức Thư Mục Feature

Để đảm bảo tính đồng nhất, mỗi Feature Module ở frontend Next.js được tổ chức cấu trúc như sau:

```
apps/web/src/features/competency/
├── components/          # React components cho feature này
├── hooks/
│   └── useCompetency.ts # Chứa các hooksuseQuery / useMutation
├── services/
│   └── competency.api.ts# Chứa axios client gọi REST API NestJS
├── types/
│   └── index.ts         # Kiểu dữ liệu TypeScript riêng của feature
└── index.ts             # Export các component public ra ngoài
```
