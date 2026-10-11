'use client';

import React from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, Sparkles, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function LearnerSkillGapPage() {
  const gapAnalysis = [
    { id: 1, subSkill: '4.2 Quyền riêng tư & Mã hóa ECDSA Polygon', currentLevel: 'Level 3 (Intermediate)', targetLevel: 'Level 5 (Advanced)', gapScore: '-35%', priority: 'HIGH', recommendation: 'Cần hoàn thành khóa học An toàn Thông tin & Bài tập Smart Contract đúc SBT.' },
    { id: 2, subSkill: '3.5 Tối ưu Vector Embeddings & RAG Engine', currentLevel: 'Level 4 (Intermediate)', targetLevel: 'Level 6 (Advanced)', gapScore: '-20%', priority: 'MEDIUM', recommendation: 'Cần nộp 1 đồ án tích hợp pgvector CSDL PostgreSQL.' },
    { id: 3, subSkill: '1.3 Thiết kế CSDL PostgreSQL & Indexing', currentLevel: 'Level 4 (Intermediate)', targetLevel: 'Level 5 (Advanced)', gapScore: '-15%', priority: 'MEDIUM', recommendation: 'Hoàn thành bài kiểm tra thực hành truy vấn SQL tối ưu.' },
    { id: 4, subSkill: '3.4 Prompt AI Generative (GPT-4o/Claude)', currentLevel: 'Level 5 (Advanced)', targetLevel: 'Level 5 (Advanced)', gapScore: '0% (Đạt)', priority: 'NONE', recommendation: 'Đã đạt mục tiêu. Có thể duy trì thực hành hàng tuần.' },
  ];

  const matchedJobs = [
    { company: 'FPT Software', title: 'Junior AI Web Developer', match: '82%', sbtReq: 'Yêu cầu DigComp Level 4+' },
    { company: 'VNG Corporation', title: 'Fullstack Software Engineer', match: '68%', sbtReq: 'Yêu cầu DigComp Level 5+' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#0f172a]" /> Bảng Phân Tích Khoảng Trống Năng Lực (Skill Gap Matrix)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">So sánh cấp độ thực tại từ khảo thí IRT vs Cấp độ mục tiêu thăng cấp để gợi ý bài học bù đắp.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/learner/ai/recommendations"
            className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all shadow-xs flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Xem Gợi Ý Học Tập AI</span>
          </Link>
        </div>
      </div>

      {/* Target JD Match Meter (Interconnected Flow Widget) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs flex flex-col justify-between text-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
            <span className="font-bold text-[#0f172a] flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> Mục Tiêu Nghề Nghiệp: Kỹ sư Fullstack AI</span>
            <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Độ khớp: 78% Match</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[#64748b] text-[11px]">
              <span>Tỷ lệ bao phủ kỹ năng số chuẩn DigComp</span>
              <span className="font-bold text-[#0f172a]">78% / 100%</span>
            </div>
            <div className="w-full bg-[#e2e8f0] rounded-full h-2 relative overflow-hidden">
              <div className="bg-[#0f172a] h-full rounded-full" style={{ width: '78%' }} />
            </div>
            <p className="text-[#64748b] text-[10px] leading-relaxed">
              Bạn thiếu kỹ năng <strong>Mã hóa ECDSA Polygon (4.2)</strong> và <strong>Tối ưu Vector DB (3.5)</strong> để đạt 100% yêu cầu kỹ thuật của nhà tuyển dụng.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
          <span className="font-bold text-[#0f172a] block border-b border-[#f1f5f9] pb-2">Đề xuất công việc khớp nhất</span>
          <div className="space-y-2.5">
            {matchedJobs.map((job, idx) => (
              <div key={idx} className="p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex flex-col space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-[#0f172a]">{job.title}</span>
                  <span className="font-mono text-emerald-600">{job.match}</span>
                </div>
                <div className="flex justify-between text-[10px] text-[#64748b]">
                  <span>{job.company}</span>
                  <span className="font-mono">{job.sbtReq}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Data Table Area */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Đối Sánh Kỹ Năng & Lộ Trình Bù Đắp</h3>
          <span className="font-mono text-[#64748b]">Tổng số: {gapAnalysis.length} Kỹ năng khảo sát</span>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Kỹ năng thành phần DigComp</th>
                <th className="p-3">Cấp độ thực tại ($\theta$)</th>
                <th className="p-3">Mục tiêu thăng cấp</th>
                <th className="p-3">Khoảng trống (Gap)</th>
                <th className="p-3">Hành động khuyến nghị</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {gapAnalysis.map((item) => (
                <tr key={item.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{item.subSkill}</td>
                  <td className="p-3 text-[#64748b]">{item.currentLevel}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{item.targetLevel}</td>
                  <td className="p-3 font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${
                      item.priority === 'HIGH'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : item.priority === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {item.gapScore}
                    </span>
                  </td>
                  <td className="p-3 text-[#64748b] max-w-xs">{item.recommendation}</td>
                  <td className="p-3 text-right">
                    <Link
                      href="/learner/learning/path"
                      className="px-3 py-1.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded inline-flex items-center space-x-1"
                    >
                      <span>Vào lộ trình</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
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