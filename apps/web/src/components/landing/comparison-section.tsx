"use client";

import React from 'react';
import { Sparkles, Hexagon, Target, Fingerprint, ShieldCheck, BrainCircuit, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesBentoGrid() {
  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 sm:px-6">
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-4 py-1.5 rounded-full border border-brand-100">
          Công Nghệ Lõi
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto">
          Hệ Sinh Thái Đánh Giá <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500">
            Thế Hệ Mới (Next-Gen)
          </span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm md:text-base">
          DIGVOS không dùng cách truyền thống. Chúng tôi kết hợp sức mạnh của Trí tuệ nhân tạo (AI) và Blockchain (Web3) để định nghĩa lại cách đo lường năng lực số.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        
        {/* Card 1: Gemini AI (Large) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-2 bg-slate-900 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group"
        >
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] group-hover:bg-brand-500/30 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] group-hover:bg-cyan-500/30 transition-colors duration-500" />
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="mb-12">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 mb-6">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Gemini AI – Trợ lý chấm điểm thông minh
              </h3>
              <p className="text-slate-300 text-sm md:text-base max-w-md leading-relaxed">
                Không còn chấm tay thủ công. Trí tuệ nhân tạo sẽ tự động phân tích câu trả lời tự luận, chấm điểm thực hành và phát hiện gian lận với độ chính xác tuyệt đối ngay trong thời gian thực.
              </p>
            </div>

            {/* Mock Chat UI */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-3 h-3 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-xs text-slate-300">
                  Phân tích bài làm: Ứng viên thể hiện xuất sắc kỹ năng bảo mật dữ liệu. Khuyến nghị điểm: <strong className="text-white">95/100</strong>.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Blockchain SBT (Tall) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1 md:col-span-1 md:row-span-2 bg-gradient-to-b from-brand-50 to-cyan-50 border border-brand-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group flex flex-col"
        >
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-brand-100 mb-6 shrink-0">
            <Hexagon className="w-6 h-6 text-brand-600" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Chứng chỉ SBT <br /> trên Blockchain
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-10">
            Khác với chứng chỉ PDF dễ dàng bị photoshop làm giả, DIGVOS cấp phát Soulbound Token (SBT) vĩnh viễn trên mạng lưới Polygon. Nhà tuyển dụng có thể quét và xác thực 100% trong chưa tới 1 giây.
          </p>

          {/* Floating NFT Card */}
          <div className="mt-auto relative w-full aspect-square rounded-2xl bg-white shadow-xl shadow-brand-500/10 border border-brand-100 p-4 flex flex-col justify-between transform group-hover:rotate-2 group-hover:scale-105 transition-all duration-500">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
              </div>
              <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-full uppercase">Verified</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-400 to-cyan-400 rounded-full mb-3 flex items-center justify-center shadow-inner">
                <Hexagon className="w-8 h-8 text-white" />
              </div>
              <div className="h-2 w-24 bg-slate-100 mx-auto rounded-full mb-2" />
              <div className="h-2 w-16 bg-slate-100 mx-auto rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Card 3: CAT Testing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-shadow duration-300 group"
        >
          <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <Target className="w-5 h-5 text-rose-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            Đánh giá thích ứng (CAT)
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Độ khó của câu hỏi tự động thay đổi (scale) dựa trên năng lực thực tế của từng học viên. Giảm 50% thời gian làm bài nhưng tăng độ chính xác lên 200%.
          </p>
        </motion.div>

        {/* Card 4: W3C DID */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1 bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-shadow duration-300 group"
        >
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <Fingerprint className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            Danh tính Web3 (DID)
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Quyền sở hữu dữ liệu và hồ sơ năng lực hoàn toàn thuộc về bạn, mã hóa 100%, không bị phụ thuộc vào bất kỳ máy chủ của trường học hay tổ chức nào.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
