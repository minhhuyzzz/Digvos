'use client';

import React from 'react';
import { UsersRound, BarChart3, TrendingUp } from 'lucide-react';

export const ClassHeatmapWidget: React.FC = () => {
  const levels = [
    { code: 'F1', name: 'Foundation 1', count: 2, color: 'bg-[#5a96b0]/20 text-[#5a96b0]' },
    { code: 'F2', name: 'Foundation 2', count: 5, color: 'bg-[#5a96b0]/30 text-[#5a96b0]' },
    { code: 'I3', name: 'Intermediate 3', count: 18, color: 'bg-[#5a96b0]/50 text-white' },
    { code: 'I4', name: 'Intermediate 4', count: 24, color: 'bg-[#5a96b0]/80 text-white font-bold' },
    { code: 'A5', name: 'Advanced 5', count: 12, color: 'bg-[#5a96b0] text-white font-bold' },
    { code: 'A6', name: 'Advanced 6', count: 6, color: 'bg-[#497c96] text-white font-bold' },
    { code: 'S7', name: 'Specialized 7', count: 2, color: 'bg-[#314958] text-white font-bold' },
    { code: 'S8', name: 'Specialized 8', count: 1, color: 'bg-slate-900 text-white font-bold' },
  ];

  const totalStudents = levels.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#5a96b0]/10 text-[#5a96b0] rounded-xl">
            <UsersRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Ma Trận Nhiệt Năng Lực Lớp Học</h3>
            <p className="text-xs text-slate-500">Phân bố 70 học viên theo 8 Cấp độ Thành thạo DigComp 3.0</p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#5a96b0] bg-[#5a96b0]/10 px-3 py-1 rounded-full border border-[#5a96b0]/20">
          Tổng: {totalStudents} Học sinh
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {levels.map((lvl) => {
          const percent = Math.round((lvl.count / totalStudents) * 100);
          return (
            <div
              key={lvl.code}
              className={`p-3.5 rounded-2xl border border-slate-200/60 flex flex-col justify-between transition-all hover:scale-[1.02] ${lvl.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-80">{lvl.code}</span>
                <span className="text-xs font-extrabold">{percent}%</span>
              </div>
              <div className="my-2">
                <span className="text-2xl font-black block">{lvl.count}</span>
                <span className="text-[11px] opacity-90 truncate block">{lvl.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
