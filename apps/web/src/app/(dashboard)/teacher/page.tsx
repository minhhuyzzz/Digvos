'use client';

import React from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Users, FileSpreadsheet, CheckSquare, Sparkles, RefreshCw, Plus } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="space-y-8 text-slate-100">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Quản Lý Đào Tạo</h1>
          <p className="text-sm text-slate-400 font-light">Phân tích bài tập thích ứng và chấm điểm tự động bằng AI.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="glass" size="sm" className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Đồng bộ Classroom</span>
          </Button>
          <Button variant="primary" size="sm" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Tạo lớp học mới</span>
          </Button>
        </div>
      </div>

      {/* Quick Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default" className="flex items-center space-x-4">
          <div className="p-3 bg-brand-500/10 rounded-xl text-brand-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Học viên quản lý</span>
            <span className="text-2xl font-extrabold text-white">142 Học viên</span>
          </div>
        </Card>

        <Card variant="default" className="flex items-center space-x-4">
          <div className="p-3 bg-brand-500/10 rounded-xl text-brand-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Đã Chấm Điểm Bằng AI</span>
            <span className="text-2xl font-extrabold text-white">1,250 Bài tập</span>
          </div>
        </Card>

        <Card variant="default" className="flex items-center space-x-4">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Chờ AI Phê Duyệt</span>
            <span className="text-2xl font-extrabold text-white">18 Bài tập</span>
          </div>
        </Card>
      </div>

      {/* AI Grading Logs & Rubrics design */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Class list */}
        <Card variant="default" className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5 text-brand-400" />
              <span>Danh sách Lớp học Phi tập trung</span>
            </h3>
            <span className="text-xs text-slate-500">4 Lớp hoạt động</span>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Lớp Năng lực số Cơ bản A1', code: 'DIG-101-A1', students: 42, progress: '85%' },
              { name: 'Kỹ năng Xử lý Dữ liệu số B2', code: 'DIG-102-B2', students: 38, progress: '62%' },
              { name: 'Lớp Thực hành Prompt AI C1', code: 'DIG-103-C1', students: 35, progress: '91%' },
              { name: 'An toàn thông tin mạng nâng cao D3', code: 'DIG-204-D3', students: 27, progress: '44%' },
            ].map((cls, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">{cls.name}</h4>
                  <span className="text-xs text-slate-500 font-mono">Mã lớp: {cls.code} | Sĩ số: {cls.students} học viên</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Hoàn thành CAT</span>
                    <span className="text-xs font-bold text-brand-400">{cls.progress}</span>
                  </div>
                  <Button variant="glass" size="sm" className="text-xs py-1.5 px-3">
                    Chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Grading queue */}
        <Card variant="premium" className="space-y-6">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <span>AI Chấm điểm Gợi ý</span>
          </h3>

          <div className="space-y-4">
            {[
              { student: 'Lê Hoàng Long', assignment: 'Bài CAT 1.2', score: '88/100', match: '98%' },
              { student: 'Nguyễn Minh Thư', assignment: 'Rubric Viết Prompt', score: '92/100', match: '96%' },
              { student: 'Trần Đại Nghĩa', assignment: 'An toàn dữ liệu', score: '75/100', match: '92%' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-900/80 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{item.student}</span>
                  <span className="text-[10px] text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">Khớp: {item.match}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{item.assignment}</span>
                  <span className="font-bold text-white">Điểm AI: {item.score}</span>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button className="text-red-400 hover:text-red-300 font-semibold px-2 py-1">Sửa</button>
                  <button className="text-brand-400 hover:text-white font-semibold px-2 py-1">Duyệt</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
