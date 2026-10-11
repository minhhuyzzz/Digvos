'use client';

import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Download, 
  Search, 
  CheckCircle2, 
  Copy, 
  QrCode,
  Check,
  Shield,
  Layers,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function LearnerCertificatesPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCertIndex, setActiveCertIndex] = useState<number>(0);

  const certificates = [
    {
      id: 1,
      title: 'Chuyên gia An toàn Thông tin Số (DigComp 3.0)',
      code: '#8942-SBT-POLYGON',
      level: 'Level 5 (Advanced)',
      issueDate: '15/07/2026',
      issuer: 'Hội Đồng Khảo Thí Digvos Platform & ĐH Bách Khoa',
      txHash: '0x3f8a92b4c10e9f8a7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1e0f9a8b7c6d5e401',
      domain: 'Domain 4 — An toàn & Bảo mật số'
    },
    {
      id: 2,
      title: 'Kỹ năng Vận hành Dữ liệu & Phân tích DigComp',
      code: '#4120-SBT-POLYGON',
      level: 'Level 4 (Intermediate)',
      issueDate: '02/06/2026',
      issuer: 'Hội Đồng Khảo Thí Digvos Platform',
      txHash: '0x7b1c4d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7',
      domain: 'Domain 1 — Vận hành Dữ liệu'
    },
    {
      id: 3,
      title: 'Sáng tạo Nội dung Số & Prompt AI Generative',
      code: '#1092-SBT-POLYGON',
      level: 'Level 4 (Intermediate)',
      issueDate: '18/05/2026',
      issuer: 'Hội Đồng Khảo Thí Digvos Platform',
      txHash: '0x2c4d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6f803',
      domain: 'Domain 3 — Sáng tạo Nội dung'
    }
  ];

  const filteredCerts = certificates.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyTx = (tx: string, idx: number) => {
    navigator.clipboard.writeText(tx);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const activeCert = filteredCerts[activeCertIndex] || certificates[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Award className="w-6 h-6 text-[#0f172a]" /> Kho Lưu Trữ Chứng Chỉ Số Soulbound Token (SBT)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Chứng chỉ số không thể chuyển nhượng (Non-transferable SBT) lưu trữ vĩnh viễn trên Polygon Mainnet.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Smart Contract Polygon Live</span>
          </div>
        </div>
      </div>

      {/* Grid layout: Left list, Right Certificate Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Certificates list (40%) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm chứng chỉ..."
                className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredCerts.map((cert, idx) => (
              <div
                key={cert.id}
                onClick={() => setActiveCertIndex(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 text-xs ${
                  activeCertIndex === idx
                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                    : 'bg-white text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                    activeCertIndex === idx ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#334155]'
                  }`}>
                    {cert.domain}
                  </span>
                  <span className="text-[10px] font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </span>
                </div>
                <h4 className="font-bold leading-snug">{cert.title}</h4>
                <p className="text-[10px] opacity-80">{cert.code}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: High-Fidelity Certificate Mockup Viewer (60%) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-6">
            <div className="border-b border-[#f1f5f9] pb-3 flex justify-between items-center text-xs">
              <span className="font-bold text-[#64748b] uppercase tracking-wider text-[10px]">Xem Trước Bản In Chứng Chỉ SBT</span>
              <button className="px-3.5 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0f172a] font-bold rounded-lg flex items-center space-x-1.5 transition-all">
                <Download className="w-4 h-4" />
                <span>Tải PDF Bản Gốc</span>
              </button>
            </div>

            {/* Simulated Printed Certificate */}
            <div className="border-4 double border-[#0f172a] p-8 rounded-xl bg-white text-center space-y-6 relative overflow-hidden">
              {/* Decorative Corner Borders */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#0f172a]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#0f172a]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#0f172a]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#0f172a]" />

              <div className="space-y-1">
                <span className="font-mono text-[10px] tracking-widest text-[#64748b] block">SOULBOUND TOKEN CERTIFICATE</span>
                <h2 className="text-lg font-extrabold text-[#0f172a] tracking-wide">CHỨNG CHỈ NĂNG LỰC SỐ</h2>
                <span className="text-[11px] text-[#64748b] block">{activeCert.domain}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-[#64748b] block">Chứng nhận học viên</span>
                <h3 className="text-base font-extrabold text-[#0f172a]">TRẦN MINH HUY</h3>
                <p className="text-[11px] text-[#64748b] max-w-sm mx-auto leading-relaxed">
                  Đã hoàn thành xuất sắc đợt thi đánh giá năng lực thích ứng CAT và nộp minh chứng đồ án đạt chuẩn chất lượng Rubrics Châu Âu.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4 border-t border-[#f1f5f9] text-[11px] text-left">
                <div className="space-y-1 font-mono text-[#64748b]">
                  <p>Cấp độ năng lực: <strong className="text-[#0f172a]">{activeCert.level}</strong></p>
                  <p>Mã token: <strong className="text-[#0f172a]">{activeCert.code}</strong></p>
                  <p>Ngày phát hành: <strong className="text-[#0f172a]">{activeCert.issueDate}</strong></p>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <div className="w-14 h-14 bg-white border border-[#cbd5e1] p-1 rounded flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-[#0f172a]" />
                  </div>
                  <span className="text-[8px] text-[#64748b] mt-1 font-mono">Quét để kiểm tra On-Chain</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#f1f5f9] text-[9px] text-[#64748b] font-mono text-center truncate max-w-lg mx-auto">
                Polygon TxHash: {activeCert.txHash}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}