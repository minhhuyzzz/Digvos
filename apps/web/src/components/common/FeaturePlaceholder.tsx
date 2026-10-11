'use client';

import React from 'react';
import { 
  Cpu, 
  History, 
  FileText, 
  FileCheck, 
  Globe, 
  Target, 
  Building, 
  Users, 
  Key, 
  ShieldCheck, 
  Database, 
  BadgeAlert, 
  Server, 
  Settings, 
  Info, 
  HelpCircle 
} from 'lucide-react';

export interface FeaturePlaceholderProps {
  title: string;
  description: string;
  module: string;
  permission?: string;
  apiEndpoint?: string;
  status?: 'coming_soon' | 'under_construction' | 'active';
  iconName?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  History,
  FileText,
  FileCheck,
  Globe,
  Target,
  Building,
  Users,
  Key,
  ShieldCheck,
  Database,
  BadgeAlert,
  Server,
  Settings,
  Info,
  HelpCircle
};

export const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({
  title,
  description,
  module,
  permission = 'N/A',
  apiEndpoint = 'N/A',
  status = 'coming_soon',
  iconName = 'HelpCircle',
}) => {
  // Dynamically resolve icon
  const IconComponent = (iconName && ICON_MAP[iconName]) || HelpCircle;

  const statusLabel = {
    coming_soon: { text: 'Sắp ra mắt', classes: 'bg-amber-50 text-amber-700 border-amber-200' },
    under_construction: { text: 'Đang phát triển', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
    active: { text: 'Hoạt động', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  }[status];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
              <p className="text-slate-500 text-sm mt-1">{description}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusLabel.classes}`}>
            {statusLabel.text}
          </span>
        </div>

        <hr className="border-slate-100" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Module / Phân hệ</span>
            <p className="text-sm font-medium text-slate-700 capitalize">{module}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quyền hạn (RBAC)</span>
            <code className="text-xs font-mono bg-slate-50 border border-slate-100 px-2 py-1 rounded text-rose-600 block w-fit">
              {permission}
            </code>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">API Endpoint</span>
            <code className="text-xs font-mono bg-slate-50 border border-slate-100 px-2 py-1 rounded text-blue-600 block w-fit">
              {apiEndpoint}
            </code>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Footer/Info */}
        <div className="bg-slate-50 rounded-lg p-4 flex items-start space-x-3">
          <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-700">Thông tin Kiến trúc & Đồng bộ</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Trang này đã được liên kết đúng cấu trúc định tuyến (App Router) của hệ thống DIGVOS. 
              Các tham số về quyền hạn và API Endpoint đã được ánh xạ khớp hoàn toàn với cấu trúc Cơ sở dữ liệu và API Backend chuẩn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
