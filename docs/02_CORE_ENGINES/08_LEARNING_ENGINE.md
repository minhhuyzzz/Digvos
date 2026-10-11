# DIGVOS

# 08_LEARNING_ENGINE.md

Version: 1.0

Status: Draft

Owner: Academic Product Team

---

# Table of Contents

1. Purpose
2. Learning Philosophy
3. Learning Lifecycle
4. Learning Components
5. Learning Path
6. Course Management
7. Resource Center
8. Recommendation Engine
9. Learning Progress
10. Learning Outcomes
11. AI Learning Coach
12. Business Rules
13. Events
14. APIs
15. Future Expansion

---

# 1. Purpose

Learning Engine chịu trách nhiệm quản lý toàn bộ quá trình phát triển năng lực của người học.

Learning Engine không đánh giá.

Learning Engine không cấp chứng chỉ.

Learning Engine chỉ tập trung vào việc giúp người học đạt được Learning Outcomes theo DigComp.

Đây là cầu nối giữa:

Competency

↓

Learning

↓

Assessment

---

# 2. Learning Philosophy

DIGVOS không tổ chức việc học theo Course-first.

Thay vào đó áp dụng Competency-first.

```

Learning Goal

↓

Competency

↓

Learning Outcomes

↓

Learning Path

↓

Learning Activities

↓

Assessment

↓

Evidence

```

Khóa học chỉ là một phương tiện.

Năng lực mới là mục tiêu.

---

# 3. Learning Lifecycle

```
Learning Goal

↓

Recommended Path

↓

Enroll

↓

Study

↓

Practice

↓

Assessment

↓

Reflection

↓

Evidence

↓

Competency Updated
```

---

# 4. Core Components

Learning Engine bao gồm:

Learning Path Manager

Course Manager

Lesson Manager

Resource Library

Assignment Manager

Learning Progress

Recommendation Engine

Learning Outcome Mapper

AI Learning Coach

Calendar

Learning Analytics

---

# 5. Learning Path

Learning Path là thành phần trung tâm.

Mỗi Path được xây dựng từ:

```
Competency

↓

Learning Outcomes

↓

Modules

↓

Lessons

↓

Activities

↓

Assessment

```

Ví dụ

Digital Communication

↓

Learning Outcome A

↓

Lesson 1

↓

Quiz

↓

Reflection

↓

Evidence

---

## Path Types

Mandatory

Elective

Adaptive

Personalized

Corporate Training

Certification Path

---

# 6. Course Management

Learning Engine quản lý:

Courses

Modules

Lessons

Topics

Activities

Assignments

Resources

Prerequisites

Completion Rules

Course không bắt buộc phải thuộc một Learning Path.

---

# 7. Resource Center

Resource không chỉ là PDF.

DIGVOS hỗ trợ:

Video

Article

Book

Website

Dataset

Template

Tool

Simulation

Interactive Lab

External Link

Podcast

AI Generated Content

---

# 8. Recommendation Engine

Learning Engine sử dụng dữ liệu từ:

Competency Engine

Assessment Engine

AI Engine

để đề xuất nội dung học.

Ví dụ

```
Skill Gap

↓

Recommendation

↓

Learning Path

↓

Practice

↓

Assessment
```

Recommendation luôn có lý do giải thích.

Ví dụ:

"Bạn được đề xuất khóa học này vì Competency 2.3 đang ở mức Developing."

---

# 9. Learning Progress

Theo dõi tiến độ ở nhiều cấp:

Platform

↓

Program

↓

Learning Path

↓

Course

↓

Lesson

↓

Activity

↓

Learning Outcome

Progress không chỉ tính theo % hoàn thành.

Mà còn theo mức độ đạt Learning Outcome.

---

# 10. Learning Outcomes

Learning Outcome là đơn vị nhỏ nhất.

Mỗi Outcome có:

Outcome ID

Competency Mapping

Difficulty

Expected Evidence

Recommended Resources

Assessment Mapping

Current Status

Target Level

Learning Engine chỉ đánh dấu hoàn thành khi Outcome được xác nhận qua Assessment hoặc Evidence.

---

# 11. AI Learning Coach

AI Learning Coach hỗ trợ:

- giải thích khái niệm
- gợi ý tài liệu
- tạo kế hoạch học
- nhắc nhở học tập
- trả lời câu hỏi
- tạo bài luyện tập
- điều chỉnh Learning Path

AI không tự động thay đổi Learning Outcome.

Mọi thay đổi đều phải thông qua Competency Engine.

---

# 12. Business Rules

Learning Path phải liên kết với ít nhất một Competency.

Mỗi Lesson phải thuộc một Module.

Mỗi Module phải có ít nhất một Learning Outcome.

Learning Outcome chỉ được đánh dấu đạt khi có Assessment hoặc Evidence hợp lệ.

Không cho phép xóa Learning Outcome đã được sử dụng trong Assessment.

Learning Path đã Publish chỉ được chỉnh sửa thông qua Version mới.

---

# 13. Domain Events

Consume

CompetencyUpdated

AssessmentCompleted

EvidenceValidated

CertificateIssued

---

Publish

LearningPathStarted

LessonCompleted

LearningOutcomeAchieved

LearningRecommendationGenerated

LearningCompleted

---

# 14. APIs

Learning Engine cung cấp:

Create Learning Path

Publish Learning Path

Enroll User

Complete Lesson

Update Progress

Generate Recommendation

Assign Course

Get Learning Outcomes

Get Progress

Get Resources

---

# 15. Future Expansion

Learning Engine được thiết kế để hỗ trợ:

Adaptive Learning

Micro Learning

Social Learning

Collaborative Learning

Gamification

Learning Marketplace

AI Tutor

VR Learning

AR Learning

Learning Record Store (LRS)

xAPI

SCORM

cmi5

---

# Summary

Learning Engine là hệ thống phát triển năng lực của DIGVOS.

Engine này không tập trung vào việc hoàn thành khóa học.

Mục tiêu là giúp người học đạt được Learning Outcomes theo DigComp thông qua lộ trình học tập được cá nhân hóa, có thể giải thích và liên tục được cải thiện bằng AI.