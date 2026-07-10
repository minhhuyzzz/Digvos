# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 📌 TÊN DỰ ÁN: DIGVOS (DIGITAL COMPETENCE VALIDATION OPERATING SYSTEM)
> **Hệ thống Đánh giá và Chứng nhận Năng lực số Thích ứng dựa trên Trí tuệ Nhân tạo**
> **Màu chủ đạo thương hiệu (Primary Brand Color):** `#5a96b0` (RGB: 90, 150, 176)

---

## 📑 MỤC LỤC
1. Tổng quan Dự án & Bối cảnh Chiến lược (Project Overview & Macro Context)
2. Luồng Trải nghiệm Người dùng Tổng quát (User Experience & Funnel Workflow)
3. Kiến trúc Hệ thống & Danh mục Mô hình Tính năng (Feature Scope Matrix)
4. Đặc tả Thang đo Năng lực và Cơ chế Gắn nhãn AI (DigComp 3.0 Alignment & AI Labelling)
5. Chiến lược Thương mại hóa & Quy hoạch Ví Token (Subscription & Tokenomics)
6. Đặc tả 3 Luồng Nghiệp vụ Liên thông Khép kín (Core Integration Workflows)
7. Kiến trúc Công nghệ & Lộ trình Dependencies (Tech Stack & Implementation Steps)

---

## 1. TỔNG QUAN DỰ ÁN & BỐI CẢNH CHIẾN LƯỢC

### 1.1 Tuyên ngôn Sản phẩm (Product Vision)
DIGVOS không định vị bản thân như một sàn tuyển dụng truyền thống. DIGVOS là một **Hạ tầng Chuẩn hóa và Bảo chứng Năng lực số Thích ứng** tầm cỡ doanh nghiệp tại Việt Nam. Hệ thống đóng vai trò làm thước đo chuẩn mực, đáng tin cậy dựa trên sự kết hợp độc bản giữa Trí tuệ nhân tạo (AI) và công nghệ Chuỗi khối (Blockchain).

### 1.2 Bối cảnh Vĩ mô & Nỗi đau Thị trường (Pain Points)
* **Sự dịch chuyển kỹ năng:** 44% kỹ năng cốt lõi của người lao động sẽ thay đổi trong vòng 5 năm tới, trong đó Năng lực số, tư duy phân tích và khả năng tự học trở thành trọng tâm sinh tồn (Theo WEF 2023).
* **Thực trạng tại Việt Nam:** Năng lực số của người Việt hiện tại chỉ đạt mức trung bình thấp 1.56/3 (Theo Nghiên cứu của Hoàng Ái Phương và cộng sự, 2024).
* **Khoảng trống tuyển dụng:** 60% doanh nghiệp gặp khó khăn lớn khi sàng lọc và tuyển dụng nhân sự có năng lực số thực tế phù hợp với làn sóng chuyển đổi số và AI (Theo Trung tâm Dự báo Nhân lực TP.HCM).

---

## 2. LUỒNG TRẢI NGHIỆM NGƯỜI DÙNG TỔNG QUÁT

Hệ thống vận hành theo một phễu trải nghiệm tuyến tính, khép kín tuyệt đối, bắt đầu từ điểm chạm đại chúng bên ngoài và dịch chuyển sâu vào lõi quản trị bên trong:
[Trang Landing Page Đại Chúng]
│
(Đăng nhập/Auth0)
│
▼
[ Next.js Middleware Phân Tuyến Quyền ]
├── Quyền STUDENT  ──> Dashboard Student / Employee
├── Quyền TEACHER  ──> Dashboard Teacher / Manager
├── Quyền EMPLOYER ──> Dashboard Employer (Enterprise)
└── Quyền ADMIN    ──> Dashboard Admin (Tối cao)

1. **Điểm chạm Đầu tiên (Trang Landing Page):** Nơi hiển thị thông điệp cốt lõi, dữ liệu vĩ mô và cổng Đăng ký/Đăng nhập tập trung qua hạ tầng **Auth0**.
2. **Xử lý Trung gian (Next.js Middleware):** Ngay sau khi xác thực thành công, Middleware sẽ đọc Metadata Token của User từ Auth0 để kiểm tra `Role`.
3. **Phân tuyến Động (Dynamic Routing):** Điều hướng chính xác User vào 1 trong 4 phân khu Dashboard chuyên biệt độc lập.

---

## 3. KIẾN TRÚC HỆ THỐNG & DANH MỤC MÔ HÌNH TÍNH NĂNG

### 📱 GIAO DIỆN 1: DASHBOARD STUDENT / EMPLOYEE (Người học & Nhân viên)
* **1. Định danh & Trực quan hóa Năng lực (Identity & Competence Analytics)**
    * `1.1 Bảng tổng quan tiến độ (Overview Dashboard)`: Theo dõi thông báo, các nhiệm vụ hoặc bài test cần hoàn thành gấp.
    * `1.2 Biểu đồ năng lực số (Digital Radar Chart)`: Hiển thị biểu đồ nhện tương tác 5 nhóm năng lực chuẩn DigComp 3.0. Tích hợp bộ lọc 4 cấp độ hiển thị trực quan: *Basic (Cơ bản), Intermediate (Trung cấp), Advanced (Cao cấp), Highly Advanced (Chuyên gia)*.
    * `1.3 Hồ sơ cá nhân e-Portfolio (Personal e-Portfolio)`: Kho lưu trữ thông tin định danh pháp lý cá nhân (phục vụ in chứng chỉ) và các sản phẩm số, file minh chứng năng lực thực tế.
* **2. Trung tâm Đánh giá Thích ứng (Adaptive Assessment Center)**
    * `2.1 Đánh giá thích ứng động (Adaptive Testing - CAT)`: Làm bài test tự động nhảy bậc độ khó theo phản ứng của người làm bài `[Yêu cầu gói PRO hoặc tốn 10 Credits/lượt]`.
    * `2.2 Nhiệm vụ thực hành (Practical Milestones)`: Nhận đề bài tập thực tế từ lớp học, cổng nộp file minh chứng (PDF, Code, Media) trực tiếp lên Supabase Storage.
    * `2.3 Phản hồi chuyên gia & AI (AI & Expert Feedback)`: Xem lịch sử điểm số, đọc lời phê chi tiết được đối chiếu từ Ma trận Rubric bởi Giảng viên và Gemini API.
* **3. Đấu trường & Xếp hạng (Gamification & Social Proof)**
    * `3.1 Thử thách đối kháng (Digital Skills Challenge)`: Phòng thi đấu giải quyết case-study năng lực số trực tuyến thời gian thực để săn Token Credits giữa các thành viên.
    * `3.2 Bảng xếp hạng năng lực (Digvos Rank)`: Trực quan hóa tần suất rèn luyện kỹ năng số theo dạng khối ô màu (tương tự như **Rank GitHub**).
* **4. Bảo chứng & Chứng nhận (Blockchain Certification)**
    * `4.1 Chứng chỉ Soulbound (SBT Certificates)`: Hiển thị phôi chứng chỉ không thể chuyển nhượng đúc trên Polygon, cung cấp mã QR và chuỗi Hash xác thực.
* **5. Không gian Cộng đồng & Tài nguyên (Digital Template Hub)**
    * `5.1 Chợ Prompt & Template (Marketplace)`: Khu vực trao đổi mua bán Prompt, tài nguyên số đại chúng bằng Token Credits.
    * `5.2 Kho lưu trữ VIP (VIP Room)`: Phân khu đề thi thử thách chuyên sâu và tài liệu Chuyên gia nâng cao `[Chỉ mở cho tài khoản PRO hoặc dùng Token mở khóa]`.
* **6. Quản lý Tài chính số (Credits Wallet)**
    * `6.1 Tiền tệ nội bộ (Token Balance)`: Xem số dư, lịch sử nhận thưởng hoặc tiêu tốn Token Credits.
    * `6.2 Nạp năng lượng (Top-up Credits)`: Cổng nạp tiền thật qua QR (PayOS) / Momo để đổi gói hoặc đổi Token.

---

### 🏫 GIAO DIỆN 2: DASHBOARD TEACHER / MANAGER (Giảng viên & Chuyên gia)
* **1. Tổng quan Đào tạo (Learning Management Analytics)**
    * `1.1 Bảng điều khiển trung tâm (Teacher Dashboard)`: Thống kê số lượng học viên, số bài tập cần chấm và nhật ký cảnh báo từ hệ thống.
* **2. Quản lý Lớp học Tự chủ (Decentralized Classrooms)**
    * `2.1 Khởi tạo lớp học (Create Classroom)`: Tự tạo lớp học độc lập không qua Admin, sinh mã Class Code hoặc Link để học viên tự nhập và gia nhập lớp.
    * `2.2 Đồng bộ EdTech (LMS Integration)`: Kết nối một chạm để đồng bộ danh sách bài học và học viên với Google Classroom / Microsoft Teams.
    * `2.3 Học bạ năng lực số (Student Competence Sheets)`: Truy cập xem biểu đồ Radar 4 cấp độ và hồ sơ e-Portfolio thực tế của từng học sinh trong lớp.
* **3. Thiết kế Công cụ Đo lường (Assessment Design Tool)**
    * `3.1 Soạn thảo trắc nghiệm (Quiz Authoring)`: Thiết kế câu hỏi trắc nghiệm, gán đáp án và thiết lập phân loại theo 4 cấp độ năng lực cốt lõi.
    * `3.2 Thiết kế ma trận Rubric (Rubrics Matrix Builder)`: Tạo nhiệm vụ thực hành, thiết lập các tiêu chí chấm điểm bằng chữ (Text-based Rubrics) để định cấu hình cho AI Agent chấm điểm tự động.
* **4. Trung tâm Phê duyệt & Giám sát (AI-Assisted Grading & Proctoring)**
    * `4.1 Duyệt bài chấm tự động (AI Auto-Grading Approval)`: Xem bài nộp của sinh viên, **đọc kết quả chấm nháp/lời phê do Gemini đề xuất, điều chỉnh và bấm nút gửi nhận xét chính thức về Dashboard Student**.
    * `4.2 Hệ thống cảnh báo gian lận (AI Anomaly Logs)`: Nhật ký giám sát các bài làm bị AI Agent gắn cờ nghi ngờ hành vi bất thường (sao chép tốc độ cao, chuyển tab liên tục).
* **5. Thống kê & Xuất dữ liệu (Data Export Center)**
    * `5.1 Báo cáo phổ điểm (Competence Reports)`: Xuất báo cáo phân tích mức độ đạt chuẩn DigComp 3.0 của lớp học ra định dạng Excel/PDF.
* **6. Không gian Cộng đồng Chuyên gia (Expert Hub)**
    * `6.1 Xuất bản học liệu (Publish Resources)`: Upload giáo án, bộ đề lên khu vực VIP của Chợ để thu Token Credits bản quyền từ cộng đồng.

---

### 🏢 GIAO DIỆN 3: DASHBOARD EMPLOYER (Doanh nghiệp & Tổ chức)
*(Kế thừa **TOÀN BỘ** các tính năng và menu cấu trúc của Dashboard Teacher ở trên phục vụ cho mục đích Đào tạo và đánh giá nhân sự nội bộ công ty, bổ sung thêm các phân khu nghiệp vụ Săn nhân tài & Bảo chứng cao cấp dưới đây)*

* **1. Xác thực Bảo chứng (Instant Blockchain Verification)**
    * `1.1 Quét mã QR / Tra cứu Hash (QR Verification)`: Hệ thống gọi API check trực tiếp với Smart Contract trên Polygon để kiểm tra tính toàn vẹn của chứng chỉ, chống làm giả.
* **2. Săn đầu người theo Năng lực số (AI Digital Talent Acquisition - PREMIUM)**
    * `2.1 Bộ lọc DigComp 3.0 chuyên sâu (Talent Smart Filter)`: Tìm kiếm ứng viên dựa trên tọa độ biểu đồ Radar (chọn cụ thể mức độ đạt được ở 4 cấp năng lực) và nhãn AI (`[AI-E]` / `[AI-I]`).
    * `2.2 Quản lý Quỹ tài năng (Talent Pool)`: Lưu danh sách ứng viên quan tâm, AI tự động đẩy thông báo khi ứng viên thăng bậc năng lực số hoặc đạt Huy hiệu số mới trên hệ thống.
    * `2.3 Yêu cầu mở khóa minh chứng (Unlock e-Portfolio)`: **Chi tiêu Token Credits để gửi lệnh mở khóa quyền xem file thực tế và lịch sử nhận xét của Giảng viên trên e-Portfolio ứng viên**.
    * `2.4 Chiến dịch tuyển dụng (Job Campaigns)`: Tạo tin đăng tuyển dụng đính kèm bài test thích ứng độc quyền của công ty làm màng lọc CV đầu vào.
* **3. Quản lý Tài chính Doanh nghiệp (Enterprise Wallet)**
    * `3.1 Gói thuê bao & Hóa đơn (Subscription & Bills)`: Theo dõi thời hạn gói Premium (1/6/12 tháng) và lịch sử nạp tiền thật mua Credits.

---

### 👑 GIAO DIỆN 4: DASHBOARD ADMIN (Quản trị viên tối cao)
* **1. Trung tâm Điều phối Hệ thống (System Command Center)**
    * `1.1 Thống kê vĩ mô (Master Analytics)`: Theo dõi dòng tiền nạp, tổng cung Token đang lưu hành, chi phí gọi API Gemini và tình trạng phí gas mạng Polygon.
    * `1.2 Nhật ký kiểm toán toàn diện (Immutable Audit Logs)`: Lưu vết bất biến (không thể sửa/xóa) mọi thao tác đổi dữ liệu của các vai trò và lịch sử gọi API điều chỉnh dữ liệu của các AI Agent.
* **2. Quản trị Người dùng & Doanh nghiệp (User & Organization Control)**
    * `2.1 Quản lý tài khoản (User Management)`: Phê duyệt, tạm khóa, mở khóa hoặc xóa vĩnh viễn các tài khoản Student, Teacher.
    * `2.2 Phê duyệt pháp lý doanh nghiệp (Employer KYC)`: Thẩm định hồ sơ doanh nghiệp (Giấy phép kinh doanh) trước khi cho phép họ kích hoạt tính năng Premium săn nhân sự.
* **3. Quản trị Khung năng lực số động (Dynamic Framework Configuration)**
    * `3.1 Danh mục Khung (Framework Schema)`: Khởi tạo, chỉnh sửa hoặc bật/tắt các phiên bản Khung năng lực (DigComp 3.0, 4.0, Khung chuẩn Việt Nam).
    * `3.2 Chuẩn hóa đầu ra (Learning Outcomes Mapping)`: Sắp xếp cấu trúc cây thư mục 5 nhóm năng lực, quản lý chi tiết 362 câu phát biểu và 523 chuẩn đầu ra tương ứng với 4 cấp độ đo lường.
* **4. Kiểm duyệt tối cao (Content & AI Moderation)**
    * `4.1 Phê duyệt Ngân hàng đề (Quiz & Task Moderation)`: Duyệt câu hỏi thi đóng góp từ các Giáo viên trước khi đẩy vào kho đề thích ứng chung của hệ thống.
    * `4.2 Nhật ký AI Mapper (AI Automation Logs)`: Giám sát luồng xử lý tự động của AI Agent khi tự quét và gắn thẻ lại (`re-tagging`) toàn bộ ngân hàng câu hỏi nếu Admin thay đổi cấu trúc Khung năng lực.
* **5. Quản trị Sổ cái & Tài chính (Blockchain & Financial Control)**
    * `5.1 Quản lý Smart Contract (Contract Owner Tools)`: Giám sát lịch sử đúc chứng chỉ số SBT và **kích hoạt hàm Thu hồi hiệu lực chứng chỉ (Revoke Contract Function) trên Polygon** khi có phát hiện gian lận hậu kiểm.
    * `5.2 Cấu hình kinh tế hệ thống (Tokenomics Settings)`: Điều chỉnh tỷ giá Tiền thật $\rightarrow$ Credits, thiết lập biểu phí % thu phí sàn giao dịch từ Chợ Cộng đồng.
    * `5.3 Cấu hình Cổng API Chính phủ (Secured B2G Gateway Logs)`: Giám sát lượt gọi API từ các cơ quan ban ngành (Bộ GD&ĐT, Tổng cục Thống kê) khi gọi dữ liệu vĩ mô đã qua thuật toán **Khử định danh (Anonymisation)**.

---

## 4. ĐẶC TẢ THANG ĐO NĂNG LỰC & CƠ CHẾ GẮN NHÃN AI

DIGVOS bám sát cấu trúc định lượng toán học của khung chuẩn **DigComp 3.0 (Ấn bản năm 2025 mới nhất từ Ủy ban Châu Âu)**[cite: 8].

### 4.1 Phân cấp 4 Cấp độ Năng lực (Proficiency Tier Descriptions) [cite: 185]
Hệ thống tính điểm và co giãn biểu đồ Radar dựa trên 3 trục tham chiếu: **Độ phức tạp tác vụ**, **Mức độ tự chủ**, và **Yêu cầu nhận thức**[cite: 427]:

| Cấp độ Năng lực | Độ phức tạp Tác vụ [cite: 427] | Mức độ Tự chủ [cite: 427] | Yêu cầu Nhận thức (Bloom) [cite: 433] |
| :--- | :--- | :--- | :--- |
| **1. Basic (Cơ bản)** [cite: 185] | Tác vụ đơn giản, định nghĩa sẵn [cite: 433] | Cần có hướng dẫn (Guidance) [cite: 433] | Ghi nhớ và thực hiện [cite: 433] |
| **2. Intermediate (Trung cấp)** [cite: 185] | Tác vụ rõ ràng, có cấu trúc [cite: 433] | Tự chủ hoàn toàn (Autonomously) [cite: 433] | Xác định và thực hiện [cite: 433] |
| **3. Advanced (Cao cấp)** [cite: 185] | Đa dạng tác vụ phức tạp khác nhau [cite: 433] | Tự chủ + Có khả năng hướng dẫn người khác [cite: 433] | Đánh giá và áp dụng giải pháp [cite: 433] |
| **4. Highly Advanced (Chuyên gia)** [cite: 185] | Tác vụ đặc biệt phức tạp/chuyên sâu [cite: 433] | Dẫn dắt và lãnh đạo tổ chức (Leading) [cite: 433] | Tạo ra giải pháp/cải tiến mới [cite: 433] |

### 4.2 Cơ chế phân nhãn AI (AI Labelling Architecture) [cite: 512, 513]
Trong cơ sở dữ liệu, mọi câu hỏi (`Question`) hoặc chuẩn đầu ra (`Learning Outcome`) bắt buộc phải gán một trong các thẻ nhãn để phục vụ bộ lọc của Employer và thuật toán re-tagging của Admin:
* **`[AI-E]` (AI-Explicit - AI Hiển ngôn):** Chiếm ~14% dữ liệu hệ thống[cite: 519]. Áp dụng cho các tiêu chí nhắc trực tiếp đến công nghệ AI (Ví dụ: Kỹ năng viết prompt cho chatbot, hiểu thuật toán học máy).
* **`[AI-I]` (AI-Implicit - AI Hàm ẩn):** Chiếm ~68% dữ liệu hệ thống[cite: 519]. Áp dụng cho các tác vụ không nhắc đến từ khóa AI nhưng công cụ thực hiện có tích hợp AI chạy ngầm (Ví dụ: Sử dụng bộ lọc tìm kiếm thông minh, dùng chức năng tóm tắt văn bản tự động).

---

## 5. CHIẾN LƯỢC THƯƠNG MẠI HÓA & QUY HOẠCH VÍ TOKEN

### 5.1 Phân cấp Đặc quyền Tài khoản (Subscription Matrix)

| Vai trò | Phân gói | Quyền lợi tính năng | Hình thức thanh toán |
| :--- | :--- | :--- | :--- |
| **Student** | **FREE** | Làm test tĩnh, xem Radar tổng quát, vào cộng đồng đại chúng. | Không tốn phí |
| | **PRO** | Mở khóa CAT Engine (Test thích ứng), miễn phí đúc Blockchain SBT, mở khóa Gemini API Mentor, vào phòng đối kháng VIP. | Thuê bao (1 / 6 / 12 tháng) |
| **Teacher** | **FREE** | Tạo tối đa 2 lớp học (mỗi lớp tối đa 100 học viên), chấm điểm có AI hỗ trợ nháp. | Không tốn phí |
| | **PRO** | Không giới hạn lớp học, đồng bộ Google Classroom, xuất bản học liệu lên Chợ thu phí bản quyền Token. | Thuê bao (1 / 6 / 12 tháng) |
| **Employer**| **PREMIUM**| Sở hữu Dashboard Teacher, mở lọc nâng cao DigComp 3.0, tặng 500 Credits/tháng mở khóa e-Portfolio, tạo Job Campaign đính kèm test CAT. | Thuê bao (1 / 6 / 12 tháng) |

### 5.2 Cơ chế luân chuyển dòng tiền (Dual-Currency Wallet Mechanics)
* **Nạp vào (Inflow):** User dùng tiền thật thanh toán qua cổng VietQR/Momo $\rightarrow$ Hệ thống gọi Webhook ghi nhận giao dịch thành công $\rightarrow$ Backend cộng Token Credits tương ứng vào bảng `Wallet` của User trong Database.
* **Tiêu thụ nội bộ (Outflow/Spending Sink):** * Student dùng Credits để mở bài test nâng cao (nếu không có gói PRO).
    * Employer dùng Credits để mở khóa xem file minh chứng chi tiết trong e-Portfolio của ứng viên.
    * Hệ thống thu phí sàn cố định **10% (Platform Fee)** trên mọi giao dịch luân chuyển Token (Mua bán Prompt, học liệu) giữa các thành viên ở không gian Cộng đồng, chuyển phần tiền cắt phế này về tài khoản Admin.

---

## 6. ĐẶC TẢ 3 LUỒNG NGHIỆP VỤ LIÊN THÔNG KHÉP KÍN

### 6.1 Luồng Bài test Thích ứng Động (Computer Adaptive Testing - CAT)
1. Student nhấn "Bắt đầu đánh giá nhóm năng lực 1.2" $\rightarrow$ Giao diện Client gọi API `POST /api/v1/assessments/start`.
2. Backend truy vấn ngân hàng đề, đẩy ra câu hỏi đầu tiên nằm ở mốc chuẩn **Intermediate**.
3. Student phản hồi đáp án $\rightarrow$ Hệ thống tính toán logic:
    * **Nếu kết quả ĐÚNG:** Ghi điểm bậc hiện tại, gọi API lấy câu hỏi tiếp theo ở bậc **Advanced**.
    * **Nếu kết quả SAI:** Hạ độ khó câu hỏi tiếp theo xuống bậc **Basic**.
4. Vòng lặp đóng lại khi hệ thống tìm được "Bậc trần năng lực" thực tế của học viên, tính toán tọa độ $X,Y$ và tự động vẽ lại các cạnh của **Radar Chart** trên Client.

### 6.2 Luồng AI Agent (Gemini) Chấm bài Thực hành Tự động
1. Student tải file minh chứng (PDF) lên giao diện $\rightarrow$ Client đẩy file vào **Supabase Storage**, nhận về một URL tệp tin công khai bảo mật.
2. Client gọi API `POST /api/v1/submissions`. Hành động này kích hoạt **AI Agent (Gemini API via LangChain)** chạy ngầm.
3. Hệ thống nạp vào Gemini 3 tham số: *Đề bài nhiệm vụ, URL file minh chứng của sinh viên, và văn bản tiêu chí chấm (Rubric)* do Teacher soạn thảo.
4. Gemini chạy phân tích ngữ nghĩa ngôn ngữ lớn, trả về một cấu trúc dữ liệu JSON gồm: Số điểm đề xuất cho từng tiêu chí, đoạn văn bản nhận xét (Feedback), và flag cảnh báo nếu phát hiện chuỗi hành vi gian lận (Anomaly Detection).
5. Kết quả chấm nháp hiển thị ở mục `Duyệt bài` của **Teacher**. Teacher chỉnh sửa/phê duyệt $\rightarrow$ Hệ thống tự động đẩy thông báo sang cho **Student** đọc nhận xét.

### 6.3 Luồng Bảo chứng Chứng chỉ Blockchain Polygon
1. Student đủ điều kiện cấp chứng chỉ (Hoặc bấm đúc chứng chỉ bằng gói PRO) $\rightarrow$ Backend tổng hợp thông tin: *Họ tên pháp lý, Ngày cấp, Tọa độ điểm 5 nhóm năng lực số*.
2. Backend băm (hash) chuỗi thông tin này thành một mã hóa độc bản, gọi thư viện **Ethers.js** tương tác với hàm `mint()` của Smart Contract đã deploy trên mạng mạng thử nghiệm **Polygon Amoy Testnet**.
3. Sau khi mạng Blockchain xác nhận khối thành công, Backend lưu lại mã Transaction Hash, sinh ra một **Mã QR độc bản** chứa liên kết đến cổng xác thực, hiển thị trực quan lên hồ sơ e-Portfolio của Student.
4. Khi **Employer** dùng camera quét mã QR, hệ thống không đọc từ cơ sở dữ liệu tập trung mà gửi lệnh truy vấn thẳng đến Smart Contract trên mạng Polygon để đối chiếu chuỗi Hash, đảm bảo dữ liệu năng lực hoàn toàn là thật và bất biến.

---

## 7. KIẾN TRÚC CÔNG NGHỆ & LỘ TRÌNH DEPENDENCIES

### 7.1 Tech Stack Tổng hợp
* **Frontend:** Next.js 15+(16) (App Router, TypeScript) + TailwindCSS + Recharts.
* **Backend:** NestJS (TypeScript, Modular Architecture).
* **Database & ORM:** PostgreSQL (Quản lý qua pgAdmin 4 ở local, Cloud qua Supabase) + Prisma ORM.
* **Hạ tầng bổ trợ:** Auth0 (Xác thực) + Supabase Storage (Lưu trữ tệp minh chứng).
* **AI & Blockchain Core:** Gemini API (Google AI Studio) + LangChain + Ethers.js (Polygon Amoy Testnet).
* **DevOps:** Docker & Docker Compose (Môi trường local) + Vercel (Host Front-end) + Render (Host Back-end).

