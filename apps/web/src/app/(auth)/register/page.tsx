'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader2, AlertCircle, Eye, EyeOff, User, ChevronLeft, ArrowRight, Mail } from 'lucide-react';
import { saveLocalSession, getDashboardRoute } from '../../../lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithRedirect, isLoading: isAuth0Loading } = useAuth0();
  
  const roleParam = searchParams.get('role');
  const [role, setRole] = useState<string>('STUDENT');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States cho xác thực OTP ngay trên form đăng ký
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [otpSuccess, setOtpSuccess] = useState<string | null>(null);

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.substring(value.length - 1);
    setOtpValues(newOtpValues);
    setError(null);

    // Tự động nhảy sang ô tiếp theo
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace để quay lại ô trước
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Ép buộc luồng chọn vai trò trước nếu không có param role
  useEffect(() => {
    if (!roleParam) {
      router.push('/select-role?action=register');
    } else {
      setRole(roleParam);
    }
  }, [roleParam, router]);

  // Bộ đếm ngược gửi lại mã
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Gửi mã OTP xác thực email trước khi đăng ký
  const handleSendOtp = async () => {
    if (!email) {
      setError('Vui lòng nhập địa chỉ email trước khi gửi mã.');
      return;
    }
    
    setIsSendingOtp(true);
    setError(null);
    setOtpSuccess(null);
    
    try {
      const response = await fetch('http://localhost:4000/auth/send-register-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error?.message || resJson.message || 'Gửi mã xác thực thất bại.');
      }
      
      setIsOtpSent(true);
      setOtpSuccess('Mã xác thực đã được gửi tới hòm thư của bạn.');
      setResendCountdown(60);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Không thể gửi mã. Vui lòng kiểm tra lại email.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Xử lý submit form Đăng ký (gửi kèm mã OTP)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpValues.join('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ họ tên, email, mật khẩu và xác nhận mật khẩu.');
      return;
    }
    if (password.length < 8) {
      setError('Mật khẩu mới phải có tối thiểu 8 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }
    if (fullOtp.length < 6) {
      setError('Vui lòng nhập đủ 6 chữ số của mã xác thực OTP.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, code: fullOtp }),
      });
      
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error?.message || resJson.message || 'Đăng ký tài khoản thất bại.');
      }
      
      const responseData = resJson.data || resJson;
      saveLocalSession(responseData.accessToken, responseData.user);
      
      setOtpSuccess('Đăng ký tài khoản thành công!');
      setTimeout(() => {
        router.push(getDashboardRoute(responseData.user.role));
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Đăng ký không thành công. Mã OTP có thể chưa đúng hoặc hết hạn.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'TEACHER':
        return 'Cổng Giảng viên & Nhà trường';
      default:
        return 'Cổng Học viên';
    }
  };

  const isPageLoading = isAuth0Loading || isLoading;

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
        {/* Nút quay lại */}
        <button
          onClick={() => {
            router.push('/select-role?action=register');
          }}
          className="group flex items-center gap-1 text-sm text-slate-400 hover:text-brand-600 mb-6 transition-colors font-semibold"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Quay lại chọn vai trò
        </button>

        {/* Premium Glass Card */}
        <div className="w-full space-y-8 p-8 md:p-10 bg-white/70 backdrop-blur-2xl border border-white shadow-2xl shadow-brand-900/5 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/10 pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-3">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-xl shadow-brand-500/20 mx-auto bg-gradient-to-br from-brand-400 to-brand-600"
              >
                D
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Đăng ký {getRoleTitle()}
              </h2>
              <p className="text-xs text-slate-400 font-light">
                Tạo không gian làm việc để quản lý và chứng nhận năng lực số.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 min-w-4 mt-0.5" />
                <p className="leading-relaxed font-normal">{error}</p>
              </div>
            )}

            {otpSuccess && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs p-3.5 rounded-xl flex items-start space-x-2.5">
                <svg className="w-4 h-4 text-emerald-600 min-w-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="leading-relaxed font-normal">{otpSuccess}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-4">
                {/* Input Họ Tên */}
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 pl-0.5">Họ và tên</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 pl-12 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                      disabled={isPageLoading}
                      required
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Input Email + Nút gửi mã OTP */}
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 pl-0.5">Địa chỉ Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (isOtpSent) setIsOtpSent(false); // Reset trạng thái OTP nếu đổi email
                      }}
                      className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 pl-12 pr-28 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                      disabled={isPageLoading}
                      required
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-xs font-bold rounded-xl text-white transition-all bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 active:scale-[0.98]"
                      disabled={isSendingOtp || resendCountdown > 0 || !email}
                    >
                      {isSendingOtp ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : resendCountdown > 0 ? (
                        `Gửi lại (${resendCountdown}s)`
                      ) : (
                        'Gửi mã'
                      )}
                    </button>
                  </div>
                </div>

                {/* Ô nhập mã OTP (Cân đối & Tinh tế) */}
                <div className={`transition-all duration-300 ${!isOtpSent ? 'opacity-50' : 'opacity-100'}`}>
                  <div className="flex justify-between items-center mb-2 pl-0.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Mã xác thực email (OTP)</label>
                    {!isOtpSent && (
                      <span className="text-[9px] text-slate-400 font-light italic">Bấm 'Gửi mã' ở trên để kích hoạt</span>
                    )}
                  </div>
                  <div className="flex justify-center gap-2">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpInputsRef.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 bg-white/50 border border-slate-200 rounded-2xl text-center text-lg font-bold focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 disabled:bg-slate-50 disabled:text-slate-400 shadow-sm"
                        disabled={isPageLoading || !isOtpSent}
                      />
                    ))}
                  </div>
                </div>

                {/* Input Mật khẩu */}
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 pl-0.5">Mật khẩu</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tối thiểu 8 ký tự"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                      disabled={isPageLoading}
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

                {/* Input Xác nhận Mật khẩu */}
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 pl-0.5">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                      disabled={isPageLoading}
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
                className="w-full py-4 text-sm font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 text-white flex items-center justify-center gap-2 active:scale-[0.98] bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400"
                disabled={isPageLoading || isLoading}
              >
                {isPageLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  'Đăng ký tài khoản'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F1F5F9]"></div>
              </div>
              <span className="relative bg-white px-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Hoặc</span>
            </div>

            {/* Đăng ký bằng Google */}
            <button
              onClick={() => loginWithRedirect()}
              type="button"
              className="w-full py-4 text-sm font-bold rounded-2xl border-2 border-slate-100 bg-white/50 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 text-slate-600 active:scale-[0.98]"
              disabled={isPageLoading}
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Đăng ký bằng Google
            </button>

            {/* Footer chuyển sang đăng nhập */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-400 font-light">
                Đã có tài khoản?{' '}
                <button 
                  onClick={() => router.push(`/login?role=${role}`)}
                  className="font-bold transition-colors hover:underline focus:outline-none text-brand-600 hover:text-brand-700"
                >
                  Đăng nhập ngay
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-brand-500">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
