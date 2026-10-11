'use client';

import React from 'react';
import { Target, ArrowLeft, BarChart2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LearnerRadarPage() {
  const domainAnalysis = [
    { key: 'd1', name: '1. Vận hành Dữ liệu & Thông tin', score: 85, target: 90, level: 'Level 5 (Advanced)', status: 'Vùng Mạnh', desc: 'Thành thạo kỹ năng truy vấn SQL và phân tích cấu trúc dữ liệu.' },
    { key: 'd2', name: '2. Giao tiếp & Cộng tác số', score: 78, target: 85, level: 'Level 4 (Intermediate)', status: 'Khá', desc: 'Thành thạo làm việc nhóm qua Git & Slack.' },
    { key: 'd3', name: '3. Sáng tạo Nội dung số', score: 90, target: 95, level: 'Level 5 (Advanced)', status: 'Vùng Mạnh', desc: 'Xuất sắc kỹ năng Prompt Engineering & AI integration.' },
    { key: 'd4', name: '4. An toàn & Bảo mật số', score: 65, target: 85, level: 'Level 3 (Intermediate)', status: 'Cần Cải Thiện', desc: 'Cần nâng cao kiến thức mã hóa ECDSA & Smart Contract.' },
    { key: 'd5', name: '5. Giải quyết Vấn đề Kỹ thuật', score: 78, target: 88, level: 'Level 4 (Intermediate)', status: 'Khá', desc: 'Khả năng debug & khắc phục sự cố hệ thống tốt.' },
  ];

  // Radar points calculation for score [85, 78, 90, 65, 78] (center 200, 200, max radius 150)
  // Angles: 90deg, 18deg, -54deg, -126deg, 162deg
  const cX = 200;
  const cY = 200;

  const pointsScore = [
    { x: cX, y: cY - 150 * 0.85 }, // Domain 1
    { x: cX + 150 * 0.78 * Math.cos((18 * Math.PI) / 180), y: cY - 150 * 0.78 * Math.sin((18 * Math.PI) / 180) }, // Domain 2
    { x: cX + 150 * 0.90 * Math.cos((-54 * Math.PI) / 180), y: cY - 150 * 0.90 * Math.sin((-54 * Math.PI) / 180) }, // Domain 3
    { x: cX + 150 * 0.65 * Math.cos((-126 * Math.PI) / 180), y: cY - 150 * 0.65 * Math.sin((-126 * Math.PI) / 180) }, // Domain 4
    { x: cX + 150 * 0.78 * Math.cos((162 * Math.PI) / 180), y: cY - 150 * 0.78 * Math.sin((162 * Math.PI) / 180) }, // Domain 5
  ];

  const pointsTarget = [
    { x: cX, y: cY - 150 * 0.90 }, // Domain 1
    { x: cX + 150 * 0.85 * Math.cos((18 * Math.PI) / 180), y: cY - 150 * 0.85 * Math.sin((18 * Math.PI) / 180) }, // Domain 2
    { x: cX + 150 * 0.95 * Math.cos((-54 * Math.PI) / 180), y: cY - 150 * 0.95 * Math.sin((-54 * Math.PI) / 180) }, // Domain 3
    { x: cX + 150 * 0.85 * Math.cos((-126 * Math.PI) / 180), y: cY - 150 * 0.85 * Math.sin((-126 * Math.PI) / 180) }, // Domain 4
    { x: cX + 150 * 0.88 * Math.cos((162 * Math.PI) / 180), y: cY - 150 * 0.88 * Math.sin((162 * Math.PI) / 180) }, // Domain 5
  ];

  const polyScoreStr = pointsScore.map(p => `${p.x},${p.y}`).join(' ');
  const polyTargetStr = pointsTarget.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-[#0f172a]" /> Biểu Đồ Radar Năng Lực 5 Vùng DigComp 3.0
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Phân tích đa chiều mức độ thành thạo 5 vùng năng lực số cốt lõi chuẩn Châu Âu.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/learner/analytics/skill-gap"
            className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all shadow-xs"
          >
            Phân Tích Khoảng Trống Năng Lực
          </Link>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: SVG Radar Chart (50%) */}
        <div className="lg:col-span-6 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#f1f5f9] pb-3 flex justify-between items-center text-xs">
            <h3 className="font-bold text-sm text-[#0f172a]">Biểu Đồ Radar 5 Trục Năng Lực</h3>
            <span className="font-mono text-[#64748b] font-bold">Chỉ số Trung Bình: 79.2/100</span>
          </div>

          {/* SVG Radar Chart Implementation */}
          <div className="max-w-md mx-auto aspect-square py-2">
            <svg className="w-full h-full text-[#0f172a]" viewBox="0 0 400 400">
              {/* Outer grid circles/polygons */}
              {[30, 60, 90, 120, 150].map((r, idx) => (
                <polygon
                  key={idx}
                  points={`
                    ${cX},${cY - r}
                    ${cX + r * Math.cos((18 * Math.PI) / 180)},${cY - r * Math.sin((18 * Math.PI) / 180)}
                    ${cX + r * Math.cos((-54 * Math.PI) / 180)},${cY - r * Math.sin((-54 * Math.PI) / 180)}
                    ${cX + r * Math.cos((-126 * Math.PI) / 180)},${cY - r * Math.sin((-126 * Math.PI) / 180)}
                    ${cX + r * Math.cos((162 * Math.PI) / 180)},${cY - r * Math.sin((162 * Math.PI) / 180)}
                  `}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                />
              ))}

              {/* Central axis lines */}
              {[90, 18, -54, -126, 162].map((angle, idx) => (
                <line
                  key={idx}
                  x1={cX}
                  y1={cY}
                  x2={cX + 150 * Math.cos((angle * Math.PI) / 180)}
                  y2={cY - 150 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}

              {/* Score Polygon Area */}
              <polygon
                points={polyScoreStr}
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="2"
              />

              {/* Target Polygon Area */}
              <polygon
                points={polyTargetStr}
                fill="none"
                stroke="#64748b"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />

              {/* Axis Label Labels */}
              <text x={cX} y={cY - 160} textAnchor="middle" className="text-[9px] font-bold fill-[#0f172a]">Dữ liệu (1)</text>
              <text x={cX + 165 * Math.cos((18 * Math.PI) / 180)} y={cY - 165 * Math.sin((18 * Math.PI) / 180)} textAnchor="start" className="text-[9px] font-bold fill-[#0f172a]">Cộng tác (2)</text>
              <text x={cX + 165 * Math.cos((-54 * Math.PI) / 180)} y={cY - 165 * Math.sin((-54 * Math.PI) / 180) + 10} textAnchor="start" className="text-[9px] font-bold fill-[#0f172a]">Nội dung (3)</text>
              <text x={cX + 165 * Math.cos((-126 * Math.PI) / 180)} y={cY - 165 * Math.sin((-126 * Math.PI) / 180) + 10} textAnchor="end" className="text-[9px] font-bold fill-[#0f172a]">An toàn (4)</text>
              <text x={cX + 165 * Math.cos((162 * Math.PI) / 180)} y={cY - 165 * Math.sin((162 * Math.PI) / 180)} textAnchor="end" className="text-[9px] font-bold fill-[#0f172a]">Giải quyết vấn đề (5)</text>
            </svg>
          </div>
        </div>

        {/* Right Side: Detailed Domain Analysis Breakdown Table (50%) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
            <div className="border-b border-[#f1f5f9] pb-3 flex justify-between items-center text-xs">
              <h3 className="font-bold text-sm text-[#0f172a]">Bảng Phân Tích Điểm Mạnh / Điểm Yếu</h3>
              <span className="text-xs text-[#64748b]">Cập nhật từ thi CAT</span>
            </div>

            <div className="space-y-3 text-xs">
              {domainAnalysis.map((dom) => (
                <div key={dom.key} className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0f172a]">{dom.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      dom.score >= 85
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : dom.score < 70
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-[#e2e8f0] text-[#334155]'
                    }`}>
                      {dom.status} ({dom.score}/100)
                    </span>
                  </div>

                  <p className="text-[11px] text-[#64748b]">{dom.desc}</p>

                  <div className="flex justify-between items-center text-[10px] font-mono text-[#64748b] pt-1">
                    <span>{dom.level}</span>
                    <span>Mục tiêu thăng cấp: {dom.target} điểm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}