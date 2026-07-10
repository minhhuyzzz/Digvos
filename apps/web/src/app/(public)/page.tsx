"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Brain, Cpu, ArrowRight } from 'lucide-react';
import { BackgroundPaths } from '../../components/ui/background-paths';
import { CompetenceTicker } from '../../components/ui/competence-ticker';

export default function Home() {
  const title = "Hạ Tầng Chuẩn Hóa & Bảo Chứng Năng Lực Số";
  const words = title.split(" ");

  return (
    <div className="relative w-full">
      {/* Hero Section - Split 1:1 */}
      <div className="relative w-full min-h-[75vh] grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-6 pb-20 overflow-hidden">
        {/* Background vector paths chạy ngầm giới hạn trong Hero */}
        <BackgroundPaths />
        
        {/* Cột trái: Giới thiệu hệ thống */}
        <div className="relative z-10 flex flex-col items-start text-left space-y-8 max-w-xl pr-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-500 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5a96b0]"></span>
            </span>
            <span>Bảo chứng năng lực thích ứng với DigComp 3.0</span>
          </motion.div>

          {/* Heading với hiệu ứng nảy chữ sắc nét */}
          <h1 className="text-4xl sm:text-5xl md:text-[54px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-3 last:mr-0 font-extrabold">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.06 + letterIndex * 0.015,
                      type: "spring",
                      stiffness: 130,
                      damping: 18,
                    }}
                    className="inline-block text-slate-900 font-extrabold"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
            <span className="block text-[#5a96b0] mt-3 font-extrabold leading-none">Dựa Trên Blockchain & AI</span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-[17px] text-slate-500 font-light leading-relaxed max-w-lg"
          >
            DIGVOS kết hợp Trí tuệ Nhân tạo (AI) thích ứng động và Chuỗi khối (Blockchain Polygon) để đánh giá, đào tạo, và cấp chứng chỉ năng lực số không thể làm giả.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2"
          >
            <Link href="/login">
              <button className="bg-[#5a96b0] hover:bg-[#487a90] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-[#5a96b0]/25 flex items-center space-x-2 group transition-all text-sm">
                <span>Bắt đầu đánh giá ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a href="#metrics">
              <button className="glass border border-slate-200/80 hover:border-[#5a96b0] text-slate-600 hover:text-[#5a96b0] font-semibold px-8 py-3.5 rounded-xl transition-all text-sm bg-white/40">
                Tìm hiểu số liệu vĩ mô
              </button>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 flex justify-center md:justify-end"
        >
          <CompetenceTicker />
        </motion.div>
      </div>

      {/* Dashboard Grid Portal */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-4 gap-6 mb-24 pt-6">
        {[
          {
            role: 'STUDENT',
            title: 'Dashboard Học Viên',
            desc: 'Vẽ biểu đồ Radar năng lực, luyện CAT Test động, đúc chứng chỉ SBT Polygon.',
            href: '/student',
          },
          {
            role: 'TEACHER',
            title: 'Dashboard Giảng Viên',
            desc: 'Tạo lớp học, đồng bộ Google Classroom, duyệt chấm bài bằng AI Gemini gợi ý.',
            href: '/teacher',
          },
          {
            role: 'EMPLOYER',
            title: 'Dashboard Doanh Nghiệp',
            desc: 'Săn nhân tài với bộ lọc Radar thông minh, quét QR code kiểm tra chứng chỉ SBT.',
            href: '/employer',
          },
          {
            role: 'ADMIN',
            title: 'Dashboard Quản Trị',
            desc: 'Giám sát giao dịch, cấu hình khung năng lực số động, kiểm duyệt tối cao.',
            href: '/admin',
          },
        ].map((portal, idx) => (
          <div key={idx} className="glass-premium p-6 rounded-2xl text-left flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-500 block mb-2">{portal.role} PORTAL</span>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{portal.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">{portal.desc}</p>
            </div>
            <Link href={portal.href} className="mt-6 text-brand-500 hover:text-brand-600 text-xs font-semibold flex items-center space-x-1 transition-colors">
              <span>Truy cập Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Pain Points & Macro Metrics */}
      <section id="metrics" className="relative z-10 w-full py-12 border-t border-slate-200/80 mb-20 text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-2xl">
            <span className="text-4xl font-extrabold text-brand-500 block mb-2">44%</span>
            <h4 className="text-base font-bold text-slate-900 mb-2">Kỹ năng Thay đổi</h4>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              44% kỹ năng cốt lõi của người lao động sẽ thay đổi hoàn toàn trong 5 năm tới dưới làn sóng AI và số hóa (WEF 2023).
            </p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <span className="text-4xl font-extrabold text-brand-500 block mb-2">1.56 / 3.0</span>
            <h4 className="text-base font-bold text-slate-900 mb-2">Năng lực Số Thấp</h4>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Năng lực số trung bình của lao động Việt Nam hiện đạt mức trung bình thấp 1.56/3 (Nghiên cứu Hoàng Ái Phương, 2024).
            </p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <span className="text-4xl font-extrabold text-brand-500 block mb-2">60%</span>
            <h4 className="text-base font-bold text-slate-900 mb-2">Khoảng trống Tuyển dụng</h4>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              60% doanh nghiệp gặp khó khăn lớn khi đánh giá thực tế năng lực ứng viên trong các chiến dịch tuyển dụng kỹ thuật số.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="relative z-10 w-full text-left">
        <h2 className="text-3xl font-bold text-slate-950 mb-12 text-center">Giải Pháp Core Của DIGVOS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-slate-200/80 bg-white/50 hover:border-[#5a96b0]/30 transition-colors">
            <Brain className="w-10 h-10 text-brand-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Adaptive Testing (CAT)</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              Thuật toán trắc nghiệm thích ứng dựa trên phản hồi thí sinh. Độ khó tự động tinh chỉnh theo thời gian thực để tìm ra trần năng lực số chính xác của bạn.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-slate-200/80 bg-white/50 hover:border-[#5a96b0]/30 transition-colors">
            <Shield className="w-10 h-10 text-brand-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Polygon SBT Verification</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              Chứng chỉ số Soulbound Token (SBT) được đúc trực tiếp trên mạng Polygon. Không thể mua bán, chuyển nhượng hoặc làm giả, bảo chứng vĩnh viễn trên sổ cái.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-slate-200/80 bg-white/50 hover:border-[#5a96b0]/30 transition-colors">
            <Cpu className="w-10 h-10 text-brand-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Anomaly & Grading</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              Sử dụng API Gemini để phân tích ngữ nghĩa file thực hành của sinh viên đối chiếu với ma trận Rubrics, kết hợp proctoring phát hiện gian lận.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
