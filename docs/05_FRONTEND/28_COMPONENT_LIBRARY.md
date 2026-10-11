# DIGVOS

# 28_COMPONENT_LIBRARY.md

Version: 2.0

Status: Approved

Owner: Frontend Team

---

# Table of Contents

1. Purpose
2. Design Principles
3. Component Architecture
4. Layout Components
5. Navigation Components
6. Form Components
7. Data Display Components
8. Feedback Components
9. Dashboard Components
10. Competency Components
11. Assessment Components
12. Learning Components
13. Evidence Components
14. AI Components
15. Analytics Components
16. Future Expansion

---

# 1. Purpose

Component Library là tập hợp toàn bộ các thành phần giao diện (UI Components) được sử dụng xuyên suốt hệ thống DIGVOS.

Mục tiêu của Component Library không chỉ là tái sử dụng giao diện mà còn tạo ra một kiến trúc Frontend thống nhất, có khả năng mở rộng và dễ bảo trì trong nhiều năm phát triển.

Mọi màn hình của DIGVOS đều phải được xây dựng từ Component Library thay vì tạo giao diện riêng lẻ.

---

## Mục tiêu

- Đồng nhất trải nghiệm người dùng.
- Đồng nhất phong cách thiết kế.
- Giảm trùng lặp mã nguồn.
- Tăng tốc độ phát triển.
- Dễ bảo trì.
- Dễ mở rộng.
- Dễ kiểm thử.
- Hỗ trợ nhiều Theme.
- Hỗ trợ nhiều Role.
- Hỗ trợ Responsive.
- Hỗ trợ Accessibility.

---

## Triết lý xây dựng

Component không được tạo ra để phục vụ một màn hình.

Component phải phục vụ toàn bộ hệ thống.

Ví dụ:

Không tạo

StudentRadarChart

mà tạo

CompetencyRadar

để Student, Lecturer, Reviewer và Admin đều có thể sử dụng.

---

## Kiến trúc Component

Frontend chỉ bao gồm các Component có khả năng tái sử dụng.

Không được viết HTML trực tiếp cho từng trang nếu Component tương tự đã tồn tại.

Ví dụ:

❌ Sai

DashboardStudent.tsx

chứa toàn bộ Card, Button, Progress...

↓

Đúng

DashboardStudent

↓

KpiCard

↓

Card

↓

Surface

↓

Token

---

## Nguyên tắc

Component phải:

- Reusable
- Composable
- Configurable
- Themeable
- Accessible
- Responsive
- Predictable
- Testable

---

## Component phải độc lập

Một Component không được phụ thuộc vào Page.

Ví dụ

AssessmentCard

không được import

StudentDashboard

Ngược lại

StudentDashboard

được phép import

AssessmentCard

---

## Khả năng mở rộng

Mọi Component phải có khả năng:

- thêm Action
- thêm Badge
- thêm Status
- thêm Icon
- thêm Loading
- thêm Permission
- thêm Tooltip

mà không cần sửa toàn bộ Component.

---

## Tính nhất quán

Button ở Student Dashboard

phải giống

Button ở Admin Dashboard

chỉ khác:

- màu trạng thái
- quyền
- nội dung

không khác cấu trúc.

---

## Component không chứa Business Logic

Component chỉ hiển thị dữ liệu.

Ví dụ

Sai

```
<StudentCard
    fetchStudent()
/>
```

Đúng

```
const student = useStudent();

<StudentCard
    data={student}
/>
```

Business Logic nằm trong:

- hooks
- services
- api
- state management

không nằm trong UI Component.

---

# 2. Design Principles

Mọi Component trong DIGVOS phải tuân thủ các nguyên tắc sau.

## 2.1 Reusable

Component phải được sử dụng ở nhiều nơi.

Ví dụ

Button

Card

Modal

Table

Avatar

Badge

Sidebar

Không tạo Component chỉ dùng đúng một lần.

---

## 2.2 Single Responsibility

Một Component chỉ giải quyết một nhiệm vụ.

Ví dụ

Card

chỉ hiển thị Card.

Không xử lý:

- gọi API
- validate
- authentication

---

## 2.3 Composable

Component phải có khả năng lắp ghép.

Ví dụ

```
<Card>

<CardHeader/>

<CardBody/>

<CardFooter/>

</Card>
```

thay vì

```
<BigCard/>
```

---

## 2.4 Configurable

Mọi Component phải hỗ trợ props.

Ví dụ

```
<Button

variant="primary"

size="lg"

loading

icon={<Save/>}

>

Lưu

</Button>
```

Không hard-code.

---

## 2.5 Themeable

Mọi Component phải hoạt động với:

- Light Theme
- Dark Theme
- High Contrast

Không sử dụng màu trực tiếp.

Sai

```
background:#5a96b0;
```

Đúng

```
background: var(--color-primary);
```

---

## 2.6 Responsive

Component phải hoạt động trên:

- Desktop
- Laptop
- Tablet
- Mobile

Không tạo Component riêng cho Mobile.

---

## 2.7 Accessible

Mọi Component phải đạt chuẩn WCAG 2.2 AA.

Bao gồm:

- Keyboard Navigation
- Focus Ring
- Screen Reader
- ARIA Label
- Contrast
- Touch Target

---

## 2.8 Predictable

Component phải có hành vi nhất quán.

Ví dụ

Button Loading

luôn:

- disable click
- hiện Spinner
- giữ nguyên kích thước

ở toàn bộ hệ thống.

---

## 2.9 Minimal

Không thêm hiệu ứng không cần thiết.

Ưu tiên:

- rõ ràng
- dễ đọc
- tốc độ
- hiệu quả

Thay vì:

- animation phức tạp
- gradient lòe loẹt
- glassmorphism toàn bộ giao diện
- shadow dày

DIGVOS hướng đến phong cách Enterprise SaaS hiện đại.

---

# 3. Component Architecture

Component Library của DIGVOS được tổ chức theo mô hình phân tầng nhằm đảm bảo khả năng mở rộng và tái sử dụng.

```
Design Tokens
        │
Primitive Components
        │
Base Components
        │
Business Components
        │
Page Templates
        │
Feature Pages
```

Mỗi tầng chỉ được phụ thuộc vào tầng phía dưới.

Không được import ngược chiều.

Ví dụ:

```
Feature Page

↓

AssessmentCard

↓

Card

↓

Surface

↓

Design Token
```

Không được phép:

```
Card

↓

AssessmentDashboard
```

---

## 3.1 Design Tokens

Đây là tầng thấp nhất.

Bao gồm:

- Colors
- Typography
- Radius
- Shadow
- Border
- Breakpoints
- Motion
- Spacing

Ví dụ

```
color.primary

spacing.md

radius.lg

shadow.sm
```

Frontend tuyệt đối không hard-code giá trị thiết kế.

---

## 3.2 Primitive Components

Là các thành phần UI cơ bản nhất.

Ví dụ:

- Box
- Flex
- Stack
- Grid
- Surface
- Text
- Icon
- Divider
- Spacer

Primitive không chứa business logic và gần như không có style đặc thù.

---

## 3.3 Base Components

Được xây dựng từ Primitive.

Ví dụ:

- Button
- Card
- Input
- Badge
- Avatar
- Table
- Modal
- Tabs
- Drawer
- Tooltip

Đây là nhóm component được sử dụng nhiều nhất trong toàn bộ hệ thống.

---

## 3.4 Business Components

Được tạo từ nhiều Base Components.

Ví dụ:

- CompetencyCard
- KpiCard
- StudentProfileCard
- AssessmentCard
- EvidenceCard
- NotificationItem
- ActivityTimeline
- RecommendationCard

Business Component hiểu ngữ cảnh nghiệp vụ nhưng không phụ thuộc vào một trang cụ thể.

---

## 3.5 Page Templates

Là các bố cục hoàn chỉnh dùng để xây dựng Dashboard và Workspace.

Ví dụ:

- StudentWorkspace
- LecturerWorkspace
- ReviewerWorkspace
- AdminWorkspace
- AuthenticationLayout

Template chịu trách nhiệm bố cục, không xử lý dữ liệu.

---


# 4. Layout Components

Layout Components định nghĩa khung giao diện chung của toàn bộ hệ thống DIGVOS.

Mỗi Role sẽ sử dụng cùng một Layout Framework, chỉ khác nội dung và quyền truy cập.

Không tạo Layout riêng cho từng trang.

---

## 4.1 App Layout

Là layout cấp cao nhất.

Bao gồm:

```
+------------------------------------------------------+
| Header                                               |
+-----------+---------------------------+--------------+
| Sidebar   | Main Workspace            | Right Panel  |
|           |                           | (Optional)   |
|           |                           |              |
+-----------+---------------------------+--------------+
```

Thành phần:

- Global Header
- Sidebar Navigation
- Main Content
- Right Utility Panel
- Notification Layer
- Global Modal Layer

App Layout tồn tại xuyên suốt sau khi người dùng đăng nhập.

---

## 4.2 Workspace Layout

Workspace là khu vực làm việc của từng Role.

Ví dụ:

Student Workspace

Lecturer Workspace

Reviewer Workspace

Organization Workspace

Admin Workspace

Mỗi Workspace có:

- Sidebar riêng
- Dashboard riêng
- Module riêng
- Permission riêng

Không có chức năng chuyển đổi Role trong giao diện.

Việc xác định Workspace được quyết định bởi Authentication và Authorization.

---

## 4.3 Page Layout

Mỗi Page sử dụng cùng một cấu trúc.

```
Page Header

↓

Toolbar

↓

Content

↓

Footer (Optional)
```

Ví dụ

```
Student Dashboard

Page Header

↓

Statistics

↓

Widgets

↓

Charts

↓

Activities
```

---

## 4.4 Section

Section chia nhỏ nội dung trong một trang.

Ví dụ

Dashboard

```
Thông báo

-------

Tiến độ học tập

-------

Khuyến nghị AI

-------

Chứng chỉ

-------

Lịch sử hoạt động
```

Section giúp giao diện rõ ràng và dễ mở rộng.

---

## 4.5 Container

Container giới hạn chiều rộng nội dung.

Quy định:

Desktop

Max Width:

1440px

Content:

1280px

Không để nội dung kéo dài toàn màn hình.

---

## 4.6 Grid

Toàn bộ Dashboard sử dụng CSS Grid.

Ví dụ

Desktop

```
12 Columns
```

Tablet

```
8 Columns
```

Mobile

```
4 Columns
```

Các Widget phải tự co giãn theo Grid.

Không sử dụng kích thước cố định.

---

## 4.7 Stack

Stack dùng để sắp xếp Component theo chiều dọc.

Ví dụ

```
Title

↓

Description

↓

Button
```

Khoảng cách sử dụng Design Token.

Không sử dụng margin ngẫu nhiên.

---

## 4.8 Split View

Áp dụng cho các màn hình cần xem đồng thời hai nội dung.

Ví dụ

Assessment

```
Question

|

Rubric
```

Evidence Review

```
Evidence

|

AI Analysis
```

Learning

```
Lesson

|

Notes
```

---

## 4.9 Resizable Panel

Một số màn hình cho phép thay đổi kích thước Panel.

Ví dụ

Evidence Review

```
Evidence Viewer

|

Resizable Divider

|

AI Review
```

Hoặc

Analytics

```
Chart

|

Table
```

Panel phải lưu lại kích thước khi người dùng quay lại.

---

## 4.10 Sidebar

Sidebar là thành phần điều hướng chính của DIGVOS.

Sidebar được chia thành nhiều Navigation Group thay vì một danh sách menu dài.

Ví dụ

```
Dashboard

----------------

Assessment

    • Bài đánh giá

    • Lịch sử

----------------

Learning

    • Lộ trình

    • Khóa học

    • Tài nguyên

----------------

Evidence

    • Minh chứng

    • Danh mục

----------------

Analytics

    • Dashboard

    • Báo cáo

----------------

Account

    • Hồ sơ

    • Cài đặt
```

Đặc điểm

- Hỗ trợ Menu Group.
- Hỗ trợ Menu con.
- Có thể Collapse.
- Chỉ hiển thị Module được cấp quyền.
- Ghi nhớ trạng thái mở/đóng.
- Có Tooltip khi Sidebar thu gọn.
- Hiển thị Icon + Label.
- Active Menu rõ ràng.

Sidebar không được chứa chức năng chuyển đổi Role.

---

## 4.11 Header

Header luôn cố định phía trên.

Bao gồm:

- Breadcrumb
- Search
- Notification
- AI Assistant
- Theme Switch
- User Menu

Không đặt Navigation chính trong Header.

Header chỉ chứa chức năng toàn cục.

---

## 4.12 Footer

Footer chỉ xuất hiện khi cần.

Ví dụ

Authentication

Landing Page

Help Center

Dashboard mặc định không cần Footer.

---

## 4.13 Right Utility Panel

Là Panel phụ nằm bên phải.

Có thể đóng hoặc mở.

Ví dụ

- AI Assistant
- Chi tiết đối tượng
- Nhật ký hoạt động
- Chat
- Ghi chú
- Notification Center

Không hiển thị mặc định nếu không cần.

---

## 4.14 Empty State

Mọi màn hình không có dữ liệu đều phải có Empty State.

Bao gồm

- Illustration
- Tiêu đề
- Mô tả
- Call To Action

Ví dụ

```
Bạn chưa có bài đánh giá nào.

[Bắt đầu đánh giá]
```

Không để màn hình trống.

---

## 4.15 Loading Layout

Khi tải dữ liệu phải sử dụng Skeleton.

Không hiển thị Spinner cho toàn bộ trang nếu chỉ tải một Widget.

Ví dụ

```
Dashboard

KPI
██████

Chart
██████████

Table
██████████
```

Loading phải giữ nguyên bố cục để tránh Layout Shift.

---

# 5. Navigation Components

Navigation của DIGVOS được thiết kế theo mô hình Enterprise SaaS.

Mỗi Role có Navigation riêng.

Navigation được tổ chức theo Module thay vì theo danh sách chức năng.

---

## 5.1 Sidebar

Sidebar là Navigation chính.

Bao gồm

- Logo
- Workspace
- Navigation Group
- Utilities
- Account

Không hiển thị toàn bộ menu trong một danh sách dài.

---

## 5.2 Navigation Group

Menu được chia theo nhóm nghiệp vụ.

Ví dụ Student

```
Dashboard

Assessment

Learning

Evidence

Analytics

Certificates

Account
```

Ví dụ Admin

```
Dashboard

Organizations

Users

Competencies

Assessment

AI

Reports

Settings
```

---

## 5.3 Navigation Item

Mỗi Item gồm:

- Icon
- Label
- Active Indicator
- Badge (Optional)
- Notification Dot (Optional)

Có thể mở rộng thành Menu con.

---

## 5.4 Navigation Submenu

Navigation hỗ trợ nhiều cấp.

Ví dụ

```
Assessment

▼

    CAT Assessment

    Evidence

    History
```

Hoặc

```
Settings

▼

    General

    Security

    Theme
```

---

## 5.5 Breadcrumb

Hiển thị vị trí hiện tại.

Ví dụ

```
Dashboard

>

Assessment

>

History
```

Breadcrumb luôn phản ánh đúng cấu trúc Sidebar.

---

## 5.6 Tabs

Tabs dùng để chuyển đổi nội dung cùng cấp.

Không dùng Tabs để thay thế Sidebar.

Ví dụ

Evidence

```
Submitted

Approved

Rejected
```

---

## 5.7 Pagination

Table phải hỗ trợ:

- Page Number
- Next
- Previous
- Rows per page

Không tải toàn bộ dữ liệu.

---

## 5.8 Top Navigation

Chỉ chứa chức năng toàn cục.

Ví dụ

- Search
- Notifications
- AI Assistant
- Theme
- User Menu

---

## 5.9 Global Search

Cho phép tìm kiếm toàn hệ thống.

Có thể tìm:

- Người dùng
- Khóa học
- Năng lực
- Báo cáo
- Minh chứng
- Chứng chỉ

---

## 5.10 Command Palette

Kích hoạt bằng:

```
Ctrl + K
```

Cho phép:

- Tìm Module
- Mở nhanh trang
- Thực hiện Action
- Tìm kiếm dữ liệu

---

## 5.11 User Menu

Bao gồm

- Hồ sơ
- Cài đặt
- Đổi mật khẩu
- Hỗ trợ
- Đăng xuất

Không chứa chức năng chuyển Role.

---

## 5.12 Workspace Indicator

Hiển thị Workspace hiện tại.

Ví dụ

```
Student Workspace
```

hoặc

```
Administrator Workspace
```

Nếu một người dùng có nhiều vai trò, việc chuyển Workspace chỉ được thực hiện sau khi hệ thống xác thực quyền và tải lại giao diện tương ứng, không phải bằng cách đổi menu trong Sidebar.




# 4. Layout Components

Layout Components định nghĩa khung giao diện chung của toàn bộ hệ thống DIGVOS.

Mỗi Role sẽ sử dụng cùng một Layout Framework, chỉ khác nội dung và quyền truy cập.

Không tạo Layout riêng cho từng trang.

---

## 4.1 App Layout

Là layout cấp cao nhất.

Bao gồm:

```
+------------------------------------------------------+
| Header                                               |
+-----------+---------------------------+--------------+
| Sidebar   | Main Workspace            | Right Panel  |
|           |                           | (Optional)   |
|           |                           |              |
+-----------+---------------------------+--------------+
```

Thành phần:

- Global Header
- Sidebar Navigation
- Main Content
- Right Utility Panel
- Notification Layer
- Global Modal Layer

App Layout tồn tại xuyên suốt sau khi người dùng đăng nhập.

---

## 4.2 Workspace Layout

Workspace là khu vực làm việc của từng Role.

Ví dụ:

Student Workspace

Lecturer Workspace

Reviewer Workspace

Organization Workspace

Admin Workspace

Mỗi Workspace có:

- Sidebar riêng
- Dashboard riêng
- Module riêng
- Permission riêng

Không có chức năng chuyển đổi Role trong giao diện.

Việc xác định Workspace được quyết định bởi Authentication và Authorization.

---

## 4.3 Page Layout

Mỗi Page sử dụng cùng một cấu trúc.

```
Page Header

↓

Toolbar

↓

Content

↓

Footer (Optional)
```

Ví dụ

```
Student Dashboard

Page Header

↓

Statistics

↓

Widgets

↓

Charts

↓

Activities
```

---

## 4.4 Section

Section chia nhỏ nội dung trong một trang.

Ví dụ

Dashboard

```
Thông báo

-------

Tiến độ học tập

-------

Khuyến nghị AI

-------

Chứng chỉ

-------

Lịch sử hoạt động
```

Section giúp giao diện rõ ràng và dễ mở rộng.

---

## 4.5 Container

Container giới hạn chiều rộng nội dung.

Quy định:

Desktop

Max Width:

1440px

Content:

1280px

Không để nội dung kéo dài toàn màn hình.

---

## 4.6 Grid

Toàn bộ Dashboard sử dụng CSS Grid.

Ví dụ

Desktop

```
12 Columns
```

Tablet

```
8 Columns
```

Mobile

```
4 Columns
```

Các Widget phải tự co giãn theo Grid.

Không sử dụng kích thước cố định.

---

## 4.7 Stack

Stack dùng để sắp xếp Component theo chiều dọc.

Ví dụ

```
Title

↓

Description

↓

Button
```

Khoảng cách sử dụng Design Token.

Không sử dụng margin ngẫu nhiên.

---

## 4.8 Split View

Áp dụng cho các màn hình cần xem đồng thời hai nội dung.

Ví dụ

Assessment

```
Question

|

Rubric
```

Evidence Review

```
Evidence

|

AI Analysis
```

Learning

```
Lesson

|

Notes
```

---

## 4.9 Resizable Panel

Một số màn hình cho phép thay đổi kích thước Panel.

Ví dụ

Evidence Review

```
Evidence Viewer

|

Resizable Divider

|

AI Review
```

Hoặc

Analytics

```
Chart

|

Table
```

Panel phải lưu lại kích thước khi người dùng quay lại.

---

## 4.10 Sidebar

Sidebar là thành phần điều hướng chính của DIGVOS.

Sidebar được chia thành nhiều Navigation Group thay vì một danh sách menu dài.

Ví dụ

```
Dashboard

----------------

Assessment

    • Bài đánh giá

    • Lịch sử

----------------

Learning

    • Lộ trình

    • Khóa học

    • Tài nguyên

----------------

Evidence

    • Minh chứng

    • Danh mục

----------------

Analytics

    • Dashboard

    • Báo cáo

----------------

Account

    • Hồ sơ

    • Cài đặt
```

Đặc điểm

- Hỗ trợ Menu Group.
- Hỗ trợ Menu con.
- Có thể Collapse.
- Chỉ hiển thị Module được cấp quyền.
- Ghi nhớ trạng thái mở/đóng.
- Có Tooltip khi Sidebar thu gọn.
- Hiển thị Icon + Label.
- Active Menu rõ ràng.

Sidebar không được chứa chức năng chuyển đổi Role.

---

## 4.11 Header

Header luôn cố định phía trên.

Bao gồm:

- Breadcrumb
- Search
- Notification
- AI Assistant
- Theme Switch
- User Menu

Không đặt Navigation chính trong Header.

Header chỉ chứa chức năng toàn cục.

---

## 4.12 Footer

Footer chỉ xuất hiện khi cần.

Ví dụ

Authentication

Landing Page

Help Center

Dashboard mặc định không cần Footer.

---

## 4.13 Right Utility Panel

Là Panel phụ nằm bên phải.

Có thể đóng hoặc mở.

Ví dụ

- AI Assistant
- Chi tiết đối tượng
- Nhật ký hoạt động
- Chat
- Ghi chú
- Notification Center

Không hiển thị mặc định nếu không cần.

---

## 4.14 Empty State

Mọi màn hình không có dữ liệu đều phải có Empty State.

Bao gồm

- Illustration
- Tiêu đề
- Mô tả
- Call To Action

Ví dụ

```
Bạn chưa có bài đánh giá nào.

[Bắt đầu đánh giá]
```

Không để màn hình trống.

---

## 4.15 Loading Layout

Khi tải dữ liệu phải sử dụng Skeleton.

Không hiển thị Spinner cho toàn bộ trang nếu chỉ tải một Widget.

Ví dụ

```
Dashboard

KPI
██████

Chart
██████████

Table
██████████
```

Loading phải giữ nguyên bố cục để tránh Layout Shift.

---

# 5. Navigation Components

Navigation của DIGVOS được thiết kế theo mô hình Enterprise SaaS.

Mỗi Role có Navigation riêng.

Navigation được tổ chức theo Module thay vì theo danh sách chức năng.

---

## 5.1 Sidebar

Sidebar là Navigation chính.

Bao gồm

- Logo
- Workspace
- Navigation Group
- Utilities
- Account

Không hiển thị toàn bộ menu trong một danh sách dài.

---

## 5.2 Navigation Group

Menu được chia theo nhóm nghiệp vụ.

Ví dụ Student

```
Dashboard

Assessment

Learning

Evidence

Analytics

Certificates

Account
```

Ví dụ Admin

```
Dashboard

Organizations

Users

Competencies

Assessment

AI

Reports

Settings
```

---

## 5.3 Navigation Item

Mỗi Item gồm:

- Icon
- Label
- Active Indicator
- Badge (Optional)
- Notification Dot (Optional)

Có thể mở rộng thành Menu con.

---

## 5.4 Navigation Submenu

Navigation hỗ trợ nhiều cấp.

Ví dụ

```
Assessment

▼

    CAT Assessment

    Evidence

    History
```

Hoặc

```
Settings

▼

    General

    Security

    Theme
```

---

## 5.5 Breadcrumb

Hiển thị vị trí hiện tại.

Ví dụ

```
Dashboard

>

Assessment

>

History
```

Breadcrumb luôn phản ánh đúng cấu trúc Sidebar.

---

## 5.6 Tabs

Tabs dùng để chuyển đổi nội dung cùng cấp.

Không dùng Tabs để thay thế Sidebar.

Ví dụ

Evidence

```
Submitted

Approved

Rejected
```

---

## 5.7 Pagination

Table phải hỗ trợ:

- Page Number
- Next
- Previous
- Rows per page

Không tải toàn bộ dữ liệu.

---

## 5.8 Top Navigation

Chỉ chứa chức năng toàn cục.

Ví dụ

- Search
- Notifications
- AI Assistant
- Theme
- User Menu

---

## 5.9 Global Search

Cho phép tìm kiếm toàn hệ thống.

Có thể tìm:

- Người dùng
- Khóa học
- Năng lực
- Báo cáo
- Minh chứng
- Chứng chỉ

---

## 5.10 Command Palette

Kích hoạt bằng:

```
Ctrl + K
```

Cho phép:

- Tìm Module
- Mở nhanh trang
- Thực hiện Action
- Tìm kiếm dữ liệu

---

## 5.11 User Menu

Bao gồm

- Hồ sơ
- Cài đặt
- Đổi mật khẩu
- Hỗ trợ
- Đăng xuất

Không chứa chức năng chuyển Role.

---

## 5.12 Workspace Indicator

Hiển thị Workspace hiện tại.

Ví dụ

```
Student Workspace
```

hoặc

```
Administrator Workspace
```

Nếu một người dùng có nhiều vai trò, việc chuyển Workspace chỉ được thực hiện sau khi hệ thống xác thực quyền và tải lại giao diện tương ứng, không phải bằng cách đổi menu trong Sidebar.