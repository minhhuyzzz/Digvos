'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, ShieldCheck, Mail, Edit, Trash2, X } from 'lucide-react';
import Link from 'next/link';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  org: string;
  status: string;
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState<UserItem[]>([
    { id: 'u_101', name: 'Trần Minh Huy', email: 'mhuyyzzz@digvos.vn', role: 'Learner (Học viên)', org: 'ĐH Bách Khoa TP.HCM', status: 'Hoạt động' },
    { id: 'u_102', name: 'ThS. Nguyễn Văn A', email: 'vinh.nguyen@hcmut.edu.vn', role: 'Teacher (Giảng viên)', org: 'ĐH Bách Khoa TP.HCM', status: 'Hoạt động' },
    { id: 'u_103', name: 'Nguyễn Văn Minh', email: 'vinh.nguyen@company.com', role: 'Employer (Doanh nghiệp)', org: 'FPT Software', status: 'Hoạt động' },
  ]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Learner (Học viên)');
  const [newOrg, setNewOrg] = useState('ĐH Bách Khoa TP.HCM');
  const [newStatus, setNewStatus] = useState('Hoạt động');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newU: UserItem = {
      id: `u_${users.length + 101}`,
      name: newName,
      email: newEmail,
      role: newRole,
      org: newOrg,
      status: newStatus
    };

    setUsers(prev => [...prev, newU]);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0f172a]" /> Quản Lý Người Dùng Toàn Hệ Thống
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý tài khoản, gán vai trò người dùng (Roles) & giám sát quyền truy cập toàn Digvos Platform.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Người Dùng Mới</span>
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
            placeholder="Tìm kiếm người dùng theo tên hoặc email..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a]">Danh Sách Thành Viên Hệ Thống</h3>
          <span className="font-mono text-[#64748b]">Tổng số: {filteredUsers.length} Thành viên</span>
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Mã ID</th>
                <th className="p-3">Họ & Tên</th>
                <th className="p-3">Email</th>
                <th className="p-3">Vai trò (Role)</th>
                <th className="p-3">Đơn vị</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono text-[#64748b]">{u.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{u.name}</td>
                  <td className="p-3 font-mono text-[#64748b]">{u.email}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{u.role}</td>
                  <td className="p-3 text-[#64748b]">{u.org}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      u.status === 'Hoạt động'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa người dùng"
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateUser} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Plus className="w-5 h-5" /> Thêm người dùng mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Họ & Tên:</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Email:</label>
                <input
                  required
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Ví dụ: name@domain.com..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Vai trò:</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Learner (Học viên)</option>
                    <option>Teacher (Giảng viên)</option>
                    <option>Employer (Doanh nghiệp)</option>
                    <option>Admin (Hệ thống)</option>
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

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Đơn vị liên kết:</label>
                <select
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                >
                  <option>ĐH Bách Khoa TP.HCM</option>
                  <option>FPT Software</option>
                  <option>Tự do / Khác</option>
                </select>
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
                Thêm người dùng
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}