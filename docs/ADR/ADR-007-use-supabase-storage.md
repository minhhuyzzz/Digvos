# ADR-007: Sử Dụng Supabase Storage Làm Hệ Thống Lưu Trữ Tệp Tin

- **Trạng thái**: APPROVED
- **Người quyết định**: Software Architect / Tech Lead
- **Ngày**: 2026-07-11

---

## 📋 1. Bối cảnh (Context)
Hệ thống DIGVOS cần lưu trữ một lượng lớn tài liệu học thuật, tệp tin minh chứng (PDF, Hình ảnh, Video thực hành) do học viên tải lên để bảo chứng năng lực, cùng các file báo cáo PDF do hệ thống tự động xuất bản. Các tệp tin này cần được lưu trữ bền vững (Durable), có thể truy cập tốc độ cao qua CDN, được bảo vệ bằng phân quyền nghiêm ngặt, và hỗ trợ API tương thích S3 để dễ dàng di chuyển nhà cung cấp sau này.

---

## 🚀 2. Quyết định (Decision)
Quyết định sử dụng **Supabase Storage** làm dịch vụ lưu trữ đám mây chính thức cho hệ thống:
- Tận dụng giao thức **S3-compatible API** của Supabase để tương tác thông qua thư viện tiêu chuẩn `@aws-sdk/client-s3` ở backend NestJS.
- Sử dụng cơ chế tạo đường dẫn ký trước (Presigned URLs) thời hạn ngắn (15 phút) để cấp quyền cho Client Next.js upload file trực tiếp, đảm bảo an toàn tuyệt đối, không cho phép truy cập tệp tự do khi chưa xác thực.

---

## ⚖️ 3. Các Phương Án Đã Cân Nhắc (Alternatives Considered)

### Phương án A: AWS S3 (Simple Storage Service) trực tiếp
- *Ưu điểm*: Tiêu chuẩn vàng của ngành công nghiệp, độ bền vững 99.999999999% (11 số 9), khả năng mở rộng dung lượng vô hạn.
- *Nhược điểm*: Cấu hình phân quyền IAM và tạo bucket rất phức tạp. Chi phí duy trì cơ bản ban đầu cao hơn so với Supabase.

### Phương án B: Lưu trữ trực tiếp trên ổ đĩa cục bộ của máy chủ (Local Server Disk)
- *Ưu điểm*: Miễn phí, lập trình cực kỳ nhanh bằng các thư viện NodeJS cơ bản (`fs`).
- *Nhược điểm*: **Nguy cơ mất trắng dữ liệu**: Mỗi khi Deploy phiên bản mới, các Docker containers sẽ bị khởi động lại và dọn sạch ổ đĩa cũ ➜ Mất toàn bộ file minh chứng của sinh viên. Không thể scale ngang nhiều máy chủ vì ổ đĩa không được đồng bộ.

---

## 📈 4. Hệ quả (Consequences)
- **Tích cực**:
  - Giao diện console quản trị trực quan cực kỳ thân thiện của Supabase giúp dev team dễ dàng giám sát bucket.
  - Tương thích 100% với S3 API ➜ Nếu sau này hệ thống phình to đạt quy mô hàng triệu người dùng, chúng ta có thể chuyển dịch sang AWS S3 hoặc Cloudflare R2 chỉ bằng cách thay đổi biến môi trường Endpoint, không cần viết lại một dòng code upload nào.
- **Thử thách**:
  - Phụ thuộc hoàn toàn vào hạ tầng mạng và sự ổn định của nhà cung cấp Supabase. Cần xây dựng cơ chế lưu trữ đệm (Fallback local cache) ở backend đề phòng trường hợp Supabase sập nguồn đột ngột.
