# ADR-003: Sử Dụng Prisma ORM Làm Hệ Thống Quản Trị Database

- **Trạng thái**: APPROVED
- **Người quyết định**: Software Architect / Tech Lead
- **Ngày**: 2026-07-11

---

## 📋 1. Bối cảnh (Context)
Dự án DIGVOS sử dụng cơ sở dữ liệu quan hệ PostgreSQL để lưu giữ các thực thể có mối quan hệ ràng buộc chặt chẽ (Học sinh ➜ Minh chứng ➜ Năng lực ➜ Chứng chỉ). Hệ thống cần một giải pháp quản lý cấu trúc bảng (Schema migrations) an toàn, tự động đồng bộ kiểu dữ liệu (TypeScript Type-safety) giữa Database và Codebase để tránh lỗi runtime, đồng thời hỗ trợ lập trình nhanh.

---

## 🚀 2. Quyết định (Decision)
Quyết định sử dụng **Prisma ORM** làm công cụ tương tác CSDL chính thức cho ứng dụng Backend NestJS:
- Sử dụng tệp `schema.prisma` làm nguồn sự thật duy nhất (Single Source of Truth) định nghĩa cấu trúc dữ liệu.
- Sử dụng Prisma Client tự động sinh mã (Auto-generated code) để có type-safe tuyệt đối khi viết các câu lệnh SELECT/INSERT/UPDATE.
- Sử dụng Prisma Migrations (`prisma migrate dev`/`deploy`) để quản lý lịch sử thay đổi database.

---

## ⚖️ 3. Các Phương Án Đã Cân Nhắc (Alternatives Considered)

### Phương án A: TypeORM
- *Ưu điểm*: Được tích hợp sẵn tài liệu hướng dẫn trong NestJS, sử dụng mẫu thiết kế Active Record / Data Mapper quen thuộc.
- *Nhược điểm*: Khai báo các mối quan hệ qua decorators trong file class JS rất rườm rà và dễ sai sót. Tốc độ sinh migration tự động kém chính xác và chậm hơn nhiều so với Prisma.

### Phương án B: Drizzle ORM
- *Ưu điểm*: Tốc độ truy vấn nhanh vượt trội (gần như SQL thuần), hỗ trợ viết SQL trực tiếp type-safe.
- *Nhược điểm*: Hệ sinh thái còn mới, tài liệu và cộng đồng hỗ trợ chưa phong phú bằng Prisma. Không có sẵn bộ giao diện quản trị dữ liệu trực quan chất lượng cao như Prisma Studio.

---

## 📈 4. Hệ quả (Consequences)
- **Tích cực**:
  - Tăng tốc độ phát triển tính năng mới lên gấp 2 lần nhờ khả năng tự động gợi ý code (IntelliSense) chuẩn xác 100% của Prisma Client.
  - Quản lý cấu trúc database trực quan qua Prisma Studio (`npm run db:studio`).
  - Hỗ trợ tốt cơ chế transaction `$transaction` và kết nối Prisma Client trong NestJS Module.
- **Thử thách**:
  - Prisma chưa hỗ trợ sẵn tính năng tự động lọc soft delete (`deletedAt = null`) và cô lập dòng theo tenant (`tenantId = ...`) một cách mặc định. Chúng ta phải tự lập trình thêm bộ chặn (Prisma Middleware hoặc custom extensions) để tự động chèn các điều kiện lọc này vào các truy vấn SQL.
