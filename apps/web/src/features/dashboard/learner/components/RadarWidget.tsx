'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const RadarWidget: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Radar Năng lực Số (DigComp 3.0)</h3>
          <p className="text-xs text-slate-500">Bản đồ trực quan hóa 5 vùng năng lực cốt lõi của bạn.</p>
        </div>
        <Link href="/learner/analytics/radar" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center">
          Xem chi tiết
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>
      
      {/* Visual Radar Mock */}
      <div className="h-72 border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-2 max-w-sm px-4">
          <p className="text-sm font-semibold text-slate-700">Mô phỏng Biểu đồ Radar Năng lực</p>
          <p className="text-xs text-slate-400">
            (Dữ liệu thực tế: Tìm kiếm, Truyền thông, Sáng tạo nội dung, An toàn thông tin, Giải quyết vấn đề sẽ hiển thị tại đây thông qua biểu đồ Radar Chart của Recharts).
          </p>
        </div>
      </div>
    </div>
  );
};
