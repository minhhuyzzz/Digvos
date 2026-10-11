'use client';

import React from 'react';
import { BarChart2, Filter, Users, ShieldCheck, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function EmployerTalentAnalyticsPage() {
  const funnelMetrics = [
    { step: '1. Sourcing Ứng Viên DigComp', count: 120, pct: '100%', fill: '#0f172a' },
    { step: '2. Khớp Năng Lực Số JD >80%', count: 42, pct: '35%', fill: '#1e293b' },
    { step: '3. Xác Thực SBT Polygon On-Chain', count: 35, pct: '29%', fill: '#334155' },
    { step: '4. Mời Phỏng Vấn Chính Thức', count: 15, pct: '12.5%', fill: '#475569' },
    { step: '5. Tuyển Dụng Thành Công (Hired)', count: 4, pct: '3.3%', fill: '#64748b' },
  ];

  const sourceBreakdown = [
    { source: 'Đại Học Bách Khoa', candidates: 45, hired: 2, conversion: '4.4%' },
    { source: 'Digvos Community Open Talent pool', candidates: 60, hired: 2, conversion: '3.3%' },
    { source: 'Học viên tự do', candidates: 15, hired: 0, conversion: '0%' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-[#0f172a]" /> Báo Cáo Phễu Phân Tích Nhân Tài (Talent Match Funnel)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Đo lường hiệu quả chuyển đổi từ khâu Sourcing Ứng viên DigComp đến Tuyển dụng thành công.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/org/recruitment/candidates"
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all shadow-xs"
          >
            Xem Kho Hồ Sơ Ứng Viên
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[10px] uppercase font-bold block">Tổng ứng viên Sourced</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block">120 Hồ sơ</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[10px] uppercase font-bold block">Tỷ lệ Match &gt;80%</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block">35.0%</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[10px] uppercase font-bold block">SBT Verified Rate</span>
          <span className="text-2xl font-extrabold text-emerald-600 block">83.3%</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[10px] uppercase font-bold block">Tuyển dụng thành công</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block">4 Nhân sự</span>
        </div>
      </div>

      {/* Main Workspace: Left Funnel Chart, Right Source Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Funnel Chart (60%) */}
        <div className="lg:col-span-7 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#f1f5f9] pb-3 flex justify-between items-center text-xs">
            <h3 className="font-bold text-sm text-[#0f172a]">Hình Phễu Chuyển Đổi Tuyển Dụng</h3>
            <span className="font-mono text-[#64748b]">Tỷ lệ chuyển đổi tổng: 3.3%</span>
          </div>

          {/* SVG funnel chart mockup */}
          <div className="relative py-2">
            <svg viewBox="0 0 400 240" className="w-full h-auto">
              {/* Funnel sections */}
              <polygon points="40,20 360,20 330,60 70,60" fill="#0f172a" opacity="1" />
              <polygon points="70,60 330,60 300,100 100,100" fill="#1e293b" opacity="0.9" />
              <polygon points="100,100 300,100 270,140 130,140" fill="#334155" opacity="0.8" />
              <polygon points="130,140 270,140 240,180 160,180" fill="#475569" opacity="0.75" />
              <polygon points="160,180 240,180 215,220 185,220" fill="#64748b" opacity="0.7" />

              {/* Labels on SVG */}
              <text x="200" y="40" textAnchor="middle" className="text-[10px] font-bold fill-white">1. Sourced (120)</text>
              <text x="200" y="80" textAnchor="middle" className="text-[10px] font-bold fill-white">2. Match &gt;80% (42)</text>
              <text x="200" y="120" textAnchor="middle" className="text-[10px] font-bold fill-white">3. SBT Polygon (35)</text>
              <text x="200" y="160" textAnchor="middle" className="text-[10px] font-bold fill-white">4. Phỏng vấn (15)</text>
              <text x="200" y="200" textAnchor="middle" className="text-[10px] font-bold fill-white">5. Hired (4)</text>
            </svg>
          </div>
        </div>

        {/* Right: Source Breakdown (40%) */}
        <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a] border-b border-[#f1f5f9] pb-2">Hiệu quả theo nguồn ứng viên</h3>
          <div className="space-y-3">
            {sourceBreakdown.map((item, idx) => (
              <div key={idx} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-2">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-[#0f172a]">{item.source}</span>
                  <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Conv: {item.conversion}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#64748b]">
                  <span>Sourced: <strong>{item.candidates}</strong></span>
                  <span>Hired: <strong>{item.hired}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}