# 51. Event-Driven Messaging Contracts

Tài liệu này đặc tả cấu trúc dữ liệu và hợp đồng giao tiếp (Event Contracts) của toàn bộ các sự kiện được truyền tải thông qua NestJS Event Bus cục bộ và hàng đợi BullMQ trong hệ thống DIGVOS.

---

## 🚦 1. Cấu Trúc Sự Kiện Chuẩn (Standard Event Envelope)

Tất cả các sự kiện phát ra bắt buộc phải kế thừa class cơ sở `BaseEvent` để đảm bảo lưu vết và khử trùng (Idempotency) đồng nhất:

```typescript
export interface BaseEvent<TPayload> {
  eventId: string;     // Unique CUID định danh sự kiện để khử trùng
  eventName: string;   // Tên sự kiện (Ví dụ: AssessmentSubmitted)
  occurredAt: string;  // Thời gian phát sinh sự kiện ISO 8601
  tenantId: string;    // Định danh tổ chức sở hữu sự kiện
  userId: string;      // Định danh người dùng kích hoạt sự kiện
  payload: TPayload;   // Dữ liệu nghiệp vụ chi tiết của sự kiện
}
```

---

## 📋 2. Đặc Tả Chi Tiết Payload Các Sự Kiện Lõi

### A. Sự kiện: `AssessmentSubmitted`
- **Mô tả**: Phát ra khi học viên hoàn thành và nộp bài thi đánh giá CAT.
- **Payload**:
```typescript
interface AssessmentSubmittedPayload {
  assessmentId: string;
  score: number;        // Điểm số thô đạt được (0-100)
  theta: number;        // Mức năng lực ước lượng theo mô hình IRT
  sem: number;          // Sai số đo lường chuẩn (Standard Error of Measurement)
  competencyId: string; // Năng lực DigComp tương ứng (ví dụ: 'digcomp-1.1')
}
```

### B. Sự kiện: `EvidenceSubmitted`
- **Mô tả**: Phát ra khi học sinh hoàn thành tải lên và nộp minh chứng bảo chứng năng lực.
- **Payload**:
```typescript
interface EvidenceSubmittedPayload {
  submissionId: string;
  fileUrl: string;       // URL tệp tin đã lưu ở S3/Supabase Storage
  fileType: string;      // MIME-type (ví dụ: application/pdf)
  competencyId: string;  // Năng lực DigComp muốn bảo chứng
}
```

### C. Sự kiện: `EvidenceApproved`
- **Mô tả**: Giảng viên phê duyệt và cho điểm minh chứng của sinh viên.
- **Payload**:
```typescript
interface EvidenceApprovedPayload {
  submissionId: string;
  competencyId: string;
  score: number;          // Điểm chấm từ giáo viên (>= 60 là đạt)
  validatedBy: string;    // ID ví/tài khoản giảng viên phê duyệt
  feedback: string;       // Nhận xét phê duyệt
}
```

### D. Sự kiện: `CompetencyUpdated`
- **Mô tả**: Năng lực số của học sinh thay đổi bậc thành thạo (Level 1-8).
- **Payload**:
```typescript
interface CompetencyUpdatedPayload {
  competencyId: string;
  oldLevel: number;
  newLevel: number;       // Cấp độ mới sau khi tính toán lại
  triggerEvent: string;   // Sự kiện kích hoạt ('AssessmentSubmitted' hoặc 'EvidenceApproved')
}
```

### E. Sự kiện: `CertificateIssued`
- **Mô tả**: Hệ thống tự động tạo chứng chỉ số chứng nhận năng lực cho học viên.
- **Payload**:
```typescript
interface CertificateIssuedPayload {
  certificateId: string;
  competencyId: string;
  level: number;
  recipientName: string;
  recipientEmail: string;
}
```

### F. Sự kiện: `SBTMintStarted` & `SBTMintCompleted`
- **Mô tả**: Quá trình đúc Soulbound Token trên Blockchain Polygon bắt đầu và kết thúc.
- **Payload (`SBTMintCompleted`)**:
```typescript
interface SBTMintCompletedPayload {
  certificateId: string;
  recipientAddress: string; // Địa chỉ ví Polygon nhận SBT
  tokenId: string;          // Token ID đúc trên blockchain
  transactionHash: string;  // Transaction hash trên Polygonscan
  blockNumber: number;
}
```

### G. Sự kiện: `RecruitmentMatched`
- **Mô tả**: Phát hiện ứng viên đáp ứng chuẩn yêu cầu tuyển dụng của doanh nghiệp.
- **Payload**:
```typescript
interface RecruitmentMatchedPayload {
  enterpriseId: string;
  candidateId: string;
  matchScore: number;       // % Đối khớp năng lực
  matchedCompetencies: string[]; // Danh sách các năng lực trùng khớp
}
```

### H. Sự kiện: `NotificationCreated`
- **Mô tả**: Sinh thông báo mới trong hệ thống để đẩy xuống Client qua SSE.
- **Payload**:
```typescript
interface NotificationCreatedPayload {
  notificationId: string;
  type: 'SUCCESS' | 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  actionUrl?: string;       // Đường dẫn chuyển hướng khi nhấp thông báo
}
```
