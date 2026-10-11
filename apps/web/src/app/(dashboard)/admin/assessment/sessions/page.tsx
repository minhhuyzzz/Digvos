'use client';

import React, { useState } from 'react';
import { History, ArrowLeft, Plus, Search, Cpu, Users, Layers, Activity, Trash2, X } from 'lucide-react';
import Link from 'next/link';

interface SessionItem {
  id: string;
  orgName: string;
  examName: string;
  onlineCount: number;
  status: string;
  date: string;
}

export default function AdminSessionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sessions, setSessions] = useState<SessionItem[]>([
    { id: 'ses_101', orgName: 'Đại Học Bách Khoa TP.HCM', examName: 'Khảo thí năng lực số DigComp K2026', onlineCount: 42, status: 'Live', date: '28/07/2026' },
    { id: 'ses_102', orgName: 'FPT Software', examName: 'Kiểm định đầu vào lập trình viên', onlineCount: 18, status: 'Live', date: '28/07/2026' },
    { id: 'ses_103', orgName: 'Trường THPT Chuyên Lê Hồng Phong', examName: 'Đánh giá kỹ năng số cơ bản', onlineCount: 0, status: 'Finished', date: '27/07/2026' }
  ]);

  // Form states
  const [newOrg, setNewOrg] = useState('Đại Học Bách Khoa TP.HCM');
  const [newExam, setNewExam] = useState('');
  const [newStatus, setNewStatus] = useState('Live');

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExam.trim()) return;

    const newS: SessionItem = {
      id: `ses_${sessions.length + 101}`,
      orgName: newOrg,
      examName: newExam,
      onlineCount: 0,
      status: newStatus,
      date: '28/07/2026'
    };

    setSessions(prev => [newS, ...prev]);
    setShowAddModal(false);
    setNewExam('');
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const filteredSessions = sessions.filter(s => 
    s.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.orgName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#0f172a]" /> Giám Sát Phiên Kiểm Tra Toàn Hệ Thống
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Giám sát các đợt thi CAT thích ứng đang diễn ra trên toàn bộ các đơn vị trường học & doanh nghiệp.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Mở Đợt Thi Mới</span>
          </button>
        </div>
      </div>

      {/* Realtime Engine Metrics Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[10px] uppercase font-bold block">Tổng thí sinh Live</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block">60 Học viên</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[10px] uppercase font-bold block">IRT Scoring Engine CPU</span>
          <span className="text-2xl font-extrabold text-emerald-600 block">12.4% Load</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[10px] uppercase font-bold block">Đợt thi đang mở</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block">2 Đợt thi Live</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[10px] uppercase font-bold block">Tổng phản hồi CAT/giây</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block">2.4 req/s</span>
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
            placeholder="Tìm kiếm theo tên kỳ thi, trường học..."
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
                <th className="p-3">Mã đợt</th>
                <th className="p-3">Đơn vị đào tạo</th>
                <th className="p-3">Tên kỳ thi khảo thí</th>
                <th className="p-3">Thí sinh thi Live</th>
                <th className="p-3">Ngày bắt đầu</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredSessions.map((s) => (
                <tr key={s.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{s.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{s.orgName}</td>
                  <td className="p-3 text-[#64748b]">{s.examName}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{s.onlineCount} Online</td>
                  <td className="p-3 font-mono text-[#64748b]">{s.date}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      s.status === 'Live'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteSession(s.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Hủy đợt thi"
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

      {/* Create Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateSession} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Activity className="w-5 h-5" /> Mở đợt thi khảo thí mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tổ chức/Trường học liên kết:</label>
                <select
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                >
                  <option>Đại Học Bách Khoa TP.HCM</option>
                  <option>FPT Software</option>
                  <option>Trường THPT Chuyên Lê Hồng Phong</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên kỳ thi:</label>
                <input
                  required
                  type="text"
                  value={newExam}
                  onChange={(e) => setNewExam(e.target.value)}
                  placeholder="Ví dụ: Thi sát hạch kỹ năng số hè 2026..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Trạng thái ban đầu:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                >
                  <option>Live</option>
                  <option>Scheduled</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] font-bold rounded-lg"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg"
              >
                Mở đợt thi
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}