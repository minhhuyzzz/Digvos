'use client';

import React, { useState } from 'react';
import { 
  Building, 
  Activity, 
  Bot, 
  Layers, 
  Award,
  AlertCircle,
  Users,
  ShieldAlert,
  Server,
  Lock,
  Cpu,
  ArrowRight,
  Database,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export const AdminDashboard: React.FC = () => {
  const [adminTab, setAdminTab] = useState<'models' | 'tenants'>('models');

  const aiModelsStatus = [
    { name: 'GPT-4o (Evaluator & Adaptive CAT Engine)', provider: 'OpenAI', latency: '240ms', reqs: '1.2M', status: 'Hoạt động' },
    { name: 'Claude 3.5 Sonnet (Rubrics AI Grading)', provider: 'Anthropic', latency: '180ms', reqs: '850K', status: 'Hoạt động' },
    { name: 'Gemini 1.5 Pro (Multimodal Proof Review)', provider: 'Google', latency: '210ms', reqs: '420K', status: 'Hoạt động' },
  ];

  const tenantsList = [
    { name: 'Đại Học Bách Khoa TP.HCM', type: 'Trường Đại Học', users: '1,850', sbts: '4,200', plan: 'Enterprise' },
    { name: 'Tập Đoàn Công Nghệ TechCorp', type: 'Doanh Nghiệp', users: '1,248', sbts: '3,800', plan: 'Enterprise' },
    { name: 'Học Viện Công Nghệ Bưu Chính', type: 'Học Viện', users: '980', sbts: '2,100', plan: 'Pro Tier' },
  ];

  const digCompDomains = [
    { code: 'D1', name: 'Vận hành Dữ liệu & Thông tin', skills: '3 Kỹ năng thành phần' },
    { code: 'D2', name: 'Giao tiếp & Cộng tác số', skills: '6 Kỹ năng thành phần' },
    { code: 'D3', name: 'Sáng tạo Nội dung số', skills: '4 Kỹ năng thành phần' },
    { code: 'D4', name: 'An toàn & Bảo mật số', skills: '4 Kỹ năng thành phần' },
    { code: 'D5', name: 'Giải quyết Vấn đề Kỹ thuật', skills: '4 Kỹ năng thành phần' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* 1. Header Control Room Area */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2.5 py-0.5 rounded border border-[#cbd5e1] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0f172a]" /> SUPER ADMIN PLATFORM CONTROL ROOM
            </span>
            <span className="text-xs text-[#64748b] font-medium">• Uptime: 99.98%</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Trung Tâm Quản Trị Hệ Thống & Cấu Hình AI Models Master
          </h1>
          <p className="text-xs text-[#64748b]">
            Tenants: <strong className="text-[#0f172a]">24 Đơn vị</strong> • Users Active: <strong className="font-mono text-[#0f172a]">4,280 Users</strong> • AI Latency TB: <strong className="font-mono text-[#0f172a]">210ms</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/ai/models"
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow-xs"
          >
            <Cpu className="w-4 h-4 text-white" />
            <span>Cấu hình AI API Keys</span>
          </Link>
          <Link
            href="/admin/identity/organizations"
            className="px-4 py-2.5 bg-white hover:bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5"
          >
            <Building className="w-4 h-4 text-[#0f172a]" />
            <span>Quản lý Tenants</span>
          </Link>
        </div>
      </div>

      {/* 🚀 SYSTEM CONTROL ROOM 4-QUAD BENTO MATRIX */}
      {/* Quad 1: DigComp 3.0 Master Governance Full Bar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#0f172a]" /> KHUNG NĂNG LỰC DIGCOMP 3.0 MASTER (5 VÙNG & 21 KỸ NĂNG)
          </span>
          <Link href="/admin/competency/framework" className="text-xs text-[#0f172a] font-bold hover:underline">
            Chỉnh sửa khung &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {digCompDomains.map((dom) => (
            <div key={dom.code} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1.5">
              <span className="text-[10px] font-mono font-bold bg-white text-[#334155] px-1.5 py-0.5 rounded border border-[#cbd5e1]">
                {dom.code}
              </span>
              <h5 className="font-bold text-xs text-[#0f172a] leading-snug">{dom.name}</h5>
              <p className="text-[10px] text-[#64748b]">{dom.skills}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quads 2, 3, 4: Split Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quad 2 & 3: Side-by-Side Data Tables (70% Width) */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => setAdminTab('models')}
                className={`font-bold pb-3 -mb-3 border-b-2 transition-all ${
                  adminTab === 'models' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                AI LLM Engine (3 Models)
              </button>
              <button
                onClick={() => setAdminTab('tenants')}
                className={`font-bold pb-3 -mb-3 border-b-2 transition-all ${
                  adminTab === 'tenants' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                Danh sách Tổ chức Tenants (24)
              </button>
            </div>

            <Link href="/admin/ai/models" className="text-xs text-[#0f172a] font-bold hover:underline">
              Xem tất cả &gt;
            </Link>
          </div>

          {adminTab === 'models' && (
            <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left divide-y divide-[#e2e8f0]">
                <thead className="bg-[#f8fafc] font-bold text-[#334155]">
                  <tr>
                    <th className="p-3">Mô hình AI</th>
                    <th className="p-3">Nhà cung cấp</th>
                    <th className="p-3">Latency</th>
                    <th className="p-3">Số lượng Request</th>
                    <th className="p-3 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {aiModelsStatus.map((m, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc]">
                      <td className="p-3 font-bold text-[#0f172a]">{m.name}</td>
                      <td className="p-3 text-[#64748b]">{m.provider}</td>
                      <td className="p-3 font-mono font-bold text-[#0f172a]">{m.latency}</td>
                      <td className="p-3 font-mono text-[#64748b]">{m.reqs}</td>
                      <td className="p-3 text-right">
                        <span className="text-[10px] font-mono font-bold text-[#334155] bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#cbd5e1]">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {adminTab === 'tenants' && (
            <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left divide-y divide-[#e2e8f0]">
                <thead className="bg-[#f8fafc] font-bold text-[#334155]">
                  <tr>
                    <th className="p-3">Tên tổ chức (Tenant)</th>
                    <th className="p-3">Loại hình</th>
                    <th className="p-3">Số người dùng</th>
                    <th className="p-3">SBT đã đúc</th>
                    <th className="p-3 text-right">Gói dịch vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {tenantsList.map((t, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc]">
                      <td className="p-3 font-bold text-[#0f172a]">{t.name}</td>
                      <td className="p-3 text-[#64748b]">{t.type}</td>
                      <td className="p-3 font-mono text-[#0f172a]">{t.users} HV</td>
                      <td className="p-3 font-mono text-[#0f172a]">{t.sbts}</td>
                      <td className="p-3 text-right">
                        <span className="text-[10px] font-bold text-[#0f172a] bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#cbd5e1]">
                          {t.plan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quad 4: Right Infrastructure Control Tower (30% Width) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b]">POLYGON SMART CONTRACT NODE</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex justify-between items-center">
              <span className="text-[#64748b]">Mạng lưới</span>
              <span className="font-bold text-[#0f172a]">Polygon Mainnet</span>
            </div>
            <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex justify-between items-center">
              <span className="text-[#64748b]">Contract Address</span>
              <span className="font-mono font-bold text-[#0f172a]">0x892a...f402</span>
            </div>
            <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex justify-between items-center">
              <span className="text-[#64748b]">Gas Fee Trung bình</span>
              <span className="font-mono text-[#0f172a]">32 Gwei</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
