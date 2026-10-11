# 65. Backend Modular Architecture Standards

Tài liệu này đặc tả quy chuẩn thiết kế các tầng kiến trúc bên trong Backend NestJS của DIGVOS, phân định rõ ràng trách nhiệm của từng lớp (Separation of Concerns) để đảm bảo tính dễ kiểm thử (Testability) và khả năng mở rộng.

---

## 🏛️ 1. Phân Tách Các Lớp Kiến Trúc (Layered Architecture)

Mỗi module nghiệp vụ trong `apps/api/src/modules/` được chia làm 4 lớp chính như sau:

```
[HTTP Request] 
      │
      ▼
[1. Controller] ➜ Chịu trách nhiệm Routing HTTP, Validate DTO, và gọi Service
      │
      ▼
[2. Application Service] ➜ Chịu trách nhiệm điều phối nghiệp vụ, quản lý Transactions, ghi Outbox Log
      │
      ▼
[3. Domain Service] ➜ Chứa các thuật toán nghiệp vụ thuần túy (Ví dụ: Tính toán IRT, thăng cấp Level)
      │
      ▼
[4. Repository / Prisma] ➜ Thao tác trực tiếp với cơ sở dữ liệu
```

---

## 📂 2. Cấu Trúc Thư Mục Chuẩn Của Backend Module

Mỗi module nghiệp vụ bắt buộc phải tuân theo sơ đồ cấu trúc thư mục sau:

```
src/modules/assessment/
├── controllers/          # Lớp 1: REST Controllers tiếp nhận HTTP
│   └── assessment.controller.ts
├── dto/                  # Data Transfer Objects để validate dữ liệu đầu vào
│   └── submit-answer.dto.ts
├── services/             # Lớp 2 & 3: Xử lý logic và thuật toán
│   ├── assessment.service.ts       # Application Service (Điều phối)
│   └── cat-engine.service.ts       # Domain Service (Thuật toán IRT thuần)
├── listeners/            # Bộ lắng nghe sự kiện từ Event Bus cục bộ
│   └── assessment.listener.ts
├── tests/                # Jest unit/integration testing
│   ├── assessment.service.spec.ts
│   └── cat-engine.spec.ts
└── assessment.module.ts  # Tệp module cấu hình của NestJS
```

---

## 📐 3. Đặc Tả Trách Nhiệm Chi Tiết Cho Từng Lớp

### A. Lớp Controller (`controllers/`)
- **Trách nhiệm**:
  - Gắn decorator định tuyến (Ví dụ `@Post('submit')`).
  - Gác cổng phân quyền bằng `@Roles()` và `@UseGuards(RolesGuard)`.
  - Validate dữ liệu đầu vào bằng `@UsePipes(new ValidationPipe())`.
- **Giới hạn**: Cấm viết logic nghiệp vụ, tính toán điểm, hoặc truy vấn database trực tiếp trong controller. Controller chỉ làm nhiệm vụ parse request và gọi hàm tương ứng ở Service.

### B. Lớp Application Service (`services/`)
- **Trách nhiệm**:
  - Nhận tham số sạch từ Controller.
  - Quản lý giao dịch cơ sở dữ liệu (Database Transactions) qua Prisma `$transaction` để đảm bảo tính toàn vẹn dữ liệu (ACID).
  - Ghi nhận Outbox Event log vào bảng `EventLog` trước khi phát sự kiện lên Event Bus.
- **Tính chất**: Lớp này được phép tiêm (inject) các Client bên thứ ba (như S3, Mail, Gemini) hoặc các Repositories khác.

### C. Lớp Domain Service (`services/` - Pure Logic)
- **Trách nhiệm**:
  - Chứa thuật toán cốt lõi (Ví dụ: Thuật toán thi CAT tính năng lực Theta theo phương trình Bayes tối đa, ma trận radar).
  - Không kết nối database, không tiêm (inject) các dịch vụ ngoài.
- **Lợi ích**: Là các hàm thuần (Pure functions) giúp viết Unit test cực kỳ dễ dàng, nhanh chóng và chính xác 100%.

### D. Lớp Repository / Database Integration
- **Trách nhiệm**:
  - Sử dụng Prisma Service để tương tác với cơ sở dữ liệu PostgreSQL.
  - Chốt chặn soft delete: Tự động loại bỏ các bản ghi có `deletedAt != null` khỏi các câu lệnh SELECT mặc định.
