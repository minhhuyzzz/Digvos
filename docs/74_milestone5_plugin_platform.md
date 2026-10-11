# 74. Plugin Platform Architecture (Milestone 5)

Tài liệu này đặc tả kiến trúc phân hệ **Plugin Platform**. Khác với Marketplace (chỉ dùng để share data tĩnh), Plugin Platform cho phép cài đặt các "Đoạn mã động" (Dynamic Extensions) để thay đổi behavior của hệ thống (Ví dụ: Plugin chấm thi Code tự động cho sinh viên IT).

---

## 🔌 1. Kiến Trúc Cấp Thấp (Plugin Release Pattern)

Sử dụng pattern giống GitHub Releases. Metadata của Plugin (như tên, mô tả chung, tác giả) tách biệt hoàn toàn với Mã nhị phân / Source code cụ thể của từng phiên bản.

- **Plugin**: Đại diện cho 1 dự án (Ví dụ: `AutoCodeGrader`). Chứa danh sách các quyền hạn (`PluginPermission`) yêu cầu.
- **PluginRelease**: Đại diện cho 1 phiên bản cụ thể (Ví dụ: `v1.2.0`). Đi kèm với `manifest` JSON, `checksum` bảo mật để chống giả mạo file, và `entryPoint` để hệ thống boot.

---

## 🛡️ 2. Hệ Thống Phân Quyền An Toàn (Permissions & Sandbox)

Plugins có thể gây nguy hiểm cho dữ liệu của Tenant nếu không bị giới hạn trong Sandbox.

- **Khai báo tĩnh (Manifest)**: Khi cài đặt, Manifest sẽ hiển thị bảng quyền (Ví dụ: `READ_SUBMISSION`, `WRITE_RUBRIC`). Admin của Tenant phải nhấn "Đồng ý cấp quyền" thì Plugin mới được phép hoạt động.
- **Dependency Graph**: Plugin có thể bắt buộc hệ thống DIGVOS phải đạt một `minimumCoreVersion` nào đó, hoặc phụ thuộc (require) vào một Plugin khác (peerDependencies).

---

## 🔄 3. Quản Lý Vòng Đời Tenant Plugin (Tenant Plugin Lifecycle)

Khi một Trường đại học (Tenant) nhấn Cài đặt, một bản ghi `TenantPlugin` được tạo ra để lưu trạng thái cụ thể trên Tenant đó:

1. `INSTALLED`: Đã tải về và cài đặt thành công, ghi nhận `releaseId` cụ thể đang dùng.
2. `ENABLED`: Plugin đang chạy và có tác dụng thực tế (Active).
3. `DISABLED`: Admin tạm thời tắt Plugin này đi (Suspend).
4. `REMOVED`: Đã tháo gỡ hoàn toàn.

> **Khả năng Rollback**: Vì `TenantPlugin` lưu trữ `releaseId` thay vì chỉ lưu `version` string mỏng manh, khi bản `v2.0` bị lỗi, Admin có thể dễ dàng rollback về `releaseId` của bản `v1.9` chỉ bằng 1 thao tác đổi cờ trạng thái.

---

## 📡 4. Phát Sự Kiện Qua Event Bus (Event-Driven)

Bất kỳ thay đổi vòng đời nào đều kích hoạt Event:
- `plugin.release.created`
- `plugin.tenant.installed`
- `plugin.tenant.enabled`
- `plugin.tenant.removed`

Phân hệ AI Monitoring sẽ bắt (Listen) các event này và ghi trực tiếp vào `AIAuditLog` để đảm bảo trách nhiệm giải trình (Accountability) mỗi khi có Plugin bên thứ ba thao tác trên hệ thống.
