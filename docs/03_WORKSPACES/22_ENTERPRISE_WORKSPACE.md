# DIGVOS

# 22_ENTERPRISE_WORKSPACE.md

Version: 1.0

Status: Draft

Owner: Product Team

---

# Table of Contents

1. Purpose
2. Target Users
3. Design Philosophy
4. Workspace Structure
5. Executive Dashboard
6. Organization Management
7. Workforce Competency
8. Assessment Management
9. Learning & Development
10. Talent Management
11. Recruitment Support
12. Reports & Analytics
13. AI Enterprise Copilot
14. Communication
15. Integrations
16. Settings
17. Business Rules
18. Future Expansion

---

# 1. Purpose

Enterprise Workspace là trung tâm quản lý năng lực số dành cho doanh nghiệp và tổ chức.

Workspace hỗ trợ doanh nghiệp:

- Đánh giá năng lực nhân viên
- Theo dõi Competency Gap
- Quản lý chương trình đào tạo
- Phát triển nguồn nhân lực
- Theo dõi chứng nhận
- Hỗ trợ tuyển dụng
- Phân tích dữ liệu năng lực toàn doanh nghiệp

Workspace này phục vụ nhiều cấp quản lý nhưng vẫn sử dụng cùng một giao diện và được phân quyền bằng RBAC.

---

# 2. Target Users

Enterprise Workspace dành cho:

- Organization Admin
- HR
- HRBP
- Talent Development
- Department Manager
- Team Leader
- Recruiter
- Internal Reviewer

Quyền truy cập được kiểm soát bởi Identity & Access Engine.

---

# 3. Design Philosophy

Enterprise Workspace tập trung trả lời bốn câu hỏi:

Doanh nghiệp hiện có năng lực gì?

↓

Đang thiếu năng lực gì?

↓

Cần đào tạo ai?

↓

Chiến lược phát triển nhân lực tiếp theo là gì?

Mọi Dashboard đều hướng đến việc hỗ trợ ra quyết định.

---

# 4. Workspace Structure

Workspace gồm các module:

Home

Organization

People

Competencies

Assessments

Learning

Talent

Recruitment

Certificates

Analytics

Reports

Messages

AI Copilot

Integrations

Settings

---

# 5. Executive Dashboard

Dashboard cung cấp góc nhìn tổng quan về toàn doanh nghiệp.

Hiển thị:

Organization Overview

Active Employees

Competency Distribution

Skill Gap Overview

Learning Completion

Assessment Status

Certificates Status

Talent Pipeline

Department Performance

AI Strategic Insights

---

## Dashboard Widgets

Organization KPI

Competency Heatmap

Skill Gap Matrix

Training Progress

Upcoming Renewals

Pending Assessments

Risk Alerts

Department Ranking

Recent Activities

Quick Actions

---

# 6. Organization Management

Quản lý:

Departments

Business Units

Teams

Locations

Job Positions

Job Families

Cost Centers

Reporting Structure

Có thể import dữ liệu từ hệ thống HRM.

---

# 7. Workforce Competency

Quản lý năng lực của toàn bộ nhân viên.

Bao gồm:

Competency Matrix

Competency Gap

Target Competencies

Department Comparison

Role Benchmark

Skill Coverage

Succession Readiness

Critical Skill Analysis

Có thể xem theo:

Employee

Team

Department

Organization

---

# 8. Assessment Management

Doanh nghiệp có thể:

Create Assessment Campaign

Assign Assessment

Track Completion

Review Results

Approve Results

Export Reports

Theo dõi:

Completion Rate

Average Score

Assessment Quality

Assessment History

---

# 9. Learning & Development

Quản lý:

Training Programs

Learning Paths

Mandatory Training

Recommended Learning

Training Budget

Learning Completion

Competency-based Learning

Learning Effectiveness

---

# 10. Talent Management

Quản lý:

Talent Pool

High Potential Employees

Career Paths

Succession Planning

Promotion Readiness

Development Plans

Performance Review Summary

Retention Risk

---

# 11. Recruitment Support

Hỗ trợ tuyển dụng dựa trên Competency.

Bao gồm:

Job Competency Profiles

Candidate Comparison

Competency Matching

Skill Gap Analysis

Interview Evaluation

Hiring Recommendation

Talent Pipeline

Internal Mobility

---

# 12. Reports & Analytics

Cung cấp:

Competency Reports

Training Reports

Assessment Reports

Department Reports

Executive Reports

Compliance Reports

Talent Reports

Certificate Reports

Dashboard hỗ trợ:

Filter

Drill-down

Comparison

Trend Analysis

Export PDF

Export Excel

---

# 13. AI Enterprise Copilot

AI hỗ trợ:

Identify Skill Gaps

Recommend Training Plans

Predict Workforce Risks

Suggest Internal Candidates

Generate Executive Reports

Summarize Organization Performance

Recommend Competency Development Strategy

Analyze Department Trends

AI chỉ đóng vai trò hỗ trợ ra quyết định.

---

# 14. Communication

Doanh nghiệp có thể:

Send Announcements

Notify Employees

Manage Discussions

Create Training Invitations

Schedule Meetings

Broadcast Messages

Theo dõi trạng thái gửi và lịch sử thông báo.

---

# 15. Integrations

Kết nối với:

HRM

ERP

LMS

Microsoft 365

Google Workspace

Payroll

SSO

Webhook

REST API

Dữ liệu đồng bộ thông qua Integration Engine.

---

# 16. Settings

Organization Profile

Branding

Competency Framework

Assessment Policies

Learning Policies

Notification Settings

Role Management

Security Policies

Integration Settings

AI Preferences

---

# 17. Business Rules

- Mỗi Organization chỉ được truy cập dữ liệu của chính mình.
- Competency Framework mặc định do Platform quản lý, có thể mở rộng bằng Framework nội bộ nếu được cấp quyền.
- Mọi Assessment Campaign đều phải lưu lịch sử.
- Báo cáo chỉ hiển thị theo quyền truy cập.
- AI không tự động thay đổi dữ liệu doanh nghiệp.
- Dữ liệu nhân viên phải tuân thủ chính sách bảo mật của tổ chức.

---

# 18. Future Expansion

Enterprise Workspace sẽ hỗ trợ:

Strategic Workforce Planning

Skills Marketplace

Internal Gig Marketplace

Mentoring Programs

Career Marketplace

Learning Budget Management

Competency Forecasting

Digital Twin Workforce

AI Workforce Planning

Cross-Organization Benchmarking

---

# Summary

Enterprise Workspace là trung tâm điều hành năng lực số dành cho doanh nghiệp.

Workspace giúp tổ chức quản lý nhân sự, đánh giá năng lực, lập kế hoạch đào tạo, phát triển nhân tài và hỗ trợ ra quyết định chiến lược dựa trên dữ liệu Competency Framework và AI. Thiết kế hướng đến khả năng mở rộng cho nhiều quy mô doanh nghiệp thông qua cơ chế phân quyền và kiến trúc đa tổ chức (Multi-tenant).