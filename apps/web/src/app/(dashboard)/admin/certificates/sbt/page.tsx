'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cpu, ExternalLink, Zap, Search, Activity } from 'lucide-react';
import Link from 'next/link';

interface TransactionItem {
  id: string;
  studentName: string;
  studentCode: string;
  certName: string;
  txHash: string;
  gasCost: string;
  status: string;
  time: string;
}

export default function AdminSBTMasterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions] = useState<TransactionItem[]>([
    { id: 'tx_1', studentName: 'Trần Minh Huy', studentCode: 'HV-089', certName: 'Chuyên gia DigComp Level 5', txHash: '0x3f8a92b4c10e9f8a7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1e0f9a8b7c6d5e401', gasCost: '0.0024 MATIC', status: 'Success', time: '10 phút trước' },
    { id: 'tx_2', studentName: 'Lê Thị Thu Thảo', studentCode: 'HV-112', certName: 'Chuyên gia DigComp Level 4', txHash: '0x7b1c4d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7', gasCost: '0.0024 MATIC', status: 'Success', time: '2 giờ trước' },
    { id: 'tx_3', studentName: 'Phạm Hoàng Nam', studentCode: 'HV-145', certName: 'Chuyên gia DigComp Level 5', txHash: '0x2c4d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6f803', gasCost: '0.0024 MATIC', status: 'Success', time: '1 ngày trước' }
  ]);

  const filteredTxs = transactions.filter(t => 
    t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.txHash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0f172a]" /> Quản Lý Soulbound Tokens (SBT) & Polygon Smart Contract
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Giám sát tổng số chứng chỉ SBT đã phát hành on-chain, địa chỉ hợp đồng & phí Gas hệ thống.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Polygon Mainnet Live</span>
          </div>
        </div>
      </div>

      {/* Contract Metrics Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Contract Address</span>
          <span className="font-mono font-bold text-[#0f172a] block truncate">0x71C7656EC7ab88b098defB751B7401B5f6d89B4</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Tổng số SBT đã đúc</span>
          <span className="font-mono font-bold text-[#0f172a] block text-xl">1,420 Tokens</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Tổng MATIC đã tiêu thụ</span>
          <span className="font-mono font-bold text-[#0f172a] block text-xl">3.408 MATIC</span>
        </div>
        <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs space-y-1">
          <span className="text-[#64748b] text-[11px] block">Loại hình token</span>
          <span className="font-mono font-bold text-emerald-600 block text-sm">ERC-5192 Soulbound Token</span>
        </div>
      </div>

      {/* Filter and Search toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo mã giao dịch, tên sinh viên..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5"><Activity className="w-4 h-4" /> Lịch sử giao dịch đúc SBT gần đây</h3>
          <span className="font-mono text-[#64748b]">Tổng số: {filteredTxs.length} giao dịch</span>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Học viên</th>
                <th className="p-3">Mã HV</th>
                <th className="p-3">Tên chứng chỉ</th>
                <th className="p-3">Mã Giao dịch (TxHash)</th>
                <th className="p-3">Phí Gas</th>
                <th className="p-3">Thời gian</th>
                <th className="p-3 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredTxs.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{tx.studentName}</td>
                  <td className="p-3 font-mono text-[#64748b]">{tx.studentCode}</td>
                  <td className="p-3 text-[#64748b]">{tx.certName}</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold flex items-center gap-1">
                    <span className="truncate max-w-[140px]">{tx.txHash}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#64748b] cursor-pointer" />
                  </td>
                  <td className="p-3 font-mono text-[#64748b]">{tx.gasCost}</td>
                  <td className="p-3 text-[#64748b]">{tx.time}</td>
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
  );
}