'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Settings, 
  Sparkles, 
  HelpCircle, 
  LogOut, 
  Bell, 
  ChevronRight, 
  Sliders,
  Sun,
  Moon,
  Check,
  CreditCard,
  Building,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../providers/NavigationProvider';

interface UserProfileFooterProps {
  role: 'learner' | 'org' | 'teacher' | 'employer' | 'enterprise' | 'admin' | string;
}

export const UserProfileFooter: React.FC<UserProfileFooterProps> = ({ role }) => {
  const { collapsed } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeSubmenuOpen, setIsThemeSubmenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>('light');
  const menuRef = useRef<HTMLDivElement>(null);

  const normalizedRole = role.toLowerCase();

  const getUserDetails = () => {
    switch (normalizedRole) {
      case 'learner':
      case 'student':
        return { name: 'Trần Minh Huy', plan: 'Free', roleName: 'Học viên', letter: 'M', email: 'mhuyyzzz@digvos.vn' };
      case 'teacher':
        return { name: 'Giảng viên Nguyễn Văn A', plan: 'Pro Teacher', roleName: 'Giáo viên', letter: 'G', email: 'teacher@digvos.vn' };
      case 'employer':
      case 'enterprise':
        return { name: 'Doanh nghiệp TechCorp', plan: 'Enterprise', roleName: 'Tuyển dụng', letter: 'E', email: 'hr@techcorp.vn' };
      case 'org':
        return { name: 'Công ty TechCorp', plan: 'Enterprise', roleName: 'Tổ chức', letter: 'T', email: 'org@techcorp.vn' };
      case 'admin':
        return { name: 'System Admin', plan: 'Super Admin', roleName: 'Quản trị', letter: 'A', email: 'admin@digvos.vn' };
      default:
        return { name: 'Trần Minh Huy', plan: 'Free', roleName: 'User', letter: 'U', email: 'user@digvos.vn' };
    }
  };

  const user = getUserDetails();

  const handleThemeSelect = (mode: 'system' | 'light' | 'dark') => {
    setThemeMode(mode);
    setIsThemeSubmenuOpen(false);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsThemeSubmenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full border-t border-slate-100/60 p-2 bg-white" ref={menuRef}>
      {/* Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full bottom-0 ml-3 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2 w-64"
          >
            {/* Header info inside popup */}
            <div className="p-3 border-b border-slate-100/60 flex items-center space-x-3 rounded-xl mb-1">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                {user.letter}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: '#0D0D0D' }}>{user.name}</p>
                <p className="text-xs truncate" style={{ color: '#6B7280' }}>{user.email}</p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md">
                {user.plan}
              </span>
            </div>

            {/* Menu Items tailored by role */}
            <div className="space-y-0.5 text-sm pt-1" style={{ color: '#0D0D0D' }}>
              {/* Role-specific Action Item */}
              {normalizedRole === 'learner' && (
                <Link 
                  href="/learner/billing"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
                >
                  <Sparkles className="w-[18px] h-[18px] text-amber-500" />
                  <span>Nâng cấp Pro</span>
                </Link>
              )}
              {normalizedRole === 'teacher' && (
                <Link 
                  href="/org/teaching/classes"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
                >
                  <Sliders className="w-[18px] h-[18px] text-purple-600" />
                  <span>Cấu hình AI chấm bài</span>
                </Link>
              )}
              {(normalizedRole === 'employer' || normalizedRole === 'enterprise' || normalizedRole === 'org') && (
                <Link 
                  href="/org/billing/subscription"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
                >
                  <CreditCard className="w-[18px] h-[18px] text-indigo-600" />
                  <span>Gói dịch vụ & Hóa đơn</span>
                </Link>
              )}
              {normalizedRole === 'admin' && (
                <Link 
                  href="/admin/system/settings"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
                >
                  <ShieldAlert className="w-[18px] h-[18px] text-emerald-600" />
                  <span>Bảo mật & Cài đặt hệ thống</span>
                </Link>
              )}

              {/* Theme Submenu Toggle item */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsThemeSubmenuOpen(!isThemeSubmenuOpen)}
                  onMouseEnter={() => setIsThemeSubmenuOpen(true)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                    isThemeSubmenuOpen ? 'bg-slate-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {themeMode === 'dark' ? (
                      <Moon className="w-[18px] h-[18px] text-indigo-500" />
                    ) : (
                      <Sun className="w-[18px] h-[18px] text-amber-500" />
                    )}
                    <span>Giao diện</span>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: '#9CA3AF' }} />
                </button>

                {/* Submenu for Theme Mode Selection */}
                <AnimatePresence>
                  {isThemeSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -8, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      onMouseLeave={() => setIsThemeSubmenuOpen(false)}
                      className="absolute left-full top-0 ml-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-200/60 p-1.5 w-44 space-y-0.5 text-sm"
                      style={{ color: '#0D0D0D' }}
                    >
                      <button
                        type="button"
                        onClick={() => handleThemeSelect('light')}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <Sun className="w-4 h-4 text-amber-500" />
                          <span>Sáng</span>
                        </div>
                        {themeMode === 'light' && <Check className="w-4 h-4" style={{ color: '#0D0D0D' }} />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleThemeSelect('dark')}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <Moon className="w-4 h-4 text-indigo-500" />
                          <span>Tối</span>
                        </div>
                        {themeMode === 'dark' && <Check className="w-4 h-4" style={{ color: '#0D0D0D' }} />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleThemeSelect('system')}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                      >
                        <span>Hệ thống</span>
                        {themeMode === 'system' && <Check className="w-4 h-4" style={{ color: '#0D0D0D' }} />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href={normalizedRole === 'learner' ? '/learner/notifications' : '/org/notifications'}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Bell className="w-[18px] h-[18px]" style={{ color: '#6B7280' }} />
                  <span>Thông báo</span>
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-600 rounded-full">
                  3
                </span>
              </Link>

              <Link 
                href={normalizedRole === 'learner' ? '/learner/portfolio/evidence' : normalizedRole === 'admin' ? '/admin/identity/users' : '/org/organization/teams'}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
              >
                <User className="w-[18px] h-[18px]" style={{ color: '#6B7280' }} />
                <span>Hồ sơ & Tài khoản</span>
              </Link>

              <Link 
                href={normalizedRole === 'admin' ? '/admin/system/settings' : normalizedRole === 'learner' ? '/learner/settings' : '/org/settings'}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
              >
                <Settings className="w-[18px] h-[18px]" style={{ color: '#6B7280' }} />
                <span>
                  {normalizedRole === 'learner' ? 'Cài đặt học tập' :
                   normalizedRole === 'teacher' ? 'Cài đặt giảng dạy' :
                   normalizedRole === 'employer' || normalizedRole === 'enterprise' || normalizedRole === 'org' ? 'Cài đặt tổ chức' :
                   'Cài đặt hệ thống'}
                </span>
              </Link>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
              >
                <HelpCircle className="w-[18px] h-[18px]" style={{ color: '#6B7280' }} />
                <span>Trợ giúp & Phản hồi</span>
              </button>
            </div>

            <div className="my-1 border-t border-slate-100/60"></div>

            <Link 
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg text-rose-600 hover:bg-rose-50 text-left text-sm font-semibold transition-colors"
            >
              <LogOut className="w-[18px] h-[18px]" />
              <span>Đăng xuất</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Footer Button Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center rounded-2xl transition-colors hover:bg-slate-50 p-2 ${
          collapsed ? 'justify-center' : 'justify-between space-x-3'
        }`}
        title={collapsed ? `${user.name} (${user.roleName})` : undefined}
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
            {user.letter}
          </div>
          {!collapsed && (
            <div className="flex flex-col items-start text-left min-w-0">
              <span className="text-sm font-bold truncate leading-tight" style={{ color: '#0D0D0D' }}>{user.name}</span>
              <span className="text-xs truncate" style={{ color: '#6B7280' }}>{user.roleName} • {user.plan}</span>
            </div>
          )}
        </div>
        {!collapsed && (
          <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} style={{ color: '#9CA3AF' }} />
        )}
      </button>
    </div>
  );
};
