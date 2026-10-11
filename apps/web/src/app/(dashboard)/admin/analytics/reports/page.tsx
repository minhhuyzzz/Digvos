'use client';

import React, { useState } from 'react';
import { FileText, ArrowLeft, Download, Plus, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface ReportItem {
  id: string;
  name: string;
  module: string;
  frequency: string;
  author: string;
  date: string;
}

export default function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [reports, setReports] = useState<ReportItem[]>([
    { id: 'rep_101', name: 'Báo cáo tổng hợp số liệu khảo thí CAT Q2/2026', module: 'Khảo thí CAT', frequency: 'Hàng quý', author: 'Super Admin', date: '28/07/2026' },
    { id: 'rep_102', name: 'Báo cáo tổng số lượng đúc SBT Token và phí Gas', module: 'Blockchain SBT', frequency: 'Hàng tháng', author: 'Hệ thống (Tự động)', date: '15/07/2026' },
    { id: 'rep_103', name: 'Thống kê tỷ lệ tuyển dụng khớp chỉ số JD tuyển dụng', module: 'Tuyển dụng HR', frequency: 'Hàng tuần', author: 'AI Engine Analyst', date: '10/07/2026' }
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newModule, setNewModule] = useState('Khảo thí CAT');
  const [newFreq, setNewFreq] = useState('Hàng tháng');

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newR: ReportItem = {
      id: `rep_${reports.length + 101}`,
      name: newName,
      module: newModule,
      frequency: newFreq,
      author: 'Super Admin',
      date: '28/07/2026'
    };

    setReports(prev => [newR, ...prev]);
    setShowAddModal(false);
    setNewName('');
  };

  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const filteredReports = reports.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Báo Cáo Tổng Hợp Hệ Thống Digvos Platform</h1>
          <p className="text-xs text-[#64748b] mt-1">Báo cáo tổng hợp số liệu khảo thí CAT, số lượng đúc SBT Token và tỷ lệ tuyển dụng khớp JD.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Báo Cáo Mới</span>
          </button>
          <Link href="/admin" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Về Control Room</span>
          </Link>
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
            placeholder="Tìm kiếm báo cáo..."
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
                <th className="p-3">Mã báo cáo</th>
                <th className="p-3">Tên tài liệu báo cáo</th>
                <th className="p-3">Thuộc phân hệ</th>
                <th className="p-3">Tần suất tạo</th>
                <th className="p-3">Người tạo</th>
                <th className="p-3">Ngày tạo</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredReports.map((r) => (
                <tr key={r.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{r.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{r.name}</td>
                  <td className="p-3 text-[#64748b]">{r.module}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{r.frequency}</td>
                  <td className="p-3 text-[#64748b]">{r.author}</td>
                  <td className="p-3 font-mono text-[#64748b]">{r.date}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-[#0f172a]"
                      title="Xuất file báo cáo"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteReport(r.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa báo cáo"
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

      {/* Create Report Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateReport} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <FileText className="w-5 h-5" /> Tạo báo cáo mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên báo cáo:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Báo cáo phân tích JD và năng lực Q3..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Thuộc phân hệ:</label>
                  <select
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs"
                  >
                    <option>Khảo thí CAT</option>
                    <option>Blockchain SBT</option>
                    <option>Tuyển dụng HR</option>
                    <option>Cấu hình hệ thống</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Tần suất tạo:</label>
                  <select
                    value={newFreq}
                    onChange={(e) => setNewFreq(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs"
                  >
                    <option>Hàng tuần</option>
                    <option>Hàng tháng</option>
                    <option>Hàng quý</option>
                    <option>Hàng năm</option>
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
                Tạo báo cáo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}