'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowLeft, BookOpen, ChevronRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface Recommendation {
  id: number;
  title: string;
  reason: string;
  domain: string;
  difficulty: string;
  link: string;
}

export default function LearnerAIRecommendationsPage() {
  const [recs, setRecs] = useState<Recommendation[]>([
    { id: 1, title: 'Khóa học Khắc phục Khoảng trống Mã hóa An toàn Dữ liệu (Domain 4)', reason: 'Dựa trên kết quả thi CAT gần nhất (Theta = +1.45), bạn cần tăng cường kiến thức mã hóa ECDSA và các cơ chế ký giao dịch.', domain: 'Domain 4: An toàn số', difficulty: 'Trung cấp (Intermediate)', link: '/learner/learning/courses' },
    { id: 2, title: 'Bài luyện tập Prompt AI Generative Nâng cao (Domain 3)', reason: 'Giúp bạn nâng điểm từ Level 4 lên Level 5 trong Vùng 3 Sáng tạo nội dung số bằng cách thực hành viết prompts có cấu trúc.', domain: 'Domain 3: Sáng tạo nội dung', difficulty: 'Nâng cao (Advanced)', link: '/learner/learning/courses' },
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Gợi Ý Học Tập Tự Động Từ AI Generative Engine</h1>
          <p className="text-xs text-[#64748b] mt-1">Hệ thống phân tích khoảng trống năng lực thực tế đối chiếu mục tiêu và đưa ra lộ trình tối ưu hóa cá nhân.</p>
        </div>
        <Link href="/learner" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Về Trang chủ</span>
        </Link>
      </div>

      {/* AI Persona Insights Bubble */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs flex gap-4 items-start">
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-600">
          <Sparkles className="w-6 h-6 fill-current" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">Trợ lý AI Coach nhận định:</h4>
          <p className="text-[#64748b] leading-relaxed">"Chào Huy, bản đồ năng lực số của bạn đang rất mạnh về kỹ năng tự học và giải quyết vấn đề kỹ thuật. Tuy nhiên, điểm số của bạn ở Vùng 4 (An toàn & Bảo mật) đang có dấu hiệu chững lại ở mức <strong className="text-[#0f172a]">+1.45 Theta</strong>. Tôi khuyên bạn nên tập trung hoàn thành bài học về khóa mã hóa bất đối xứng dưới đây để bứt phá lên Level 5."</p>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recs.map((r) => (
          <div key={r.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs flex flex-col justify-between hover:border-[#0f172a] transition-all">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">{r.domain}</span>
                <span className="text-[#64748b] font-mono">Độ khó: <strong>{r.difficulty}</strong></span>
              </div>
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#64748b]" /> {r.title}
              </h3>
              <p className="text-[#64748b] leading-relaxed">{r.reason}</p>
            </div>
            <div className="pt-3 border-t border-[#f1f5f9] flex justify-end">
              <Link href={r.link} className="px-3.5 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg flex items-center space-x-1 transition-all shadow-xs">
                <span>Học ngay</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}