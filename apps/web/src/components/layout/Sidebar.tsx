'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from '../../config/menu';
import { Menu, ChevronLeft, ChevronRight, LogOut, RefreshCw } from 'lucide-react';

interface SidebarProps {
  menuItems: MenuItem[];
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  currentRole,
  onRoleChange,
}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl glass text-white hover:bg-brand-500 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 glass-premium border-r border-white/10 text-white flex flex-col justify-between transition-all duration-300
          ${isCollapsed ? 'w-20' : 'w-64'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header/Logo */}
        <div>
          <div className="flex items-center justify-between px-5 py-6 border-b border-white/5">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 min-w-9 min-h-9 rounded-xl bg-gradient-to-br from-white to-brand-500 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-brand-500/20">
                D
              </div>
              {!isCollapsed && (
                <span className="font-bold text-lg tracking-wider text-white">
                  DIG<span className="text-brand-400">VOS</span>
                </span>
              )}
            </Link>
            <button
              onClick={toggleCollapse}
              className="hidden md:flex p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Role Switcher (DEV ONLY) */}
          <div className="p-4 border-b border-white/5 bg-brand-500/5">
            <div className="flex flex-col space-y-1.5">
              {!isCollapsed && (
                <span className="text-[10px] font-bold tracking-widest text-brand-400 flex items-center space-x-1">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  <span>ROLE SWITCHER (DEV)</span>
                </span>
              )}
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className={`bg-slate-900/80 border border-white/10 rounded-lg text-xs py-1.5 focus:outline-none focus:border-brand-400 text-slate-200 cursor-pointer
                  ${isCollapsed ? 'px-1 w-11 text-center' : 'px-3 w-full'}
                `}
              >
                <option value="STUDENT">STUDENT</option>
                <option value="TEACHER">TEACHER</option>
                <option value="EMPLOYER">EMPLOYER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 group
                    ${isActive 
                      ? 'bg-brand-500/20 text-brand-400 border border-brand-500/20 font-semibold' 
                      : 'hover:bg-white/5 text-slate-400 hover:text-white border border-transparent'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 min-w-5 min-h-5 transition-transform group-hover:scale-105 ${isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-white'}`} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5 min-w-5 min-h-5" />
            {!isCollapsed && <span>Đăng xuất</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          onClick={toggleMobile}
          className="md:hidden fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm"
        />
      )}
    </>
  );
};
