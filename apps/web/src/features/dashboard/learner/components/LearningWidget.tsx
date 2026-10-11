'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const LearningWidget: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-slate-900">Tiếp tục học tập</h3>
      <div className="divide-y divide-slate-100">
        <div className="py-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-800">An toàn thông tin trong môi trường số</h4>
            <p className="text-xs text-slate-400 mt-0.5">Tiến độ: 80% • 45 phút còn lại</p>
          </div>
          <Link href="/learner/learning/courses" className="text-xs text-indigo-600 hover:underline flex items-center font-medium">
            Học tiếp <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        <div className="py-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Khai thác và tìm kiếm thông tin nâng cao</h4>
            <p className="text-xs text-slate-400 mt-0.5">Tiến độ: 45% • 2 giờ còn lại</p>
          </div>
          <Link href="/learner/learning/courses" className="text-xs text-indigo-600 hover:underline flex items-center font-medium">
            Học tiếp <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
