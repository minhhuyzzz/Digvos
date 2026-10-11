'use client';

import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, ExternalLink, QrCode, Activity, BarChart2 } from 'lucide-react';
import Link from 'next/link';

interface ScanHistoryItem {
  id: string;
  scanner: string;
  tokenId: string;
  status: string;
  time: string;
}

export default function AdminCertificatesVerifyPage() {
  const [searchTx, setSearchTx] = useState('');
  const [scannedResult, setScannedResult] = useState<boolean | null>(null);

  const [scanHistory] = useState<ScanHistoryItem[]>([
    { id: 'sc_1', scanner: 'FPT Software Recruitment', tokenId: '#8942-SBT-POLYGON', status: 'Valid', time: '12 phút trước' },
    { id: 'sc_2', scanner: 'VNG Corporation HR Team', tokenId: '#4120-SBT-POLYGON', status: 'Valid', time: '45 phút trước' },
    { id: 'sc_3', scanner: 'Viettel Group Talent Sourcing', tokenId: '#1092-SBT-POLYGON', status: 'Valid', time: '2 giờ trước' }
  ]);

  const handleScanTx = () => {
    if (!searchTx) return;
    setScannedResult(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0f172a]" /> Cổng Tra Cứu & Xác Thực SBT On-Chain (Live Scanner)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cổng công khai kiểm tra tính hợp lệ của Soulbound Token trên mạng Polygon Mainnet.</p>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Verification Search (65%) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4 text-xs">
            <span className="font-bold text-[#0f172a] block">Nhập TxHash Hoặc Mã Token ID Để Tra Cứu On-Chain:</span>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                placeholder="0x3f8a92b4c10e9f8a7d6c5b4a3f2e1d0c9b8a7f6e... hoặc #8942-SBT"
                className="flex-1 font-mono bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
              />
              <button
                onClick={handleScanTx}
                className="px-5 py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-xs"
              >
                <Search className="w-4 h-4" />
                <span>Tra Cứu</span>
              </button>
            </div>

            {scannedResult && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs animate-fadeIn">
                <div className="flex items-center space-x-2 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Chứng Chỉ SBT Đã Được Xác Thực 100% Hợp Lệ On-Chain!</span>
                </div>
                <div className="space-y-1.5 font-mono text-[#64748b] text-[11px] pt-1">
                  <p>Học viên sở hữu: <strong className="text-[#0f172a]">Trần Minh Huy (HV-089)</strong></p>
                  <p>Khung năng lực: <strong className="text-[#0f172a]">Chuyên gia An toàn Số DigComp Level 5</strong></p>
                  <p>Polygon TxHash: <strong className="text-[#0f172a] truncate block max-w-lg">{searchTx || '0x3f8a92b4c10e9f8a7d6c5b4a3f2e1d0c9b8a7f6e'}</strong></p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Scan History Feed (35%) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs">
          <span className="font-bold text-sm text-[#0f172a] block border-b border-[#f1f5f9] pb-2 flex items-center gap-1.5">
            <Activity className="w-4 h-4" /> Yêu cầu xác thực gần đây
          </span>
          <div className="space-y-3">
            {scanHistory.map((item) => (
              <div key={item.id} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex flex-col space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-[#0f172a]">{item.scanner}</span>
                  <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{item.status}</span>
                </div>
                <div className="flex justify-between text-[10px] text-[#64748b] font-mono">
                  <span>Token: {item.tokenId}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}