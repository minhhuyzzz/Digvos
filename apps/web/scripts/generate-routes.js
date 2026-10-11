const fs = require('fs');
const path = require('path');

// Target directory
const TARGET_BASE = path.join(__dirname, '..', 'src', 'app', '(dashboard)');

// Data mapping of all routes to generate
const routeDefinitions = [
  // === STUDENT ROUTES ===
  {
    role: 'student',
    module: 'learning',
    subPath: 'courses',
    title: 'Khóa học',
    description: 'Danh sách các khóa học trực tuyến và tiến trình học tập của bạn.',
    icon: 'BookOpen',
    permission: 'student:learning:courses:read',
    api: '/api/v1/learning/courses'
  },
  {
    role: 'student',
    module: 'learning',
    subPath: 'path',
    title: 'Lộ trình học tập',
    description: 'Lộ trình phát triển năng lực số cá nhân hóa thiết lập bởi AI.',
    icon: 'Target',
    permission: 'student:learning:path:read',
    api: '/api/v1/learning/path'
  },
  {
    role: 'student',
    module: 'learning',
    subPath: 'resources',
    title: 'Tài nguyên',
    description: 'Thư viện tài nguyên, tài liệu và học liệu số hỗ trợ.',
    icon: 'Layers',
    permission: 'student:learning:resources:read',
    api: '/api/v1/learning/resources'
  },
  {
    role: 'student',
    module: 'assessment',
    subPath: 'cat',
    title: 'Đánh giá thích ứng CAT',
    description: 'Kỳ thi đánh giá năng lực số thích ứng thông minh (Computer Adaptive Testing).',
    icon: 'ShieldCheck',
    permission: 'student:assessment:cat:write',
    api: '/api/v1/assessment/cat'
  },
  {
    role: 'student',
    module: 'assessment',
    subPath: 'exams',
    title: 'Bài thi & Kiểm tra',
    description: 'Danh sách đề kiểm tra, bài thi trắc nghiệm và thực hành.',
    icon: 'FileCheck',
    permission: 'student:assessment:exams:read',
    api: '/api/v1/assessment/exams'
  },
  {
    role: 'student',
    module: 'assessment',
    subPath: 'results',
    title: 'Kết quả học tập',
    description: 'Lịch sử điểm số, bảng điểm chi tiết và đánh giá từ giáo viên.',
    icon: 'BarChart',
    permission: 'student:assessment:results:read',
    api: '/api/v1/assessment/results'
  },
  {
    role: 'student',
    module: 'portfolio',
    subPath: 'evidence',
    title: 'Minh chứng',
    description: 'Quản lý, đăng tải và nộp các minh chứng năng lực thực tế.',
    icon: 'Archive',
    permission: 'student:portfolio:evidence:write',
    api: '/api/v1/portfolio/evidence'
  },
  {
    role: 'student',
    module: 'portfolio',
    subPath: 'certificates',
    title: 'Chứng chỉ số SBT',
    description: 'Chứng chỉ năng lực số dạng Soulbound Token (SBT) lưu trữ on-chain.',
    icon: 'Award',
    permission: 'student:portfolio:certificates:read',
    api: '/api/v1/portfolio/certificates'
  },
  {
    role: 'student',
    module: 'portfolio',
    subPath: 'wallet',
    title: 'Ví Blockchain',
    description: 'Quản lý khóa công khai, kết nối ví và tương tác blockchain.',
    icon: 'Wallet',
    permission: 'student:portfolio:wallet:read',
    api: '/api/v1/portfolio/wallet'
  },
  {
    role: 'student',
    module: 'analytics',
    subPath: 'radar',
    title: 'Radar năng lực',
    description: 'Biểu đồ radar 5 vùng năng lực số theo chuẩn DigComp 3.0.',
    icon: 'Target',
    permission: 'student:analytics:radar:read',
    api: '/api/v1/analytics/radar'
  },
  {
    role: 'student',
    module: 'analytics',
    subPath: 'skill-gap',
    title: 'Khoảng trống năng lực',
    description: 'Phân tích chênh lệch năng lực hiện tại so với mục tiêu nghề nghiệp.',
    icon: 'BarChart',
    permission: 'student:analytics:gap:read',
    api: '/api/v1/analytics/gap'
  },
  {
    role: 'student',
    module: 'analytics',
    subPath: 'progress',
    title: 'Tiến độ học tập',
    description: 'Biểu đồ theo dõi sự tăng trưởng và cải thiện năng lực số theo thời gian.',
    icon: 'LineChart',
    permission: 'student:analytics:progress:read',
    api: '/api/v1/analytics/progress'
  },
  {
    role: 'student',
    module: 'ai',
    subPath: 'coach',
    title: 'AI Coach',
    description: 'Trợ lý học tập thông minh giải đáp thắc mắc và định hướng học tập.',
    icon: 'Cpu',
    permission: 'student:ai:coach:write',
    api: '/api/v1/ai/coach'
  },
  {
    role: 'student',
    module: 'ai',
    subPath: 'recommendations',
    title: 'Gợi ý học tập',
    description: 'Các đề xuất về khóa học và bài viết phù hợp dựa trên AI.',
    icon: 'Sparkles',
    permission: 'student:ai:recommendations:read',
    api: '/api/v1/ai/recommendations'
  },

  // === TEACHER ROUTES ===
  {
    role: 'teacher',
    module: 'teaching',
    subPath: 'courses',
    title: 'Khóa học',
    description: 'Quản lý nội dung khóa học và bài giảng số.',
    icon: 'BookOpen',
    permission: 'teacher:teaching:courses:read',
    api: '/api/v1/teaching/courses'
  },
  {
    role: 'teacher',
    module: 'teaching',
    subPath: 'classes',
    title: 'Lớp học',
    description: 'Quản lý danh sách lớp học, phân nhóm học viên.',
    icon: 'UsersRound',
    permission: 'teacher:teaching:classes:read',
    api: '/api/v1/teaching/classes'
  },
  {
    role: 'teacher',
    module: 'teaching',
    subPath: 'students',
    title: 'Học viên',
    description: 'Danh sách và thông tin chi tiết học viên thuộc lớp quản lý.',
    icon: 'Users',
    permission: 'teacher:teaching:students:read',
    api: '/api/v1/teaching/students'
  },
  {
    role: 'teacher',
    module: 'assessment',
    subPath: 'questions',
    title: 'Ngân hàng câu hỏi',
    description: 'Biên soạn, nhập liệu câu hỏi trắc nghiệm và thực hành.',
    icon: 'Database',
    permission: 'teacher:assessment:questions:read',
    api: '/api/v1/assessment/questions'
  },
  {
    role: 'teacher',
    module: 'assessment',
    subPath: 'assignments',
    title: 'Bài tập & Dự án',
    description: 'Tạo và giao bài tập thực hành ứng dụng thực tế cho học viên.',
    icon: 'FileQuestion',
    permission: 'teacher:assessment:assignments:read',
    api: '/api/v1/assessment/assignments'
  },
  {
    role: 'teacher',
    module: 'assessment',
    subPath: 'cat-sessions',
    title: 'Kỳ thi thích ứng (CAT)',
    description: 'Quản lý, theo dõi và cấu hình các phiên kiểm tra thích ứng thông minh.',
    icon: 'ShieldCheck',
    permission: 'teacher:assessment:cat:read',
    api: '/api/v1/assessment/cat-sessions'
  },
  {
    role: 'teacher',
    module: 'assessment',
    subPath: 'results',
    title: 'Kết quả học viên',
    description: 'Báo cáo điểm thi, kết quả khảo thí tổng quan của các lớp.',
    icon: 'BarChart',
    permission: 'teacher:assessment:results:read',
    api: '/api/v1/assessment/results'
  },
  {
    role: 'teacher',
    module: 'portfolio',
    subPath: 'review',
    title: 'Danh sách chờ duyệt',
    description: 'Phê duyệt, đánh giá các minh chứng năng lực học viên nộp.',
    icon: 'ListTodo',
    permission: 'teacher:portfolio:review:read',
    api: '/api/v1/portfolio/review'
  },
  {
    role: 'teacher',
    module: 'portfolio',
    subPath: 'manual-review',
    title: 'Đánh giá thủ công',
    description: 'Đánh giá trực quan và cho điểm thủ công kết quả thực hành.',
    icon: 'CheckCircle',
    permission: 'teacher:portfolio:review:write',
    api: '/api/v1/portfolio/manual-review'
  },
  {
    role: 'teacher',
    module: 'analytics',
    subPath: 'student',
    title: 'Phân tích học viên',
    description: 'Báo cáo thông minh về tăng trưởng năng lực của từng học viên.',
    icon: 'BarChart',
    permission: 'teacher:analytics:student:read',
    api: '/api/v1/analytics/student'
  },
  {
    role: 'teacher',
    module: 'analytics',
    subPath: 'course',
    title: 'Phân tích lớp học',
    description: 'Biểu đồ, dữ liệu thống kê chất lượng học tập theo khóa.',
    icon: 'BarChart',
    permission: 'teacher:analytics:course:read',
    api: '/api/v1/analytics/course'
  },
  {
    role: 'teacher',
    module: 'ai',
    subPath: 'grading',
    title: 'AI Chấm điểm tự động',
    description: 'Cấu hình tiêu chí và giám sát chấm điểm tự động từ AI.',
    icon: 'Cpu',
    permission: 'teacher:ai:grading:write',
    api: '/api/v1/ai/grading'
  },
  {
    role: 'teacher',
    module: 'ai',
    subPath: 'insights',
    title: 'Thống kê thông minh',
    description: 'Phân tích dự đoán rủi ro rớt môn và gợi ý can thiệp sư phạm.',
    icon: 'Sparkles',
    permission: 'teacher:ai:insights:read',
    api: '/api/v1/ai/insights'
  },

  // === ENTERPRISE ROUTES ===
  {
    role: 'enterprise',
    module: 'recruitment',
    subPath: 'campaigns',
    title: 'Chiến dịch tuyển dụng',
    description: 'Tạo và quản lý các chiến dịch tuyển dụng nhân tài năng lực số.',
    icon: 'Briefcase',
    permission: 'enterprise:recruitment:campaigns:read',
    api: '/api/v1/recruitment/campaigns'
  },
  {
    role: 'enterprise',
    module: 'recruitment',
    subPath: 'candidates',
    title: 'Ứng viên tiềm năng',
    description: 'Tìm kiếm, lọc và phân tích ứng viên dựa trên chứng chỉ năng lực.',
    icon: 'Users',
    permission: 'enterprise:recruitment:candidates:read',
    api: '/api/v1/recruitment/candidates'
  },
  {
    role: 'enterprise',
    module: 'recruitment',
    subPath: 'shortlist',
    title: 'Danh sách chọn lọc',
    description: 'Danh sách các ứng viên xuất sắc được lưu trữ để đánh giá sâu.',
    icon: 'CheckCircle',
    permission: 'enterprise:recruitment:shortlist:read',
    api: '/api/v1/recruitment/shortlist'
  },
  {
    role: 'enterprise',
    module: 'verification',
    subPath: 'verify',
    title: 'Xác thực chứng chỉ',
    description: 'Cổng xác minh tính pháp lý của chứng chỉ số cấp bởi DIGVOS.',
    icon: 'ShieldCheck',
    permission: 'enterprise:verification:verify:write',
    api: '/api/v1/verification/verify'
  },
  {
    role: 'enterprise',
    module: 'verification',
    subPath: 'sbt',
    title: 'Xác thực SBT',
    description: 'Xác minh quyền sở hữu token linh hồn (SBT) trên blockchain.',
    icon: 'Award',
    permission: 'enterprise:verification:sbt:read',
    api: '/api/v1/verification/sbt'
  },
  {
    role: 'enterprise',
    module: 'verification',
    subPath: 'history',
    title: 'Lịch sử tra cứu',
    description: 'Nhật ký các lượt kiểm tra, tra cứu thông tin năng lực số.',
    icon: 'History',
    permission: 'enterprise:verification:history:read',
    api: '/api/v1/verification/history'
  },
  {
    role: 'enterprise',
    module: 'analytics',
    subPath: 'talent',
    title: 'Phân tích nhân tài',
    description: 'Báo cáo so sánh chất lượng kỹ năng số của đội ngũ ứng viên.',
    icon: 'BarChart',
    permission: 'enterprise:analytics:talent:read',
    api: '/api/v1/analytics/talent'
  },
  {
    role: 'enterprise',
    module: 'analytics',
    subPath: 'reports',
    title: 'Báo cáo tuyển dụng',
    description: 'Xuất các dữ liệu, biểu đồ tổng quan về hiệu quả chuyển đổi nhân sự.',
    icon: 'FileText',
    permission: 'enterprise:analytics:reports:read',
    api: '/api/v1/analytics/reports'
  },
  {
    role: 'enterprise',
    module: 'organization',
    subPath: 'recruiters',
    title: 'Người tuyển dụng',
    description: 'Quản lý các tài khoản chuyên viên tuyển dụng thuộc công ty.',
    icon: 'UsersRound',
    permission: 'enterprise:organization:recruiters:read',
    api: '/api/v1/organization/recruiters'
  },
  {
    role: 'enterprise',
    module: 'organization',
    subPath: 'teams',
    title: 'Nhóm làm việc',
    description: 'Thiết lập cơ cấu phòng ban và phân quyền truy cập thông tin.',
    icon: 'Building',
    permission: 'enterprise:organization:teams:read',
    api: '/api/v1/organization/teams'
  },
  {
    role: 'enterprise',
    module: 'billing',
    subPath: 'subscription',
    title: 'Gói dịch vụ',
    description: 'Thông tin gói đăng ký SaaS Enterprise và chu kỳ gia hạn.',
    icon: 'CreditCard',
    permission: 'enterprise:billing:subscription:read',
    api: '/api/v1/billing/subscription'
  },
  {
    role: 'enterprise',
    module: 'billing',
    subPath: 'credits',
    title: 'Số dư Credits',
    description: 'Quản lý ngân sách gọi API AI, nạp tiền và thanh toán.',
    icon: 'Wallet',
    permission: 'enterprise:billing:credits:read',
    api: '/api/v1/billing/credits'
  },
  {
    role: 'enterprise',
    module: 'billing',
    subPath: 'invoices',
    title: 'Hóa đơn',
    description: 'Lịch sử hóa đơn, chứng từ thanh toán của doanh nghiệp.',
    icon: 'FileText',
    permission: 'enterprise:billing:invoices:read',
    api: '/api/v1/billing/invoices'
  },

  // === ADMIN ROUTES ===
  {
    role: 'admin',
    module: 'identity',
    subPath: 'organizations',
    title: 'Tổ chức (Tenants)',
    description: 'Quản trị các tổ chức, trường học, doanh nghiệp sử dụng SaaS.',
    icon: 'Building',
    permission: 'admin:identity:organizations:read',
    api: '/api/v1/identity/organizations'
  },
  {
    role: 'admin',
    module: 'identity',
    subPath: 'users',
    title: 'Người dùng',
    description: 'Quản lý toàn bộ tài khoản người dùng trên hệ thống.',
    icon: 'Users',
    permission: 'admin:identity:users:read',
    api: '/api/v1/identity/users'
  },
  {
    role: 'admin',
    module: 'identity',
    subPath: 'roles',
    title: 'Vai trò',
    description: 'Cấu hình và phân bổ các vai trò người dùng (Roles).',
    icon: 'Key',
    permission: 'admin:identity:roles:read',
    api: '/api/v1/identity/roles'
  },
  {
    role: 'admin',
    module: 'identity',
    subPath: 'permissions',
    title: 'Quyền hạn',
    description: 'Phân quyền chi tiết cho từng API Endpoint và tài nguyên.',
    icon: 'ShieldCheck',
    permission: 'admin:identity:permissions:read',
    api: '/api/v1/identity/permissions'
  },
  {
    role: 'admin',
    module: 'competency',
    subPath: 'framework',
    title: 'Khung năng lực',
    description: 'Định nghĩa và quản lý bộ tiêu chuẩn năng lực số tổng quát.',
    icon: 'Globe',
    permission: 'admin:competency:framework:read',
    api: '/api/v1/competency/framework'
  },
  {
    role: 'admin',
    module: 'competency',
    subPath: 'competencies',
    title: 'Danh mục năng lực',
    description: 'Thiết lập các năng lực số chi tiết và cấp độ tương ứng.',
    icon: 'Target',
    permission: 'admin:competency:competencies:read',
    api: '/api/v1/competency/competencies'
  },
  {
    role: 'admin',
    module: 'competency',
    subPath: 'rubrics',
    title: 'Tiêu chí Rubrics',
    description: 'Quản lý bộ tiêu chí chấm điểm và đánh giá chất lượng.',
    icon: 'FileCheck',
    permission: 'admin:competency:rubrics:read',
    api: '/api/v1/competency/rubrics'
  },
  {
    role: 'admin',
    module: 'assessment',
    subPath: 'questions',
    title: 'Ngân hàng câu hỏi',
    description: 'Quản lý kho câu hỏi kiểm tra toàn diện của hệ thống.',
    icon: 'Database',
    permission: 'admin:assessment:questions:read',
    api: '/api/v1/assessment/questions'
  },
  {
    role: 'admin',
    module: 'assessment',
    subPath: 'cat',
    title: 'Động cơ thi thích ứng CAT',
    description: 'Cấu hình các tham số cốt lõi của thuật toán IRT thích ứng.',
    icon: 'Cpu',
    permission: 'admin:assessment:cat:read',
    api: '/api/v1/assessment/cat'
  },
  {
    role: 'admin',
    module: 'assessment',
    subPath: 'sessions',
    title: 'Phiên kiểm tra',
    description: 'Giám sát và kiểm tra lịch sử thi cử toàn hệ thống.',
    icon: 'History',
    permission: 'admin:assessment:sessions:read',
    api: '/api/v1/assessment/sessions'
  },
  {
    role: 'admin',
    module: 'portfolio',
    subPath: 'queue',
    title: 'Danh sách chờ duyệt',
    description: 'Kiểm duyệt chéo và giám sát tiến độ phê duyệt minh chứng.',
    icon: 'Archive',
    permission: 'admin:portfolio:queue:read',
    api: '/api/v1/portfolio/queue'
  },
  {
    role: 'admin',
    module: 'portfolio',
    subPath: 'ai',
    title: 'AI Review',
    description: 'Cấu hình và kiểm toán quy trình tự động chấm của AI.',
    icon: 'Cpu',
    permission: 'admin:portfolio:ai:read',
    api: '/api/v1/portfolio/ai'
  },
  {
    role: 'admin',
    module: 'portfolio',
    subPath: 'manual',
    title: 'Duyệt thủ công',
    description: 'Can thiệp thủ công và kiểm tra chéo các trường hợp ngoại lệ.',
    icon: 'CheckCircle',
    permission: 'admin:portfolio:manual:read',
    api: '/api/v1/portfolio/manual'
  },
  {
    role: 'admin',
    module: 'certificates',
    subPath: 'sbt',
    title: 'Soulbound Tokens (SBT)',
    description: 'Cấu hình và quản trị smart contract, cấp phát SBT.',
    icon: 'Award',
    permission: 'admin:certificates:sbt:read',
    api: '/api/v1/certificates/sbt'
  },
  {
    role: 'admin',
    module: 'certificates',
    subPath: 'verify',
    title: 'Cổng xác thực',
    description: 'Cấu hình cổng tra cứu công khai và giải pháp mã QR.',
    icon: 'ShieldCheck',
    permission: 'admin:certificates:verify:read',
    api: '/api/v1/certificates/verify'
  },
  {
    role: 'admin',
    module: 'analytics',
    subPath: 'reports',
    title: 'Báo cáo hệ thống',
    description: 'Tổng hợp dữ liệu và xuất các báo cáo chiến lược nền tảng.',
    icon: 'FileText',
    permission: 'admin:analytics:reports:read',
    api: '/api/v1/analytics/reports'
  },
  {
    role: 'admin',
    module: 'analytics',
    subPath: 'system',
    title: 'Thống kê tổng quan',
    description: 'Báo cáo thời gian thực về lượng truy cập và hoạt động người dùng.',
    icon: 'BarChart',
    permission: 'admin:analytics:system:read',
    api: '/api/v1/analytics/system'
  },
  {
    role: 'admin',
    module: 'ai',
    subPath: 'prompts',
    title: 'Quản lý Prompts',
    description: 'Quản lý các phiên bản Prompt mẫu dùng cho chấm điểm/gợi ý.',
    icon: 'FileText',
    permission: 'admin:ai:prompts:read',
    api: '/api/v1/ai/prompts'
  },
  {
    role: 'admin',
    module: 'ai',
    subPath: 'models',
    title: 'Mô hình AI',
    description: 'Cấu hình Endpoint và model LLM (OpenAI, Gemini, Local LLM).',
    icon: 'Cpu',
    permission: 'admin:ai:models:read',
    api: '/api/v1/ai/models'
  },
  {
    role: 'admin',
    module: 'ai',
    subPath: 'logs',
    title: 'Lịch sử AI Logs',
    description: 'Kiểm toán chi tiết token tiêu thụ và chi phí gọi LLM.',
    icon: 'History',
    permission: 'admin:ai:logs:read',
    api: '/api/v1/ai/logs'
  },
  {
    role: 'admin',
    module: 'system',
    subPath: 'audit',
    title: 'Audit Logs',
    description: 'Nhật ký bảo mật ghi lại mọi thay đổi cấu hình hệ thống.',
    icon: 'BadgeAlert',
    permission: 'admin:system:audit:read',
    api: '/api/v1/system/audit'
  },
  {
    role: 'admin',
    module: 'system',
    subPath: 'integrations',
    title: 'Tích hợp dịch vụ',
    description: 'Cấu hình SMTP, Redis, Object Storage S3 và Web3 provider.',
    icon: 'Server',
    permission: 'admin:system:integrations:read',
    api: '/api/v1/system/integrations'
  },
  {
    role: 'admin',
    module: 'system',
    subPath: 'settings',
    title: 'Cài đặt chung',
    description: 'Cài đặt các tham số toàn cục của hệ thống SaaS DIGVOS.',
    icon: 'Settings',
    permission: 'admin:system:settings:read',
    api: '/api/v1/system/settings'
  }
];

// Execute route generation
console.log('Bắt đầu sinh cấu trúc thư mục Routes & Loading...');

routeDefinitions.forEach(def => {
  const dirPath = path.join(TARGET_BASE, def.role, def.module, def.subPath);
  
  // 1. Create directory recursive
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`[DIR] Tạo thư mục: ${dirPath}`);
  }

  // 2. Write page.tsx
  const pageFile = path.join(dirPath, 'page.tsx');
  const pageContent = `'use client';

import React from 'react';
import { FeaturePlaceholder } from '@/components/dashboard/FeaturePlaceholder';

export default function Page() {
  return (
    <FeaturePlaceholder
      title="${def.title}"
      description="${def.description}"
      module="${def.module}"
      permission="${def.permission}"
      apiEndpoint="${def.api}"
      iconName="${def.icon}"
      status="coming_soon"
    />
  );
}
`;
  fs.writeFileSync(pageFile, pageContent, 'utf8');
  console.log(`[FILE] Tạo page.tsx: ${pageFile}`);

  // 3. Write loading.tsx
  const loadingFile = path.join(dirPath, 'loading.tsx');
  const loadingContent = `'use client';

import React from 'react';
import { DefaultLoading } from '@/components/dashboard/DefaultLoading';

export default function Loading() {
  return <DefaultLoading />;
}
`;
  fs.writeFileSync(loadingFile, loadingContent, 'utf8');
  console.log(`[FILE] Tạo loading.tsx: ${loadingFile}`);

  // 4. Create Module Layout if it doesn't exist
  const moduleLayoutPath = path.join(TARGET_BASE, def.role, def.module);
  const layoutFile = path.join(moduleLayoutPath, 'layout.tsx');
  if (!fs.existsSync(layoutFile)) {
    const layoutContent = `'use client';

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-2">
        <nav className="flex space-x-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Phân hệ: ${def.module}
          </span>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}
`;
    fs.writeFileSync(layoutFile, layoutContent, 'utf8');
    console.log(`[FILE] Tạo module layout.tsx: ${layoutFile}`);
  }
});

console.log('Hoàn thành sinh cấu trúc Frontend Routes!');
