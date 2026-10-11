# DIGVOS Documentation Portal

Chào mừng bạn đến với tài liệu kỹ thuật và thiết kế sản phẩm của dự án **DIGVOS** (Digital Competence Operating System).

---

## 🗺️ Bản Đồ Triển Khai Cho AI Agent (AI Agent Blueprint)

Dành cho AI Agent hoặc nhà phát triển mới tiếp cận dự án, vui lòng đọc các tài liệu hướng dẫn cấu trúc cốt lõi dưới đây trước khi tiến hành code:

0. **[Tổng Quan Dự Án & Lộ Trình (Project Overview & Roadmap)](file:///c:/Digvos/docs/PROJECT_SUMMARY_AND_ROADMAP.md)**: Bản tóm tắt tổng thể hệ thống, toàn bộ 17 modules, 4 workspaces dashboard và định hướng phát triển.
0.1. **[Báo Cáo Dự Án TMĐT & Kế Hoạch Triển Khai (E-Commerce Plan)](file:///c:/Digvos/docs/BAO_CAO_DU_AN_TMDT_DIGVOS.md)**: Đặc tả mô hình kinh doanh TMĐT, đánh giá 5 tiêu chí, sơ đồ 5 giai đoạn 12 tuần và 3 mục tiêu SMART.
0.2. **[Ma Trận Phối Hợp Công Việc RACI (Team 10 Người)](file:///c:/Digvos/docs/MA_TRAN_RACI_TEAM_10_NGUOI.md)**: Ma trận RACI chi tiết 15 nhiệm vụ cho 10 vị trí chuyên môn và 5 trụ cột chức năng.
0.3. **[Kế Hoạch Tiến Độ 12 Tuần Triển Khai (12-Week Timeline)](file:///c:/Digvos/docs/TIMELINE_12_TUAN.md)**: Sơ đồ Gantt và bảng phân bổ công việc chi tiết từng tuần từ Tuần 1 đến Tuần 12.
1. **[Đồ Thị Phụ Thuộc (Dependency Graph)](file:///c:/Digvos/docs/dependency_graph.md)**: Chỉ rõ cách tổ chức Module, ranh giới Domain (DDD) và việc lấy Competency làm trung tâm.
2. **[Thứ Tự Xây Dựng (Build Order Roadmap)](file:///c:/Digvos/docs/build_order.md)**: Bản đồ giai đoạn phát triển đi từ Giai đoạn nền tảng ➜ Đóng băng thiết kế ➜ Lập trình code.
3. **[Sơ Đồ Kiến Trúc (Architecture Diagrams)](file:///c:/Digvos/docs/architecture_diagrams.md)**: Gồm 5 sơ đồ Mermaid chi tiết (Context, Container, Business Engines, Workspaces, Event Flow).
4. **[Quy Trình Làm Việc Cho Agent (AI Agent Workflow)](file:///c:/Digvos/docs/agent_workflow.md)**: Quy chuẩn coding, các điều cấm kỵ và thứ tự viết code của một tính năng (Schema-First & Contract-First/TDD).

---

## 🏗️ Phân Nhóm Tài Liệu Kiến Trúc (Architecture Specifications)

Bộ đặc tả chi tiết đã được đóng băng (**v0.4.0-architecture-frozen**) để nhóm phát triển bắt đầu lập trình:

### 1. Kiến Trúc Tổng Quan (Core Architecture)
- **[31] Dashboard Shell Layout**: [31_dashboard_system.md](file:///c:/Digvos/docs/31_dashboard_system.md)
- **[36] Role-Based Routing & Navigation**: [36_navigation.md](file:///c:/Digvos/docs/36_navigation.md)
- **[39] Interactive Workflows & UI Events**: [39_workflow.md](file:///c:/Digvos/docs/39_workflow.md)
- **[40] Command Palette & Advanced UX**: [40_dashboard_ux.md](file:///c:/Digvos/docs/40_dashboard_ux.md)
- **[63] Core System Architecture Principles**: [63_architecture_principles.md](file:///c:/Digvos/docs/63_architecture_principles.md)

### 2. Nghiệp Vụ & Giao Diện Màn Hình (Workspaces Specs)
- **[32] Student Workspace Design**: [32_student_workspace.md](file:///c:/Digvos/docs/32_student_workspace.md)
- **[33] Teacher Workspace Design**: [33_teacher_workspace.md](file:///c:/Digvos/docs/33_teacher_workspace.md)
- **[34] Enterprise Workspace Design**: [34_enterprise_workspace.md](file:///c:/Digvos/docs/34_enterprise_workspace.md)
- **[35] Admin Control Center Design**: [35_admin_workspace.md](file:///c:/Digvos/docs/35_admin_workspace.md)

### 3. Kiến Trúc Frontend (Frontend Engineering)
- **[37] Design System Tokens**: [37_design_system.md](file:///c:/Digvos/docs/37_design_system.md)
- **[38] Shared Component Library Specs**: [38_component_library.md](file:///c:/Digvos/docs/38_component_library.md)
- **[43] Data Fetching & Client State**: [43_data_fetching.md](file:///c:/Digvos/docs/43_data_fetching.md)
- **[49] Frontend Feature-Based Architecture**: [49_frontend_architecture.md](file:///c:/Digvos/docs/49_frontend_architecture.md)
- **[55] Frontend Accessibility (A11y) Spec**: [55_accessibility.md](file:///c:/Digvos/docs/55_accessibility.md)
- **[56] Frontend Performance & Web Vitals**: [56_performance.md](file:///c:/Digvos/docs/56_performance.md)
- **[58] Design Tokens Specification**: [58_design_tokens.md](file:///c:/Digvos/docs/58_design_tokens.md)

### 4. Kiến Trúc Backend & Truyền Tải (Backend & API Specs)
- **[42] API Contract & Response Envelope**: [42_api_contract.md](file:///c:/Digvos/docs/42_api_contract.md)
- **[45] Realtime Events & Communications**: [45_realtime.md](file:///c:/Digvos/docs/45_realtime.md)
- **[50] Domain API Error Codes Spec**: [50_api_error_codes.md](file:///c:/Digvos/docs/50_api_error_codes.md)
- **[51] Event-Driven Messaging Contracts**: [51_event_contracts.md](file:///c:/Digvos/docs/51_event_contracts.md)
- **[65] Backend Modular Architecture Standards**: [65_backend_architecture.md](file:///c:/Digvos/docs/65_backend_architecture.md)
- **[66] Database Design & Conventions Spec**: [66_database_conventions.md](file:///c:/Digvos/docs/66_database_conventions.md)

### 5. An Ninh & Quyền Riêng Tư (Security & Privacy)
- **[44] Authentication & Authorization Security**: [44_authentication.md](file:///c:/Digvos/docs/44_authentication.md)
- **[59] Security Hardening Specifications**: [59_security_hardening.md](file:///c:/Digvos/docs/59_security_hardening.md)
- **[60] Data Privacy & Compliance Spec**: [60_privacy.md](file:///c:/Digvos/docs/60_privacy.md)

### 6. Vận Hành & Trí Tuệ Nhân Tạo (Operations & AI Layers)
- **[41] Error Handling & Fallback UI**: [41_error_handling.md](file:///c:/Digvos/docs/41_error_handling.md)
- **[46] File Upload & Cloud Storage**: [46_storage.md](file:///c:/Digvos/docs/46_storage.md)
- **[47] Logging & Auditing Strategy**: [47_logging.md](file:///c:/Digvos/docs/47_logging.md)
- **[48] Environment & CI/CD Deployment**: [48_deployment.md](file:///c:/Digvos/docs/48_deployment.md)
- **[52] Background Jobs & Queue Architecture**: [52_background_jobs.md](file:///c:/Digvos/docs/52_background_jobs.md)
- **[53] API Rate Limiting & Throttling Spec**: [53_rate_limiting.md](file:///c:/Digvos/docs/53_rate_limiting.md)
- **[54] System Observability & Monitoring**: [54_observability.md](file:///c:/Digvos/docs/54_observability.md)
- **[61] AI Integration & Assistant Architecture**: [61_ai_architecture.md](file:///c:/Digvos/docs/61_ai_architecture.md)
- **[62] AI Prompt Standards & Hallucination Guard**: [62_ai_prompt_standards.md](file:///c:/Digvos/docs/62_ai_prompt_standards.md)
- **[70] Third-Party Services Registry Strategy**: [70_third_party_services.md](file:///c:/Digvos/docs/70_third_party_services.md)

### 7. Quy Trình Phát Triển (Development Policies)
- **[64] Coding Standards & Conventions**: [64_coding_standards.md](file:///c:/Digvos/docs/64_coding_standards.md)
- **[67] Git Workflow & Commit Standards**: [67_git_workflow.md](file:///c:/Digvos/docs/67_git_workflow.md)
- **[68] Release & Deployment Strategy Spec**: [68_release_strategy.md](file:///c:/Digvos/docs/68_release_strategy.md)
- **[69] Third-Party Dependency Inclusion Policy**: [69_dependency_policy.md](file:///c:/Digvos/docs/69_dependency_policy.md)

---

## 🏛️ Quyết Định Kiến Trúc (Architecture Decision Records - ADR)

Thư mục: `docs/ADR/` lưu trữ lý do đưa ra các quyết định kỹ thuật:

- **[ADR-001] Next.js 15 App Router**: [ADR-001-use-nextjs15.md](file:///c:/Digvos/docs/ADR/ADR-001-use-nextjs15.md)
- **[ADR-002] Auth0 Identity Provider**: [ADR-002-use-auth0.md](file:///c:/Digvos/docs/ADR/ADR-002-use-auth0.md)
- **[ADR-003] Prisma DB ORM**: [ADR-003-use-prisma.md](file:///c:/Digvos/docs/ADR/ADR-003-use-prisma.md)
- **[ADR-004] Redis Pub/Sub & BullMQ**: [ADR-004-use-redis-pubsub.md](file:///c:/Digvos/docs/ADR/ADR-004-use-redis-pubsub.md)
- **[ADR-005] TanStack Query API Cache**: [ADR-005-use-tanstack-query.md](file:///c:/Digvos/docs/ADR/ADR-005-use-tanstack-query.md)
- **[ADR-006] Zustand UI Global State**: [ADR-006-use-zustand.md](file:///c:/Digvos/docs/ADR/ADR-006-use-zustand.md)
- **[ADR-007] Supabase S3 Cloud Storage**: [ADR-007-use-supabase-storage.md](file:///c:/Digvos/docs/ADR/ADR-007-use-supabase-storage.md)