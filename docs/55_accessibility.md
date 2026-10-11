# 55. Frontend Accessibility (A11y) Specification

Tài liệu này đặc tả quy chuẩn thiết kế khả năng tiếp cận giao diện (Accessibility - A11y) của DIGVOS, đảm bảo hệ thống thân thiện với tất cả mọi người dùng, bao gồm cả những người khuyết tật sử dụng trình đọc màn hình hoặc điều khiển bằng phím tắt.

---

## 🚦 1. Tiêu Chuẩn WCAG 2.2 Level AA

DIGVOS cam kết tuân thủ tiêu chuẩn thiết kế tiếp cận **WCAG 2.2 Level AA**:
- **Độ tương phản màu sắc (Color Contrast)**:
  - Tất cả các văn bản thông thường bắt buộc phải đạt độ tương phản tối thiểu **4.5:1** so với màu nền.
  - Các văn bản lớn (bold hoặc size >= 18px) bắt buộc đạt tối thiểu **3:1**.
  - Kiểm tra độ tương phản tự động thông qua công cụ Chrome DevTools Lighthouse hoặc axe-core.
- **Không chỉ dùng màu sắc truyền tin**:
  - Cấm dùng màu sắc đơn lẻ để báo lỗi hay thành công.
  - *Ví dụ*: Card báo lỗi bên cạnh viền đỏ phải hiển thị kèm icon cảnh báo và mô tả bằng chữ để người mù màu vẫn hiểu được thông tin.

---

## ⌨️ 2. Điều Hướng Bằng Bàn Phím (Keyboard Navigation & Focus Trap)

- **Chỉ thị Focus trực quan (Focus Indicator)**:
  - Khi người dùng nhấn phím `Tab` để di chuyển qua các nút bấm, input, hay thẻ, đối tượng đang focus bắt buộc phải hiển thị một đường viền rõ nét (Ví dụ: `outline-none focus-visible:ring-2 focus-visible:ring-brand-500`).
  - Cấm tắt focus outline mặc định mà không thay thế bằng vòng nét tương đương.
- **Bẫy tiêu điểm (Focus Trap)**:
  - Khi một cửa sổ Modal Popover (Ví dụ: Trình làm bài thi CAT hoặc Hộp thoại xác minh SBT) mở lên:
    1. Tiêu điểm bàn phím bắt buộc phải được khóa (Trapped) bên trong cửa sổ đó. Phím `Tab` chỉ được di chuyển tuần hoàn giữa các nút trong modal.
    2. Nhấn phím `Escape` (ESC) bắt buộc phải đóng modal lại và trả tiêu điểm về nút kích hoạt trước đó.

---

## 🏷️ 3. Thẻ Nhãn Trình Đọc Màn Hình (ARIA Attributes)

- **Semantic HTML**: Ưu tiên sử dụng thẻ HTML5 có ngữ nghĩa rõ ràng: `<header>`, `<nav>`, `<aside>`, `<main>`, `<footer>`, `<button>`, `<article>`.
- **Nhãn ARIA (ARIA Labels)**:
  - Đối với các nút bấm chỉ chứa icon (như nút Close `X` hoặc nút chuông thông báo): Bắt buộc phải gắn thuộc tính `aria-label` để trình đọc màn hình (Screen Reader) có thể đọc to tên hành động:
    ```tsx
    <button aria-label="Đóng cửa sổ làm bài">
      <XIcon />
    </button>
    ```
  - Đối với các biểu đồ phức tạp (như Radar Chart): Gắn thuộc tính `aria-describedby` trỏ tới một bảng mô tả dữ liệu văn bản thay thế ngầm (Visually Hidden Table) để người khiếm thị vẫn nghe được điểm số của mình.

---

## 🚀 4. Kiểm Thử Khả Năng Tiếp Cận Tự Động (A11y Automated Testing)

- Tích hợp package `@axe-core/playwright` vào luồng kiểm thử giao diện E2E.
- Viết test case tự động quét và báo cáo tất cả các lỗi thiếu thẻ alt ảnh, thiếu nhãn aria, hoặc lỗi tương phản màu sắc trước khi xuất bản bản build.
- Cấu hình plugin `eslint-plugin-jsx-a11y` trong ESLint để nhắc nhở và ngăn chặn lỗi A11y ngay trong lúc lập trình ở VS Code.
