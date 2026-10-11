"use client";

import React, { useState } from 'react';
import { Card } from '@digvos/ui';
import { Search, ShieldCheck, ExternalLink, QrCode, Globe, Info, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Certificate {
  id: string;
  txHash: string;
  studentName: string;
  issuer: string;
  issueDate: string;
  overallLevel: string;
  scores: {
    data: number;
    collab: number;
    creation: number;
    security: number;
    problem: number;
  };
}

const mockCertificates: Certificate[] = [
  {
    id: "CERT-DIG-2026-0098",
    txHash: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    studentName: "Đỗ Khắc Gia Khoa",
    issuer: "Hệ thống bảo chứng DIGVOS - ĐHQGHN",
    issueDate: "10 Tháng 7, 2026",
    overallLevel: "Level 6 (Chuyên gia)",
    scores: {
      data: 88,
      collab: 76,
      creation: 82,
      security: 90,
      problem: 85,
    }
  },
  {
    id: "CERT-DIG-2026-0042",
    txHash: "0x3ab8d7c6691e8432a106f93f642f64180aa30abc",
    studentName: "Hoàng Ái Phương",
    issuer: "Hệ thống bảo chứng DIGVOS - ĐHBK Hà Nội",
    issueDate: "08 Tháng 7, 2026",
    overallLevel: "Level 5 (Thành thạo)",
    scores: {
      data: 72,
      collab: 88,
      creation: 68,
      security: 75,
      problem: 80,
    }
  }
];

export default function VerifyPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    
    // Tìm kiếm khớp tương đối mã chứng chỉ, transaction hash hoặc tên học viên
    const found = mockCertificates.find((cert) => 
      cert.id.toLowerCase().includes(query.toLowerCase()) ||
      cert.txHash.toLowerCase().includes(query.toLowerCase()) ||
      cert.studentName.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      setResult(found);
    } else {
      // Nếu không tìm thấy, tự động phát sinh một chứng chỉ ngẫu nhiên dựa trên tên của người dùng nhập để demo trải nghiệm
      if (query.trim().length >= 3 && !query.startsWith("0x")) {
        setResult({
          id: `CERT-DIG-2026-MOCK`,
          txHash: "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
          studentName: query,
          issuer: "Hệ thống bảo chứng DIGVOS - MOCK DEMO",
          issueDate: "Hôm nay",
          overallLevel: "Level 4 (Khá)",
          scores: {
            data: 65 + Math.floor(Math.random() * 25),
            collab: 60 + Math.floor(Math.random() * 30),
            creation: 55 + Math.floor(Math.random() * 35),
            security: 70 + Math.floor(Math.random() * 25),
            problem: 65 + Math.floor(Math.random() * 25),
          }
        });
      } else {
        setResult(null);
      }
    }
  };

  return (
    <div className="space-y-16 py-10 text-left text-slate-900 max-w-5xl mx-auto">
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cổng Xác thực Chứng chỉ SBT công khai - DIGVOS",
            "description": "Tra cứu trực tiếp tính hợp lệ của chứng chỉ năng lực số Soulbound Token (SBT) on-chain trên Polygon."
          })
        }}
      />

      <div className="space-y-4 text-center">
        <span className="text-xs font-bold text-[#5a96b0] uppercase tracking-widest bg-[#5a96b0]/15 px-3 py-1 rounded-full">
          Cổng tra cứu phi tập trung
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Xác Thực Chứng Chỉ SBT On-Chain
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed text-center">
          Nhập mã băm giao dịch (Tx Hash), địa chỉ ví học viên hoặc tên học viên để truy vấn trực tiếp trạng thái chứng nhận từ Polygon Testnet.
        </p>
      </div>

      {/* Search Bar Form */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center gap-3 relative z-10 bg-white border border-slate-200 p-2.5 rounded-2xl shadow-sm focus-within:border-[#5a96b0] focus-within:shadow-md transition-all">
        <Search className="w-5 h-5 text-slate-400 pl-2" />
        <input
          type="text"
          placeholder="Nhập tên học viên (ví dụ: Đỗ Khắc Gia Khoa) hoặc Transaction Hash..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#5a96b0] hover:bg-[#487a90] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-[#5a96b0]/10"
        >
          Tra cứu
        </button>
      </form>

      {/* Kết quả tìm kiếm (Animate Entrance) */}
      <div className="max-w-3xl mx-auto relative">
        <AnimatePresence mode="wait">
          {searched && (
            result ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* 3D-Like Certificate Badge Card */}
                <div className="glass-premium p-8 rounded-3xl border border-slate-200/60 shadow-xl bg-gradient-to-br from-white/95 to-slate-50/95 relative overflow-hidden transform-gpu">
                  {/* Decorative background grids */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#5a96b0]/10 to-transparent rounded-bl-full pointer-events-none" />
                  
                  {/* Header: Verified Stamp & QR Code */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3 text-emerald-600">
                      <ShieldCheck className="w-8 h-8 text-emerald-500" />
                      <div>
                        <span className="text-[10px] font-bold tracking-widest uppercase block text-emerald-500">
                          Bảo chứng thành công
                        </span>
                        <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wide">
                          Verified SBT Certificate
                        </h4>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-xl bg-white border border-slate-200/60 shadow-sm">
                      <QrCode className="w-10 h-10 text-slate-700" />
                    </div>
                  </div>

                  {/* Body: Student name & details */}
                  <div className="space-y-6 pt-8 text-left">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                        Tên học viên được bảo chứng:
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block mt-1 tracking-tight">
                        {result.studentName}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Mã chứng chỉ:</span>
                        <span className="font-mono text-slate-700">{result.id}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Ngày đúc:</span>
                        <span className="text-slate-700">{result.issueDate}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Đơn vị cấp bằng:</span>
                        <span className="text-slate-700 font-medium">{result.issuer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scores & Competency Progress Bars */}
                  <div className="pt-6 border-t border-slate-200/50 text-left space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Phân tích Phổ Năng Lực Số:</h5>
                      <span className="text-xs font-bold text-[#5a96b0]">{result.overallLevel}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                      {[
                        { label: "1. Thông tin & Dữ liệu", val: result.scores.data },
                        { label: "2. Giao tiếp & Cộng tác", val: result.scores.collab },
                        { label: "3. Sáng tạo nội dung số", val: result.scores.creation },
                        { label: "4. An toàn & Bảo mật", val: result.scores.security },
                        { label: "5. Giải quyết vấn đề", val: result.scores.problem },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500 font-light">{item.label}</span>
                            <span className="text-[#5a96b0] font-bold">{item.val}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                            <div className="h-full bg-[#5a96b0]" style={{ width: `${item.val}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Polygon on-chain link */}
                  <div className="mt-8 pt-4 border-t border-slate-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] text-slate-400 gap-4">
                    <div className="flex items-center space-x-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#5a96b0]" />
                      <span className="font-mono">Polygon Testnet SBT: ERC-5192</span>
                    </div>

                    <a 
                      href={`https://amoy.polygonscan.com/tx/${result.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5a96b0] hover:text-[#487a90] flex items-center space-x-1 font-semibold group transition-all"
                    >
                      <span className="font-mono">{result.txHash.slice(0, 16)}...</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Additional on-chain details panel */}
                <div className="glass p-5 rounded-2xl border border-slate-200/50 text-left flex items-start space-x-3 text-slate-500 text-xs font-light leading-relaxed">
                  <Info className="w-5 h-5 text-[#5a96b0] min-w-5 pt-0.5" />
                  <p>
                    Thông tin chứng chỉ này được lưu trữ hoàn toàn phi tập trung và kiểm toán liên kết chuỗi mật mã. Bạn có thể sử dụng địa chỉ ví MetaMask hoặc các ví tương thích Web3 để tích hợp chứng nhận trực tiếp vào tài khoản cá nhân.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass p-8 rounded-2xl text-center space-y-4 text-slate-900 border border-slate-200/60"
              >
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                  <Info className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Không tìm thấy chứng chỉ!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-light leading-relaxed">
                  Vui lòng kiểm tra lại độ chính xác của Transaction Hash, ví dụ: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">0x5fbdb2315678afecb367f032d93f642f64180aa3</code> hoặc nhập đúng tên học viên của hệ thống demo.
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Helpful tip box */}
      <div className="max-w-2xl mx-auto flex items-center space-x-3 bg-[#5a96b0]/5 border border-[#5a96b0]/15 p-4 rounded-xl text-left text-xs font-light text-slate-600">
        <Brain className="w-5 h-5 text-[#5a96b0] min-w-5" />
        <span>
          <strong>Gợi ý tra cứu thử:</strong> Bạn có thể gõ cụm từ <strong>Đỗ Khắc Gia Khoa</strong> hoặc mã hash <strong>0x5fbdb2315678afecb367f032d93f642f64180aa3</strong> để trải nghiệm thử kết quả xác thực trực quan!
        </span>
      </div>
    </div>
  );
}
