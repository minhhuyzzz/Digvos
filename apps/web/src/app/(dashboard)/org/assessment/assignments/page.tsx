'use client';

import React, { useState } from 'react';
import { FileText, Plus, Search, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function TeacherAssignmentsPage() {
  const assignments = [
    { id: 'asg_1', title: 'Đồ án Rest API NestJS & CSDL PostgreSQL', course: 'Lập trình Web Fullstack', deadline: '30/07/2026', submissions: '38/42 Bài', aiStatus: 'Đã sẵn sàng' },
    { id: 'asg_2', title: 'Báo cáo Pentest Web & Chữ ký ECDSA', course: 'An toàn Thông tin', deadline: '05/08/2026', submissions: '25/38 Bài', aiStatus: 'Đang chấm' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#0f172a]" /> Quản Lý Bài Tập & Đồ Án Chấm AI Pre-Grading
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình tiêu chí Rubrics & Hạn nộp bài tập cho sinh viên.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs">
            <Plus className="w-4 h-4" />
            <span>Tạo Bài Tập Mới</span>
          </button>
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Mã bài</th>
                <th className="p-3">Tên đồ án bài tập</th>
                <th className="p-3">Khóa học</th>
                <th className="p-3">Hạn nộp</th>
                <th className="p-3">Đã nộp</th>
                <th className="p-3 text-right">AI Evaluator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {assignments.map((a) => (
                <tr key={a.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{a.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{a.title}</td>
                  <td className="p-3 text-[#64748b]">{a.course}</td>
                  <td className="p-3 font-mono text-[#64748b]">{a.deadline}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{a.submissions}</td>
                  <td className="p-3 text-right">
                    <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#0f172a] px-2 py-0.5 rounded border border-[#cbd5e1]">
                      {a.aiStatus}
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