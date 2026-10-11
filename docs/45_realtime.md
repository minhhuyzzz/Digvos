# 45. Realtime Events & Communications Architecture

Tài liệu này đặc tả kiến trúc kết nối thời gian thực (Realtime System) của DIGVOS, phân biệt rõ ràng kịch bản sử dụng giữa Server-Sent Events (SSE) và WebSockets, và giải pháp mở rộng quy mô.

---

## 🚦 1. Phân Chia Công Nghệ (SSE vs WebSockets)

DIGVOS tối ưu hóa tài nguyên máy chủ bằng cách phân chia hai công nghệ truyền tin thời gian thực dựa trên luồng nghiệp vụ:

### A. Server-Sent Events (SSE) - Đơn Hướng (Server ➜ Client)
- **Áp dụng**: Hệ thống thông báo (Notification Center), Trạng thái tiến trình chạy ngầm (Ví dụ: Đang đúc SBT blockchain, đang render báo cáo PDF).
- **Lý do**: SSE chạy trực tiếp trên giao thức HTTP/2 mặc định của trình duyệt, tự động kết nối lại khi mất mạng, tiêu tốn ít RAM máy chủ hơn và dễ cấu hình qua Load Balancers hơn WebSockets.
- **Endpoint**: `/api/v1/notifications/stream`

### B. WebSockets (Socket.io) - Song Hướng (Server 🔄 Client)
- **Áp dụng**: Màn hình thi thích ứng CAT (Cần độ trễ mili-giây để trao đổi câu hỏi/đáp án liên tục), Giao diện phòng thảo luận học tập nhóm, Theo dõi hoạt động trực tuyến của lớp học (Presence).
- **Lý do**: Đòi hỏi trao đổi thông tin liên tục từ cả hai phía với độ trễ tối thiểu (Low Latency).

---

## 🏛️ 2. Thiết Kế Mở Rộng (Horizontal Scaling with Redis Pub/Sub)

Khi hệ thống có 10.000+ người dùng hoạt động đồng thời, chúng ta cần chạy nhiều instance backend NestJS đằng sau một Load Balancer (Nginx/AWS ALB). Khi đó, một học sinh kết nối vào Instance A sẽ không nhận được thông báo nếu sự kiện thăng cấp năng lực phát ra ở Instance B.

- **Giải pháp: Redis Pub/Sub Adapter**:
  - Tích hợp Redis làm luồng truyền tin trung gian (Adapter) kết nối tất cả các Instance NestJS API.
  - Khi có sự kiện cần gửi đi, instance tạo sự kiện sẽ publish sự kiện đó vào một Redis channel.
  - Tất cả các instance NestJS khác đang subscribe channel đó sẽ nhận được và đẩy trực tiếp xuống kết nối SSE/WebSocket của người dùng tương ứng đang ghim tại instance của mình.

```
[Client 1]  --WebSocket-->  [Instance NestJS A]  <--Pub/Sub-->  [Redis Cluster]
                                                                     ^
[Client 2]  --WebSocket-->  [Instance NestJS B]  <--Pub/Sub---------+
```

---

## 🔒 3. Bảo Mật & Xác Thực Kết Nối (WebSocket Handshake)

- **Xác thực lúc bắt tay (Handshake Authentication)**:
  - Cấm kết nối WebSocket ẩn danh hoặc truyền token qua query string của URL (dễ bị lộ log).
  - WebSockets Gateway của NestJS bắt buộc phải đọc và giải mã Cookie chứa Access Token được gửi kèm tự động trong header khi bắt đầu handshake:
```typescript
@UseGuards(WsJwtGuard)
@WebSocketGateway({ cors: true })
export class RealtimeGateway implements OnGatewayConnection {
  async handleConnection(client: Socket) {
    const cookies = client.handshake.headers.cookie;
    const token = extractTokenFromCookie(cookies);
    if (!token || !validateToken(token)) {
      client.disconnect(true); // Ngắt kết nối lập tức nếu token lậu
      return;
    }
    // Gán thông tin user đã xác thực vào socket instance
    client.data.user = decodeJwt(token);
  }
}
```

---

## 💓 4. Tránh Mất Kết Nối (Heartbeat & Reconnection Policy)

- **Cơ chế ping/pong (Heartbeat)**:
  - WebSocket Server gửi tín hiệu Ping định kỳ **mỗi 25 giây** tới client.
  - Client tự động phản hồi Pong. Nếu trong vòng 2 chu kỳ (50 giây) server không nhận được Pong, server coi như client đã mất kết nối và tiến hành dọn dẹp tài nguyên (Hủy session kết nối, xóa trạng thái online).
- **Chính sách tự động thử lại ở Client**:
  - Cấu hình Socket.io client tự động thử lại vô hạn lần khi mất mạng với giãn cách thử lại tăng dần (Backoff reconnection delay) từ `1s` đến tối đa `10s` để tránh dồn tải hàng loạt (Thundering Herd problem) khi server phục hồi.
