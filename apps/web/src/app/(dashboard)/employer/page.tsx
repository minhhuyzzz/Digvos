'use client';

import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Search, ShieldCheck, Briefcase, CheckCircle, RefreshCw, Eye } from 'lucide-react';

export default function EmployerDashboard() {
  const [verifyInput, setVerifyInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInput) return;
    setIsVerifying(true);
    setVerificationResult(null);

    // Simulate smart contract verify call
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult({
        owner: 'Đỗ Khắc Gia Khoa',
        wallet: '0x9a8C7d...e8f9',
        certName: 'Kỹ năng Viết Prompt AI - Level 3',
        date: '2026-07-09',
        txHash: '0xe4bce9...982f8d',
        valid: true,
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Cổng Tuyển Dụng & Xác Thực</h1>
        <p className="text-sm text-slate-400 font-light">Tìm kiếm nhân tài năng lực số thực tế và xác minh tức thời bằng Blockchain SBT.</p>
      </div>

      {/* Verification section & Job Campaign */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SBT Blockchain Verification Lookup */}
        <Card variant="premium" className="lg:col-span-1 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <span>Tra Cứu Chứng Chỉ SBT (On-chain)</span>
          </h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Nhập Transaction Hash hoặc Địa chỉ ví ứng viên để kiểm tra trực tiếp trạng thái trên Smart Contract Polygon Amoy.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              placeholder="0x... hoặc Tx Hash"
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-400 text-slate-200"
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full text-xs font-semibold py-3 flex justify-center items-center space-x-2"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang kết nối Polygon...</span>
                </>
              ) : (
                <span>Xác minh Chứng chỉ</span>
              )}
            </Button>
          </form>

          {/* Verification Result Mockup */}
          {verificationResult && (
            <div className="bg-brand-500/5 border border-brand-500/20 p-4 rounded-xl space-y-3 text-xs animate-fadeIn">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-emerald-400">
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>HỢP LỆ (ON-CHAIN VERIFIED)</span>
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400">Học viên: <strong className="text-white">{verificationResult.owner}</strong></p>
                <p className="text-slate-400">Chứng chỉ: <strong className="text-white">{verificationResult.certName}</strong></p>
                <p className="text-slate-400">Ví: <code className="text-brand-400">{verificationResult.wallet}</code></p>
                <p className="text-slate-400">Ngày đúc: <span className="text-white">{verificationResult.date}</span></p>
              </div>
            </div>
          )}
        </Card>

        {/* Talent Smart Filters */}
        <Card variant="default" className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Search className="w-5 h-5 text-brand-400" />
              <span>Bộ lọc Tài năng Radar Thông minh</span>
            </h3>
            <span className="text-xs text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">AI Sàng lọc</span>
          </div>

          {/* Filters mockup */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select className="bg-slate-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
              <option>Kỹ năng: Xử lý dữ liệu</option>
              <option>Kỹ năng: Giao tiếp số</option>
              <option>Kỹ năng: An toàn số</option>
            </select>
            <select className="bg-slate-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
              <option>Yêu cầu: Level 3 (Advanced)</option>
              <option>Yêu cầu: Level 2 (Intermediate)</option>
            </select>
            <select className="bg-slate-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
              <option>Phân nhóm AI: [AI-E] Thực thi</option>
              <option>Phân nhóm AI: [AI-I] Sáng tạo</option>
            </select>
          </div>

          {/* Talents matched list */}
          <div className="space-y-4 pt-2">
            {[
              { name: 'Đỗ Khắc Gia Khoa', match: '98%', scores: 'Dữ liệu: Lvl 3 | Prompt: Lvl 3', group: '[AI-I] Sáng tạo' },
              { name: 'Hoàng Ái Phương', match: '94%', scores: 'Dữ liệu: Lvl 3 | An toàn: Lvl 2', group: '[AI-E] Thực thi' },
              { name: 'Nguyễn Tiến Đạt', match: '89%', scores: 'Giao tiếp: Lvl 3 | Sáng tạo: Lvl 2', group: '[AI-E] Thực thi' },
            ].map((candidate, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <h4 className="text-sm font-bold text-white">{candidate.name}</h4>
                    <span className="text-[10px] font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">{candidate.group}</span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">{candidate.scores}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Độ tương thích</span>
                    <span className="text-xs font-bold text-emerald-400">{candidate.match}</span>
                  </div>
                  <Button variant="glass" size="sm" className="text-xs py-1.5 px-3">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Campaign Manager */}
      <Card variant="default" className="space-y-6">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-brand-400" />
          <span>Chiến dịch tuyển dụng tích hợp</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-white/5 p-5 rounded-xl space-y-3">
            <h4 className="text-sm font-bold text-white">Chuyên viên Phân tích Dữ liệu số (Data Analyst)</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Yêu cầu ma trận năng lực tối thiểu: Xử lý dữ liệu Level 3, Sáng tạo nội dung Level 2.
            </p>
            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-slate-500">Đã ứng tuyển: <strong>14</strong></span>
              <span className="text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">Đang chạy</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/5 p-5 rounded-xl space-y-3">
            <h4 className="text-sm font-bold text-white">Kỹ sư Prompt AI Đào tạo (Prompt Engineer)</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Yêu cầu ma trận năng lực tối thiểu: Sáng tạo nội dung Level 3, Giải quyết vấn đề Level 3.
            </p>
            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-slate-500">Đã ứng tuyển: <strong>8</strong></span>
              <span className="text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-white/5">Tạm dừng</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
