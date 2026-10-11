'use client';

import React, { useState } from 'react';
import { Archive, Upload, ArrowLeft, Search, Eye, X, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface EvidenceItem {
  id: string;
  name: string;
  domain: string;
  aiScore: string;
  status: string;
  date: string;
  description: string;
}

export default function LearnerEvidencePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null);
  const [evidences, setEvidences] = useState<EvidenceItem[]>([
    { id: 'ev_1', name: 'Đồ án Hệ thống thi thích ứng CAT tích hợp Blockchain', domain: 'Domain 4 & 5', aiScore: '92/100', status: 'Đã duyệt', date: '28/07/2026', description: 'Ứng dụng thuật toán phân tích câu hỏi IRT Rasch kết hợp lưu trữ txHash chứng chỉ SBT lên Polygon Network.' },
    { id: 'ev_2', name: 'Website Portfolio cá nhân tương tác cao', domain: 'Domain 3: Sáng tạo nội dung', aiScore: '85/100', status: 'Đang chấm', date: '25/07/2026', description: 'Tối ưu UI/UX cao cấp, các hiệu ứng slide/hover, tối ưu SEO/GEO và responsive toàn diện.' }
  ]);

  const filteredEvidences = evidences.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Quản Lý Minh Chứng Năng Lực Học Viên</h1>
          <p className="text-xs text-[#64748b] mt-1">Nơi lưu trữ, quản lý và theo dõi trạng thái thẩm định các đồ án minh chứng của bạn.</p>
        </div>
        <Link href="/learner/portfolio/proofs" className="px-3.5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
          <Upload className="w-4 h-4" />
          <span>Nộp minh chứng mới</span>
        </Link>
      </div>

      {/* Filter and Search toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm minh chứng theo tên, kỹ năng..."
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
                <th className="p-3">Mã minh chứng</th>
                <th className="p-3">Tên minh chứng / đồ án</th>
                <th className="p-3">Thuộc Vùng DigComp</th>
                <th className="p-3">Điểm số AI</th>
                <th className="p-3">Ngày nộp</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredEvidences.map((e) => (
                <tr key={e.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{e.id}</td>
                  <td className="p-3 font-bold text-[#0f172a] max-w-xs truncate">{e.name}</td>
                  <td className="p-3 font-mono text-[#64748b]">{e.domain}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{e.aiScore}</td>
                  <td className="p-3 font-mono text-[#64748b]">{e.date}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      e.status === 'Đã duyệt'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedItem(e)}
                      className="px-2.5 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] font-bold rounded-lg transition-all flex items-center space-x-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Inspector Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <FileText className="w-5 h-5" /> Chi tiết minh chứng đã nộp
              </h3>
              <button type="button" onClick={() => setSelectedItem(null)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Tên đồ án:</span>
                  <span className="font-bold text-[#0f172a] text-right">{selectedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Vùng năng lực:</span>
                  <span className="font-mono font-bold text-[#0f172a]">{selectedItem.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Điểm đánh giá AI:</span>
                  <span className="font-mono font-bold text-emerald-600">{selectedItem.aiScore}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#334155] block">Mô tả nội dung:</span>
                <p className="text-[#64748b] leading-relaxed">{selectedItem.description}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}