"use client";

import React, { useState, useRef } from 'react';
import { GraduationCap, School, Briefcase, Sparkles, Target, ShieldCheck, BrainCircuit, Fingerprint, Hexagon, Database, LineChart, FileCheck, Layers, Link as LinkIcon, Lock, Users, Zap, Search, Eye, Download, Workflow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data with FULL features
const rolesData = [
  {
    id: "student",
    title: "Học Viên",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6,182,212,0.3)",
    features: [
      { title: "Bài thi Thích ứng (CAT)", icon: <Target /> },
      { title: "Biểu đồ Radar DigComp 3.0", icon: <LineChart /> },
      { title: "Đúc SBT trên mạng Polygon", icon: <Hexagon /> },
      { title: "Danh tính Web3 (W3C DID)", icon: <Fingerprint /> },
      { title: "Tích hợp CV điện tử", icon: <LinkIcon /> },
      { title: "Lộ trình học tập cá nhân (AI)", icon: <BrainCircuit /> },
      { title: "Quản lý e-Portfolio bảo mật", icon: <ShieldCheck /> },
      { title: "Đăng nhập ẩn danh Zero-Knowledge", icon: <Lock /> },
      { title: "Tra cứu lịch sử thi On-chain", icon: <Database /> },
      { title: "Hệ thống xếp hạng (Leaderboard)", icon: <Users /> },
    ]
  },
  {
    id: "instructor",
    title: "Nhà Đào Tạo",
    icon: <School className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16,185,129,0.3)",
    features: [
      { title: "Thiết lập Ma trận Rubrics tự động", icon: <Layers /> },
      { title: "Gemini AI chấm bài thực hành", icon: <Sparkles /> },
      { title: "Phân tích phổ điểm khóa học", icon: <LineChart /> },
      { title: "Phát hành chứng chỉ SBT hàng loạt", icon: <FileCheck /> },
      { title: "Quản lý lớp học phi tập trung", icon: <Database /> },
      { title: "AI Cảnh báo hành vi gian lận", icon: <ShieldCheck /> },
      { title: "Đồng bộ API Google Classroom", icon: <LinkIcon /> },
      { title: "Xuất báo cáo kiểm định chất lượng", icon: <Download /> },
      { title: "Webhook tích hợp hệ thống LMS", icon: <Workflow /> },
      { title: "Phân quyền Giảng viên & Trợ giảng", icon: <Users /> },
    ]
  },
  {
    id: "recruiter",
    title: "Tuyển Dụng",
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-purple-500 to-pink-600",
    glowColor: "rgba(168,85,247,0.3)",
    features: [
      { title: "Lọc ứng viên chuẩn DigComp", icon: <Search /> },
      { title: "AI Matching Rate với Job Description", icon: <Target /> },
      { title: "Xác thực SBT On-chain (1 giây)", icon: <Zap /> },
      { title: "Kiểm tra toàn vẹn chữ ký số", icon: <ShieldCheck /> },
      { title: "Truy cập Logs kiểm toán bất biến", icon: <Database /> },
      { title: "Tạo luồng bài test đầu vào (Pipeline)", icon: <Workflow /> },
      { title: "Theo dõi Tracking Ứng viên", icon: <Eye /> },
      { title: "Trích xuất hồ sơ định dạng JSON", icon: <Download /> },
      { title: "Quản lý Talent Pool Web3", icon: <Users /> },
      { title: "Bảo mật thông tin chuẩn GDPR", icon: <Lock /> },
    ]
  }
];

// Spotlight Card Component - Light Theme Version
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(14,165,233,0.1)" }: { children: React.ReactNode, className?: string, spotlightColor?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => { setOpacity(0); };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};


export default function StepWorkflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRole = rolesData[activeIndex];

  return (
    <section className="relative z-10 w-full py-24 bg-slate-50/50 overflow-hidden">
      {/* Abstract Background Elements for Light Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100"
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Hệ Sinh Thái Tính Năng</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Chuyên biệt hóa <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500">
              Trải nghiệm người dùng
            </span>
          </h2>
        </div>

        {/* Interactive UI */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Role Selector (Sticky) */}
          <div className="w-full lg:w-1/3 sticky top-32 flex flex-col gap-4">
            {rolesData.map((role, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-full text-left p-6 rounded-2xl transition-all duration-300 overflow-hidden group ${isActive ? 'bg-white border-slate-200 shadow-md' : 'bg-transparent border-transparent hover:bg-white/60'} border`}
                >
                  {/* Active Indicator Glow */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-[0.03]`}
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="activeBorder"
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 rounded-r-full bg-gradient-to-b ${role.color}`}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${isActive ? `bg-gradient-to-br ${role.color} text-white shadow-[0_4px_20px_${role.glowColor}]` : 'bg-white border border-slate-200 text-slate-400 group-hover:text-brand-500 group-hover:border-brand-200 shadow-sm'}`}>
                      {role.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
                        {role.title}
                      </h3>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Feature Grid (Bento Style) */}
          <div className="w-full lg:w-2/3 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {activeRole.features.map((feature, fIdx) => (
                  <SpotlightCard key={fIdx} className="p-6 group cursor-default" spotlightColor={activeRole.glowColor}>
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 shrink-0 text-slate-400 group-hover:text-brand-500 transition-colors duration-300`}>
                        {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-700 group-hover:text-slate-900 transition-colors duration-300 leading-snug">
                          {feature.title}
                        </h4>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
