'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, Presentation, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function SelectRoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // action có thể là 'login' hoặc 'register'
  const [action, setAction] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const actionParam = searchParams.get('action');
    if (actionParam === 'register') {
      setAction('register');
    } else {
      setAction('login');
    }
  }, [searchParams]);

  const roles = [
    {
      id: 'STUDENT',
      tag: 'HỌC VIÊN',
      title: 'Học viên (Student)',
      description: 'Đánh giá năng lực số cá nhân & nhận chứng chỉ số Soulbound Token.',
      icon: GraduationCap,
      color: '#5A96B0',
    },
    {
      id: 'TEACHER',
      tag: 'GIẢNG VIÊN',
      title: 'Giảng viên / Nhà trường (Teacher & Org)',
      description: 'Quản lý đào tạo, xây dựng ngân hàng đề & khảo thí thích ứng CAT thông minh.',
      icon: Presentation,
      color: '#5A96B0',
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    if (action === 'register') {
      router.push(`/register?role=${roleId}`);
    } else {
      router.push(`/login?role=${roleId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 relative overflow-hidden text-slate-800 font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[#5A96B0]/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl space-y-10 z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A96B0]/10 border border-[#5A96B0]/20 text-[10px] text-[#5A96B0] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> PHÂN CỔNG TRUY CẬP
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {action === 'register' ? 'Đăng ký không gian số của bạn' : 'Cổng xác thực DIGVOS'}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-normal max-w-lg mx-auto leading-relaxed">
            Chọn không gian làm việc để quản lý và chứng nhận năng lực số.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roles.map((roleItem, index) => {
            const Icon = roleItem.icon;

            return (
              <motion.div
                key={roleItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleRoleSelect(roleItem.id)}
                className="cursor-pointer h-full group relative"
              >
                <div
                  className="h-full flex flex-col justify-between p-8 border border-slate-200/60 bg-white rounded-2xl transition-all duration-300 transform hover:scale-[1.015] hover:border-[#5A96B0]/50 hover:shadow-2xl hover:shadow-[#5A96B0]/5 relative overflow-hidden"
                  style={{
                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.01)'
                  }}
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5A96B0]/0 via-[#5A96B0]/0 to-[#5A96B0]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#5A96B0]/10 text-[#5A96B0] group-hover:bg-[#5A96B0] group-hover:text-white transition-all duration-500 transform group-hover:scale-105">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-bold text-[#5A96B0] bg-[#5A96B0]/10 px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors">
                        {roleItem.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-800 group-hover:text-[#5A96B0] transition-colors">
                        {roleItem.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed group-hover:text-slate-700 transition-colors">
                        {roleItem.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-extrabold text-[#5A96B0] uppercase tracking-wider">
                      {action === 'register' ? 'Đăng ký ngay' : 'Truy cập'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#5A96B0] group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Toggle */}
        <div className="text-center pt-4 space-y-3">
          <p className="text-xs text-slate-500 font-light">
            {action === 'register' ? 'Đã có tài khoản không gian số?' : 'Chưa có tài khoản đăng ký?'}{' '}
            <button
              onClick={() => setAction(action === 'register' ? 'login' : 'register')}
              className="font-bold hover:underline transition-colors focus:outline-none"
              style={{ color: '#5A96B0' }}
            >
              {action === 'register' ? 'Đăng nhập tại đây' : 'Đăng ký tài khoản mới'}
            </button>
          </p>
          {action === 'login' && (
            <p className="text-[10px] text-slate-400 font-light">
              Bạn là Quản trị viên hệ thống?{' '}
              <button
                onClick={() => router.push('/login?role=ADMIN')}
                className="font-semibold text-slate-500 hover:text-[#5A96B0] transition-colors focus:outline-none"
              >
                Đăng nhập Cổng Admin
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SelectRolePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-[#5A96B0]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <SelectRoleContent />
    </Suspense>
  );
}
