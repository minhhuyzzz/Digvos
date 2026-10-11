'use client';

import React from 'react';
import { Wallet } from 'lucide-react';
import Link from 'next/link';

export const WalletWidget: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Ví Blockchain & SBT</h3>
        <Wallet className="w-5 h-5 text-slate-400" />
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-3">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Địa chỉ ví kết nối</span>
        <code className="text-xs font-mono text-slate-700 bg-white border border-slate-200 px-2 py-1.5 rounded block truncate">
          0x71C...392A
        </code>
        <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
          <span>Số dư Gas Token</span>
          <span className="font-bold text-slate-700">0.024 ETH</span>
        </div>
      </div>
      <Link 
        href="/learner/portfolio/wallet" 
        className="w-full inline-flex items-center justify-center px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-semibold rounded-lg text-slate-700 transition"
      >
        Quản lý ví
      </Link>
    </div>
  );
};
