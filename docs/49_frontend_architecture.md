# 49. Frontend Feature-Based Architecture Standards

Tài liệu này đặc tả quy chuẩn tổ chức thư mục và cấu trúc viết mã nguồn phía Frontend Next.js của DIGVOS, áp dụng mô hình kiến trúc định hướng tính năng (Feature-Based Architecture) nhằm giải quyết bài toán phình to mã nguồn khi dự án đạt quy mô 100+ trang giao diện.

---

## 🏛| 1. Kiến Trúc Định Hướng Tính Năng (Feature-Based Architecture)

Thay vì gom tất cả các components vào một thư mục `components/` khổng lồ và tất cả các hooks vào `hooks/` dùng chung khiến việc tìm kiếm file cực kỳ khó khăn, DIGVOS tổ chức mã nguồn Next.js theo các **Feature Module độc lập** đặt dưới `apps/web/src/features/`.
- *Quy tắc*: Một Feature đại diện cho một nghiệp vụ hoặc tài nguyên cụ thể (Ví dụ: `assessment`, `competency`, `learning`, `classroom`, `tenant`).

---

## 📂 2. Cấu Trúc Chi Tiết Của Một Feature Folder

Mỗi thư mục feature bắt buộc phải tổ chức đồng nhất theo cấu trúc 7 thư mục con sau:

```
src/features/assessment/
├── components/           # Các React components phục vụ riêng cho feature này
│   ├── CATInterface.tsx
│   └── QuestionCard.tsx
├── hooks/                # Custom React hooks (Chứa logic TanStack Query)
│   └── useAssessment.ts
├── api/                  # Axios/Fetch clients gọi API backend NestJS
│   └── assessment.api.ts
├── schemas/              # Zod schemas để validate form dữ liệu ở client
│   └── submit.schema.ts
├── types/                # Các Interfaces / Types TypeScript riêng
│   └── index.ts
├── utils/                # Hàm phụ trợ, giải thuật tính toán thuần túy
│   └── math.ts
└── index.ts              # File xuất khẩu công khai (Public API Barrel)
```

---

## 🎨 3. Quy Chuẩn Lập Trình Cho Từng Lớp (Layer Guidelines)

### A. Lớp Component (`components/`)
- Áp dụng mô hình **Container & Presentation Components**:
  - *Presentation Components (UI thuần)*: Không chứa logic gọi API, chỉ nhận dữ liệu qua `props` và render UI (Ví dụ: `QuestionCard.tsx`). Dễ dàng viết Storybook và Unit test độc lập.
  - *Container Components (Chứa logic)*: Kết nối với custom hooks, quản lý loading/error state, và điều phối các Presentation components (Ví dụ: `CATInterface.tsx`).

### B. Lớp Hooks & API (`hooks/` & `api/`)
- Cấm gọi trực tiếp `axios.get` hoặc `fetch` ngay bên trong component.
- Tất cả các cuộc gọi API bắt buộc phải viết trong file `.api.ts` dưới dạng các hàm sạch (Pure functions):
  ```typescript
  export const submitAssessmentApi = async (data: SubmitAssessmentRequest) => {
    const response = await axios.post('/api/v1/assessment/submit', data);
    return response.data;
  };
  ```
- File `.ts` của custom hook bọc các hàm API này bằng `useQuery` hoặc `useMutation` của TanStack Query:
  ```typescript
  export const useSubmitAssessment = () => {
    return useMutation({
      mutationFn: submitAssessmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['assessment-history'] });
      }
    });
  };
  ```

### C. Lớp Schemas (`schemas/`)
- Sử dụng **Zod** để định nghĩa cấu trúc dữ liệu form (ví dụ form nộp bài, form tạo tenant) để tích hợp chặt chẽ với `react-hook-form` giúp tự động hiển thị lỗi validate ở client trước khi gửi request lên server.

---

## 📦 4. Quy Tắc Đóng Gói Và Đóng Băng Feature (Barrel Export - `index.ts`)

File `index.ts` ở thư mục gốc của mỗi feature đóng vai trò là "Cổng xuất khẩu duy nhất" (Barrel Export). Nó quy định những gì được phép công khai ra bên ngoài:
```typescript
// src/features/assessment/index.ts
export { default as CATInterface } from './components/CATInterface';
export { useAssessmentHistory } from './hooks/useAssessment';
export type { AssessmentSession } from './types';
```
- **Quy tắc nghiêm ngặt**: Các component/hooks khác ở bên ngoài Feature chỉ được phép import thông qua tệp `index.ts` public này. Cấm tuyệt đối việc import xuyên sâu vào các file con (ví dụ cấm import từ `@/features/assessment/components/QuestionCard`). Điều này giúp cô lập hoàn toàn logic nội bộ, dễ dàng refactor hoặc thay thế bên trong feature mà không làm gãy code bên ngoài!
