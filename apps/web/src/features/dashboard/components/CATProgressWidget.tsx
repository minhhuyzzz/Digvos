'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cpu, ArrowUpRight, Activity, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface CATProgressWidgetProps {
  testName?: string;
  thetaScore?: number; // Estimated ability theta (-3.0 to +3.0)
  level?: string;
  itemCount?: number;
  totalItems?: number;
}

export const CATProgressWidget: React.FC<CATProgressWidgetProps> = ({
  testName = 'Thi Thích Ứng CAT - Kỹ Năng Lập Trình & An Toàn Số',
  thetaScore = +1.45,
  level = 'Cấp độ 5 - Advanced (DigComp 3.0)',
  itemCount = 12,
  totalItems = 20,
}) => {
  const [simulatedScore, setSimulatedScore] = useState(thetaScore);

  const thetaDisplay = (simulatedScore >= 0 ? `+${simulatedScore.toFixed(2)}` : simulatedScore.toFixed(2));
  const progressPercent = Math.round((itemCount / totalItems) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#1e3442] to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden space-y-6">
      {/* Background Subtle Glow */}
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#5a96b0]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#5a96b0]/20 text-[#5a96b0] border border-[#5a96b0]/30 rounded-2xl">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#5a96b0]/30 text-[#5a96b0] rounded-full border border-[#5a96b0]/40 uppercase tracking-widest">
                Động Cơ CAT Realtime (IRT Model)
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <h3 className="font-extrabold text-base text-white mt-1">{testName}</h3>
          </div>
        </div>

        <Link
          href="/learner/assessment/cat"
          className="px-4 py-2 bg-[#5a96b0] hover:bg-[#497c96] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Tiếp tục làm bài</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Theta Ability Estimation & Item Difficulty Progression */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Chỉ số Năng lực Dự báo ($\theta$)</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-[#5a96b0]">{thetaDisplay}</span>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/20 px-1.5 py-0.5 rounded">Tăng +0.3</span>
          </div>
          <p className="text-[11px] text-slate-400">Ước tính theo Thuật toán Rasch IRT</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Trình độ Dự kiến</span>
          <p className="text-sm font-bold text-white leading-snug">{level}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Chuẩn DigComp 3.0 Verified
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Tiến độ thích ứng</span>
            <span className="text-white font-mono">{itemCount}/{totalItems} câu</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden my-2">
            <div className="bg-[#5a96b0] h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-[11px] text-slate-400">Độ tin cậy thuật toán: 94.8%</p>
        </div>
      </div>
    </div>
  );
};
