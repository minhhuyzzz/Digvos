'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '../../components/layout/Sidebar';
import { getMenuByRole } from '../../config/menu';
import { Bell, CreditCard } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<'STUDENT' | 'TEACHER' | 'EMPLOYER' | 'ADMIN'>('STUDENT');

  // Đồng bộ role khi đường dẫn trang thay đổi
  useEffect(() => {
    if (pathname.startsWith('/student')) setRole('STUDENT');
    else if (pathname.startsWith('/teacher')) setRole('TEACHER');
    else if (pathname.startsWith('/employer')) setRole('EMPLOYER');
    else if (pathname.startsWith('/admin')) setRole('ADMIN');
  }, [pathname]);

  const handleRoleChange = (newRole: string) => {
    // Chuyển sang trang chủ của Role tương ứng
    router.push(`/${newRole.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#07111a] flex">
      {/* Sidebar dùng chung */}
      <Sidebar
        menuItems={getMenuByRole(role)}
        currentRole={role}
        onRoleChange={handleRoleChange}
      />

      {/* Nội dung chính của viewport */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all duration-300">
        {/* Header Dashboard */}
        <header className="w-full glass border-b border-white/5 py-4 px-6 flex justify-between items-center z-10 sticky top-0 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white tracking-wide pl-12 md:pl-0">
            {role === 'STUDENT' && 'CỔNG THÔNG TIN HỌC VIÊN'}
            {role === 'TEACHER' && 'CỔNG THÔNG TIN GIẢNG VIÊN'}
            {role === 'EMPLOYER' && 'CỔNG DOANH NGHIỆP'}
            {role === 'ADMIN' && 'CỔNG QUẢN TRỊ TỐI CAO'}
          </h2>
          
          <div className="flex items-center space-x-6">
            {/* Số dư Credits */}
            <div className="hidden sm:flex items-center space-x-2 bg-brand-500/10 border border-brand-500/20 px-4 py-1.5 rounded-xl text-xs text-brand-400 font-semibold">
              <CreditCard className="w-4 h-4" />
              <span>550 Credits</span>
            </div>

            {/* Thông báo */}
            <button className="relative p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
            </button>

            {/* Hồ sơ người dùng */}
            <div className="flex items-center space-x-3 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                U
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">Đỗ Khắc Gia Khoa</span>
                <span className="text-[10px] text-slate-500 tracking-wide font-light">{role} ACCOUNT</span>
              </div>
            </div>
          </div>
        </header>

        {/* Nội dung cụ thể từng trang Dashboard */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
