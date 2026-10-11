# DIGVOS

# 10_CERTIFICATION_ENGINE.md

Version: 1.0

Status: Draft

Owner: Certification Team

---

# Table of Contents

1. Purpose
2. Certification Philosophy
3. Core Components
4. Certificate Lifecycle
5. Certificate Types
6. Eligibility Engine
7. Certificate Verification
8. Badge System
9. Certificate Revocation
10. Renewal
11. Business Rules
12. Security
13. Domain Events
14. APIs
15. Non-functional Requirements
16. Future Expansion

---

# 1. Purpose

Certification Engine chịu trách nhiệm:

- Cấp chứng nhận
- Quản lý chứng nhận
- Xác minh chứng nhận
- Thu hồi chứng nhận
- Gia hạn chứng nhận
- Đồng bộ Digital Credential

Certification Engine không đánh giá.

Certification Engine chỉ cấp chứng nhận sau khi Competency Engine xác nhận người học đã đạt yêu cầu.

---

# 2. Certification Philosophy

DIGVOS không cấp chứng chỉ chỉ vì hoàn thành khóa học.

Một chứng chỉ chỉ được cấp khi:

Learning

+

Assessment

+

Evidence

+

Competency

↓

Eligible

↓

Issue Certificate

Điều này đảm bảo chứng nhận phản ánh đúng năng lực.

---

# 3. Core Components

Certification Engine gồm:

Certificate Manager

Eligibility Engine

Verification Service

Badge Manager

Credential Wallet

Certificate Repository

Renewal Manager

Revocation Center

Certificate Analytics

---

# 4. Certificate Lifecycle

```
Draft

↓

Eligible

↓

Issued

↓

Active

↓

Verified

↓

Renewed

↓

Expired

↓

Revoked

↓

Archived
```

Mọi thay đổi trạng thái đều được lưu Audit Log.

---

# 5. Certificate Types

DIGVOS hỗ trợ:

## Digital Certificate

PDF có mã xác minh.

---

## Digital Badge

Open Badge.

---

## Micro Credential

Chứng nhận từng Competency.

---

## Professional Certificate

Chứng nhận hoàn chỉnh.

---

## Enterprise Certificate

Do doanh nghiệp phát hành.

---

## Academic Certificate

Do trường đại học phát hành.

---

## Joint Certificate

Đồng phát hành bởi nhiều tổ chức.

---

# 6. Eligibility Engine

Eligibility Engine tự động xác định người dùng có đủ điều kiện hay chưa.

Điều kiện có thể bao gồm:

- Competency Level
- Learning Outcomes
- Assessment Score
- Evidence Quality
- Mandatory Courses
- Attendance
- Teacher Approval
- Enterprise Approval

Engine không cho phép cấp chứng chỉ nếu thiếu bất kỳ điều kiện bắt buộc nào.

---

# 7. Certificate Verification

Mỗi chứng chỉ có:

Certificate ID

Verification Code

QR Code

Verification URL

Hash

Issuer

Issue Date

Expiry Date

Verifier có thể:

- Kiểm tra tính hợp lệ
- Xem đơn vị phát hành
- Kiểm tra trạng thái
- Xem Competencies đạt được

Không cần đăng nhập.

---

# 8. Badge System

Ngoài Certificate, DIGVOS hỗ trợ Badge.

Ví dụ:

- AI Literacy
- Data Literacy
- Digital Communication
- Problem Solving

Badge có thể cộng dồn để đạt Certificate lớn hơn.

---

# 9. Certificate Revocation

Chứng chỉ có thể bị thu hồi khi:

- Evidence bị hủy
- Gian lận
- Sai sót trong đánh giá
- Hết hiệu lực
- Theo yêu cầu của tổ chức

Thu hồi không xóa dữ liệu.

Chỉ thay đổi trạng thái.

---

# 10. Renewal

Một số chứng chỉ cần gia hạn.

Ví dụ:

```
Issued

↓

2 Years

↓

Renew Assessment

↓

Renew Evidence

↓

Renew Certificate
```

Lịch sử gia hạn được lưu riêng.

---

# 11. Business Rules

- Certificate chỉ được Issue một lần cho mỗi Version.
- Certificate đã Issue không được chỉnh sửa.
- Muốn thay đổi phải tạo Version mới.
- Revoked Certificate không thể Verify thành công.
- Badge có thể dùng làm điều kiện cấp Certificate.
- Certificate luôn liên kết với Competency Profile.

---

# 12. Security

Tất cả chứng chỉ đều:

- Có UUID
- Có QR Code
- Có Hash
- Có Digital Signature
- Có Verification URL
- Có Audit Trail

Không sử dụng ID tuần tự.

---

# 13. Domain Events

Consume

CompetencyUpdated

EvidenceValidated

AssessmentCompleted

EligibilityPassed

---

Publish

CertificateIssued

CertificateVerified

CertificateRevoked

CertificateExpired

CertificateRenewed

BadgeAwarded

---

# 14. APIs

Issue Certificate

Verify Certificate

Get Certificate

Download Certificate

Revoke Certificate

Renew Certificate

Issue Badge

Get Wallet

Export Credentials

---

# 15. Non-functional Requirements

Availability

99.9%

---

Certificate Verification

< 2 giây

---

Issue Certificate

< 5 giây

---

Không mất dữ liệu sau khi Issue.

---

# 16. Future Expansion

Certification Engine sẽ hỗ trợ:

- Open Badges 3.0
- Verifiable Credentials (W3C VC)
- DID (Decentralized Identifier)
- Blockchain Anchoring
- Europass Digital Credentials
- Digital Wallet
- Cross-border Verification
- Multi-language Certificates

---

# Summary

Certification Engine là dịch vụ chịu trách nhiệm phát hành và xác minh chứng nhận năng lực số.

Thay vì chỉ tạo file PDF, DIGVOS xây dựng hệ thống Digital Credential có khả năng xác minh, thu hồi và gia hạn, sẵn sàng tích hợp với các tiêu chuẩn quốc tế trong tương lai.