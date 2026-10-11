"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Kiểm tra xem trang có ở trên đầu (offset < 12px) không
      setIsAtTop(currentScrollY < 12);

      // Nếu cuộn xuống và cuộn vượt quá 80px -> ẩn Header
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        // Cuộn lên -> hiện Header
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${isAtTop 
          ? 'bg-transparent border-transparent py-5 shadow-none' 
          : 'glass backdrop-blur-md border-b border-slate-200/50 py-3.5'
        }
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-brand-500 flex items-center justify-center font-bold text-base text-white shadow-lg shadow-brand-500/10">
            D
          </div>
          <span className={`font-bold text-xl tracking-wider transition-colors ${isAtTop ? 'text-white' : 'text-slate-900'}`}>
            DIG<span className={isAtTop ? "text-cyan-400" : "text-brand-500"}>VOS</span>
          </span>
        </Link>
        
        <nav className={`hidden md:flex space-x-8 text-sm font-medium transition-colors ${isAtTop ? 'text-white/80' : 'text-slate-600'}`}>
          <Link href="/#features" className={`transition-colors ${isAtTop ? 'hover:text-white' : 'hover:text-brand-500'}`}>
            Tính năng
          </Link>
          <Link href="/#metrics" className={`transition-colors ${isAtTop ? 'hover:text-white' : 'hover:text-brand-500'}`}>
            Bối cảnh
          </Link>
          <Link href="/pricing" className={`transition-colors ${isAtTop ? 'hover:text-white' : 'hover:text-brand-500'}`}>
            Bảng giá
          </Link>
          <Link href="/blog" className={`transition-colors ${isAtTop ? 'hover:text-white' : 'hover:text-brand-500'}`}>
            Tin tức
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link href="/select-role?action=login">
            <button className={`text-xs font-semibold px-4 py-2 transition-colors ${isAtTop ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-[#5a96b0]'}`}>
              Đăng Nhập
            </button>
          </Link>
          <Link href="/select-role?action=register">
            <button className={`text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all ${isAtTop ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20' : 'bg-[#5a96b0] hover:bg-[#487a90] text-white shadow-[#5a96b0]/15 hover:shadow-lg'}`}>
              Đăng Ký
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
