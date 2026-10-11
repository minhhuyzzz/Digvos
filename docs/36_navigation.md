# 36. Role-Based Navigation & Routing Design

Tài liệu này đặc tả cơ chế kiểm soát định tuyến và điều hướng phân quyền (Role-Based Access Control - RBAC) tại cả lớp Frontend Next.js và Backend NestJS.

---

## 🚦 1. Kiến Trúc Định Tuyến Frontend (Next.js App Router)

Next.js sử dụng cấu trúc Route Groups độc lập để tách biệt hoàn toàn các bố cục màn hình:

- **Bố cục Công cộng (Public Layout)**:
  - Đường dẫn: `apps/web/src/app/(public)/`
  - Bố cục: Gồm Landing Page, Trang giới thiệu tính năng, Bảng giá, Tài liệu viết Blog và Trang xác minh chứng chỉ public.
  - Quyền truy cập: Bất kỳ ai cũng có thể truy cập không cần token.
- **Bố cục Xác thực (Auth Layout)**:
  - Đường dẫn: `apps/web/src/app/(auth)/`
  - Bố cục: Chỉ có trang đăng nhập (`login/page.tsx`) sử dụng form mô phỏng Auth0.
- **Bố cục Dashboard dùng chung (Dashboard Layout)**:
  - Đường dẫn: `apps/web/src/app/(dashboard)/`
  - Bố cục: Bọc các folder con theo vai trò: `student/`, `teacher/`, `enterprise/`, `admin/`.
  - Quyền truy cập: Bắt buộc đã đăng nhập. Middleware tự động gạt ngược về `/login` nếu thiếu session cookie.

---

## 🔒 2. Bản Đồ Phân Quyền URL (Frontend Navigation Matrix)

| Vai trò người dùng | Đường dẫn gốc | Danh mục Menu được phép hiển thị |
| :--- | :--- | :--- |
| **STUDENT** (Học viên) | `/student` | Overview, Radar Chart, Làm CAT Test, Portfolio, SBT Wallet |
| **TEACHER** (Giảng viên) | `/teacher` | Lớp học, Hàng đợi chấm bài (AI assisted), Rubrics builder |
| **ENTERPRISE** (Doanh nghiệp) | `/enterprise` | Tổng quan nhân sự, Tìm kiếm nhân tài, SBT Verify |
| **ADMIN** (Quản trị hệ thống) | `/admin` | Tenant manager, Duyệt KYC, Khung DigComp, Event logs |

---

## 🛡️ 3. Cơ Chế Bảo Vệ Route Phía Client (Next.js Middleware)

- File `apps/web/src/middleware.ts` chặn tất cả các request có tiền tố đường dẫn trùng khớp với config matcher.
- Kiểm tra cookie hoặc token trong header:
```typescript
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  if (!token && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Phân quyền chi tiết dựa trên JWT Decoded Role
  const user = decodeJwt(token);
  if (pathname.startsWith('/admin') && user.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/403', request.url));
  }
  
  return NextResponse.next();
}
```

---

## ⚡ 4. Đồng Bộ Bảo Vệ API Phía Backend (NestJS Guards)

Để tránh trường hợp Client cố tình gọi API phá hoại, Backend gác cổng bằng hai lớp phòng ngự:
- **`TenantMiddleware`**: Trích xuất `X-Tenant-ID` từ headers và gán vào context truy vấn Prisma để tự động thêm điều kiện lọc dữ liệu `where tenantId = ...` cô lập dữ liệu hoàn hảo.
- **`RolesGuard`**: Kết hợp decorator `@Roles(Role.TEACHER)` để kiểm tra vai trò người dùng trong cơ sở dữ liệu trước khi thực thi hàm.
```typescript
@Post('validate')
@Roles(Role.TEACHER, Role.ADMIN)
async validate(@Body() dto: ValidateEvidenceDto) {
  return this.evidenceService.validateEvidence(...);
}
```
