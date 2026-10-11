'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader2, AlertCircle, Eye, EyeOff, ChevronLeft, KeyRound, ArrowRight } from 'lucide-react';
import { syncAuth0UserWithBackend, saveLocalSession, getDashboardRoute } from '../../../lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithRedirect, isAuthenticated, user, isLoading: isAuth0Loading } = useAuth0();
  
  const roleParam = searchParams.get('role');
  const [role, setRole] = useState<string>('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States cho OTP (nếu đăng nhập bằng tài khoản chưa kích hoạt)
  const [showOtp, setShowOtp] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState<string | null>(null);

  // States cho Quên mật khẩu
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [isSendingForgot, setIsSendingForgot] = useState(false);

  // Ép buộc luồng chọn vai trò trước nếu không có param role và không phải là callback của Auth0
  useEffect(() => {
    if (roleParam) {
      setRole(roleParam);
    }
  }, [roleParam]);

  // Bộ đếm ngược gửi lại mã
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Xử lý sau khi Auth0 đã xác thực thành công ở client
  useEffect(() => {
    const handleSync = async () => {
      if (isAuthenticated && user) {
        setIsLoading(true);
        setError(null);
        try {
          const syncResult = await syncAuth0UserWithBackend({
            auth0Sub: user.sub || '',
            email: user.email || '',
            name: user.name || user.nickname || '',
            role: role,
          });

          if (syncResult.accessToken && syncResult.user) {
            saveLocalSession(syncResult.accessToken, syncResult.user);
            router.push(getDashboardRoute(syncResult.user.role));
          }
        } catch (err: any) {
          console.error(err);
          setError('Không thể đồng bộ thông tin xác thực với máy chủ. Vui lòng thử lại.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleSync();
  }, [isAuthenticated, user, role, router]);

  // Luồng Đăng nhập Email/Password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng điền đầy đủ email và mật khẩu.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error?.message || resJson.message || 'Đăng nhập thất bại.');
      }
      
      const responseData = resJson.data || resJson;
      
      // Nếu API báo tài khoản chưa verified, chuyển sang form OTP
      if (responseData.requireVerification) {
        setShowOtp(true);
        setOtpSuccess('Tài khoản của bạn chưa được xác thực email. Một mã OTP mới đã được gửi tới email của bạn.');
        setResendCountdown(60);
      } else {
        saveLocalSession(responseData.accessToken, responseData.user);
        router.push(getDashboardRoute(responseData.user.role));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý nhập mã OTP từng ô
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // chỉ nhận số
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.substring(value.length - 1); // lấy ký tự cuối
    setOtpValues(newOtpValues);
    setOtpError(null);

    // Tự động nhảy sang ô tiếp theo
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Xử lý khi nhấn nút Backspace để quay lại ô trước
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Xử lý Xác thực mã OTP gửi về Backend
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpValues.join('');
    if (fullOtp.length < 6) {
      setOtpError('Vui lòng nhập đủ 6 chữ số của mã xác thực.');
      return;
    }

    setIsLoading(true);
    setOtpError(null);
    setOtpSuccess(null);

    try {
      const response = await fetch('http://localhost:4000/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullOtp }),
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error?.message || resJson.message || 'Mã xác thực không hợp lệ hoặc đã hết hạn.');
      }

      const authData = resJson.data || resJson;
      saveLocalSession(authData.accessToken, authData.user);
      
      setOtpSuccess('Xác thực tài khoản và đăng nhập thành công!');
      setTimeout(() => {
        router.push(getDashboardRoute(authData.user.role));
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setOtpError(err.message || 'Xác thực thất bại. Vui lòng kiểm tra lại mã.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gửi lại mã OTP
  const handleResendOtp = async () => {
    if (resendCountdown > 0 || isResending) return;

    setIsResending(true);
    setOtpError(null);
    setOtpSuccess(null);

    try {
      const response = await fetch('http://localhost:4000/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const resJson = await response.json();
        throw new Error(resJson.error?.message || resJson.message || 'Không thể gửi lại mã.');
      }

      setOtpSuccess('Mã xác thực mới đã được gửi vào hòm thư của bạn.');
      setResendCountdown(60);
      setOtpValues(Array(6).fill(''));
      otpInputsRef.current[0]?.focus();
    } catch (err: any) {
      console.error(err);
      setOtpError(err.message || 'Gửi lại mã thất bại. Vui lòng thử lại sau.');
    } finally {
      setIsResending(false);
    }
  };
  // Xử lý gửi yêu cầu Quên mật khẩu
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError('Vui lòng điền địa chỉ email.');
      return;
    }

    setIsSendingForgot(true);
    setForgotError(null);
    setForgotSuccess(null);

    try {
      const response = await fetch('http://localhost:4000/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error?.message || resJson.message || 'Gửi yêu cầu khôi phục mật khẩu thất bại.');
      }

      setForgotSuccess('Yêu cầu thành công! Nếu email của bạn đã đăng ký trên hệ thống, một link đặt lại mật khẩu sẽ được gửi đến hòm thư của bạn trong vài phút.');
    } catch (err: any) {
      console.error(err);
      setForgotError(err.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setIsSendingForgot(false);
    }
  };
  const getRoleTitle = () => {
    switch (role) {
      case 'TEACHER':
        return 'Cổng Giảng viên & Nhà trường';
      case 'ADMIN':
        return 'Cổng Quản trị viên';
      case 'STUDENT':
        return 'Cổng Học viên';
      default:
        return 'hệ thống';
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
        {/* Nút quay lại chọn vai trò */}
        <button
          onClick={() => {
            if (showOtp) {
              setShowOtp(false);
              setOtpError(null);
              setOtpSuccess(null);
            } else if (showForgot) {
              setShowForgot(false);
              setForgotError(null);
              setForgotSuccess(null);
            } else {
              router.push('/select-role?action=login');
            }
          }}
          className="group flex items-center gap-1 text-sm text-slate-400 hover:text-brand-600 mb-6 transition-colors font-semibold"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {showOtp ? 'Quay lại đăng nhập' : showForgot ? 'Quay lại đăng nhập' : 'Quay lại chọn vai trò'}
        </button>

        {/* Premium Glass Card */}
        <div className="w-full p-8 md:p-10 bg-white/70 backdrop-blur-2xl border border-white shadow-2xl shadow-brand-900/5 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/10 pointer-events-none" />
          <div className="relative z-10">
          <AnimatePresence mode="wait">
            {showOtp ? (
              // FORM NHẬP MÃ OTP KHI TÀI KHOẢN CHƯA XÁC THỰC
              <motion.div
                key="otp-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-3 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <KeyRound className="w-8 h-8 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Xác thực Email
                  </h2>
                  <p className="text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
                    Tài khoản của bạn chưa được xác thực. Nhập mã OTP gồm 6 chữ số đã được gửi tới <strong className="text-slate-600 font-semibold">{email}</strong> để đăng nhập.
                  </p>
                </div>

                {otpError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-start space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-red-500 min-w-4 mt-0.5" />
                    <p className="leading-relaxed font-normal">{otpError}</p>
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

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  {/* Grid 6 inputs */}
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
                        className="w-12 h-14 bg-white/50 border border-slate-200 rounded-2xl text-center text-lg font-bold focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 shadow-sm"
                        disabled={isLoading}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-sm font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 text-white flex items-center justify-center gap-2 active:scale-[0.98] bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Đang xác nhận...
                      </>
                    ) : (
                      <>
                        Xác nhận và tiếp tục <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Gửi lại mã */}
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400 font-light">
                    Không nhận được mã?{' '}
                    {resendCountdown > 0 ? (
                      <span className="font-semibold text-slate-500">
                        Gửi lại sau {resendCountdown}s
                      </span>
                    ) : (
                      <button 
                        onClick={handleResendOtp}
                        className="font-bold transition-colors hover:underline focus:outline-none text-brand-600 hover:text-brand-700"
                        disabled={isResending}
                      >
                        {isResending ? 'Đang gửi...' : 'Gửi lại mã ngay'}
                      </button>
                    )}
                  </p>
                </div>
              </motion.div>
            ) : showForgot ? (
              // FORM QUÊN MẬT KHẨU
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-3 mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-xl shadow-brand-500/20 mx-auto bg-gradient-to-br from-brand-400 to-brand-600"
                  >
                    D
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Khôi phục mật khẩu
                  </h2>
                  <p className="text-xs text-slate-400 font-light">
                    DIGVOS sẽ gửi một liên kết đặt lại mật khẩu tới email của bạn.
                  </p>
                </div>

                {forgotError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-start space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-red-500 min-w-4 mt-0.5" />
                    <p className="leading-relaxed font-normal">{forgotError}</p>
                  </div>
                )}

                {forgotSuccess && (
                  <div className="bg-[#F0FDF4] border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl flex items-start space-x-2.5">
                    <svg className="w-4 h-4 text-emerald-600 min-w-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="leading-relaxed font-normal">{forgotSuccess}</p>
                  </div>
                )}

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-3.5">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 pl-0.5">Địa chỉ Email của bạn</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                        disabled={isSendingForgot}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-sm font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 text-white flex items-center justify-center gap-2 active:scale-[0.98] bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400"
                    disabled={isSendingForgot}
                  >
                    {isSendingForgot ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Đang gửi...
                      </span>
                    ) : (
                      'Gửi liên kết khôi phục'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowForgot(false);
                      setForgotError(null);
                      setForgotSuccess(null);
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors block text-center"
                  >
                    Quay lại đăng nhập
                  </button>
                </form>
              </motion.div>
            ) : (
              // FORM ĐĂNG NHẬP THÔNG THƯỜNG
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-3 mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-xl shadow-brand-500/20 mx-auto bg-gradient-to-br from-brand-400 to-brand-600"
                  >
                    D
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Đăng nhập {getRoleTitle()}
                  </h2>
                  <p className="text-xs text-slate-400 font-light">
                    Hệ thống xác thực và phát triển năng lực số DIGVOS.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-start space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-red-500 min-w-4 mt-0.5" />
                    <p className="leading-relaxed font-normal">{error}</p>
                  </div>
                )}

                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-3.5">
                    {/* Input Email */}
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 pl-0.5">Địa chỉ Email</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                        disabled={isPageLoading}
                        required
                      />
                    </div>

                    {/* Input Mật khẩu */}
                    <div>
                      <div className="flex justify-between items-center mb-2 pl-0.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mật khẩu</label>
                        <button
                          type="button"
                          onClick={() => {
                            setShowForgot(true);
                            setForgotEmail(email);
                            setForgotError(null);
                            setForgotSuccess(null);
                          }}
                          className="text-[10px] text-brand-600 hover:text-brand-700 font-bold transition-colors uppercase tracking-wider"
                        >
                          Quên mật khẩu?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••••••"
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
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-sm font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 text-white flex items-center justify-center gap-2 active:scale-[0.98] bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400"
                    disabled={isPageLoading}
                  >
                    {isPageLoading ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Đang xử lý...
                      </span>
                    ) : (
                      'Đăng nhập'
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

                {/* Đăng nhập bằng Google */}
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
                  Đăng nhập bằng Google
                </button>

                {/* Footer chuyển sang đăng ký */}
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400 font-light">
                    Chưa có tài khoản?{' '}
                    <button 
                      onClick={() => router.push(`/register?role=${role}`)}
                      className="font-bold transition-colors hover:underline focus:outline-none text-brand-600 hover:text-brand-700"
                    >
                      Đăng ký ngay
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Dev Login Panel - Only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-2xl shadow-xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider text-center">Dev Accounts</p>
          <div className="flex flex-col gap-2">
            {[
              { role: 'STUDENT', label: 'Learner (Student)' },
              { role: 'TEACHER', label: 'Teacher & Org (Nhà trường)' },
              { role: 'ADMIN', label: 'System Admin' },
            ].map((acc) => (
              <button
                key={acc.role}
                onClick={() => {
                  saveLocalSession('dev-mock-token', {
                    id: 'dev-user-id',
                    email: `dev-${acc.role.toLowerCase()}@digvos.com`,
                    name: `Dev ${acc.role}`,
                    role: acc.role as 'STUDENT' | 'TEACHER' | 'ADMIN'
                  });
                  router.push(getDashboardRoute(acc.role));
                }}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-left flex items-center justify-between"
              >
                {acc.label}
                <ArrowRight className="w-3 h-3 ml-2 opacity-50" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-brand-500">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
