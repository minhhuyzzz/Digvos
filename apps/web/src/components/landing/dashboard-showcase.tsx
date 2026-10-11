"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Học Viên",
      imgSrc: "/images/dashboard-student.png",
      alt: "Dashboard Học Viên DIGVOS"
    },
    {
      title: "Nhà Đào Tạo",
      imgSrc: "/images/dashboard-institution.png",
      alt: "Dashboard Đào Tạo DIGVOS"
    },
    {
      title: "Tuyển Dụng",
      imgSrc: "/images/dashboard-recruiter.png",
      alt: "Dashboard Tuyển Dụng DIGVOS"
    }
  ];

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto py-16">
      <div className="text-center space-y-4 mb-10">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-4 py-1.5 rounded-full border border-brand-100">
          Phân vai hệ thống
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Hệ Thống Dashboard Chuyên Biệt
        </h2>
      </div>

      {/* Segmented Control */}
      <div className="flex justify-center mb-12">
        <div className="flex p-1.5 bg-slate-100/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-inner">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 sm:px-8 py-3 rounded-xl text-sm font-bold transition-colors duration-300 ${
                  isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Large Image display area below */}
      <div className="w-full relative group">
        {/* Decorative background glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-300 via-cyan-300 to-brand-300 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
        
        <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[1.5rem] p-3 sm:p-4 shadow-2xl shadow-slate-900/10 min-h-[300px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative"
            >
              <img 
                src={tabs[activeTab].imgSrc} 
                alt={tabs[activeTab].alt}
                className="w-full h-auto object-cover min-h-[280px]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const fallback = parent.querySelector('.fallback-placeholder');
                    if (fallback) fallback.classList.remove('hidden');
                  }
                }}
              />
              <div className="fallback-placeholder hidden w-full h-[280px] md:h-[500px] flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl mb-2 shadow-inner">
                  📊
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">Dashboard {tabs[activeTab].title}</h4>
                  <p className="text-sm text-slate-400 font-light mt-2 max-w-sm mx-auto">
                    Bản xem trước giao diện đang được hoàn thiện. Vui lòng quay lại sau.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
