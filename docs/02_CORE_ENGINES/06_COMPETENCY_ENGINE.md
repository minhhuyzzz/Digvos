# DIGVOS

# 06_COMPETENCY_ENGINE.md

Version: 1.0

Status: Draft

Owner: Product Team

---

# Table of Contents

1. Purpose
2. Engine Overview
3. Engine Responsibilities
4. Core Concepts
5. DigComp Mapping
6. Engine Architecture
7. Competency Lifecycle
8. Competency Calculation
9. Skill Gap Analysis
10. Competency Profile
11. Competency History
12. API Responsibilities
13. Events
14. Future Expansion

---

# 1. Purpose

Competency Engine là trái tim của DIGVOS.

Mọi dữ liệu từ Assessment, Learning, Evidence và Certification đều được tập trung xử lý tại đây để xác định năng lực số thực tế của một cá nhân.

Engine này không tổ chức khóa học, không tạo bài kiểm tra và không cấp chứng chỉ.

Nhiệm vụ duy nhất của Competency Engine là tính toán, quản lý và theo dõi năng lực số.

---

# 2. Engine Overview

```
Assessment
        │
Learning
        │
Evidence
        │
Teacher Review
        │
Employer Review
        ▼
 Competency Engine
        │
        ▼
Competency Profile
        │
        ├── Skill Gap
        ├── Progress
        ├── Recommendations
        ├── Certificates
        └── Career Matching
```

Competency Engine đóng vai trò trung tâm kết nối các Domain còn lại.

---

# 3. Engine Responsibilities

Competency Engine chịu trách nhiệm:

- Quản lý Competence Areas.
- Quản lý Competencies.
- Quản lý Learning Outcomes.
- Theo dõi Proficiency Levels.
- Tổng hợp dữ liệu đánh giá.
- Tính toán mức độ thành thạo.
- Phân tích khoảng cách kỹ năng (Skill Gap).
- Cập nhật hồ sơ năng lực.
- Lưu lịch sử phát triển năng lực.
- Cung cấp dữ liệu cho AI, Analytics và Talent Engine.

---

# 4. Core Concepts

## Competence Area

Nhóm năng lực lớn theo DigComp.

Ví dụ:

- Information & Data Literacy
- Communication & Collaboration
- Digital Content Creation
- Safety
- Problem Solving

---

## Competency

Mỗi Area bao gồm nhiều Competency.

Ví dụ:

- Browsing
- Searching
- Evaluating Information
- Managing Data

---

## Learning Outcome

Mỗi Competency được chia thành nhiều Learning Outcomes.

Learning Outcome là đơn vị đánh giá nhỏ nhất trong hệ thống.

---

## Proficiency Level

DIGVOS áp dụng các mức độ thành thạo theo DigComp.

Mỗi Learning Outcome có thể đạt các mức khác nhau tùy theo bằng chứng và kết quả đánh giá.

---

# 5. DigComp Mapping

Competency Engine không tự định nghĩa framework.

Mọi Competence, Learning Outcome và Proficiency Level đều được ánh xạ trực tiếp từ DigComp 3.0.

Điều này đảm bảo tính chuẩn hóa và khả năng mở rộng sang các framework liên quan trong tương lai.

---

# 6. Engine Architecture

```
Assessment Engine
          │
Learning Engine
          │
Evidence Engine
          │
Teacher Review
          │
Employer Review
          ▼
 Competency Engine
          │
          ├── Competency Calculator
          ├── Skill Gap Analyzer
          ├── Progress Tracker
          ├── Recommendation Provider
          └── Competency History
```

---

# 7. Competency Lifecycle

```
Assessment Completed

↓

Evidence Added

↓

Validation

↓

Competency Updated

↓

Learning Recommendation

↓

Reassessment

↓

Competency Improved
```

Competency luôn là dữ liệu động, không phải giá trị cố định.

---

# 8. Competency Calculation

Điểm năng lực được xác định từ nhiều nguồn:

- Assessment.
- Practical Tasks.
- Evidence.
- Teacher Review.
- Employer Review.
- Peer Review.
- AI Analysis.

Hệ thống không dựa vào một bài thi duy nhất.

---

# 9. Skill Gap Analysis

Competency Engine so sánh:

- Năng lực hiện tại.
- Mục tiêu người dùng.
- Yêu cầu nghề nghiệp.
- Chuẩn DigComp.

Kết quả là báo cáo khoảng cách kỹ năng và lộ trình phát triển đề xuất.

---

# 10. Competency Profile

Mỗi người dùng có một hồ sơ năng lực bao gồm:

- Competency Radar.
- Competency Matrix.
- Learning Outcomes.
- Skill Gap.
- Progress.
- Evidence Summary.
- Certificates.
- Recommendations.

---

# 11. Competency History

Mọi thay đổi đều được lưu:

- Thời gian.
- Nguồn cập nhật.
- Giá trị cũ.
- Giá trị mới.
- Người xác nhận (nếu có).

Cho phép theo dõi quá trình phát triển lâu dài.

---

# 12. API Responsibilities

Competency Engine cung cấp API cho:

- Assessment Engine.
- Learning Engine.
- Evidence Engine.
- Certification Engine.
- Talent Engine.
- Analytics Engine.
- AI Engine.

Engine khác không được cập nhật trực tiếp cơ sở dữ liệu năng lực.

---

# 13. Domain Events

Competency Engine lắng nghe và phát hành các sự kiện:

### Consumed Events

- AssessmentCompleted
- EvidenceValidated
- LearningPathCompleted
- TeacherReviewCompleted
- EmployerReviewCompleted

### Published Events

- CompetencyUpdated
- SkillGapCalculated
- LearningRecommendationGenerated
- CertificateEligibilityUpdated

---

# 14. Future Expansion

Competency Engine được thiết kế để hỗ trợ thêm:

- DigCompEdu.
- GreenComp.
- EntreComp.
- LifeComp.
- ESCO.
- SFIA.

Không cần thay đổi kiến trúc lõi.

---

# Summary

Competency Engine là hạt nhân của DIGVOS.

Engine này chuyển đổi dữ liệu từ học tập, đánh giá và minh chứng thành hồ sơ năng lực số chuẩn hóa theo DigComp, tạo nền tảng cho chứng nhận, tuyển dụng và phát triển nghề nghiệp.