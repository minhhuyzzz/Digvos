# DIGVOS

# 27_DESIGN_SYSTEM.md

Version: 2.0

Status: Official

Owner: UX/UI Team

Last Updated: YYYY-MM-DD

---

# Table of Contents

1. Introduction
2. Purpose
3. Scope
4. Audience
5. Product Vision
6. Design Philosophy
7. Design Principles
8. Brand Identity
9. Visual Language
10. Color System

---

# 1. Introduction

DIGVOS Design System là nền tảng thiết kế thống nhất cho toàn bộ hệ sinh thái DIGVOS.

Tài liệu này định nghĩa các tiêu chuẩn về giao diện, trải nghiệm người dùng, màu sắc, typography, bố cục, component và design token nhằm đảm bảo mọi sản phẩm của DIGVOS đều có tính nhất quán, chuyên nghiệp và dễ mở rộng.

Design System là nguồn tham chiếu duy nhất cho toàn bộ quá trình thiết kế và phát triển Frontend.

Mọi giao diện mới phải tuân thủ tài liệu này.

---

# 2. Purpose

DIGVOS Design System được xây dựng nhằm đạt các mục tiêu sau.

## Consistency

Đảm bảo mọi màn hình trong hệ thống có cùng ngôn ngữ thiết kế.

---

## Scalability

Cho phép mở rộng sản phẩm trong nhiều năm mà không phá vỡ giao diện hiện có.

---

## Reusability

Khuyến khích tái sử dụng Component thay vì tạo mới.

---

## Maintainability

Giảm chi phí bảo trì khi sản phẩm phát triển.

---

## Accessibility

Đảm bảo mọi người dùng đều có thể sử dụng hệ thống.

---

## Enterprise Readiness

Đáp ứng yêu cầu của các tổ chức giáo dục, doanh nghiệp và cơ quan quản lý.

---

# 3. Scope

Design System áp dụng cho toàn bộ nền tảng DIGVOS.

Bao gồm:

- Landing Website
- Authentication
- Student Dashboard
- Teacher Dashboard
- Enterprise Dashboard
- System Administration
- Learning Module
- Assessment Module
- Competency Module
- Analytics Module
- Evidence Module
- Certificate Module
- AI Module
- Notification Module
- Mobile Responsive Interface
- Future Mobile Application

---

# 4. Audience

Tài liệu này dành cho:

- UX Designer
- UI Designer
- Frontend Developer
- Backend Developer
- Product Owner
- QA Engineer
- AI Coding Assistant

Tất cả thành viên tham gia phát triển DIGVOS đều phải tuân thủ Design System.

---

# 5. Product Vision

DIGVOS hướng tới trở thành nền tảng đánh giá và chứng nhận năng lực số hiện đại theo chuẩn DigComp.

Giao diện phải phản ánh các giá trị sau:

- Professional
- Reliable
- Minimal
- Intelligent
- Scalable
- Enterprise Ready

DIGVOS không phải Landing Page.

DIGVOS là một Enterprise SaaS Platform.

Mọi quyết định thiết kế phải ưu tiên hiệu quả sử dụng hơn yếu tố trang trí.

---

# 6. Design Philosophy

DIGVOS theo đuổi triết lý thiết kế:

> Simplicity creates efficiency.

Mỗi thành phần giao diện phải giúp người dùng hoàn thành công việc nhanh hơn.

Không thêm thành phần chỉ để tăng tính thẩm mỹ.

Thiết kế phải hỗ trợ quy trình làm việc.

Không gây phân tâm.

Không tạo gánh nặng nhận thức.

---

# 7. Design Principles

## 7.1 Clarity First

Người dùng phải hiểu giao diện trong vài giây đầu tiên.

Thông tin quan trọng luôn được ưu tiên.

Không sử dụng bố cục gây rối mắt.

---

## 7.2 Functional Before Decorative

Mọi thành phần đều phải phục vụ chức năng.

Không thêm hiệu ứng nếu không mang lại giá trị.

---

## 7.3 Consistency

Component cùng loại phải hoạt động giống nhau trên toàn bộ hệ thống.

Ví dụ:

- Button
- Card
- Dialog
- Table
- Sidebar

đều phải có hành vi nhất quán.

---

## 7.4 Progressive Disclosure

Không hiển thị quá nhiều thông tin cùng lúc.

Thông tin nâng cao chỉ xuất hiện khi người dùng cần.

Ví dụ:

- Collapse
- Accordion
- Drawer
- Detail Panel

---

## 7.5 Accessibility First

Khả năng tiếp cận là yêu cầu bắt buộc.

Không phải tính năng bổ sung.

---

## 7.6 Responsive by Default

Mọi giao diện phải hoạt động tốt trên:

- Desktop
- Laptop
- Tablet
- Mobile

Không thiết kế riêng Desktop rồi mới sửa Mobile.

---

## 7.7 Modular Design

Toàn bộ hệ thống được chia thành nhiều module độc lập.

Mỗi module có:

- Layout riêng
- Navigation riêng
- Business Logic riêng

---

## 7.8 Enterprise Experience

Giao diện phải tạo cảm giác của phần mềm doanh nghiệp hiện đại.

Ưu tiên:

- rõ ràng
- khoa học
- dễ tìm
- dễ mở rộng

---

## 7.9 Data-driven

Dashboard phải ưu tiên dữ liệu.

Chart

Table

KPI

Timeline

Analytics

quan trọng hơn hình minh họa.

---

## 7.10 Minimal Cognitive Load

Giảm số lượng thao tác.

Giảm số lượng quyết định.

Giảm số lượng bước.

Người dùng luôn biết:

- mình đang ở đâu
- bước tiếp theo là gì
- kết quả hiện tại

---

# 8. Brand Identity

## Product Name

DIGVOS

---

## Brand Personality

DIGVOS đại diện cho:

Professional

Reliable

Modern

Trustworthy

Intelligent

Minimal

Academic

Enterprise

---

## Tone

Không vui nhộn.

Không màu mè.

Không mang phong cách game.

Không Cyberpunk.

Không Glassmorphism quá mức.

Không Neon.

---

## Design Style

Modern SaaS

Enterprise Dashboard

Clean Interface

White Space

Minimal

Professional

Data-first

---

## UI References

Tham khảo tinh thần thiết kế từ:

- Stripe Dashboard
- Linear
- Notion
- Vercel Dashboard
- Microsoft 365
- Atlassian
- GitHub Enterprise

DIGVOS không sao chép bất kỳ sản phẩm nào.

---

# 9. Visual Language

DIGVOS sử dụng phong cách giao diện sáng.

Đặc trưng:

- nhiều khoảng trắng
- typography rõ ràng
- card nhẹ
- border mỏng
- icon tối giản
- hierarchy rõ ràng
- dashboard theo module

Không sử dụng:

- nền tối mặc định
- gradient lớn
- hiệu ứng phát sáng
- animation quá nhiều
- texture nền
- background phức tạp

---

# 10. Color System

## Primary

Primary Color

```css
#5A96B0
```

Được sử dụng cho:

- Primary Button
- Active Navigation
- Active Sidebar
- Link
- Progress
- Chart Highlight
- Selected State
- Focus Ring

---

## Primary Scale

| Token | Color |
|--------|--------|
| Primary-50 | #F3F9FB |
| Primary-100 | #E6F2F6 |
| Primary-200 | #C9E1EA |
| Primary-300 | #A8CBD9 |
| Primary-400 | #82B2C5 |
| Primary-500 | #5A96B0 |
| Primary-600 | #4B829B |
| Primary-700 | #3C687C |
| Primary-800 | #2F5262 |
| Primary-900 | #223A46 |

---

## Neutral

| Token | Color |
|--------|--------|
| Gray-50 | #FAFAFA |
| Gray-100 | #F5F5F5 |
| Gray-200 | #E5E7EB |
| Gray-300 | #D1D5DB |
| Gray-400 | #9CA3AF |
| Gray-500 | #6B7280 |
| Gray-600 | #4B5563 |
| Gray-700 | #374151 |
| Gray-800 | #1F2937 |
| Gray-900 | #111827 |

---

## Background

| Token | Value |
|--------|--------|
| App Background | #FFFFFF |
| Page Background | #FFFFFF |
| Section Background | #FAFAFA |
| Sidebar | #FFFFFF |
| Header | #FFFFFF |
| Card | #FFFFFF |
| Modal | #FFFFFF |

---

## Borders

| Token | Value |
|--------|--------|
| Border Default | #E5E7EB |
| Border Hover | #D1D5DB |
| Border Active | #5A96B0 |

---

## Text

| Token | Value |
|--------|--------|
| Primary | #111827 |
| Secondary | #6B7280 |
| Disabled | #9CA3AF |
| Inverse | #FFFFFF |

---

## Semantic Colors

### Success

```css
#22C55E
```

---

### Warning

```css
#F59E0B
```

---

### Danger

```css
#EF4444
```

---

### Information

```css
#3B82F6
```

---

## Hover

```css
#EDF7FB
```

---

## Selection

```css
rgba(90,150,176,0.15)
```

---

## Focus Ring

```css
rgba(90,150,176,0.35)
```

---

## Shadow

Không sử dụng màu trong Shadow.

Chỉ sử dụng Shadow màu đen với độ mờ thấp.

Ví dụ:

```css
0 4px 12px rgba(0,0,0,.06)
```

hoặc

```css
0 8px 24px rgba(0,0,0,.08)
```

---

## Color Usage Rules

Không sử dụng quá 3 màu chính trên một màn hình.

Primary chỉ dùng cho các hành động quan trọng.

Không sử dụng màu đỏ làm màu thương hiệu.

Không sử dụng gradient lớn làm nền.

Không sử dụng nền tối mặc định.

Ưu tiên nền trắng để tăng khả năng đọc và giảm mỏi mắt trong quá trình sử dụng lâu dài.

---

# End of Part 1


# 2. Design Principles

DIGVOS được thiết kế theo triết lý của các nền tảng Enterprise SaaS hiện đại, ưu tiên khả năng làm việc, mở rộng và tính nhất quán hơn các hiệu ứng thị giác.

Các nguyên tắc cốt lõi bao gồm:

## Consistency

Toàn bộ hệ thống phải sử dụng chung một ngôn ngữ thiết kế.

Bao gồm:

- Màu sắc
- Typography
- Khoảng cách
- Grid
- Component
- Animation
- Icon
- Border Radius
- Shadow

Người dùng không phải học lại giao diện khi chuyển giữa các module.

---

## Clarity

Mọi thông tin phải rõ ràng.

Người dùng luôn biết:

- mình đang ở đâu
- đang thao tác gì
- kết quả của thao tác là gì
- bước tiếp theo cần làm

Không sử dụng giao diện gây rối mắt hoặc khó hiểu.

---

## Enterprise First

DIGVOS là nền tảng phục vụ:

- Trường đại học
- Doanh nghiệp
- Tổ chức đào tạo
- Quản trị hệ thống

Do đó giao diện phải mang tính:

- Professional
- Stable
- Data-driven
- Workflow-oriented

Không thiết kế theo phong cách Landing Page hoặc Portfolio.

---

## Workspace Oriented

Dashboard phải được xem như một không gian làm việc.

Một Workspace luôn bao gồm:

- Sidebar
- Header
- Breadcrumb
- Toolbar
- Content Area
- Utility Panel (nếu cần)

Không đặt toàn bộ chức năng trong một trang duy nhất.

---

## Module Separation

Mỗi nghiệp vụ phải là một module độc lập.

Ví dụ:

Assessment

Competency

Learning

Evidence

Certificate

Analytics

Settings

Mỗi module có:

- Menu riêng
- Route riêng
- Permission riêng
- Trang riêng

Không nhồi toàn bộ chức năng vào Dashboard.

---

## Role-based Experience

Mỗi vai trò người dùng có trải nghiệm riêng.

Ví dụ:

Student

Teacher

Reviewer

Organization

Enterprise

System Admin

Mỗi Role có:

- Dashboard riêng
- Sidebar riêng
- Navigation riêng
- Widget riêng
- Quyền riêng

Không sử dụng nút chuyển Role trong Dashboard.

Việc truy cập Dashboard được quyết định bởi Authentication và Authorization.

---

## Minimal Visual Noise

Giảm tối đa các thành phần gây mất tập trung.

Ưu tiên:

- khoảng trắng
- phân cấp rõ ràng
- typography
- màu nhấn

Thay vì:

- gradient quá nhiều
- glow
- animation liên tục
- shadow nặng

---

## Data First

Dashboard ưu tiên hiển thị dữ liệu phục vụ công việc.

Ví dụ:

- KPI
- Progress
- Table
- Timeline
- Activity
- Notification
- Analytics
- Task

Không sử dụng các thành phần trang trí không mang giá trị.

---

## Progressive Disclosure

Thông tin chỉ hiển thị khi cần.

Ví dụ:

Sidebar

```
Assessment
    ▼
    CAT Assessment
    Assessment History
    Question Bank
```

Thay vì hiển thị toàn bộ menu ngay từ đầu.

Điều này giúp giao diện gọn gàng hơn.

---

## Scalability

Thiết kế phải hỗ trợ mở rộng nhiều năm.

Có thể bổ sung:

- module mới
- tenant mới
- dashboard mới
- organization mới
- plugin mới

mà không cần thay đổi kiến trúc giao diện.

---

## Accessibility

Mọi giao diện phải đáp ứng tiêu chuẩn WCAG 2.2 AA.

Bao gồm:

- Keyboard Navigation
- Focus Indicator
- Screen Reader
- Contrast Ratio
- Font Scaling
- Reduced Motion
- Color Blind Friendly

Accessibility là yêu cầu bắt buộc.

---

## Responsive

Toàn bộ giao diện hoạt động tốt trên:

- Desktop
- Laptop
- Tablet
- Mobile

Sidebar phải hỗ trợ:

- Expanded
- Collapsed
- Overlay (Mobile)

---

## Maintainability

Frontend phải dễ bảo trì.

Mọi giá trị đều sử dụng Design Tokens.

Không hard-code:

- màu sắc
- spacing
- radius
- typography

Mọi component phải có khả năng tái sử dụng.

---

## Performance

Thiết kế ưu tiên hiệu năng.

Không sử dụng:

- animation nặng
- blur quá nhiều
- hiệu ứng liên tục
- component render dư thừa

Mọi hiệu ứng phải phục vụ trải nghiệm người dùng.

---

## Professionalism

DIGVOS là nền tảng đánh giá năng lực số dành cho giáo dục và doanh nghiệp.

Giao diện phải tạo cảm giác:

- đáng tin cậy
- hiện đại
- chuyên nghiệp
- rõ ràng
- dễ sử dụng

Đây là tiêu chí xuyên suốt toàn bộ hệ thống.


# 3. Visual Identity

DIGVOS được định hướng là một nền tảng Enterprise SaaS hiện đại dành cho giáo dục, doanh nghiệp và tổ chức đào tạo.

Ngôn ngữ thiết kế phải tạo cảm giác:

- Chuyên nghiệp
- Tin cậy
- Hiện đại
- Gọn gàng
- Rõ ràng
- Dễ sử dụng
- Có khả năng mở rộng lâu dài

Mọi giao diện trong hệ thống phải thống nhất cùng một Visual Identity.

---

## Design Style

Phong cách thiết kế chính:

Modern Enterprise SaaS

Workspace-oriented

Minimal

Data-driven

Professional

Clean Interface

Functional Design

Không theo phong cách:

- Landing Page
- Gaming UI
- Glassmorphism quá mức
- Cyberpunk
- Gradient nặng
- Neumorphism

Mục tiêu là tối ưu trải nghiệm làm việc thay vì tạo hiệu ứng thị giác.

---

## Overall Appearance

DIGVOS sử dụng giao diện sáng (Light Theme) làm mặc định.

Đặc điểm:

- Nền trắng
- Card trắng
- Khoảng trắng rộng
- Border nhẹ
- Typography rõ ràng
- Ít sử dụng Shadow
- Màu nhấn rõ ràng

Toàn bộ Dashboard phải tạo cảm giác sạch sẽ giống các phần mềm quản trị hiện đại.

---

## Brand Identity

Màu thương hiệu chính của DIGVOS là:

#5A96B0

Màu này đại diện cho:

- Công nghệ
- Giáo dục
- Độ tin cậy
- Sự chuyên nghiệp
- Khả năng phát triển

Primary Color chỉ dùng để nhấn các thành phần quan trọng.

Ví dụ:

- Primary Button
- Active Navigation
- Progress
- Selected Item
- Links
- Focus State
- Charts

Không lạm dụng Primary Color trên toàn giao diện.

---

## Visual Hierarchy

Thông tin được phân cấp theo mức độ quan trọng.

Thứ tự ưu tiên:

Page Title

↓

Section Header

↓

Widget Title

↓

Content

↓

Description

↓

Helper Text

↓

Caption

Người dùng luôn biết:

- đâu là nội dung chính
- đâu là thông tin phụ
- đâu là hành động cần thực hiện

---

## White Space

Whitespace là thành phần bắt buộc.

Ưu tiên:

- khoảng cách lớn giữa các Section
- khoảng cách đồng đều giữa các Component
- nội dung không bị dồn sát nhau

Không thiết kế giao diện quá chật.

Whitespace giúp:

- tăng khả năng đọc
- giảm tải nhận thức
- tăng cảm giác chuyên nghiệp

---

## Cards

Card là thành phần chính trong Dashboard.

Card được sử dụng cho:

- KPI
- Widget
- Chart
- Table
- Activity
- Notification
- Form
- AI Recommendation

Card phải:

- nền trắng
- border nhẹ
- bo góc vừa phải
- shadow rất nhẹ hoặc không có

Không sử dụng card có hiệu ứng phát sáng.

---

## Sidebar

Sidebar là trung tâm điều hướng của Workspace.

Sidebar luôn nằm bên trái.

Sidebar được chia thành các nhóm chức năng.

Ví dụ:

Dashboard

Assessment

Competency

Learning

Evidence

Certificates

Analytics

Settings

Mỗi nhóm có thể mở rộng thành menu con.

Ví dụ:

Assessment

- CAT Assessment
- Assessment History
- Question Bank

Learning

- Learning Path
- Courses
- Recommendations

Analytics

- Dashboard
- Reports
- Export

Sidebar phải hỗ trợ:

- Expand
- Collapse
- Nested Menu
- Active State
- Permission-based Navigation

Sidebar không chứa chức năng chuyển đổi Role.

---

## Header

Header luôn nằm phía trên.

Bao gồm:

- Breadcrumb
- Search
- Notification
- Quick Actions
- User Menu

Header không chứa điều hướng chính.

Điều hướng chính thuộc Sidebar.

---

## Dashboard Layout

Dashboard sử dụng bố cục Workspace.

```
+------------------------------------------------------+
| Header                                               |
+--------------+---------------------------------------+
| Sidebar      | Main Workspace                        |
|              |                                       |
|              | Widget                                |
|              |                                       |
|              | KPI                                   |
|              |                                       |
|              | Chart                                 |
|              |                                       |
|              | Table                                 |
|              |                                       |
+--------------+---------------------------------------+
```

Không thiết kế Dashboard như một Landing Page.

Không đặt tất cả chức năng vào một trang duy nhất.

---

## Widget Design

Widget là đơn vị hiển thị thông tin.

Mỗi Widget chỉ thực hiện một nhiệm vụ.

Ví dụ:

- KPI Widget
- Recent Activity
- AI Recommendation
- Notification
- Competency Radar
- Progress
- Calendar

Không tạo Widget quá lớn.

---

## Data Visualization

Biểu đồ phải đơn giản.

Ưu tiên:

- Radar Chart
- Line Chart
- Bar Chart
- Area Chart
- Pie Chart
- Heatmap

Màu sắc biểu đồ phải đồng nhất với Brand Color.

Không sử dụng quá nhiều màu trong cùng một biểu đồ.

---

## Iconography

Sử dụng duy nhất:

Lucide Icons

Nguyên tắc:

- cùng kích thước
- cùng stroke
- cùng phong cách

Icon luôn đi cùng Label ở chức năng quan trọng.

Không sử dụng icon trang trí.

---

## Illustration

DIGVOS hạn chế sử dụng Illustration.

Chỉ sử dụng cho:

- Empty State
- Welcome Screen
- Error Page
- Success Page

Không sử dụng Illustration trong Dashboard làm việc.

---

## Motion

Animation chỉ nhằm hỗ trợ trải nghiệm.

Cho phép:

- Fade
- Slide
- Collapse
- Expand
- Hover
- Focus
- Loading

Thời gian:

100ms–250ms

Animation không được làm chậm thao tác người dùng.

---

## Visual Consistency

Toàn bộ giao diện phải thống nhất về:

- màu sắc
- typography
- icon
- spacing
- border
- radius
- animation
- component

Không được thay đổi phong cách giữa các module.

Người dùng phải có cảm giác toàn bộ hệ thống được xây dựng từ một Design Language duy nhất.

---

## Reference Design

DIGVOS tham khảo tư duy thiết kế từ:

- Microsoft Fluent 2
- IBM Carbon Design System
- Atlassian Design System
- Linear
- GitHub
- Notion
- Vercel Dashboard

Các tài liệu này chỉ được sử dụng làm nguồn tham khảo về tư duy thiết kế và trải nghiệm người dùng.

DIGVOS không sao chép giao diện của bất kỳ sản phẩm nào.