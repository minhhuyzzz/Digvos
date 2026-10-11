"use client";

import React from 'react';
import { Award, BookOpen, GraduationCap, Building2, Cloud, ShieldCheck, Globe, Cpu, Network } from "lucide-react";

interface Partner {
  text: string;
  icon: React.ElementType;
}

const row1: Partner[] = [
  { text: "DigComp 3.0 Standard", icon: Award },
  { text: "Bộ Giáo dục & Đào tạo", icon: BookOpen },
  { text: "Đại học Bách Khoa HN", icon: GraduationCap },
  { text: "UNESCO ICT Framework", icon: Globe },
  { text: "ĐHQG Hà Nội", icon: Building2 },
  { text: "RMIT University", icon: GraduationCap },
];

const row2: Partner[] = [
  { text: "Google for Education", icon: Cloud },
  { text: "AWS EdStart", icon: Cloud },
  { text: "FPT Corporation", icon: Cpu },
  { text: "Viettel Solutions", icon: Network },
  { text: "NIC Innovation Center", icon: Building2 },
  { text: "ISO/IEC 27001:2022", icon: ShieldCheck },
];

const multiply = (arr: Partner[], times: number): Partner[] => {
  let result: Partner[] = [];
  for (let i = 0; i < times; i++) {
    result = [...result, ...arr];
  }
  return result;
};

// Nhân bản 4 lần để đảm bảo chạy mượt mà trên màn hình siêu rộng
const duplicatedRow1 = multiply(row1, 4);
const duplicatedRow2 = multiply(row2, 4);

export default function ClientsMarquee() {
  return (
    <section className="relative z-2 w-full py-0.5 overflow-hidden">
      <div className="flex flex-col items-center justify-center mb-12">
        <p className="text-center text-[11px] sm:text-xs font-bold text-brand-400 uppercase tracking-[0.3em] mb-4">
          Bảo chứng chất lượng
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center max-w-2xl px-4">
          Được tin dùng bởi các Tổ chức & Doanh nghiệp hàng đầu
        </h2>
      </div>

      {/* Marquee container */}
      <div className="relative w-full flex flex-col gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">

        {/* Row 1: Left to Right */}
        <div className="flex w-max animate-marquee gap-6 items-center hover:[animation-play-state:paused]">
          {duplicatedRow1.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={`r1-${i}`}
                className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-200/60 rounded-2xl hover:bg-slate-50 hover:border-brand-200 transition-all duration-300 cursor-default shadow-lg shadow-slate-200/50 group"
              >
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 group-hover:text-brand-700 group-hover:scale-110 group-hover:bg-brand-100 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-600 group-hover:text-slate-900 whitespace-nowrap tracking-wide">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex w-max animate-marquee-reverse gap-6 items-center hover:[animation-play-state:paused]">
          {duplicatedRow2.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={`r2-${i}`}
                className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-200/60 rounded-2xl hover:bg-slate-50 hover:border-brand-200 transition-all duration-300 cursor-default shadow-lg shadow-slate-200/50 group"
              >
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 group-hover:text-brand-700 group-hover:scale-110 group-hover:bg-brand-100 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-600 group-hover:text-slate-900 whitespace-nowrap tracking-wide">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 45s linear infinite;
        }
      `}</style>
    </section>
  );
}
