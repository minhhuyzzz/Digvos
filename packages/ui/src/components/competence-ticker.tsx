"use client";

import React, { useEffect, useRef } from "react";
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
    desc: "Tìm kiếm, đánh giá nguồn tin cậy, khai thác dữ liệu dựa trên AI.",
    icon: Database,
  },
  {
    id: 1,
    title: "2. Giao tiếp và Cộng tác",
    enTitle: "Communication & Collaboration",
    level: "Level 5-7",
    desc: "Tương tác, làm việc nhóm và chia sẻ tri thức qua môi trường đám mây.",
    icon: Share2,
  },
  {
    id: 2,
    title: "3. Sáng tạo Nội dung số",
    enTitle: "Digital Content Creation",
    level: "Level 4-7",
    desc: "Thiết kế giao diện, lập trình cơ bản, sản xuất truyền thông đa phương tiện.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "4. An toàn và Bảo mật",
    enTitle: "Safety & Security",
    level: "Level 6-8",
    desc: "Bảo vệ danh tính số, phòng ngừa rủi ro giao dịch on-chain.",
    icon: ShieldAlert,
  },
  {
    id: 4,
    title: "5. Giải quyết Vấn đề",
    enTitle: "Problem Solving & Adaptation",
    level: "Level 5-8",
    desc: "Tự động hóa quy trình, gỡ lỗi công nghệ, lấp đầy khoảng trống kỹ năng số.",
    icon: Cpu,
  },
];

export function CompetenceTicker() {
  const rotatorRef = useRef<HTMLDivElement>(null);
  
  // Store rotation angle and drag status in refs to prevent React state re-renders
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let animationId: number;

    const tick = () => {
      if (!isDraggingRef.current) {
        // Slowly rotate continuously
        rotationRef.current = (rotationRef.current - 0.15) % 360;
        
        // Inertial rotation deceleration
        if (Math.abs(velocityRef.current) > 0.05) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= 0.95; // friction coefficient
        }
      } else {
        // Calculate velocity during drag for throw physics
        velocityRef.current = rotationRef.current - startRotationRef.current;
        // Limit max velocity
        velocityRef.current = Math.max(-10, Math.min(10, velocityRef.current));
      }

      if (rotatorRef.current) {
        rotatorRef.current.style.transform = `rotateX(0deg) rotateY(${rotationRef.current}deg)`;
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startRotationRef.current = rotationRef.current;
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const sensitivity = 0.4;
    rotationRef.current = (startRotationRef.current + deltaX * sensitivity) % 360;
    if (rotatorRef.current) {
      rotatorRef.current.style.transform = `rotateX(0deg) rotateY(${rotationRef.current}deg)`;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    startRotationRef.current = rotationRef.current;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const sensitivity = 0.5;
    rotationRef.current = (startRotationRef.current + deltaX * sensitivity) % 360;
    if (rotatorRef.current) {
      rotatorRef.current.style.transform = `rotateX(0deg) rotateY(${rotationRef.current}deg)`;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const translateZValue = 190; 

  return (
    <div className="w-full max-w-md h-[400px] flex flex-col items-center justify-center relative overflow-visible py-10">
      
      {/* 3D Scene Wrapper */}
      <div 
        className="w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Rotator Container */}
        <div
          ref={rotatorRef}
          className="relative w-[240px] h-[220px]"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(0deg) rotateY(0deg)`
          }}
        >
          {competences.map((comp, index) => {
            const Icon = comp.icon;
            const angle = index * (360 / competences.length);

            return (
              <div
                key={comp.id}
                className="absolute inset-0 w-[240px] h-[220px] rounded-2xl border border-slate-700/40 bg-slate-900/95 text-white p-5 flex flex-col justify-between shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#5a96b0]/60 hover:shadow-[#5a96b0]/20 pointer-events-none"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${translateZValue}px)`,
                  backfaceVisibility: "visible",
                  WebkitBackfaceVisibility: "visible"
                }}
              >
                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-[#5a96b0]/15 rounded-lg text-[#5a96b0]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {comp.level}
                  </span>
                </div>

                {/* Card Content */}
                <div className="space-y-1.5 my-auto">
                  <h4 className="text-sm font-bold text-white tracking-tight leading-tight">
                    {comp.title}
                  </h4>
                  <span className="text-[9px] text-[#5a96b0]/90 font-medium block uppercase tracking-wider">
                    {comp.enTitle}
                  </span>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                    {comp.desc}
                  </p>
                </div>

                {/* Card footer indicator */}
                <div className="w-full h-1 bg-gradient-to-r from-[#5a96b0] to-transparent rounded-full opacity-60" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
