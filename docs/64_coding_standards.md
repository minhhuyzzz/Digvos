# 64. Coding Standards & Conventions

Tài liệu này đặc tả quy chuẩn viết mã nguồn (Coding Conventions) bắt buộc của dự án DIGVOS, giúp giữ cho codebase luôn sạch sẽ, dễ đọc và dễ bảo trì khi có nhiều nhà phát triển cùng tham gia.

---

## ✍️ 1. Quy Tắc Đặt Tên (Naming Conventions)

- **Biến và Hàm**: Sử dụng `camelCase`. Tên hàm bắt buộc phải là một động từ chỉ hành động rõ ràng.
  - *Đúng*: `calculateRadarChart()`, `submitEvidence()`
  - *Sai*: `radar()`, `doSubmit()`
- **Lớp, Types và Interfaces**: Sử dụng `PascalCase`.
  - *Ví dụ*: `EvidenceService`, `SubmitEvidenceDto`, `BaseEvent`
- **Hằng số (Constants)**: Sử dụng `UPPER_CASE` viết cách nhau bởi dấu gạch dưới.
  - *Ví dụ*: `MAX_UPLOAD_SIZE_MB`, `DEFAULT_PAGE_LIMIT`
- **Mã nguồn Database (Prisma/PostgreSQL)**:
  - Tên bảng: `PascalCase` ở số ít (Ví dụ: `Tenant`, `EvidenceSubmission`).
  - Tên cột/trường: `camelCase` trong Prisma, nhưng tự động map sang `snake_case` trong PostgreSQL để đồng bộ tiêu chuẩn DB (Ví dụ: `tenantId` mapping sang `tenant_id`).

---

## 📦 2. Quy Chuẩn Tổ Chức Import (Imports Management)

- **Đường dẫn tuyệt đối (Absolute Imports)**:
  - CẤM lạm dụng import tương đối lùi sâu (`../../../../components`).
  - Sử dụng alias `@/` cấu hình sẵn trong `tsconfig.json`:
    - `@/modules/...` cho Backend NestJS.
    - `@/features/...`, `@/components/...` cho Frontend Next.js.
- **Thứ tự sắp xếp import (Import Sorting)**:
  1. Thư viện cốt lõi của Node.js (`fs`, `path`).
  2. Thư viện bên thứ ba từ `node_modules` (React, NestJS, Prisma).
  3. Các packages dùng chung nội bộ (`@digvos/api-contract`, `@digvos/database`).
  4. Các imports nội bộ tương đối/tuyệt đối cục bộ.
  - *Gợi ý*: Sử dụng plugin `eslint-plugin-import` để tự động sắp xếp khi lưu file.

---

## 📐 3. Giới Hạn Kích Thước Hàm & Đơn Nhiệm (Single Responsibility)

- **Quy tắc 50 dòng (Max 50 Lines)**: Một hàm cấm dài quá 50 dòng code (trừ cấu hình config lớn hoặc Mock data). Nếu hàm vượt quá 50 dòng, bắt buộc phải bóc tách (refactor) các đoạn logic độc lập ra các hàm phụ trợ nhỏ hơn.
- **Đơn nhiệm (Single Responsibility Principle - SRP)**:
  - Một hàm chỉ làm DUY NHẤT một việc và làm thật tốt việc đó.
  - *Ví dụ*: Hàm `submitEvidence` chỉ làm nhiệm vụ ghi nhận thông tin nộp bài vào CSDL. Thuật toán tính toán năng lực phải được tách sang `calculateProficiency` của `CompetencyService`, không được viết gộp chung.

---

## 🛡️ 4. Quy Chuẩn Tiêm Phụ Thuộc (Dependency Injection - DI)

- **NestJS DI**:
  - Luôn sử dụng DI thông qua `constructor` tiêm dịch vụ dạng readonly.
  - Cấm khởi tạo instance trực tiếp bằng từ khóa `new` đối với các Service/Repository của hệ thống (vì sẽ làm mất tính năng quản lý vòng đời và cache của NestJS IoC Container, đồng thời không thể viết Unit test mocking được).
  - *Đúng*:
    ```typescript
    constructor(private readonly evidenceService: EvidenceService) {}
    ```
  - *Sai*:
    ```typescript
    const service = new EvidenceService();
    ```

---

## 🚫 5. Cấm Nuốt Lỗi (Never Swallow Errors)

- Khi sử dụng khối lệnh `try/catch`, cấm để trống phần `catch` hoặc chỉ log `console.log(error)` rồi bỏ qua.
- **Quy tắc**:
  1. Bắt buộc phải log lỗi chi tiết kèm stack trace bằng logger hệ thống (`this.logger.error`).
  2. Ném ra (throw) một ngoại lệ phù hợp (`HttpException` hoặc `RpcException`) để lớp chặn lỗi toàn cục (Global Exception Filter) có thể bắt và trả về mã lỗi JSON chuẩn cho client.
