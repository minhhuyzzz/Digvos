'use client';

import React, { useState } from 'react';
import { Users, ArrowLeft, Search, Trash2, X, Eye, ShieldCheck, BarChart2 } from 'lucide-react';
import Link from 'next/link';

interface Student {
  id: number;
  name: string;
  code: string;
  theta: string;
  level: string;
  sbtStatus: string;
  email: string;
}

export default function TeacherStudentAnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Phạm Hoàng K', code: 'SV-1092', theta: '+1.85', level: 'Level 5 (Advanced)', sbtStatus: 'Đã đúc SBT', email: 'hoangk.pham@hcmut.edu.vn' },
    { id: 2, name: 'Lê Thanh M', code: 'SV-1120', theta: '+1.92', level: 'Level 5 (Advanced)', sbtStatus: 'Đã đúc SBT', email: 'thanhm.le@hcmut.edu.vn' },
    { id: 3, name: 'Nguyễn Văn Nam', code: 'SV-1402', theta: '+0.45', level: 'Level 3 (Intermediate)', sbtStatus: 'Chờ duyệt', email: 'namnv@hcmut.edu.vn' }
  ]);

  const filteredStudents = students.filter(st => 
    st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Title Banner */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Báo Cáo Phân Tích Năng Lực Học Viên Cá Nhân</h1>
          <p className="text-xs text-[#64748b] mt-1">Đánh giá chi tiết năng lực số của từng học viên theo mô hình lý thuyết IRT Rasch và DigComp.</p>
        </div>
        <Link href="/org" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Về Trang chủ</span>
        </Link>
      </div>

      {/* Filter and Search toolbar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc mã sinh viên..."
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
                <th className="p-3">Họ & Tên học viên</th>
                <th className="p-3">Mã SV</th>
                <th className="p-3">Điểm Theta ($\theta$)</th>
                <th className="p-3">Cấp độ DigComp</th>
                <th className="p-3">Trạng thái SBT</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-bold text-[#0f172a]">{st.name}</td>
                  <td className="p-3 font-mono text-[#64748b]">{st.code}</td>
                  <td className="p-3 font-mono font-bold text-[#0f172a]">{st.theta} $\theta$</td>
                  <td className="p-3 text-[#64748b]">{st.level}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      st.sbtStatus === 'Đã đúc SBT'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {st.sbtStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedStudent(st)}
                      className="px-2.5 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] font-bold rounded-lg transition-all flex items-center space-x-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Inspector Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <BarChart2 className="w-5 h-5" /> Hồ sơ phân tích chi tiết
              </h3>
              <button type="button" onClick={() => setSelectedStudent(null)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Học viên:</span>
                  <span className="font-bold text-[#0f172a]">{selectedStudent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Mã SV:</span>
                  <span className="font-mono font-bold text-[#0f172a]">{selectedStudent.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Email:</span>
                  <span className="font-mono text-[#64748b]">{selectedStudent.email}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#334155] block">Điểm năng lực số (Theta):</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-mono font-extrabold text-[#0f172a]">{selectedStudent.theta} $\theta$</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                    Vượt 85% học viên toàn khóa
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#334155] block">Đánh giá chung:</span>
                <p className="text-[#64748b] leading-relaxed">Học viên có tư duy phân tích hệ thống rất tốt. Đạt mức độ tự chủ cao trong việc quản lý dữ liệu, giải quyết vấn đề kỹ thuật và phát triển nội dung số.</p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg"
              >
                Đóng hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
