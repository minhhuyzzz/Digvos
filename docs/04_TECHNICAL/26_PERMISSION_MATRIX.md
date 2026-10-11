# DIGVOS

# 26_PERMISSION_MATRIX.md

Version: 1.0

Status: Draft

Owner: Platform Team

---

# Table of Contents

1. Purpose
2. Access Control Philosophy
3. Access Model
4. System Roles
5. Permission Structure
6. Resource Types
7. Permission Matrix
8. Data Scope
9. Delegation
10. Approval Permissions
11. Sensitive Operations
12. Audit Requirements
13. Security Principles
14. Future Expansion

---

# 1. Purpose

Tài liệu này định nghĩa mô hình phân quyền (Authorization Model) của DIGVOS.

Mục tiêu:

- Chuẩn hóa quyền truy cập
- Bảo vệ dữ liệu
- Hỗ trợ Multi-Tenant
- Hỗ trợ Role-Based Access Control (RBAC)
- Dễ mở rộng trong tương lai

Permission Matrix là nguồn tham chiếu chính cho Backend, Frontend và QA.

---

# 2. Access Control Philosophy

DIGVOS áp dụng nguyên tắc:

Authentication

↓

Authorization

↓

Data Scope

↓

Business Rules

↓

Audit

Mọi thao tác đều phải:

- Xác thực người dùng
- Kiểm tra quyền
- Kiểm tra phạm vi dữ liệu
- Ghi Audit Log

---

# 3. Access Model

DIGVOS sử dụng:

Role-Based Access Control (RBAC)

kết hợp với

Resource-Based Authorization

và

Tenant Isolation

Quyết định cuối cùng phụ thuộc vào:

- User
- Role
- Permission
- Organization
- Tenant
- Resource Ownership

---

# 4. System Roles

DIGVOS có bốn vai trò chính:

## Individual

Bao gồm:

- Student
- Employee

---

## Teacher

Bao gồm:

- Lecturer
- Trainer
- Mentor
- Reviewer

---

## Enterprise

Bao gồm:

- Organization Admin
- HR
- Manager
- Recruiter

---

## Platform Admin

Bao gồm:

- Super Admin
- Platform Admin
- Support Engineer

---

# 5. Permission Structure

Permission được đặt theo quy tắc:

```
resource.action
```

Ví dụ:

```
assessment.read

assessment.create

assessment.update

assessment.delete

certificate.issue

user.manage

organization.manage
```

Các Action chuẩn:

Read

Create

Update

Delete

Approve

Review

Assign

Export

Import

Manage

Configure

---

# 6. Resource Types

Identity

Organizations

Users

Competencies

Assessments

Learning

Evidence

Certificates

Analytics

Reports

Messages

AI

Workflow

Integrations

Settings

Audit Logs

---

# 7. Permission Matrix

| Module | Individual | Teacher | Enterprise | Platform Admin |
|----------|:---------:|:-------:|:----------:|:--------------:|
| View Profile | ✓ | ✓ | ✓ | ✓ |
| Edit Own Profile | ✓ | ✓ | ✓ | ✓ |
| View Organization | ✓ | ✓ | ✓ | ✓ |
| Manage Organization | ✗ | ✗ | ✓ | ✓ |
| View Competencies | ✓ | ✓ | ✓ | ✓ |
| Evaluate Competencies | ✗ | ✓ | ✓ | ✓ |
| Manage Competency Framework | ✗ | ✗ | ✗ | ✓ |
| Submit Evidence | ✓ | ✓ | ✓ | ✓ |
| Review Evidence | ✗ | ✓ | ✓ | ✓ |
| Create Assessment | ✗ | ✓ | ✓ | ✓ |
| Assign Assessment | ✗ | ✓ | ✓ | ✓ |
| Complete Assessment | ✓ | ✓ | ✓ | ✓ |
| Review Assessment | ✗ | ✓ | ✓ | ✓ |
| Manage Courses | ✗ | ✓ | ✓ | ✓ |
| View Learning Progress | ✓ | ✓ | ✓ | ✓ |
| Manage Learning Paths | ✗ | ✓ | ✓ | ✓ |
| View Certificates | ✓ | ✓ | ✓ | ✓ |
| Issue Certificates | ✗ | ✗ | ✓ | ✓ |
| Verify Certificates | ✓ | ✓ | ✓ | ✓ |
| View Analytics | Limited | Organization | Organization | Global |
| Export Reports | Own | Class | Organization | Global |
| Manage Users | ✗ | ✗ | ✓ | ✓ |
| Manage Roles | ✗ | ✗ | Limited | ✓ |
| Configure Platform | ✗ | ✗ | Limited | ✓ |
| Manage AI Settings | ✗ | ✗ | Limited | ✓ |
| Manage Integrations | ✗ | ✗ | ✓ | ✓ |
| View Audit Logs | ✗ | ✗ | Limited | ✓ |

---

# 8. Data Scope

## Individual

Chỉ truy cập:

- Dữ liệu cá nhân
- Chứng chỉ cá nhân
- Assessment của bản thân
- Portfolio của bản thân

---

## Teacher

Truy cập:

- Lớp học được phân công
- Học viên được phân công
- Assessment được phân công
- Evidence cần đánh giá

Không xem dữ liệu ngoài phạm vi được giao.

---

## Enterprise

Truy cập:

- Dữ liệu thuộc Organization
- Phòng ban
- Nhân viên
- Báo cáo
- Dashboard doanh nghiệp

Không truy cập Tenant khác.

---

## Platform Admin

Có quyền trên toàn hệ thống.

Mọi thao tác đều phải ghi Audit Log.

---

# 9. Delegation

Enterprise có thể:

Ủy quyền tạm thời cho:

- Manager
- Reviewer
- Team Lead

Thông tin phải bao gồm:

- Người giao
- Người nhận
- Thời gian hiệu lực
- Phạm vi quyền

---

# 10. Approval Permissions

Các thao tác cần phê duyệt:

Issue Certificate

Approve Evidence

Approve Assessment

Publish Framework Version

Delete Organization

Delete User

Delete Tenant

Approval Workflow được quản lý bởi Workflow Automation Engine.

---

# 11. Sensitive Operations

Các thao tác sau yêu cầu xác thực bổ sung (Re-authentication hoặc MFA):

Đổi mật khẩu

Đổi Email

Đổi Role

Xóa Organization

Xóa Tenant

Thay đổi AI Provider

Thay đổi Integration

Xuất dữ liệu quy mô lớn

---

# 12. Audit Requirements

Các hành động phải ghi Audit:

Login

Logout

Permission Change

Role Change

Certificate Issued

Framework Updated

Assessment Published

Evidence Approved

Organization Created

Tenant Updated

Audit Log không được phép chỉnh sửa.

---

# 13. Security Principles

Áp dụng nguyên tắc:

Least Privilege

Need-to-Know

Separation of Duties

Zero Trust

Mặc định:

"Deny by Default"

Mọi quyền phải được cấp rõ ràng.

---

# 14. Future Expansion

Permission System sẽ hỗ trợ:

Attribute-Based Access Control (ABAC)

Policy-Based Access Control (PBAC)

Dynamic Permission

Time-based Permission

Location-based Permission

Conditional Access

External Identity Federation

Permission Templates

---

# Summary

DIGVOS áp dụng mô hình RBAC kết hợp Resource-Based Authorization và Multi-Tenant Isolation để kiểm soát quyền truy cập trên toàn hệ thống. Permission Matrix đóng vai trò là tài liệu chuẩn cho việc triển khai Backend, Frontend và kiểm thử, đảm bảo mọi chức năng đều được phân quyền nhất quán, an toàn và có khả năng mở rộng.