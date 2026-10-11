'use client';

import React from 'react';
import { Award, ShieldCheck, ExternalLink, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';

export interface SBTItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  tokenId: string;
  txHash: string;
  digCompLevel: string;
}

interface SBTCardWidgetProps {
  cert?: SBTItem;
}

const MOCK_CERT: SBTItem = {
  id: 'sbt_101',
  title: 'Chuyên Gia An Toàn Thông Tin & Quản Trị Dữ Liệu Số',
  issuer: 'Hội Đồng Khảo Thí DIGVOS (On-Chain)',
  issueDate: '15/07/2026',
  tokenId: '#8942-SBT-POLYGON',
  txHash: '0x3f8a92...e401',
  digCompLevel: 'Cấp độ 6 - Advanced',
};

export const SBTCardWidget: React.FC<SBTCardWidgetProps> = ({ cert = MOCK_CERT }) => {
  return (
    <div className="relative group overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-[#1e3442] via-slate-900 to-slate-900 border border-[#5a96b0]/40 shadow-xl text-white space-y-5 transition-all duration-300 hover:border-[#5a96b0]">
      {/* Holographic Metallic Shimmer Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 bg-[#5a96b0]/20 text-[#5a96b0] rounded-xl border border-[#5a96b0]/30">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5a96b0]">
              Soulbound Token (SBT)
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <Lock className="w-3 h-3" /> Non-Transferable On-Chain
            </div>
          </div>
        </div>

        <span className="px-2.5 py-1 text-[11px] font-extrabold bg-[#5a96b0]/20 text-[#5a96b0] rounded-lg border border-[#5a96b0]/30">
          {cert.tokenId}
        </span>
      </div>

      <div>
        <h4 className="font-black text-lg text-white leading-snug group-hover:text-[#5a96b0] transition-colors">
          {cert.title}
        </h4>
        <p className="text-xs text-slate-400 mt-1">Cấp bởi: <strong className="text-slate-200">{cert.issuer}</strong></p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 bg-white/5 rounded-2xl border border-white/10 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Trình độ DigComp</span>
          <span className="font-bold text-white">{cert.digCompLevel}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ngày đúc (Minted)</span>
          <span className="font-medium text-slate-300">{cert.issueDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
          Tx: {cert.txHash}
        </span>
        <Link
          href="/learner/portfolio/certificates"
          className="text-xs font-bold text-[#5a96b0] hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>Xác minh Blockchain</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
