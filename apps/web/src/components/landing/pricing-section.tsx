"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      target: 'Cá nhân',
      priceMonthly: '0đ',
      priceYearly: '0đ',
      priceOriginalYearly: '',
      periodMonthly: '',
      periodYearly: '',
      desc: 'Dành cho cá nhân muốn tự đánh giá trần năng lực số và luyện đề.',
      features: [
        'Vẽ 1 biểu đồ Radar Năng lực số',
        'Luyện tập 3 đề CAT Test/tháng',
        'Lưu trữ hồ sơ e-Portfolio cơ bản',
        'Bảo mật thông tin W3C DID',
        'Chứng chỉ SBT cơ bản (tự trả phí gas)',
      ],
      cta: 'Bắt đầu miễn phí',
      popular: false,
    },
    {
      name: 'Pro',
      target: 'Chuyên gia / Nhà giáo',
      priceMonthly: '299.000đ',
      priceYearly: '2.868.000đ',
      priceOriginalYearly: '3.588.000đ',
      periodMonthly: '/tháng',
      periodYearly: '/năm',
      desc: 'Dành cho giảng viên quản lý lớp học và tự động chấm bài bằng AI.',
      features: [
        'Đầy đủ tính năng gói Free',
        'Tạo tối đa 5 lớp học phi tập trung',
        'Luyện tập CAT Test không giới hạn',
        'Gemini AI chấm điểm & phát hiện gian lận',
        'Đồng bộ trực tiếp Google Classroom',
        'Hỗ trợ đúc SBT Polygon gasless (miễn phí gas)',
      ],
      cta: 'Nâng cấp lên Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      target: 'Tổ chức / Doanh nghiệp',
      priceMonthly: 'Liên hệ',
      priceYearly: 'Liên hệ',
      priceOriginalYearly: '',
      periodMonthly: '',
      periodYearly: '',
      desc: 'Dành cho doanh nghiệp săn nhân tài và cơ sở giáo dục quy mô lớn.',
      features: [
        'Đầy đủ tính năng gói Pro',
        'Đúc chứng chỉ SBT Polygon số lượng lớn',
        'Bộ lọc Radar săn nhân tài nâng cao',
        'Logs kiểm toán bất biến (Immutable Logs)',
        'Hệ thống Webhook API tích hợp hệ thống LMS',
        'Hỗ trợ kỹ thuật SLA 24/7 riêng biệt',
      ],
      cta: 'Liên hệ tư vấn',
      popular: false,
    },
  ];

  return (
    <section className="w-full py-10 relative z-10">
      <div className="flex flex-col items-center justify-center mb-16 text-center space-y-4 px-4">
        <span className="text-[11px] sm:text-xs font-bold text-brand-500 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full uppercase tracking-[0.2em]">
          Bảng giá dịch vụ
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl">
          Lựa chọn gói dịch vụ <br className="hidden sm:block" /> phù hợp với bạn
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium">
          Tối ưu hóa việc đo lường năng lực số học viên và đúc chứng chỉ on-chain vĩnh viễn trên sổ cái.
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-3 pt-6">
          <span className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
            Hàng tháng
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            style={{ backgroundColor: isAnnual ? '#0ea5e9' : '#cbd5e1' }} // Use brand color active state
          >
            <motion.div
              className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
              animate={{ x: isAnnual ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-semibold transition-colors ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
              Hàng năm
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
              Tiết kiệm 20%
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-8 items-center">
        {plans.map((plan, idx) => {
          const price = isAnnual ? plan.priceYearly : plan.priceMonthly;
          return (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                plan.popular 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-100 md:scale-105 z-10 border border-slate-700' 
                  : 'bg-white text-slate-900 border border-slate-200 shadow-xl shadow-slate-200/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-brand-400 to-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Phổ biến nhất
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <span className={`inline-block mt-3 text-xs font-semibold px-2.5 py-1 rounded-md ${plan.popular ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                  {plan.target}
                </span>
                <p className={`mt-4 text-sm leading-relaxed min-h-[60px] ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-8">
                {isAnnual && plan.priceOriginalYearly && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold line-through ${plan.popular ? 'text-slate-400' : 'text-slate-400'}`}>
                      {plan.priceOriginalYearly}
                    </span>
                    <span className="text-[10px] font-bold bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Giảm 20%
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {price}
                  </span>
                  {(isAnnual ? plan.periodYearly : plan.periodMonthly) && price !== 'Liên hệ' && (
                    <span className={`text-sm font-medium ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      {isAnnual ? plan.periodYearly : plan.periodMonthly}
                    </span>
                  )}
                </div>
              </div>

              <ul className="flex-1 flex flex-col gap-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm">
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-brand-400' : 'text-brand-500'}`} />
                    <span className={plan.popular ? 'text-slate-300' : 'text-slate-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/select-role?action=register" className="mt-auto block w-full">
                <button
                  className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-brand-500 text-white hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/25'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
