# DIGVOS

# 13_ANALYTICS_ENGINE.md

Version: 1.0

Status: Draft

Owner: Data Intelligence Team

---

# Table of Contents

1. Purpose
2. Analytics Philosophy
3. Analytics Architecture
4. Analytics Layers
5. Dashboard Types
6. KPI Management
7. Competency Analytics
8. Learning Analytics
9. Assessment Analytics
10. Enterprise Analytics
11. Predictive Analytics
12. Report Center
13. Business Rules
14. Domain Events
15. APIs
16. Future Expansion

---

# 1. Purpose

Analytics Engine chịu trách nhiệm chuyển đổi dữ liệu của DIGVOS thành thông tin có giá trị phục vụ ra quyết định.

Analytics không chỉ hiển thị biểu đồ.

Engine này giúp:

- theo dõi năng lực
- phân tích hiệu quả học tập
- đánh giá chất lượng đào tạo
- hỗ trợ tuyển dụng
- dự báo xu hướng

---

# 2. Analytics Philosophy

Analytics phải trả lời được ba câu hỏi:

## Điều gì đã xảy ra?

Descriptive Analytics

---

## Vì sao xảy ra?

Diagnostic Analytics

---

## Tiếp theo nên làm gì?

Predictive & Prescriptive Analytics

---

# 3. Analytics Architecture

```
Operational Data

↓

Event Stream

↓

Analytics Engine

↓

Metrics

↓

Reports

↓

Dashboards

↓

Decision Support
```

Analytics không ghi dữ liệu nghiệp vụ.

Analytics chỉ đọc dữ liệu đã được xử lý từ các Engine khác.

---

# 4. Analytics Layers

Analytics được chia thành bốn lớp:

Operational Dashboard

↓

Management Dashboard

↓

Executive Dashboard

↓

Strategic Dashboard

Mỗi nhóm người dùng sẽ nhìn thấy Dashboard phù hợp với vai trò.

---

# 5. Dashboard Types

Analytics Engine cung cấp:

- Individual Dashboard
- Teacher Dashboard
- Enterprise Dashboard
- Admin Dashboard
- Executive Dashboard

Dashboard chỉ là lớp hiển thị.

Toàn bộ dữ liệu được cung cấp bởi Analytics Engine.

---

# 6. KPI Management

Engine hỗ trợ định nghĩa KPI động.

Ví dụ:

- Assessment Completion Rate
- Learning Progress
- Competency Growth
- Certificate Issued
- Skill Gap Reduction
- Recruitment Success Rate
- Training ROI

Admin có thể tạo KPI mới mà không cần sửa mã nguồn.

---

# 7. Competency Analytics

Theo dõi:

- Competency Distribution
- Competency Trends
- Skill Heatmap
- Growth Timeline
- Competency Radar
- Benchmark

---

# 8. Learning Analytics

Theo dõi:

- Completion Rate
- Learning Time
- Learning Path Effectiveness
- Resource Usage
- AI Recommendation Acceptance
- Learning Outcome Achievement

---

# 9. Assessment Analytics

Theo dõi:

- Pass Rate
- Difficulty Index
- Discrimination Index
- Average Score
- Assessment Duration
- Question Performance
- Appeal Rate

---

# 10. Enterprise Analytics

Theo dõi:

- Workforce Competency
- Department Skill Gap
- Internal Mobility
- Recruitment Funnel
- Training ROI
- Promotion Readiness
- Talent Distribution

---

# 11. Predictive Analytics

AI có thể dự đoán:

- Nguy cơ không đạt Competency
- Khả năng hoàn thành Learning Path
- Khả năng đạt Certificate
- Khả năng phù hợp Job
- Xu hướng Skill Gap

Các dự đoán chỉ mang tính hỗ trợ và phải có khả năng giải thích.

---

# 12. Report Center

Hỗ trợ tạo:

- PDF
- Excel
- CSV
- Dashboard Snapshot
- Scheduled Reports

Người dùng có thể đặt lịch gửi báo cáo tự động.

---

# 13. Business Rules

- Analytics không chỉnh sửa dữ liệu nguồn.
- Chỉ đọc dữ liệu đã xác thực.
- KPI phải có định nghĩa và công thức rõ ràng.
- Mọi báo cáo đều ghi nhận thời điểm tạo.

---

# 14. Domain Events

Consume:

- CompetencyUpdated
- AssessmentCompleted
- EvidenceValidated
- CertificateIssued
- LearningCompleted

Publish:

- ReportGenerated
- KPIThresholdReached
- InsightGenerated

---

# 15. APIs

- Generate Report
- Get Dashboard
- Get KPI
- Export Analytics
- Schedule Report
- Compare Organizations
- Benchmark Competencies

---

# 16. Future Expansion

Analytics Engine sẽ hỗ trợ:

- Real-time Dashboard
- AI Insight Generation
- Benchmark giữa các trường
- Benchmark giữa doanh nghiệp
- Data Warehouse
- Lakehouse
- Power BI Connector
- Tableau Connector

---

# Summary

Analytics Engine là trung tâm phân tích dữ liệu của DIGVOS.

Engine này giúp chuyển đổi dữ liệu từ Competency, Assessment, Learning, Evidence và Talent thành thông tin phục vụ người học, giảng viên, doanh nghiệp và nhà quản trị trong việc ra quyết định.