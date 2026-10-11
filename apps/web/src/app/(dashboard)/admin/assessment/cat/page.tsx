'use client';

import React from 'react';
import { Cpu, Settings, Save } from 'lucide-react';
import Link from 'next/link';

export default function AdminCATEnginePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#0f172a]" /> Cấu Hình Bộ Máy Thi Thích Ứng CAT (Rasch IRT Engine)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình các tham số thuật toán hội tụ Theta ($\theta$), ngưỡng dừng SE & số câu hỏi tối đa.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs">
            <Save className="w-4 h-4" />
            <span>Lưu Tham Số CAT Engine</span>
          </button>
        </div>
      </div>

      {/* Main Settings Form */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4 max-w-3xl text-xs">
        <div className="space-y-1.5">
          <label className="font-bold text-[#0f172a] block">Mô hình IRT được kích hoạt</label>
          <select className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold">
            <option>Rasch Model (1PL IRT - Parameter b)</option>
            <option>2PL IRT Model (Parameter a, b)</option>
            <option>3PL IRT Model (Parameter a, b, c)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-[#0f172a] block">Số câu hỏi tối thiểu / bài thi</label>
            <input type="number" defaultValue={15} className="w-full font-mono bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs font-bold text-[#0f172a]" />
          </div>
          <div className="space-y-1.5">
            <label className="font-bold text-[#0f172a] block">Số câu hỏi tối đa / bài thi</label>
            <input type="number" defaultValue={25} className="w-full font-mono bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs font-bold text-[#0f172a]" />
          </div>
        </div>
      </div>
    </div>
  );
}