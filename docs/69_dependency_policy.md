# 69. Third-Party Dependency & Library Inclusion Policy

Tài liệu này đặc tả quy định quản lý, rà soát và cài đặt các thư viện bên thứ ba (Dependencies) trong monorepo của DIGVOS, nhằm bảo vệ mã nguồn dự án khỏi các nguy cơ lỗ hổng bảo mật chuỗi cung ứng (Supply Chain Attacks), xung đột giấy phép pháp lý và sự phình to vô ích của bundle size (Dependency Bloat).

---

## 🚫 1. Quy Trình Cài Đặt Thư Viện Mới (Dependency Review)

- **Nguyên tắc**: Cấm lập trình viên tự ý chạy lệnh `npm install` hoặc `yarn add` các package mới vào dự án nếu chưa qua xét duyệt.
- **Quy trình phê duyệt**:
  1. Lập trình viên đề xuất thư viện mới cần cài đặt kèm lý do tại kênh thảo luận kỹ thuật.
  2. Tech Lead kiểm tra các tiêu chí: Số lượng sao GitHub, tần suất cập nhật gần đây (trong vòng 6 tháng), kích thước bundle thực tế (qua Bundlephobia), và giấy phép sử dụng.
  3. Chỉ khi được phê duyệt, lập trình viên mới tiến hành cài đặt và commit file `package-lock.json` tương ứng.

---

## ⚖️ 2. Quy Định Về Giấy Phép Bản Quyền (License Restrictions)

Để bảo vệ quyền sở hữu trí tuệ và bí mật công nghệ mã nguồn đóng của sản phẩm Enterprise SaaS DIGVOS, hệ thống phân chia giấy phép thư viện thành 2 nhóm rõ rệt:

### A. Giấy phép được phép sử dụng (Permissive Licenses)
- **MIT, Apache 2.0, BSD (2-Clause / 3-Clause)**: Cho phép sử dụng, sửa đổi và phân phối thương mại thoải mái mà không bắt buộc phải công khai mã nguồn chính của DIGVOS.

### B. Giấy phép cấm tuyệt đối (Forbidden Copyleft Licenses)
- **GPL (v2 / v3), AGPL, LGPL**: Đây là các giấy phép "lây nhiễm" (viral copyleft). Nếu chúng ta nhúng một thư viện GPL vào codebase, luật pháp yêu cầu chúng ta bắt buộc phải mở mã nguồn (Open Source) toàn bộ hệ thống DIGVOS cho công chúng.
- **Chốt chặn tự động**: Cấu hình công cụ quét giấy phép tự động (ví dụ `license-checker` hoặc `npm-license-crawler`) chạy trong CI Pipeline để phát hiện và ngăn chặn lập tức PR chứa package vi phạm.

---

## 🧩 3. Ưu Tiên Giải Pháp Native & Phòng Tránh Trùng Lặp

- **Ưu tiên Native**: Cấm cài đặt các package siêu nhỏ (Micro-packages) làm các tác vụ cơ bản mà JavaScript/Node.js hiện đại đã hỗ trợ sẵn:
  - *Ví dụ*: Cấm cài đặt `lodash` chỉ để dùng hàm clone hoặc map (ưu tiên JS native ES6+). Cấm cài đặt `left-pad`, `is-number`.
- **Tránh trùng lặp (Dependency Redundancy)**:
  - Trước khi cài đặt một thư viện tiện ích (như xử lý ngày tháng), lập trình viên phải kiểm tra xem trong monorepo đã có thư viện tương tự chưa.
  - *Quy chuẩn*: Thống nhất dùng duy nhất một thư viện xử lý ngày tháng là `date-fns`, cấm cài đặt thêm `moment` hoặc `dayjs` ở các submodule khác để tránh phình to bundle size.

---

## 🛡️ 4. Quản Lý Lỗ Hổng & Ghim Phiên Bản (Dependency Pinning)

- **Ghim phiên bản chính xác (Exact Versioning)**:
  - Trong `package.json`, cấm sử dụng ký tự caret `^` hoặc tilde `~` trước số phiên bản của các package cốt lõi (như Prisma, NestJS, NextJS) để đề phòng trường hợp thư viện tự cập nhật bản minor chứa breaking changes làm hỏng build đột ngột.
  - Sử dụng số phiên bản chính xác: `"prisma": "5.10.0"`.
- **Quét lỗ hổng bảo mật tự động (Security Vulnerability Audit)**:
  - Trong bước chạy CI (GitHub Actions), cấu hình lệnh quét bảo mật:
    `npm audit --audit-level=high`
  - Nếu phát hiện thư viện nào chứa lỗ hổng bảo mật ở mức `High` hoặc `Critical`, pipeline tự động đánh fail build và ngăn chặn merge PR cho đến khi thư viện đó được nâng cấp lên phiên bản sạch.
