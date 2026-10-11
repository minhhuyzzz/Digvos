import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  Wallet, 
  Users, 
  FileCheck, 
  Settings, 
  ShieldCheck, 
  Briefcase, 
  History,
  Target,
  BarChart,
  Bell,
  Cpu,
  CheckCircle,
  Database,
  Building,
  Key,
  Globe,
  Archive,
  CreditCard,
  ListTodo,
  FileQuestion,
  UsersRound,
  FileText,
  BadgeAlert,
  Server,
  Layers,
  Sparkles,
  LucideIcon
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: MenuItem[];
  badge?: string;
  permission?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

export interface NavigationRoleConfig {
  roleName: string;
  defaultHome: string;
  logoText: string;
  accentColor: string;
  sidebarWidth: string;
}

export const NAVIGATION_CONFIGS: Record<string, NavigationRoleConfig> = {
  learner: {
    roleName: 'Học viên',
    defaultHome: '/learner',
    logoText: 'LEARNER',
    accentColor: 'indigo',
    sidebarWidth: '16rem',
  },
  teacher: {
    roleName: 'Giáo viên',
    defaultHome: '/org',
    logoText: 'TEACHER',
    accentColor: 'purple',
    sidebarWidth: '16rem',
  },
  org: {
    roleName: 'Nhà trường & Đào tạo',
    defaultHome: '/org',
    logoText: 'ORGANIZATION',
    accentColor: 'purple',
    sidebarWidth: '16rem',
  },
  admin: {
    roleName: 'Hệ thống Quản trị',
    defaultHome: '/admin',
    logoText: 'SUPER ADMIN',
    accentColor: 'indigo',
    sidebarWidth: '16rem',
  },
};

export const LEARNER_MENU: MenuGroup[] = [
  {
    group: 'CHÍNH',
    items: [
      { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard, href: '/learner' },
    ]
  },
  {
    group: 'HỌC TẬP',
    items: [
      { id: 'courses', label: 'Khóa học của tôi', icon: BookOpen, href: '/learner/learning/courses' },
      { id: 'learning-path', label: 'Lộ trình học tập', icon: Target, href: '/learner/learning/path' },
      { id: 'resources', label: 'Kho tài nguyên', icon: Layers, href: '/learner/learning/resources' },
    ]
  },
  {
    group: 'KHẢO THÍ',
    items: [
      { id: 'cat-test', label: 'Khảo thí thích ứng CAT', icon: ShieldCheck, href: '/learner/assessment/cat' },
      { id: 'assessments', label: 'Bài thi & Kiểm tra', icon: FileCheck, href: '/learner/assessment/exams' },
      { id: 'results', label: 'Kết quả đánh giá', icon: BarChart, href: '/learner/assessment/results' },
    ]
  },
  {
    group: 'HỒ SƠ & VÍ',
    items: [
      { id: 'evidence', label: 'Minh chứng năng lực', icon: Archive, href: '/learner/portfolio/evidence' },
      { id: 'certificates', label: 'Chứng chỉ số SBT', icon: Award, href: '/learner/portfolio/certificates' },
      { id: 'wallet', label: 'Ví Blockchain', icon: Wallet, href: '/learner/portfolio/wallet' },
    ]
  },
  {
    group: 'PHÂN TÍCH NĂNG LỰC',
    items: [
      { id: 'radar', label: 'Radar năng lực', icon: Target, href: '/learner/analytics/radar' },
      { id: 'skill-gap', label: 'Khoảng trống năng lực', icon: BarChart, href: '/learner/analytics/skill-gap' },
      { id: 'learning-progress', label: 'Tiến độ học tập', icon: BarChart, href: '/learner/analytics/progress' },
    ]
  },
  {
    group: 'TRỢ LÝ AI',
    items: [
      { id: 'ai-coach', label: 'Trợ lý AI Coach', icon: Cpu, href: '/learner/ai/coach' },
      { id: 'ai-recommendations', label: 'Gợi ý học tập AI', icon: Sparkles, href: '/learner/ai/recommendations' },
    ]
  },
  {
    group: 'HỆ THỐNG',
    items: [
      { id: 'notifications', label: 'Thông báo', icon: Bell, href: '/learner/notifications', badge: '3' },
    ]
  }
];

// Menu riêng cho Giáo viên / Giảng dạy
export const TEACHER_MENU: MenuGroup[] = [
  {
    group: 'CHÍNH',
    items: [
      { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard, href: '/org' },
    ]
  },
  {
    group: 'ĐÀO TẠO & GIẢNG DẠY',
    items: [
      { id: 'courses', label: 'Quản lý khóa học', icon: BookOpen, href: '/org/teaching/courses' },
      { id: 'classes', label: 'Quản lý lớp học', icon: UsersRound, href: '/org/teaching/classes' },
    ]
  },
  {
    group: 'KHẢO THÍ & ĐÁNH GIÁ',
    items: [
      { id: 'question-bank', label: 'Ngân hàng câu hỏi', icon: Database, href: '/org/assessment/questions' },
      { id: 'assignments', label: 'Bài tập & Dự án', icon: FileQuestion, href: '/org/assessment/assignments' },
      { id: 'cat-sessions', label: 'Tổ chức kỳ thi (CAT)', icon: ShieldCheck, href: '/org/assessment/cat-sessions' },
      { id: 'results', label: 'Kết quả khảo thí', icon: BarChart, href: '/org/assessment/results' },
    ]
  },
  {
    group: 'MINH CHỨNG & XÁC THỰC',
    items: [
      { id: 'review-queue', label: 'Duyệt minh chứng học viên', icon: ListTodo, href: '/org/portfolio/review' },
      { id: 'sbt-verify', label: 'Xác thực chứng chỉ SBT', icon: Award, href: '/org/verification/sbt' },
    ]
  },
  {
    group: 'PHÂN TÍCH',
    items: [
      { id: 'course-analytics', label: 'Phân tích tiến độ lớp học', icon: BarChart, href: '/org/analytics/course' },
    ]
  },
  {
    group: 'HỆ THỐNG',
    items: [
      { id: 'notifications', label: 'Thông báo', icon: Bell, href: '/org/notifications' },
    ]
  }
];

// Menu tổng hợp dành cho Quản trị viên Nhà trường / Cơ sở Đào tạo
export const ORG_MENU: MenuGroup[] = [
  {
    group: 'CHÍNH',
    items: [
      { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard, href: '/org' },
    ]
  },
  {
    group: 'ĐÀO TẠO & GIẢNG DẠY',
    items: [
      { id: 'courses', label: 'Quản lý khóa học', icon: BookOpen, href: '/org/teaching/courses' },
      { id: 'classes', label: 'Quản lý lớp học', icon: UsersRound, href: '/org/teaching/classes' },
    ]
  },
  {
    group: 'KHẢO THÍ',
    items: [
      { id: 'question-bank', label: 'Ngân hàng câu hỏi', icon: Database, href: '/org/assessment/questions' },
      { id: 'assignments', label: 'Bài tập & Dự án', icon: FileQuestion, href: '/org/assessment/assignments' },
      { id: 'cat-sessions', label: 'Kỳ thi thích ứng (CAT)', icon: ShieldCheck, href: '/org/assessment/cat-sessions' },
      { id: 'results', label: 'Kết quả khảo thí', icon: BarChart, href: '/org/assessment/results' },
    ]
  },
  {
    group: 'MINH CHỨNG & XÁC THỰC',
    items: [
      { id: 'review-queue', label: 'Danh sách chờ duyệt', icon: ListTodo, href: '/org/portfolio/review' },
      { id: 'sbt-verify', label: 'Xác thực chứng chỉ SBT', icon: Award, href: '/org/verification/sbt' },
    ]
  },
  {
    group: 'PHÂN TÍCH',
    items: [
      { id: 'course-analytics', label: 'Phân tích lớp học', icon: BarChart, href: '/org/analytics/course' },
    ]
  },
  {
    group: 'TỔ CHỨC & THANH TOÁN',
    items: [
      { id: 'teams', label: 'Nhóm làm việc', icon: Building, href: '/org/organization/teams' },
      { id: 'subscription', label: 'Gói dịch vụ', icon: CreditCard, href: '/org/billing/subscription' },
      { id: 'credits', label: 'Số dư Credits AI', icon: Wallet, href: '/org/billing/credits' },
    ]
  },
  {
    group: 'HỆ THỐNG',
    items: [
      { id: 'notifications', label: 'Thông báo', icon: Bell, href: '/org/notifications' },
    ]
  }
];

export const ADMIN_MENU: MenuGroup[] = [
  {
    group: 'CHÍNH',
    items: [
      { id: 'dashboard', label: 'Tổng quan hệ thống', icon: LayoutDashboard, href: '/admin' },
    ]
  },
  {
    group: 'QUẢN LÝ DANH TÍNH & TỔ CHỨC',
    items: [
      { id: 'organizations', label: 'Tổ chức (Tenants)', icon: Building, href: '/admin/identity/organizations' },
      { id: 'users', label: 'Người dùng', icon: Users, href: '/admin/identity/users' },
      { id: 'roles', label: 'Vai trò', icon: Key, href: '/admin/identity/roles' },
      { id: 'permissions', label: 'Quyền hạn', icon: ShieldCheck, href: '/admin/identity/permissions' },
    ]
  },
  {
    group: 'CHUẨN NĂNG LỰC',
    items: [
      { id: 'framework', label: 'Khung năng lực chuẩn', icon: Globe, href: '/admin/competency/framework' },
      { id: 'competencies', label: 'Danh mục năng lực', icon: Target, href: '/admin/competency/competencies' },
      { id: 'rubrics', label: 'Tiêu chí Rubrics', icon: FileCheck, href: '/admin/competency/rubrics' },
    ]
  },
  {
    group: 'CẤU HÌNH KHẢO THÍ',
    items: [
      { id: 'question-bank', label: 'Ngân hàng câu hỏi', icon: Database, href: '/admin/assessment/questions' },
      { id: 'cat-engine', label: 'Bộ máy thi thích ứng CAT', icon: Cpu, href: '/admin/assessment/cat' },
      { id: 'sessions', label: 'Phiên kiểm tra', icon: History, href: '/admin/assessment/sessions' },
    ]
  },
  {
    group: 'DUYỆT MINH CHỨNG & BÀI LÀM',
    items: [
      { id: 'queue', label: 'Danh sách chờ duyệt', icon: Archive, href: '/admin/portfolio/queue' },
      { id: 'ai-review', label: 'AI Review tự động', icon: Cpu, href: '/admin/portfolio/ai' },
      { id: 'manual-review', label: 'Duyệt thủ công', icon: CheckCircle, href: '/admin/portfolio/manual' },
    ]
  },
  {
    group: 'CHỨNG CHỈ BLOCKCHAIN',
    items: [
      { id: 'sbt', label: 'Soulbound Tokens (SBT)', icon: Award, href: '/admin/certificates/sbt' },
      { id: 'verification', label: 'Cổng xác thực chứng chỉ', icon: ShieldCheck, href: '/admin/certificates/verify' },
    ]
  },
  {
    group: 'PHÂN TÍCH & BÁO CÁO',
    items: [
      { id: 'reports', label: 'Báo cáo hệ thống', icon: FileText, href: '/admin/analytics/reports' },
      { id: 'system-analytics', label: 'Thống kê tổng quan', icon: BarChart, href: '/admin/analytics/system' },
    ]
  },
  {
    group: 'QUẢN TRỊ AI',
    items: [
      { id: 'prompt-management', label: 'Quản lý Mẫu lệnh AI (Prompts)', icon: FileText, href: '/admin/ai/prompts' },
      { id: 'ai-models', label: 'Mô hình AI (Models)', icon: Cpu, href: '/admin/ai/models' },
      { id: 'ai-logs', label: 'Nhật ký AI Logs', icon: History, href: '/admin/ai/logs' },
    ]
  },
  {
    group: 'HỆ THỐNG',
    items: [
      { id: 'audit-logs', label: 'Nhật ký Audit Logs', icon: BadgeAlert, href: '/admin/system/audit' },
      { id: 'integrations', label: 'Tích hợp dịch vụ', icon: Server, href: '/admin/system/integrations' },
      { id: 'settings', label: 'Cài đặt chung', icon: Settings, href: '/admin/system/settings' },
    ]
  }
];

export function getMenuByRole(role: string): MenuGroup[] {
  switch (role.toLowerCase()) {
    case 'learner':
    case 'student': 
      return LEARNER_MENU;
    case 'teacher':
      return TEACHER_MENU;
    case 'org': 
      return ORG_MENU;
    case 'admin': 
      return ADMIN_MENU;
    default: 
      return LEARNER_MENU;
  }
}

export function getRoleConfig(role: string): NavigationRoleConfig {
  const normalized = role.toLowerCase();
  return NAVIGATION_CONFIGS[normalized] || NAVIGATION_CONFIGS.learner;
}
