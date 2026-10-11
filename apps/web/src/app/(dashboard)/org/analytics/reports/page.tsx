'use client';

import React from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';

export default function analyticsreportsPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 grayscale">
      <PageHeader 
        title="Reports" 
        description="Báo cáo và thống kê về reports."
      >
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl transition-all">
          Xuất báo cáo
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
            <div className="h-8 w-16 bg-slate-800 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-[400px] flex flex-col">
           <div className="h-5 w-40 bg-slate-800 rounded mb-6" />
           <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl w-full" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-[400px] flex flex-col">
           <div className="h-5 w-32 bg-slate-800 rounded mb-6" />
           <div className="flex-1 bg-slate-50 border border-slate-100 rounded-full w-full" />
        </div>
      </div>
    </div>
  );
}