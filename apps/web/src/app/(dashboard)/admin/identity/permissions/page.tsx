'use client';

import React, { useState } from 'react';
import { Lock, Plus, ShieldCheck, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface PermissionItem {
  id: string;
  code: string;
  module: string;
  desc: string;
}

export default function AdminPermissionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [permissions, setPermissions] = useState<PermissionItem[]>([
    { id: 'perm_cat_take', code: 'assessment:cat:take', module: 'Learner Exam', desc: 'Quyền thực hiện kỳ thi CAT thích ứng IRT' },
    { id: 'perm_proof_submit', code: 'portfolio:proof:submit', module: 'Learner Portfolio', desc: 'Quyền nộp đồ án minh chứng cho AI Pre-grading' },
    { id: 'perm_review_approve', code: 'portfolio:review:approve', module: 'Teacher Review', desc: 'Quyền phê duyệt đồ án học viên và chuyển đúc SBT' },
    { id: 'perm_sbt_mint', code: 'verification:sbt:mint', module: 'Teacher Blockchain', desc: 'Quyền kích hoạt đúc SBT hàng loạt lên Polygon Mainnet' },
    { id: 'perm_campaign_create', code: 'recruitment:campaign:create', module: 'Employer HR', desc: 'Quyền tạo chiến dịch tuyển dụng và nhập JD' },
  ]);

  // Form states
  const [newCode, setNewCode] = useState('');
  const [newModule, setNewModule] = useState('Learner Exam');
  const [newDesc, setNewDesc] = useState('');

  const handleCreatePermission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const newP: PermissionItem = {
      id: `perm_${newCode.replace(/:/g, '_')}`,
      code: newCode.toLowerCase(),
      module: newModule,
      desc: newDesc
    };

    setPermissions(prev => [...prev, newP]);
    setShowAddModal(false);
    setNewCode('');
    setNewDesc('');
  };

  const handleDeletePermission = (id: string) => {
    setPermissions(prev => prev.filter(p => p.id !== id));
  };

  const filteredPermissions = permissions.filter(p => 
    p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#0f172a]" /> Quản Lý Ma Trận Quyền Hạn Chi Tiết (Permissions Guard)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Chi tiết hóa ma trận quyền hạn cho từng API endpoint & thành phần giao diện.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Quyền Mới</span>
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
            placeholder="Tìm kiếm quyền theo mã, module..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Mã quyền ID</th>
                <th className="p-3">Mã Permission Code</th>
                <th className="p-3">Phân hệ Module</th>
                <th className="p-3">Mô tả chức năng</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredPermissions.map((p) => (
                <tr key={p.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{p.id}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{p.code}</td>
                  <td className="p-3 text-[#64748b]">{p.module}</td>
                  <td className="p-3 text-[#64748b]">{p.desc}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeletePermission(p.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa quyền hạn"
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

      {/* Create Permission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreatePermission} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Lock className="w-5 h-5" /> Thêm quyền hạn bảo mật mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Mã Permission Code:</label>
                <input
                  required
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Ví dụ: identity:user:block..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Phân hệ Module:</label>
                <select
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                >
                  <option>Learner Exam</option>
                  <option>Learner Portfolio</option>
                  <option>Teacher Review</option>
                  <option>Teacher Blockchain</option>
                  <option>Employer HR</option>
                  <option>Admin Security</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Mô tả chức năng:</label>
                <textarea
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Nhập mô tả cụ thể về quyền hạn truy cập API này..."
                  className="w-full h-20 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
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
                Thêm quyền
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}