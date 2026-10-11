# DIGVOS

# 09_EVIDENCE_ENGINE.md

Version: 1.0

Status: Draft

Owner: Product Team

---

# Table of Contents

1. Purpose
2. Evidence Philosophy
3. Evidence Lifecycle
4. Core Components
5. Evidence Types
6. Validation Workflow
7. Portfolio
8. Competency Mapping
9. Review System
10. Evidence Quality Score
11. Privacy & Sharing
12. Business Rules
13. Domain Events
14. APIs
15. Future Expansion

---

# 1. Purpose

Evidence Engine là hệ thống quản lý toàn bộ minh chứng năng lực (Evidence) của người dùng.

Khác với các hệ thống LMS truyền thống chỉ lưu điểm số hoặc bài nộp, DIGVOS coi Evidence là nền tảng để xác minh năng lực thực tế.

Một Competency chỉ được công nhận khi có Evidence phù hợp.

---

# 2. Evidence Philosophy

DIGVOS áp dụng nguyên tắc:

Assessment chứng minh kiến thức.

Evidence chứng minh năng lực.

Ví dụ

Một bài trắc nghiệm chỉ cho thấy người học hiểu khái niệm.

Một dự án thực tế, video demo hoặc repository mã nguồn mới chứng minh người học thực sự có khả năng áp dụng.

---

# 3. Evidence Lifecycle

```
Draft

↓

Submitted

↓

Under Review

↓

Validated

↓

Mapped to Competency

↓

Portfolio

↓

Certificate Eligibility

↓

Archived
```

Mọi Evidence đều có lịch sử xử lý.

---

# 4. Core Components

Evidence Engine bao gồm:

Evidence Repository

Portfolio Manager

Validation Center

Competency Mapper

Review Center

Sharing Center

Version Manager

Evidence Analytics

---

# 5. Evidence Types

DIGVOS hỗ trợ nhiều loại minh chứng.

## Project

Ví dụ:

- Website
- Mobile App
- Dashboard
- AI Project

---

## Assignment

Bài tập học tập.

---

## Document

PDF

Word

PowerPoint

Spreadsheet

---

## Media

Video

Audio

Image

Screen Recording

---

## External Evidence

Github

GitLab

Behance

Dribbble

Figma

Kaggle

Notion

LinkedIn

Website

---

## Certificate

Chứng chỉ bên ngoài.

---

## Employer Evidence

Đánh giá từ doanh nghiệp.

---

## Teacher Evidence

Đánh giá từ giảng viên.

---

## Peer Evidence

Đánh giá từ bạn học.

---

# 6. Validation Workflow

Evidence phải được xác minh trước khi sử dụng.

```
Upload

↓

AI Pre-check

↓

Teacher / Reviewer

↓

Validation

↓

Competency Mapping

↓

Portfolio
```

Một số loại Evidence có thể yêu cầu nhiều cấp xác nhận.

Ví dụ:

Teacher

↓

External Reviewer

↓

Enterprise Reviewer

---

# 7. Portfolio

Portfolio không chỉ là nơi lưu file.

Portfolio là hồ sơ năng lực.

Bao gồm:

- Projects
- Evidence
- Certificates
- Skill Timeline
- Competency Radar
- Reflection
- Feedback
- Achievements

Portfolio có thể chia sẻ với doanh nghiệp thông qua liên kết xác thực.

---

# 8. Competency Mapping

Mỗi Evidence có thể liên kết với nhiều Competency.

Ví dụ:

```
Project Website

↓

Communication

↓

Digital Content Creation

↓

Problem Solving

```

Một Competency cũng có thể được chứng minh bởi nhiều Evidence khác nhau.

Engine hỗ trợ quan hệ nhiều - nhiều (Many-to-Many).

---

# 9. Review System

Evidence có thể được đánh giá bởi:

- AI
- Teacher
- Teaching Assistant
- Reviewer
- External Assessor
- Employer

Review bao gồm:

- Điểm
- Nhận xét
- Rubric
- Khuyến nghị cải thiện

---

# 10. Evidence Quality Score

Mỗi Evidence có điểm chất lượng.

Điểm này không phản ánh năng lực mà phản ánh độ tin cậy của minh chứng.

Ví dụ các yếu tố đánh giá:

- Tính đầy đủ.
- Tính xác thực.
- Mức độ liên quan.
- Chất lượng phản hồi.
- Số lượng người xác nhận.
- Nguồn minh chứng.

Evidence Quality Score được AI sử dụng để đánh giá mức độ tin cậy.

---

# 11. Privacy & Sharing

Người dùng có thể thiết lập:

Private

Organization Only

Teacher Only

Enterprise Shared

Public

Temporary Link

Portfolio Link

Tất cả lượt xem đều được ghi vào Audit Log.

---

# 12. Business Rules

- Evidence phải thuộc một Owner.
- Một Evidence có thể liên kết nhiều Competency.
- Evidence đã được xác minh không thể chỉnh sửa trực tiếp.
- Khi cập nhật phải tạo Version mới.
- Evidence bị thu hồi sẽ tự động cập nhật Competency và Certificate liên quan.
- Portfolio chỉ hiển thị Evidence đã được người dùng cho phép chia sẻ.

---

# 13. Domain Events

Consume

AssessmentCompleted

LearningCompleted

TeacherReviewCompleted

EmployerReviewCompleted

---

Publish

EvidenceUploaded

EvidenceValidated

EvidenceRejected

EvidenceMapped

PortfolioUpdated

EvidenceShared

---

# 14. APIs

Evidence Engine cung cấp:

Upload Evidence

Update Evidence

Create Version

Validate Evidence

Map Competency

Share Evidence

Get Portfolio

Get Evidence Timeline

Search Evidence

Export Portfolio

---

# 15. Future Expansion

Evidence Engine được thiết kế để hỗ trợ:

- Blockchain Verification
- Open Badge Evidence
- Digital Wallet
- Europass Integration
- ESCO Mapping
- AI Evidence Verification
- Plagiarism Detection
- Auto Competency Mapping
- Digital Identity Wallet
- Decentralized Credentials (VC)

---

# Summary

Evidence Engine là nền tảng chứng minh năng lực của DIGVOS.

Không giống LMS chỉ lưu điểm số, DIGVOS xây dựng hồ sơ năng lực dựa trên minh chứng thực tế, được xác minh và liên kết trực tiếp với DigComp.

Đây là nền tảng để tạo Digital Portfolio, cấp chứng chỉ số và kết nối với doanh nghiệp.