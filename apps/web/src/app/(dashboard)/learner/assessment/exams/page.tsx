'use client';

import React, { useState } from 'react';
import { FileCheck, ShieldCheck, Clock, ArrowLeft, ChevronRight, Search, Star } from 'lucide-react';
import Link from 'next/link';

interface ExamItem {
  id: number;
  title: string;
  questions: number;
  duration: string;
  status: string;
  type: string;
  desc: string;
}

export default function LearnerExamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [exams, setExams] = useState<ExamItem[]>([
    { id: 1, title: 'Bài Kiểm Tra Thích Ứng Định Kỳ Tháng 7/2026', questions: 25, duration: '45 phút', status: 'Chưa làm', type: 'CAT Engine', desc: 'Bài thi đo lường và định vị 5 vùng năng lực số cơ bản chuẩn DigComp 3.0.' },
    { id: 2, title: 'Đánh Giá Năng Lực Bảo Mật & Mã Hóa Dữ Liệu', questions: 15, duration: '30 phút', status: 'Đã hoàn thành', type: 'Quiz', desc: 'Bài trắc nghiệm đánh giá kiến thức mã hóa đầu cuối và chữ ký số Polygon.' },
  ]);

  const filteredExams = exams.filter(ex => 
    ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Danh Sách Bài Thi & Kiểm Tra Thích Ứng</h1>
          <p className="text-xs text-[#64748b] mt-1">Lựa chọn bài kiểm tra năng lực phù hợp để cập nhật bản đồ mạng nhện kỹ năng số của bạn.</p>
        </div>
        <Link href="/learner" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Về Trang chủ</span>
        </Link>
      </div>

      {/* Featured Exam pinned at the top */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start space-x-4 text-xs">
        <div className="p-3 bg-white border border-amber-200 rounded-lg text-amber-500">
          <Star className="w-6 h-6 fill-current" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200">KỲ THI TRỌNG ĐIỂM</span>
            <span className="text-[#64748b] font-mono">Bắt buộc hoàn thành trước 31/07</span>
          </div>
          <h4 className="font-bold text-sm text-[#0f172a]">Đánh giá năng lực chuẩn Châu Âu DigComp 3.0 K2026</h4>
          <p className="text-amber-700">Mở đợt khảo thí thích ứng quy mô toàn trường nhằm cấp chứng nhận SBT Polygon on-chain công khai.</p>
          <div className="pt-2">
            <Link
              href="/learner/assessment/cat"
              className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg transition-all inline-flex items-center space-x-1"
            >
              <span>Vào thi ngay</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
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
            placeholder="Tìm kiếm bài thi..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((ex) => (
          <div key={ex.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#0f172a] transition-all">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">
                {ex.type}
              </span>
              <h3 className="font-bold text-sm text-[#0f172a]">{ex.title}</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">{ex.desc}</p>
              <p className="text-xs text-[#64748b] font-mono font-bold pt-1">{ex.questions} câu hỏi • Thời lượng {ex.duration}</p>
            </div>
            <div className="pt-3 border-t border-[#f1f5f9] flex justify-between items-center text-xs">
              <span className={`font-bold px-2 py-0.5 rounded border ${
                ex.status === 'Đã hoàn thành'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {ex.status}
              </span>
              {ex.status !== 'Đã hoàn thành' && (
                <Link href="/learner/assessment/cat" className="px-3 py-1.5 bg-[#0f172a] text-white text-xs font-bold rounded flex items-center space-x-1">
                  <span>Vào làm bài ngay</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}