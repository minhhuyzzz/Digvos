'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  Github, 
  ExternalLink, 
  ChevronRight,
  User,
  MessageSquare,
  Award,
  AlertCircle,
  Undo2
} from 'lucide-react';
import Link from 'next/link';

export default function TeacherPortfolioReviewPage() {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>('sub_101');
  const [teacherScore, setTeacherScore] = useState<number>(94);
  const [teacherComment, setTeacherComment] = useState<string>('Đồ án tuân thủ tốt kiến trúc RESTful NestJS, CSDL PostgreSQL được thiết kế chuẩn hóa 3NF.');
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const submissions = [
    {
      id: 'sub_101',
      studentName: 'Trần Minh Huy',
      studentCode: 'HV-2026-089',
      title: 'Xây dựng REST API NestJS & CSDL PostgreSQL',
      course: 'Lập trình Web Fullstack',
      date: '25/07/2026',
      aiScore: '94/100',
      githubUrl: 'https://github.com/mhuyyzzz/digvos-backend-api',
      rubrics: [
        { name: 'Chuẩn RESTful OpenAPI 3.1', score: '25/25', pass: true },
        { name: 'Tối ưu Indexing PostgreSQL 3NF', score: '24/25', pass: true },
        { name: 'Xác thực JWT & Bcrypt Password', score: '25/25', pass: true },
        { name: 'Clean Architecture & Unit Test', score: '20/25', pass: true },
      ]
    },
    {
      id: 'sub_102',
      studentName: 'Lê Thị Thu Thảo',
      studentCode: 'HV-2026-112',
      title: 'Báo cáo Pentest Web & Mã Hóa Chữ Ký ECDSA',
      course: 'An toàn Thông tin',
      date: '24/07/2026',
      aiScore: '88/100',
      githubUrl: 'https://github.com/thao-le/security-audit-report',
      rubrics: [
        { name: 'Phân tích lỗ hổng OWASP Top 10', score: '22/25', pass: true },
        { name: 'Thực thi mã hóa ECDSA Polygon', score: '22/25', pass: true },
      ]
    }
  ];

  const activeSub = submissions.find(s => s.id === selectedSubmissionId) || submissions[0];

  const handleApproveAndSendToSBT = () => {
    setIsApproved(true);
    setTimeout(() => setIsApproved(false), 2000);
  };

  const handleRejectSubmit = () => {
    setShowRejectModal(false);
    alert(`Đã yêu cầu sửa đổi bài nộp với lý do: ${rejectReason}`);
    setRejectReason('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#0f172a]" /> Workspace Duyệt Minh Chứng Đồ Án Chia 2 Màn Hình (Split-Screen)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Phê duyệt bài nộp đồ án học viên với sự hỗ trợ của AI Evaluator & Đẩy 1-Click đúc SBT Polygon.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/org/verification/sbt"
            className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Chuyển Sang Duyệt Đúc SBT Hàng Loạt</span>
          </Link>
        </div>
      </div>

      {/* Split-Screen Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Submission Queue Sidebar (25%) */}
        <div className="lg:col-span-3 bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs space-y-3">
          <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block px-2">Hàng chờ duyệt ({submissions.length})</span>
          <div className="space-y-2 text-xs">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubmissionId(sub.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col space-y-1.5 ${
                  selectedSubmissionId === sub.id
                    ? 'bg-[#0f172a] text-white border-[#0f172a] font-bold'
                    : 'bg-[#f8fafc] border-transparent text-[#334155] hover:bg-[#f1f5f9]'
                }`}
              >
                <div className="flex justify-between items-center text-[10px]">
                  <span>{sub.studentName}</span>
                  <span className="font-mono">{sub.aiScore} AI</span>
                </div>
                <p className="truncate text-[11px] leading-snug">{sub.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Student Submission Viewer (50%) */}
        <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-5">
          <div className="border-b border-[#f1f5f9] pb-3 flex justify-between items-center text-xs">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-[#0f172a]" />
              <span className="font-bold text-[#0f172a]">{activeSub.studentName}</span>
              <span className="font-mono text-[#64748b]">({activeSub.studentCode})</span>
            </div>
            <span className="font-mono text-[#64748b]">{activeSub.date}</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-2">
              <h3 className="font-extrabold text-sm text-[#0f172a]">{activeSub.title}</h3>
              <p className="text-[#64748b]">Khóa học: <strong className="text-[#0f172a]">{activeSub.course}</strong></p>
            </div>

            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0f172a] flex items-center gap-1.5">
                  <Github className="w-4 h-4 text-[#0f172a]" /> Mã Nguồn GitHub Repository:
                </span>
                <a
                  href={activeSub.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-[#0f172a] hover:underline flex items-center gap-1"
                >
                  <span>Mở kho mã nguồn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="font-mono text-[11px] text-[#64748b] bg-white p-2 rounded border border-[#e2e8f0] truncate">
                {activeSub.githubUrl}
              </p>
            </div>

            {/* Document preview mockup */}
            <div className="border border-[#cbd5e1] rounded-xl p-4 bg-[#f8fafc] text-center space-y-2">
              <FileText className="w-8 h-8 text-[#94a3b8] mx-auto animate-pulse" />
              <span className="font-bold text-[#0f172a] block">Bao_Cao_Do_An_Fullstack_RestAPI.pdf</span>
              <button className="px-3 py-1 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg transition-all">
                Mở Xem Trước PDF
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: AI Rubrics & Teacher Approval Workspace (25%) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0f172a]" /> ĐÁNH GIÁ TỪ AI EVALUATOR
              </h3>
              <span className="font-mono font-bold bg-[#f1f5f9] text-[#0f172a] px-2 py-0.5 rounded border border-[#cbd5e1] text-xs">
                {activeSub.aiScore}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#0f172a] block text-[11px]">Chi tiết Tiêu chí Rubrics:</span>
              {activeSub.rubrics.map((r, idx) => (
                <div key={idx} className="p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex justify-between items-center text-[11px]">
                  <span className="text-[#334155]">{r.name}</span>
                  <span className="font-mono font-bold text-[#0f172a]">{r.score}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#f1f5f9] space-y-3 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#0f172a] block">Điểm Phê Duyệt Chính Thức của Giảng Viên</label>
                <input
                  type="number"
                  value={teacherScore}
                  onChange={(e) => setTeacherScore(Number(e.target.value))}
                  className="w-full font-mono bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#0f172a] block">Nhận Xét Cho Học Viên</label>
                <textarea
                  value={teacherComment}
                  onChange={(e) => setTeacherComment(e.target.value)}
                  className="w-full h-20 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="flex space-x-2 pt-1">
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-4 py-2.5 bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 text-xs font-bold rounded-xl transition-all flex items-center space-x-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Từ chối / Sửa lại</span>
                </button>
                <button
                  onClick={handleApproveAndSendToSBT}
                  className="flex-1 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isApproved ? 'Đã Duyệt & Chuyển Sang SBT!' : 'Duyệt & Đúc SBT'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal simulated */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
              <Undo2 className="w-5 h-5 text-rose-600" /> Yêu cầu sửa đổi đồ án minh chứng
            </h3>
            <div className="space-y-1.5">
              <label className="font-bold text-[#334155] block">Lý do từ chối bài nộp / Yêu cầu sửa lại:</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do cụ thể... Ví dụ: Thiết kế Database chưa chuẩn 3NF, thiếu bài test coverage."
                className="w-full h-24 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t border-[#f1f5f9]">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] font-bold rounded-lg"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleRejectSubmit}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg"
              >
                Gửi yêu cầu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}