'use client';

import React, { useState } from 'react';
import { Cpu, Plus, Search, Filter, Edit, Trash2, CheckCircle2, Sparkles, X } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  domain: string;
  diffB: string;
  discA: string;
  guessC: string;
  text: string;
  status: string;
}

export default function TeacherQuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    { id: 'q_401', domain: 'Domain 4: An toàn & Bảo mật', diffB: '+1.20', discA: '1.45', guessC: '0.25', text: 'Phương thức mã hóa ECDSA trên mạng Polygon bảo vệ tính toàn vẹn dữ liệu như thế nào?', status: 'Active' },
    { id: 'q_302', domain: 'Domain 3: Sáng tạo Nội dung', diffB: '+1.45', discA: '1.80', guessC: '0.20', text: 'Kỹ thuật Prompting nào giảm thiểu tốt nhất hiện tượng Hallucination của mô hình LLM?', status: 'Active' },
    { id: 'q_103', domain: 'Domain 1: Vận hành Dữ liệu', diffB: '+0.50', discA: '1.20', guessC: '0.25', text: 'Mục đích của việc tạo B-Tree Indexing trong CSDL PostgreSQL là gì?', status: 'Active' },
  ]);

  // Form states
  const [newText, setNewText] = useState('');
  const [newDomain, setNewDomain] = useState('Domain 1: Vận hành Dữ liệu');
  const [newDiffB, setNewDiffB] = useState('0.00');
  const [newDiscA, setNewDiscA] = useState('1.00');
  const [newGuessC, setNewGuessC] = useState('0.25');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newQ: Question = {
      id: `q_${Math.floor(Math.random() * 900) + 100}`,
      domain: newDomain,
      diffB: Number(newDiffB) >= 0 ? `+${newDiffB}` : newDiffB,
      discA: newDiscA,
      guessC: newGuessC,
      text: newText,
      status: 'Active'
    };

    setQuestions(prev => [newQ, ...prev]);
    setShowAddModal(false);
    // Reset
    setNewText('');
  };

  const handleDelete = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) || q.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || q.domain.includes(selectedDomain);
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#0f172a]" /> Ngân Hàng Câu Hỏi Khảo Thí IRT (Rasch Model $a, b, c$)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý kho câu hỏi khảo thí thích ứng CAT theo các tham số toán học Rasch IRT 3PL.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Câu Hỏi IRT Mới</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#0f172a]">Vùng DigComp:</span>
          {['all', 'Dữ liệu', 'Nội dung', 'An toàn'].map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-3 py-1.5 rounded-lg border font-bold ${
                selectedDomain === domain ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white text-[#334155] border-[#cbd5e1]'
              }`}
            >
              {domain === 'all' ? 'Tất cả' : domain}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm nội dung câu hỏi..."
            className="pl-9 pr-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a] w-64"
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
                <th className="p-3">Đoán mò ($c$)</th>
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
                  <td className="p-3 font-mono text-[#64748b]">{q.guessC}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                        title="Xóa câu hỏi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddQuestion} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-lg w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Plus className="w-5 h-5" /> Thêm câu hỏi IRT mới
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
                    <option>Domain 4: An toàn & Bảo mật</option>
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
                  <label className="font-bold text-[#334155] block">Đoán mò ($c$):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newGuessC}
                    onChange={(e) => setNewGuessC(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
                  />
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