"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { Database, Share2, PenTool, ShieldAlert, Cpu, BrainCircuit } from "lucide-react";

export function CompetenceNetwork3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  
  // Tối ưu hóa: Dùng useMotionValue thay vì React state để không bị Re-render liên tục
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    mouseX.set(x);
    mouseY.set(-y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!mounted) return <div className="h-[500px] w-full" />;

  const competences = [
    { id: 0, title: "Thông tin & Dữ liệu", icon: Database, color: "text-blue-500", pos: { rotateY: 0, rotateX: -15, translateZ: 170 }, delay: 0 },
    { id: 1, title: "Giao tiếp & Cộng tác", icon: Share2, color: "text-emerald-500", pos: { rotateY: 72, rotateX: 15, translateZ: 170 }, delay: 0.1 },
    { id: 2, title: "Sáng tạo Nội dung", icon: PenTool, color: "text-purple-500", pos: { rotateY: 144, rotateX: -15, translateZ: 170 }, delay: 0.2 },
    { id: 3, title: "An toàn & Bảo mật", icon: ShieldAlert, color: "text-rose-500", pos: { rotateY: 216, rotateX: 15, translateZ: 170 }, delay: 0.3 },
    { id: 4, title: "Giải quyết Vấn đề", icon: Cpu, color: "text-amber-500", pos: { rotateY: 288, rotateX: -15, translateZ: 170 }, delay: 0.4 },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[500px] h-[500px] mx-auto flex items-center justify-center cursor-crosshair overflow-visible"
      style={{ perspective: "1200px" }}
    >
      <motion.div 
        className="w-full h-full absolute inset-0 flex items-center justify-center"
        style={{ 
          transformStyle: "preserve-3d",
          rotateX,
          rotateY
        }}
      >
        {/* Core Glow */}
        <div className="absolute w-56 h-56 bg-[#5a96b0]/20 rounded-full blur-[60px] animate-pulse" />
        
        {/* Central AI Brain */}
        <motion.div 
          className="absolute z-50 w-28 h-28 rounded-full bg-[#020617]/60 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.5)] flex flex-col items-center justify-center overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/50 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-dotted border-blue-400/30 animate-[spin_15s_linear_infinite_reverse]" />
          <BrainCircuit className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,1)]" />
        </motion.div>

        {/* Orbiting Elements */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {competences.map((comp) => {
            const Icon = comp.icon;
            return (
              <div
                key={comp.id}
                className="absolute flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${comp.pos.rotateY}deg) translateZ(${comp.pos.translateZ}px)`,
                }}
              >
                <div style={{ transformStyle: "preserve-3d", transform: `rotateY(${-comp.pos.rotateY}deg)` }}>
                  <motion.div
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <div style={{ transformStyle: "preserve-3d", transform: `rotateX(${comp.pos.rotateX}deg)` }}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          opacity: { delay: comp.delay, duration: 0.8 },
                          scale: { delay: comp.delay, duration: 0.8, type: "spring" }
                        }}
                        className="w-[140px] h-[160px] rounded-2xl backdrop-blur-sm bg-transparent border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] flex flex-col items-center justify-center p-3 gap-3 group hover:bg-white/10 hover:border-white/30 hover:scale-110 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className={`p-4 rounded-xl bg-white shadow-sm border border-slate-100 ${comp.color} group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <h4 className="text-[12px] font-bold text-white/90 text-center uppercase tracking-tight relative z-10 leading-snug">{comp.title}</h4>
                        
                        {/* Floating particles inside card on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-brand-100/40 to-transparent rounded-2xl pointer-events-none" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Outer Data Rings (Pro Sci-Fi HUD) */}
        
        {/* Inner Glowing Ring */}
        <motion.div 
          className="absolute w-[340px] h-[340px] border-[2px] border-cyan-500/20 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.15)_inset,0_0_30px_rgba(6,182,212,0.15)] pointer-events-none"
          style={{ transform: "rotateX(70deg)", transformStyle: "preserve-3d" }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
           <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] -translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] -translate-x-1/2 translate-y-1/2" />
        </motion.div>

        {/* Middle Complex Ring */}
        <motion.div 
          className="absolute w-[460px] h-[460px] border-[3px] border-dashed border-blue-500/30 rounded-full pointer-events-none"
          style={{ transform: "rotateX(70deg)", transformStyle: "preserve-3d" }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-1/4 left-0 w-6 h-[2px] bg-blue-400 shadow-[0_0_15px_#60a5fa] -translate-x-1/2 -translate-y-1/2 rotate-45" />
          <div className="absolute bottom-1/4 right-0 w-6 h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] translate-x-1/2 translate-y-1/2 rotate-45" />
        </motion.div>

        {/* Segmented Glowing Ring */}
        <motion.div 
          className="absolute w-[520px] h-[520px] border-4 border-t-cyan-500/80 border-r-transparent border-b-cyan-500/20 border-l-transparent rounded-full blur-[1px] pointer-events-none"
          style={{ transform: "rotateX(70deg)", transformStyle: "preserve-3d" }}
          animate={{ rotateZ: 180 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Outer Faint Ring */}
        <motion.div 
          className="absolute w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none"
          style={{ transform: "rotateX(70deg)", transformStyle: "preserve-3d" }}
        />
      </motion.div>
    </div>
  );
}
