'use client';

import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, X, Search, Activity, Users } from 'lucide-react';
import Link from 'next/link';

interface Session {
  id: string;
  name: string;
  class: string;
  active: boolean;
  takers: number;
  date: string;
}

export default function TeacherCATSessionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([
    { id: 'sess_1', name: 'Đợt Kiểm Tra Thích Ứng Định Kỳ Tháng 7/2026', class: 'Lớp Lập Trình K65-WEB01', active: true, takers: 42, date: '28/07/2026' },
    { id: 'sess_2', name: 'Đợt Thi Sàng Lọc Năng Lực Bảo Mật Số', class: 'Lớp An Ninh Số K65-SEC02', active: false, takers: 38, date: '25/07/2026' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newClass, setNewClass] = useState('Lớp Lập Trình K65-WEB01');
  const [newStatus, setNewStatus] = useState('Live');

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newS: Session = {
      id: `sess_${sessions.length + 1}`,
      name: newName,
      class: newClass,
      active: newStatus === 'Live',
      takers: 0,
      date: '28/07/2026'
    };

    setSessions(prev => [newS, ...prev]);
    setShowAddModal(false);
    setNewName('');
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const filteredSessions = sessions.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Tổ Chức Kỳ Thi Thích Ứng CAT (Live Monitoring)</h1>
          <p className="text-xs text-[#64748b] mt-1">Mở đợt thi thích ứng CAT theo lớp học và giám sát tiến trình thi của học viên.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Mở đợt thi CAT mới</span>
        </button>
      </div>

      {/* Filter and Search toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm đợt thi theo tên hoặc lớp..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSessions.map((s) => (
          <div key={s.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">{s.class}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  s.active
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}>
                  {s.active ? 'Đang diễn ra Live' : 'Đã kết thúc'}
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">{s.name}</h3>
              <div className="flex justify-between items-center text-xs text-[#64748b] pt-1">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Thí sinh tham gia: <strong>{s.takers}</strong></span>
                <span>Ngày tạo: {s.date}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#f1f5f9] mt-2">
              <button
                onClick={() => handleDeleteSession(s.id)}
                className="p-1.5 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded text-rose-600 transition-all"
                title="Hủy đợt thi"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
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
                <label className="font-bold text-[#334155] block">Lớp học gán kỳ thi:</label>
                <select
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a]"
                >
                  <option>Lớp Lập Trình K65-WEB01</option>
                  <option>Lớp An Ninh Số K65-SEC02</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên đợt kiểm tra:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Thi cuối kỳ môn Lập trình Web..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Trạng thái ban đầu:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a]"
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