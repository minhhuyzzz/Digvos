# DIGVOS

# 24_DATABASE_DESIGN.md

Version: 1.0

Status: Draft

Owner: Backend Team

---

# Table of Contents

1. Purpose
2. Database Philosophy
3. Architecture
4. Multi-Tenant Strategy
5. Domain Model
6. Core Entities
7. Relationship Principles
8. Naming Convention
9. Audit Strategy
10. Soft Delete Strategy
11. Versioning
12. Indexing
13. Data Integrity
14. Backup & Recovery
15. Security
16. Future Expansion

---

# 1. Purpose

Tài liệu này mô tả kiến trúc cơ sở dữ liệu của DIGVOS.

Mục tiêu:

- Chuẩn hóa thiết kế dữ liệu
- Đảm bảo khả năng mở rộng
- Hỗ trợ Multi-Tenant
- Đảm bảo tính toàn vẹn dữ liệu
- Phục vụ phân tích và AI

Đây không phải tài liệu ERD chi tiết mà là tài liệu định hướng thiết kế Database.

---

# 2. Database Philosophy

Database được thiết kế theo các nguyên tắc:

Business First

↓

Domain Driven Design

↓

Normalization

↓

Scalability

↓

Auditability

↓

Security

Không thiết kế Database theo giao diện.

Không thiết kế theo API.

Database phản ánh Business Domain.

---

# 3. Architecture

DIGVOS sử dụng kiến trúc:

Application

↓

Domain

↓

Repository

↓

Database

Database được chia thành các Domain thay vì gom toàn bộ vào một schema duy nhất.

Ví dụ:

Identity

Assessment

Competency

Learning

Evidence

Certification

Analytics

Workflow

Communication

Integration

---

# 4. Multi-Tenant Strategy

Mọi dữ liệu nghiệp vụ đều thuộc một Tenant.

```
Tenant

↓

Organization

↓

Department

↓

User

↓

Business Data
```

Mỗi bản ghi nghiệp vụ phải có Tenant ID.

Isolation được xử lý ở tầng Application và Database.

---

# 5. Domain Model

Các Domain chính:

Identity

Organization

Competency

Learning

Assessment

Evidence

Certification

Workflow

Analytics

Communication

AI

Integration

Mỗi Domain có Repository riêng.

---

# 6. Core Entities

Identity

- User
- Role
- Permission
- Group
- Session

Organization

- Tenant
- Organization
- Department
- Position

Competency

- Framework
- Competency Area
- Competency
- Proficiency Level
- Rubric

Assessment

- Assessment
- Question
- Attempt
- Result

Learning

- Course
- Module
- Lesson
- Enrollment

Evidence

- Portfolio
- Evidence
- Review

Certification

- Certificate
- Badge
- Verification

Workflow

- Workflow
- Task
- Approval

Analytics

- Dashboard
- Report

Communication

- Notification
- Message

---

# 7. Relationship Principles

Quan hệ ưu tiên:

One-to-Many

Many-to-Many thông qua Junction Table

Không lưu dữ liệu lặp.

Không lưu dữ liệu tính toán nếu có thể tính từ nguồn.

Reference Data được chuẩn hóa.

---

# 8. Naming Convention

Table

snake_case

Ví dụ:

users

competencies

assessment_attempts

Columns

snake_case

Primary Key

id

Foreign Key

organization_id

user_id

assessment_id

Timestamp

created_at

updated_at

deleted_at

UUID được ưu tiên hơn Auto Increment ID.

---

# 9. Audit Strategy

Mọi Entity nghiệp vụ đều nên có:

created_at

created_by

updated_at

updated_by

deleted_at

deleted_by

version

Một số bảng quan trọng có Audit Log riêng.

---

# 10. Soft Delete Strategy

Không xóa vật lý dữ liệu nghiệp vụ.

Sử dụng:

deleted_at

deleted_by

Restore được khi cần.

Chỉ Platform Admin mới được thực hiện Hard Delete trong các trường hợp đặc biệt.

---

# 11. Versioning

Áp dụng cho:

Competency Framework

Assessment

Rubric

Certificate Template

Workflow

Learning Content

Mỗi phiên bản có:

Version Number

Effective Date

Status

Author

Change Log

---

# 12. Indexing

Index cho:

Foreign Keys

Email

Username

Organization ID

Competency Code

Certificate Code

Assessment ID

Created At

Full-text Search sẽ được xử lý bởi Search Service nếu triển khai trong tương lai.

---

# 13. Data Integrity

Áp dụng:

Primary Key

Foreign Key

Unique Constraint

Check Constraint

Not Null

Cascade Rule

Transaction

Không cho phép dữ liệu mồ côi (Orphan Records).

---

# 14. Backup & Recovery

Hỗ trợ:

Daily Backup

Point-in-Time Recovery

Disaster Recovery

Backup Verification

Retention Policy

Khả năng khôi phục phải được kiểm thử định kỳ.

---

# 15. Security

Mã hóa dữ liệu nhạy cảm.

Phân quyền truy cập theo Role.

Không lưu mật khẩu dạng văn bản.

Hỗ trợ:

Encryption at Rest

Encryption in Transit

Database Audit

Row-level Security (nếu DBMS hỗ trợ)

---

# 16. Future Expansion

Database Architecture sẽ hỗ trợ:

Read Replica

Database Sharding

Partitioning

Event Sourcing

CQRS

Data Warehouse

Lakehouse

Vector Database (AI)

Knowledge Graph

---

# Summary

Database của DIGVOS được thiết kế theo hướng Domain-Driven, Multi-Tenant và có khả năng mở rộng.

Kiến trúc ưu tiên tính toàn vẹn dữ liệu, khả năng kiểm toán, bảo mật và hỗ trợ phát triển lâu dài thay vì chỉ đáp ứng nhu cầu của phiên bản MVP.