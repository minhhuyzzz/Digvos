'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number; // Percentage
    isPositive: boolean;
    label?: string;
  };
  delay?: number;
}

export const MetricCard = ({ title, value, icon, trend, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white/70 backdrop-blur-md border border-slate-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        {icon && (
          <div className="p-2.5 bg-slate-100/80 text-slate-600 rounded-xl">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend.isPositive ? 'text-emerald-600' : trend.value === 0 ? 'text-slate-500' : 'text-rose-600'}`}>
            {trend.value > 0 ? (
              trend.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />
            ) : (
              <Minus className="w-4 h-4 mr-1" />
            )}
            {Math.abs(trend.value)}%
            {trend.label && <span className="ml-1.5 text-slate-400 font-normal">{trend.label}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
};
