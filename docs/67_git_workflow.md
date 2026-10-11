# 67. Git Workflow & Conventional Commit Standards

Tài liệu này đặc tả quy trình cộng tác mã nguồn qua Git (Git Workflow), tiêu chuẩn đặt tên nhánh, quy chuẩn viết thông điệp commit (Conventional Commits) và quy trình duyệt Pull Request (PR) của hệ thống DIGVOS.

---

## 🚦 1. Mô Hình Nhánh Đơn Giản Hóa (Branching Model)

DIGVOS áp dụng mô hình Git Flow rút gọn để duy trì tốc độ phát hành nhanh nhưng vẫn đảm bảo tính an toàn cho mã nguồn Production:

- **Nhánh `main` (Production Branch)**:
  - Chỉ chứa mã nguồn đã ổn định tuyệt đối và đang chạy trực tiếp trên môi trường Production.
  - Cấm commit trực tiếp lên nhánh `main`. Mã nguồn chỉ đi vào `main` thông qua PR được merge từ nhánh `release` hoặc `hotfix`.
- **Nhánh `develop` (Integration Branch)**:
  - Nhánh trung tâm của các nhà phát triển. Toàn bộ mã nguồn tính năng mới sau khi code xong sẽ được tích hợp tại đây.
- **Nhánh `feature/*` (Feature Branches)**:
  - Dùng để phát triển tính năng mới hoặc sửa đổi cục bộ. Tách ra từ `develop`.
  - Quy tắc đặt tên: `feature/{issueId}-{short-kebab-name}`
  - *Ví dụ*: `feature/101-student-radar-chart`
- **Nhánh `hotfix/*` (Emergency Patch Branch)**:
  - Dùng để vá lỗi khẩn cấp trực tiếp trên Production. Tách ra từ `main`. After merge into `main`, must merge back into `develop`.
  - Quy tắc đặt tên: `hotfix/{issueId}-{short-kebab-name}`

---

## ✍️ 2. Tiêu Chuẩn Commit (Conventional Commits)

Toàn bộ các commit bắt buộc phải tuân theo cấu trúc Conventional Commits để hệ thống có thể tự động tạo Changelog khi release:

- **Cấu trúc thông điệp**:
  `<type>(<scope>): <description>`
- **Các kiểu Type được chấp nhận**:
  - `feat`: Tính năng mới (Ví dụ: `feat(api): add Outbox Pattern Retry Scheduler`).
  - `fix`: Sửa lỗi (Ví dụ: `fix(web): correct radar display offset on mobile`).
  - `docs`: Cập nhật tài liệu (Ví dụ: `docs(architecture): complete real-time messaging spec`).
  - `style`: Định dạng code (thiếu chấm phẩy, khoảng trắng, không ảnh hưởng logic).
  - `refactor`: Tái cấu trúc mã nguồn không thêm tính năng mới hay sửa lỗi.
  - `perf`: Tối ưu hóa hiệu năng và tốc độ chạy.
  - `test`: Viết thêm hoặc sửa đổi unit/integration tests.
  - `chore`: Cập nhật cấu hình build, dependencies package.json.

---

## 🤝 3. Quy Trình Duyệt Pull Request (PR Review Gate)

Mỗi Pull Request trước khi được phép merge vào `develop` hoặc `main` bắt buộc phải vượt qua các trạm gác cổng sau:
1. **CI Pipeline Status (Xanh lá cây)**:
   - Pipeline GitHub Actions tự động kiểm tra cú pháp (Lint), định dạng (Prettier) và chạy thành công 100% các bài test của Jest/Vitest.
2. **Đồng Thuận Của Con Người (Code Review Approved)**:
   - Phải có tối thiểu **1 Tech Lead** duyệt và phê duyệt (Approve) code.
3. **Quy Tắc Trộn Mã (Squash and Merge)**:
   - Khi merge PR, bắt buộc sử dụng tùy chọn **Squash and Merge** để gộp toàn bộ các commit nháp/thử nghiệm nhỏ của lập trình viên thành duy nhất 1 commit sạch sẽ có thông điệp chuẩn trên nhánh `develop`, tránh làm bẩn lịch sử git (git history).
