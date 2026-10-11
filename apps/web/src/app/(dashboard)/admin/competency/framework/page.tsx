'use client';

import React, { useState } from 'react';
import { Target, Layers, Plus, Edit, ShieldCheck, Sparkles, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface DomainItem {
  id: string;
  code: string;
  name: string;
  subCount: number;
  levels: string;
}

export default function AdminFrameworkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [digcompDomains, setDigcompDomains] = useState<DomainItem[]>([
    { id: 'dom_1', code: 'Domain 1', name: 'Information & Data Literacy (Vận hành Dữ liệu & Thông tin)', subCount: 3, levels: '8 Cấp độ (Foundation - Highly Specialized)' },
    { id: 'dom_2', code: 'Domain 2', name: 'Communication & Collaboration (Giao tiếp & Cộng tác số)', subCount: 6, levels: '8 Cấp độ (Foundation - Highly Specialized)' },
    { id: 'dom_3', code: 'Domain 3', name: 'Digital Content Creation (Sáng tạo Nội dung số)', subCount: 4, levels: '8 Cấp độ (Foundation - Highly Specialized)' },
    { id: 'dom_4', code: 'Domain 4', name: 'Safety & Security (An toàn & Bảo mật số)', subCount: 4, levels: '8 Cấp độ (Foundation - Highly Specialized)' },
    { id: 'dom_5', code: 'Domain 5', name: 'Problem Solving (Giải quyết Vấn đề Kỹ thuật)', subCount: 4, levels: '8 Cấp độ (Foundation - Highly Specialized)' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('Domain 6');
  const [newSubCount, setNewSubCount] = useState(3);
  const [newLevels, setNewLevels] = useState('8 Cấp độ (Foundation - Highly Specialized)');

  const handleCreateDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newD: DomainItem = {
      id: `dom_${digcompDomains.length + 1}`,
      code: newCode,
      name: newName,
      subCount: Number(newSubCount),
      levels: newLevels
    };

    setDigcompDomains(prev => [...prev, newD]);
    setShowAddModal(false);
    setNewName('');
  };

  const handleDeleteDomain = (id: string) => {
    setDigcompDomains(prev => prev.filter(d => d.id !== id));
  };

  const filteredDomains = digcompDomains.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Target className="w-6 h-6 text-[#0f172a]" /> Quản Trị Khung Năng Lực Chuẩn Châu Âu DigComp 3.0
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình 5 Vùng năng lực cốt lõi, 21 Kỹ năng thành phần & 8 Cấp độ thành thạo.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Vùng Năng Lực Mới</span>
          </button>
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
            placeholder="Tìm kiếm vùng năng lực..."
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
                <th className="p-3">Mã Vùng</th>
                <th className="p-3">Tên Vùng Năng Lực DigComp 3.0</th>
                <th className="p-3">Số kỹ năng thành phần</th>
                <th className="p-3">Thang Cấp Độ</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredDomains.map((d) => (
                <tr key={d.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{d.code}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{d.name}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{d.subCount} Sub-skills</td>
                  <td className="p-3 text-[#64748b] font-mono">{d.levels}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteDomain(d.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa vùng năng lực"
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

      {/* Create Domain Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateDomain} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Target className="w-5 h-5" /> Thêm vùng năng lực mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Mã code:</label>
                <input
                  required
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Ví dụ: Domain 6..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên vùng năng lực:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: AI Literacy & Prompt Engineering..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Số kỹ năng thành phần:</label>
                  <input
                    type="number"
                    value={newSubCount}
                    onChange={(e) => setNewSubCount(Number(e.target.value))}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Thang cấp độ:</label>
                  <input
                    type="text"
                    value={newLevels}
                    onChange={(e) => setNewLevels(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  />
                </div>
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
                Thêm vùng
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}