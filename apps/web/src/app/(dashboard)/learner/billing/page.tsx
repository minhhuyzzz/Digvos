'use client';

import React, { useState } from 'react';
import { CreditCard, Check, Sparkles, ShieldCheck, Zap, ArrowRight, Clock, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function LearnerBillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('pro');
  const [showPayModal, setShowPayModal] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Gói Miễn Phí (Learner Starter)',
      price: '0 VNĐ',
      period: 'mãi mãi',
      desc: 'Dành cho học viên bắt đầu tìm hiểu khung năng lực số DigComp 3.0.',
      features: [
        'Tham gia tối đa 2 đợt thi thích ứng CAT/tháng',
        'Truy cập cây lộ trình kỹ năng cơ bản',
        'Lưu trữ tối đa 3 bài nộp minh chứng đồ án',
        'Cấp chứng chỉ cơ bản (không đúc SBT Blockchain)'
      ]
    },
    {
      id: 'pro',
      name: 'Gói Nâng Cấp Pro (Learner Master)',
      price: '299,000 VNĐ',
      period: '/tháng',
      recommended: true,
      desc: 'Dành cho học viên muốn tăng tốc thăng cấp năng lực & đúc SBT Polygon.',
      features: [
        'Thi thích ứng CAT không giới hạn số lượt',
        'Trợ lý AI Coach Gia sư 24/7 tư vấn không giới hạn',
        'AI Pre-Grading (GPT-4o) chấm bài tức thì',
        'Đúc không giới hạn Soulbound Token (SBT) Polygon Mainnet',
        'Hỗ trợ ưu tiên 1-1 từ Giảng viên hướng dẫn'
      ]
    }
  ];

  const billingHistory = [
    { id: 'inv_901', date: '01/07/2026', amount: '299,000 VNĐ', plan: 'Gói Learner Pro (1 Tháng)', status: 'Đã thanh toán', method: 'Ví MoMo' },
    { id: 'inv_802', date: '01/06/2026', amount: '299,000 VNĐ', plan: 'Gói Learner Pro (1 Tháng)', status: 'Đã thanh toán', method: 'Thẻ ATM / Banking' },
  ];

  const quotas = [
    { name: 'Số lượt thi thích ứng CAT', used: 14, limit: 'Không giới hạn', pct: 100 },
    { name: 'Đúc chứng chỉ SBT Polygon', used: 3, limit: 'Không giới hạn', pct: 100 },
    { name: 'AI Coach Token Usage', used: 42500, limit: '100,000 Tokens', pct: 42.5 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#0f172a]" /> Quản Lý Gói Cước Pro & Thanh Toán
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Nâng cấp tài khoản Pro để đúc chứng chỉ số SBT Polygon & mở khóa AI Coach 24/7 không giới hạn.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Trạng thái: Gói Pro Active</span>
          </div>
        </div>
      </div>

      {/* Grid: Quotas & Pricing Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quota usage (35%) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs">
          <span className="font-bold text-[#0f172a] block border-b border-[#f1f5f9] pb-2">Hạn ngạch gói cước hiện tại</span>
          <div className="space-y-3">
            {quotas.map((q, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#334155] font-bold">
                  <span>{q.name}</span>
                  <span className="font-mono">{q.used} / {q.limit}</span>
                </div>
                <div className="w-full bg-[#e2e8f0] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#0f172a] h-full rounded-full" style={{ width: `${q.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Pricing Cards (80%) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedPlan(p.id as 'free' | 'pro');
                if (p.id === 'pro') setShowPayModal(true);
              }}
              className={`bg-white border rounded-xl p-5 shadow-2xs space-y-4 cursor-pointer transition-all relative flex flex-col justify-between ${
                p.recommended
                  ? 'border-[#0f172a] ring-2 ring-[#0f172a]/10'
                  : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
              }`}
            >
              {p.recommended && (
                <span className="absolute -top-3 right-6 bg-[#0f172a] text-white font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Khuyên Dùng
                </span>
              )}

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-[#0f172a]">{p.name}</h3>
                  <p className="text-[11px] text-[#64748b]">{p.desc}</p>
                </div>

                <div className="flex items-baseline space-x-1 font-mono">
                  <span className="text-xl font-extrabold text-[#0f172a]">{p.price}</span>
                  <span className="text-[10px] text-[#64748b]">{p.period}</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#f1f5f9] text-[11px]">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[#334155]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all shadow-xs mt-3 ${
                  selectedPlan === p.id
                    ? 'bg-[#0f172a] text-white hover:bg-[#1e293b]'
                    : 'bg-white border border-[#cbd5e1] text-[#0f172a] hover:bg-[#f8fafc]'
                }`}
              >
                {selectedPlan === p.id ? 'Gói Hiện Tại Đang Sử Dụng' : 'Chọn Gói Này'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pay Modal Simulated (if Pro selected) */}
      {showPayModal && (
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs max-w-xl mx-auto text-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
            <span className="font-bold text-[#0f172a]">Quét mã QR để nâng cấp gói Pro</span>
            <button onClick={() => setShowPayModal(false)} className="text-[#64748b] hover:text-[#0f172a]">Đóng</button>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white border border-[#cbd5e1] p-1.5 rounded flex items-center justify-center shrink-0">
              <QrCode className="w-20 h-20 text-[#0f172a]" />
            </div>
            <div className="space-y-1 font-mono text-[#64748b] text-[11px]">
              <p>Chủ tài khoản: <strong>DIGVOS PLATFORM</strong></p>
              <p>Ngân hàng: <strong>Vietcombank (VCB)</strong></p>
              <p>Số tài khoản: <strong>1028491028</strong></p>
              <p>Số tiền: <strong>299,000 VNĐ</strong></p>
              <p>Nội dung: <strong>DIGVOS PRO HV-089</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Billing History Data Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Lịch Sử Giao Dịch & Hóa Đơn</h3>
          <span className="font-mono text-[#64748b]">Tổng số: {billingHistory.length} Hóa đơn</span>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Mã hóa đơn</th>
                <th className="p-3">Ngày gia hạn</th>
                <th className="p-3">Gói cước</th>
                <th className="p-3">Số tiền</th>
                <th className="p-3">Phương thức</th>
                <th className="p-3 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {billingHistory.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{inv.id}</td>
                  <td className="p-3 text-[#64748b]">{inv.date}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{inv.plan}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{inv.amount}</td>
                  <td className="p-3 text-[#64748b]">{inv.method}</td>
                  <td className="p-3 text-right">
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
