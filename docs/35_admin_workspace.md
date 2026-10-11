# 35. Admin Control Center Design

Tài liệu này đặc tả giao diện của **Hệ thống Quản trị Tối cao (Admin Control Center)**, thiết kế để giám sát sức khỏe hệ thống, quản lý đa phân quyền (Multi-tenancy), phê duyệt hồ sơ doanh nghiệp (KYC) và theo dõi nhật ký bất biến (Audit Logs/Event Logs).

---

## 🏢 1. Quản Lý Đa Doanh Nghiệp (Tenant Management)

- **Danh sách Tổ chức / Trường học (Tenants Directory)**:
  - Bảng hiển thị thông tin: Tên Tenant, gói dịch vụ (Free, Pro, Enterprise), ngày hết hạn, số lượng học viên đang hoạt động, và trạng thái (Active, Suspended).
- **Trình cấu hình Tenant mới (Create Tenant Wizard)**:
  - Thiết lập tên miền phụ (subdomain), màu sắc thương hiệu tùy chỉnh (custom primary color) và số lượng ví giới hạn được phép đúc SBT.

---

## 🛡️ 2. Duyệt Doanh Nghiệp (Employers KYC Approvals)

- **Hàng đợi xét duyệt hồ sơ doanh nghiệp**:
  - Xem thông tin đăng ký của doanh nghiệp: Mã số thuế, giấy phép kinh doanh (file ảnh/PDF), website chính thức, và thông tin người liên hệ.
- **Nút hành động nhanh**:
  - Phê duyệt (Approve) ➜ Tự động cấp quyền `EMPLOYER` và mở khóa cổng đối khớp nhân tài.
  - Từ chối (Reject) ➜ Yêu cầu nhập lý do từ chối để gửi email thông báo.

---

## 📑 3. Khung Năng Lực Số & Giám Sát Cấu Hình (Framework Manager)

- **Bản đồ trực quan 21 năng lực DigComp 3.0**:
  - Giao diện dạng cây phân cấp (Tree View) cho phép Admin điều chỉnh mô tả chi tiết của từng level thành thạo (Level 1 đến 8) của các năng lực nếu có thay đổi trong tương lai.
- **Cấu hình ngân hàng câu hỏi & Đề thi CAT**:
  - Giám sát số lượng câu hỏi hiện có của từng kỹ năng và tỷ lệ phân phối độ khó của câu hỏi theo mô hình IRT.

---

## ⚡ 4. Nhật Ký Bất Biến & Sức Khỏe Hệ Thống (Audit Logs & Event Logs)

- **Trình xem nhật ký thời gian thực (Realtime Event Log Viewer)**:
  - Bảng hiển thị các bản ghi trong bảng `EventLog` của Prisma: ID sự kiện, tên sự kiện (ví dụ: `AssessmentCompleted`), Tenant ID, trạng thái (`PENDING`, `PROCESSED`, `FAILED`), số lần thử lại, và payload chi tiết dưới dạng JSON có định dạng màu (Collapsible JSON Viewer).
- **Bộ giám sát Scheduler Outbox**:
  - Hiển thị thống kê số lượng sự kiện đã tự động gửi lại thành công trong vòng 24 giờ qua.

---

## 🖥️ 5. Giám Sát Sức Khỏe Hạ Tầng Hệ Thống (System Health & Observability)

Bảng điều khiển đo lường sức khỏe toàn hệ thống dành cho Admin bao gồm:
- **Thông số phần cứng máy chủ (Server Metrics)**:
  - Tải CPU (%), sử dụng RAM (GB), lưu trữ đĩa (SSD Disk usage), và băng thông mạng thời gian thực.
- **Trạng thái kết nối các bên thứ ba (Service Integration Health)**:
  - **Redis & Event Queue**: Trạng thái hàng đợi BullMQ, Redis memory consumption.
  - **Polygon Node**: Độ trễ kết nối RPC Node Polygon, số dư ví nạp phí gas cho Smart Contract.
  - **Gemini AI API**: Quota API đã dùng và số lượng token khả dụng còn lại trong tháng.
  - **Email Service**: Tỷ lệ gửi email thành công của SendGrid/SES.
  - **Storage**: Dung lượng lưu trữ minh chứng S3 đã dùng.

---

## 🛠️ 6. Cấu Trúc Component Features

```
apps/web/src/features/tenant/
├── components/
│   ├── TenantTable.tsx        # Bảng quản lý danh sách các Tenant
│   └── TenantWizard.tsx       # Form tạo tenant và thiết lập gói SaaS
apps/web/src/features/audit/
├── components/
│   ├── EventLogTable.tsx      # Bảng logs sự kiện thời gian thực
│   └── JSONViewer.tsx         # Trình hiển thị payload JSON thông minh
```
