'use client';

import React from 'react';
import { Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  return (
    <button 
      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      title="Toggle Theme"
    >
      <Sun className="w-5 h-5" />
    </button>
  );
};
