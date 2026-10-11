"use client";

import React from 'react';

export default function TestimonialsSection() {
  const column1 = [
    {
      name: "Saman Malik",
      role: "Customer Support Lead",
      quote: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
      initials: "SM",
    },
    {
      name: "Đỗ Khắc Gia Khoa",
      role: "Học viên nhận chứng chỉ SBT Level 6",
      quote: "Luyện CAT Test rất thách thức nhưng phản ánh đúng trần năng lực của tôi. Chứng chỉ SBT Polygon rất độc đáo để đưa vào CV LinkedIn.",
      initials: "KK",
    },
    {
      name: "PGS. TS. Lê Văn Tuấn",
      role: "Trưởng phòng Đào tạo — Đại học Công nghệ",
      quote: "DIGVOS cung cấp một công cụ tuyệt vời giúp chúng tôi số hóa toàn bộ khâu hậu kiểm học vị. SBT trên chuỗi khối hoàn toàn minh bạch.",
      initials: "LT",
    }
  ];

  const column2 = [
    {
      name: "Omar Raza",
      role: "CEO",
      quote: "Enhanced our business operations and efficiency. Highly recommend DIGVOS for its intuitive and modern interface.",
      initials: "OR",
    },
    {
      name: "Zainab Hussain",
      role: "Project Manager",
      quote: "Its robust features and quick support have transformed our workflow, making us significantly more efficient in validating digital skills.",
      initials: "ZH",
    },
    {
      name: "Nguyễn Minh Huy",
      role: "CTO TechVibe Studios",
      quote: "Công nghệ Soulbound Token trên Polygon thực sự là tương lai của chứng chỉ số. Rất an toàn, minh bạch và tối giản hóa quy trình xác thực.",
      initials: "MH",
    }
  ];

  const column3 = [
    {
      name: "Hassan Ali",
      role: "E-commerce Manager",
      quote: "Our business functions improved significantly with a user-friendly design. Quét ví 1 giây để xác minh ứng viên thật sự tiện lợi.",
      initials: "HA",
    },
    {
      name: "TS. Nguyễn Văn A",
      role: "Trưởng khoa CNTT, ĐH Bách Khoa",
      quote: "Hệ thống thi CAT của Digvos giúp chúng tôi đánh giá chính xác năng lực sinh viên. Việc cấp chứng chỉ SBT loại bỏ hoàn toàn vấn nạn bằng giả.",
      initials: "NA"
    },
    {
      name: "Bà Lê Thị B",
      role: "Giám đốc Nhân sự, TechCorp",
      quote: "Nhờ tính năng quét ví Blockchain, chúng tôi tiết kiệm được 80% thời gian background check ứng viên. Tỷ lệ matching rate rất sát với thực tế.",
      initials: "LB"
    }
  ];

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-20 px-4 sm:px-0">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Được Tin Tưởng Bởi Cộng Đồng
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto font-light leading-relaxed">
          Xem các đơn vị giáo dục, doanh nghiệp và học viên nói gì về hiệu quả thực tế của DIGVOS.
        </p>
      </div>
      {/* Main marquee wrapper container */}
      <div className="relative h-[650px] w-full overflow-hidden p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full relative z-10">
          
          {/* Column 1 - Moves Up */}
          <div className="relative h-full overflow-hidden">
            <div className="flex flex-col gap-6 animate-marquee-vertical hover:[animation-play-state:paused] py-4">
              {[...column1, ...column1].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <p className="text-xs text-slate-600 font-light leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5a96b0]/80 to-[#487a90] text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                      <span className="text-[9px] text-slate-400 font-light block">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Moves Down */}
          <div className="relative h-full overflow-hidden">
            <div className="flex flex-col gap-6 animate-marquee-vertical-reverse hover:[animation-play-state:paused] py-4">
              {[...column2, ...column2].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <p className="text-xs text-slate-600 font-light leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5a96b0]/80 to-[#487a90] text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                      <span className="text-[9px] text-slate-400 font-light block">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 - Moves Up */}
          <div className="relative h-full overflow-hidden">
            <div className="flex flex-col gap-6 animate-marquee-vertical hover:[animation-play-state:paused] py-4">
              {[...column3, ...column3].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <p className="text-xs text-slate-600 font-light leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5a96b0]/80 to-[#487a90] text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                      <span className="text-[9px] text-slate-400 font-light block">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Vertical Marquee Animations */}
      <style jsx>{`
        @keyframes marquee-vertical {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-vertical-reverse {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical 28s linear infinite;
        }
        .animate-marquee-vertical-reverse {
          animation: marquee-vertical-reverse 28s linear infinite;
        }
      `}</style>

    </section>
  );
}
