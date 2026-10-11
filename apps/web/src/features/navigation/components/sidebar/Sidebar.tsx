'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Sparkles, 
  Play, 
  Cpu,
  Briefcase
} from 'lucide-react';
import { getMenuByRole, getRoleConfig } from '../../config';
import { SidebarWrapper } from './SidebarWrapper';
import { SidebarGroup } from './SidebarGroup';
import { useSidebar } from '../../providers/NavigationProvider';

interface SidebarProps {
  role: 'learner' | 'org' | 'teacher' | 'employer' | 'admin';
}

export const Sidebar: React.FC<SidebarProps> = ({ role: initialRole }) => {
  const [effectiveRole, setEffectiveRole] = useState<string>(initialRole);
  const { collapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Detect specific user role from local session if available (e.g. TEACHER vs EMPLOYER vs STUDENT)
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('digvos_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.role) {
            const roleStr = user.role.toLowerCase();
            if (initialRole === 'org' && (roleStr === 'teacher' || roleStr === 'employer')) {
              setEffectiveRole(roleStr);
            }
          }
        }
      } catch (e) {
        console.error('Failed to parse digvos_user role:', e);
      }
    }
  }, [initialRole]);

  const menu = getMenuByRole(effectiveRole);
  const config = getRoleConfig(effectiveRole);

  // Tailored CTA Button content by role
  const getCTAByRole = () => {
    switch (effectiveRole) {
      case 'learner':
        return { label: 'Vào học ngay', icon: Play, href: '/learner/learning/courses' };
      case 'teacher':
        return { label: 'Tạo lớp học mới', icon: Plus, href: '/org/teaching/classes' };
      case 'employer':
        return { label: 'Tạo chiến dịch tuyển dụng', icon: Briefcase, href: '/org/recruitment/campaigns' };
      case 'org':
        return { label: 'Tạo lớp / Chiến dịch', icon: Plus, href: '/org/teaching/classes' };
      case 'admin':
        return { label: 'Thêm AI Model', icon: Cpu, href: '/admin/ai/models' };
      default:
        return { label: 'Tạo mới', icon: Plus, href: '#' };
    }
  };

  const cta = getCTAByRole();
  const CTAIcon = cta.icon;

  const brand = (
    <Link href={config.defaultHome} className="flex items-center space-x-2.5 group">
      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center group-hover:scale-105 transition-transform">
        D
      </div>
      {!collapsed && (
        <span className="font-bold text-base tracking-tight leading-none" style={{ color: '#0D0D0D' }}>
          DIG<span className={effectiveRole === 'admin' ? 'text-emerald-600' : effectiveRole === 'learner' ? 'text-indigo-600' : 'text-purple-600'}>VOS</span>
        </span>
      )}
    </Link>
  );

  return (
    <SidebarWrapper brand={brand} role={effectiveRole as any}>
      {/* CTA Button — only when expanded */}
      {!collapsed && (
        <div className="mb-2">
          <Link
            href={cta.href}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition-colors group text-sm"
            style={{ color: '#0D0D0D' }}
          >
            <div className="flex items-center space-x-2">
              <CTAIcon className="w-[18px] h-[18px] transition-colors" style={{ color: '#0D0D0D' }} />
              <span className="font-semibold">{cta.label}</span>
            </div>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </Link>
        </div>
      )}

      {/* Search Bar — only when expanded */}
      {!collapsed && (
        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              effectiveRole === 'learner' ? 'Tìm khóa học, bài thi...' :
              effectiveRole === 'teacher' ? 'Tìm lớp học, câu hỏi...' :
              effectiveRole === 'employer' ? 'Tìm ứng viên, chiến dịch...' :
              'Tìm API, Tenants, Models...'
            }
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
            style={{ color: '#0D0D0D' }}
          />
        </div>
      )}

      {/* Collapsed: Search icon only */}
      {collapsed && (
        <div className="flex justify-center mb-2">
          <button className="p-2 rounded-xl hover:bg-slate-50 transition-colors" title="Tìm kiếm">
            <Search className="w-[18px] h-[18px]" style={{ color: '#6B7280' }} />
          </button>
        </div>
      )}

      {/* Menu Navigation Groups */}
      <div className="space-y-1">
        {menu.map((group, idx) => (
          <SidebarGroup key={idx} group={group} />
        ))}
      </div>
    </SidebarWrapper>
  );
};
