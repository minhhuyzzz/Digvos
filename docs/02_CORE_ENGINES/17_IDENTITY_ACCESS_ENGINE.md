# DIGVOS

# 17_IDENTITY_ACCESS_ENGINE.md

Version: 1.0

Status: Draft

Owner: Platform Team

---

# Table of Contents

1. Purpose
2. Identity Philosophy
3. Architecture
4. Core Components
5. Authentication
6. Authorization (RBAC)
7. Multi-Tenant
8. Organization Management
9. User Lifecycle
10. Session Management
11. Security
12. Audit & Compliance
13. Domain Events
14. APIs
15. Future Expansion

---

# 1. Purpose

Identity & Access Engine là nền tảng quản lý:

- Người dùng
- Vai trò
- Quyền truy cập
- Tổ chức
- Phiên đăng nhập
- Xác thực

Đây là Engine duy nhất chịu trách nhiệm về Identity.

Không Engine nào khác được quản lý User trực tiếp.

---

# 2. Identity Philosophy

Identity được xây dựng theo nguyên tắc

Identity

↓

Organization

↓

Role

↓

Permission

↓

Resource

↓

Action

↓

Audit

Không kiểm tra quyền trực tiếp trong từng module.

Mọi kiểm tra đều thông qua Identity Engine.

---

# 3. Architecture

```
                Identity Engine

                     │

        Authentication Service

                     │

        Authorization Service

                     │

             Organization

                     │

                  Users

                     │

                Permissions
```

---

# 4. Core Components

Authentication Service

Authorization Service

RBAC Manager

Permission Manager

Organization Manager

User Manager

Role Manager

Session Manager

Audit Service

SSO Manager

Identity Provider

---

# 5. Authentication

DIGVOS hỗ trợ:

Email + Password

Magic Link

Google

Microsoft

GitHub

Apple

SAML 2.0

OpenID Connect

OAuth2

LDAP

Active Directory

Doanh nghiệp có thể sử dụng SSO riêng.

---

## Multi-factor Authentication

Hỗ trợ

Email OTP

Authenticator App

SMS OTP

Hardware Key (FIDO2)

Backup Code

MFA có thể bắt buộc theo từng Organization.

---

# 6. Authorization (RBAC)

DIGVOS sử dụng RBAC kết hợp ABAC.

## System Roles

Platform Super Admin

Platform Admin

Support Engineer

Security Auditor

---

## Organization Roles

Organization Owner

Organization Admin

Manager

Teacher

Reviewer

HR

Employee

Student

Guest

---

## Permission Structure

Permission

↓

Module

↓

Resource

↓

Action

Ví dụ

Assessment

↓

Question

↓

Create

Edit

Delete

Publish

Archive

---

# 7. Multi-Tenant

Một hệ thống phục vụ nhiều tổ chức.

Ví dụ

```
DIGVOS

├── University A

├── University B

├── Company A

├── Company B

└── Training Center
```

Mỗi Tenant có:

- Domain
- Branding
- Theme
- Framework
- Policies
- Users
- Reports

Dữ liệu được cô lập giữa các Tenant.

---

# 8. Organization Management

Organization có thể là:

University

Enterprise

Training Center

Government Agency

NGO

Consulting Firm

Mỗi Organization quản lý:

Departments

Teams

Programs

Courses

Employees

Students

Managers

---

# 9. User Lifecycle

```
Invitation

↓

Registration

↓

Verification

↓

Active

↓

Suspended

↓

Locked

↓

Archived

↓

Deleted
```

Không xóa cứng dữ liệu người dùng.

---

# 10. Session Management

Theo dõi:

Current Device

Browser

Operating System

Location

Login Time

IP Address

Session Duration

Cho phép:

- Logout thiết bị
- Force Logout
- Session Timeout
- Concurrent Session Control

---

# 11. Security

Hỗ trợ:

JWT

Refresh Token

Token Rotation

Password Policy

Brute-force Protection

Rate Limiting

CAPTCHA

IP Whitelist

Device Trust

Risk-based Login

Geo-blocking

---

# 12. Audit & Compliance

Ghi nhận:

Login

Logout

Permission Change

Role Assignment

Policy Update

MFA Changes

Failed Login

Organization Changes

Audit Log không được chỉnh sửa.

---

# 13. Domain Events

Consume

OrganizationCreated

UserInvited

RoleUpdated

---

Publish

UserRegistered

UserLoggedIn

UserLoggedOut

RoleAssigned

PermissionUpdated

SessionExpired

---

# 14. APIs

Register User

Login

Logout

Refresh Token

Assign Role

Update Permission

Create Organization

Invite User

Get Session

Reset Password

Enable MFA

---

# 15. Future Expansion

Identity Engine sẽ hỗ trợ:

SCIM 2.0

Passkey

Biometric Login

Decentralized Identity (DID)

Identity Federation

Cross-Tenant Collaboration

Adaptive Authentication

Zero Trust Security

---

# Summary

Identity & Access Engine là nền tảng bảo mật và quản lý truy cập của DIGVOS.

Engine này cung cấp Authentication, Authorization, RBAC, Multi-tenant và Organization Management, đảm bảo mọi người dùng và tổ chức đều được quản lý tập trung, an toàn và có khả năng mở rộng ở quy mô doanh nghiệp.