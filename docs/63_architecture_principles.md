# 63. Core System Architecture Principles

Tài liệu này đóng vai trò là "Hiến pháp kiến trúc" (Architecture Constitution) của DIGVOS. Mọi quyết định thiết kế mã nguồn, mở rộng tính năng bắt buộc phải tuân thủ nghiêm ngặt 5 nguyên lý cốt lõi dưới đây.

---

## 🏛️ 1. Nguyên Lý Độc Lập Nguồn Sự Thật (Single Source of Truth - SSOT)

- **Định nghĩa**: Một mảnh dữ liệu hoặc một nghiệp vụ chỉ được phép có một nơi lưu trữ và xử lý duy nhất chịu trách nhiệm hoàn toàn về nó.
- **Thực tế áp dụng**:
  - NestJS API Server là SSOT cho toàn bộ dữ liệu nghiệp vụ (Năng lực, Điểm số, Thi CAT). Cấm lưu trữ dữ liệu này phân tán trong Server Actions của Next.js hoặc local storage của Client.
  - Phổ năng lực của học viên được cập nhật thông qua việc lắng nghe và tính toán lại từ Event Bus, không được phép sửa điểm trực tiếp bằng các truy vấn thủ công không qua Event.

---

## 🌀 2. Thiết Kế Hướng Tên Miền (Domain-Driven Design - DDD)

- **Định nghĩa**: Cấu trúc mã nguồn phải phản ánh trực quan ranh giới của các nghiệp vụ thực tế (Bounded Contexts) thay vì tổ chức theo cấu trúc kỹ thuật thuần túy.
- **Thực tế áp dụng**:
  - Mã nguồn được gom cụm thành các Bounded Contexts độc lập: `competency` (quản lý năng lực), `assessment` (thi đánh giá thích ứng), `evidence` (duyệt minh chứng), `certification` (đúc chứng chỉ blockchain).
  - Giao tiếp xuyên biên giới domain bắt buộc phải đi qua **Event Bus** bất đồng bộ hoặc thông qua các Interfaces được định nghĩa chặt chẽ (Contracts), cấm liên kết cứng (tight coupling) database chéo giữa các modules.

---

## 📐 3. Kiến Trúc Lục Giác / Tách Biệt Hạ Tầng (Ports & Adapters)

- **Định nghĩa**: Tách biệt hoàn toàn phần cốt lõi nghiệp vụ (Business Logic/Domain Services) khỏi các chi tiết công nghệ hạ tầng bên ngoài (Database, API Transport, Blockchain, Mail, Storage).
- **Thực tế áp dụng**:
  - **Core Domain Services**: Chỉ chứa các thuật toán tính toán điểm thích ứng IRT, logic thăng cấp năng lực. Lớp này không được biết về Prisma, S3, hay Polygon.
  - **Ports & Adapters**: Lớp cơ sở hạ tầng (`infrastructure/`) thực thi các cổng kết nối (Prisma database, S3 Storage, Polygon RPC node). Nếu sau này chuyển đổi cơ sở dữ liệu từ PostgreSQL sang MongoDB hoặc chuyển dịch blockchain từ Polygon sang Avalanche, chúng ta chỉ cần viết lại lớp Adapter hạ tầng mà không cần chạm vào một dòng code thuật toán nghiệp vụ cốt lõi nào.

---

## 📃 4. Thiết Kế Hướng Hợp Đồng & Kiểm Thử (Contract-First & TDD)

- **Định nghĩa**: Quy chuẩn hóa giao tiếp trước khi viết mã logic thực thi.
- **Thực tế áp dụng**:
  - Khi phát triển tính năng mới, backend và frontend phải thống nhất định nghĩa API dưới dạng TypeScript interfaces trong package chung `@digvos/api-contract` trước.
  - Áp dụng triệt để quy trình **Test-Driven Development (TDD)**: Viết các bài test mô tả hành vi mong muốn trước (Red phase) ➜ Viết code logic tối thiểu để pass test (Green phase) ➜ Tiến hành tối ưu hóa làm sạch mã nguồn (Refactor phase).

---

## ⚡ 5. Hệ Thống Định Hướng Sự Kiện (Event-Driven Architecture)

- **Định nghĩa**: Hệ thống hoạt động dựa trên các phản ứng trước các thay đổi trạng thái (Events) thay vì gọi hàm trực tiếp theo chuỗi tuần tự (Request-Reply chain).
- **Thực tế áp dụng**:
  - Khi học sinh nộp bài thi CAT thành công ➜ API lập tức trả về status 200 hoàn thành cho client và phát đi sự kiện `AssessmentCompleted` lên Event Bus cục bộ.
  - Các service phụ trợ như `CompetencyListener`, `NotificationService`, `AnalyticsEngine` sẽ tự động đón nhận sự kiện này ngầm và xử lý độc lập. Nếu một service phụ trợ bị sập, luồng chính nộp bài của sinh viên vẫn hoạt động bình thường, đảm bảo hệ thống có độ chịu lỗi rất cao (High Fault Tolerance).
