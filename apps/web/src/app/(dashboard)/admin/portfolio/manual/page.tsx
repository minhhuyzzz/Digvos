'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowLeft, Plus, Trash2, X, Search, FileText } from 'lucide-react';
import Link from 'next/link';

interface ManualMintItem {
  id: string;
  studentName: string;
  studentCode: string;
  projectName: string;
  score: string;
  txHash: string;
  date: string;
}

export default function AdminManualPortfolioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [mints, setMints] = useState<ManualMintItem[]>([
    { id: 'man_1', studentName: 'Vũ Hoàng Nam', studentCode: 'HV-401', projectName: 'Cổng thanh toán Lightning Network Lớp 5', score: '95/100', txHash: '0x3f8a92b4c10e9f8a7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1e0f9a8b7c6d5e401', date: '28/07/2026' }
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newScore, setNewScore] = useState('90/100');

  const handleCreateManualMint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim() || !newProject.trim()) return;

    const newM: ManualMintItem = {
      id: `man_${mints.length + 1}`,
      studentName: newName,
      studentCode: newCode.toUpperCase(),
      projectName: newProject,
      score: newScore,
      txHash: '0x9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e',
      date: '28/07/2026'
    };

    setMints(prev => [newM, ...prev]);
    setShowAddModal(false);
    setNewName('');
    setNewCode('');
    setNewProject('');
  };

  const handleDeleteMint = (id: string) => {
    setMints(prev => prev.filter(m => m.id !== id));
  };

  const filteredMints = mints.filter(m => 
    m.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Quy Trình Duyệt Thủ Công Đồ Án Hệ Thống</h1>
          <p className="text-xs text-[#64748b] mt-1">Duyệt thủ công các đồ án minh chứng và kích hoạt đúc SBT on-chain cho các trường hợp đặc biệt.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Đơn Duyệt Thủ Công</span>
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
            placeholder="Tìm kiếm theo tên học viên, đồ án..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Lịch sử duyệt & đúc thủ công</h3>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Học viên</th>
                <th className="p-3">Mã số</th>
                <th className="p-3">Tên đồ án / Minh chứng</th>
                <th className="p-3">Điểm chấm</th>
                <th className="p-3">Giao dịch Hash (TxHash)</th>
                <th className="p-3">Ngày duyệt</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredMints.map((m) => (
                <tr key={m.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{m.studentName}</td>
                  <td className="p-3 font-mono text-[#64748b]">{m.studentCode}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{m.projectName}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{m.score}</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold truncate max-w-[120px]">{m.txHash}</td>
                  <td className="p-3 font-mono text-[#64748b]">{m.date}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteMint(m.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa bản ghi"
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

      {/* Create Manual Mint Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateManualMint} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <FileText className="w-5 h-5" /> Tạo đơn duyệt thủ công mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Tên học viên:</label>
                  <input
                    required
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nguyễn Văn A..."
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Mã số học viên:</label>
                  <input
                    required
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="HV-999..."
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs font-mono uppercase focus:outline-none focus:border-[#0f172a]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên đồ án / Minh chứng:</label>
                <input
                  required
                  type="text"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  placeholder="Ví dụ: Thiết kế hệ thống mạng doanh nghiệp..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Điểm chấm học tập:</label>
                <input
                  type="text"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
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
                Duyệt & Đúc SBT
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}