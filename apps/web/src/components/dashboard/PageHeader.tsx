'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">{title}</h1>
        {description && (
          <p className="text-slate-500 mt-1.5 text-sm md:text-base">{description}</p>
        )}
      </motion.div>
      {children && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
