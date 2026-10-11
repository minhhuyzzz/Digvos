'use client';

import React from 'react';

export const DeadlineWidget: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-slate-900">Thời hạn sắp tới</h3>
      <div className="space-y-3">
        <div className="flex items-start space-x-3 p-3 bg-rose-50/50 border border-rose-100 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
          <div className="flex-1 space-y-1">
            <p className="text-xs font-bold text-slate-800">Nộp minh chứng Sáng tạo nội dung</p>
            <p className="text-[10px] text-rose-600 font-medium">Hết hạn: Ngày mai, 23:59</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 bg-amber-50/50 border border-amber-100 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
          <div className="flex-1 space-y-1">
            <p className="text-xs font-bold text-slate-800">Bài kiểm tra giữa kỳ DigComp 3.0</p>
            <p className="text-[10px] text-amber-600 font-medium">Hết hạn: 3 ngày nữa</p>
          </div>
        </div>
      </div>
    </div>
  );
};
