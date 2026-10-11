'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const WelcomeWidget: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Chào mừng quay trở lại!</h1>
        <p className="text-slate-500 text-sm mt-1">Dưới đây là tiến độ học tập và tích lũy năng lực số của bạn hôm nay.</p>
      </div>
      <div className="flex items-center space-x-3">
        <Link 
          href="/learner/assessment/cat"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors duration-150"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Làm bài thi CAT mới
        </Link>
      </div>
    </div>
  );
};
