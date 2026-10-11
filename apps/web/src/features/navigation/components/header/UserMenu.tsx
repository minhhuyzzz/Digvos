'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface UserMenuProps {
  name: string;
  role: string;
  avatarLetter: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ name, role, avatarLetter }) => {
  // In a real implementation, this wraps a Radix UI DropdownMenu
  return (
    <button className="flex items-center space-x-2 p-1.5 pl-2 pr-3 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
      <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
        {avatarLetter}
      </div>
      <div className="hidden sm:flex flex-col items-start leading-none">
        <span className="text-sm font-semibold text-gray-900">{name}</span>
        <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider mt-0.5">{role}</span>
      </div>
      <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
    </button>
  );
};
