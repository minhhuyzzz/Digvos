'use client';

import React, { useState } from 'react';
import { Target, Layers, Plus, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface SubSkill {
  code: string;
  name: string;
  domain: string;
}

export default function AdminCompetenciesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [subSkills, setSubSkills] = useState<SubSkill[]>([
    { code: '1.1', name: 'Browsing, searching and filtering data', domain: 'Domain 1' },
    { code: '1.2', name: 'Evaluating data, information and digital content', domain: 'Domain 1' },
    { code: '3.4', name: 'AI Generative Integration & Prompt Engineering', domain: 'Domain 3' },
    { code: '4.2', name: 'Protecting personal data and privacy (ECDSA)', domain: 'Domain 4' },
  ]);

  // Form states
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newDomain, setNewDomain] = useState('Domain 1');

  const handleCreateSubSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newName.trim()) return;

    const newS: SubSkill = {
      code: newCode,
      name: newName,
      domain: newDomain
    };

    setSubSkills(prev => [...prev, newS]);
    setShowAddModal(false);
    setNewCode('');
    setNewName('');
  };

  const handleDeleteSubSkill = (code: string) => {
    setSubSkills(prev => prev.filter(s => s.code !== code));
  };

  const filteredSubSkills = subSkills.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#0f172a]" /> Danh Mục 21 Kỹ Năng Thành Phần DigComp 3.0
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Danh mục chi tiết 21 kỹ năng số thành phần thuộc 5 Vùng năng lực cốt lõi.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Sub-Skill Mới</span>
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
            placeholder="Tìm kiếm kỹ năng thành phần..."
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
                <th className="p-3">Mã Sub-Skill</th>
                <th className="p-3">Tên Kỹ Năng Thành Phần</th>
                <th className="p-3">Thuộc Vùng Năng Lực</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredSubSkills.map((s, idx) => (
                <tr key={idx} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{s.code}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{s.name}</td>
                  <td className="p-3 text-[#64748b] font-mono font-bold">{s.domain}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteSubSkill(s.code)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa kỹ năng"
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

      {/* Create SubSkill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateSubSkill} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Layers className="w-5 h-5" /> Thêm kỹ năng thành phần mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Mã Sub-Skill:</label>
                  <input
                    required
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="Ví dụ: 4.3..."
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono focus:outline-none focus:border-[#0f172a]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Thuộc Vùng Năng Lực:</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs"
                  >
                    <option>Domain 1</option>
                    <option>Domain 2</option>
                    <option>Domain 3</option>
                    <option>Domain 4</option>
                    <option>Domain 5</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên kỹ năng thành phần:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Bảo vệ sức khỏe và an sinh xã hội..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
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
                Thêm kỹ năng
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}