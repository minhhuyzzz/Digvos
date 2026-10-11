'use client';

import React from 'react';
import { BarChart2, Users, Layers, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import Link from 'next/link';

export default function TeacherClassHeatmapPage() {
  const classMatrix = [
    { studentName: 'Trần Minh Huy', code: 'HV-089', d1: 85, d2: 78, d3: 90, d4: 65, d5: 78, avg: 79.2 },
    { studentName: 'Lê Thị Thu Thảo', code: 'HV-112', d1: 92, d2: 85, d3: 88, d4: 90, d5: 82, avg: 87.4 },
    { studentName: 'Phạm Hoàng Nam', code: 'HV-145', d1: 70, d2: 65, d3: 75, d4: 60, d5: 70, avg: 68.0 },
    { studentName: 'Nguyễn Bích Ngọc', code: 'HV-198', d1: 88, d2: 90, d3: 95, d4: 85, d5: 90, avg: 89.6 },
  ];

  // Helper function to color cells based on competency score
  const getHeatmapBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-950 border border-emerald-200';
    if (score >= 80) return 'bg-green-50 text-green-950 border border-green-200';
    if (score >= 70) return 'bg-amber-50 text-amber-950 border border-amber-200';
    return 'bg-rose-50 text-rose-950 border border-rose-200';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-[#0f172a]" /> Ma Trận Nhiệt Năng Lực Lớp Học (Class Competency Heatmap Matrix)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Phân bổ chỉ số Năng lực số của sỉ số lớp học theo 5 vùng DigComp 3.0.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs">
            Lớp: <span className="font-bold text-[#0f172a]">Fullstack-K2026</span>
          </div>
        </div>
      </div>

      {/* Class competency distribution overview (SVG bar charts) */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b]">Tóm tắt phân phối điểm năng lực lớp</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
          {[
            { label: 'Domain 1: Dữ liệu', avg: 83.7, progress: '84%' },
            { label: 'Domain 2: Giao tiếp', avg: 78.2, progress: '78%' },
            { label: 'Domain 3: Nội dung', avg: 87.0, progress: '87%' },
            { label: 'Domain 4: An toàn', avg: 75.0, progress: '75%' },
            { label: 'Domain 5: Giải quyết', avg: 80.5, progress: '81%' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1">
              <span className="font-bold text-[#64748b] text-[10px] block truncate">{item.label}</span>
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-sm font-extrabold text-[#0f172a]">{item.avg}</span>
                <span className="text-[10px] text-emerald-600 font-bold">Khá</span>
              </div>
              <div className="w-full bg-[#e2e8f0] h-1 rounded-full overflow-hidden">
                <div className="bg-[#0f172a] h-full" style={{ width: item.progress }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Heatmap Matrix Data Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Ma Trận Điểm Số 5 Vùng DigComp</h3>
          <span className="font-mono text-[#64748b]">Sỉ số: {classMatrix.length} Học viên</span>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Học viên</th>
                <th className="p-3">Domain 1 (Data)</th>
                <th className="p-3">Domain 2 (Comm)</th>
                <th className="p-3">Domain 3 (Content)</th>
                <th className="p-3">Domain 4 (Safety)</th>
                <th className="p-3">Domain 5 (Problem)</th>
                <th className="p-3 text-right">Trung bình</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {classMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">
                    {row.studentName} <span className="text-[#64748b] font-mono font-normal">({row.code})</span>
                  </td>
                  <td className="p-3"><span className={`px-2.5 py-1 rounded font-mono font-bold ${getHeatmapBg(row.d1)}`}>{row.d1}</span></td>
                  <td className="p-3"><span className={`px-2.5 py-1 rounded font-mono font-bold ${getHeatmapBg(row.d2)}`}>{row.d2}</span></td>
                  <td className="p-3"><span className={`px-2.5 py-1 rounded font-mono font-bold ${getHeatmapBg(row.d3)}`}>{row.d3}</span></td>
                  <td className="p-3"><span className={`px-2.5 py-1 rounded font-mono font-bold ${getHeatmapBg(row.d4)}`}>{row.d4}</span></td>
                  <td className="p-3"><span className={`px-2.5 py-1 rounded font-mono font-bold ${getHeatmapBg(row.d5)}`}>{row.d5}</span></td>
                  <td className="p-3 text-right font-mono font-extrabold text-[#0f172a]">{row.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}