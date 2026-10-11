'use client';

import React from 'react';
import Link from 'next/link';

export const VerificationWidget: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-slate-900">Tra cứu nhanh Chứng chỉ</h3>
      <p className="text-xs text-slate-500 leading-relaxed">
        Nhập mã chứng chỉ của ứng viên để kiểm tra tính hợp lệ trên Blockchain.
      </p>
      <div className="space-y-2">
        <input 
          type="text" 
          placeholder="Ví dụ: CERT-123456" 
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <Link 
          href="/org/verification/verify"
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white shadow-sm transition"
        >
          Kiểm tra tính toàn vẹn
        </Link>
      </div>
    </div>
  );
};
