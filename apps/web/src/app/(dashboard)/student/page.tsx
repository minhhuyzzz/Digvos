'use client';

import React from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Award, BookOpen, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="space-y-8 text-slate-100">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600/20 to-slate-900 border border-brand-500/20 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Chào Gia Khoa! 👋</h1>
          <p className="text-sm text-slate-400 font-light">
            Hôm nay bạn cần hoàn thành bài kiểm tra thích ứng nhóm năng lực **1.2 Quét và xử lý dữ liệu**.
          </p>
        </div>
        <Button variant="primary" className="flex items-center space-x-2">
          <span>Làm bài Test CAT</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Grid Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Competence Radar Chart (Mockup SVG) */}
        <Card variant="premium" className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-brand-400" />
              <span>Biểu Đồ Năng Lực Số (DigComp 3.0)</span>
            </h3>
            <p className="text-xs text-slate-400 font-light mb-6">Trực quan hóa 5 nhóm năng lực số dựa trên 4 cấp độ đo lường</p>
          </div>

          {/* SVG Radar Chart Premium Mockup */}
          <div className="flex justify-center items-center py-6">
            <svg viewBox="0 0 320 320" className="w-full max-w-[320px] aspect-square overflow-visible">
              {/* Radar Grid Lines */}
              <polygon points="160,30 280,120 230,260 90,260 40,120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <polygon points="160,60 250,130 210,240 110,240 70,130" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <polygon points="160,95 220,140 190,220 130,220 100,140" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <polygon points="160,130 190,150 180,190 140,190 130,150" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              
              {/* Radar Axis lines */}
              <line x1="160" y1="160" x2="160" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="160" y1="160" x2="280" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="160" y1="160" x2="230" y2="260" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="160" y1="160" x2="90" y2="260" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="160" y1="160" x2="40" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* Data Area (Standard Points) */}
              {/* Points: Area 1: 85%, Area 2: 70%, Area 3: 90%, Area 4: 55%, Area 5: 65% */}
              <polygon points="160,50 244,132 223,250 114,225 82,134" fill="rgba(90, 150, 176, 0.25)" stroke="#5a96b0" strokeWidth="2.5" />
              
              {/* Data Nodes */}
              <circle cx="160" cy="50" r="4" fill="#fff" stroke="#5a96b0" strokeWidth="1.5" />
              <circle cx="244" cy="132" r="4" fill="#fff" stroke="#5a96b0" strokeWidth="1.5" />
              <circle cx="223" cy="250" r="4" fill="#fff" stroke="#5a96b0" strokeWidth="1.5" />
              <circle cx="114" cy="225" r="4" fill="#fff" stroke="#5a96b0" strokeWidth="1.5" />
              <circle cx="82" cy="134" r="4" fill="#fff" stroke="#5a96b0" strokeWidth="1.5" />

              {/* Axis Labels */}
              <text x="160" y="20" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">Xử lý Dữ liệu [AI-I]</text>
              <text x="290" y="125" textAnchor="start" fill="#fff" className="text-[10px] font-bold">Giao tiếp số [AI-E]</text>
              <text x="240" y="275" textAnchor="start" fill="#fff" className="text-[10px] font-bold">Sáng tạo nội dung</text>
              <text x="80" y="275" textAnchor="end" fill="#fff" className="text-[10px] font-bold">An toàn số</text>
              <text x="30" y="125" textAnchor="end" fill="#fff" className="text-[10px] font-bold">Giải quyết vấn đề</text>
            </svg>
          </div>

          {/* Color Guides */}
          <div className="flex justify-between items-center text-xs text-slate-400 border-t border-white/5 pt-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 bg-brand-500 rounded-full" />
              <span>Năng lực thực tế</span>
            </span>
            <span>Mục tiêu đạt được: <strong>Advanced (Cấp độ 3)</strong></span>
          </div>
        </Card>

        {/* SBT Certificates & e-Portfolio Widget */}
        <div className="space-y-8">
          {/* Active SBT Certificates */}
          <Card variant="default" className="space-y-6">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-brand-400" />
              <span>Chứng chỉ SBT của bạn</span>
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Năng lực số Cơ bản - Level 2', id: 'DVSBT-0941', status: 'Minted', tx: '0x9a7b...c41e' },
                { name: 'Kỹ năng Viết Prompt AI - Level 3', id: 'DVSBT-1250', status: 'Minted', tx: '0xe4bc...982f' },
              ].map((cert, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white">{cert.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">TX: {cert.tx}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SBT</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* e-Portfolio Status */}
          <Card variant="default" className="space-y-6">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-brand-400" />
              <span>Hồ sơ e-Portfolio</span>
            </h3>
            
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Số tài liệu minh chứng nộp:</span>
                <span className="font-bold text-white">4 Tài liệu</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Trạng thái lưu trữ:</span>
                <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Supabase Storage</span>
                </span>
              </div>
              <Button variant="glass" size="sm" className="w-full text-xs py-2">
                Quản lý file minh chứng
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper icon
function Brain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M12 5v14" />
      <path d="M12 12h6" />
      <path d="M12 12H6" />
    </svg>
  );
}
