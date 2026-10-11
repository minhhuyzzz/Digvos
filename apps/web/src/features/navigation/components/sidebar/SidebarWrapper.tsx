'use client';

import React from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { UserProfileFooter } from './UserProfileFooter';
import { useSidebar } from '../../providers/NavigationProvider';

interface SidebarWrapperProps {
  children: React.ReactNode;
  brand: React.ReactNode;
  role: 'learner' | 'org' | 'teacher' | 'employer' | 'enterprise' | 'admin' | string;
}

export const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ children, brand, role }) => {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <aside
      className={`relative h-screen bg-white border-r border-slate-200/60 flex flex-col z-40 flex-shrink-0 select-none transition-all duration-200 ${
        collapsed ? 'w-[68px]' : 'w-66'
      }`}
    >
      {/* Top Sidebar Header */}
      <div className="relative h-14 flex-shrink-0 flex items-center justify-between px-4 border-b border-slate-100/60 w-full bg-white">
        {collapsed ? (
          /* Collapsed: hover logo D → show PanelLeftOpen icon overlay */
          <button
            onClick={() => setCollapsed(false)}
            className="group relative flex items-center justify-center w-full"
          >
            {/* Logo D — hides on hover */}
            <div className="group-hover:opacity-0 transition-opacity duration-150">
              {brand}
            </div>
            {/* PanelLeftOpen icon — shows on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: '#6B7280' }}>
              <PanelLeftOpen className="w-5 h-5" />
            </div>
          </button>
        ) : (
          /* Expanded: logo + collapse button */
          <>
            <div className="flex-1 overflow-hidden flex items-center">
              {brand}
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0 ml-2"
              style={{ color: '#9CA3AF' }}
            >
              <PanelLeftClose className="w-[18px] h-[18px]" />
            </button>
          </>
        )}
      </div>

      {/* Navigation Links Scroll Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 w-full bg-white">
        {children}
      </div>

      {/* User Profile Footer */}
      <UserProfileFooter role={role} />
    </aside>
  );
};
