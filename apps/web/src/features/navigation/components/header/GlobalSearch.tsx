'use client';

import React from 'react';
import { Search } from 'lucide-react';

export const GlobalSearch: React.FC = () => {
  return (
    <div className="relative hidden lg:block w-64 xl:w-96">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input 
        type="text" 
        placeholder="Search across workspace... (Ctrl+K)" 
        className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded">
          ⌘K
        </kbd>
      </div>
    </div>
  );
};
