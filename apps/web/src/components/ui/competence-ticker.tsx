"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Share2, PenTool, ShieldAlert, Cpu } from "lucide-react";

interface CompetenceItem {
  id: number;
  title: string;
  enTitle: string;
  level: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const competences: CompetenceItem[] = [
  {
    id: 0,
    title: "1. Thông tin và Dữ liệu",
    enTitle: "Information & Data Literacy",
    level: "Level 4-6",
    desc: "Tìm kiếm, đánh giá nguồn tin cậy, phân loại và khai thác dữ liệu an toàn dựa trên AI.",
    icon: Database,
  },
  {
    id: 1,
    title: "2. Giao tiếp và Cộng tác",
    enTitle: "Communication & Collaboration",
    level: "Level 5-7",
    desc: "Tương tác, làm việc nhóm và chia sẻ tri thức số bảo mật qua môi trường đám mây mã hóa.",
    icon: Share2,
  },
  {
    id: 2,
    title: "3. Sáng tạo Nội dung số",
    enTitle: "Digital Content Creation",
    level: "Level 4-7",
    desc: "Thiết kế giao diện, lập trình cơ bản, sản xuất truyền thông đa phương tiện chuẩn bản quyền.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "4. An toàn và Bảo mật",
    enTitle: "Safety & Security",
    level: "Level 6-8",
    desc: "Bảo vệ danh tính số, phòng ngừa mã độc, lừa đảo và quản lý rủi ro giao dịch on-chain.",
    icon: ShieldAlert,
  },
  {
    id: 4,
    title: "5. Giải quyết Vấn đề",
    enTitle: "Problem Solving",
    level: "Level 5-8",
    desc: "Tự động hóa quy trình, gỡ lỗi công nghệ, thích ứng nhanh và lấp đầy khoảng trống kỹ năng số.",
    icon: Cpu,
  },
];

const VIEWPORT_HEIGHT = 380;
const INACTIVE_HEIGHT = 56;
const ACTIVE_HEIGHT = 132;
const SPACING = 24; // space-y-6

export function CompetenceTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tự động cuộn đổi mục sau mỗi 4.5 giây
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % competences.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Tính toán vị trí dịch chuyển để căn giữa chính xác mục đang hoạt động (Active Item)
  const calculateYOffset = () => {
    const beforeHeight = activeIndex * (INACTIVE_HEIGHT + SPACING);
    const centerOffset = VIEWPORT_HEIGHT / 2 - (beforeHeight + ACTIVE_HEIGHT / 2);
    return centerOffset;
  };

  return (
    <div className="w-full max-w-lg mx-auto md:mr-0 text-left py-4 relative">
      <h3 className="text-xs font-bold text-[#5a96b0] tracking-widest uppercase mb-4 pl-8">
        Khung Năng Lực Số Chuẩn DigComp 3.0
      </h3>

      {/* Viewport chứa khung cuộn tròn (Timeline Wheel) */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none border-l border-slate-200/50"
        style={{ height: `${VIEWPORT_HEIGHT}px` }}
      >
        {/* 1. Thanh chỉ thị tâm ngắm quét năng lượng ở chính giữa (Focal Scanner) */}
        <div className="absolute left-0 top-[190px] -translate-y-1/2 w-full h-[140px] pointer-events-none z-20">
          {/* Nút chỉ thị phát sáng ở trục đứng */}
          <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#5a96b0] shadow-lg shadow-[#5a96b0]/60 z-30" />
          {/* Lớp phủ sáng nhẹ ở chính giữa */}
          <div className="w-full h-full bg-gradient-to-r from-[#5a96b0]/5 to-transparent border-y border-[#5a96b0]/15" />
        </div>

        {/* 2. Container trượt dọc di chuyển mượt mà */}
        <motion.div
          className="flex flex-col space-y-6 pl-8"
          animate={{ y: calculateYOffset() }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
        >
          {competences.map((comp) => {
            const isActive = comp.id === activeIndex;
            const Icon = comp.icon;

            return (
              <motion.div
                key={comp.id}
                onClick={() => setActiveIndex(comp.id)}
                className="cursor-pointer flex items-start space-x-4 origin-left"
                style={{
                  height: isActive ? `${ACTIVE_HEIGHT}px` : `${INACTIVE_HEIGHT}px`
                }}
                animate={{
                  scale: isActive ? 1.05 : 0.9,
                  opacity: isActive ? 1.0 : 0.25,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
              >
                {/* Icon sáng khi ở tâm điểm */}
                <div
                  className={`pt-1 transition-colors duration-500 ${isActive ? "text-[#5a96b0]" : "text-slate-400"
                    }`}
                >
                  <Icon className={`transition-all duration-500 ${isActive ? "w-6 h-6" : "w-5 h-5"}`} />
                </div>

                {/* Văn bản năng lực */}
                <div className="flex-1">
                  <div className="flex items-baseline space-x-3">
                    <h4
                      className={`font-bold tracking-tight transition-colors duration-500 ${isActive ? "text-lg text-slate-900" : "text-sm text-slate-500"
                        }`}
                    >
                      {comp.title}
                    </h4>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-bold bg-[#5a96b0]/15 text-[#5a96b0] px-2 py-0.5 rounded-full"
                      >
                        {comp.level}
                      </motion.span>
                    )}
                  </div>

                  {isActive && (
                    <span className="text-[10px] text-[#5a96b0] font-medium block mt-0.5 uppercase tracking-wider">
                      {comp.enTitle}
                    </span>
                  )}

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 0.8, marginTop: 6 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-xs text-slate-600 font-light leading-relaxed overflow-hidden"
                      >
                        {comp.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
