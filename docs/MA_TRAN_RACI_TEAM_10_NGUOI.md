# BÁO CÁO MA TRẬN PHỐI HỢP CÔNG VIỆC RACI (TEAM 10 NGƯỜI)
## DỰ ÁN: HỆ THỐNG ĐÁNH GIÁ VÀ CHỨNG NHẬN NĂNG LỰC SỐ THÍCH ỨNG DỰA TRÊN TRÍ TUỆ NHÂN TẠO (DIGVOS)

---

## 1. Bảng Phân Bổ 10 Vị Trí & Nhiệm Vụ Trọng Tâm (Rút Gọn)

| Ký Hiệu | Vị Trí Chuyên Môn | Trụ Cột | Nhiệm Vụ Trọng Tâm (1 Dòng) |
| :---: | :--- | :---: | :--- |
| **PM** | Project Manager | PM | Quản lý tiến độ 12 tuần, ngân sách, mục tiêu SMART và điều phối chung. |
| **TL** | Tech Lead / Fullstack Lead | TECH | Kiến trúc hệ thống, cơ sở dữ liệu PostgreSQL, bảo mật Multi-tenant, CI/CD. |
| **FE** | Frontend Developer & UI/UX | TECH | Thiết kế Figma và lập trình 4 Dashboard (Next.js 15, React 19). |
| **BE** | Backend Developer | TECH | Lập trình API 17 module NestJS, WebSockets và tích hợp dịch vụ. |
| **AI/BC** | AI & Blockchain Engineer | TECH | Lập trình giải thuật AI CAT (IRT Theta), Prompt AI và Smart Contract ERC-5192. |
| **MKT-L** | Marketing Lead | MARKETING | Lập chiến lược tiếp thị số, chạy quảng cáo và quản trị phễu chuyển đổi. |
| **MKT-C** | Content & Media Creator | MARKETING | Sản xuất video, bài viết cẩm nang, tài liệu truyền thông và quản trị mạng xã hội. |
| **OPS-C** | Educational Content Lead | OPS | Số hóa chuẩn DigComp 3.0, xây dựng ngân hàng câu hỏi và rubric đánh giá. |
| **OPS-S** | System & Platform Ops | OPS | Cấu hình khách thuê (Tenants), quản lý gói SaaS và giám sát nhật ký hệ thống. |
| **CS** | Customer Success & Support | CUSTOMER | Hỗ trợ kỹ thuật thí sinh, hướng dẫn xác minh chứng chỉ số và chăm sóc đối tác. |

---

## 2. Ma Trận RACI Chi Tiết 15 Nhiệm Vụ Cho 10 Thành Viên

*Quy ước vai trò:*
* **R (Responsible)**: Người thực hiện chính.
* **A (Accountable)**: Người chịu trách nhiệm duyệt và kết quả cuối cùng (duy nhất 01 người/hàng).
* **C (Consulted)**: Người được tham vấn chuyên môn, phối hợp hai chiều.
* **I (Informed)**: Người nhận thông tin sau khi hoàn thành.

| STT | Đầu Mục Nhiệm Vụ Cụ Thể | PM | TL | FE | BE | AI/BC | MKT-L | MKT-C | OPS-C | OPS-S | CS |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | **Lập kế hoạch 12 tuần & Đóng băng yêu cầu** | **A/R** | C | C | C | C | C | I | C | C | I |
| **2** | **Số hóa 5 miền & 21 tiêu chí DigComp 3.0** | I | I | I | C | I | I | I | **A/R** | C | I |
| **3** | **Biên soạn ngân hàng câu hỏi & Ma trận IRT** | I | I | I | C | C | I | I | **A/R** | I | I |
| **4** | **Thiết kế giao diện Figma 4 Dashboards** | I | C | **A/R** | I | I | C | C | C | I | C |
| **5** | **Lập trình 4 Dashboard Web (Next.js 15)** | I | C | **A/R** | C | C | I | I | C | I | I |
| **6** | **Lập trình 17 Module Backend & Multi-tenant** | I | **A** | C | **R** | C | I | I | C | C | I |
| **7** | **Lập trình thuật toán AI CAT (Theta IRT)** | I | C | C | C | **A/R** | I | I | C | I | I |
| **8** | **Triển khai Smart Contract Soulbound ERC-5192** | I | C | I | C | **A/R** | I | I | I | I | C |
| **9** | **Thiết lập Docker, Redis & Pipeline CI/CD** | I | **A/R** | I | C | I | I | I | I | C | I |
| **10** | **Sản xuất video hướng dẫn & Tư liệu truyền thông** | I | I | I | I | I | C | **A/R** | C | I | I |
| **11** | **Chạy chiến dịch tiếp thị kéo 300 thí sinh** | I | I | I | I | I | **A/R** | R | C | I | C |
| **12** | **Cấu hình không gian Tenant cho trường/khoa** | I | C | I | C | I | I | I | C | **A/R** | C |
| **13** | **Tổ chức thi thử & Xử lý sự cố kỹ thuật** | I | C | I | C | C | I | I | R | C | **A/R** |
| **14** | **Xác thực chứng chỉ số on-chain & Hỗ trợ B2B** | I | I | I | I | C | C | I | I | I | **A/R** |
| **15** | **Tổng hợp báo cáo đánh giá & Nghiệm thu** | **A/R** | C | C | C | C | C | C | C | C | C |

---

## 3. Ma Trận RACI Rút Gọn Theo 5 Trụ Cột Chức Năng

| Nhóm Nhiệm Vụ Cốt Lõi | PM | TECH LEAD | MARKETING | OPS | CUSTOMER |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **1. Kế hoạch & Kiến trúc hệ thống** | **A / R** | **A** | C | C | I |
| **2. Phát triển phần mềm, AI CAT & Web3** | I | **A / R** | I | C | I |
| **3. Chuẩn hóa nội dung DigComp & Soạn đề** | I | C | I | **A / R** | I |
| **4. Tiếp thị số & Tuyển sinh thi thử (300 user)** | I | I | **A / R** | C | C |
| **5. Vận hành phòng thi & Hỗ trợ khách hàng** | I | C | I | R | **A / R** |
| **6. Báo cáo tài chính & Nghiệm thu dự án** | **A / R** | C | C | C | C |

---

## 4. Ba Nguyên Tắc Phối Hợp Trọng Tâm

1. **Đơn trách nhiệm duyệt (Single Accountability)**: Mỗi nhiệm vụ chỉ có duy nhất 01 vị trí mang vai trò **A** nhằm loại bỏ tình trạng đùn đẩy trách nhiệm.
2. **Khảo thí gắn liền Kỹ thuật**: Bộ phận **OPS** bảo đảm tính chính xác học thuật của câu hỏi theo chuẩn DigComp, bàn giao cho bộ phận **TECH** lập trình thuật toán tính điểm thích ứng AI CAT.
3. **Tiếp thị gắn liền Chăm sóc**: Bộ phận **MARKETING** tìm kiếm và thu hút thí sinh, bộ phận **CUSTOMER** đảm bảo thí sinh hoàn thành bài thi và xác thực chứng chỉ số an toàn.
