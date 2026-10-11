'use client';

import React, { useState } from 'react';
import { Sparkles, Zap, Plus, CreditCard, QrCode, CheckCircle2, History, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: string;
  desc: string;
  popular?: boolean;
}

export default function EmployerCreditsPage() {
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState<CreditPackage | null>(null);

  const packages: CreditPackage[] = [
    { id: 'pack_1', name: 'Gói Starter AI', credits: 5000, price: '100,000 VNĐ', desc: 'Phù hợp cho nhu cầu tuyển dụng quy mô nhỏ.' },
    { id: 'pack_2', name: 'Gói Growth AI', credits: 25000, price: '450,000 VNĐ', desc: 'Tối ưu cho doanh nghiệp vừa, cần match JD nhiều ứng viên.', popular: true },
    { id: 'pack_3', name: 'Gói Enterprise AI', credits: 100000, price: '1,500,000 VNĐ', desc: 'Dành cho tập đoàn lớn tuyển dụng số lượng lớn.' },
  ];

  const consumptionHistory = [
    { date: '28/07/2026 14:30', action: 'Chạy AI Match JD ứng viên Trần Minh Huy', cost: '-50 Credits', balance: '12,500 Credits' },
    { date: '27/07/2026 09:15', action: 'Chạy AI Match JD ứng viên Lê Thị Thu Thảo', cost: '-50 Credits', balance: '12,550 Credits' },
    { date: '20/07/2026 10:00', action: 'Nạp thêm gói Growth AI Credits', cost: '+25,000 Credits', balance: '12,600 Credits' }
  ];

  const handleSelectPackage = (pack: CreditPackage) => {
    setSelectedPack(pack);
    setShowPayModal(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#0f172a]" /> Quản Lý Số Dư Credits AI & Hạn Ngạch Nạp
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý số dư AI Credits được dùng cho tính năng Đánh giá JD & Phễu đối sánh tự động.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Đủ cho 250 lượt AI Match</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Gói nạp & Số dư (65%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Balance overview panel */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs text-xs space-y-4">
            <span className="font-bold text-sm text-[#0f172a] block border-b border-[#f1f5f9] pb-2">Số dư tài khoản</span>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f8fafc] border border-[#e2e8f0] p-5 rounded-xl">
              <div className="space-y-1">
                <span className="text-[#64748b] block">Credits khả dụng:</span>
                <span className="text-3xl font-mono font-extrabold text-[#0f172a]">12,500 AI Credits</span>
              </div>
              <div className="text-[#64748b] space-y-1">
                <p>Số đã dùng tháng này: <strong>4,200 Credits</strong></p>
                <p>Lần chạy AI Match: <strong>84 lần</strong></p>
              </div>
            </div>
          </div>

          {/* Pricing packages grid */}
          <div className="space-y-4">
            <span className="font-bold text-xs uppercase tracking-wider text-[#64748b] block">Chọn Gói Nạp AI Credits</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((pack) => (
                <div
                  key={pack.id}
                  onClick={() => handleSelectPackage(pack)}
                  className={`bg-white border rounded-xl p-4 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-[#0f172a] transition-all relative ${
                    pack.popular ? 'border-[#0f172a] ring-2 ring-[#0f172a]/10' : 'border-[#e2e8f0]'
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-3 right-4 bg-[#0f172a] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Phổ biến
                    </span>
                  )}
                  <div className="space-y-2 text-xs">
                    <h4 className="font-bold text-[#0f172a]">{pack.name}</h4>
                    <p className="text-[10px] text-[#64748b] leading-relaxed">{pack.desc}</p>
                    <div className="pt-2 border-t border-[#f1f5f9]">
                      <span className="text-lg font-mono font-extrabold text-[#0f172a] block">+{pack.credits} Credits</span>
                      <span className="text-[10px] text-[#64748b] block font-mono">{pack.price}</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg mt-3 shadow-xs transition-all">
                    Mua ngay
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Consumption History (35%) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs">
          <span className="font-bold text-sm text-[#0f172a] block border-b border-[#f1f5f9] pb-2 flex items-center gap-1.5">
            <History className="w-4 h-4" /> Lịch sử tiêu thụ
          </span>
          <div className="space-y-3">
            {consumptionHistory.map((item, idx) => (
              <div key={idx} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0f172a] text-[10px] truncate max-w-[150px]">{item.action}</span>
                  <span className={`font-mono font-bold ${item.cost.startsWith('-') ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {item.cost}
                  </span>
                </div>
                <div className="flex justify-between text-[9px] text-[#64748b] font-mono">
                  <span>{item.date}</span>
                  <span>Số dư: {item.balance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pay Modal for AI Credits Pack */}
      {showPayModal && selectedPack && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <span className="font-bold text-[#0f172a]">Quét mã QR thanh toán gói credits</span>
              <button onClick={() => setShowPayModal(false)} className="text-[#64748b] hover:text-[#0f172a] font-bold">Đóng</button>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white border border-[#cbd5e1] p-1.5 rounded flex items-center justify-center shrink-0">
                <QrCode className="w-20 h-20 text-[#0f172a]" />
              </div>
              <div className="space-y-1 font-mono text-[#64748b] text-[11px]">
                <p>Nạp cho gói: <strong>{selectedPack.name}</strong></p>
                <p>Số tiền: <strong>{selectedPack.price}</strong></p>
                <p>Credits cộng thêm: <strong>+{selectedPack.credits} Credits</strong></p>
                <p>Chủ tài khoản: <strong>DIGVOS PLATFORM</strong></p>
                <p>Ngân hàng: <strong>Vietcombank (VCB)</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}