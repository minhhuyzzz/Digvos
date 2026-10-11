# DIGVOS

# 03_INFORMATION_ARCHITECTURE.md

Version: 1.0

Status: Draft

Owner: Product Team

---

# Table of Contents

1. Information Architecture Overview
2. Navigation Philosophy
3. Product Structure
4. Global Navigation
5. Workspace Structure
6. Student Workspace IA
7. Teacher Workspace IA
8. Enterprise Workspace IA
9. Admin Control Center IA
10. Public Portal IA
11. Search Architecture
12. Notification Architecture
13. Universal Components
14. URL Convention
15. Navigation Rules
16. UX Principles
17. Future Expansion

---

# 1. Information Architecture Overview

DIGVOS không được tổ chức theo Pages.

DIGVOS được tổ chức theo Workspace.

```

Workspace

↓

Modules

↓

Features

↓

Pages

↓

Components

```

Ví dụ

```

Student Workspace

↓

Assessment

↓

Adaptive Test

↓

Question Session

↓

Question Card

```

---

# 2. Navigation Philosophy

DIGVOS sử dụng

Workspace-based Navigation

không phải

Website Navigation.

Điều này giúp hệ thống có thể mở rộng lên hàng trăm module mà không làm người dùng bị rối.

---

## Navigation Layers

```

Platform

↓

Workspace

↓

Module

↓

Feature

↓

Action

```

Ví dụ

```

DIGVOS

↓

Student Workspace

↓

Assessment

↓

Adaptive Test

↓

Start Test

```

---

# 3. Product Structure

```

DIGVOS

│

├── Public Portal

├── Authentication

├── Student Workspace

├── Teacher Workspace

├── Enterprise Workspace

├── Admin Control Center

└── API Portal

```

Mỗi Workspace có giao diện và menu riêng.

Không chia sẻ Sidebar.

---

# 4. Global Navigation

Top Navigation luôn tồn tại.

```

LOGO

Search

Workspace Switcher

Notifications

Messages

Help Center

Profile

Settings

```

Người dùng có thể chuyển Workspace nếu có nhiều vai trò.

Ví dụ

Teacher

↓

Enterprise Reviewer

↓

Admin

không cần đăng xuất.

---

# 5. Workspace Structure

Mỗi Workspace đều sử dụng cùng một cấu trúc.

```

Overview

↓

Management

↓

Operations

↓

Analytics

↓

Reports

↓

Settings

```

Điều này giúp giảm thời gian học hệ thống.

---

# 6. Student Workspace

```

Student Workspace

│

├── Dashboard

│

├── Learning

│      ├── Learning Paths

│      ├── Courses

│      ├── Resources

│      ├── AI Recommendations

│

├── Assessment

│      ├── Upcoming

│      ├── Adaptive Tests

│      ├── Practice Tests

│      ├── Practical Assignments

│      ├── Peer Assessment

│      ├── External Assessment

│      ├── Appeals

│

├── Competencies

│      ├── Radar

│      ├── Matrix

│      ├── Progress

│      ├── Learning Outcomes

│      ├── AI Analysis

│      ├── Skill Gap

│

├── Portfolio

│      ├── Evidence

│      ├── Projects

│      ├── Github

│      ├── Reflection

│      ├── Teacher Feedback

│      ├── Employer Feedback

│

├── Certificates

│      ├── Digital Certificates

│      ├── Blockchain

│      ├── Verification

│

├── Career

│      ├── Job Matching

│      ├── CV Builder

│      ├── Skill Passport

│      ├── Career Coach

│

├── Community

│      ├── Discussions

│      ├── Mentors

│      ├── Events

│

├── AI Assistant

│

└── Settings

```

---

# 7. Teacher Workspace

```

Teacher Workspace

│

├── Dashboard

│

├── Classes

├── Students

├── Assessment Center

│      ├── Question Bank

│      ├── Adaptive Builder

│      ├── Rubrics

│      ├── AI Grading

│      ├── Manual Review

│      ├── Moderation

│      ├── Appeals

│

├── Learning

│

├── Analytics

│

├── Intervention

│

├── Reports

│

├── Marketplace

│

├── Calendar

│

├── Communication

│

├── AI Assistant

│

└── Settings

```

---

# 8. Enterprise Workspace

```

Enterprise Workspace

│

├── Dashboard

│

├── Recruitment

│

├── Candidates

│

├── Talent Search

│

├── Employees

│

├── Departments

│

├── Learning

│

├── Assessments

│

├── Certificates

│

├── Analytics

│

├── Billing

│

├── API

│

└── Settings

```

---

# 9. Admin Control Center

```

Admin

│

├── Dashboard

│

├── Identity

│

├── Organizations

│

├── Users

│

├── Roles

│

├── Permissions

│

├── Competency Framework

│

├── Question Bank

│

├── Assessment Engine

│

├── AI Engine

│

├── Evidence Center

│

├── Certificate Center

│

├── Blockchain

│

├── Marketplace

│

├── Billing

│

├── Notifications

│

├── Logs

│

├── Audit

│

├── Monitoring

│

├── API

│

├── Security

│

└── System Settings

```

---

# 10. Public Portal

```

Home

About

Solutions

Universities

Enterprise

Pricing

Marketplace

Documentation

Blog

Support

Sign In

```

---

# 11. Search Architecture

DIGVOS sử dụng Global Search.

Có thể tìm kiếm:

- Users
- Competencies
- Learning Outcomes
- Assessments
- Evidence
- Certificates
- Organizations
- Courses
- Jobs
- Reports

Search hoạt động xuyên suốt toàn hệ thống.

---

# 12. Notification Architecture

Thông báo được chia theo nhóm.

```

Inbox

↓

Unread

↓

Assessment

↓

Learning

↓

Certificates

↓

Jobs

↓

System

↓

Security

```

Notification hỗ trợ:

- In-app
- Email
- Push
- SMS
- Webhook

---

# 13. Universal Components

Tất cả Workspace đều sử dụng cùng Design Components.

## Navigation

- Sidebar
- Breadcrumb
- Tabs
- Context Menu

## Data

- Table
- Kanban
- Timeline
- Calendar
- Tree View
- Matrix

## Analytics

- Radar Chart
- Heatmap
- Line Chart
- Bar Chart
- Gauge
- KPI Card

## Forms

- Wizard
- Stepper
- Rich Text
- File Upload
- Code Editor
- Markdown Editor

---

# 14. URL Convention

```

/student/dashboard

/student/assessment

/student/assessment/adaptive

/student/competencies

/student/certificates

```

Teacher

```

/teacher/dashboard

/teacher/classes

/teacher/questions

```

Enterprise

```

/enterprise/dashboard

/enterprise/candidates

```

Admin

```

/admin/dashboard

/admin/users

/admin/roles

```

Quy tắc:

- URL ngắn gọn
- Không dùng ID tuần tự
- Hỗ trợ deep-link
- Có thể bookmark

---

# 15. Navigation Rules

Sidebar:

- Collapse / Expand
- Nested Menu
- Pin Favorite
- Recently Visited
- Quick Access

Header:

- Search
- Notification
- Profile
- Workspace Switcher

Breadcrumb:

Luôn hiển thị vị trí hiện tại.

Ví dụ:

```

Home

>

Student

>

Assessment

>

Adaptive Test

```

---

# 16. UX Principles

## Progressive Disclosure

Chỉ hiển thị những gì người dùng cần tại thời điểm đó.

---

## One-click Access

Các tác vụ thường dùng không quá 1–2 lần nhấp chuột.

---

## Context-aware

Giao diện thay đổi theo vai trò và ngữ cảnh.

---

## Responsive

Desktop là ưu tiên.

Tablet hỗ trợ đầy đủ.

Mobile tập trung vào các tác vụ cá nhân.

---

## Accessibility

- WCAG 2.2 AA
- Keyboard Navigation
- Screen Reader
- High Contrast
- Dark Mode

---

# 17. Future Expansion

Information Architecture được thiết kế để mở rộng mà không thay đổi cấu trúc gốc.

Có thể bổ sung:

- DigCompEdu Workspace
- Government Workspace
- Parent Workspace
- Research Workspace
- AI Marketplace
- Plugin Store
- Public API Explorer
- White-label Portal

Nhờ cấu trúc Workspace → Module → Feature → Page, DIGVOS có thể mở rộng lên hàng trăm chức năng mà không phá vỡ trải nghiệm người dùng.
