'use client';

import React, { useState } from 'react';
import { Archive, ArrowLeft, Search, Eye, Check, X, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface QueueItem {
  id: string;
  studentName: string;
  orgName: string;
  projectName: string;
  domain: string;
  aiScore: string;
  date: string;
  status: string;
}

export default function AdminQueuePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: 'q_1', studentName: 'Trần Minh Huy', orgName: 'ĐH Bách Khoa TP.HCM', projectName: 'Hệ thống thi thích ứng CAT tích hợp Blockchain', domain: 'Domain 4 & 5', aiScore: '92/100', date: '28/07/2026', status: 'Chờ duyệt' },
    { id: 'q_2', studentName: 'Lê Thu Thảo', orgName: 'ĐH Bách Khoa TP.HCM', projectName: 'Trình quản lý tệp tin phân tán IPFS', domain: 'Domain 1 & 3', aiScore: '85/100', date: '27/07/2026', status: 'Chờ duyệt' },
  ]);

  const handleApprove = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setQueue(prev => prev.filter(item => item.id !== selectedItem.id));
    setShowRejectModal(false);
    setSelectedItem(null);
    setRejectReason('');
  };

  const filteredQueue = queue.filter(item => 
    item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.orgName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Hàng Chờ Duyệt Minh Chứng Master Hệ Thống</h1>
          <p className="text-xs text-[#64748b] mt-1">Tổng hợp hàng chờ duyệt minh chứng đồ án từ tất cả các đơn vị trường học.</p>
        </div>
        <Link href="/admin" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Về Control Room</span>
        </Link>
      </div>

      {/* Filter and Search toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên học viên, trường, đồ án..."
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
                <th className="p-3">Học viên</th>
                <th className="p-3">Trường/Đơn vị</th>
                <th className="p-3">Đồ án / Minh chứng</th>
                <th className="p-3">Vùng DigComp</th>
                <th className="p-3">Điểm AI tự chấm</th>
                <th className="p-3">Ngày nộp</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredQueue.map((item) => (
                <tr key={item.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{item.studentName}</td>
                  <td className="p-3 text-[#64748b]">{item.orgName}</td>
                  <td className="p-3 font-bold text-[#0f172a] max-w-xs truncate">{item.projectName}</td>
                  <td className="p-3 font-mono text-[#64748b]">{item.domain}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{item.aiScore}</td>
                  <td className="p-3 font-mono text-[#64748b]">{item.date}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded hover:bg-emerald-100 font-bold transition-all"
                    >
                      Duyệt
                    </button>
                    <button
                      onClick={() => { setSelectedItem(item); setShowRejectModal(true); }}
                      className="px-2 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded hover:bg-rose-100 font-bold transition-all"
                    >
                      Từ chối
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedItem && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleRejectSubmit} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <ShieldAlert className="w-5 h-5 text-rose-600" /> Từ chối duyệt minh chứng
              </h3>
              <button type="button" onClick={() => setShowRejectModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-[#64748b]">Lý do từ chối đồ án <strong className="text-[#0f172a]">{selectedItem.projectName}</strong> của học viên <strong className="text-[#0f172a]">{selectedItem.studentName}</strong>:</p>
              <textarea
                required
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối cụ thể..."
                className="w-full h-20 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] font-bold rounded-lg"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg"
              >
                Xác nhận từ chối
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}