'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Pause,
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Sparkles, 
  ChevronRight,
  FileText,
  Video,
  Award,
  Volume2,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';

interface Note {
  time: string;
  content: string;
}

export default function LearnerCoursesPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'lessons' | 'notes' | 'resources'>('lessons');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [notesList, setNotesList] = useState<Note[]>([
    { time: '12:45', content: 'Cách config API router trong NestJS dynamic module.' },
    { time: '28:10', content: 'Sử dụng transaction DB để an toàn khi chuyển đổi điểm số.' }
  ]);

  const courses = [
    {
      id: 1,
      title: 'Lập Trình Web Fullstack Architecture & NestJS',
      domain: 'Domain 3 — Sáng tạo Nội dung số',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      duration: '18 Giờ học',
      instructor: 'ThS. Nguyễn Văn A',
      lessons: [
        { id: 101, title: 'Bài 1: Tổng quan Kiến trúc RESTful API & NestJS Framework', duration: '45 phút', completed: true },
        { id: 102, title: 'Bài 2: Thiết kế CSDL PostgreSQL với Prisma ORM & Indexing', duration: '60 phút', completed: true },
        { id: 103, title: 'Bài 3: Mã hóa Mật khẩu Bcrypt & Xác thực JWT Bearer Token', duration: '50 phút', completed: true },
        { id: 104, title: 'Bài 4: Tích hợp AI API OpenAI GPT-4o & Stream Response', duration: '75 phút', completed: false, active: true },
        { id: 105, title: 'Bài 5: Đóng gói Docker Container & Triển khai Production', duration: '90 phút', completed: false },
      ]
    },
    {
      id: 2,
      title: 'An Toàn Thông Tin & Mã Hóa Chữ Ký Số Polygon',
      domain: 'Domain 4 — An toàn & Bảo mật số',
      progress: 40,
      totalLessons: 8,
      completedLessons: 3,
      duration: '12 Giờ học',
      instructor: 'Dr. Trần Thị B',
      lessons: [
        { id: 201, title: 'Bài 1: Nguyên lý Mã hóa Bất đối xứng ECDSA & Keccak-256', duration: '50 phút', completed: true },
        { id: 202, title: 'Bài 2: Viết Smart Contract đúc Soulbound Token (SBT) Solidity', duration: '80 phút', completed: false },
      ]
    }
  ];

  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    setNotesList(prev => [...prev, { time: '14:20', content: noteInput }]);
    setNoteInput('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0f172a]" /> Kho Khóa Học & Bộ Phát Bài Giảng Video
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Theo dõi danh sách bài giảng, video hướng dẫn & tài liệu ghi chú khóa học cá nhân.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm khóa học..."
              className="pl-9 pr-3 py-2 bg-white border border-[#e2e8f0] rounded-xl text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a] w-56 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Video Player Simulator & Lesson Details (65%) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Video Player Box Mockup */}
          <div className="bg-[#0f172a] border border-[#0f172a] rounded-xl overflow-hidden shadow-md text-white aspect-video relative flex flex-col justify-between p-4">
            <div className="flex justify-between items-center text-[10px] opacity-80">
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded border border-white/20">
                {activeCourse.domain}
              </span>
              <span className="font-mono">{activeCourse.instructor}</span>
            </div>

            <div className="my-auto text-center space-y-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-xs rounded-full flex items-center justify-center mx-auto cursor-pointer transition-all border border-white/30"
              >
                {isPlaying ? <Pause className="w-8 h-8 text-white fill-white" /> : <Play className="w-8 h-8 text-white fill-white ml-1" />}
              </button>
              <h2 className="text-sm font-bold max-w-lg mx-auto leading-snug">
                {activeCourse.lessons.find(l => l.active)?.title || activeCourse.lessons[0].title}
              </h2>
            </div>

            {/* Video Controls Bar Mockup */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-[10px]">
              <div className="flex items-center space-x-3">
                <span className="font-mono shrink-0">14:20 / 75:00</span>
                <div className="flex-1 bg-white/20 rounded-full h-1 relative overflow-hidden">
                  <div className="bg-[#ffffff] h-full rounded-full" style={{ width: '18%' }} />
                </div>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <Volume2 className="w-3.5 h-3.5" />
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Tabs Workspace */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex space-x-6 border-b border-[#f1f5f9] text-xs">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`font-bold pb-2.5 -mb-2.5 border-b-2 transition-all ${
                  activeTab === 'lessons' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                Danh sách bài giảng ({activeCourse.lessons.length})
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`font-bold pb-2.5 -mb-2.5 border-b-2 transition-all ${
                  activeTab === 'notes' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                Ghi chú bài học
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`font-bold pb-2.5 -mb-2.5 border-b-2 transition-all ${
                  activeTab === 'resources' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                Tài liệu đính kèm
              </button>
            </div>

            {activeTab === 'lessons' && (
              <div className="space-y-2 text-xs">
                {activeCourse.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      lesson.active
                        ? 'bg-[#0f172a] text-white border-[#0f172a] font-bold shadow-xs'
                        : lesson.completed
                        ? 'bg-[#f8fafc] text-[#334155] border-[#e2e8f0]'
                        : 'bg-white text-[#64748b] border-[#e2e8f0]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Video className="w-4 h-4 text-[#94a3b8] shrink-0" />
                      )}
                      <span>{lesson.title}</span>
                    </div>

                    <span className="font-mono text-[11px] opacity-80">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4 text-xs">
                <form onSubmit={handleAddNote} className="space-y-3">
                  <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Nhập ghi chú quan trọng cho giây thứ 14:20 của bài giảng..."
                    className="w-full h-20 p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                  />
                  <button type="submit" className="px-4 py-2 bg-[#0f172a] text-white text-xs font-bold rounded-lg">Lưu ghi chú</button>
                </form>

                {/* Notes History */}
                <div className="space-y-2 pt-2 border-t border-[#f1f5f9]">
                  <span className="font-bold text-[#0f172a] block">Ghi chú đã lưu:</span>
                  {notesList.map((n, idx) => (
                    <div key={idx} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex items-start space-x-3">
                      <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                        {n.time}
                      </span>
                      <p className="text-[#334155]">{n.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs space-y-2">
                <span className="font-bold text-[#0f172a] block">Tải tài liệu mã nguồn bài giảng:</span>
                <div className="flex items-center justify-between p-2 bg-white border border-[#e2e8f0] rounded">
                  <span className="font-mono text-[#334155]">nestjs-ai-integration-starter.zip (4.5 MB)</span>
                  <button className="px-3 py-1 bg-[#0f172a] text-white text-xs font-bold rounded">Tải về</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Courses List Selector (35%) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b]">Khóa Học Đang Đăng Ký</h3>

            <div className="space-y-3 text-xs">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setIsPlaying(false);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    selectedCourseId === course.id
                      ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                      : 'bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    selectedCourseId === course.id ? 'bg-white/20 text-white' : 'bg-[#e2e8f0] text-[#334155]'
                  }`}>
                    {course.domain}
                  </span>

                  <h4 className="font-bold text-xs leading-snug">{course.title}</h4>

                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] opacity-80">
                      <span>Tiến độ: {course.completedLessons}/{course.totalLessons} Bài</span>
                      <span className="font-mono font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-[#e2e8f0]/40 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${selectedCourseId === course.id ? 'bg-white' : 'bg-[#0f172a]'}`} style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
