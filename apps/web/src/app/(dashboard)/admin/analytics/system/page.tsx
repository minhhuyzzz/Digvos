'use client';

import React from 'react';
import { BarChart2, Cpu, Server, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AdminSystemAnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-[#0f172a]" /> Thống Kê Tải Trọng & Hiệu Năng Hệ Thống (System Performance)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Đo lường mức độ sử dụng CPU, RAM, băng thông mạng & tốc độ xử lý câu hỏi CAT thích ứng.</p>
        </div>
      </div>

      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">CPU Load Average</span>
          <span className="font-mono font-bold text-[#0f172a] block text-2xl">18.4%</span>
          <span className="text-[10px] text-emerald-600 font-bold block">Normal Range</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Memory Usage</span>
          <span className="font-mono font-bold text-[#0f172a] block text-2xl">4.2 GB / 16 GB</span>
          <span className="text-[10px] text-emerald-600 font-bold block">26.2% Utilized</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">PostgreSQL Connections</span>
          <span className="font-mono font-bold text-[#0f172a] block text-2xl">45 / 200</span>
          <span className="text-[10px] text-emerald-600 font-bold block">Healthy Pool</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Average API Response</span>
          <span className="font-mono font-bold text-[#0f172a] block text-2xl">42 ms</span>
          <span className="text-[10px] text-emerald-600 font-bold block">Ultra Fast</span>
        </div>
      </div>
    </div>
  );
}