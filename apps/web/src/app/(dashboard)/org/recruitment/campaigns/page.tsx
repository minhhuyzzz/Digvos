'use client';

import React, { useState } from 'react';
import { Briefcase, Plus, Search, Filter, Calendar, Users, Award, Sparkles, Trash2, X } from 'lucide-react';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  candidatesMatched: number;
  minTheta: string;
  status: string;
  deadline: string;
  priorityDomain: string;
}

export default function EmployerCampaignsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 'cmp_101', title: 'Tuyển Dụng Kỹ Sư Web Fullstack Senior (DigComp Level 5)', candidatesMatched: 24, minTheta: '+1.40', status: 'Đang mở', deadline: '15/08/2026', priorityDomain: 'Domain 3: Sáng tạo Nội dung' },
    { id: 'cmp_102', title: 'Tuyển Dụng Chuyên Gia An Toàn Thông Tin Số (DigComp Level 4)', candidatesMatched: 18, minTheta: '+1.10', status: 'Đang mở', deadline: '20/08/2026', priorityDomain: 'Domain 4: An toàn số' },
    { id: 'cmp_103', title: 'Tuyển Dụng AI Prompt Engineer & RAG Architect', candidatesMatched: 12, minTheta: '+1.60', status: 'Sắp đóng', deadline: '30/07/2026', priorityDomain: 'Domain 3: Sáng tạo Nội dung' },
  ]);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newMinTheta, setNewMinTheta] = useState('1.20');
  const [newDeadline, setNewDeadline] = useState('15/09/2026');
  const [newDomain, setNewDomain] = useState('Domain 3: Sáng tạo Nội dung');
  const [newStatus, setNewStatus] = useState('Đang mở');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newC: Campaign = {
      id: `cmp_${campaigns.length + 101}`,
      title: newTitle,
      candidatesMatched: 0,
      minTheta: Number(newMinTheta) >= 0 ? `+${newMinTheta}` : newMinTheta,
      status: newStatus,
      deadline: newDeadline,
      priorityDomain: newDomain
    };

    setCampaigns(prev => [...prev, newC]);
    setShowCreateModal(false);
    setNewTitle('');
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#0f172a]" /> Quản Lý Chiến Dịch Tuyển Dụng & Nhập Mô Tả Công Việc (JD)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình tiêu chí khung năng lực số DigComp 3.0 cho từng vị trí tuyển dụng doanh nghiệp.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Chiến Dịch Tuyển Dụng Mới</span>
          </button>
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
            placeholder="Tìm kiếm chiến dịch tuyển dụng..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Campaigns Data Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Chiến Dịch Đang Hoạt Động</h3>
          <span className="font-mono text-[#64748b]">Tổng số: {filteredCampaigns.length} Chiến dịch</span>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Mã chiến dịch</th>
                <th className="p-3">Tên vị trí tuyển dụng</th>
                <th className="p-3">Yêu cầu ưu tiên</th>
                <th className="p-3">Năng lực $\theta$ tối thiểu</th>
                <th className="p-3">Ứng viên Match &gt;80%</th>
                <th className="p-3">Hạn chót</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{c.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{c.title}</td>
                  <td className="p-3 text-[#64748b]">{c.priorityDomain}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{c.minTheta} $\theta$</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">
                    <Link href="/org/recruitment/candidates" className="hover:underline">
                      {c.candidatesMatched} Ứng viên
                    </Link>
                  </td>
                  <td className="p-3 font-mono text-[#64748b]">{c.deadline}</td>
                  <td className="p-3 text-right flex items-center justify-end space-x-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      c.status === 'Đang mở'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {c.status}
                    </span>
                    <button
                      onClick={() => handleDeleteCampaign(c.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa chiến dịch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateCampaign} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Briefcase className="w-5 h-5" /> Tạo chiến dịch tuyển dụng mới
              </h3>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Vị trí tuyển dụng:</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Kỹ sư Fullstack AI Web..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Khung năng lực ưu tiên:</label>
                <select
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                >
                  <option>Domain 1: Vận hành Dữ liệu</option>
                  <option>Domain 2: Giao tiếp & Cộng tác</option>
                  <option>Domain 3: Sáng tạo Nội dung</option>
                  <option>Domain 4: An toàn số</option>
                  <option>Domain 5: Giải quyết vấn đề</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Điểm Theta ($\theta$) tối thiểu:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMinTheta}
                    onChange={(e) => setNewMinTheta(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Hạn chót:</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Trạng thái:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                >
                  <option>Đang mở</option>
                  <option>Bản nháp</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] font-bold rounded-lg"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg"
              >
                Tạo chiến dịch
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}