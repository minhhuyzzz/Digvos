'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState = ({ title, description, actionLabel, onAction, icon }: EmptyStateProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 py-24 bg-white/50 border border-slate-200/60 border-dashed rounded-3xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-20 h-20 mb-6 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center"
      >
        {icon || <FileQuestion className="w-10 h-10" />}
      </motion.div>
      <motion.h3 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-xl font-semibold text-slate-900 mb-2 text-center"
      >
        {title}
      </motion.h3>
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-slate-500 text-center max-w-md mb-8"
      >
        {description}
      </motion.p>
      
      {actionLabel && (
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onClick={onAction}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-sm shadow-indigo-600/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </motion.button>
      )}
    </div>
  );
};
