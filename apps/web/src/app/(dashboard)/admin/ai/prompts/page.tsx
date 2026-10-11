'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, Edit, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface PromptItem {
  id: string;
  title: string;
  module: string;
  model: string;
  version: string;
}

export default function AdminAIPromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [prompts, setPrompts] = useState<PromptItem[]>([
    { id: 'prm_cat', title: 'System Prompt Thi Thích Ứng CAT IRT', module: 'CAT Engine', model: 'GPT-4o', version: 'v3.2' },
    { id: 'prm_eval', title: 'System Prompt Chấm Điểm AI Pre-Grading Rubrics', module: 'Portfolio Evaluator', model: 'GPT-4o', version: 'v2.1' },
    { id: 'prm_coach', title: 'System Prompt Trợ Lý AI Coach Gia Sư 24/7', module: 'AI Coach Chat', model: 'Claude 3.5 Sonnet', version: 'v4.0' },
  ]);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newModule, setNewModule] = useState('CAT Engine');
  const [newModel, setNewModel] = useState('GPT-4o');
  const [newVersion, setNewVersion] = useState('v1.0');

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newP: PromptItem = {
      id: `prm_${prompts.length + 1}`,
      title: newTitle,
      module: newModule,
      model: newModel,
      version: newVersion
    };

    setPrompts(prev => [...prev, newP]);
    setShowAddModal(false);
    setNewTitle('');
  };

  const handleDeletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  const filteredPrompts = prompts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#0f172a]" /> Quản Lý Mẫu Lệnh AI System Prompts Master
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình các mẫu câu lệnh hệ thống dành cho bộ máy khảo thí CAT & AI Evaluator.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Prompt Mới</span>
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
            placeholder="Tìm kiếm mẫu lệnh System Prompt..."
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
                <th className="p-3">Mã Prompt</th>
                <th className="p-3">Tên mẫu lệnh System Prompt</th>
                <th className="p-3">Phân hệ Module</th>
                <th className="p-3">Mô hình AI gán</th>
                <th className="p-3">Phiên bản</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredPrompts.map((p) => (
                <tr key={p.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{p.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{p.title}</td>
                  <td className="p-3 text-[#64748b]">{p.module}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{p.model}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{p.version}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeletePrompt(p.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa Prompt"
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

      {/* Create Prompt Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreatePrompt} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Sparkles className="w-5 h-5" /> Thêm Prompt mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên mẫu lệnh System Prompt:</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: System Prompt Sinh Đồ Án..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Phân hệ Module:</label>
                  <select
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>CAT Engine</option>
                    <option>Portfolio Evaluator</option>
                    <option>AI Coach Chat</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Mô hình AI gán:</label>
                  <select
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>GPT-4o</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Gemini 1.5 Pro</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Phiên bản:</label>
                <input
                  required
                  type="text"
                  value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  placeholder="Ví dụ: v1.0..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
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
                Thêm Prompt
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}