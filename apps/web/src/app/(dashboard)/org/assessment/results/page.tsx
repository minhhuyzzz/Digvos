'use client';

import React, { useState } from 'react';
import { BarChart, ArrowLeft, Search, Eye, X, BarChart2 } from 'lucide-react';
import Link from 'next/link';

interface ClassResult {
  id: number;
  className: string;
  avgTheta: string;
  passRate: string;
  topSkill: string;
  totalStudents: number;
}

export default function TeacherAssessmentResultsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassResult | null>(null);
  const [results, setResults] = useState<ClassResult[]>([
    { id: 1, className: 'Lớp K65-WEB01', avgTheta: '+1.52', passRate: '92%', topSkill: 'Domain 3 Sáng tạo nội dung', totalStudents: 45 },
    { id: 2, className: 'Lớp K65-SEC02', avgTheta: '+1.65', passRate: '95%', topSkill: 'Domain 4 An toàn số', totalStudents: 40 },
  ]);

  const filteredResults = results.filter(r => 
    r.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.topSkill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Báo Cáo Thống Kê Kết Quả Khảo Thí Lớp Học</h1>
          <p className="text-xs text-[#64748b] mt-1">Tổng hợp phổ điểm trung bình Theta ($\theta$) và tỷ lệ đạt chuẩn năng lực DigComp theo lớp học.</p>
        </div>
        <Link href="/org" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
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
            placeholder="Tìm kiếm theo lớp học hoặc kỹ năng..."
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
                <th className="p-3">Tên lớp học</th>
                <th className="p-3">Sĩ số lớp</th>
                <th className="p-3">Trung bình Theta ($\theta$)</th>
                <th className="p-3">Tỷ lệ đạt chuẩn pass</th>
                <th className="p-3">Vùng kỹ năng mạnh nhất</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredResults.map((r) => (
                <tr key={r.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{r.className}</td>
                  <td className="p-3 font-mono text-[#64748b]">{r.totalStudents} Học viên</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{r.avgTheta} $\theta$</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{r.passRate}</td>
                  <td className="p-3 text-[#64748b]">{r.topSkill}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedClass(r)}
                      className="px-2.5 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] font-bold rounded-lg transition-all flex items-center space-x-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem thống kê</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Statistics Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <BarChart2 className="w-5 h-5" /> Thống kê chi tiết lớp học
              </h3>
              <button type="button" onClick={() => setSelectedClass(null)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Tên lớp:</span>
                  <span className="font-bold text-[#0f172a]">{selectedClass.className}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Sĩ số:</span>
                  <span className="font-mono font-bold text-[#0f172a]">{selectedClass.totalStudents} Học viên</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Tỉ lệ đạt chuẩn:</span>
                  <span className="font-mono font-bold text-emerald-600">{selectedClass.passRate}</span>
                </div>
              </div>

              {/* Phân phối điểm số theo mô hình IRT */}
              <div className="space-y-2">
                <span className="font-bold text-[#334155] block">Phân phối điểm số lớp học (Ước lượng):</span>
                <div className="space-y-1.5 font-mono text-[10px] text-[#64748b]">
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Cấp 5 (Xuất sắc):</span>
                      <span className="font-bold text-[#0f172a]">45%</span>
                    </div>
                    <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0f172a] h-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Cấp 4 (Giỏi):</span>
                      <span className="font-bold text-[#0f172a]">35%</span>
                    </div>
                    <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0f172a] h-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Cấp 3 (Khá):</span>
                      <span className="font-bold text-[#0f172a]">20%</span>
                    </div>
                    <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0f172a] h-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setSelectedClass(null)}
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