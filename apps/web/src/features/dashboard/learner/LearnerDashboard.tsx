'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Play, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Flame, 
  Layers,
  ArrowRight,
  Cpu,
  Target,
  FileText,
  BarChart2,
  Zap,
  Check,
  ShieldCheck,
  Compass,
  Trophy,
  Lock,
  Star,
  Users,
  Search,
  ExternalLink,
  Plus,
  Terminal,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { DigCompRadarChart } from '../components/DigCompRadarChart';

interface LabItem {
  id: string;
  name: string;
  domain: string;
  status: string;
  score: string;
  timeSpent: string;
}

interface TimelineItem {
  id: string;
  time: string;
  action: string;
  type: 'learning' | 'assessment' | 'sbt';
  details: string;
}

export const LearnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'proofs' | 'sbt_vault' | 'leaderboard'>('proofs');

  const dailyQuests = [
    { id: 1, title: 'Hoàn thành 1 bài thi thích ứng CAT', done: true, reward: '+50 XP' },
    { id: 2, title: 'Nộp minh chứng Đồ án Microservices', done: false, reward: 'Tiến độ Mint SBT' },
  ];

  const ongoingCourses = [
    { 
      id: 1, 
      title: 'Lập Trình Web Fullstack & Tích hợp AI (Next.js 14)', 
      progress: 75, 
      nextLesson: 'Bài 14: AI Prompt Engineering & Vector Embeddings', 
      domain: 'Domain 3 - Sáng tạo nội dung số',
      teacher: 'ThS. Nguyễn Văn A',
      totalLessons: 20,
      completedLessons: 15,
      estimatedTimeLeft: '2.5 giờ'
    },
    { 
      id: 2, 
      title: 'An Toàn Thông Tin & Bảo Mật Dữ Liệu Số Nâng Cao', 
      progress: 40, 
      nextLesson: 'Bài 05: Mã hóa Bất đối xứng & Xác thực SBT On-Chain', 
      domain: 'Domain 4 - An toàn & Bảo mật số',
      teacher: 'Dr. Trần Thị B',
      totalLessons: 15,
      completedLessons: 6,
      estimatedTimeLeft: '4.0 giờ'
    },
  ];

  const skillLevelPath = [
    { level: 'F1', title: 'Foundation 1', status: 'completed' },
    { level: 'F2', title: 'Foundation 2', status: 'completed' },
    { level: 'I3', title: 'Intermediate 3', status: 'completed' },
    { level: 'I4', title: 'Intermediate 4 (Hiện tại)', status: 'current' },
    { level: 'A5', title: 'Advanced 5', status: 'target' },
    { level: 'A6', title: 'Advanced 6', status: 'locked' },
    { level: 'S7', title: 'Specialized 7', status: 'locked' },
    { level: 'S8', title: 'Specialized 8', status: 'locked' },
  ];

  const submittedProofs = [
    { id: 'p_101', title: 'Xây dựng REST API & Mô hình hóa CSDL PostgreSQL', date: '25/07/2026', scoreAI: '92/100', status: 'Đã phê duyệt', reviewer: 'ThS. Nguyễn Văn A' },
    { id: 'p_102', title: 'Báo cáo Phân tích An toàn Hệ thống Web & Penetration Test', date: '22/07/2026', scoreAI: '85/100', status: 'Đã phê duyệt', reviewer: 'Dr. Trần Thị B' },
    { id: 'p_103', title: 'Đồ án Microservices & Message Queue RabbitMQ', date: 'Hôm nay', scoreAI: 'Chờ AI duyệt', status: 'Đang xử lý', reviewer: 'Hệ thống AI' },
  ];

  const topPeerLeaderboard = [
    { rank: 1, name: 'Trần Minh Huy (Bạn)', level: 'Level 4 (Intermediate)', theta: '+1.45', sbt: 4 },
    { rank: 2, name: 'Phạm Hoàng K', level: 'Level 4 (Intermediate)', theta: '+1.38', sbt: 3 },
    { rank: 3, name: 'Lê Thanh M', level: 'Level 3 (Intermediate)', theta: '+1.20', sbt: 3 },
  ];

  // 📝 NEW WIREFRAME DATA: Practical Labs & Detailed Activity Timeline
  const [practicalLabs] = useState<LabItem[]>([
    { id: 'lab_1', name: 'Lab 1: Cấu hình dynamic routing trong NestJS', domain: 'Domain 3', status: 'Passed', score: '95/100', timeSpent: '45 phút' },
    { id: 'lab_2', name: 'Lab 2: Viết smart contract ERC-5192 đúc Soulbound Token', domain: 'Domain 4', status: 'Passed', score: '88/100', timeSpent: '70 phút' },
    { id: 'lab_3', name: 'Lab 3: Tích hợp thư viện pgvector tìm kiếm ngữ cảnh RAG', domain: 'Domain 1', status: 'In Progress', score: '--', timeSpent: '25 phút' },
  ]);

  const [activityTimeline] = useState<TimelineItem[]>([
    { id: 't_1', time: '14:30 - Hôm nay', action: 'Nộp đồ án minh chứng Lab 3', type: 'learning', details: 'Hệ thống AI đang chấm điểm tự động bài làm.' },
    { id: 't_2', time: '10:15 - Hôm qua', action: 'Hoàn thành bài thi thích ứng CAT số 4', type: 'assessment', details: 'Năng lực số Theta tăng từ +1.30 lên +1.45.' },
    { id: 't_3', time: '18:40 - 25/07/2026', action: 'Đúc Soulbound Token thành công', type: 'sbt', details: 'Polygon SBT #8942 đã được ghi nhận trên Mainnet.' },
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* 🚀 ROW 1: BENTO HERO BANNER & RETENTION ENGINE (Asymmetrical Bento Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bento 1: Main Course Active Focus (60% Width) */}
        <div className="lg:col-span-7 bg-white border border-[#e2e8f0] hover:border-[#0f172a] rounded-xl p-6 shadow-2xs space-y-4 flex flex-col justify-between transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold bg-[#f1f5f9] text-[#334155] px-2.5 py-0.5 rounded border border-[#cbd5e1] uppercase tracking-wider">
                {ongoingCourses[0].domain}
              </span>
              <span className="text-xs font-mono font-bold text-[#0f172a]">
                {ongoingCourses[0].completedLessons}/{ongoingCourses[0].totalLessons} Bài đã học
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-extrabold text-[#0f172a]">
              {ongoingCourses[0].title}
            </h1>
            <p className="text-xs text-[#64748b]">
              Bài tiếp theo: <strong className="text-[#0f172a]">{ongoingCourses[0].nextLesson}</strong> (Ước tính: {ongoingCourses[0].estimatedTimeLeft})
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#64748b]">
                <span>Tiến độ thăng cấp bài học</span>
                <span className="font-mono font-bold text-[#0f172a]">{ongoingCourses[0].progress}%</span>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                <div className="bg-[#0f172a] h-full rounded-full transition-all duration-500" style={{ width: `${ongoingCourses[0].progress}%` }} />
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-1">
              <Link
                href="/learner/learning/courses"
                className="px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow-xs"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Học bài tiếp theo</span>
              </Link>
              <Link
                href="/learner/assessment/cat"
                className="px-4 py-2.5 bg-white hover:bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#0f172a]" />
                <span>Thi CAT Thích ứng</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bento 2: Daily Retention Quests & Streak Flame (25% Width) */}
        <div className="lg:col-span-3 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> Chuỗi Học 7 Ngày
              </span>
              <span className="text-xs font-mono font-bold text-[#0f172a]">🔥 7D</span>
            </div>

            <span className="text-[11px] font-bold text-[#334155] block pt-1">Nhiệm Vụ Hàng Ngày:</span>
            <div className="space-y-2 text-xs">
              {dailyQuests.map((q) => (
                <div key={q.id} className="p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                      q.done ? 'bg-[#0f172a] border-[#0f172a] text-white' : 'border-[#cbd5e1] bg-white'
                    }`}>
                      {q.done && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={`text-[11px] ${q.done ? 'line-through text-[#64748b]' : 'font-bold text-[#0f172a]'}`}>
                      {q.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold bg-white text-[#334155] border border-[#cbd5e1] px-1.5 py-0.5 rounded">
                    {q.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#f1f5f9]">
            <p className="text-[11px] text-[#64748b]">Giữ chuỗi học liên tục để nhận thưởng huy hiệu DigComp Mastery!</p>
          </div>
        </div>

        {/* Bento 3: CAT Ability Score Theta Card (15% Width) */}
        <div className="lg:col-span-2 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] block">Chỉ số Theta IRT</span>
            <span className="text-2xl font-mono font-extrabold text-[#0f172a] block mt-1">+1.45</span>
            <span className="text-[10px] text-[#64748b] block">Level 4 (Intermediate)</span>
          </div>

          <div className="pt-2 border-t border-[#f1f5f9] space-y-2">
            <span className="text-[10px] text-[#64748b] block">Độ tin cậy IRT: <strong>94.8%</strong></span>
            <Link
              href="/learner/assessment/cat"
              className="w-full inline-flex items-center justify-center py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-[11px] font-bold rounded transition-all"
            >
              Thi CAT thích ứng
            </Link>
          </div>
        </div>
      </div>

      {/* 🧭 ROW 2: GAMIFIED SKILL MASTERY ROADMAP & SBT MINTING GOAL (Bento Split Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bento 4: Interactive Skill Mastery Roadmap (68% Width) */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#0f172a]" />
              <h3 className="font-bold text-sm text-[#0f172a]">Lộ Trình Thăng Cấp Năng Lực DigComp 3.0 (8 Cấp Độ)</h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#0f172a] bg-[#f1f5f9] px-2.5 py-0.5 rounded border border-[#cbd5e1]">
              Level 4 / 8 Completed
            </span>
          </div>

          {/* Gamified Horizontal Milestone Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
            {skillLevelPath.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-center space-y-1.5 transition-all ${
                  item.status === 'current'
                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                    : item.status === 'completed'
                    ? 'bg-[#f8fafc] text-[#0f172a] border-[#cbd5e1]'
                    : 'bg-[#f1f5f9]/50 text-[#94a3b8] border-[#e2e8f0]'
                }`}
              >
                <div className="flex justify-center">
                  {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-[#0f172a]" />}
                  {item.status === 'current' && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  {item.status === 'target' && <Target className="w-4 h-4 text-[#0f172a]" />}
                  {item.status === 'locked' && <Lock className="w-3.5 h-3.5 text-[#94a3b8]" />}
                </div>
                <span className="text-xs font-mono font-bold block">{item.level}</span>
                <span className="text-[9px] block leading-tight opacity-90">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bento 5: Polygon SBT Minting Goal Progress Card (32% Width) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#0f172a]" /> Đúc Chứng Chỉ SBT
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">
                Polygon Mainnet
              </span>
            </div>

            <h4 className="font-bold text-xs text-[#0f172a] pt-1">
              Còn 1 bài nộp minh chứng nữa để Mint Chứng chỉ số SBT tiếp theo!
            </h4>
            <p className="text-[11px] text-[#64748b]">
              Mã chứng chỉ dự kiến: <strong>#8943-SBT-FULLSTACK</strong> (Tiến độ hoàn thành: 85%)
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
              <div className="bg-[#0f172a] h-full rounded-full" style={{ width: '85%' }} />
            </div>
            <Link
              href="/learner/portfolio/proofs"
              className="w-full py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded text-center block transition-all"
            >
              Nộp minh chứng ngay
            </Link>
          </div>
        </div>
      </div>

      {/* ⚡ NEW BENTO ROW: QUICK ACTIONS & PRACTICAL LABS & TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Quick Actions (30% Width) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5 border-b border-[#f1f5f9] pb-2">
            <Zap className="w-4 h-4 text-[#0f172a]" /> Thao Tác Nhanh Học Viên
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/learner/portfolio/proofs" className="p-3 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-center font-bold text-[#0f172a] transition-all flex flex-col items-center justify-center space-y-1">
              <FileText className="w-4 h-4" />
              <span>Nộp Đồ Án</span>
            </Link>
            <Link href="/learner/assessment/exams" className="p-3 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-center font-bold text-[#0f172a] transition-all flex flex-col items-center justify-center space-y-1">
              <Cpu className="w-4 h-4" />
              <span>Vào Thi CAT</span>
            </Link>
            <Link href="/learner/portfolio/wallet" className="p-3 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-center font-bold text-[#0f172a] transition-all flex flex-col items-center justify-center space-y-1">
              <Award className="w-4 h-4" />
              <span>Ví Điểm & SBT</span>
            </Link>
            <Link href="/learner/ai/coach" className="p-3 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-center font-bold text-[#0f172a] transition-all flex flex-col items-center justify-center space-y-1">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Hỏi AI Coach</span>
            </Link>
          </div>
        </div>

        {/* Practical Labs Status (45% Width) */}
        <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5 border-b border-[#f1f5f9] pb-2">
            <Terminal className="w-4 h-4 text-emerald-600" /> Báo Cáo Tiến Độ Thực Hành Lab
          </h3>
          <div className="space-y-2">
            {practicalLabs.map((lab) => (
              <div key={lab.id} className="p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#0f172a] block">{lab.name}</span>
                  <span className="text-[10px] text-[#64748b] font-mono">{lab.domain} • Thời gian: {lab.timeSpent}</span>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border block mb-1 text-center ${
                    lab.status === 'Passed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {lab.status}
                  </span>
                  <span className="font-mono font-bold text-[#0f172a] text-[10px] block">{lab.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Activity Timeline (25% Width) */}
        <div className="lg:col-span-3 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
          <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5 border-b border-[#f1f5f9] pb-2">
            <Activity className="w-4 h-4 text-purple-600" /> Lịch Sử Hoạt Động
          </h3>
          <div className="space-y-3 overflow-y-auto max-h-[160px] pr-1">
            {activityTimeline.map((item) => (
              <div key={item.id} className="relative pl-4 border-l-2 border-[#cbd5e1] space-y-1">
                <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full bg-[#0f172a]"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0f172a] text-[10px]">{item.action}</span>
                </div>
                <span className="text-[9px] text-[#64748b] block font-mono">{item.time}</span>
                <p className="text-[9px] text-[#64748b] leading-tight">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📊 ROW 3: INTERACTIVE DATA WORKSPACE BENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bento 6: DigComp 3.0 Radar Chart (65% Width) */}
        <div className="lg:col-span-8">
          <DigCompRadarChart />
        </div>

        {/* Bento 7: Peer Leaderboard & Tabbed Proof Vault (35% Width) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
            <div className="flex space-x-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('proofs')}
                className={`pb-2 -mb-3 border-b-2 transition-all ${
                  activeTab === 'proofs' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                Minh chứng ({submittedProofs.length})
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`pb-2 -mb-3 border-b-2 transition-all ${
                  activeTab === 'leaderboard' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b]'
                }`}
              >
                Bảng thi đua ({topPeerLeaderboard.length})
              </button>
            </div>
          </div>

          {activeTab === 'proofs' && (
            <div className="space-y-2 text-xs">
              {submittedProofs.map((p) => (
                <div key={p.id} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-[#0f172a]">{p.title}</h5>
                    <span className="font-mono font-bold text-[#0f172a]">{p.scoreAI}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#64748b] pt-1">
                    <span>{p.date}</span>
                    <span className="font-bold text-[#334155]">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-2 text-xs">
              {topPeerLeaderboard.map((user) => (
                <div key={user.rank} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0f172a] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                      #{user.rank}
                    </span>
                    <div>
                      <h5 className="font-bold text-[#0f172a]">{user.name}</h5>
                      <span className="text-[10px] text-[#64748b]">{user.level}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#0f172a]">{user.theta} $\theta$</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
