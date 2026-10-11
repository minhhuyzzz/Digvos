'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, CheckCircle2, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface RubricItem {
  id: string;
  name: string;
  weight: string;
  status: string;
}

export default function AdminRubricsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [rubricsRules, setRubricsRules] = useState<RubricItem[]>([
    { id: 'rub_1', name: 'Chuẩn RESTful API & OpenAPI 3.1', weight: '25%', status: 'Active' },
    { id: 'rub_2', name: 'Tối ưu hóa CSDL PostgreSQL & Indexing 3NF', weight: '25%', status: 'Active' },
    { id: 'rub_3', name: 'Mã hóa ECDSA Polygon & Chữ ký số', weight: '25%', status: 'Active' },
    { id: 'rub_4', name: 'Clean Architecture & Unit Test Coverage', weight: '25%', status: 'Active' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newWeight, setNewWeight] = useState('20');
  const [newStatus, setNewStatus] = useState('Active');

  const handleCreateRubric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newR: RubricItem = {
      id: `rub_${rubricsRules.length + 1}`,
      name: newName,
      weight: `${newWeight}%`,
      status: newStatus
    };

    setRubricsRules(prev => [...prev, newR]);
    setShowAddModal(false);
    setNewName('');
  };

  const handleDeleteRubric = (id: string) => {
    setRubricsRules(prev => prev.filter(r => r.id !== id));
  };

  const filteredRubrics = rubricsRules.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#0f172a]" /> Cấu Hình Tiêu Chí Rubrics Chấm Điểm AI Master
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Định nghĩa ma trận trọng số & quy tắc đánh giá tự động cho bộ máy AI Evaluator.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Rubric Rule Mới</span>
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
            placeholder="Tìm kiếm rubric chấm điểm..."
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
                <th className="p-3">Mã Rubric</th>
                <th className="p-3">Tên tiêu chí đánh giá AI</th>
                <th className="p-3">Trọng số (%)</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredRubrics.map((r) => (
                <tr key={r.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{r.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{r.name}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{r.weight}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      r.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteRubric(r.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa rubric"
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

      {/* Create Rubric Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateRubric} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Sparkles className="w-5 h-5" /> Thêm tiêu chí đánh giá AI mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên tiêu chí đánh giá AI:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Tích hợp RAG Engine và Vector DB..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Trọng số (%):</label>
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Trạng thái:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
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
                Thêm tiêu chí
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}