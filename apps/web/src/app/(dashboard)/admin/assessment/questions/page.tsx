'use client';

import React, { useState } from 'react';
import { Cpu, Plus, Search, Filter, Edit, Trash2, X } from 'lucide-react';
import Link from 'next/link';

interface MasterQuestion {
  id: string;
  domain: string;
  diffB: string;
  discA: string;
  text: string;
  status: string;
}

export default function AdminQuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [questions, setQuestions] = useState<MasterQuestion[]>([
    { id: 'q_master_1', domain: 'Domain 4: An toàn số', diffB: '+1.20', discA: '1.45', text: 'Phương thức mã hóa ECDSA trên Polygon bảo vệ tính toàn vẹn dữ liệu như thế nào?', status: 'Xuất bản' },
    { id: 'q_master_2', domain: 'Domain 3: Sáng tạo Nội dung', diffB: '+1.45', discA: '1.80', text: 'Kỹ thuật Prompting nào giảm thiểu tốt nhất hiện tượng Hallucination của LLM?', status: 'Xuất bản' },
  ]);

  // Form states
  const [newText, setNewText] = useState('');
  const [newDomain, setNewDomain] = useState('Domain 1: Vận hành Dữ liệu');
  const [newDiffB, setNewDiffB] = useState('0.00');
  const [newDiscA, setNewDiscA] = useState('1.00');
  const [newStatus, setNewStatus] = useState('Xuất bản');

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newQ: MasterQuestion = {
      id: `q_master_${questions.length + 1}`,
      domain: newDomain,
      diffB: Number(newDiffB) >= 0 ? `+${newDiffB}` : newDiffB,
      discA: newDiscA,
      text: newText,
      status: newStatus
    };

    setQuestions(prev => [newQ, ...prev]);
    setShowAddModal(false);
    setNewText('');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const filteredQuestions = questions.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#0f172a]" /> Ngân Hàng Câu Hỏi Khảo Thí IRT Master Toàn Hệ Thống
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý kho câu hỏi chuẩn hóa toàn bộ các đơn vị tổ chức.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Câu Hỏi Master Mới</span>
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
            placeholder="Tìm kiếm nội dung câu hỏi..."
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
                <th className="p-3">Mã câu</th>
                <th className="p-3">Vùng DigComp</th>
                <th className="p-3">Nội dung câu hỏi</th>
                <th className="p-3">Độ khó ($b$)</th>
                <th className="p-3">Độ phân biệt ($a$)</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{q.id}</td>
                  <td className="p-3 text-[#64748b]">{q.domain}</td>
                  <td className="p-3 font-bold text-[#0f172a] max-w-md">{q.text}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{q.diffB}</td>
                  <td className="p-3 font-mono text-[#64748b]">{q.discA}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      q.status === 'Xuất bản'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa câu hỏi"
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

      {/* Create Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateQuestion} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-lg w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Cpu className="w-5 h-5" /> Thêm câu hỏi Master mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Nội dung câu hỏi:</label>
                <textarea
                  required
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Nhập nội dung câu hỏi khảo thí..."
                  className="w-full h-20 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Vùng năng lực:</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Domain 1: Vận hành Dữ liệu</option>
                    <option>Domain 2: Giao tiếp & Cộng tác</option>
                    <option>Domain 3: Sáng tạo Nội dung</option>
                    <option>Domain 4: An toàn số</option>
                    <option>Domain 5: Giải quyết vấn đề</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Độ khó ($b$):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newDiffB}
                    onChange={(e) => setNewDiffB(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Độ phân biệt ($a$):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newDiscA}
                    onChange={(e) => setNewDiscA(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Trạng thái phát hành:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Xuất bản</option>
                    <option>Bản nháp</option>
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
                Thêm câu hỏi
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}