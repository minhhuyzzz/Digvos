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
          <span className="font-bold text-xl tracking-wider text-slate-900">
            DIG<span className="text-brand-500">VOS</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-brand-500 transition-colors">
            Tính năng
          </Link>
          <Link href="/#metrics" className="hover:text-brand-500 transition-colors">
            Bối cảnh
          </Link>
          <Link href="/pricing" className="hover:text-brand-500 transition-colors">
            Bảng giá
          </Link>
          <Link href="/blog" className="hover:text-brand-500 transition-colors">
            Tin tức
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link href="/login">
            <button className="text-slate-600 hover:text-[#5a96b0] text-xs font-semibold px-4 py-2 transition-colors">
              Đăng Nhập
            </button>
          </Link>
          <Link href="/login?register=true">
            <button className="bg-[#5a96b0] hover:bg-[#487a90] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-[#5a96b0]/15 hover:shadow-lg transition-all">
              Đăng Ký
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
