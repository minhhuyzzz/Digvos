# DIGVOS

# 05_BUSINESS_DOMAINS.md

Version: 1.0

Status: Draft

Owner: Product Team

---

# Table of Contents

1. Purpose
2. Business Domain Overview
3. Domain Relationships
4. Identity Domain
5. Organization Domain
6. Competency Domain
7. Learning Domain
8. Assessment Domain
9. Evidence Domain
10. Certification Domain
11. Talent Domain
12. AI Domain
13. Analytics Domain
14. Marketplace Domain
15. Communication Domain
16. Billing Domain
17. Integration Domain
18. Domain Dependencies
19. Future Domains

---

# 1. Purpose

DIGVOS được xây dựng theo Domain-Driven Design (DDD).

Thay vì phát triển theo từng màn hình (Screen-first), DIGVOS được chia thành các Business Domain.

Mỗi Domain đại diện cho một lĩnh vực nghiệp vụ độc lập.

Mỗi Domain:

- Có dữ liệu riêng.
- Có logic nghiệp vụ riêng.
- Có API riêng.
- Có quyền truy cập riêng.
- Có thể phát triển độc lập.

Điều này giúp hệ thống dễ mở rộng và bảo trì.

---

# 2. Business Domain Overview

```

DIGVOS

│

├── Identity

├── Organization

├── Competency

├── Learning

├── Assessment

├── Evidence

├── Certification

├── Talent

├── AI

├── Analytics

├── Marketplace

├── Communication

├── Billing

└── Integration

```

Đây là 14 Domain cốt lõi của nền tảng.

---

# 3. Domain Relationships

```

Identity

│

├──────────────┐

│              │

▼              ▼

Organization  Competency

│              │

▼              ▼

Learning   Assessment

│              │

└──────┬───────┘

▼

Evidence

↓

Certification

↓

Talent

↓

Analytics

↓

AI

```

Không có Domain nào hoạt động độc lập.

Mỗi Domain đều liên kết thông qua nghiệp vụ.

---

# 4. Identity Domain

## Mục tiêu

Quản lý danh tính người dùng.

## Chức năng

- Authentication
- Authorization
- Profile
- Session
- MFA
- SSO
- API Key
- Device Management

## Thực thể chính

- User
- Profile
- Session
- Login History
- Device

---

# 5. Organization Domain

## Mục tiêu

Quản lý các tổ chức sử dụng DIGVOS.

Ví dụ:

- Trường đại học
- Doanh nghiệp
- Trung tâm đào tạo
- Cơ quan nhà nước

## Chức năng

- Organization
- Department
- Faculty
- Team
- Campus
- Branding
- Subscription

---

# 6. Competency Domain

Đây là Domain quan trọng nhất của DIGVOS.

## Mục tiêu

Quản lý toàn bộ Khung năng lực số.

## Thành phần

- Competence Area
- Competence
- Learning Outcome
- Proficiency Level
- Indicator
- Skill Gap
- Competency History

## Dựa trên

- DigComp 3.0
- DigCompEdu (mở rộng)
- GreenComp (tương lai)

---

# 7. Learning Domain

## Mục tiêu

Quản lý quá trình học tập.

## Thành phần

- Learning Path
- Course
- Lesson
- Module
- Resource
- Assignment
- Recommendation

Learning Domain không chịu trách nhiệm đánh giá.

Chỉ quản lý học tập.

---

# 8. Assessment Domain

## Mục tiêu

Đánh giá năng lực.

## Loại Assessment

- Adaptive Assessment
- Static Assessment
- Practical Assessment
- Peer Assessment
- Teacher Assessment
- Enterprise Assessment
- Self Assessment

## Thành phần

- Question Bank
- Rubrics
- Attempt
- Result
- Appeals
- AI Grading

---

# 9. Evidence Domain

## Mục tiêu

Lưu trữ minh chứng.

Đây là điểm khác biệt lớn nhất giữa DIGVOS và LMS.

## Thành phần

- Portfolio
- Project
- Github
- Video
- Reflection
- Teacher Review
- Employer Review
- Validation

Một Competency chỉ được công nhận khi có Evidence phù hợp.

---

# 10. Certification Domain

## Mục tiêu

Cấp và xác thực chứng nhận.

## Thành phần

- Certificate
- Badge
- Credential
- Blockchain Record
- Verification
- Revocation
- Renewal

---

# 11. Talent Domain

## Mục tiêu

Kết nối năng lực với việc làm.

## Thành phần

- Candidate
- Employer
- Job
- Skill Matching
- Interview
- Recommendation
- Talent Pool

---

# 12. AI Domain

AI là thành phần lõi.

Không phải Plugin.

## Chức năng

- AI Grading
- AI Feedback
- AI Coach
- AI Recommendation
- AI Career Advisor
- AI Analytics
- AI Chat

AI chỉ hỗ trợ.

Quyết định cuối cùng thuộc về con người.

---

# 13. Analytics Domain

## Mục tiêu

Biến dữ liệu thành thông tin.

## Thành phần

- KPI Dashboard
- Heatmap
- Competency Trends
- Skill Gap Report
- Learning Report
- Organization Report
- Predictive Analytics

---

# 14. Marketplace Domain

Cho phép mở rộng hệ sinh thái.

## Bao gồm

- Courses
- Assessment Packs
- Question Bank
- Templates
- Plugins
- AI Prompt Packs

---

# 15. Communication Domain

Quản lý toàn bộ giao tiếp.

## Bao gồm

- Notification
- Email
- Push Notification
- SMS
- Discussion
- Announcement
- Messaging

---

# 16. Billing Domain

Dành cho mô hình SaaS.

## Bao gồm

- Subscription
- Plan
- Invoice
- Payment
- License
- Coupon
- Usage

---

# 17. Integration Domain

Kết nối với hệ thống bên ngoài.

## LMS

- Moodle
- Canvas
- Google Classroom

## Identity

- Google
- Microsoft
- Azure AD
- Keycloak

## AI

- Gemini
- OpenAI

## Storage

- S3
- Supabase

## BI

- Power BI
- Metabase

---

# 18. Domain Dependencies

| Domain | Phụ thuộc |
|----------|------------|
| Assessment | Competency, Identity |
| Learning | Competency |
| Evidence | Assessment, Competency |
| Certification | Evidence, Competency |
| Talent | Certification |
| Analytics | Tất cả Domain |
| AI | Assessment, Learning, Competency |
| Billing | Organization |

Mỗi Domain chỉ phụ thuộc vào Domain cần thiết.

Hạn chế phụ thuộc vòng (Circular Dependency).

---

# 19. Domain Ownership

| Domain | Chủ sở hữu |
|----------|------------|
| Identity | Platform |
| Organization | Platform |
| Competency | Academic Team |
| Learning | Academic Team |
| Assessment | Academic Team |
| Evidence | User |
| Certification | System |
| Talent | Enterprise |
| AI | AI Service |
| Analytics | Platform |

Điều này giúp phân chia trách nhiệm rõ ràng khi phát triển.

---

# 20. Future Domains

DIGVOS được thiết kế để có thể mở rộng thêm:

- DigCompEdu Domain
- GreenComp Domain
- EntreComp Domain
- LifeComp Domain
- Research Domain
- Government Domain
- Open API Domain
- Plugin Ecosystem

Các Domain mới có thể được thêm vào mà không ảnh hưởng đến kiến trúc hiện tại.

---

# Summary

DIGVOS được xây dựng trên nền tảng Domain-Driven Design với 14 Business Domain cốt lõi.

Thay vì tổ chức theo giao diện, toàn bộ hệ thống được tổ chức theo nghiệp vụ.

Điều này giúp:

- Dễ mở rộng.
- Dễ bảo trì.
- Dễ phát triển song song.
- Phù hợp với kiến trúc SaaS Enterprise.
- Sẵn sàng triển khai Microservices trong tương lai.