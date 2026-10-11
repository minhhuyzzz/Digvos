"use client";

import React, { useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { useInView } from "framer-motion";

export function NexaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tối ưu hiệu năng: Chỉ render animation khi phần nền này nằm trong khung nhìn
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef} className="absolute -top-20 bottom-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden -z-20 bg-[#020617]">
      {/* Các bộ lọc SVG Filter cao cấp từ mẫu của bạn */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Dãy lụa chuyển động bằng MeshGradient (Đã thêm lại luồng sáng Trắng) */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-100"
        colors={["#020617", "#ffffff", "#06b6d4", "#1e1b4b", "#f97316"]}
        speed={isInView ? 0.3 : 0}
      />
      
      {/* Lớp lưới (Wireframe) tạo hiệu ứng gợn sóng nghệ thuật */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#000000", "#ffffff", "#06b6d4", "#f97316"]}
        speed={isInView ? 0.2 : 0}
      />
    </div>
  );
}
