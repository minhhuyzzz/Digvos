'use client';

import React from 'react';
import { Sparkles, Settings, Save } from 'lucide-react';
import Link from 'next/link';

export default function AdminPortfolioAIPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#0f172a]" /> Cấu Hình AI Pre-Grading Chấm Đồ Án Tự Động
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình ngưỡng điểm tự động duyệt bài nộp đồ án cho học viên trước khi đẩy sang Giảng viên.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs">
            <Save className="w-4 h-4" />
            <span>Lưu Cấu Hình AI Review</span>
          </button>
        </div>
      </div>

      {/* Main Settings Form */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4 max-w-3xl text-xs">
        <div className="space-y-1.5">
          <label className="font-bold text-[#0f172a] block">Ngưỡng điểm AI Pre-grading tối thiểu để đúc SBT (Score Threshold)</label>
          <input type="number" defaultValue={85} className="w-full font-mono bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs font-bold text-[#0f172a]" />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input type="checkbox" defaultChecked id="auto_review_chk" />
          <label htmlFor="auto_review_chk" className="font-bold text-[#0f172a]">Kích hoạt chế độ AI Tự động chấm bài ngay sau khi học viên nộp đồ án</label>
        </div>
      </div>
    </div>
  );
}