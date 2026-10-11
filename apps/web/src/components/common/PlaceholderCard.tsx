import React from 'react';

export const PlaceholderCard: React.FC<{ title: string; height?: string }> = ({ title, height = 'h-64' }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col ${height}`}>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex-1 bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center">
        <span className="text-sm font-medium text-slate-400">Placeholder for {title}</span>
      </div>
    </div>
  );
};
