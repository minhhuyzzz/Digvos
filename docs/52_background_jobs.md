# 52. Background Jobs & Distributed Queue Architecture

Tài liệu này đặc tả kiến trúc hàng đợi xử lý tác vụ ngầm (Background Jobs & Message Queue) của DIGVOS, đảm bảo hệ thống không bị nghẽn khi thực hiện các tác vụ nặng hoặc giao dịch blockchain chậm.

---

## 🏛️ 1. Lựa Chọn Công Nghệ (BullMQ & Redis Cluster)

Hệ thống sử dụng **BullMQ** chạy trên nền **Redis** để quản lý hàng đợi phân tán. 
- *Ưu điểm*: Hỗ trợ quản lý trạng thái job cực tốt (Active, Waiting, Completed, Failed, Delayed), hỗ trợ lập lịch chạy lại (Retries), giới hạn tần suất (Rate limiting), và gom cụm concurrency xử lý song song.

---

## 📋 2. Cấu Trúc Các Hàng Đợi Lõi (Queue Registry)

Hệ thống phân chia thành 5 hàng đợi chuyên biệt để tối ưu tài nguyên:

1. **`mint-sbt-queue` (Hàng đợi đúc blockchain)**:
   - *Tác vụ*: Gửi giao dịch đúc Soulbound Token lên mạng Polygon.
   - *Tính chất*: Tốc độ chậm (lệ thuộc thời gian đào block của blockchain 2-5 giây).
   - *Concurrency*: `1` (Xử lý tuần tự tránh lỗi trùng nonce ví gửi gas).
2. **`virus-scan-queue` (Hàng đợi quét file)**:
   - *Tác vụ*: Đẩy tệp tin minh chứng qua ClamAV để rà soát mã độc.
   - *Tính chất*: Nặng về CPU.
   - *Concurrency*: `5`.
3. **`pdf-generator-queue` (Hàng đợi in ấn)**:
   - *Tác vụ*: Kết xuất biểu đồ radar và năng lực học sinh ra file PDF báo cáo.
   - *Tính chất*: Nặng về RAM (sử dụng Puppeteer không đầu).
   - *Concurrency*: `2`.
4. **`email-queue` (Hàng đợi gửi thư)**:
   - *Tác vụ*: Gửi email thông báo điểm, mời phỏng vấn, báo cáo định kỳ.
   - *Tính chất*: Phụ thuộc kết nối SES/SendGrid bên thứ ba.
   - *Concurrency*: `10`.
5. **`ai-analysis-queue` (Hàng đợi chấm bài AI)**:
   - *Tác vụ*: Đẩy văn bản/PDF minh chứng qua Gemini API để phân tích gợi ý rubrics.
   - *Concurrency*: `4`.

---

## 🛡️ 3. Chính Sách Thử Lại & Xử Lý Lỗi (Retry & DLQ Policy)

- **Exponential Backoff**: Khi một job kết nối bên thứ ba thất bại (Ví dụ: Node Polygon lag, API Gemini quá tải):
  - Hệ thống tự động thử lại tối đa **5 lần**.
  - Giãn cách thử lại tăng dần: Lần 1 sau 10s, lần 2 sau 30s, lần 3 sau 90s, lần 4 sau 5 phút.
- **Hàng đợi lỗi chết (Dead Letter Queue - DLQ)**:
  - Nếu một job thất bại vượt quá 5 lần thử lại, BullMQ tự động chuyển job đó sang trạng thái `FAILED`.
  - Một listener lắng nghe sự kiện `failed` của BullMQ sẽ lập tức:
    1. Ghi nhận lỗi chi tiết vào bảng `EventLog` trong database ở trạng thái `FAILED`.
    2. Đẩy thông báo khẩn cấp (Critical Alert JSON) về kênh Discord/Slack hỗ trợ của Dev team để can thiệp thủ công (Manual review & retry).

---

## 📂 4. Tổ Chức Thư Mục Mã Nguồn Workers

Các hàng đợi và Workers được xây dựng và đóng gói hoàn toàn bên trong lớp cơ sở hạ tầng của Backend:

```
apps/api/src/infrastructure/jobs/
├── queues/
│   ├── sbt.queue.ts        # Định nghĩa sbt-mint-queue
│   └── email.queue.ts      # Định nghĩa email-queue
├── workers/
│   ├── sbt.worker.ts       # Logic lắng nghe và đúc SBT
│   ├── virus.worker.ts     # Logic kết nối ClamAV quét file
│   └── email.worker.ts     # Logic đóng gói gửi thư
└── jobs.module.ts          # Đăng ký BullModule của NestJS
```
- **Quy chuẩn lập trình**: Các Worker bắt buộc phải sử dụng `Job` instance của BullMQ để liên tục cập nhật tiến độ phần trăm (`job.progress(50)`) giúp client có thể giám sát tiến trình trực quan thời gian thực qua giao diện SSE.
