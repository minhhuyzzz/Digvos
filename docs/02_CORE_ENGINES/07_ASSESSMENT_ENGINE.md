# DIGVOS

# 07_ASSESSMENT_ENGINE.md

Version: 1.0

Status: Draft

Owner: Academic Product Team

---

# Table of Contents

1. Purpose
2. Assessment Philosophy
3. Assessment Types
4. Assessment Lifecycle
5. Core Components
6. Question Bank
7. Assessment Session
8. Adaptive Assessment
9. AI-assisted Assessment
10. Scoring
11. Review Workflow
12. Appeals
13. Security
14. Domain Events
15. APIs
16. Future Expansion

---

# 1. Purpose

Assessment Engine là hệ thống chịu trách nhiệm đánh giá năng lực số của người học dựa trên DigComp.

Đây không phải là hệ thống thi trực tuyến truyền thống.

Assessment Engine được thiết kế để:

- đo lường năng lực
- xác định mức độ thành thạo
- cập nhật Competency Engine
- tạo dữ liệu cho AI
- cung cấp bằng chứng cho Certification

Assessment không phải mục tiêu cuối cùng.

Assessment là điểm bắt đầu của Competency Lifecycle.

---

# 2. Assessment Philosophy

DIGVOS đánh giá năng lực thay vì đánh giá trí nhớ.

Một bài Assessment phải trả lời được:

Người học có thể làm được gì?

thay vì

Người học nhớ được bao nhiêu?

---

Assessment phải:

✓ Valid

✓ Reliable

✓ Fair

✓ Explainable

✓ Adaptive

✓ Evidence-based

---

# 3. Assessment Types

DIGVOS hỗ trợ nhiều loại Assessment.

## 3.1 Adaptive Assessment

AI lựa chọn câu hỏi tiếp theo dựa trên kết quả trước đó.

---

## 3.2 Static Assessment

Đề thi cố định.

---

## 3.3 Practical Assessment

Thực hiện nhiệm vụ thực tế.

Ví dụ

- tạo spreadsheet
- tìm kiếm dữ liệu
- viết prompt
- xử lý email
- phân tích dashboard

---

## 3.4 Project Assessment

Đánh giá theo dự án.

---

## 3.5 Portfolio Assessment

Đánh giá dựa trên minh chứng.

---

## 3.6 Peer Assessment

Đánh giá ngang hàng.

---

## 3.7 Teacher Assessment

Giảng viên đánh giá.

---

## 3.8 Enterprise Assessment

Doanh nghiệp đánh giá.

---

## 3.9 Self Assessment

Người học tự đánh giá.

Không dùng để cấp chứng nhận.

---

# 4. Assessment Lifecycle

```

Draft

↓

Review

↓

Published

↓

Scheduled

↓

Active

↓

Completed

↓

Reviewed

↓

Archived

```

Không Assessment nào được phép bỏ qua trạng thái.

---

# 5. Core Components

Assessment Engine gồm:

Assessment Manager

Question Bank

Attempt Manager

Adaptive Engine

Scoring Engine

AI Grading

Rubrics

Moderation

Appeal Center

Assessment Analytics

---

# 6. Question Bank

Question Bank là kho câu hỏi trung tâm.

Mỗi câu hỏi phải có:

- Question ID
- Competency
- Learning Outcome
- Difficulty
- Question Type
- Language
- Tags
- Status
- Version

---

## Supported Question Types

- Multiple Choice
- Multiple Select
- True/False
- Matching
- Ordering
- Fill Blank
- Essay
- File Upload
- Practical Task
- Coding
- Simulation

---

## Metadata

Question không chỉ lưu nội dung.

Mà còn lưu:

Estimated Time

Bloom Level

Difficulty

Competency

Learning Outcome

Language

Author

Reviewer

Version

---

# 7. Assessment Session

Mỗi lần làm bài là một Session.

Một Session gồm:

Candidate

↓

Assessment

↓

Questions

↓

Answers

↓

Time

↓

Logs

↓

Result

Session có thể:

Pause

Resume

Recover

Auto-save

---

# 8. Adaptive Assessment

Adaptive Engine là điểm khác biệt của DIGVOS.

Nguyên tắc:

Nếu người học trả lời đúng nhiều câu liên tiếp

↓

Độ khó tăng.

Nếu trả lời sai

↓

Độ khó giảm.

Mục tiêu:

Tìm mức năng lực thật với số lượng câu hỏi ít nhất.

---

# 9. AI-assisted Assessment

AI hỗ trợ:

- sinh phản hồi
- gợi ý rubric
- chấm tự luận
- phát hiện bất thường
- phát hiện gian lận
- đánh giá câu trả lời mở

AI không tự cấp điểm cuối cùng.

Điểm cuối cùng có thể cần Teacher Review.

---

# 10. Scoring Engine

Nguồn điểm gồm:

Assessment

+

Teacher

+

Peer

+

Enterprise

+

Evidence

↓

Competency Engine

Scoring Engine không cấp chứng chỉ.

---

# 11. Review Workflow

```

Student

↓

Submit

↓

AI Review

↓

Teacher Review

↓

Reviewer

↓

Final Result

```

Nếu Assessment chỉ có câu hỏi trắc nghiệm thì có thể bỏ qua bước Teacher Review.

---

# 12. Appeal Workflow

Student

↓

Appeal

↓

Teacher

↓

Reviewer

↓

Decision

↓

Close

Tất cả Appeal đều lưu Audit Log.

---

# 13. Security

Assessment Engine phải hỗ trợ:

- Browser Lock
- Fullscreen
- Device Fingerprint
- Webcam (optional)
- Screen Monitoring (optional)
- IP Detection
- Time Limit
- Random Question
- Random Choice
- Auto Save
- Session Recovery

---

# 14. Domain Events

Consume

AssessmentCreated

AssessmentPublished

AssessmentStarted

AssessmentSubmitted

TeacherReviewed

AppealApproved

---

Publish

AssessmentCompleted

AssessmentScored

AssessmentReviewed

AssessmentAppealed

AssessmentArchived

---

# 15. APIs

Assessment Engine cung cấp API:

Create Assessment

Publish Assessment

Start Attempt

Submit Attempt

Grade Attempt

Review Attempt

Appeal Result

Get Analytics

Get Question Bank

---

# 16. Future Expansion

Assessment Engine sẽ hỗ trợ:

Computer Adaptive Testing (CAT)

Item Response Theory (IRT)

AI-generated Questions

Scenario-based Assessment

Simulation Assessment

VR Assessment

AR Assessment

Game-based Assessment

Continuous Assessment

Micro Assessment

---

# Summary

Assessment Engine là nền tảng đánh giá của DIGVOS.

Engine này không chỉ quản lý bài thi mà còn là cầu nối giữa Competency, Evidence, AI và Certification.

Mục tiêu cuối cùng không phải là tạo ra điểm số.

Mà là xác định chính xác năng lực số của người học theo DigComp.