# 📓 Nhật ký lỗi phát triển & Khắc phục (ERRORS.md)

Tài liệu này lưu trữ các lỗi gặp phải trong quá trình code để làm tài sản học tập và ngăn chặn tái diễn lỗi.

---

## [2026-07-16 21:08] - Lỗi kiểu dữ liệu Button component ở frontend

- **Type**: Syntax/Build
- **Severity**: Medium
- **File**: `apps/web/src/app/(auth)/login/page.tsx:182`
- **Agent**: Digvos
- **Root Cause**: Component `Button` từ hệ thống UI dùng chung không định nghĩa variant `"outline"`. Chỉ hỗ trợ: `"primary" | "secondary" | "glass" | "danger"`. Việc sử dụng `"outline"` gây lỗi biên dịch TypeScript trong quá trình build Next.js.
- **Error Message**: 
  ```text
  Type error: Type '"outline"' is not assignable to type '"primary" | "secondary" | "glass" | "danger" | undefined'.
  ```
- **Fix Applied**: Thay đổi `variant="outline"` thành `variant="glass"` (hợp lệ và phù hợp phong cách Glassmorphism của DIGVOS).
- **Prevention**: Luôn kiểm tra định nghĩa TypeScript của các component dùng chung (`Button`, `Card`, v.v.) trước khi truyền props.
- **Status**: Fixed

---

## [2026-07-16 21:09] - Lỗi Union Type Narrowing ở backend NestJS

- **Type**: Syntax/Typecheck
- **Severity**: Medium
- **File**: `apps/api/src/modules/identity/presentation/controllers/auth.controller.ts:51`
- **Agent**: Digvos
- **Root Cause**: Hàm `AuthService.syncAuth0` trả về một Union Type (một object báo `requireRoleSelection: true` hoặc một object chứa token đăng nhập thành công `requireRoleSelection: false`). Khi kiểm tra ở Controller, TypeScript không tự động thu hẹp kiểu (type narrowing) dẫn đến lỗi báo thuộc tính `accessToken` không tồn tại ở trường hợp đăng nhập mới.
- **Error Message**: 
  ```text
  src/modules/identity/presentation/controllers/auth.controller.ts:51:44 - error TS2339: Property 'refreshToken' does not exist on type...
  ```
- **Fix Applied**: Ép kiểu tường minh (`result as { accessToken: string; ... }`) sau khi đã kiểm tra điều kiện rẽ nhánh `if (result.requireRoleSelection) { return result; }`.
- **Prevention**: Khi trả về Union Type phức tạp từ Service, hãy thiết kế kiểu tường minh (như `Discriminated Union` với thuộc tính chung phân loại) hoặc ép kiểu rõ ràng tại Controller sau các chốt kiểm tra rẽ nhánh.
- **Status**: Fixed

---

## [2026-07-20 21:37] - Build Error in faq-cta.tsx (Unexpected token)

- **Type**: Syntax Error
- **Severity**: Medium
- **File**: pps/web/src/components/landing/faq-cta.tsx:49
- **Agent**: Digvos (Antigravity Orchestrator)
- **Root Cause**: Trong quá trình tái cấu trúc Landing Page, một phần thuộc tính của thẻ motion.div vô tình bị lặp lại dưới dạng text ở trong thẻ gây ra lỗi cú pháp JSX (Unexpected token).
- **Error Message**: 
  `
  x Unexpected token. Did you mean {'>'} or &gt;?
  `
- **Fix Applied**: Đã xóa bỏ các thuộc tính dư thừa bên trong thẻ và sắp xếp lại đúng cấu trúc thẻ motion.div.
- **Prevention**: Khi dùng multi_replace_file_content, phải đặc biệt chú ý khoảng thẻ đóng mở và rà soát kỹ StartLine và EndLine.
- **Status**: Fixed

---
