'use client';

import React from 'react';
import { Bell } from 'lucide-react';

export const NotificationDropdown: React.FC = () => {
  // In a real implementation, clicking this would open a dropdown (e.g. Radix UI or Headless UI menu)
  return (
    <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
      <Bell className="w-5 h-5" />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
    </button>
  );
};
