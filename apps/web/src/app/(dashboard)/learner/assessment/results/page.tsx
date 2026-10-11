'use client';

import React, { useState } from 'react';
import { BarChart, ShieldCheck, ArrowLeft, CheckCircle2, Search, Eye, X, Star } from 'lucide-react';
import Link from 'next/link';

interface ExamResult {
  id: number;
  exam: string;
  date: string;
  theta: string;
  level: string;
  se: string;
  status: string;
  detailScores: { domain: string; score: number }[];
}

export default function LearnerResultsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [results, setResults] = useState<ExamResult[]>([
    {
      id: 1,
      exam: 'Kỳ thi Thích ứng CAT Tháng 7/2026',
      date: '20/07/2026',
      theta: '+1.45',
      level: 'Level 4 (Intermediate)',
      se: '94.8%',
      status: 'Đã cập nhật Radar',
      detailScores: [
        { domain: 'Domain 1: Dữ liệu & Thông tin', score: 85 },
        { domain: 'Domain 2: Giao tiếp & Cộng tác', score: 70 },
        { domain: 'Domain 3: Sáng tạo nội dung', score: 65 },
        { domain: 'Domain 4: An toàn & Bảo mật', score: 90 },
        { domain: 'Domain 5: Giải quyết vấn đề', score: 75 },
      ]
    },
    {
      id: 2,
      exam: 'Bài Thi Khảo Thí An Toàn Thông Tin',
      date: '10/06/2026',
      theta: '+1.80',
      level: 'Level 5 (Advanced)',
      se: '96.2%',
      status: 'Đã cấp chứng chỉ SBT',
      detailScores: [
        { domain: 'Domain 1: Dữ liệu & Thông tin', score: 90 },
        { domain: 'Domain 2: Giao tiếp & Cộng tác', score: 80 },
        { domain: 'Domain 3: Sáng tạo nội dung', score: 75 },
        { domain: 'Domain 4: An toàn & Bảo mật', score: 95 },
        { domain: 'Domain 5: Giải quyết vấn đề', score: 85 },
      ]
    },
  ]);

  const filteredResults = results.filter(r => 
    r.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Kết Quả Khảo Thí & Điểm Năng Lực Theta ($\theta$)</h1>
          <p className="text-xs text-[#64748b] mt-1">Tra cứu kết quả các kỳ thi thích ứng CAT đã tham gia và mức độ tự tin ước lượng năng lực số.</p>
        </div>
        <Link href="/learner" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Về Trang chủ</span>
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
            placeholder="Tìm kiếm kết quả kỳ thi..."
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
                <th className="p-3">Kỳ thi khảo thí</th>
                <th className="p-3">Ngày làm bài</th>
                <th className="p-3">Chỉ số Theta ($\theta$)</th>
                <th className="p-3">Cấp độ DigComp dự báo</th>
                <th className="p-3">Độ tin cậy SE</th>
                <th className="p-3">Trạng thái cập nhật</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredResults.map((r) => (
                <tr key={r.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{r.exam}</td>
                  <td className="p-3 font-mono text-[#64748b]">{r.date}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{r.theta} $\theta$</td>
                  <td className="p-3 text-[#64748b]">{r.level}</td>
                  <td className="p-3 font-mono text-[#64748b]">{r.se}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      r.status.includes('SBT')
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedResult(r)}
                      className="px-2.5 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] font-bold rounded-lg transition-all flex items-center space-x-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Details Inspector Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Star className="w-5 h-5 text-amber-500" /> Báo cáo chi tiết năng lực 5 vùng
              </h3>
              <button type="button" onClick={() => setSelectedResult(null)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Tên kỳ thi:</span>
                  <span className="font-bold text-[#0f172a] text-right">{selectedResult.exam}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Chỉ số Theta:</span>
                  <span className="font-mono font-bold text-[#0f172a]">{selectedResult.theta} $\theta$</span>
                </div>
              </div>

              {/* Progress Bar chart of 5 DigComp domains */}
              <div className="space-y-2">
                <span className="font-bold text-[#334155] block">Điểm số ước lượng theo vùng DigComp 3.0:</span>
                <div className="space-y-1.5 font-mono text-[10px] text-[#64748b]">
                  {selectedResult.detailScores.map((score, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-0.5">
                        <span>{score.domain}:</span>
                        <span className="font-bold text-[#0f172a]">{score.score}%</span>
                      </div>
                      <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0f172a] h-full" style={{ width: `${score.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg"
              >
                Đóng báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}