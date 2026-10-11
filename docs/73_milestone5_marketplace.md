# 73. Marketplace Architecture (Milestone 5)

Tài liệu này đặc tả kiến trúc phân hệ **Marketplace**, là xương sống để các trường đại học (Tenant) chia sẻ chéo, tái sử dụng và thương mại hóa các tài nguyên chất lượng cao như Khung năng lực, Bộ câu hỏi trắc nghiệm, và Rubric chấm bài.

---

## 🛒 1. Định Vị Thực Thể Bằng Adapter Pattern

Marketplace không lưu cứng lại cấu trúc JSON của từng loại tài nguyên. Cấu trúc đó sẽ bị lạc hậu khi schema của hệ thống thay đổi. Thay vào đó, hệ thống sử dụng Adapter Pattern.

- `MarketplaceResource` chỉ đóng vai trò là Lớp Phủ (Wrapper) chứa metadata (Tiêu đề, Mô tả, Giá tiền).
- Trường `resourceType` quy định chặt chẽ bằng **Enum** (`QUESTION_BANK`, `RUBRIC`, `COURSE`, `COMPETENCY_FRAMEWORK`).
- Dựa vào `resourceId` và `resourceType`, Marketplace Adapter sẽ tự động query (JOIN) bảng tương ứng để kéo dữ liệu gốc ra.

---

## 🔄 2. Workflow & Vòng Đời Đóng Góp (Resource Lifecycle)

Đóng góp lên Marketplace phải tuân theo vòng đời trạng thái (Status) rất khắt khe để đảm bảo chất lượng:

1. `DRAFT`: Đang biên soạn, lưu tạm.
2. `SUBMITTED`: Tác giả nhấn Gửi lên hệ thống, chờ kiểm duyệt.
3. `IN_REVIEW`: Cán bộ kiểm duyệt đang xem xét nội dung.
4. `APPROVED`: Đã được duyệt nhưng chưa công khai.
5. `PUBLISHED`: Công khai hiển thị lên Marketplace cho toàn bộ các Tenant khác tìm kiếm và tải xuống.
6. `DEPRECATED`: Tác giả ngừng hỗ trợ phiên bản này, khuyến cáo không nên cài mới.
7. `ARCHIVED`: Đã lưu trữ ẩn.

---

## 📦 3. Versioning (MarketplaceVersion)

Giống hệt hệ thống Git hoặc Docker Hub, mỗi lần tác giả cập nhật Bộ Câu Hỏi và đẩy lên Marketplace, nó sẽ không ghi đè (overwrite) bản cũ. 

Hệ thống sinh ra một `MarketplaceVersion` mới (VD: `v1.0.1`, `v1.1.0`), bao gồm `changelog`. Các Tenant nào đang cài đặt phiên bản `v1.0.0` sẽ không bị ảnh hưởng dữ liệu, nhưng họ sẽ nhận được cảnh báo "Có phiên bản mới" trên UI.

---

## 🔍 4. Công Cụ Tìm Kiếm Cường Độ Cao (Search Service)

Do dữ liệu Marketplace (Question, Course) chứa rất nhiều văn bản dài (Text-heavy), truy vấn `LIKE` của PostgreSQL sẽ trở thành "nút thắt cổ chai" (Bottleneck).

- **Kiến trúc**:
  Tích hợp **OpenSearch / Meilisearch** làm Full-text Search Engine chính thức cho Marketplace.
- **Đồng bộ hóa (Syncing)**:
  Thông qua Event Bus, khi một tài nguyên có event `marketplace.resource.published`, Search Service sẽ bắt lấy và lập chỉ mục (index) dữ liệu đó vào Engine. 

---

## ⭐ 5. Hệ Thống Xếp Hạng Đáng Tin Cậy (Review & Rating)

- **Đánh giá xác thực**: `MarketplaceReview` có trường `verifiedPurchase` để đánh dấu các user thực sự đã Tải/Mua tài nguyên đó, loại bỏ nạn "review ảo" (Spam/Fake reviews).
- **Cơ chế Hữu ích**: Người dùng khác có thể vote "Helpful" (`helpfulCount`) cho bài Review để đẩy những nhận xét chất lượng lên đầu trang.
