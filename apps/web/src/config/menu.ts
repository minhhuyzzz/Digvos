import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Wallet, 
  Users, 
  FileCheck, 
  Settings, 
  Search, 
  ShieldCheck, 
  Briefcase, 
  History, 
  ShieldAlert
} from 'lucide-react';

export interface MenuItem {
  title: string;
  href: string;
  icon: any;
}

export const STUDENT_MENU: MenuItem[] = [
  { title: 'Bảng điều khiển', href: '/student', icon: LayoutDashboard },
  { title: 'Đánh giá CAT', href: '/student/assessment', icon: BookOpen },
  { title: 'Hồ sơ e-Portfolio', href: '/student/portfolio', icon: GraduationCap },
  { title: 'Chứng chỉ SBT', href: '/student/certificates', icon: Award },
  { title: 'Ví Credits', href: '/student/wallet', icon: Wallet },
];

export const TEACHER_MENU: MenuItem[] = [
  { title: 'Tổng quan đào tạo', href: '/teacher', icon: LayoutDashboard },
  { title: 'Quản lý Lớp học', href: '/teacher/classrooms', icon: Users },
  { title: 'AI Chấm điểm', href: '/teacher/grading', icon: FileCheck },
  { title: 'Thiết kế Rubrics', href: '/teacher/rubrics', icon: Settings },
];

export const EMPLOYER_MENU: MenuItem[] = [
  { title: 'Tổng quan tuyển dụng', href: '/employer', icon: LayoutDashboard },
  { title: 'Tìm kiếm nhân tài', href: '/employer/talents', icon: Search },
  { title: 'Xác thực SBT', href: '/employer/verify', icon: ShieldCheck },
  { title: 'Chiến dịch tuyển dụng', href: '/employer/campaigns', icon: Briefcase },
];

export const ADMIN_MENU: MenuItem[] = [
  { title: 'Bảng quản trị', href: '/admin', icon: LayoutDashboard },
  { title: 'Duyệt KYC Doanh nghiệp', href: '/admin/kyc', icon: ShieldCheck },
  { title: 'Khung năng lực số', href: '/admin/framework', icon: Settings },
  { title: 'Smart Contract', href: '/admin/blockchain', icon: Award },
  { title: 'Immutable Logs', href: '/admin/logs', icon: History },
];

export function getMenuByRole(role: string): MenuItem[] {
  switch (role) {
    case 'STUDENT':
      return STUDENT_MENU;
    case 'TEACHER':
      return TEACHER_MENU;
    case 'EMPLOYER':
      return EMPLOYER_MENU;
    case 'ADMIN':
      return ADMIN_MENU;
    default:
      return STUDENT_MENU;
  }
}
