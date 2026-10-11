'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const LearnerActions: React.FC = () => {
  return (
    <div className="hidden sm:flex items-center px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
      <span className="text-[11px] font-semibold">AI Assistant</span>
    </div>
  );
};
