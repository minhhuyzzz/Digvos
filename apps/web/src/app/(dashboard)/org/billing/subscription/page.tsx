'use client';

import React from 'react';
import { CreditCard, Check, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function EmployerSubscriptionPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#0f172a]" /> Gói Dịch Vụ Enterprise & Hóa Đơn Doanh Nghiệp
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý hạn ngạch truy cập kho hồ sơ ứng viên DigComp & tra cứu Live Scanner SBT.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Gói Dịch Vụ: Enterprise Active</span>
          </div>
        </div>
      </div>

      {/* Subscription Info Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4 max-w-3xl mx-auto text-xs">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3">
          <h3 className="font-bold text-sm text-[#0f172a]">Thông Tin Gói Dịch Vụ Hiện Tại</h3>
          <span className="font-mono text-emerald-600 font-bold">Gia hạn ngày: 15/08/2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-1">
            <span className="text-[#64748b] text-[11px] block">Hạn ngạch Sourcing Ứng viên</span>
            <span className="font-mono font-bold text-[#0f172a] block text-xl">Không giới hạn</span>
          </div>
          <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-1">
            <span className="text-[#64748b] text-[11px] block">Xác thực SBT Polygon On-Chain</span>
            <span className="font-mono font-bold text-[#0f172a] block text-xl">Miễn phí 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}