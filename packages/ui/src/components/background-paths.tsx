"use client";

import React, { useEffect, useRef } from "react";

export function BackgroundPaths() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Cấu hình phản hồi kích thước màn hình
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Khởi tạo các hạt dữ liệu động tự do (Data Particles)
    const particleCount = 40;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5, // Chuyển động siêu mượt và chậm rãi
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1, // Kích thước hạt nhỏ mảnh tinh tế
      });
    }

    // 5 Nút mạng lưới năng lực cốt lõi (Core Competence Nodes) định vị theo tỷ lệ phần trăm
    const coreNodes = [
      { name: "DATA LITERACY", px: 0.16, py: 0.22 },
      { name: "COLLABORATION", px: 0.78, py: 0.18 },
      { name: "CONTENT CREATION", px: 0.46, py: 0.5 },
      { name: "SECURITY", px: 0.18, py: 0.76 },
      { name: "PROBLEM SOLVING", px: 0.74, py: 0.82 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      // 1. Cập nhật vị trí và vẽ các hạt dữ liệu trôi nổi
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Giới hạn biên màn hình (bật nẩy lại)
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(90, 150, 176, 0.3)";
        ctx.fill();
      });

      // Tính toán các vị trí động của 5 Nút năng lực để kết nối đường dẫn
      const activeCorePositions = coreNodes.map((node, idx) => {
        const targetX = width * node.px;
        const targetY = height * node.py;
        return {
          name: node.name,
          x: targetX + Math.sin(time * 0.8 + idx) * 12,
          y: targetY + Math.cos(time * 0.8 + idx) * 10,
        };
      });

      // 2. Vẽ mạng lưới kết nối giữa các hạt (Constellation Plexus)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Kết nối hạt gần nhau
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(90, 150, 176, ${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Kết nối các hạt dữ liệu với 5 Nút cốt lõi gần chúng
        activeCorePositions.forEach((node) => {
          const dx = particles[i].x - node.x;
          const dy = particles[i].y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(90, 150, 176, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      }

      // 3. Vẽ 5 điểm nút năng lực (Competence Node Hubs) kèm hào quang phát sáng
      activeCorePositions.forEach((node, idx) => {
        // Hào quang kép chuyển động giãn nở
        ctx.beginPath();
        ctx.arc(node.x, node.y, 22 + Math.sin(time * 2.2 + idx) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(90, 150, 176, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(90, 150, 176, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Điểm nhân trung tâm phát sáng mạnh
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#5a96b0";
        ctx.fill();

        // Tên của nhóm năng lực số hiển thị nhỏ tinh tế dưới nút
        ctx.font = "bold 8.5px Inter, sans-serif";
        ctx.fillStyle = "rgba(100, 116, 139, 0.7)";
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + 28);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
