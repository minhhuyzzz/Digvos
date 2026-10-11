# DIGVOS - Architecture Diagrams

Tài liệu này chứa 5 sơ đồ kiến trúc Mermaid chi tiết, giúp AI Agent và nhà phát triển hình dung toàn cảnh hoạt động của hệ thống **DIGVOS** ở các lớp khác nhau (C4 Model & Event Flow).

---

## 1. System Context Diagram (Sơ đồ Ngữ cảnh Hệ thống)

Sơ đồ này mô tả cách người dùng và các dịch vụ bên ngoài tương tác với **DIGVOS**.

```mermaid
graph TD
    %% Users
    Student["Học viên / Sinh viên"]
    Teacher["Giảng viên / Đơn vị đào tạo"]
    Employer["Nhà tuyển dụng / Doanh nghiệp"]
    Admin["Quản trị hệ thống"]

    %% Core System
    DIGVOS["DIGVOS Platform (SaaS)"]

    %% External Systems
    Gemini["Google Gemini AI (Chấm bài, Rubrics, Đề xuất)"]
    Polygon["Polygon Blockchain (Đúc Soulbound Token SBT)"]
    LMS["LMS ngoài (Moodle, Canvas - Tích hợp LTI)"]
    Email["Email Service (SendGrid/Amazon SES)"]

    %% Connections
    Student -->|Thực hiện test, nộp minh chứng| DIGVOS
    Teacher -->|Quản lý đề, chấm bài thực hành| DIGVOS
    Employer -->|Tìm kiếm tài năng, đăng tuyển| DIGVOS
    Admin -->|Quản lý Tenant, cấu hình hệ thống| DIGVOS

    DIGVOS <-->|Đọc/Ghi dữ liệu học tập| LMS
    DIGVOS -->|Gửi bài thực hành cần chấm| Gemini
    Gemini -->|Trả về điểm số và feedback gợi ý| DIGVOS
    DIGVOS -->|Ký & Đúc chứng chỉ SBT| Polygon
    DIGVOS -->|Gửi thông báo| Email
```

---

## 2. Container Diagram (Sơ đồ Container)

Mô tả cấu trúc Monorepo và cách các container ứng dụng tương tác vật lý.

```mermaid
graph LR
    %% Client Layer
    subgraph ClientLayer [Presentation Layer]
        NextJS["Next.js Web App (apps/web)"]
    end

    %% API / Logic Layer
    subgraph APILayer [Application Logic Layer]
        NestJS["NestJS API Server (apps/api)"]
        Worker["Background Worker (Node.js/BullMQ)"]
    end

    %% Storage Layer
    subgraph StorageLayer [Data & Storage Layer]
        Postgres[("PostgreSQL (Prisma DB Schema)")]
        Redis[("Redis (Event Bus, Cache & Queue)")]
        S3["AWS S3 Storage (Evidence Files)"]
    end

    %% External
    Polygon["Polygon Blockchain (RPC Node)"]

    %% Interactions
    NextJS -->|REST API / HTTPS| NestJS
    NestJS -->|Đọc/Ghi dữ liệu| Postgres
    NestJS -->|Publish Events / Enqueue| Redis
    Worker -->|Lắng nghe & Xử lý Jobs| Redis
    Worker -->|Đúc chứng chỉ SBT| Polygon
    NestJS -->|Tải minh chứng| S3
    Worker -->|Đọc/Ghi| Postgres
```

---

## 3. Business Engine Diagram (Sơ đồ Động cơ Nghiệp vụ)

Thể hiện **Competency Engine** là trung tâm và các Business Engine liên kết gián tiếp thông qua nó. **AI** và **Identity** được cấu trúc ngoài business core.

```mermaid
graph TD
    %% Central Engine
    Competency["Competency Engine (DigComp 3.0 Standard)"]

    %% Surrounding Business Engines
    Assessment["Assessment Engine (CAT/IRT Testing)"]
    Learning["Learning Engine (Personalized Path)"]
    Evidence["Evidence Engine (Portfolio & Practical Tasks)"]
    Certificate["Certificate Engine (Blockchain SBTs)"]
    Talent["Talent Engine (Recruitment Matching)"]
    Analytics["Analytics Engine (Realtime Dashboard)"]

    %% Cross-Cutting Service
    AI["AI Cross-Cutting Service (Gemini API)"]

    %% Connections to Central Engine
    Assessment -->|Cập nhật chỉ số kỹ năng| Competency
    Learning -->|Đọc Skill Gap để gợi ý tài nguyên| Competency
    Evidence -->|Liên kết minh chứng dự án| Competency
    Certificate -->|Chứng nhận mức độ thành thạo| Competency
    Talent -->|Đọc phổ năng lực ứng viên| Competency
    Analytics -->|Tổng hợp báo cáo năng lực số| Competency

    %% AI Cross-cutting interactions
    AI -.-> Assessment
    AI -.-> Learning
    AI -.-> Talent
    AI -.-> Analytics
```

---

## 4. Workspace Diagram (Sơ đồ Không gian Làm việc)

Thể hiện sự phân tách giao diện người dùng hoàn toàn độc lập cho 4 đối tượng.

```mermaid
graph TD
    subgraph Users [Người Dùng]
        S["Học viên"]
        T["Giảng viên"]
        E["Doanh nghiệp"]
        A["Admin"]
    end

    subgraph Portal [Giao Diện Workspaces]
        StudentWS["Student Workspace<br>- Radar Chart năng lực<br>- Lịch sử làm CAT Test<br>- Kho lưu trữ Portfolio minh chứng"]
        TeacherWS["Teacher Workspace<br>- Quản trị ngân hàng đề<br>- Dashboard theo dõi lớp học<br>- Bộ chấm bài tự luận tích hợp AI"]
        EnterpriseWS["Enterprise Workspace<br>- Cổng đăng tuyển dụng<br>- Hệ thống đối khớp Talent matching %<br>- Trình xác thực ví SBT"]
        AdminWS["Admin Control Center<br>- Quản lý Tenant/Trường học<br>- Cấu hình ma trận Role/Permissions<br>- Cổng thanh toán SaaS Billing"]
    end

    S --> StudentWS
    T --> TeacherWS
    E --> EnterpriseWS
    A --> AdminWS
```

---

## 5. Event Flow Diagram (Sơ đồ Luồng Sự kiện)

Mô tả luồng xử lý không đồng bộ (Event-Driven) giải phóng phụ thuộc cứng giữa các Engine.

```mermaid
sequenceDiagram
    autonumber
    actor Student as Học viên
    participant AE as Assessment Engine
    participant EB as Event Bus (Redis/BullMQ)
    participant CE as Competency Engine
    participant AN as Analytics Engine
    participant NE as Notification Engine
    participant CFE as Certification Engine

    Student->>AE: Hoàn thành bài CAT Test & Nộp bài
    AE->>AE: Tính điểm tự động / AI chấm điểm
    AE->>EB: Publish Event: 'AssessmentCompleted'
    
    par Xử lý song song không đồng bộ
        EB->>CE: Nhận Event 'AssessmentCompleted' ➜ Cập nhật Proficiency Levels
        EB->>AN: Nhận Event 'AssessmentCompleted' ➜ Cập nhật Realtime Dashboard KPIs
        EB->>NE: Nhận Event 'AssessmentCompleted' ➜ Gửi Email xác nhận kết quả cho học sinh
    end

    CE->>EB: Publish Event: 'CompetencyUpdated'
    EB->>CFE: Nhận Event 'CompetencyUpdated' ➜ Kiểm tra điều kiện cấp Certificate
    
    opt Đủ điều kiện cấp (Ví dụ đạt DigComp Level 5)
        CFE->>CFE: Đúc Soulbound Token (SBT) lên Polygon Blockchain
        CFE->>EB: Publish Event: 'CertificateIssued'
        EB->>NE: Nhận Event 'CertificateIssued' ➜ Gửi Email kèm Link ví Polygon cho học sinh
    end
```
