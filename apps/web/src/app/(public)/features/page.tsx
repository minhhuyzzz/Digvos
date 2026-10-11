"use client";

import React from 'react';
import Link from 'next/link';
import { Brain, Shield, Cpu, Database, ArrowRight } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="space-y-20 py-10 text-left text-slate-900 max-w-5xl mx-auto">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Tính năng công nghệ DIGVOS",
            "description": "Các trụ cột kỹ thuật của DIGVOS: CAT Test, SBT Polygon, Gemini AI và Hồ sơ năng lực số."
          })
        }}
      />

      <div className="space-y-4 text-center">
        <span className="text-xs font-bold text-[#5a96b0] uppercase tracking-widest bg-[#5a96b0]/15 px-3 py-1 rounded-full">
          Hạ tầng kỹ thuật cốt lõi
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Giải Pháp Đánh Giá & Bảo Chứng Kỹ Thuật Số
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed text-center">
          Khám phá chi tiết 4 trụ cột công nghệ chính giúp chuẩn hóa toàn diện năng lực lao động thời đại mới.
        </p>
      </div>

      {/* Trụ cột 1: CAT Test */}
      <section id="cat-adaptive" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-slate-100 pt-12">
        <div className="space-y-6">
          <div className="p-3 bg-[#5a96b0]/10 text-[#5a96b0] rounded-xl inline-block">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            1. Trắc Nghiệm Thích Ứng (CAT Test)
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Công nghệ trắc nghiệm thích ứng tinh chỉnh độ khó câu hỏi theo thời gian thực dựa trên Lý thuyết Ứng đáp Câu hỏi (IRT). Hệ thống tự tìm ra trần năng lực của học viên một cách nhanh chóng với số lượng câu hỏi tối giản.
          </p>
          
          {/* CÔNG THỨC TOÁN HỌC THUẬT TOÁN (Chuẩn ckw-design) */}
          <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl font-mono text-xs space-y-3">
            <div className="text-slate-400 font-mono text-[10px]">// Xác suất trả lời đúng của học viên (3PL Model):</div>
            <div className="text-center font-bold text-slate-900 py-2 select-all">
              P(θ) = c + (1 - c) / (1 + e^(-a(θ - b)))
            </div>
            <div className="text-[10px] text-slate-500 space-y-1 pl-2">
              <p>• <span className="font-bold">θ (theta)</span>: Trần năng lực thực tế của học viên [-3.0, 3.0]</p>
              <p>• <span className="font-bold">b</span>: Chỉ số độ khó câu hỏi hiện tại</p>
              <p>• <span className="font-bold">a</span>: Chỉ số độ phân biệt của câu hỏi</p>
              <p>• <span className="font-bold">c</span>: Khả năng đoán mò ngẫu nhiên</p>
            </div>
          </div>
        </div>

        <div className="glass-premium p-8 rounded-3xl border border-slate-200/60 shadow-lg text-xs space-y-4 bg-white/70">
          <h4 className="font-bold text-slate-900 text-sm">Lợi ích kiểm tra thích ứng:</h4>
          <ul className="space-y-3 font-light leading-relaxed text-slate-600">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Rút ngắn 70% số lượng câu hỏi kiểm tra.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Loại bỏ hoàn toàn cảm giác chán nản hay quá tải.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Đo lường độ tin cậy kết quả đạt trên 98%.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Trụ cột 2: Polygon SBT */}
      <section id="sbt-blockchain" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-slate-100 pt-12">
        <div className="glass-premium p-8 rounded-3xl border border-slate-200/60 shadow-lg text-xs space-y-4 bg-white/70 order-2 md:order-1">
          <h4 className="font-bold text-slate-900 text-sm">Giao thức ERC-5192 (Soulbound):</h4>
          <ul className="space-y-3 font-light leading-relaxed text-slate-600">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Token khóa cứng vào ví, không thể chuyển nhượng (non-transferable).</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Hợp đồng thông minh lưu trữ vĩnh viễn trên Polygon.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Hỗ trợ API Webhook cho các cổng tuyển dụng săn nhân tài.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6 order-1 md:order-2">
          <div className="p-3 bg-[#5a96b0]/10 text-[#5a96b0] rounded-xl inline-block">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            2. Bảo Chứng Chuỗi Khối (SBT Certification)
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Các chứng chỉ sau khi đánh giá thành công được ký số mật mã học và đúc thẳng thành các Soulbound Token (SBT) khóa vĩnh viễn trong địa chỉ ví Ethereum/Polygon của người học, bảo vệ tuyệt đối dữ liệu trước nạn làm giả bằng cấp.
          </p>

          <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl font-mono text-xs space-y-3">
            <div className="text-slate-400 font-mono text-[10px]">// Hàm xác minh tính hợp lệ của SBT on-chain:</div>
            <div className="text-left font-bold text-slate-900 py-2 select-all pl-2 border-l-2 border-emerald-500">
              isValid(tokenId) = signatureVerify(hash(metadata), sig)
            </div>
            <p className="text-[9px] text-slate-400 leading-normal pl-2 font-light">
              * Khóa xác thực được lưu trên Smart Contract. Nếu metadata bị đổi dù chỉ 1 ký tự, chữ ký sẽ không khớp và trạng thái trả về False ngay lập tức.
            </p>
          </div>
        </div>
      </section>

      {/* Trụ cột 3: AI Proctoring & Grading */}
      <section id="ai-grading" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-slate-100 pt-12">
        <div className="space-y-6">
          <div className="p-3 bg-[#5a96b0]/10 text-[#5a96b0] rounded-xl inline-block">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            3. AI Chấm Điểm & Giám Sát (Gemini API)
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Tận dụng API mô hình ngôn ngữ lớn để phân tích ngữ nghĩa, so khớp ma trận barem điểm Rubrics chấm điểm các bài tập thực hành văn phòng (Word, Excel) một cách tự động, kết hợp giám sát proctoring chống gian lận thông minh.
          </p>

          <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl font-mono text-xs space-y-3">
            <div className="text-slate-400 font-mono text-[10px]">// Ma trận Rubrics so khớp ngữ nghĩa:</div>
            <div className="text-center font-bold text-slate-900 py-2 select-all">
              Grade = Σ (weight_i * SemanticSimilarity(StudentAnswer_i, Rubric_i))
            </div>
            <div className="text-[10px] text-slate-500 space-y-1 pl-2">
              <p>• <span className="font-bold">weight_i</span>: Trọng số của tiêu chí thứ i trong Rubrics</p>
              <p>• <span className="font-bold">SemanticSimilarity</span>: Độ tương đồng ngữ nghĩa [-1.0, 1.0]</p>
            </div>
          </div>
        </div>

        <div className="glass-premium p-8 rounded-3xl border border-slate-200/60 shadow-lg text-xs space-y-4 bg-white/70">
          <h4 className="font-bold text-slate-900 text-sm">Các đặc điểm nổi bật của trợ lý AI:</h4>
          <ul className="space-y-3 font-light leading-relaxed text-slate-600">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Chấm điểm tài liệu Word/Excel trong 3 giây.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Giải thích chi tiết lỗi sai cho học viên dễ hiểu.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Giảm tải 95% áp lực chấm bài cho giáo viên.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Trụ cột 4: Radar Portfolio */}
      <section id="radar-analytics" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-slate-100 pt-12">
        <div className="glass-premium p-8 rounded-3xl border border-slate-200/60 shadow-lg text-xs space-y-4 bg-white/70 order-2 md:order-1">
          <h4 className="font-bold text-slate-900 text-sm">Hồ sơ số e-Portfolio gồm:</h4>
          <ul className="space-y-3 font-light leading-relaxed text-slate-600">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Biểu đồ mạng nhện Radar chỉ rõ 5 nhóm năng lực.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Lịch sử đúc mã giao dịch và mã ví on-chain liên quan.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#5a96b0] rounded-full" />
              <span>Định dạng mã QR tiện chia sẻ vào hồ sơ xin việc CV.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6 order-1 md:order-2">
          <div className="p-3 bg-[#5a96b0]/10 text-[#5a96b0] rounded-xl inline-block">
            <Database className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            4. Phân Tích Radar e-Portfolio
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Kết quả của bạn được lưu trong một hồ sơ năng lực điện tử trực quan. Biểu đồ mạng nhện Radar giúp bạn và nhà tuyển dụng nhanh chóng phân loại trần kỹ năng thành thạo, phát hiện khoảng cách năng lực để định hướng lộ trình thăng tiến.
          </p>
        </div>
      </section>

      {/* CTA Box */}
      <div className="glass-premium p-10 rounded-3xl border border-slate-200/80 bg-white/50 text-center space-y-6 mt-16 max-w-4xl mx-auto shadow-md">
        <h3 className="font-bold text-slate-900 text-xl">Sẵn sàng nâng cấp năng lực số thời đại số?</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto font-light leading-relaxed">
          Đăng ký tài khoản và trải nghiệm bài test trắc nghiệm thích ứng chuẩn châu Âu DigComp 3.0 chỉ trong 10 phút.
        </p>
        <Link href="/select-role?action=register" className="inline-block">
          <button className="bg-[#5a96b0] hover:bg-[#487a90] text-white font-semibold text-xs px-8 py-3.5 rounded-xl shadow-md flex items-center space-x-2 transition-all">
            <span>Bắt đầu ngay bây giờ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
