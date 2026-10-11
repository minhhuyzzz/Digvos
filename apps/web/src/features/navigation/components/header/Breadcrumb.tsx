'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { routesMeta } from '@/config/routes-meta';

// Từ điển dịch thuật thuần Việt cho các đường dẫn URL
const SEGMENT_TRANSLATIONS: Record<string, string> = {
  // Roles / Root
  learner: 'Học viên',
  org: 'Tổ chức & Giảng dạy',
  admin: 'Quản trị hệ thống',
  
  // Dynamic / Structural Modules
  learning: 'Học tập',
  assessment: 'Khảo thí & Đánh giá',
  portfolio: 'Minh chứng & Ví',
  analytics: 'Phân tích năng lực',
  ai: 'Trợ lý AI',
  teaching: 'Đào tạo & Giảng dạy',
  recruitment: 'Tuyển dụng & Nhân tài',
  organization: 'Tổ chức',
  billing: 'Thanh toán & Gói dịch vụ',
  identity: 'Quản lý Danh tính',
  competency: 'Chuẩn năng lực',
  certificates: 'Chứng chỉ Blockchain',
  system: 'Cấu hình Hệ thống',

  // Pages
  courses: 'Khóa học',
  classes: 'Lớp học',
  path: 'Lộ trình học tập',
  resources: 'Kho tài nguyên',
  cat: 'Khảo thí thích ứng CAT',
  exams: 'Bài thi & Kiểm tra',
  results: 'Kết quả đánh giá',
  evidence: 'Minh chứng năng lực',
  wallet: 'Ví Blockchain',
  radar: 'Radar năng lực',
  'skill-gap': 'Khoảng trống năng lực',
  progress: 'Tiến độ học tập',
  coach: 'Trợ lý AI Coach',
  recommendations: 'Gợi ý học tập AI',
  notifications: 'Thông báo',
  questions: 'Ngân hàng câu hỏi',
  assignments: 'Bài tập & Dự án',
  'cat-sessions': 'Kỳ thi thích ứng (CAT)',
  review: 'Duyệt minh chứng',
  sbt: 'Chứng chỉ số SBT',
  talent: 'Phân tích nhân tài',
  course: 'Phân tích lớp học',
  campaigns: 'Chiến dịch tuyển dụng',
  candidates: 'Ứng viên tiềm năng',
  teams: 'Nhóm làm việc',
  subscription: 'Gói dịch vụ Enterprise',
  credits: 'Số dư Credits AI',
  organizations: 'Danh sách Tổ chức (Tenants)',
  users: 'Quản lý Người dùng',
  roles: 'Quản lý Vai trò',
  permissions: 'Ma trận Quyền hạn',
  framework: 'Khung năng lực chuẩn',
  competencies: 'Danh mục năng lực',
  rubrics: 'Tiêu chí Rubrics',
  sessions: 'Phiên kiểm tra',
  queue: 'Danh sách chờ duyệt',
  manual: 'Duyệt thủ công',
  verify: 'Cổng xác thực',
  reports: 'Báo cáo hệ thống',
  prompts: 'Quản lý Mẫu lệnh AI (Prompts)',
  models: 'Mô hình AI (Models)',
  logs: 'Nhật ký AI Logs',
  audit: 'Nhật ký Audit Logs',
  integrations: 'Tích hợp dịch vụ',
  settings: 'Cài đặt hệ thống',
};

export const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  
  if (!pathname || pathname === '/learner' || pathname === '/org' || pathname === '/admin') {
    return null; // Không hiển thị breadcrumb ở trang tổng quan chính
  }

  const segments = pathname.split('/').filter(Boolean);

  const getTitleForSegment = (segment: string, currentHref: string): string => {
    const meta = routesMeta[currentHref];
    if (meta && meta.title) {
      return meta.title;
    }
    const key = segment.toLowerCase();
    if (SEGMENT_TRANSLATIONS[key]) {
      return SEGMENT_TRANSLATIONS[key];
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };

  return (
    <nav className="hidden md:flex items-center text-xs text-slate-500 font-medium py-1">
      <div className="flex items-center">
        <Home className="w-3.5 h-3.5 mr-1 text-slate-400" />
        <Link href={pathname.startsWith('/admin') ? '/admin' : pathname.startsWith('/org') ? '/org' : '/learner'} className="hover:text-indigo-600 transition-colors text-slate-500">
          Trang chủ
        </Link>
      </div>
      {segments.map((segment, index) => {
        const currentHref = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        const title = getTitleForSegment(segment, currentHref);

        return (
          <div key={currentHref} className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-300" />
            {isLast ? (
              <span className="text-slate-900 font-bold" style={{ color: '#0D0D0D' }}>{title}</span>
            ) : (
              <Link href={currentHref} className="hover:text-indigo-600 transition-colors text-slate-500">
                {title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
