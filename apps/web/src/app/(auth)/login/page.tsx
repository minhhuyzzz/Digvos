'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Lock, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'STUDENT' | 'TEACHER' | 'EMPLOYER' | 'ADMIN'>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Giả lập callback Auth0
    setTimeout(() => {
      setIsLoading(false);
      // Chuyển hướng trực tiếp tới Dashboard tương ứng
      router.push(`/${role.toLowerCase()}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#07111a] flex items-center justify-center p-6 relative overflow-hidden text-slate-100">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-600/5 blur-[100px] pointer-events-none" />

      <Card variant="premium" className="w-full max-w-md space-y-8 p-10 border border-white/5 shadow-2xl relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-brand-500 flex items-center justify-center font-bold text-xl text-slate-950 shadow-lg shadow-brand-500/20 mx-auto">
            D
          </div>
          <h2 className="text-xl font-extrabold text-white">Chào mừng tới DIGVOS</h2>
          <p className="text-xs text-slate-400 font-light">Đăng nhập một lần duy nhất qua hệ thống xác thực Auth0.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Vai trò đăng nhập (Mô phỏng)</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-400 text-slate-200 cursor-pointer appearance-none"
                >
                  <option value="STUDENT">STUDENT - Học viên</option>
                  <option value="TEACHER">TEACHER - Giảng viên</option>
                  <option value="EMPLOYER">EMPLOYER - Doanh nghiệp</option>
                  <option value="ADMIN">ADMIN - Hệ thống tối cao</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 text-[11px] text-slate-400 flex items-start space-x-2.5">
              <Lock className="w-4 h-4 text-brand-400 min-w-4" />
              <p className="leading-relaxed font-light">
                DIGVOS sử dụng Auth0 OAuth2 để bảo vệ danh tính của bạn. Thông tin được mã hóa đầu-cuối và lưu trữ trên cụm Server bảo mật cao.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3.5 text-xs font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xác thực OAuth...' : 'Đăng Nhập Qua Auth0'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
