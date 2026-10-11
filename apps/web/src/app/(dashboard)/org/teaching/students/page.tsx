'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Search, Filter, MoreHorizontal, User, Mail, Phone, BookOpen, Award, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    { id: 'HV001', name: 'Nguyễn Văn A', email: 'vana@example.com', phone: '0901234567', class: 'Frontend K01', progress: 85, status: 'Đang học', enrollDate: '01/06/2026' },
    { id: 'HV002', name: 'Trần Thị B', email: 'thib@example.com', phone: '0902345678', class: 'Backend K02', progress: 45, status: 'Cảnh báo', enrollDate: '15/05/2026' },
    { id: 'HV003', name: 'Lê Văn C', email: 'vanc@example.com', phone: '0903456789', class: 'Frontend K01', progress: 100, status: 'Hoàn thành', enrollDate: '01/04/2026' },
    { id: 'HV004', name: 'Phạm Thị D', email: 'thid@example.com', phone: '0904567890', class: 'System Design', progress: 20, status: 'Đang học', enrollDate: '10/07/2026' },
    { id: 'HV005', name: 'Hoàng Văn E', email: 'vane@example.com', phone: '0905678901', class: 'UX/UI K05', progress: 0, status: 'Mới đăng ký', enrollDate: '25/07/2026' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 relative overflow-hidden">
      <PageHeader 
        title="Quản lý Học viên" 
        description="Theo dõi danh sách và tiến độ học tập của các học viên."
      />

      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên, mã HV hoặc email..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Lọc bộ dữ liệu</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Học viên</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lớp / Khóa học</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tiến độ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">{student.class}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-full max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.progress < 30 ? 'bg-rose-500' : student.progress === 100 ? 'bg-green-500' : 'bg-brand-500'}`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                      student.status === 'Đang học' ? 'bg-blue-50 text-blue-700' :
                      student.status === 'Hoàn thành' ? 'bg-green-50 text-green-700' :
                      student.status === 'Cảnh báo' ? 'bg-rose-50 text-rose-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors"
                    >
                      Xem hồ sơ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
          <span>Hiển thị 1-5 của 120 học viên</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50">&lt;</button>
            <button className="px-3 py-1 border border-brand-500 rounded-md bg-brand-50 text-brand-700 font-bold">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50">3</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50">&gt;</button>
          </div>
        </div>
      </div>

      {/* Slide-over Panel cho Hồ sơ học viên */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedStudent(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
            >
              <div className="p-6 bg-brand-600 text-white flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border-2 border-white/40">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                    <p className="text-brand-100 text-sm">{selectedStudent.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Thông tin liên hệ */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Thông tin liên hệ</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 text-slate-400 mr-3" />
                      <span className="text-slate-700">{selectedStudent.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 text-slate-400 mr-3" />
                      <span className="text-slate-700">{selectedStudent.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 text-slate-400 mr-3" />
                      <span className="text-slate-700">Ngày tham gia: {selectedStudent.enrollDate}</span>
                    </div>
                  </div>
                </div>

                {/* Quá trình học tập */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Lớp đang tham gia</h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold text-slate-900 flex items-center">
                        <BookOpen className="w-4 h-4 text-brand-600 mr-2" />
                        {selectedStudent.class}
                      </h5>
                      <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                        {selectedStudent.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-3">
                      <div 
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${selectedStudent.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Chứng chỉ đạt được */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Chứng chỉ & Khen thưởng</h4>
                  {selectedStudent.progress === 100 ? (
                    <div className="flex items-center p-3 border border-slate-100 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mr-3">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Chứng nhận Hoàn thành khóa học</p>
                        <p className="text-xs text-slate-500">Cấp ngày 10/06/2026</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 italic">Chưa có chứng chỉ nào.</p>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 grid grid-cols-2 gap-3">
                <button className="py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center">
                  Nhắn tin
                </button>
                <button className="py-2.5 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-sm flex items-center justify-center space-x-2">
                  <span>Chi tiết toàn diện</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}