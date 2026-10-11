'use client';

import React from 'react';
import { Briefcase, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const TalentMatchFunnel: React.FC = () => {
  const candidates = [
    { name: 'Nguyễn Văn B', match: 94, level: 'Cấp độ 5 - Advanced', sbt: true, role: 'Ứng viên Kỹ sư AI' },
    { name: 'Trần Thị C', match: 88, level: 'Cấp độ 4 - Intermediate', sbt: true, role: 'Ứng viên Data Analyst' },
    { name: 'Lê Hoàng D', match: 85, level: 'Cấp độ 5 - Advanced', sbt: false, role: 'Ứng viên DevSecOps' },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#5a96b0]/10 text-[#5a96b0] rounded-xl">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Phễu Tuyển Dụng Dựa Trên Năng Lực Số</h3>
            <p className="text-xs text-slate-500">Đối sánh tự động Radar năng lực ứng viên với JD Doanh nghiệp</p>
          </div>
        </div>

        <Link
          href="/org/recruitment/candidates"
          className="text-xs font-bold text-[#5a96b0] hover:text-[#497c96] flex items-center gap-1"
        >
          <span>Xem tất cả 18 ứng viên</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {candidates.map((cand, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-50/70 border border-slate-200/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#5a96b0]/60 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#5a96b0]/10 text-[#5a96b0] font-black text-sm flex items-center justify-center border border-[#5a96b0]/20">
                {cand.match}%
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">{cand.name}</h4>
                  {cand.sbt && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> SBT Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{cand.role} • {cand.level}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                Khớp {cand.match}% JD
              </span>
              <button className="px-3.5 py-1.5 bg-[#5a96b0] hover:bg-[#497c96] text-white font-bold text-xs rounded-xl transition-all shadow-2xs">
                Mời phỏng vấn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
