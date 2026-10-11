'use client';

import React from 'react';
import { BadgeAlert } from 'lucide-react';

export const SecurityLogWidget: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Cảnh báo bảo mật gần đây</h3>
        <BadgeAlert className="w-5 h-5 text-rose-500" />
      </div>
      <div className="space-y-3">
        <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-lg space-y-1">
          <div className="flex justify-between text-[10px] text-rose-600 font-bold">
            <span>Rate Limiting Triggered</span>
            <span>10 phút trước</span>
          </div>
          <p className="text-xs font-semibold text-slate-800">Spam đăng nhập IP 192.168.1.102</p>
        </div>
      </div>
    </div>
  );
};
