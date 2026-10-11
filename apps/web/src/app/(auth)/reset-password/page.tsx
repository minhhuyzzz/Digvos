'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Mã khôi phục mật khẩu (token) không hợp lệ hoặc đã thiếu. Vui lòng kiểm tra lại liên kết trong email.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (password.length < 8) {
      setError('Mật khẩu mới phải có tối thiểu 8 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp. Vui lòng nhập lại.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:4000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message || 'Đặt lại mật khẩu thất bại.');
      }

      setSuccess('Đặt lại mật khẩu thành công! Bạn đang được chuyển hướng về trang Đăng nhập...');
      setTimeout(() => {
        router.push('/select-role?action=login');
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Mã khôi phục đã hết hạn hoặc không hợp lệ. Vui lòng gửi lại yêu cầu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden text-slate-800 font-sans">
      {/* Premium Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-400/20 blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-400/20 blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Premium Glass Card */}
        <div className="w-full p-8 md:p-10 bg-white/70 backdrop-blur-2xl border border-white shadow-2xl shadow-brand-900/5 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/10 pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-2 shadow-inner">
                <KeyRound className="w-8 h-8" />
              </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Mật khẩu mới
            </h2>
            <p className="text-xs text-slate-400 font-light">
              Nhập mật khẩu mới cho tài khoản DIGVOS của bạn.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 min-w-4 mt-0.5" />
              <p className="leading-relaxed font-normal">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-[#F0FDF4] border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 min-w-4 mt-0.5" />
              <p className="leading-relaxed font-normal">{success}</p>
            </div>
          )}

          {!success && !error && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3.5">
                {/* Mật khẩu mới */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 pl-1">Mật khẩu mới</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tối thiểu 8 ký tự"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                      disabled={isLoading || !token}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-500 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Xác nhận mật khẩu */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 pl-1">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu mới"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                      disabled={isLoading || !token}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-500 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 text-sm font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 text-white flex items-center justify-center gap-2 active:scale-[0.98] bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 mt-6"
                disabled={isLoading || !token}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang thiết lập...
                  </span>
                ) : (
                  'Đặt lại mật khẩu'
                )}
              </button>
            </form>
          )}

          {(success || error) && (
            <button
              onClick={() => router.push('/select-role?action=login')}
              className="w-full py-4 text-sm font-bold rounded-2xl bg-white/50 border-2 border-slate-100 hover:bg-white hover:border-slate-200 text-slate-600 transition-all shadow-sm active:scale-[0.98]"
            >
              Quay lại đăng nhập
            </button>
          )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-brand-500">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
