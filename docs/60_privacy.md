# 60. Data Privacy & Compliance Specification

Tài liệu này đặc tả quy chuẩn thiết kế hệ thống tuân thủ quyền riêng tư dữ liệu theo tiêu chuẩn quốc tế **GDPR (Châu Âu)** và luật bảo vệ dữ liệu cá nhân **PDPA / Nghị định 13 (Việt Nam)** của hệ thống DIGVOS.

---

## 🚦 1. Quyền Được Lãng Quên (Right to be Forgotten - Account Deletion)

Người dùng (Học sinh, Giảng viên, HR) có quyền yêu cầu xóa bỏ hoàn toàn thông tin cá nhân của họ khỏi hệ thống. Khi yêu cầu xóa tài khoản được phê duyệt, hệ thống kích hoạt quy trình xóa sạch dữ liệu tự động trong vòng 7 ngày:

1. **Xóa tệp tin vật lý (Storage Purge)**:
   - Worker chạy ngầm quét tất cả các minh chứng (Evidence) đã nộp của người dùng trên S3/Supabase Storage và xóa vĩnh viễn tệp tin.
2. **Ẩn danh hóa dữ liệu (Data Anonymization)**:
   - Đối với các bản ghi liên quan đến thống kê đào tạo hoặc audit log (ví dụ: Log sự kiện thi CAT, điểm radar lịch sử):
   - Cấm xóa vật lý vì sẽ làm sai lệch dữ liệu báo cáo trung bình của toàn trường/doanh nghiệp.
   - Thay vào đó, hệ thống thực hiện ẩn danh hóa (Anonymization): Gỡ bỏ mối liên kết bằng cách gán `userId = null` hoặc thay thế bằng ID ẩn danh ngẫu nhiên (`anonymous-user-id`). Các cột lưu tên, email, ảnh đại diện, số điện thoại được ghi đè bằng giá trị trống hoặc chuỗi băm ngẫu nhiên.
3. **Blockchain Note (Polygon SBT)**:
   - Soulbound Token (SBT) đã đúc trên Polygon Blockchain là dữ liệu bất biến không thể xóa bỏ vật lý.
   - *Giải pháp*: Smart Contract của DIGVOS có hàm `burn()` (đốt token) thuộc sở hữu của chủ ví. Khi học viên xóa tài khoản, hệ thống sẽ hướng dẫn người dùng ký lệnh gọi hàm `burn` để tự hủy SBT trên ví của mình.

---

## 📄 2. Chính Sách Lưu Trữ Dữ Liệu (Data Retention Policy)

DIGVOS phân loại thời hạn giữ lại dữ liệu tối đa để tối ưu dung lượng bộ nhớ CSDL và tuân thủ pháp lý:

- **Dữ liệu tài khoản chính**: Giữ lại vĩnh viễn cho đến khi người dùng chủ động yêu cầu xóa.
- **Minh chứng nộp (Submissions)**: Giữ lại vĩnh viễn để bảo chứng năng lực, trừ trường hợp tài khoản bị xóa.
- **Event Logs & Audit Logs**: Tự động dọn dẹp và nén lưu trữ lạnh (Cold Storage archive) sau **1 năm**.
- **Lịch sử nhấp chuột / Telemetry**: Tự động xóa vĩnh viễn sau **90 ngày**.

---

## 🍪 3. Quản Lý Đồng Ý (Consent Management UI)

- **Banner đồng ý cookie (Cookie Consent Banner)**:
  - Khi người dùng truy cập website lần đầu, hiển thị banner yêu cầu lựa chọn quyền lưu trữ cookie.
  - Phân chia 3 nhóm cookie rõ ràng:
    1. *Cookie bắt buộc (Essential)*: Lưu session JWT đăng nhập (luôn bật).
    2. *Cookie phân tích (Analytics)*: Đo lường tốc độ tải trang, click chuột (cho phép tắt).
    3. *Cookie marketing*: Quảng cáo (mặc định tắt).
  - Cấm ghi nhận bất kỳ dữ liệu phân tích nào trước khi người dùng nhấn nút "Chấp nhận".

---

## 🔐 4. Mã Hóa Dữ Liệu (Encryption Standards)

- **Mã hóa đường truyền (In-Transit)**:
  - Bắt buộc mã hóa toàn bộ dữ liệu truyền tải giữa Client và Server qua giao thức TLS 1.3 bảo mật cao nhất, cấm kết nối HTTP không mã hóa.
- **Mã hóa lưu trữ (At-Rest)**:
  - Toàn bộ cơ sở dữ liệu PostgreSQL lưu trữ trên ổ đĩa Cloud được cấu hình mã hóa tự động ở tầng phần cứng (AWS EBS Encryption) bằng thuật toán AES-256 để phòng ngừa tin tặc đột nhập vật lý vào trung tâm dữ liệu lấy trộm ổ cứng.
