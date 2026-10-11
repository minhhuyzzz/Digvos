'use client';

import React, { useState } from 'react';
import { Users, Search, Filter, ShieldCheck, Award, Mail, ExternalLink, Check, FileText, QrCode } from 'lucide-react';
import Link from 'next/link';

interface Candidate {
  id: string;
  name: string;
  code: string;
  matchScore: number;
  theta: string;
  sbtVerified: boolean;
  sbtCount: number;
  topSkill: string;
  email: string;
  projects: string[];
}

export default function EmployerCandidatesPage() {
  const [minMatchFilter, setMinMatchFilter] = useState<number>(80);
  const [invitedCandidates, setInvitedCandidates] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('cd_101');

  const candidates: Candidate[] = [
    { id: 'cd_101', name: 'Trần Minh Huy', code: 'HV-089', matchScore: 94, theta: '+1.45', sbtVerified: true, sbtCount: 3, topSkill: 'Domain 3 & 4 Advanced (REST API & ECDSA)', email: 'huy.tran@digvos.io', projects: ['digvos-backend-api', 'polygon-sbt-contracts'] },
    { id: 'cd_102', name: 'Lê Thị Thu Thảo', code: 'HV-112', matchScore: 88, theta: '+1.20', sbtVerified: true, sbtCount: 2, topSkill: 'Domain 4 Advanced (An toàn Thông tin)', email: 'thao.le@digvos.io', projects: ['security-audit-report'] },
    { id: 'cd_103', name: 'Phạm Hoàng Nam', code: 'HV-145', matchScore: 82, theta: '+1.05', sbtVerified: true, sbtCount: 1, topSkill: 'Domain 3 Intermediate (AI Prompting)', email: 'nam.pham@digvos.io', projects: ['ai-coach-prompt-templates'] },
  ];

  const filteredCandidates = candidates.filter(c => 
    c.matchScore >= minMatchFilter && 
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.topSkill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  const handleInviteCandidate = (id: string) => {
    if (invitedCandidates.includes(id)) return;
    setInvitedCandidates(prev => [...prev, id]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0f172a]" /> Kho Hồ Sơ Ứng Viên Khớp Năng Lực Số JD
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Săn nhân tài đã được xác thực chứng chỉ số SBT Polygon On-Chain với chỉ số Match Score %.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/org/analytics/talent"
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <span>Báo Cáo Phễu Nhân Tài</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#0f172a]">Lọc % Độ Khớp JD:</span>
          {[80, 90].map((val) => (
            <button
              key={val}
              onClick={() => setMinMatchFilter(val)}
              className={`px-3 py-1.5 rounded-lg border font-bold ${
                minMatchFilter === val ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white text-[#334155] border-[#cbd5e1]'
              }`}
            >
              Match &gt; {val}%
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên ứng viên, kỹ năng..."
            className="pl-9 pr-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a] w-64"
          />
        </div>
      </div>

      {/* 2 columns Layout: Left candidate list, Right Active Candidate detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Candidates list (65%) */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left divide-y divide-[#e2e8f0]">
              <thead className="bg-[#f8fafc] font-bold text-[#334155]">
                <tr>
                  <th className="p-3">Hồ sơ ứng viên</th>
                  <th className="p-3">Độ khớp JD</th>
                  <th className="p-3">Chỉ số Theta</th>
                  <th className="p-3">SBT Polygon</th>
                  <th className="p-3 text-right">Mời phỏng vấn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {filteredCandidates.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCandidateId(c.id)}
                    className={`hover:bg-[#f8fafc] cursor-pointer transition-all ${
                      selectedCandidateId === c.id ? 'bg-[#f8fafc] font-bold border-l-4 border-l-[#0f172a]' : ''
                    }`}
                  >
                    <td className="p-3 font-bold text-[#0f172a]">
                      {c.name} <span className="font-mono text-[#64748b] font-normal">({c.code})</span>
                    </td>
                    <td className="p-3 font-mono font-extrabold text-emerald-600">{c.matchScore}% Match</td>
                    <td className="p-3 font-mono font-bold text-[#0f172a]">{c.theta} $\theta$</td>
                    <td className="p-3 font-mono text-[#64748b]">
                      <span className="bg-[#f1f5f9] text-[#0f172a] border border-[#cbd5e1] px-2 py-0.5 rounded font-bold text-[10px]">
                        {c.sbtCount} SBT
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInviteCandidate(c.id);
                        }}
                        disabled={invitedCandidates.includes(c.id)}
                        className={`px-3 py-1.5 text-xs font-bold rounded flex items-center space-x-1 justify-end ml-auto ${
                          invitedCandidates.includes(c.id)
                            ? 'bg-[#f1f5f9] text-emerald-700 border border-emerald-300'
                            : 'bg-[#0f172a] text-white hover:bg-[#1e293b]'
                        }`}
                      >
                        {invitedCandidates.includes(c.id) ? <Check className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                        <span>{invitedCandidates.includes(c.id) ? 'Đã mời' : 'Mời'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Candidate Resume Detail Drawer (35%) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs">
          <div className="border-b border-[#f1f5f9] pb-2 flex justify-between items-center">
            <span className="font-bold text-[#0f172a] uppercase tracking-wider text-[10px]">Chi tiết Hồ sơ Nhân tài</span>
            <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] border border-[#cbd5e1] px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> On-Chain Verified
            </span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#0f172a]">{activeCandidate.name}</h3>
              <p className="text-[#64748b]">{activeCandidate.email}</p>
            </div>

            <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Chỉ số Theta:</span>
                <span className="font-bold font-mono text-[#0f172a]">{activeCandidate.theta}</span>
              </div>
              <div className="flex justify-between">
                <span>Độ khớp JD:</span>
                <span className="font-bold font-mono text-emerald-600">{activeCandidate.matchScore}%</span>
              </div>
              <div className="flex justify-between">
                <span>Số SBT đã sở hữu:</span>
                <span className="font-bold font-mono text-[#0f172a]">{activeCandidate.sbtCount} chứng chỉ</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-[#334155] block">Đồ án / Minh chứng nổi bật:</span>
              <div className="space-y-1 font-mono text-[10px]">
                {activeCandidate.projects.map((proj, idx) => (
                  <div key={idx} className="p-2 bg-white border border-[#cbd5e1] rounded flex items-center justify-between">
                    <span className="truncate max-w-[150px]">{proj}</span>
                    <a href={`https://github.com/${proj}`} target="_blank" rel="noreferrer" className="text-[#0f172a] hover:underline flex items-center gap-0.5">
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleInviteCandidate(activeCandidate.id)}
              disabled={invitedCandidates.includes(activeCandidate.id)}
              className="w-full py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>{invitedCandidates.includes(activeCandidate.id) ? 'Đã Gửi Thư Mời Phỏng Vấn' : 'Gửi Thư Mời Phỏng Vấn'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}