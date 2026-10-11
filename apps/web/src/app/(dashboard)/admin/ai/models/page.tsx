'use client';

import React, { useState } from 'react';
import { Cpu, Plus, Sparkles, Key, CheckCircle2, Clock, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface AIModel {
  id: string;
  name: string;
  provider: string;
  latency: string;
  usageCost: string;
  status: string;
  keyVault: string;
}

export default function AdminAIModelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [models, setModels] = useState<AIModel[]>([
    { id: 'mdl_1', name: 'OpenAI GPT-4o', provider: 'OpenAI', latency: '420ms', usageCost: '$0.005 / 1K tokens', status: 'Active Primary', keyVault: 'vault_sk_live_...92a' },
    { id: 'mdl_2', name: 'Anthropic Claude 3.5 Sonnet', provider: 'Anthropic', latency: '380ms', usageCost: '$0.003 / 1K tokens', status: 'Active Secondary', keyVault: 'vault_sk_ant_...41f' },
    { id: 'mdl_3', name: 'Google Gemini 1.5 Pro', provider: 'Google AI', latency: '310ms', usageCost: '$0.0025 / 1K tokens', status: 'Active Fallback', keyVault: 'vault_AIzaSy...09x' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newProvider, setNewProvider] = useState('OpenAI');
  const [newLatency, setNewLatency] = useState('350ms');
  const [newCost, setNewCost] = useState('$0.002 / 1K tokens');
  const [newStatus, setNewStatus] = useState('Active Primary');

  const handleRegisterModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newM: AIModel = {
      id: `mdl_${models.length + 1}`,
      name: newName,
      provider: newProvider,
      latency: newLatency,
      usageCost: newCost,
      status: newStatus,
      keyVault: 'vault_sk_added_...99x'
    };

    setModels(prev => [...prev, newM]);
    setShowAddModal(false);
    setNewName('');
  };

  const handleDeleteModel = (id: string) => {
    setModels(prev => prev.filter(m => m.id !== id));
  };

  const filteredModels = models.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#0f172a]" /> AI Models Registry Vault & Quản Lý API Keys
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý các mô hình LLM chính (GPT-4o, Claude 3.5, Gemini 1.5), Latency đo lường & Vault khóa bí mật.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Model AI Mới</span>
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
            placeholder="Tìm kiếm mô hình AI..."
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
                <th className="p-3">Mã Model</th>
                <th className="p-3">Tên mô hình AI</th>
                <th className="p-3">Nhà cung cấp</th>
                <th className="p-3">Độ trễ (Latency)</th>
                <th className="p-3">Chi phí Token</th>
                <th className="p-3">Trạng thái Router</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredModels.map((m) => (
                <tr key={m.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{m.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{m.name}</td>
                  <td className="p-3 text-[#64748b]">{m.provider}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{m.latency}</td>
                  <td className="p-3 font-mono text-[#64748b]">{m.usageCost}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      m.status.includes('Primary')
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : m.status.includes('Secondary')
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteModel(m.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa mô hình"
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

      {/* Create Model Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleRegisterModel} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Cpu className="w-5 h-5" /> Đăng ký Model AI mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên mô hình AI:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: DeepSeek Coder 67B..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Nhà cung cấp:</label>
                  <select
                    value={newProvider}
                    onChange={(e) => setNewProvider(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>OpenAI</option>
                    <option>Anthropic</option>
                    <option>Google AI</option>
                    <option>Meta</option>
                    <option>DeepSeek</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Độ trễ (Latency):</label>
                  <input
                    type="text"
                    value={newLatency}
                    onChange={(e) => setNewLatency(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Chi phí Token:</label>
                  <input
                    type="text"
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Trạng thái Router:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Active Primary</option>
                    <option>Active Secondary</option>
                    <option>Active Fallback</option>
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
                Đăng ký Model
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}