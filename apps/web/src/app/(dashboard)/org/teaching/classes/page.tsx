'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, Copy, Check, BookOpen, Layers, Trash2, X } from 'lucide-react';
import Link from 'next/link';

interface ClassItem {
  id: string;
  name: string;
  code: string;
  students: number;
  course: string;
  status: string;
}

export default function TeacherClassesPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [classList, setClassList] = useState<ClassItem[]>([
    { id: 'c_1', name: 'Lập trình Web Fullstack Architecture K2026', code: 'DIG-FULL-99', students: 42, course: 'Fullstack Web', status: 'Đang diễn ra' },
    { id: 'c_2', name: 'An toàn Thông tin & Mã hóa Polygon K2026', code: 'DIG-SEC-41', students: 38, course: 'An toàn số', status: 'Đang diễn ra' },
    { id: 'c_3', name: 'Sáng tạo Nội dung & AI Generative K2026', code: 'DIG-AI-12', students: 50, course: 'AI Generative', status: 'Sắp mở' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newCourse, setNewCourse] = useState('Fullstack Web');
  const [newStatus, setNewStatus] = useState('Đang diễn ra');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;

    const newC: ClassItem = {
      id: `c_${classList.length + 1}`,
      name: newName,
      code: newCode.toUpperCase(),
      students: 0,
      course: newCourse,
      status: newStatus
    };

    setClassList(prev => [...prev, newC]);
    setShowAddModal(false);
    setNewName('');
    setNewCode('');
  };

  const handleDeleteClass = (id: string) => {
    setClassList(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0f172a]" /> Quản Lý Lớp Học & Sĩ Số Học Viên
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý mã tham gia lớp học, danh sách sỉ số sinh viên & phân bổ đợt thi thích ứng CAT.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Lớp Học Mới</span>
          </button>
        </div>
      </div>

      {/* Main Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classList.map((cls) => (
          <div key={cls.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#0f172a] transition-all relative group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">
                  {cls.course}
                </span>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-mono font-bold border px-2 py-0.5 rounded ${
                    cls.status === 'Đang diễn ra'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {cls.status}
                  </span>
                  <button
                    onClick={() => handleDeleteClass(cls.id)}
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                    title="Xóa lớp học"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-sm text-[#0f172a] leading-snug">{cls.name}</h3>

              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs space-y-1 font-mono">
                <div className="flex justify-between text-[#64748b]">
                  <span>Mã lớp:</span>
                  <button
                    onClick={() => handleCopyCode(cls.code)}
                    className="font-bold text-[#0f172a] flex items-center gap-1 hover:underline"
                  >
                    {copiedCode === cls.code ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{cls.code}</span>
                  </button>
                </div>
                <div className="flex justify-between text-[#64748b]">
                  <span>Sĩ số:</span>
                  <span className="font-bold text-[#0f172a]">{cls.students} Sinh viên</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/org/analytics/skills"
                className="w-full py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all shadow-xs"
              >
                <span>Xem Phân Tích Năng Lực Lớp</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateClass} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Users className="w-5 h-5" /> Tạo lớp học mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên lớp học:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Lập trình Web Fullstack K2026..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Mã tham gia lớp:</label>
                  <input
                    required
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="Ví dụ: DIG-FULL-99..."
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Trạng thái:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Đang diễn ra</option>
                    <option>Sắp mở</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Khóa học giảng dạy liên kết:</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                >
                  <option>Fullstack Web</option>
                  <option>An toàn số</option>
                  <option>AI Generative</option>
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
                Tạo lớp học
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}