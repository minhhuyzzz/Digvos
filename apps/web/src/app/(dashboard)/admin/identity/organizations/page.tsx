'use client';

import React, { useState } from 'react';
import { Building2, Plus, Search, Filter, ShieldCheck, Users, Edit, ExternalLink, Trash2, X } from 'lucide-react';
import Link from 'next/link';

interface Org {
  id: string;
  name: string;
  type: string;
  code: string;
  usersCount: number;
  status: string;
  plan: string;
}

export default function AdminOrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [orgs, setOrgs] = useState<Org[]>([
    { id: 'org_1', name: 'Đại Học Bách Khoa TP.HCM', type: 'Trường Đại học', code: 'HCMUT-DIGVOS', usersCount: 1250, status: 'Hoạt động', plan: 'Enterprise Education' },
    { id: 'org_2', name: 'Tập Đoàn Công Nghệ FPT Software', type: 'Doanh nghiệp', code: 'FPT-SOFT', usersCount: 850, status: 'Hoạt động', plan: 'Enterprise Business' },
    { id: 'org_3', name: 'Trường THPT Chuyên Lê Hồng Phong', type: 'Trường THPT', code: 'LHP-HIGH', usersCount: 420, status: 'Hoạt động', plan: 'Education Basic' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Trường Đại học');
  const [newCode, setNewCode] = useState('');
  const [newPlan, setNewPlan] = useState('Education Basic');
  const [newStatus, setNewStatus] = useState('Hoạt động');

  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;

    const newO: Org = {
      id: `org_${orgs.length + 1}`,
      name: newName,
      type: newType,
      code: newCode.toUpperCase(),
      usersCount: 0,
      status: newStatus,
      plan: newPlan
    };

    setOrgs(prev => [...prev, newO]);
    setShowAddModal(false);
    setNewName('');
    setNewCode('');
  };

  const handleDeleteOrg = (id: string) => {
    setOrgs(prev => prev.filter(o => o.id !== id));
  };

  const filteredOrgs = orgs.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#0f172a]" /> Quản Lý Đơn Vị Tổ Chức Multi-Tenant
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý không gian làm việc (Tenants) dành cho Trường học, Viện đào tạo & Doanh nghiệp tuyển dụng.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Đơn Vị Tổ Chức Mới</span>
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
            placeholder="Tìm kiếm tổ chức theo tên hoặc mã..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Danh Sách Đơn Vị Đang Hoạt Động</h3>
          <span className="font-mono text-[#64748b]">Tổng số: {filteredOrgs.length} Đơn vị</span>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Mã đơn vị</th>
                <th className="p-3">Tên trường học / Doanh nghiệp</th>
                <th className="p-3">Loại hình</th>
                <th className="p-3">Sĩ số người dùng</th>
                <th className="p-3">Gói dịch vụ</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredOrgs.map((o) => (
                <tr key={o.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{o.code}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{o.name}</td>
                  <td className="p-3 text-[#64748b]">{o.type}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{o.usersCount} Thành viên</td>
                  <td className="p-3 text-[#64748b]">{o.plan}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      o.status === 'Hoạt động'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteOrg(o.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa tổ chức"
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

      {/* Create Org Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateOrg} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Building2 className="w-5 h-5" /> Thêm đơn vị tổ chức mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên đơn vị:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Đại Học Bách Khoa TP.HCM..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Mã tiền tố (Prefix Code):</label>
                  <input
                    required
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="Ví dụ: HCMUT..."
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Loại hình tổ chức:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Trường Đại học</option>
                    <option>Doanh nghiệp</option>
                    <option>Trường THPT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Gói dịch vụ:</label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Education Basic</option>
                    <option>Enterprise Education</option>
                    <option>Enterprise Business</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Trạng thái:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Hoạt động</option>
                    <option>Tạm khóa</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] font-bold rounded-lg"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg"
              >
                Thêm tổ chức
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}