'use client';

import React, { useState } from 'react';
import { Wallet, ShieldCheck, ArrowLeft, ExternalLink, RefreshCw, Award, Star, Gift } from 'lucide-react';
import Link from 'next/link';

interface TxHistory {
  id: string;
  tokenId: string;
  certName: string;
  txHash: string;
  date: string;
  status: string;
}

interface PointActivity {
  id: string;
  action: string;
  points: string;
  date: string;
}

export default function LearnerWalletPage() {
  const [cumulativeXp, setCumulativeXp] = useState('2,450 XP');
  const [rewardPoints, setRewardPoints] = useState('1,200 Pts');
  const [txHistory, setTxHistory] = useState<TxHistory[]>([
    { id: 'tx_1', tokenId: '#8942-SBT', certName: 'Chuyên gia An toàn Số DigComp Level 5', txHash: '0x3f8a92b4c10e9f8a7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1e0f9a8b7c6d5e401', date: '28/07/2026', status: 'Success' },
    { id: 'tx_2', tokenId: '#4120-SBT', certName: 'Chuyên gia Giao tiếp & Cộng tác số Level 4', txHash: '0x7b1c4d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7', date: '15/07/2026', status: 'Success' }
  ]);

  const [pointHistory] = useState<PointActivity[]>([
    { id: 'p_1', action: 'Hoàn thành bài thi thích ứng CAT số 4', points: '+150 Pts', date: 'Hôm qua' },
    { id: 'p_2', action: 'Được phê duyệt đồ án PostgreSQL', points: '+350 Pts', date: '25/07/2026' },
    { id: 'p_3', action: 'Chuỗi học tập liên tục 7 ngày (Streak Reward)', points: '+100 Pts', date: '24/07/2026' }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Ví Điểm Tích Lũy & Thưởng Học Viên / Nhân Viên</h1>
          <p className="text-xs text-[#64748b] mt-1">Theo dõi điểm tích lũy học tập, điểm thưởng đổi quà và danh sách chứng chỉ số Soulbound Token (SBT) xác thực on-chain.</p>
        </div>
        <Link href="/learner" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Về Trang chủ</span>
        </Link>
      </div>

      {/* Point Status Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-2 text-xs">
          <span className="text-[#64748b] block font-bold flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Tổng Điểm Tích Lũy (Cumulative XP):</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block font-mono">{cumulativeXp}</span>
          <span className="text-[10px] text-[#64748b] block">Tổng số điểm tích lũy trọn đời dùng để xếp hạng và thăng cấp DigComp.</span>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-2 text-xs">
          <span className="text-[#64748b] block font-bold flex items-center gap-1"><Gift className="w-4 h-4 text-rose-500" /> Điểm Thưởng Đổi Quà (Reward Points):</span>
          <span className="text-2xl font-extrabold text-rose-600 block font-mono">{rewardPoints}</span>
          <button className="mt-1 px-3 py-1.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-[10px] font-bold rounded-md transition-all">
            Đổi quà tặng & Voucher
          </button>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-2 text-xs">
          <span className="text-[#64748b] block font-bold flex items-center gap-1"><Award className="w-4 h-4 text-purple-600" /> Huy hiệu năng lực đạt được:</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block font-mono">3 Huy Hiệu</span>
          <span className="text-[10px] text-[#64748b] block">Minh chứng năng lực số xuất sắc được ghi nhận trong doanh nghiệp/trường học.</span>
        </div>
      </div>

      {/* Point History & SBT Certificate History layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Point History (40%) */}
        <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-[#f1f5f9] pb-3 text-xs font-bold text-[#0f172a]">
            Lịch sử biến động điểm thưởng
          </div>
          <div className="space-y-3 text-xs">
            {pointHistory.map((item) => (
              <div key={item.id} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#0f172a] block">{item.action}</span>
                  <span className="text-[10px] text-[#64748b] font-mono">{item.date}</span>
                </div>
                <span className="font-mono font-bold text-emerald-600 text-xs">{item.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: SBT Certificate History (70%) */}
        <div className="lg:col-span-7 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#f1f5f9] pb-3 text-xs">
            <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Thẩm định chứng chỉ số Soulbound Token (SBT)
            </h3>
            <p className="text-[11px] text-[#64748b] mt-0.5">Các chứng chỉ số được đúc tự động bởi hệ thống lên Polygon Network nhằm phục vụ xác thực năng lực công khai, minh bạch.</p>
          </div>

          <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left divide-y divide-[#e2e8f0]">
              <thead className="bg-[#f8fafc] font-bold text-[#334155]">
                <tr>
                  <th className="p-3">Mã Token ID</th>
                  <th className="p-3">Tên chứng chỉ SBT</th>
                  <th className="p-3">Giao dịch Hash (TxHash)</th>
                  <th className="p-3">Ngày nhận</th>
                  <th className="p-3 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {txHistory.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#f8fafc]">
                    <td className="p-3 font-mono font-bold text-[#0f172a]">{tx.tokenId}</td>
                    <td className="p-3 font-bold text-[#0f172a]">{tx.certName}</td>
                    <td className="p-3 font-mono text-emerald-600 font-bold flex items-center gap-1">
                      <span className="truncate max-w-[120px]">{tx.txHash}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#64748b] cursor-pointer" />
                    </td>
                    <td className="p-3 font-mono text-[#64748b]">{tx.date}</td>
                    <td className="p-3 text-right">
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}