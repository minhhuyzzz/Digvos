'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  ShieldCheck, 
  Plus, 
  Search,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Filter,
  BarChart2,
  Building2,
  ExternalLink,
  Zap,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { TalentMatchFunnel } from '../components/TalentMatchFunnel';

export const EmployerDashboard: React.FC = () => {
  const [candidateTab, setCandidateTab] = useState<'high_fit' | 'all'>('high_fit');

  const topCandidateTable = [
    { id: 'cand_1', name: 'Nguyễn Văn B', position: 'Kỹ sư AI Fullstack (Next.js & LLM)', level: 'Level 5 (Advanced)', match: '94%', sbt: 'Verified #8942', date: '26/07/2026' },
    { id: 'cand_2', name: 'Trần Thị C', position: 'Data Analyst & Business Intelligence', level: 'Level 4 (Intermediate)', match: '88%', sbt: 'Verified #4120', date: '25/07/2026' },
    { id: 'cand_3', name: 'Lê Hoàng D', position: 'Chuyên gia DevSecOps & Cloud Security', level: 'Level 5 (Advanced)', match: '85%', sbt: 'Verified #1092', date: '24/07/2026' },
    { id: 'cand_4', name: 'Phạm Minh E', position: 'Frontend Engineer (React/TypeScript)', level: 'Level 4 (Intermediate)', match: '81%', sbt: 'Verified #0541', date: '22/07/2026' },
  ];

  const enterpriseSkillGaps = [
    { dept: 'Đội ngũ Kỹ thuật (Dev)', gap: 'Thiếu 15% Vùng 4 (An toàn & Bảo mật số)', action: 'Tuyển thêm DevSecOps' },
    { dept: 'Đội ngũ Dữ liệu (Data)', gap: 'Đạt 92% mục tiêu Vận hành dữ liệu DigComp', action: 'Đã tối ưu' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* 1. Header Area - Enterprise Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2.5 py-0.5 rounded border border-[#cbd5e1]">
              DOANH NGHIỆP ENTERPRISE
            </span>
            <span className="text-xs text-[#64748b] font-medium">• Gói cước Active (4,850 AI Credits)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Tập Đoàn Công Nghệ TechCorp — Sàn Săn Nhân Tài Năng Lực Số
          </h1>
          <p className="text-xs text-[#64748b]">
            Ứng viên khớp &gt; 80% JD: <strong className="text-[#0f172a]">18 Ứng viên</strong> • Chứng chỉ SBT Verified: <strong className="font-mono text-[#0f172a]">100% On-Chain</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/org/recruitment/candidates"
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow-xs"
          >
            <UserCheck className="w-4 h-4 text-white" />
            <span>Duyệt ứng viên ngay</span>
          </Link>
          <Link
            href="/org/recruitment/campaigns"
            className="px-4 py-2.5 bg-white hover:bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-[#0f172a]" />
            <span>Tạo chiến dịch tuyển dụng</span>
          </Link>
        </div>
      </div>

      {/* 🚀 TIER 1: FULL-WIDTH TALENT MATCH FUNNEL MATRIX */}
      <TalentMatchFunnel />

      {/* 🚀 TIER 2: SPLIT CANDIDATE DATA & LIVE SCANNER MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (70% Width) - Candidate Table */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => setCandidateTab('high_fit')}
                className={`font-bold pb-3 -mb-3 border-b-2 transition-all ${
                  candidateTab === 'high_fit' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                Ứng viên khớp &gt; 80% (18)
              </button>
              <button
                onClick={() => setCandidateTab('all')}
                className={`font-bold pb-3 -mb-3 border-b-2 transition-all ${
                  candidateTab === 'all' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                Tất cả hồ sơ ứng tuyển (45)
              </button>
            </div>

            <Link href="/org/recruitment/candidates" className="text-xs text-[#0f172a] font-bold hover:underline">
              Xem toàn bộ kho ứng viên &gt;
            </Link>
          </div>

          <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left divide-y divide-[#e2e8f0]">
              <thead className="bg-[#f8fafc] font-bold text-[#334155]">
                <tr>
                  <th className="p-3">Họ & Tên ứng viên</th>
                  <th className="p-3">Vị trí ứng tuyển</th>
                  <th className="p-3">Trình độ DigComp</th>
                  <th className="p-3">SBT Status</th>
                  <th className="p-3">Độ khớp JD</th>
                  <th className="p-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {topCandidateTable.map((cand) => (
                  <tr key={cand.id} className="hover:bg-[#f8fafc]">
                    <td className="p-3 font-bold text-[#0f172a]">{cand.name}</td>
                    <td className="p-3 text-[#64748b]">{cand.position}</td>
                    <td className="p-3 text-[#64748b]">{cand.level}</td>
                    <td className="p-3">
                      <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#0f172a] px-2 py-0.5 rounded border border-[#cbd5e1]">
                        {cand.sbt}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#0f172a]">{cand.match}</td>
                    <td className="p-3 text-right">
                      <button className="px-3 py-1 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded transition-all">
                        Mời phỏng vấn
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (30% Width) - SBT Live Scanner & Skill Gap Report */}
        <div className="lg:col-span-4 space-y-6">
          {/* SBT Certificate Live Scanner Panel */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b]">TRA CỨU SBT LIVE ON-CHAIN</h3>
              <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">
                Polygon
              </span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Nhập Token ID (#8942-SBT)..."
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a]"
              />
              <button className="w-full py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded transition-all flex items-center justify-center gap-1">
                <Search className="w-3.5 h-3.5" />
                <span>Kiểm tra On-Chain</span>
              </button>
            </div>
          </div>

          {/* Department Skill Gap Report Card */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b]">KHOẢNG TRỐNG NĂNG LỰC ĐỘI NGŨ</h3>
            </div>

            <div className="space-y-2 text-xs">
              {enterpriseSkillGaps.map((gap, idx) => (
                <div key={idx} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-[#0f172a]">{gap.dept}</h5>
                    <span className="text-[10px] font-bold text-[#334155] bg-white border border-[#cbd5e1] px-1.5 py-0.5 rounded">
                      {gap.action}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748b]">{gap.gap}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
