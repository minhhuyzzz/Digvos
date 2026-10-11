# 66. Database Design & Conventions Specification

Tài liệu này đặc tả quy chuẩn thiết kế cơ sở dữ liệu (PostgreSQL) thông qua Prisma ORM của hệ thống DIGVOS, đảm bảo tối ưu hiệu năng truy vấn, an toàn dữ liệu và đồng bộ hóa chuẩn SaaS.

---

## 🔑 1. Định Danh Khóa Chính (CUID vs UUID)

DIGVOS sử dụng **CUID (Version 2 - CUID2)** làm kiểu định danh khóa chính duy nhất cho toàn bộ các bảng trong cơ sở dữ liệu thay vì sử dụng ID tăng dần (Auto-increment Integer) hoặc UUID:
- *Lý do*:
  - ID tăng dần dễ bị tin tặc dò quét dữ liệu hàng loạt (ID enumeration attack) và làm lộ quy mô hệ thống (Ví dụ: Nhìn ID hóa đơn biết hệ thống mới có bao nhiêu đơn).
  - UUID quá dài (36 ký tự) gây tốn dung lượng lưu trữ index và làm chậm hiệu năng của cơ sở dữ liệu PostgreSQL khi bảng đạt hàng triệu dòng.
  - CUID2 có độ dài cố định ngắn hơn, an toàn tuyệt đối, tối ưu hóa sắp xếp Index tốt hơn UUID và thân thiện với đường dẫn URL.
- *Khai báo trong Prisma*:
  ```prisma
  id String @id @default(cuid())
  ```

---

## ✍️ 2. Quy Tắc Đặt Tên Bảng & Cột (Database Naming)

- **Trong Prisma Schema (Client-facing)**:
  - Tên bảng: Sử dụng `PascalCase` số ít (Ví dụ: `User`, `EvidenceSubmission`).
  - Tên trường/cột: Sử dụng `camelCase` (Ví dụ: `tenantId`, `fileUrl`).
- **Trong cơ sở dữ liệu PostgreSQL thực tế (Server-facing mapping)**:
  - Tất cả tên bảng và tên cột bắt buộc phải map sang dạng chữ thường viết cách nhau bởi dấu gạch dưới (`snake_case`) để đồng bộ tiêu chuẩn của PostgreSQL:
  ```prisma
  model EvidenceSubmission {
    id        String   @id @default(cuid())
    tenantId  String   @map("tenant_id")
    fileUrl   String   @map("file_url")
    createdAt DateTime @default(now()) @map("created_at")

    @@map("evidence_submissions") // Đổi tên bảng trong PostgreSQL
  }
  ```

---

## 🛡️ 3. Trường Kiểm Toán Hệ Thống (Audit & Soft Delete Fields)

Toàn bộ các bảng nghiệp vụ trong hệ thống bắt buộc phải khai báo 3 trường thông tin để phục vụ kiểm toán và cơ chế xóa mềm (Soft Delete):
- `createdAt`: Lưu thời gian tạo bản ghi (Mặc định `now()`).
- `updatedAt`: Tự động cập nhật thời gian khi bản ghi có bất kỳ thay đổi nào (`@updatedAt`).
- `deletedAt`: Kiểu dữ liệu `DateTime?` (cho phép null).
  - Khi người dùng xóa một bản ghi ➜ Hệ thống tuyệt đối không chạy lệnh `DELETE` vật lý khỏi CSDL, mà chỉ gán `deletedAt = now()`.
  - Toàn bộ các truy vấn lấy dữ liệu mặc định bắt buộc phải chèn thêm điều kiện lọc:
    `where: { deletedAt: null }`.

---

## ⚡ 4. Chiến Lược Đánh Chỉ Mục (Indexing Strategy)

Để đảm bảo các câu lệnh SELECT chạy dưới 10ms ngay cả khi dữ liệu phình to lên 50.000+ dòng:
- **Chỉ mục đơn (Single Column Index)**: Đánh chỉ mục bắt buộc cho các trường thường xuyên nằm trong điều kiện tìm kiếm hoặc liên kết:
  - Khóa ngoại `tenantId`, `userId`, `competencyId`.
  - Các trường trạng thái (`status`).
- **Chỉ mục kết hợp (Composite Index)**: Đánh chỉ mục kết hợp cho các truy vấn lọc nhiều điều kiện cùng lúc hoặc sắp xếp:
  - *Ví dụ*: Truy vấn tìm kiếm ứng viên của một doanh nghiệp sắp xếp theo điểm đối khớp giảm dần:
    `@@index([tenantId, matchScore(desc)])`
  - *Ví dụ*: Kiểm tra khử trùng sự kiện đã xử lý:
    `@@unique([tenantId, eventId])`
