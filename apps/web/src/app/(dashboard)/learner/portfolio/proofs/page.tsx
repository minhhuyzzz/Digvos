'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Github, 
  Link as LinkIcon,
  AlertCircle,
  Award,
  ChevronRight,
  ShieldCheck,
  Check,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function LearnerProofsPage() {
  const [proofTitle, setProofTitle] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [courseCategory, setCourseCategory] = useState('fullstack');
  const [isSimulatingAI, setIsSimulatingAI] = useState(false);
  const [aiEvaluatedScore, setAiEvaluatedScore] = useState<string | null>(null);

  const proofHistory = [
    { id: 'p_101', title: 'Xây dựng REST API NestJS & CSDL PostgreSQL', course: 'Lập trình Web Fullstack', date: '25/07/2026', scoreAI: '92/100', status: 'Đã phê duyệt', sbt: true, reviewer: 'ThS. Nguyễn Văn A' },
    { id: 'p_102', title: 'Báo cáo Phân tích An toàn Hệ thống Web & Penetration Test', course: 'An toàn Thông tin', date: '22/07/2026', scoreAI: '85/100', status: 'Đã phê duyệt', sbt: true, reviewer: 'Dr. Trần Thị B' },
    { id: 'p_103', title: 'Đồ án Microservices & Message Queue RabbitMQ', course: 'Lập trình Web Fullstack', date: 'Hôm nay', scoreAI: 'Chờ AI duyệt', status: 'Đang xử lý', sbt: false, reviewer: 'Hệ thống AI' },
  ];

  // Rubrics chi tiết cho AI Pre-grading
  const rubricsWeights = [
    { name: 'Kiến trúc RESTful API & OpenAPI 3.1', score: 95, max: 100 },
    { name: 'Tối ưu CSDL PostgreSQL (Indexes & Normalization)', score: 90, max: 100 },
    { name: 'Tích hợp chữ ký số Polygon ECDSA', score: 85, max: 100 },
    { name: 'Clean Code & Unit Testing Coverage', score: 92, max: 100 },
  ];

  const handleSimulateAIPreGrading = () => {
    if (!proofTitle) return;
    setIsSimulatingAI(true);
    setTimeout(() => {
      setIsSimulatingAI(false);
      setAiEvaluatedScore('92/100');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Upload className="w-6 h-6 text-[#0f172a]" /> Nộp Minh Chứng Đồ Án & Chấm Điểm AI Pre-Grading
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Nộp mã nguồn GitHub hoặc tệp báo cáo đồ án để AI Evaluator pre-grading tức thì trước khi đẩy sang Giảng viên duyệt.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/learner/portfolio/wallet"
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] font-bold rounded-xl transition-all flex items-center space-x-2 shadow-2xs"
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Ví Điểm & SBT</span>
          </Link>
        </div>
      </div>

      {/* Main Form & AI Evaluation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Primary Submission Form Area (65%) */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-5">
          <div className="border-b border-[#f1f5f9] pb-3 flex justify-between items-center">
            <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0f172a]" /> Form Nộp Minh Chứng Bài Tập / Đồ Án
            </h3>
            <span className="text-[11px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2.5 py-1 rounded border border-[#cbd5e1]">
              GPT-4o Pre-Grading Engine
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-[#0f172a] block">Tên Minh Chứng Đồ Án</label>
              <input
                type="text"
                value={proofTitle}
                onChange={(e) => setProofTitle(e.target.value)}
                placeholder="Ví dụ: Xây dựng RESTful API NestJS & Tích hợp PostgreSQL..."
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#0f172a] block">Chọn Khóa Học Liên Quan</label>
                <select
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                >
                  <option value="fullstack">Lập trình Web Fullstack Architecture</option>
                  <option value="security">An toàn Thông tin & Pentest Web</option>
                  <option value="ai">AI Generative & RAG Engine</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#0f172a] block">Đường Dẫn GitHub Repository</label>
                <div className="relative">
                  <Github className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/project..."
                    className="w-full pl-9 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#0f172a] block">Tải Lên Tệp Báo Cáo / Mã Nguồn (.ZIP, .PDF)</label>
              <div className="border-2 border-dashed border-[#cbd5e1] hover:border-[#0f172a] bg-[#f8fafc] rounded-xl p-6 text-center space-y-2 cursor-pointer transition-all">
                <Upload className="w-8 h-8 text-[#64748b] mx-auto" />
                <span className="font-bold text-[#0f172a] block">Kéo thả tệp vào đây hoặc Bấm để chọn tệp</span>
                <span className="text-[11px] text-[#64748b] block">Hỗ trợ ZIP, PDF, MP4 (Tối đa 50MB)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handleSimulateAIPreGrading}
                disabled={!proofTitle}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
                  proofTitle
                    ? 'bg-[#0f172a] hover:bg-[#1e293b] text-white cursor-pointer shadow-xs'
                    : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Chạy AI Chấm Điểm Pre-Grading Realtime</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right AI Evaluator Output Workspace (35%) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0f172a]" /> ĐÁNH GIÁ AI PRE-GRADING
              </h3>
              <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">
                GPT-4o
              </span>
            </div>

            {isSimulatingAI ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-6 h-6 border-2 border-[#0f172a] border-t-transparent rounded-full animate-spin mx-auto" />
                <span className="text-xs text-[#64748b] block font-bold">AI đang phân tích cấu trúc mã nguồn & Rubrics...</span>
              </div>
            ) : aiEvaluatedScore ? (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-center space-y-1">
                  <span className="text-[11px] text-[#64748b] block">Điểm Đề Xuất Từ AI</span>
                  <span className="text-3xl font-mono font-extrabold text-[#0f172a] block">{aiEvaluatedScore}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đủ điều kiện cấp chứng nhận SBT
                  </span>
                </div>

                {/* Rubrics Progress Bars */}
                <div className="space-y-3">
                  <span className="font-bold text-[#0f172a] block">Chi tiết tiêu chí Rubrics:</span>
                  {rubricsWeights.map((r, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] text-[#334155] font-bold">
                        <span>{r.name}</span>
                        <span>{r.score}/{r.max}</span>
                      </div>
                      <div className="w-full bg-[#e2e8f0] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#0f172a] h-full rounded-full" style={{ width: `${r.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-[11px] text-[#64748b] leading-relaxed p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                  <span className="font-bold text-[#0f172a] block">Phân tích tiêu chí Rubrics:</span>
                  <p>• Kiến trúc RESTful tuân thủ tiêu chuẩn OpenAPI 3.1.</p>
                  <p>• CSDL PostgreSQL được đánh Indexing tối ưu truy vấn.</p>
                  <p>• Đã gửi hồ sơ lên Hàng chờ Giảng viên duyệt chính thức.</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-center text-xs text-[#64748b] space-y-2">
                <AlertCircle className="w-5 h-5 text-[#94a3b8] mx-auto" />
                <span>Nhập tên minh chứng và bấm "Chạy AI Chấm Điểm" để nhận đánh giá Rubrics tự động.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Submitted Proofs Data Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
          <h3 className="font-bold text-sm text-[#0f172a]">Lịch Sử Minh Chứng Đã Nộp & Trạng Thái Phê Duyệt</h3>
          <span className="text-xs font-mono text-[#64748b]">Tổng số: {proofHistory.length} Minh chứng</span>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Tên minh chứng đồ án</th>
                <th className="p-3">Khóa học</th>
                <th className="p-3">Ngày nộp</th>
                <th className="p-3">Điểm AI đề xuất</th>
                <th className="p-3">Người duyệt</th>
                <th className="p-3 text-right">Trạng thái SBT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {proofHistory.map((p) => (
                <tr key={p.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{p.title}</td>
                  <td className="p-3 text-[#64748b]">{p.course}</td>
                  <td className="p-3 text-[#64748b]">{p.date}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{p.scoreAI}</td>
                  <td className="p-3 text-[#64748b]">{p.reviewer}</td>
                  <td className="p-3 text-right">
                    <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#0f172a] px-2 py-0.5 rounded border border-[#cbd5e1]">
                      {p.sbt ? 'Đã Đúc SBT' : 'Chờ duyệt'}
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
