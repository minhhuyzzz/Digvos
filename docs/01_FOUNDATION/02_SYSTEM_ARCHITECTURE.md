# DIGVOS

# 02_SYSTEM_ARCHITECTURE.md

Version: 1.0

Status: Draft

Owner: Product & Engineering Team

---

# Table of Contents

1. Architecture Philosophy
2. Architecture Principles
3. System Layers
4. Core Business Domains
5. Core Engines
6. User Applications
7. Platform Services
8. External Integrations
9. High-Level Architecture
10. Data Flow
11. Request Flow
12. Domain Boundaries
13. Multi-tenancy
14. Scalability
15. Event-driven Architecture
16. Security Architecture
17. Future Expansion

---

# 1. Architecture Philosophy

DIGVOS không được thiết kế như một website.

Không được thiết kế như một LMS.

Không được thiết kế như một hệ thống thi trực tuyến.

DIGVOS được thiết kế như một

# Digital Competence Operating System

Nơi mọi thành phần đều xoay quanh việc quản lý vòng đời năng lực số.

```
Assessment

↓

Evidence

↓

Validation

↓

Certification

↓

Employment

↓

Reskilling

↓

Assessment
```

Đây là vòng đời trung tâm của toàn bộ hệ thống.

---

# 2. Architecture Principles

## Domain Driven Design

Mỗi domain độc lập.

Không phụ thuộc trực tiếp.

Ví dụ

Assessment

không biết

Certificate

hoạt động như thế nào.

Nó chỉ publish event.

---

## API First

Mọi chức năng đều thông qua API.

Không có business logic trong Frontend.

---

## AI Native

AI là thành phần gốc.

Không phải plugin.

AI tham gia:

- Grading
- Feedback
- Recommendation
- Analytics
- Matching
- Coaching

---

## Modular

Có thể thêm engine mới.

Không sửa engine cũ.

---

## Event Driven

Các module giao tiếp thông qua Events.

Ví dụ

Assessment Completed

↓

AI Analysis

↓

Portfolio Updated

↓

Certificate Eligibility Checked

↓

Notification Sent

---

## Enterprise Ready

Hỗ trợ

- nhiều tổ chức
- nhiều trường
- nhiều doanh nghiệp
- nhiều tenant

---

# 3. High-Level Architecture

```
                    USERS

        Student
        Teacher
        Enterprise
        Admin
        Public

                 │

                 ▼

──────────────────────────────────────────────

Presentation Layer

Web App

Mobile App

Public Portal

Employer Portal

Admin Portal

──────────────────────────────────────────────

Application Layer

Authentication

Authorization

Workspace

Dashboard

Workflow

API Gateway

──────────────────────────────────────────────

Business Layer

Assessment Engine

Learning Engine

Evidence Engine

AI Engine

Certification Engine

Talent Engine

Notification Engine

Analytics Engine

Marketplace Engine

Billing Engine

──────────────────────────────────────────────

Infrastructure Layer

Database

Storage

Search

Queue

Cache

Logging

Monitoring

──────────────────────────────────────────────

External Services

Gemini

OpenAI

Polygon

Google

Microsoft

Moodle

Canvas

Email

SMS

```

---

# 4. Core Business Domains

DIGVOS chia thành các Domain.

## Identity Domain

Quản lý

Users

Organizations

Roles

Permissions

Authentication

Authorization

Profile

Digital Identity

---

## Assessment Domain

Question Bank

Adaptive Testing

Static Testing

Practical Assessment

Peer Assessment

Teacher Assessment

Employer Assessment

Self Assessment

Rubrics

Scoring

Appeals

---

## Learning Domain

Learning Path

Courses

Resources

Assignments

Recommendations

Learning Outcomes

---

## Competency Domain

Competency Areas

Competencies

Learning Outcomes

Proficiency Levels

Skill Gap

Progress

Competency History

---

## Evidence Domain

Portfolio

Projects

Evidence Files

Github

Certificates

Videos

Reflections

Reviews

Validation

---

## Certification Domain

Digital Certificate

Blockchain Certificate

Verification

Expiration

Renewal

Credential Wallet

Badge

---

## Talent Domain

Jobs

Employers

Matching

Recruitment

Talent Pool

Hiring

Interview

Career

---

## AI Domain

AI Coach

AI Grader

AI Reviewer

AI Recommendation

AI Analytics

AI Chat

Prompt Library

---

## Analytics Domain

Dashboards

KPIs

Heatmaps

Predictions

Reports

Exports

Benchmark

---

## Marketplace Domain

Courses

Assessments

Templates

Question Packs

Rubrics

Plugins

---

## Billing Domain

Subscription

Invoices

Payments

Credits

Licenses

Coupons

---

# 5. Core Engines

DIGVOS hoạt động nhờ các Engine.

## Assessment Engine

Quản lý toàn bộ bài đánh giá.

---

## Learning Engine

Quản lý quá trình học.

---

## Competency Engine

Tính toán năng lực.

Đây là trái tim của hệ thống.

---

## Evidence Engine

Quản lý minh chứng.

---

## AI Engine

Tự động phân tích.

---

## Certification Engine

Cấp chứng nhận.

---

## Talent Intelligence Engine

Ghép năng lực với việc làm.

---

## Analytics Engine

Toàn bộ báo cáo.

---

## Notification Engine

Email

SMS

Push

In-app

Webhook

---

## Integration Engine

LMS

SSO

ERP

HRM

CRM

API

---

# 6. User Applications

DIGVOS không có một Dashboard.

Mỗi vai trò có Workspace riêng.

```
Student Workspace

Teacher Workspace

Enterprise Workspace

Admin Control Center

Public Portal

API Portal
```

Mỗi Workspace có Navigation riêng.

Không dùng chung menu.

---

# 7. Platform Services

Authentication Service

Authorization Service

Search Service

Storage Service

Notification Service

Audit Service

Logging Service

Analytics Service

Configuration Service

Localization Service

Media Service

Scheduling Service

Workflow Service

Webhook Service

---

# 8. External Integrations

Learning Platforms

- Moodle
- Canvas
- Google Classroom

Identity

- Google
- Microsoft
- Azure AD
- Keycloak

Communication

- Email
- SMS
- Zalo
- Teams
- Slack

AI

- Gemini
- OpenAI
- Local LLM

Storage

- S3
- Supabase

Blockchain

- Polygon

Business Intelligence

- Power BI
- Metabase

---

# 9. Data Flow

```
User

↓

Assessment

↓

Assessment Engine

↓

AI Engine

↓

Competency Engine

↓

Evidence Engine

↓

Certification Engine

↓

Talent Engine

↓

Analytics Engine

↓

Dashboard
```

---

# 10. Assessment Flow

```
Student

↓

Start Assessment

↓

Adaptive Engine

↓

Question Generator

↓

Answer

↓

AI Grading

↓

Teacher Review

↓

Competency Update

↓

Evidence Mapping

↓

Certificate Check

↓

Notification
```

---

# 11. Event Flow

Ví dụ

```
Assessment Completed

↓

publish event

↓

AI Engine

↓

publish event

↓

Competency Updated

↓

publish event

↓

Certificate Eligible

↓

publish event

↓

Issue Certificate

↓

publish event

↓

Send Notification
```

Toàn bộ hệ thống giao tiếp bằng Event.

Không gọi trực tiếp giữa các module.

---

# 12. Multi-tenancy

DIGVOS hỗ trợ nhiều tổ chức.

```
Platform

├── University A

├── University B

├── Company C

├── Company D

└── Government
```

Mỗi tenant có

Users

Courses

Assessments

Reports

Certificates

Branding

Roles

riêng biệt.

---

# 13. Scalability Strategy

Stateless API

Horizontal Scaling

Load Balancer

CDN

Redis Cache

Object Storage

Queue System

Search Engine

Background Workers

---

# 14. Security Architecture

OAuth2

JWT

RBAC

ABAC (future)

Audit Log

Encryption

MFA

Session Control

API Rate Limit

Secrets Manager

Data Isolation

GDPR Compliance

---

# 15. Architecture Decisions

## Không dùng Monolithic

Lý do

Khó mở rộng.

---

## Modular Monolith (MVP)

MVP sử dụng Modular Monolith.

Dễ phát triển.

---

## Microservices (Future)

Sau khi vượt

100.000 users

chuyển sang

Event-driven Microservices.

---

# 16. Future Expansion

Có thể bổ sung thêm

DigCompEdu Engine

DigCompOrg Engine

GreenComp Engine

EntreComp Engine

LifeComp Engine

ESCO Integration

Europass Integration

European Digital Identity Wallet

Open Badge Network

Skill Passport

---

# 17. Architecture Summary

DIGVOS gồm 5 tầng.

Presentation Layer

↓

Application Layer

↓

Business Layer

↓

Infrastructure Layer

↓

External Services

Business Layer bao gồm các Engine độc lập.

Mỗi Engine quản lý một Domain.

Các Engine giao tiếp thông qua Event.

Mọi Workspace đều sử dụng chung các Engine.

Nhờ vậy hệ thống có thể mở rộng mà không ảnh hưởng các thành phần còn lại.
