'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const CandidateWidget: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Ứng viên tiềm năng khớp năng lực</h3>
          <p className="text-xs text-slate-500">Ứng viên tự động được gợi ý từ hệ thống AI dựa trên DigComp 3.0.</p>
        </div>
        <Link href="/org/recruitment/candidates" className="text-xs text-indigo-600 font-semibold hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        <div className="py-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Trần Thị B</h4>
            <p className="text-xs text-slate-500 mt-0.5">Khớp 92% • Kỹ năng: Sáng tạo nội dung (Level 5)</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>
        <div className="py-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Phạm Văn C</h4>
            <p className="text-xs text-slate-500 mt-0.5">Khớp 88% • Kỹ năng: Giải quyết vấn đề (Level 6)</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
