'use client';

import React from 'react';

export const ServerStatusWidget: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 mb-4">Trạng thái hạ tầng máy chủ</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-55 border border-slate-100 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">CPU Usage</span>
            <span className="text-slate-500">12%</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '12%' }}></div>
          </div>
        </div>

        <div className="p-4 bg-slate-55 border border-slate-100 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Memory Usage</span>
            <span className="text-slate-500">64%</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '64%' }}></div>
          </div>
        </div>

        <div className="p-4 bg-slate-55 border border-slate-100 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Database Status</span>
            <span className="text-emerald-600 font-bold flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
              Hoạt động
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-55 border border-slate-100 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Redis Cache</span>
            <span className="text-emerald-600 font-bold flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
              Kết nối
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
