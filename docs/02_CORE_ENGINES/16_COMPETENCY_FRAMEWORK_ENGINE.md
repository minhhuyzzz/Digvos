# DIGVOS

# 16_COMPETENCY_FRAMEWORK_ENGINE.md

Version: 1.0

Status: Draft

Owner: Platform Team

---

# Table of Contents

1. Purpose
2. Framework Philosophy
3. Architecture
4. Core Components
5. Framework Structure
6. Competency Versioning
7. Mapping Engine
8. Framework Builder
9. Localization
10. Business Rules
11. Domain Events
12. APIs
13. Security
14. Future Expansion

---

# 1. Purpose

Competency Framework Engine là nền tảng quản lý toàn bộ các khung năng lực (Competency Frameworks) được sử dụng trong DIGVOS.

Engine này cho phép hệ thống:

- Hỗ trợ nhiều Framework cùng lúc.
- Quản lý nhiều phiên bản Framework.
- Ánh xạ Competency giữa các Framework.
- Tạo Framework nội bộ.
- Mở rộng sang nhiều quốc gia và ngành nghề.

Engine này là nguồn dữ liệu duy nhất cho Competency Engine.

Competency Engine không được định nghĩa DigComp trực tiếp.

---

# 2. Framework Philosophy

DIGVOS không phụ thuộc vào bất kỳ Framework nào.

DigComp chỉ là Framework mặc định.

Kiến trúc được thiết kế theo nguyên tắc:

Framework

↓

Competencies

↓

Learning Outcomes

↓

Assessment

↓

Evidence

↓

Certification

Toàn bộ hệ thống hoạt động trên dữ liệu Framework.

---

# 3. Architecture

```
             Framework Repository

                     │

         Competency Framework Engine

                     │

 ┌─────────┬─────────┬─────────┐

 DigComp   ESCO    GreenComp

 DigCompEdu SFIA   Custom

```

Các Engine khác chỉ truy cập Framework thông qua API.

---

# 4. Core Components

Framework Repository

Framework Manager

Version Manager

Framework Builder

Competency Mapper

Localization Manager

Import / Export Manager

Validation Engine

Framework Analytics

---

# 5. Framework Structure

Một Framework bao gồm:

Framework

↓

Areas

↓

Competencies

↓

Learning Outcomes

↓

Indicators

↓

Proficiency Levels

↓

Assessment Mapping

↓

Evidence Mapping

↓

Certification Mapping

Mỗi thành phần đều có mã định danh riêng.

---

# 6. Competency Versioning

Framework luôn có Version.

Ví dụ

DigComp 2.1

↓

DigComp 2.2

↓

DigComp 3.0

Mỗi Version được lưu độc lập.

Không cho phép ghi đè.

Người dùng có thể so sánh sự khác biệt giữa các phiên bản.

---

# 7. Mapping Engine

Mapping Engine cho phép ánh xạ giữa nhiều Framework.

Ví dụ

DigComp

↓

ESCO

↓

SFIA

↓

GreenComp

↓

LifeComp

↓

Framework doanh nghiệp

Một Competency có thể liên kết với nhiều Framework khác nhau.

---

# 8. Framework Builder

Admin có thể tạo Framework mới bằng giao diện kéo thả.

Hỗ trợ:

- Tạo Area
- Tạo Competency
- Tạo Learning Outcome
- Tạo Indicator
- Tạo Proficiency Level
- Thiết lập Rubric
- Thiết lập Assessment Mapping
- Thiết lập Certificate Mapping

Framework Builder không yêu cầu lập trình.

---

# 9. Localization

Framework hỗ trợ đa ngôn ngữ.

Ví dụ:

English

Vietnamese

French

German

Japanese

Korean

Chinese

Mỗi ngôn ngữ có thể có:

- Tên
- Mô tả
- Ví dụ
- Thuật ngữ

riêng biệt.

---

# 10. Business Rules

- Framework đã Publish không được chỉnh sửa trực tiếp.
- Muốn thay đổi phải tạo Version mới.
- Framework phải có ít nhất một Competency Area.
- Competency phải thuộc một Area.
- Learning Outcome phải thuộc một Competency.
- Framework chỉ được Publish sau khi Validation thành công.

---

# 11. Domain Events

Consume

FrameworkImported

FrameworkUpdated

FrameworkPublished

---

Publish

FrameworkCreated

FrameworkVersionCreated

FrameworkValidated

FrameworkPublished

CompetencyMapped

---

# 12. APIs

Create Framework

Import Framework

Export Framework

Create Version

Publish Framework

Map Competencies

Get Framework

Search Competencies

Validate Framework

Compare Versions

---

# 13. Security

Framework chỉ có thể được chỉnh sửa bởi:

Platform Admin

Framework Manager

Organization Admin (Framework nội bộ)

Mọi thay đổi đều được:

- Version hóa
- Ghi Audit Log
- Lưu lịch sử

---

# 14. Future Expansion

Framework Engine được thiết kế để hỗ trợ:

- DigComp 3.x
- DigCompEdu
- GreenComp
- LifeComp
- EntreComp
- ESCO
- SFIA
- ICDL
- NIST NICE Framework
- OECD Learning Compass
- Khung năng lực nội bộ của doanh nghiệp
- Khung năng lực của Bộ Giáo dục
- Framework Marketplace

---

# Summary

Competency Framework Engine là lớp nền tảng quản lý toàn bộ các khung năng lực trong DIGVOS.

Nhờ Engine này, DIGVOS không còn phụ thuộc vào DigComp mà có thể mở rộng để hỗ trợ nhiều chuẩn quốc tế và framework tùy chỉnh, tạo nền tảng cho việc triển khai trong giáo dục, doanh nghiệp và các tổ chức trên quy mô lớn.