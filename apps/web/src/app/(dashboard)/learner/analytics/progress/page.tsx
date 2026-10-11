'use client';

import React, { useState } from 'react';
import { BarChart2, ArrowLeft, Calendar, Award, Flame, Search } from 'lucide-react';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  date: string;
  courseName: string;
  lessonName: string;
  duration: string;
  points: string;
}

export default function LearnerProgressPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activities] = useState<ActivityItem[]>([
    { id: 'act_1', date: '28/07/2026', courseName: 'Cơ sở hạ tầng Blockchain & Smart Contract', lessonName: 'Bảo mật token ERC-5192 Soulbound', duration: '45 phút', points: '+150 Pts' },
    { id: 'act_2', date: '27/07/2026', courseName: 'Khảo thí thích ứng lý thuyết CAT IRT', lessonName: 'Thuật toán Rasch 3 tham số', duration: '60 phút', points: '+200 Pts' },
    { id: 'act_3', date: '26/07/2026', courseName: 'Tối ưu hóa UI/UX với Tailwind CSS v4', lessonName: 'Nguyên lý thiết kế Premium Glassmorphism', duration: '30 phút', points: '+100 Pts' }
  ]);

  const filteredActivities = activities.filter(a => 
    a.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.lessonName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Báo Cáo Tiến Độ Học Tập & Chuỗi Streak 7 Ngày</h1>
          <p className="text-xs text-[#64748b] mt-1">Giám sát tổng số giờ rèn luyện năng lực số, lịch sử bài học & chuỗi ngày học tập liên tiếp.</p>
        </div>
        <Link href="/learner" className="px-3.5 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Về Trang chủ</span>
        </Link>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-2 text-xs">
          <span className="text-[#64748b] block font-bold flex items-center gap-1"><Calendar className="w-4 h-4" /> Tổng số giờ học:</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block font-mono">38.5 Giờ</span>
          <span className="text-[10px] text-emerald-600 block font-bold">Tăng 12% so với tuần trước</span>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-2 text-xs">
          <span className="text-[#64748b] block font-bold flex items-center gap-1"><Flame className="w-4 h-4 text-amber-500" /> Chuỗi Streak liên tục:</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block font-mono">🔥 7 Ngày</span>
          <span className="text-[10px] text-amber-600 block font-bold">Học đều đặn mỗi ngày</span>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-2 text-xs">
          <span className="text-[#64748b] block font-bold flex items-center gap-1"><Award className="w-4 h-4 text-purple-600" /> Khóa học hoàn thành:</span>
          <span className="text-2xl font-extrabold text-[#0f172a] block font-mono">3 Khóa</span>
          <span className="text-[10px] text-purple-600 block font-bold">Đã nhận 2 chứng chỉ SBT Polygon</span>
        </div>
      </div>

      {/* Activity Bar Chart SVG */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5"><BarChart2 className="w-4 h-4" /> Phân phối thời gian tự học 7 ngày qua</h3>
        <div className="w-full h-24 flex items-end justify-between pt-4 border-b border-[#cbd5e1] px-4 font-mono text-[10px] text-[#64748b]">
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">1.5h</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '35px' }}></div>
            <span>Thứ 4</span>
          </div>
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">2.0h</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '50px' }}></div>
            <span>Thứ 5</span>
          </div>
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">0.5h</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '12px' }}></div>
            <span>Thứ 6</span>
          </div>
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">3.5h</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '80px' }}></div>
            <span>Thứ 7</span>
          </div>
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">2.5h</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '62px' }}></div>
            <span>Chủ Nhật</span>
          </div>
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">1.0h</span>
            <div className="w-8 bg-[#0f172a] rounded-t-sm" style={{ height: '25px' }}></div>
            <span>Thứ 2</span>
          </div>
          <div className="flex flex-col items-center flex-1 space-y-1">
            <span className="font-bold text-[#0f172a]">2.2h</span>
            <div className="w-8 bg-emerald-600 rounded-t-sm animate-pulse" style={{ height: '55px' }}></div>
            <span>Hôm nay</span>
          </div>
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
            placeholder="Tìm kiếm lịch sử học tập..."
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
          />
        </div>
      </div>

      {/* Data Table Workspace */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
        <div className="border-b border-[#f1f5f9] pb-3 text-xs font-bold text-[#0f172a]">
          Nhật ký rèn luyện kỹ năng số
        </div>

        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left divide-y divide-[#e2e8f0]">
            <thead className="bg-[#f8fafc] font-bold text-[#334155]">
              <tr>
                <th className="p-3">Ngày rèn luyện</th>
                <th className="p-3">Khóa học liên kết</th>
                <th className="p-3">Bài học thực tế</th>
                <th className="p-3">Thời gian học</th>
                <th className="p-3 text-right">Điểm tích lũy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredActivities.map((a) => (
                <tr key={a.id} className="hover:bg-[#f8fafc]">
                  <td className="p-3 font-mono text-[#64748b]">{a.date}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{a.courseName}</td>
                  <td className="p-3 text-[#64748b]">{a.lessonName}</td>
                  <td className="p-3 font-mono text-[#64748b]">{a.duration}</td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-600">{a.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}