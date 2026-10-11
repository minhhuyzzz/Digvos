'use client';

import React, { useState } from 'react';
import { 
  UsersRound, 
  BookOpen, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Database,
  ListTodo,
  Award,
  ChevronRight,
  Search,
  Filter,
  Cpu,
  ArrowRight,
  Check,
  X,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { ClassHeatmapWidget } from '../components/ClassHeatmapWidget';

export const TeacherDashboard: React.FC = () => {
  const [reviewTab, setReviewTab] = useState<'pending' | 'approved'>('pending');

  const pendingSubmissions = [
    { id: 'sub_1', student: 'Phạm Hoàng K', assignment: 'Đồ án Xây dựng Microservices & Event-Driven', scoreAI: '88/100', confidence: '96%' },
    { id: 'sub_2', student: 'Lê Thanh M', assignment: 'Bài thực hành An toàn Thông tin & Cryptography', scoreAI: '92/100', confidence: '98%' },
    { id: 'sub_3', student: 'Nguyễn Quốc T', assignment: 'Phân tích & Tối ưu CSDL PostgreSQL Indexing', scoreAI: '85/100', confidence: '94%' },
  ];

  const catExamSessions = [
    { id: 'cat_1', name: 'Kỳ thi CAT Đánh giá Năng lực Kỹ thuật Số K01', candidates: 35, completed: 28, status: 'Đang diễn ra' },
    { id: 'cat_2', name: 'Đợt khảo thí An toàn Thông tin Số K02', candidates: 30, completed: 30, status: 'Đã hoàn thành' },
  ];

  const teachingClasses = [
    { id: 1, name: 'Lập trình Fullstack & AI Integration K01', course: 'Kỹ năng Số Nâng cao', students: 35, max: 40, avgScore: '78/100' },
    { id: 2, name: 'An toàn Thông tin & Mã hóa Blockchain K02', course: 'An toàn Số (Domain 4)', students: 28, max: 30, avgScore: '84/100' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* 1. Header Command Area */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold bg-[#f1f5f9] text-[#334155] px-2.5 py-0.5 rounded border border-[#cbd5e1] flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#0f172a]" /> GIẢNG VIÊN / NGƯỜI ĐÁNH GIÁ
            </span>
            <span className="text-xs text-[#64748b] font-medium">• 2 Nhóm active (63 Thành viên)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            ThS. Nguyễn Văn A — Trung Tâm Giảng Dạy & Thẩm Định AI
          </h1>
          <p className="text-xs text-[#64748b]">
            Bài nộp chờ thẩm định: <strong className="text-[#0f172a] font-bold">05 Bài làm</strong> • Ngân hàng câu hỏi IRT: <strong className="font-mono text-[#0f172a] font-bold">1,420 Items</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/org/portfolio/review"
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Phê duyệt bài làm ngay</span>
          </Link>
          <Link
            href="/org/teaching/classes"
            className="px-4 py-2.5 bg-white hover:bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-[#0f172a]" />
            <span>Tạo lớp mới</span>
          </Link>
        </div>
      </div>

      {/* 🚀 3-COLUMN EQUAL OPERATIONAL COMMAND CENTER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Class Competency Heatmap Matrix (Student Management) */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <UsersRound className="w-4 h-4 text-[#0f172a]" /> PHÂN BỔ NĂNG LỰC LỚP HỌC
              </span>
              <Link href="/org/teaching/classes" className="text-xs text-[#0f172a] font-bold hover:underline">
                Tất cả lớp &gt;
              </Link>
            </div>

            <ClassHeatmapWidget />
          </div>

          <div className="space-y-2 pt-2 border-t border-[#f1f5f9]">
            <span className="text-xs font-bold text-[#0f172a] block">Lớp học đang giảng dạy:</span>
            {teachingClasses.map((cls) => (
              <div key={cls.id} className="p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs space-y-0.5">
                <div className="flex justify-between font-bold text-[#0f172a]">
                  <span>{cls.name}</span>
                  <span className="font-mono">{cls.students}/{cls.max} Thành viên</span>
                </div>
                <span className="text-[11px] text-[#64748b] block">{cls.course} • TB: {cls.avgScore}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: AI Assisted Grading Review Queue Data Table */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <ListTodo className="w-4 h-4 text-[#0f172a]" /> HÀNG CHỜ CHẤM BÀI AI (REVIEW QUEUE)
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">
                {pendingSubmissions.length} Bài chờ
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {pendingSubmissions.map((sub) => (
                <div key={sub.id} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold text-[#0f172a]">{sub.student}</h5>
                      <span className="text-[11px] text-[#64748b] leading-tight block mt-0.5">{sub.assignment}</span>
                    </div>
                    <span className="font-mono font-bold text-[#0f172a] bg-white border border-[#cbd5e1] px-1.5 py-0.5 rounded">
                      {sub.scoreAI}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#e2e8f0]">
                    <span className="text-[10px] text-[#64748b]">Độ tin cậy AI: {sub.confidence}</span>
                    <button className="px-3 py-1 bg-[#0f172a] hover:bg-[#1e293b] text-white text-[11px] font-bold rounded transition-all">
                      Phê duyệt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/org/portfolio/review"
            className="w-full py-2 bg-white hover:bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] font-bold text-xs rounded text-center block transition-all mt-2"
          >
            Xem tất cả hàng chờ bài làm
          </Link>
        </div>

        {/* Column 3: Live CAT Exam Monitoring & IRT Item Bank Status */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#0f172a]" /> GIÁM SÁT THI CAT REALTIME
              </span>
              <span className="text-[10px] font-bold text-[#0f172a] bg-[#f1f5f9] px-2 py-0.5 rounded">Live</span>
            </div>

            <div className="space-y-2 text-xs">
              {catExamSessions.map((s) => (
                <div key={s.id} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1.5">
                  <h5 className="font-bold text-[#0f172a]">{s.name}</h5>
                  <div className="flex justify-between items-center text-[11px] text-[#64748b]">
                    <span>Tiến độ: {s.completed}/{s.candidates} Thành viên</span>
                    <span className="font-bold text-[#0f172a]">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#f1f5f9]">
            <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs space-y-1">
              <div className="flex justify-between items-center font-bold text-[#0f172a]">
                <span>Ngân hàng câu hỏi IRT</span>
                <span className="font-mono">1,420 Items</span>
              </div>
              <span className="text-[10px] text-[#64748b] block">Độ khó $b$ được hiệu chuẩn Rasch IRT tự động</span>
            </div>

            <Link
              href="/org/assessment/cat-sessions"
              className="w-full py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded text-center block transition-all"
            >
              <span>+ Mở đợt đánh giá thích ứng CAT mới</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
