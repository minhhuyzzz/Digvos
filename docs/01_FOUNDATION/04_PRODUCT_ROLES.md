# DIGVOS

# 04_PRODUCT_ROLES.md

Version: 2.0

Status: Draft

Owner: Product Team

---

# Table of Contents

1. Purpose
2. Product Role Philosophy
3. Product Role Hierarchy
4. Workspace Overview
5. Individual Workspace
6. Teacher Workspace
7. Enterprise Workspace
8. Admin Control Center
9. Cross-Role Collaboration
10. Role Switching
11. Future Expansion

---

# 1. Purpose

DIGVOS được xây dựng để phục vụ nhiều nhóm người dùng khác nhau.

Tuy nhiên, thay vì tạo nhiều Dashboard riêng biệt, hệ thống chỉ cung cấp **4 Workspace chính**.

Mỗi Workspace có thể phục vụ nhiều nhóm người dùng thông qua các Sub-role và Permission.

Điều này giúp:

- Giảm độ phức tạp của giao diện.
- Dễ mở rộng.
- Dễ bảo trì.
- Đảm bảo trải nghiệm nhất quán.

---

# 2. Product Role Philosophy

DIGVOS phân biệt rõ hai khái niệm:

## Product Role

Là vai trò mà người dùng nhìn thấy.

Ví dụ:

- Individual
- Teacher
- Enterprise
- Admin

Product Role quyết định Workspace.

---

## System Role

Là vai trò nội bộ phục vụ phân quyền.

Ví dụ:

- Teacher
- Teaching Assistant
- Reviewer
- Recruiter
- Support Engineer

System Role không tạo Dashboard mới.

Chỉ thay đổi quyền truy cập trong cùng một Workspace.

---

# 3. Product Role Hierarchy

```
DIGVOS

├── Individual Workspace
│
├── Teacher Workspace
│
├── Enterprise Workspace
│
└── Admin Control Center
```

Đây là bốn Workspace duy nhất của toàn bộ hệ thống.

Mọi chức năng đều được xây dựng bên trong bốn Workspace này.

---

# 4. Workspace Overview

| Workspace | Đối tượng | Mục tiêu chính |
|------------|-----------|----------------|
| Individual | Sinh viên, nhân viên, người học | Phát triển và chứng minh năng lực số |
| Teacher | Giảng viên, người đánh giá | Đánh giá, hướng dẫn và xác nhận năng lực |
| Enterprise | Doanh nghiệp | Tuyển dụng, đào tạo và quản trị năng lực nhân sự |
| Admin | Đơn vị vận hành hệ thống | Quản trị toàn bộ nền tảng |

---

# 5. Individual Workspace

## Mục tiêu

Giúp mỗi cá nhân quản lý toàn bộ vòng đời năng lực số.

```
Assessment

↓

Learning

↓

Evidence

↓

Certification

↓

Career
```

---

## Đối tượng sử dụng

- Student
- Employee
- Job Seeker
- Alumni
- Lifelong Learner

Các đối tượng này sử dụng cùng một Workspace.

Khác biệt chỉ nằm ở quyền truy cập và dữ liệu.

---

## Chức năng chính

### Dashboard

Tổng quan tiến độ.

---

### Learning

- Learning Path
- Courses
- Resources

---

### Assessment

- Adaptive Test
- Practice
- Scheduled Assessment

---

### Competencies

- Radar
- Matrix
- Skill Gap
- Learning Outcomes

---

### Portfolio

- Evidence
- Projects
- Reflection
- Feedback

---

### Certificates

- Digital Certificate
- Verification
- Badge

---

### Career

- Job Matching
- Skill Passport
- Career Coach

---

### AI Assistant

- Learning Coach
- Competency Coach
- Career Coach

---

# 6. Teacher Workspace

## Mục tiêu

Hỗ trợ giảng viên quản lý quá trình đánh giá và phát triển năng lực người học.

---

## Đối tượng

- Teacher
- Teaching Assistant
- Reviewer
- Mentor
- External Assessor

---

## Chức năng chính

### Dashboard

### Class Management

### Assessment Center

### Question Bank

### AI Grading

### Manual Review

### Competency Analytics

### Student Progress

### Reports

### Communication

### Calendar

### AI Assistant

---

# 7. Enterprise Workspace

## Mục tiêu

Giúp doanh nghiệp đánh giá, tuyển dụng và phát triển nguồn nhân lực dựa trên DigComp.

---

## Đối tượng

- HR
- Recruiter
- Hiring Manager
- Department Manager
- Learning & Development Manager

---

## Chức năng chính

### Dashboard

### Recruitment

### Talent Search

### Candidate Evaluation

### Employee Competencies

### Internal Learning

### Analytics

### Reports

### API Integration

### Billing

---

# 8. Admin Control Center

## Mục tiêu

Quản trị toàn bộ nền tảng DIGVOS.

Đây là Workspace có quyền cao nhất.

---

## Đối tượng

- Super Administrator
- Platform Administrator
- Security Administrator
- Support Engineer
- Auditor

---

## Chức năng chính

### Dashboard

### Identity Management

### Organizations

### Users

### Roles & Permissions

### Competency Framework

### Assessment Engine

### AI Engine

### Evidence Center

### Certificate Center

### Marketplace

### Billing

### Notifications

### Audit Logs

### Monitoring

### Security Center

### System Settings

---

# 9. Cross-Role Collaboration

DIGVOS không hoạt động theo mô hình độc lập giữa các Workspace.

Các Workspace liên kết với nhau thông qua quy trình nghiệp vụ.

Ví dụ:

```
Individual

↓

Complete Assessment

↓

Teacher

↓

Review

↓

Enterprise

↓

View Verified Competencies

↓

Admin

↓

Audit
```

---

Ví dụ khác:

```
Enterprise

↓

Request Assessment

↓

Teacher

↓

Evaluate

↓

Individual

↓

Receive Feedback

↓

Certificate

```

Điều này giúp toàn bộ hệ thống hoạt động như một hệ sinh thái thống nhất.

---

# 10. Role Switching

Một người dùng có thể đảm nhiệm nhiều vai trò.

Ví dụ:

- Giảng viên đồng thời là Mentor.
- Nhân viên doanh nghiệp đồng thời là người học.
- HR đồng thời là Reviewer.

Trong trường hợp này, người dùng có thể chuyển đổi Workspace mà không cần đăng xuất.

Ví dụ:

```
Teacher Workspace

↓

Switch Workspace

↓

Enterprise Workspace

↓

Switch Workspace

↓

Admin Control Center
```

Hệ thống sẽ tự động áp dụng quyền tương ứng.

---

# 11. Design Principles

Tất cả Workspace đều tuân theo các nguyên tắc:

- Sidebar có thể thu gọn hoặc mở rộng.
- Header thống nhất trên toàn hệ thống.
- Global Search hoạt động xuyên suốt.
- Notification Center dùng chung.
- Breadcrumb thống nhất.
- Responsive trên Desktop và Tablet.
- Hỗ trợ Dark Mode.
- Tuân thủ WCAG 2.2.

---

# 12. Future Expansion

Kiến trúc Workspace cho phép bổ sung các Workspace chuyên biệt mà không ảnh hưởng đến hệ thống hiện tại.

Ví dụ:

- Government Workspace
- Research Workspace
- Parent Workspace
- Partner Workspace

Tuy nhiên, trong phiên bản thương mại đầu tiên (MVP và Enterprise Edition), DIGVOS chỉ sử dụng bốn Workspace chính để đảm bảo tính đơn giản, nhất quán và dễ mở rộng.

---

# Summary

DIGVOS được xây dựng trên mô hình **4 Workspace**:

1. Individual Workspace
2. Teacher Workspace
3. Enterprise Workspace
4. Admin Control Center

Đây là bốn không gian làm việc cốt lõi của nền tảng.

Các System Role (Teacher, Reviewer, Recruiter, Support...) chỉ mở rộng quyền truy cập bên trong Workspace tương ứng và không tạo thêm Dashboard mới.

Kiến trúc này giúp DIGVOS vừa đơn giản đối với người dùng cuối, vừa đủ linh hoạt để triển khai trong các trường đại học, doanh nghiệp và tổ chức quy mô lớn.