"use client";

import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FaqCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { 
      q: "Digvos là nền tảng gì và dành cho ai?", 
      a: "Digvos là hệ sinh thái đánh giá năng lực số thế hệ mới, kết hợp Trí tuệ nhân tạo (AI) và Blockchain (Web3). Nền tảng phù hợp cho cá nhân muốn thi lấy chứng chỉ, trường học cần quản lý đào tạo, và doanh nghiệp muốn tuyển dụng nhân sự chất lượng cao dựa trên bộ kỹ năng thực tế." 
    },
    { 
      q: "Bài thi thích ứng (CAT) khác gì so với bài thi truyền thống?", 
      a: "Computerized Adaptive Testing (CAT) sử dụng thuật toán AI để liên tục điều chỉnh độ khó của câu hỏi dựa trên năng lực của bạn theo thời gian thực. Nếu bạn trả lời đúng, câu tiếp theo sẽ khó hơn. Điều này giúp đo lường chính xác năng lực chỉ với thời lượng làm bài giảm 50%." 
    },
    { 
      q: "Soulbound Token (SBT) là gì? Tại sao lại dùng blockchain?", 
      a: "SBT là một dạng tài sản số (NFT) đặc biệt trên mạng lưới Polygon, không thể mua bán hay chuyển nhượng. Khi được cấp vào ví của bạn, nó sẽ nằm đó vĩnh viễn, đóng vai trò như một chứng chỉ đích danh 100% không thể làm giả, minh bạch tuyệt đối." 
    },
    { 
      q: "Tôi không có kiến thức về Crypto hay Web3, liệu có dùng được không?", 
      a: "Hoàn toàn CÓ. Digvos thiết kế trải nghiệm chuẩn Web2 thân thiện. Hệ thống tự động tạo ví ẩn (Account Abstraction) cho bạn thông qua email. Bạn không cần phải mua phí gas, lưu trữ mã seed phrase hay am hiểu về crypto để sử dụng nền tảng." 
    },
    { 
      q: "Trợ lý Gemini AI hoạt động như thế nào trong hệ thống?", 
      a: "Gemini AI được tích hợp sâu vào hệ thống để tự động phân tích câu trả lời tự luận, chấm điểm thực hành mã nguồn mở, và phát hiện các dấu hiệu gian lận với độ chính xác và khách quan tuyệt đối mà không cần giảng viên chấm tay." 
    },
    { 
      q: "Làm thế nào nhà tuyển dụng có thể xác thực chứng chỉ của tôi?", 
      a: "Mỗi SBT đi kèm với một mã QR hoặc liên kết on-chain mã hóa. Nhà tuyển dụng hoặc trường học chỉ cần quét QR hoặc nhấp vào liên kết, hệ thống sẽ truy xuất smart contract (hợp đồng thông minh) để xác nhận tính hợp lệ ngay lập tức trong 1 giây." 
    },
    { 
      q: "Dữ liệu cá nhân và điểm thi của tôi được bảo mật ra sao?", 
      a: "Digvos áp dụng tiêu chuẩn Danh tính Phi tập trung (W3C DID). Quyền sở hữu dữ liệu thuộc về chính bạn. Mọi hồ sơ năng lực đều được mã hóa và không bị phụ thuộc vào bất kỳ máy chủ hay cơ quan trung gian nào." 
    },
    { 
      q: "Digvos sử dụng khung năng lực nào làm tiêu chuẩn?", 
      a: "Hệ thống bài thi của Digvos được biên soạn và đánh giá dựa trên Khung năng lực số Châu Âu (DigComp 3.0), bao phủ 5 lĩnh vực năng lực cốt lõi bao gồm: Xử lý dữ liệu, Giao tiếp, Sáng tạo nội dung, Bảo mật và Giải quyết vấn đề." 
    },
    { 
      q: "Nếu tôi làm sai liên tục, bài thi CAT có kết thúc sớm không?", 
      a: "Có. Điểm mạnh của CAT là khả năng ước lượng năng lực rất nhanh. Nếu thuật toán AI nhận thấy bạn đã đạt đến ngưỡng năng lực nhất định và các câu hỏi tiếp theo không làm thay đổi kết quả đáng kể, bài thi sẽ tự động dừng sớm để tiết kiệm thời gian." 
    },
    { 
      q: "Trường học và Doanh nghiệp có thể tích hợp Digvos không?", 
      a: "Có. Chúng tôi cung cấp hệ thống Webhook và API chuẩn RESTful, giúp dễ dàng tích hợp điểm số và chứng chỉ SBT từ Digvos vào hệ thống LMS (Learning Management System) hoặc ERP nội bộ của tổ chức bạn." 
    }
  ];

  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto py-20 px-4 sm:px-0">
      {/* Tối ưu SEO: Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      <div className="text-center space-y-4 mb-16">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-4 py-1.5 rounded-full border border-brand-100">
          Giải Đáp Thắc Mắc
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Câu Hỏi Thường Gặp
        </h2>
        <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
          Tổng hợp những thắc mắc phổ biến nhất về công nghệ AI, Blockchain và cách thức hoạt động của nền tảng thi Digvos.
        </p>
      </div>

      <div className="space-y-4 mb-24">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button 
              className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <span className="font-bold text-slate-800 text-base md:text-lg pr-4">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-brand-500' : ''}`} />
            </button>
            <AnimatePresence>
              {openFaq === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 border-t border-slate-100 pt-4">
                    <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-cyan-50 p-10 text-center space-y-6 shadow-xl shadow-brand-500/10">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Sẵn sàng nâng cấp năng lực số?</h3>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
          Đăng ký tài khoản và trải nghiệm bài đánh giá trắc nghiệm thích ứng chuẩn Châu Âu DigComp 3.0 chỉ trong 10 phút.
        </p>
        <Link href="/select-role?action=register" className="inline-block mt-4">
          <button className="bg-slate-900 hover:bg-brand-600 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-slate-900/20 flex items-center space-x-2 transition-all mx-auto group">
            <span>Bắt đầu thi thử miễn phí</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </section>
  );
}
