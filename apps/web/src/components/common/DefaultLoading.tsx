import React from 'react';

export const DefaultLoading: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-6 animate-pulse">
      <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6 shadow-sm">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-slate-200 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-6 bg-slate-200 rounded w-48"></div>
              <div className="h-4 bg-slate-200 rounded w-64"></div>
            </div>
          </div>
          <div className="w-24 h-6 bg-slate-200 rounded-full"></div>
        </div>

        <hr className="border-slate-100" />

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-20"></div>
            <div className="h-5 bg-slate-200 rounded w-32"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-20"></div>
            <div className="h-5 bg-slate-200 rounded w-40"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-20"></div>
            <div className="h-5 bg-slate-200 rounded w-44"></div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Footer Skeleton */}
        <div className="bg-slate-50 rounded-lg p-4 flex items-center space-x-3">
          <div className="w-5 h-5 bg-slate-200 rounded-full shrink-0"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-3 bg-slate-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLoading;
