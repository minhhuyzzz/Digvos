'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit, Layers, FileText, Trash2, X } from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  domain: string;
  lessonsCount: number;
  studentsEnrolled: number;
  status: string;
}

export default function TeacherCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    { id: 'crs_1', title: 'Lập Trình Web Fullstack Architecture & NestJS', domain: 'Domain 3: Sáng tạo Nội dung', lessonsCount: 12, studentsEnrolled: 145, status: 'Xuất bản' },
    { id: 'crs_2', title: 'An Toàn Thông Tin & Mã Hóa Chữ Ký Số Polygon', domain: 'Domain 4: An toàn số', lessonsCount: 8, studentsEnrolled: 98, status: 'Xuất bản' },
    { id: 'crs_3', title: 'Tối Ưu Vector Embeddings & RAG Engine', domain: 'Domain 3: Sáng tạo Nội dung', lessonsCount: 10, studentsEnrolled: 65, status: 'Bản nháp' },
  ]);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState('Domain 3: Sáng tạo Nội dung');
  const [newLessonsCount, setNewLessonsCount] = useState(10);
  const [newStatus, setNewStatus] = useState('Bản nháp');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newC: Course = {
      id: `crs_${courses.length + 1}`,
      title: newTitle,
      domain: newDomain,
      lessonsCount: Number(newLessonsCount),
      studentsEnrolled: 0,
      status: newStatus
    };

    setCourses(prev => [...prev, newC]);
    setShowAddModal(false);
    setNewTitle('');
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0f172a]" /> Quản Lý Khóa Học & Giáo Trình Giảng Dạy
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Soạn thảo giáo trình, liên kết tiêu chí Rubrics DigComp 3.0 & tải lên video bài giảng.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Khóa Học Mới</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm khóa học..."
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
                <th className="p-3">Mã khóa</th>
                <th className="p-3">Tên khóa học</th>
                <th className="p-3">Vùng DigComp</th>
                <th className="p-3">Số bài giảng</th>
                <th className="p-3">Sĩ số học viên</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{c.id}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{c.title}</td>
                  <td className="p-3 text-[#64748b]">{c.domain}</td>
                  <td className="p-3 font-mono text-[#64748b]">{c.lessonsCount} Bài</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{c.studentsEnrolled} HV</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      c.status === 'Xuất bản'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteCourse(c.id)}
                      className="p-1.5 hover:bg-[#e2e8f0] rounded text-rose-600"
                      title="Xóa khóa học"
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

      {/* Create Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateCourse} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <BookOpen className="w-5 h-5" /> Tạo khóa học giảng dạy mới
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Tên khóa học:</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Lập Trình Web Fullstack Architecture & NestJS..."
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">Vùng năng lực DigComp liên kết:</label>
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
                  <label className="font-bold text-[#334155] block">Số bài giảng:</label>
                  <input
                    type="number"
                    value={newLessonsCount}
                    onChange={(e) => setNewLessonsCount(Number(e.target.value))}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#334155] block">Trạng thái phát hành:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 text-xs"
                  >
                    <option>Xuất bản</option>
                    <option>Bản nháp</option>
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
                Tạo khóa học
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}