'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, ShieldCheck, Mail, Edit, Trash2 } from 'lucide-react';

export default function EmployerTeamsPage() {
  const members = [
    { id: 'usr_1', name: 'Nguyễn Văn Minh', email: 'vinh.nguyen@company.com', role: 'HR Manager (Admin)', status: 'Hoạt động' },
    { id: 'usr_2', name: 'Lê Hoàng Yến', email: 'yen.le@company.com', role: 'Talent Acquisition Lead', status: 'Hoạt động' },
    { id: 'usr_3', name: 'Trần Đức Anh', email: 'anh.tran@company.com', role: 'Tech Recruiter', status: 'Đang mời' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0f172a]" /> Quản Lý Nhóm Tuyển Dụng & Phân Quyền HR
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Quản lý thành viên nhóm tuyển dụng doanh nghiệp & cấp quyền truy cập kho hồ sơ ưng viên.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs">
            <Plus className="w-4 h-4" />
            <span>Mời Thành Viên Mới</span>
          </button>
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Họ & Tên</th>
                <th className="p-3">Email</th>
                <th className="p-3">Vai trò phân quyền</th>
                <th className="p-3 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{m.name}</td>
                  <td className="p-3 font-mono text-[#64748b]">{m.email}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{m.role}</td>
                  <td className="p-3 text-right">
                    <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#0f172a] px-2 py-0.5 rounded border border-[#cbd5e1]">
                      {m.status}
                    </span>
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
