# 42. API Contract & Response Envelope Standards

Tài liệu này đặc tả quy chuẩn thiết kế các API Endpoints, định dạng cấu trúc dữ liệu trả về (Response Envelope), chiến lược phân trang dựa trên con trỏ (Cursor Pagination), và quản lý phiên bản API (Versioning) cho hệ thống DIGVOS.

---

## 🚦 1. Quản Lý Phiên Bản API (API Versioning)

- **Quy chuẩn URL**: Tất cả các API Endpoints bắt buộc phải có tiền tố phiên bản nằm ở đầu URL để phòng ngừa xung đột khi nâng cấp nghiệp vụ lớn:
  - Định dạng chuẩn: `/api/v1/{module}/{resource}`
  - *Ví dụ*: `/api/v1/competency/radar/student-123`
  - *Ví dụ*: `/api/v1/assessment/submit`
- **Quy chuẩn HTTP Methods**:
  - `GET`: Truy xuất dữ liệu (Không làm thay đổi CSDL).
  - `POST`: Tạo mới tài nguyên, nộp bài, hoặc các hành động mutation lớn.
  - `PATCH`: Cập nhật một phần dữ liệu (Không dùng `PUT` đè hoàn toàn).
  - `DELETE`: Xóa tài nguyên (Mặc định NestJS Prisma thực hiện Soft Delete gán `deletedAt`).

---

## ✉️ 2. Định Dạng Phản Hồi Chuẩn (Standard Response Envelope)

Toàn bộ các phản hồi API của hệ thống bắt buộc phải bọc trong một phong bì JSON thống nhất để Client dễ dàng kiểm soát và xử lý:

### A. Phản Hồi Thành Công (Success Response Envelope)
```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2026-07-11T13:40:00.000Z"
  }
}
```
*Chi tiết*:
- `success`: Luôn là `true`.
- `data`: Chứa kết quả xử lý thực tế (Object hoặc Array).
- `meta`: Chứa thông tin bổ trợ (Pagination, Timestamp, Server node ID).

### B. Phản Hồi Thất Bại (Error Response Envelope)
```json
{
  "success": false,
  "error": {
    "statusCode": 400,
    "message": "Mô tả chi tiết lỗi nghiệp vụ hoặc mảng các lỗi validate",
    "errorCode": "INVALID_INPUT_DTO",
    "path": "/api/v1/evidence/validate"
  },
  "meta": {
    "timestamp": "2026-07-11T13:40:02.000Z"
  }
}
```

---

## 📄 3. Phân Trang Dựa Trên Con Trỏ (Cursor-Based Pagination)

Đối với các danh sách lớn có tốc độ cập nhật liên tục (Minh chứng nộp, Lịch sử sự kiện, Danh sách ứng viên), DIGVOS cấm sử dụng phân trang offset (`limit/offset` hoặc `?page=1`) vì gây giảm hiệu năng truy vấn SQL lớn và gây lỗi bỏ sót/lặp phần tử khi có bản ghi mới chèn vào giữa trang.
Thay vào đó, hệ thống sử dụng **Cursor Pagination** dựa trên định danh duy nhất `cuid` sắp xếp theo thời gian:

- **Tham số đầu vào (Request Query)**:
  - `limit`: Số lượng bản ghi muốn lấy (Mặc định `20`, tối đa `100`).
  - `cursor`: Định danh `id` của bản ghi cuối cùng của trang trước (Nếu là trang đầu tiên thì bỏ trống).
- **Cấu trúc phản hồi (Response Meta)**:
```json
{
  "success": true,
  "data": [
    { "id": "cuid-submission-1", "fileUrl": "...", "score": 80 },
    { "id": "cuid-submission-2", "fileUrl": "...", "score": 75 }
  ],
  "meta": {
    "timestamp": "2026-07-11T13:40:00.000Z",
    "pagination": {
      "limit": 2,
      "nextCursor": "cuid-submission-2",
      "hasNextPage": true
    }
  }
}
```
*Thuật toán xử lý phía Backend (Prisma Query)*:
```typescript
const limit = query.limit || 20;
const cursor = query.cursor;

const submissions = await this.prisma.submission.findMany({
  take: limit + 1, // Lấy dư 1 phần tử để xác định có trang tiếp theo hay không
  cursor: cursor ? { id: cursor } : undefined,
  skip: cursor ? 1 : 0, // Bỏ qua phần tử trùng với con trỏ
  orderBy: { id: 'desc' },
});
```
- Nếu độ dài của mảng `submissions` lớn hơn `limit`:
  - `hasNextPage = true`.
  - `nextCursor = submissions[limit - 1].id`.
  - Mảng dữ liệu thực tế trả về cho client sẽ cắt bớt phần tử cuối dư thừa (`submissions.slice(0, limit)`).
