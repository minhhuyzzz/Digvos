'use client';

import React, { useState } from 'react';
import { ShieldCheck, Clock, AlertTriangle, User, Trash2, Search, Filter } from 'lucide-react';
import Link from 'next/link';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ip: string;
  status: string;
}

export default function AdminAuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<AuditLog[]>([
    { id: 'aud_901', timestamp: '28/07/2026 15:10:05', user: 'Super Admin (admin@digvos.vn)', action: 'Thêm đợt thi CAT IRT mới', ip: '118.69.182.41', status: 'Success' },
    { id: 'aud_902', timestamp: '28/07/2026 14:45:12', user: 'ThS. Nguyễn Văn A', action: 'Duyệt đúc SBT Polygon #8942', ip: '14.241.220.15', status: 'Success' },
    { id: 'aud_903', timestamp: '28/07/2026 14:40:00', user: 'Hệ thống (Cron Job)', action: 'Đồng bộ điểm thi lên Blockchain', ip: '127.0.0.1', status: 'Success' },
  ]);

  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const filteredLogs = logs.filter(l => 
    l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.ip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0f172a]" /> Nhật Ký Bảo Mật & Audit Trail Toàn Hệ Thống
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Ghi nhận lịch sử thao tác quản trị, truy cập dữ liệu & phát hiện hành vi bất thường.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={handleClearLogs}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Trash2 className="w-4 h-4" />
            <span>Xóa Sạch Nhật Ký</span>
          </button>
        </div>
      </div>

      {/* Security Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-800">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold">Cảnh báo bảo mật hệ thống (Hành vi đáng ngờ)</h4>
          <p className="text-amber-700">Phát hiện 3 lượt đăng nhập sai password liên tiếp từ IP lạ <strong className="font-mono">198.51.100.42</strong> vào tài khoản <strong className="font-mono">admin@digvos.vn</strong> lúc 15:05:12. Hệ thống đã tạm khóa IP này trong 30 phút.</p>
        </div>
      </div>

      {/* Filter and Search toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo người dùng, hành động, IP..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Mã Audit</th>
                <th className="p-3">Thời gian</th>
                <th className="p-3">Người thực hiện</th>
                <th className="p-3">Hành động</th>
                <th className="p-3">Địa chỉ IP</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{l.id}</td>
                  <td className="p-3 text-[#64748b] font-mono">{l.timestamp}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{l.user}</td>
                  <td className="p-3 text-[#64748b]">{l.action}</td>
                  <td className="p-3 font-mono text-[#64748b]">{l.ip}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                      {l.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteLog(l.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}