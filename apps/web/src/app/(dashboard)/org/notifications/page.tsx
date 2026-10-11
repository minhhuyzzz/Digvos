'use client';

import React, { useState } from 'react';
import { Bell, ArrowLeft, ShieldCheck, Clock, Sparkles, Check, Trash2, Filter } from 'lucide-react';
import Link from 'next/link';

type OrgNotifFilterType = 'all' | 'review' | 'blockchain' | 'credits';

export default function OrgNotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<OrgNotifFilterType>('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'review', title: 'Có 05 minh chứng mới đang chờ Giảng viên phê duyệt!', time: '15 phút trước', read: false, desc: 'Học viên Trần Minh Huy và 4 học viên khác vừa nộp bài báo cáo đồ án REST API NestJS.' },
    { id: 2, type: 'blockchain', title: 'Giao dịch đúc 12 SBT Token lên Polygon Mainnet đã hoàn thành!', time: '2 giờ trước', read: true, desc: 'Tất cả 12 giao dịch đúc chứng chỉ số SBT đã được thợ đào xác thực thành công trên mạng Polygon.' },
    { id: 3, type: 'credits', title: 'Số dư Credits AI chạm ngưỡng tối thiểu', time: '1 ngày trước', read: false, desc: 'Số dư tài khoản credits AI của bạn chỉ còn 1,200 credits. Hãy nạp thêm để tránh gián đoạn match JD ứng viên.' }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotif = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifs = notifications.filter(n => activeFilter === 'all' || n.type === activeFilter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#0f172a]" /> Trung Tâm Thông Báo Quản Trị Đào Tạo
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Thông báo lịch thi CAT, trạng thái duyệt đồ án & phát hành chứng chỉ SBT Polygon.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-2xs"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Đánh dấu tất cả là đã đọc</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs Controls */}
      <div className="flex space-x-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 font-bold rounded-lg border transition-all shrink-0 ${
            activeFilter === 'all'
              ? 'bg-[#0f172a] text-white border-[#0f172a]'
              : 'bg-white text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setActiveFilter('review')}
          className={`px-3.5 py-1.5 font-bold rounded-lg border transition-all shrink-0 ${
            activeFilter === 'review'
              ? 'bg-[#0f172a] text-white border-[#0f172a]'
              : 'bg-white text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
          }`}
        >
          Duyệt bài nộp
        </button>
        <button
          onClick={() => setActiveFilter('blockchain')}
          className={`px-3.5 py-1.5 font-bold rounded-lg border transition-all shrink-0 ${
            activeFilter === 'blockchain'
              ? 'bg-[#0f172a] text-white border-[#0f172a]'
              : 'bg-white text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
          }`}
        >
          Polygon Blockchain
        </button>
        <button
          onClick={() => setActiveFilter('credits')}
          className={`px-3.5 py-1.5 font-bold rounded-lg border transition-all shrink-0 ${
            activeFilter === 'credits'
              ? 'bg-[#0f172a] text-white border-[#0f172a]'
              : 'bg-white text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
          }`}
        >
          AI Credits
        </button>
      </div>

      {/* Main Notifications List Area */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Thông báo của tổ chức</h3>
          <span className="font-mono text-[#64748b]">Tổng số: {filteredNotifs.length} thông báo</span>
        </div>

        <div className="space-y-3 text-xs">
          {filteredNotifs.length === 0 ? (
            <p className="text-center text-[#64748b] py-8">Không có thông báo nào thuộc bộ lọc này.</p>
          ) : (
            filteredNotifs.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl border transition-all space-y-2 relative group ${
                  !n.read
                    ? 'bg-[#f8fafc] border-[#0f172a] shadow-2xs'
                    : 'bg-white border-[#e2e8f0] opacity-80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {n.type === 'blockchain' ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    ) : n.type === 'review' ? (
                      <Clock className="w-4 h-4 text-[#0f172a]" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    )}
                    <h4 className="font-bold text-xs text-[#0f172a]">{n.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] text-[#64748b]">{n.time}</span>
                    <button
                      onClick={() => handleDeleteNotif(n.id)}
                      className="text-[#64748b] hover:text-[#0f172a] opacity-0 group-hover:opacity-100 transition-all"
                      title="Xóa thông báo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#64748b] leading-relaxed pl-6">{n.desc}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
