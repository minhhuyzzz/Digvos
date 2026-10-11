'use client';

import React, { useState } from 'react';
import { Sparkles, Clock, AlertCircle, Trash2, Search, BarChart2 } from 'lucide-react';
import Link from 'next/link';

interface AILog {
  id: string;
  timestamp: string;
  model: string;
  tokensUsed: number;
  latency: string;
  status: string;
  module: string;
}

export default function AdminAILogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiLogs, setAiLogs] = useState<AILog[]>([
    { id: 'log_901', timestamp: '28/07/2026 14:32:10', model: 'GPT-4o', tokensUsed: 1420, latency: '410ms', status: '200 OK', module: 'AI Pre-Grading' },
    { id: 'log_902', timestamp: '28/07/2026 14:30:05', model: 'Claude 3.5 Sonnet', tokensUsed: 850, latency: '360ms', status: '200 OK', module: 'AI Coach Chat' },
    { id: 'log_903', timestamp: '28/07/2026 14:28:15', model: 'Gemini 1.5 Pro', tokensUsed: 620, latency: '310ms', status: '200 OK', module: 'CAT Engine' },
  ]);

  const handleDeleteLog = (id: string) => {
    setAiLogs(prev => prev.filter(l => l.id !== id));
  };

  const handleClearAllLogs = () => {
    setAiLogs([]);
  };

  const filteredLogs = aiLogs.filter(l => 
    l.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#0f172a]" /> Nhật Ký Gọi AI API Logs & Tiêu Thụ Token
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Giám sát lượng Token sử dụng, độ trễ phản hồi (Latency) & nhật ký gọi API LLM.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={handleClearAllLogs}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Trash2 className="w-4 h-4" />
            <span>Xóa Toàn Bộ Logs</span>
          </button>
        </div>
      </div>

      {/* Token Usage SVG Chart */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5"><BarChart2 className="w-4 h-4" /> Thống kê Token tiêu thụ theo giờ gần đây</h3>
        <div className="w-full h-24 flex items-end justify-between pt-4 border-b border-[#cbd5e1] px-4 font-mono text-[10px] text-[#64748b]">
          {/* Cột 1 */}
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">4.2K</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '35px' }}></div>
            <span>10:00</span>
          </div>
          {/* Cột 2 */}
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">6.8K</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '55px' }}></div>
            <span>11:00</span>
          </div>
          {/* Cột 3 */}
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">8.2K</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '70px' }}></div>
            <span>12:00</span>
          </div>
          {/* Cột 4 */}
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">5.1K</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '42px' }}></div>
            <span>13:00</span>
          </div>
          {/* Cột 5 */}
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">9.5K</span>
            <div className="w-8 bg-emerald-600 rounded-t-sm animate-pulse" style={{ height: '80px' }}></div>
            <span>14:00</span>
          </div>
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
            placeholder="Tìm kiếm log theo model, module, ID..."
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
                <th className="p-3">Mã Request</th>
                <th className="p-3">Thời gian</th>
                <th className="p-3">Phân hệ Module</th>
                <th className="p-3">Mô hình AI</th>
                <th className="p-3">Số Token tiêu thụ</th>
                <th className="p-3">Độ trễ</th>
                <th className="p-3">Trạng thái API</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{l.id}</td>
                  <td className="p-3 text-[#64748b] font-mono">{l.timestamp}</td>
                  <td className="p-3 text-[#64748b]">{l.module}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{l.model}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{l.tokensUsed} Tokens</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold">{l.latency}</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold">{l.status}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteLog(l.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa log"
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
    </div>
  );
}