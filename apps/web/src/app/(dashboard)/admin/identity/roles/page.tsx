'use client';

import React, { useState } from 'react';
import { ShieldCheck, Plus, Lock, Trash2, X, Search } from 'lucide-react';
import Link from 'next/link';

interface Role {
  id: string;
  name: string;
  permissionsCount: number;
  usersCount: number;
  desc: string;
}

export default function AdminRolesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [roles, setRoles] = useState<Role[]>([
    { id: 'rl_1', name: 'Learner (Học viên)', permissionsCount: 14, usersCount: 1250, desc: 'Quyền thi thích ứng CAT, nộp minh chứng đồ án & lưu trữ SBT Polygon.' },
    { id: 'rl_2', name: 'Teacher / Org (Giảng viên)', permissionsCount: 28, usersCount: 85, desc: 'Quyền duyệt minh chứng đồ án, mở đợt thi CAT & đúc SBT Polygon hàng loạt.' },
    { id: 'rl_3', name: 'Employer (Doanh nghiệp)', permissionsCount: 18, usersCount: 42, desc: 'Quyền tạo chiến dịch tuyển dụng, săn hồ sơ ứng viên & tra cứu SBT On-Chain.' },
    { id: 'rl_4', name: 'Super Admin (Quản trị tối cao)', permissionsCount: 62, usersCount: 5, desc: 'Quyền quản trị toàn bộ cấu hình hệ thống, AI Models Vault & Security Logs.' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPermsCount, setNewPermsCount] = useState(10);

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newR: Role = {
      id: `rl_${roles.length + 1}`,
      name: newName,
      permissionsCount: Number(newPermsCount),
      usersCount: 0,
      desc: newDesc
    };

    setRoles(prev => [...prev, newR]);
    setShowAddModal(false);
    setNewName('');
    setNewDesc('');
  };

  const handleDeleteRole = (id: string) => {
    setRoles(prev => prev.filter(r => r.id !== id));
  };

  const filteredRoles = roles.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0f172a]" /> Quản Lý Ma Trận Vai Trò (Roles & Access Control)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Định nghĩa vai trò người dùng và nhóm quyền hạn truy cập các phân hệ ứng dụng.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Vai Trò Mới</span>
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
            placeholder="Tìm kiếm vai trò theo tên hoặc mô tả..."
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
                <th className="p-3">Mã vai trò</th>
                <th className="p-3">Tên vai trò</th>
                <th className="p-3">Mô tả phân quyền</th>
                <th className="p-3">Số quyền (Permissions)</th>
                <th className="p-3">Số người dùng</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredRoles.map((r) => (
                <tr key={r.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{r.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{r.name}</td>
                  <td className="p-3 text-[#64748b]">{r.desc}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{r.permissionsCount} Quyền</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{r.usersCount} Thành viên</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteRole(r.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa vai trò"
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

      {/* Create Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateRole} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5" /> Tạo vai trò người dùng mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên vai trò:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Moderator (Điều phối viên)..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Mô tả quyền hạn:</label>
                <textarea
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Nhập mô tả cụ thể về phạm vi quyền truy cập..."
                  className="w-full h-20 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Số lượng quyền cụ thể:</label>
                <input
                  type="number"
                  value={newPermsCount}
                  onChange={(e) => setNewPermsCount(Number(e.target.value))}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
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
                Tạo vai trò
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}