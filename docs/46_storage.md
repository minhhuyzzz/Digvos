# 46. File Upload & Cloud Storage Architecture

Tài liệu này đặc tả kiến trúc tải lên (File Upload), kiểm soát bảo mật tệp tin, và giải pháp lưu trữ đám mây (Cloud Storage) cho hệ thống DIGVOS.

---

## 🏛️ 1. Quy Trình Tải Lên Qua Đường Dẫn Ký Trước (Presigned URLs)

Để giải phóng băng thông cho máy chủ NestJS Backend, DIGVOS cấm tải trực tiếp các tệp tin lớn qua API Server (Multipart upload). Thay vào đó, toàn bộ tệp tin minh chứng (Evidence) hoặc ảnh đại diện được tải lên thông qua **S3/Supabase Storage Presigned URL**:

```
[NextJS Client] -- 1. Yêu cầu tải file (Tên, Size) --> [NestJS API]
[NextJS Client] <-- 2. Trả về Presigned URL & S3 Key -- [NestJS API]
[NextJS Client] -- 3. Upload file trực tiếp (PUT) ----> [Supabase S3 Storage]
[NextJS Client] -- 4. Gửi URL file hoàn tất nộp ------> [NestJS API]
```

- **Lợi ích**: API Server không cần lưu trữ tệp tạm thời trong ổ đĩa cục bộ, loại bỏ nguy cơ quá tải đĩa cứng (Disk exhaustion) khi hàng ngàn sinh viên nộp bài cùng lúc.

---

## 🛡️ 2. Chính Sách Bảo Mật Tệp Tin (Security & Scan Policies)

Tất cả các tệp tin tải lên từ người dùng là mối đe dọa an ninh tiềm tàng (mã độc, shell script ẩn dạng ảnh). Hệ thống áp dụng 3 lớp bảo vệ:

1. **Giới Hạn Dung Lượng & Định Dạng (Strict MIME-type & Size Limits)**:
   - Hồ sơ PDF/Ảnh minh chứng: Tối đa `10 MB`. Chỉ nhận `application/pdf`, `image/jpeg`, `image/png`.
   - Video minh chứng thực hành: Tối đa `50 MB`. Chỉ nhận `video/mp4`, `video/quicktime`.
   - File nén mã nguồn dự án (zip): Tối đa `20 MB`.
2. **Kiểm Tra Định Dạng Thật (MIME Magic-number Check)**:
   - Backend sử dụng thư viện đọc magic bytes đầu tệp để xác thực định dạng thật, đề phòng trường hợp tin tặc đổi đuôi file `.sh` hoặc `.exe` thành `.jpg`.
3. **Quét Mã Độc Tự Động (Virus Scanning)**:
   - Sau khi tệp tải lên S3 thành công, một sự kiện (Event) được kích hoạt kích hoạt Lambda Function hoặc Background Worker gửi tệp qua bộ quét mã độc **ClamAV**.
   - Nếu tệp sạch ➜ Trạng thái của Submission đổi sang `READY`.
   - Nếu phát hiện mã độc ➜ Tự động xóa tệp khỏi S3, đánh dấu Submission là `QUARANTINED` (Cách ly) và gửi email cảnh báo bảo mật cho quản trị viên.

---

## 📦 3. Tải Lên Phân Đoạn (Chunk / Multipart Upload)

- Đối với các tệp video thực hành lớn hơn `15 MB`:
  - Frontend Next.js tự động chia nhỏ tệp thành các mảnh (Chunks) có kích thước cố định `5 MB`.
  - Thực hiện tải lên song song từng mảnh qua các API Presigned Multipart Upload của S3.
  - Khi hoàn thành tất cả các mảnh, gọi API S3 Complete Multipart để máy chủ S3 tự động ghép lại thành tệp hoàn chỉnh, đảm bảo luồng tải ổn định ngay cả khi mạng chập chờn.

---

## 🚀 4. Phân Phối Tốc Độ Cao (CDN Integration)

- Toàn bộ các minh chứng đã được duyệt công khai hoặc các tài nguyên học tập tĩnh được phân phối thông qua **CDN Cloudflare / AWS CloudFront**.
- CDN tự động lưu bộ nhớ đệm (Cache) ở các máy chủ vùng gần học viên nhất, giảm tải 90% lượt tải trực tiếp từ Supabase Storage và tăng tốc độ hiển thị file PDF/Video lên dưới 100ms.
