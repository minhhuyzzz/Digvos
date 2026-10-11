# ADR-004: Sử Dụng Redis Pub/Sub & BullMQ Làm Hệ Thống Tin Nhắn Và Hàng Đợi

- **Trạng thái**: APPROVED
- **Người quyết định**: Software Architect / Tech Lead
- **Ngày**: 2026-07-11

---

## 📋 1. Bối cảnh (Context)
Dự án DIGVOS vận hành theo mô hình kiến trúc hướng sự kiện (Event-Driven Architecture). Khi scale ngang hệ thống thành nhiều instance backend NestJS đằng sau load balancer, chúng ta cần một giải pháp truyền tin trung gian (Message Broker) để định tuyến các sự kiện thời gian thực (SSE/WebSockets) đến đúng máy chủ của người dùng kết nối. Đồng thời, hệ thống cần một giải pháp hàng đợi tác vụ (Job Queue) mạnh mẽ để xử lý các tác vụ bất đồng bộ nặng (Đúc SBT, gửi mail, scan virus, phân tích AI) mà không làm nghẽn luồng chính.

---

## 🚀 2. Quyết định (Decision)
Quyết định sử dụng **Redis** làm công nghệ truyền tin lõi cho cả hai tác vụ:
- **Redis Pub/Sub**: Làm Adapter truyền thông điệp thời gian thực giữa các server backend NestJS.
- **BullMQ**: Thư viện hàng đợi chạy trên Redis để quản lý, phân phối, lập lịch và chạy lại (retry) các tác vụ ngầm.

---

## ⚖️ 3. Các Phương Án Đã Cân Nhắc (Alternatives Considered)

### Phương án A: Apache Kafka
- *Ưu điểm*: Khả năng chịu tải cực khủng (hàng triệu message/giây), lưu trữ lịch sử message bất biến vĩnh viễn trên đĩa cứng.
- *Nhược điểm*: Quá nặng nề và phức tạp (Over-engineering) đối với quy mô dự án hiện tại. Chi phí vận hành hạ tầng ZooKeeper/Kafka Cluster rất lớn và đòi hỏi chuyên môn quản trị hệ thống cao.

### Phương án B: RabbitMQ
- *Ưu điểm*: Chuẩn giao thức AMQP mạnh mẽ, định tuyến message (Routing keys, Exchange types) vô cùng linh hoạt.
- *Nhược điểm*: Tích hợp hàng đợi xử lý tác vụ TypeScript/Node.js không mượt mà và trực quan bằng BullMQ (BullMQ hỗ trợ sẵn kiểu dữ liệu JS, theo dõi tiến trình %, và lập lịch retry trực tiếp bằng code TS).

---

## 📈 4. Hệ quả (Consequences)
- **Tích cực**:
  - Tốc độ xử lý cực nhanh (In-memory) với độ trễ dưới 1ms.
  - Cài đặt và cấu hình siêu nhẹ (Chỉ cần 1 instance Redis duy nhất cho cả caching, pub/sub, và queues).
  - Tận dụng được các tính năng cao cấp của BullMQ: Exponential backoff retry, rate limiting, và dọn dẹp job tự động.
- **Thử thách**:
  - Redis lưu dữ liệu trong RAM ➜ Nếu server Redis bị sập đột ngột mà chưa cấu hình lưu đĩa (AOF/RDB persistence) thì các job đang chờ xử lý trong hàng đợi có nguy cơ bị mất mát. Cần cấu hình lưu trữ bền vững (Persistence) cho Redis trên môi trường Production.
