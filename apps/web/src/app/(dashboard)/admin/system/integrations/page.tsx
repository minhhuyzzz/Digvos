'use client';

import React, { useState } from 'react';
import { Server, CheckCircle2, Zap, Plus, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface IntegrationItem {
  id: string;
  name: string;
  type: string;
  status: string;
  endpoint: string;
}

export default function AdminIntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    { id: 'int_1', name: 'PostgreSQL Main Database', type: 'Database Engine', status: 'Connected (Latency 2ms)', endpoint: 'postgresql://db.digvos.internal:5432' },
    { id: 'int_2', name: 'Redis Cache Cluster', type: 'In-Memory Cache', status: 'Connected (Latency 1ms)', endpoint: 'redis://cache.digvos.internal:6379' },
    { id: 'int_3', name: 'Polygon Mainnet Smart Contract', type: 'Blockchain RPC', status: 'Connected (Block #482910)', endpoint: 'https://polygon-mainnet.infura.io/v3/rpc' },
    { id: 'int_4', name: 'OpenAI GPT-4o API', type: 'AI LLM Provider', status: 'Connected', endpoint: 'https://api.openai.com/v1/chat' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Database Engine');
  const [newEndpoint, setNewEndpoint] = useState('');
  const [newStatus, setNewStatus] = useState('Connected');

  const handleCreateIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEndpoint.trim()) return;

    const newI: IntegrationItem = {
      id: `int_${integrations.length + 1}`,
      name: newName,
      type: newType,
      status: newStatus,
      endpoint: newEndpoint
    };

    setIntegrations(prev => [...prev, newI]);
    setShowAddModal(false);
    setNewName('');
    setNewEndpoint('');
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(prev => prev.filter(i => i.id !== id));
  };

  const filteredIntegrations = integrations.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Server className="w-6 h-6 text-[#0f172a]" /> Quản Lý Tích Hợp Dịch Vụ Hạ Tầng (Integrations)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Giám sát trạng thái kết nối CSDL PostgreSQL, Redis Cache, Polygon Network & AI API Providers.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Kết Nối Tích Hợp</span>
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
            placeholder="Tìm kiếm dịch vụ hạ tầng..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Main Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filteredIntegrations.map((i) => (
          <div key={i.id} className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0f172a] text-sm">{i.name}</span>
                <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                  {i.status}
                </span>
              </div>
              <span className="text-[#64748b] text-[10px] uppercase font-bold block">{i.type}</span>
              <span className="font-mono text-[#64748b] text-[11px] block truncate bg-[#f8fafc] p-2 border border-[#e2e8f0] rounded-lg">{i.endpoint}</span>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#f1f5f9]">
              <button
                onClick={() => handleDeleteIntegration(i.id)}
                className="px-2.5 py-1.5 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-rose-600 font-bold rounded-lg transition-all flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Ngắt kết nối</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Integration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateIntegration} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Server className="w-5 h-5" /> Thêm kết nối hạ tầng mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên tích hợp:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Vercel Deploy Endpoint..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Loại hình dịch vụ:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Database Engine</option>
                    <option>In-Memory Cache</option>
                    <option>Blockchain RPC</option>
                    <option>AI LLM Provider</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Trạng thái:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Connected</option>
                    <option>Disconnected</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">URL Endpoint kết nối:</label>
                <input
                  required
                  type="text"
                  value={newEndpoint}
                  onChange={(e) => setNewEndpoint(e.target.value)}
                  placeholder="Ví dụ: https://api.vercel.com..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono focus:outline-none focus:border-[#0f172a]"
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
                Kết nối
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}