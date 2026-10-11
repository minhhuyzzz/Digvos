'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, MoreVertical } from 'lucide-react';
import { MenuItem } from '../../config';
import { useSidebar } from '../../providers/NavigationProvider';

interface SidebarItemProps {
  item: MenuItem;
  level?: number;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, level = 0 }) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;

  const isActive = item.href ? pathname === item.href : false;
  const hasChildren = item.children && item.children.length > 0;

  const getPaddingLeft = (lvl: number) => {
    switch (lvl) {
      case 0: return 'px-3';
      case 1: return 'pl-8 pr-3';
      case 2: return 'pl-11 pr-3';
      case 3: return 'pl-14 pr-3';
      default: return 'pl-14 pr-3';
    }
  };
  const paddingLeft = getPaddingLeft(level);

  if (hasChildren) {
    return (
      <div className="space-y-0.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center py-2.5 rounded-xl text-sm transition-colors group ${
            collapsed ? 'justify-center px-0' : `justify-between ${paddingLeft}`
          } ${isOpen ? 'bg-[#5a96b0]/10 font-semibold text-[#5a96b0]' : 'hover:bg-slate-50'}`}
          title={collapsed ? item.label : undefined}
        >
          <div className={`flex items-center overflow-hidden ${collapsed ? 'justify-center' : 'space-x-2.5'}`}>
            <Icon 
              className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                isOpen ? 'text-[#5a96b0]' : 'text-[#6B7280] group-hover:text-[#5a96b0]'
              }`} 
            />
            {!collapsed && (
              <span 
                className={`whitespace-nowrap truncate transition-colors ${
                  isOpen ? 'text-[#5a96b0] font-bold' : 'text-[#0D0D0D] group-hover:text-[#5a96b0] font-medium'
                }`}
              >
                {item.label}
              </span>
            )}
          </div>
          {!collapsed && (
            <div className="flex-shrink-0 text-slate-400 group-hover:text-[#5a96b0] transition-colors">
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          )}
        </button>
        {isOpen && !collapsed && (
          <div className="space-y-0.5 mt-0.5">
            {item.children!.map((child) => (
              <SidebarItem key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Link
        href={item.href || '#'}
        className={`flex items-center py-2.5 rounded-xl text-sm transition-all group ${
          collapsed ? 'justify-center px-0' : `justify-between ${paddingLeft}`
        } ${
          isActive
            ? 'bg-[#5a96b0]/10 font-bold text-[#5a96b0] shadow-2xs border border-[#5a96b0]/20'
            : 'hover:bg-slate-50 text-[#0D0D0D] hover:text-[#5a96b0]'
        }`}
        title={collapsed ? item.label : undefined}
      >
        <div className={`flex items-center overflow-hidden ${collapsed ? 'justify-center' : 'space-x-2.5 min-w-0 pr-2'}`}>
          <Icon 
            className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
              isActive ? 'text-[#5a96b0]' : 'text-[#6B7280] group-hover:text-[#5a96b0]'
            }`} 
          />
          {!collapsed && (
            <span 
              className={`whitespace-nowrap truncate transition-colors ${
                isActive ? 'text-[#5a96b0] font-bold' : 'text-[#0D0D0D] group-hover:text-[#5a96b0] font-medium'
              }`}
            >
              {item.label}
            </span>
          )}
        </div>

        {!collapsed && (
          <div className="flex items-center space-x-1 flex-shrink-0">
            {item.badge && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#5a96b0]/15 text-[#5a96b0] rounded-md">
                {item.badge}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200/80 text-slate-400 hover:text-[#5a96b0] rounded-md transition-all"
              title="Tùy chọn"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        )}
      </Link>
    </div>
  );
};
