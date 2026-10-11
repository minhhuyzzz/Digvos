"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BackgroundPaths } from '@digvos/ui';
import { CompetenceNetwork3D } from './competence-network-3d';
import { NexaBackground } from './nexa-background';

export default function HeroSection() {
  const title = "Hệ thống Đánh giá và Chứng nhận";
  const words = title.split(" ");

  return (
    <section className="relative isolate w-full min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-12 pb-40">
      <NexaBackground />

      {/* Left column */}
      <div className="relative z-10 flex flex-col items-start text-left space-y-6 max-w-xl pr-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 shadow-sm shadow-brand-500/10 rounded-full px-4 py-1.5 text-xs font-bold text-white/90 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-100/0 via-brand-100/50 to-brand-100/0 animate-[shimmer_2s_infinite] -z-10" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Bảo chứng năng lực thích ứng với DigComp 3.0</span>
        </motion.div>

        <h1 
          className="text-[2rem] sm:text-4xl md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight text-white drop-shadow-xl pb-2"
          style={{ lineHeight: 1.15 }}
        >
          {words.map((word, wi) => (
            <span key={wi} className="whitespace-nowrap mr-[0.35em] last:mr-0">
              {word.split("").map((letter, li) => (
                <motion.span
                  key={`${wi}-${li}`}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: wi * 0.05 + li * 0.015, type: "spring", stiffness: 130, damping: 18 }}
                  className="inline-block text-white"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
          <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-brand-500 font-extrabold pb-2">
            Năng Lực Số Bằng Trí Tuệ Nhân Tạo
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-base md:text-lg text-white/70 font-medium leading-relaxed max-w-lg tracking-wide uppercase"
        >
          NEXA – Next-Gen Excellence Assessment
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 pt-4 w-full sm:w-auto"
        >
          {/* Nút Bắt đầu đánh giá ngay với hiệu ứng viền sáng chạy quanh */}
          <Link href="/select-role?action=register" className="w-full sm:w-auto">
            <div className="relative overflow-hidden rounded-2xl p-[2px] inline-flex w-full sm:w-auto group shadow-2xl shadow-brand-500/30">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e2e8f0_0%,#3b82f6_50%,#e2e8f0_100%)]" />
              <button className="w-full sm:w-auto justify-center bg-slate-950 text-white hover:bg-slate-900 font-semibold px-8 py-4 rounded-[14px] flex items-center space-x-2 transition-all text-sm md:text-base relative z-10">
                <span>Bắt đầu đánh giá ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </Link>
          <Link href="/verify" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto justify-center bg-transparent backdrop-blur-md border border-white/30 hover:border-cyan-400/50 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all shadow-sm hover:shadow-md text-sm">
              Kiểm tra miễn phí
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right column — 3D cylinder ticker */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 flex justify-center mt-12 lg:mt-0"
      >
        <div className="relative">
          {/* Subtle glow behind the ticker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl -z-10" />
          <CompetenceNetwork3D />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
