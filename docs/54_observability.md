# 54. System Observability & Monitoring Architecture

Tài liệu này đặc tả kiến trúc đo lường (Observability) của DIGVOS, bao gồm thu thập chỉ số (Metrics), lưu vết phân tán (Tracing), kiểm tra sức khỏe (Health Checks) và cảnh báo tự động (Alerting).

---

## 🚦 1. Kiểm Tra Sức Khỏe Tự Động (Health Checks)

Hệ thống cung cấp Endpoint `/api/v1/health` được xây dựng bằng `@nestjs/terminus` để các bộ cân bằng tải (Load Balancers) hoặc Kubernetes kiểm tra tình trạng sống/chết (Liveness/Readiness probe) của máy chủ:

- **Các chỉ số kiểm tra (Health Indicators)**:
  - **Database**: Thực hiện truy vấn nhanh `SELECT 1` tới PostgreSQL để kiểm tra kết nối.
  - **Redis**: Đọc và ghi một key nháp để xác định Redis đang hoạt động.
  - **Storage**: Gửi truy vấn HeadObject tới Supabase S3 Storage.
  - **Disk & Memory**: Cảnh báo nguy hiểm nếu bộ nhớ trống của máy chủ `< 10%` hoặc dung lượng đĩa cứng `< 5%`.
- **Payload trả về chuẩn**:
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" },
    "storage": { "status": "up" }
  },
  "error": {},
  "details": {}
}
```

---

## 📊 2. Thu Thập Chỉ Số Vận Hành (Metrics Collection with Prometheus)

Backend NestJS tích hợp thư viện `prom-client` tự động xuất các chỉ số nghiệp vụ dưới định dạng chuẩn Prometheus tại endpoint bảo mật `/metrics` (chỉ cho phép IP nội bộ của Prometheus Server truy cập):

- **Các chỉ số lõi cần đo lường (Core Metrics)**:
  - `http_request_duration_seconds`: Đo lường độ trễ (latency) của các API theo từng route.
  - `db_connection_pool_size`: Số lượng kết nối active và idle trong Prisma pool.
  - `queue_backlog_count`: Số lượng job đang bị kẹt hoặc chờ xử lý trong BullMQ.
  - `third_party_api_latency_seconds`: Đo lường độ trễ gọi các dịch vụ ngoài (Gemini API, Polygon RPC node, SES email node).

---

## 🔍 3. Lưu Vết Phân Tán (Distributed Tracing with OpenTelemetry)

Để gỡ lỗi nhanh trên môi trường microservices hoặc monorepo phức tạp:
- **Tích hợp OpenTelemetry (OTel)**:
  - Tự động gán một mã định danh duy nhất `traceId` vào HTTP header của mỗi request đi vào hệ thống.
  - OTel Tracer tự động ghi nhận thời gian chạy của từng tầng:
    `NextJS Client ➜ NestJS Gateway ➜ Controller ➜ Service ➜ Prisma Database query`.
  - Dữ liệu tracing được đẩy về bộ lưu trữ **Jaeger** hoặc **AWS X-Ray** giúp lập trình viên nhìn thấy trực quan sơ đồ nút (Trace Map) để phát hiện ra hàm SQL nào đang bị nghẽn (bottleneck).

---

## 🚨 4. Trực Quan Hóa & Cảnh Báo (Grafana & Sentry)

- **Bảng điều khiển Grafana (Grafana Dashboards)**:
  - Tổng hợp dữ liệu từ Prometheus để vẽ biểu đồ tài nguyên CPU/RAM, số lượng người dùng online, tốc độ đúc SBT thành công, và tỷ lệ lỗi 5xx.
- **Cảnh báo lỗi tức thời Sentry (Realtime Error Alerting)**:
  - Sentry được cấu hình bọc toàn bộ mã nguồn của cả Next.js và NestJS.
  - Khi có lỗi runtime chưa được xử lý (uncaught exception), Sentry tự động thu thập stack trace, thiết bị người dùng, phiên bản git commit, và gửi thông báo khẩn cấp qua kênh Discord/Slack kèm liên kết phân tích chi tiết.
- **Quy tắc cảnh báo**: Cảnh báo chỉ kích hoạt khi tỷ lệ lỗi HTTP 500 vượt quá `1%` tổng số request trong vòng 5 phút, để tránh làm loãng thông tin của Dev team.
