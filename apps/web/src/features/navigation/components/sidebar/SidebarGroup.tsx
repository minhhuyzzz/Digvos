'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MenuGroup } from '../../config';
import { SidebarItem } from './SidebarItem';
import { useSidebar } from '../../providers/NavigationProvider';

interface SidebarGroupProps {
  group: MenuGroup;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ group }) => {
  const { collapsed } = useSidebar();
  const [isExpanded, setIsExpanded] = useState(true);

  if (collapsed) {
    return (
      <div className="space-y-0.5 py-1 border-b border-slate-100/50 last:border-b-0">
        {group.items.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-0.5 py-0.5">
      {/* Section Header — #0D0D0D crisp text, matching ChatGPT's style */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 rounded-xl transition-colors text-left group"
      >
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-[#5a96b0] transition-colors">
          {group.group}
        </span>
        <div className="text-slate-400 group-hover:text-[#5a96b0] transition-colors">
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Group Items */}
      {isExpanded && (
        <div className="space-y-0.5">
          {group.items.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
