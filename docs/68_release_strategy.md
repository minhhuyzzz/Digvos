# 68. Release & Deployment Strategy Specification

Tài liệu này đặc tả quy trình phát hành phiên bản (Release Strategy), quản lý phiên bản theo chuẩn Semantic Versioning, sử dụng cờ tính năng (Feature Flags) và quy trình khôi phục nhanh (Rollback) khi gặp sự cố trên môi trường Production của DIGVOS.

---

## 🏷️ 1. Quản Lý Phiên Bản Tiêu Chuẩn (Semantic Versioning 2.0.0)

DIGVOS áp dụng quy chuẩn đặt tên phiên bản định dạng: `MAJOR.MINOR.PATCH`
- **`MAJOR` (Thay đổi lớn)**: Tăng khi có các cập nhật phá vỡ tương thích ngược API (Breaking changes) hoặc thay đổi hoàn toàn kiến trúc dữ liệu.
- **`MINOR` (Tính năng mới)**: Tăng khi thêm mới các module nghiệp vụ, tính năng mới hoặc API mới mà vẫn tương thích ngược (Backward-compatible).
- **`PATCH` (Vá lỗi)**: Tăng khi phát hành các bản vá lỗi nhỏ hoặc cập nhật tối ưu bảo mật mà không làm thay đổi API contract.
- *Ví dụ*: `v0.3.0-foundation` ➜ `v0.4.0-architecture-frozen` ➜ `v1.0.0-gold-release`.

---

## 🚩 2. Cờ Tính Năng (Feature Flags Strategy)

Để duy trì triết lý tích hợp liên tục (Continuous Integration) mà không làm ảnh hưởng đến trải nghiệm người dùng khi tính năng lớn đang viết dở dang:
- **Nguyên tắc**: Toàn bộ các tính năng mới có thời gian phát triển dài (> 3 ngày) bắt buộc phải được bọc trong một **Feature Flag**:
```typescript
if (featureFlags.isEnabled('ENTERPRISE_KANBAN_PIPELINE')) {
  renderKanbanPipeline();
} else {
  renderCandidateClassicList();
}
```
- **Thực thi**:
  - Giai đoạn đầu: Sử dụng cấu hình biến môi trường hoặc tệp JSON cấu hình tĩnh tải động từ API Server để bật/tắt nhanh tính năng.
  - Giai đoạn mở rộng: Tích hợp dịch vụ quản lý cờ tính năng tập trung (như LaunchDarkly hoặc Unleash).
  - **Quy tắc dọn dẹp (Feature Flag Cleanup)**: Trong vòng 2 tuần sau khi tính năng đã được kích hoạt chạy ổn định 100% trên Production, lập trình viên bắt buộc phải tạo 1 PR dọn dẹp (cleanup chore) xóa bỏ hoàn toàn Feature Flag này và các nhánh logic cũ để tránh tích tụ nợ kỹ thuật (technical debt).

---

## 🚀 3. Triển Khai Cuốn Chiếu & Canary (Canary & Blue-Green)

- **Triển khai cuốn chiếu (Rolling Update)**:
  - Máy chủ AWS ECS tự động thay thế từng phần các container cũ bằng các container mới. Đảm bảo luôn duy trì tối thiểu 50% số lượng container hoạt động để chịu tải trong lúc cập nhật.
- **Canary Deployments (Phát hành thử nghiệm nhỏ)**:
  - Đối với các tính năng ảnh hưởng trực tiếp tới cơ sở dữ liệu lớn hoặc giao dịch blockchain:
  - Cấu hình Load Balancer điều phối chỉ **5%** lượng truy cập ngẫu nhiên của người dùng sang cụm máy chủ phiên bản mới (Canary group).
  - Giám sát biểu đồ lỗi Sentry/Grafana của Canary group trong vòng 24 giờ. Nếu không phát sinh lỗi bất thường, nâng dần tỷ lệ lên 25%, 50%, và cuối cùng là 100%.

---

## 🚨 4. Giao Thức Khôi Phục Nhanh (Rollback Protocol)

Khi phát hiện lỗi nghiêm trọng trên Production sau khi triển khai phiên bản mới:
1. **Rollback Ứng Dụng (App Rollback)**:
   - Thay vì tìm cách sửa lỗi nóng (hot patch) ngay tại chỗ gây rối loạn, Ops team thực thi lệnh điều hướng Load Balancer trỏ ngược về Docker Image phiên bản ổn định gần nhất trong vòng 10 giây.
2. **Rollback Cơ Sở Dữ Liệu (Database Rollback)**:
   - **Quy tắc thiết kế Schema tương thích ngược**: Cấm thực hiện các migrations xóa cột hoặc đổi tên cột cũ trực tiếp trên Database. Bắt buộc phải duy trì cột cũ song song với cột mới trong ít nhất 1 phiên bản (mô hình Expand and Contract) để đảm bảo nếu ứng dụng phải rollback về phiên bản cũ, phiên bản cũ vẫn có thể đọc và ghi bình thường vào database mà không bị crash.
