# DIGVOS

# 20_WORKSPACE_FRAMEWORK.md

Version: 1.0

Status: Draft

Owner: UX Architecture Team

---

# Table of Contents

1. Purpose
2. Design Principles
3. Workspace Hierarchy
4. Global Layout
5. Navigation System
6. Workspace Areas
7. Common Components
8. Widget System
9. Global Search
10. Command Palette
11. Notifications
12. Personalization
13. Responsive Design
14. Accessibility
15. Future Expansion

---

# 1. Purpose

Workspace Framework là bộ khung giao diện dùng chung cho toàn bộ DIGVOS.

Mọi Workspace đều sử dụng chung:

- Layout
- Navigation
- Components
- Design Rules
- Interaction Rules

Không thiết kế riêng từng Dashboard.

---

# 2. Design Principles

DIGVOS tuân theo các nguyên tắc:

Consistency

↓

Discoverability

↓

Minimalism

↓

Scalability

↓

Accessibility

↓

Productivity

Mỗi màn hình phải phục vụ công việc chứ không chỉ hiển thị dữ liệu.

---

# 3. Workspace Hierarchy

Platform

↓

Workspace

↓

Module

↓

Page

↓

Section

↓

Widget

↓

Component

Ví dụ

Student Workspace

↓

Learning

↓

Course Detail

↓

Progress

↓

Progress Card

---

# 4. Global Layout

```
┌──────────────────────────────────────────────────────┐

│ Header │

├──────────────┬───────────────────────────────────────┤

│ Sidebar │ Content │

│ │ │

│ │ │

│ │ │

├──────────────┴───────────────────────────────────────┤

│ Status Bar │

└──────────────────────────────────────────────────────┘
```

---

# 5. Navigation System

Navigation gồm:

Global Navigation

Workspace Navigation

Context Navigation

Breadcrumb

Quick Access

Command Palette

Navigation luôn hỗ trợ:

Search

Favorites

Recent

Pinned

---

# 6. Workspace Areas

Header

Sidebar

Content

Inspector Panel

Activity Panel

Notification Center

Footer

Inspector Panel chỉ mở khi cần.

---

# 7. Common Components

Card

Data Table

Chart

Timeline

Calendar

Progress

Kanban

Tree

List

Tabs

Modal

Drawer

Wizard

Empty State

Loading

Toast

Skeleton

Avatar

Badge

Tag

Metric

---

# 8. Widget System

Widget là đơn vị nhỏ nhất trên Dashboard.

Ví dụ

Today's Tasks

Learning Progress

Competency Radar

Notifications

Upcoming Assessment

Calendar

AI Recommendation

Recent Activities

Widget có thể:

Move

Resize

Hide

Duplicate

Pin

---

# 9. Global Search

Ctrl + K

cho phép tìm:

Assessment

Learning

Certificate

Evidence

User

Organization

Competency

Job

Report

Settings

Search hỗ trợ AI.

---

# 10. Command Palette

Ctrl + K

Ví dụ

Create Assessment

Invite User

Search Certificate

Upload Evidence

Create Learning Path

Generate Report

Open Analytics

Không cần mở menu.

---

# 11. Notifications

Notification Center gồm

Unread

Today

This Week

System

Assessment

Learning

Approval

Certificate

Có thể:

Pin

Archive

Mute

Filter

Search

---

# 12. Personalization

Người dùng có thể:

Collapse Sidebar

Dark Mode

Language

Widget Layout

Favorite Pages

Pinned Items

Shortcuts

Density

Accent Color

---

# 13. Responsive Design

Desktop

Laptop

Tablet

Mobile

Sidebar tự động:

Expand

Collapse

Overlay

Bottom Navigation

---

# 14. Accessibility

WCAG 2.2 AA

Keyboard Navigation

Screen Reader

High Contrast

Font Scaling

Reduced Motion

Color Blind Support

---

# 15. Future Expansion

Workspace Framework sẽ hỗ trợ:

AI Workspace

Multi-window

Split View

Workspace Templates

Plugin System

Marketplace

Custom Widgets

Offline Mode

PWA

---

# Summary

Workspace Framework là lớp giao diện thống nhất của DIGVOS.

Mọi Workspace trong hệ thống đều sử dụng cùng một Layout, Navigation, Component và Interaction Pattern nhằm đảm bảo tính nhất quán, khả năng mở rộng và trải nghiệm người dùng trên toàn bộ nền tảng.