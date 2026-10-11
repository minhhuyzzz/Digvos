# DIGVOS

# 25_API_SPECIFICATION.md

Version: 1.0

Status: Draft

Owner: Backend Team

---

# Table of Contents

1. Purpose
2. API Design Principles
3. API Architecture
4. Authentication & Authorization
5. API Versioning
6. Request Standards
7. Response Standards
8. Error Handling
9. Pagination
10. Filtering & Sorting
11. Search
12. Rate Limiting
13. File Upload
14. Webhook
15. API Modules
16. Security
17. API Documentation
18. Future Expansion

---

# 1. Purpose

Tài liệu này định nghĩa tiêu chuẩn thiết kế API của DIGVOS.

Mục tiêu:

- Chuẩn hóa API trên toàn hệ thống
- Dễ bảo trì
- Dễ tích hợp
- Dễ mở rộng
- Đảm bảo bảo mật
- Hỗ trợ Multi-Tenant

Mọi Backend Service phải tuân theo tài liệu này.

---

# 2. API Design Principles

DIGVOS sử dụng kiến trúc RESTful API.

Nguyên tắc:

Consistency

↓

Predictability

↓

Scalability

↓

Security

↓

Performance

↓

Backward Compatibility

API phản ánh Business Domain thay vì Database.

---

# 3. API Architecture

```
Client

↓

API Gateway

↓

Authentication

↓

Business Service

↓

Repository

↓

Database
```

Mọi request đều đi qua API Gateway.

---

# 4. Authentication & Authorization

Authentication

- JWT Access Token
- Refresh Token
- OAuth2
- OpenID Connect
- SSO

Authorization

- RBAC
- Organization Scope
- Tenant Scope
- Resource Permission

Header

Authorization

Bearer <access_token>

---

# 5. API Versioning

Định dạng:

```
/api/v1/
```

Ví dụ

```
GET /api/v1/users

GET /api/v1/assessments

GET /api/v1/competencies
```

Không thay đổi API cũ nếu chưa Deprecate.

---

# 6. Request Standards

Content-Type

application/json

Encoding

UTF-8

Request Body

JSON

Date

ISO 8601

Timezone

UTC

Ví dụ

```json
{
    "title":"Digital Literacy Assessment",
    "status":"draft"
}
```

---

# 7. Response Standards

Thành công

```json
{
    "success": true,
    "message": "Assessment created successfully.",
    "data": {},
    "meta": {}
}
```

Lỗi

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": []
}
```

Không trả về dữ liệu không cần thiết.

---

# 8. Error Handling

HTTP Status

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

429 Too Many Requests

500 Internal Server Error

Mỗi lỗi phải có:

Code

Message

Details

Timestamp

Trace ID

---

# 9. Pagination

Chuẩn:

```
?page=1

&limit=20
```

Response

```json
{
  "data": [],
  "pagination": {
      "page":1,
      "limit":20,
      "total":100,
      "total_pages":5
  }
}
```

---

# 10. Filtering & Sorting

Filter

```
?status=active

?organization=123

?role=teacher
```

Sort

```
?sort=name

?sort=-created_at
```

Multiple Filters được hỗ trợ.

---

# 11. Search

Global Search

```
?q=digital
```

Advanced Search

```
?competency=...

&organization=...

&level=...
```

Full-text Search được xử lý bởi Search Service nếu triển khai.

---

# 12. Rate Limiting

Mặc định

100 requests/phút/người dùng

API Public

Giới hạn riêng

Admin API

Không áp dụng cùng giới hạn với API người dùng thông thường.

Rate Limit Header:

```
X-RateLimit-Limit

X-RateLimit-Remaining
```

---

# 13. File Upload

Hỗ trợ:

PDF

DOCX

PPTX

XLSX

PNG

JPG

ZIP

MP4

Dung lượng tối đa cấu hình theo Tenant Policy.

Mọi tệp phải được kiểm tra:

Virus Scan

File Type

File Size

Integrity

---

# 14. Webhook

Sự kiện hỗ trợ:

Assessment Completed

Certificate Issued

Competency Updated

Learning Completed

User Created

Organization Created

Webhook gồm:

Event

Payload

Timestamp

Signature

Retry Policy

---

# 15. API Modules

Identity API

Organization API

Competency API

Assessment API

Learning API

Evidence API

Certification API

Analytics API

Communication API

Workflow API

AI API

Integration API

Admin API

---

# 16. Security

Bắt buộc:

HTTPS

JWT Validation

Permission Checking

Input Validation

Output Sanitization

Rate Limiting

Audit Logging

CSRF Protection (nếu áp dụng)

CORS Policy

Không trả Stack Trace ra Client.

---

# 17. API Documentation

Toàn bộ API phải được mô tả bằng:

OpenAPI 3.x

Swagger UI

Ví dụ tài liệu:

Endpoint

Parameters

Responses

Authentication

Examples

Error Codes

Change Log

---

# 18. Future Expansion

API sẽ hỗ trợ:

GraphQL

gRPC

Event API

Streaming API

SDK

Webhook Marketplace

Public Developer Portal

API Sandbox

---

# Summary

DIGVOS sử dụng RESTful API với chuẩn thiết kế thống nhất, hỗ trợ JWT, OAuth2, RBAC và Multi-Tenant. API được version hóa, có quy tắc chung về Request, Response, Error Handling, Pagination, Filtering và Webhook nhằm đảm bảo khả năng mở rộng, tích hợp và bảo trì lâu dài.