# Quy chuẩn viết Báo cáo Khoa học Euréka & Khử AI Slop

Tệp quy tắc này hướng dẫn và ràng buộc tuyệt đối hành vi của Agent khi viết nội dung báo cáo nghiên cứu và biên tập tài liệu học thuật.

---

## 1. Chuẩn mực Văn phong Khoa học & Khử AI Slop (Academic Prose & Anti-AI Slop)
*   **Cấm tuyệt đối định dạng liệt kê "Từ khóa: Giải thích"**: Không viết theo kiểu danh sách template chatbot (`* Bối cảnh: ...`, `* Mục tiêu: ...`, `* Phương pháp: ...`, `* Kết quả: ...`, `* Tầng 1: ...`). Toàn bộ nội dung phải được viết dưới dạng **văn xuôi học thuật liên tục (Academic Discursive Prose)** với các đoạn văn hoàn chỉnh (PEEL/TEEL structure), có câu chủ đề, luận cứ khoa học, phân tích chuyên sâu và các liên từ chuyển tiếp mạch lạc.
*   **Cấm lạm dụng mở ngoặc chèn tiếng Anh (No Parenthetical English Glossing)**: Tiếng Việt học thuật đã có đầy đủ thuật ngữ chuẩn mực. Viết trực tiếp bằng tiếng Việt tự nhiên và chuẩn xác (ví dụ: *thiên lệch xác nhận, buồng vang, con đường ngoại vi, thông tin sai lệch, mô hình dịch tễ, trắc lượng thư mục, mô hình hóa chủ đề*). Tuyệt đối không mở ngoặc đính kèm tiếng Anh sau mỗi danh từ. Chỉ mở ngoặc đúng 1 lần khi giới thiệu từ viết tắt kỹ thuật quốc tế phổ biến (đã có trong Danh mục từ viết tắt).
*   **Dịch 100% tiêu đề nghiên cứu nước ngoài**: Toàn bộ các công trình quốc tế khi lược khảo bắt buộc phải có tiêu đề tiếng Việt học thuật chuẩn xác kèm theo tên gốc tiếng Anh trong ngoặc đơn sau đó.
*   **Loại bỏ sáo rỗng AI**: Tuyệt đối không dùng các câu mở đầu rập khuôn (*"Trong bối cảnh kỷ nguyên số bùng nổ..."*, *"Hơn thế nữa..."*, *"Đáng kinh ngạc là..."*). Đi thẳng vào luận điểm, bản chất lý thuyết và số liệu thực chứng.
*   **Ngôi kể khách quan**: Không dùng ngôi thứ nhất (*"tôi"*, *"chúng tôi"*, *"nhóm tác giả"*). Sử dụng thể khách quan (*"Nghiên cứu này tiến hành..."*, *"Kết quả phân tích cho thấy..."*).

---

## 2. Liêm chính Học thuật & Chi tiết hóa Chuyên sâu (Rigor & Depth)
*   **Mở rộng dung lượng và đào sâu học thuật**: Công trình phải đạt chuẩn quy mô nghiên cứu toàn diện (>35.000 - 45.000 từ, ~100 trang). Mọi khái niệm phải có định nghĩa nguồn, công thức toán học tường minh (hệ phương trình SIR4OSN, LDA Bayes, UMAP, HDBSCAN, c-TF-IDF, Độ trung tâm igraph) và phân tích định tính sâu sắc.
*   **Khai thác dữ liệu thực chứng**: Tận dụng toàn diện kết quả thực nghiệm từ 684 bài báo Scopus và 21 bài báo PDF đại diện để đối chiếu, so sánh và chỉ ra các khoảng trống tri thức (Research Gaps).
*   **Chuẩn trích dẫn APA 7th**: Mọi luận điểm tham chiếu bắt buộc phải gắn mã trích dẫn nguồn trong văn bản (in-text citation) đồng bộ 100% với Danh mục tài liệu tham khảo ở cuối báo cáo.

---

## 3. Quy trình Biên dịch Báo cáo (Compilation Pipeline)
*   Tất cả nội dung báo cáo được viết tách biệt tại từng thư mục từ `chapter_0` đến `chapter_5`, `chapter_6` và `appendix`. Sau khi chỉnh sửa, chạy lệnh biên dịch:
    ```bash
    python scripts/compile_report.py
    ```
*   Đầu ra tổng hợp chính thức duy nhất là `report/baocao_hoanchinh.md`.
