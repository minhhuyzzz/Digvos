'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Zap, 
  ArrowRight,
  Layers,
  Check,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function TeacherVerificationSBTPage() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>(['st_101', 'st_102']);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  const eligibleStudents = [
    { id: 'st_101', name: 'Trần Minh Huy', code: 'HV-2026-089', course: 'Lập trình Web Fullstack', score: '94/100', sbtName: 'Chuyên gia DigComp Level 5', gasEst: '0.0024 MATIC' },
    { id: 'st_102', name: 'Lê Thị Thu Thảo', code: 'HV-2026-112', course: 'An toàn Thông tin', score: '88/100', sbtName: 'Chuyên gia DigComp Level 4', gasEst: '0.0024 MATIC' },
    { id: 'st_103', name: 'Phạm Hoàng Nam', code: 'HV-2026-145', course: 'AI Generative & RAG Engine', score: '90/100', sbtName: 'Chuyên gia DigComp Level 5', gasEst: '0.0024 MATIC' },
  ];

  const recentMints = [
    { studentName: 'Nguyễn Hoàng Oanh', code: 'HV-2026-042', cert: 'Chuyên gia DigComp Level 5', tx: '0x3f8a92b4c10e9f8a...7f6e', date: '28/07/2026 10:24', status: 'Success' },
    { studentName: 'Vũ Quốc Khánh', code: 'HV-2026-015', cert: 'Chuyên gia DigComp Level 4', tx: '0x7b1c4d8e9f0a1b2c...5b6c', date: '28/07/2026 09:12', status: 'Success' }
  ];

  const toggleSelectStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkMintSBT = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setMintSuccess(true);
      setTimeout(() => setMintSuccess(false), 2500);
    }, 1500);
  };

  const filteredStudents = eligibleStudents.filter(st => 
    st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0f172a]" /> Duyệt Đúc Chứng Chỉ SBT Hàng Loạt On-Chain (Polygon Mainnet)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Phát hành Soulbound Tokens (SBT) không thể chuyển nhượng trực tiếp lên Polygon Smart Contract.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Polygon Gas Tracker: 32 Gwei</span>
          </div>
        </div>
      </div>

      {/* Contract & Gas Metrics Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Polygon Smart Contract</span>
          <span className="font-mono font-bold text-[#0f172a] block truncate">0x71C7656EC7ab88b098defB751B7401B5f6d89B4</span>
          <span className="text-[10px] text-emerald-600 font-bold block">Polygon Mainnet Active</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Học Viên Chọn Đúc</span>
          <span className="font-mono font-bold text-[#0f172a] block text-xl">{selectedStudents.length} / {eligibleStudents.length} Học Viên</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Ước Tính Phí Gas Mạng</span>
          <span className="font-mono font-bold text-[#0f172a] block text-xl">{(selectedStudents.length * 0.0024).toFixed(4)} MATIC</span>
        </div>
      </div>

      {/* Filter and Table Tools */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sinh viên theo tên hoặc MSSV..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Danh Sách Học Viên Đủ Điều Kiện Đúc SBT</h3>
          <button
            onClick={handleBulkMintSBT}
            disabled={selectedStudents.length === 0 || isMinting}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
              selectedStudents.length > 0
                ? 'bg-[#0f172a] hover:bg-[#1e293b] text-white cursor-pointer shadow-xs'
                : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isMinting ? 'Đang đúc On-Chain...' : `Đúc SBT Cho ${selectedStudents.length} Học Viên`}</span>
          </button>
        </div>

        {mintSuccess && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-800 flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" /> Đúc Soulbound Tokens (SBT) hàng loạt thành công lên Polygon Mainnet!
          </div>
        )}

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3 w-10">
                  <input type="checkbox" checked={selectedStudents.length === eligibleStudents.length} onChange={() => {}} />
                </th>
                <th className="p-3">Học viên</th>
                <th className="p-3">Mã HV</th>
                <th className="p-3">Khóa học</th>
                <th className="p-3">Điểm duyệt</th>
                <th className="p-3">Tên chứng chỉ SBT</th>
                <th className="p-3 text-right">Phí Gas est</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(st.id)}
                      onChange={() => toggleSelectStudent(st.id)}
                    />
                  </td>
                  <td className="p-3 font-bold text-[#0f172a]">{st.name}</td>
                  <td className="p-3 font-mono text-[#64748b]">{st.code}</td>
                  <td className="p-3 text-[#64748b]">{st.course}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{st.score}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{st.sbtName}</td>
                  <td className="p-3 text-right font-mono text-[#64748b]">{st.gasEst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Mints History table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-sm text-[#0f172a] border-b border-[#f1f5f9] pb-2">Lịch sử đúc SBT Polygon gần đây</h3>
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Học viên</th>
                <th className="p-3">Mã HV</th>
                <th className="p-3">Chứng chỉ</th>
                <th className="p-3">Mã Giao dịch (TxHash)</th>
                <th className="p-3 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {recentMints.map((mint, idx) => (
                <tr key={idx} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{mint.studentName}</td>
                  <td className="p-3 font-mono text-[#64748b]">{mint.code}</td>
                  <td className="p-3 text-[#64748b]">{mint.cert}</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold flex items-center gap-1">
                    <span>{mint.tx}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#64748b] cursor-pointer" />
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-600">{mint.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}