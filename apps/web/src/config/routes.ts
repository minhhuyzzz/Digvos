export const ROUTES = {
  // Public
  HOME: '/',
  PRICING: '/pricing',
  FEATURES: '/features',
  BLOG: '/blog',
  LOGIN: '/login',
  VERIFY: '/verify',

  // Learner
  LEARNER: {
    DASHBOARD: '/learner',
    LEARNING: {
      COURSES: '/learner/learning/courses',
      PATH: '/learner/learning/path',
      RESOURCES: '/learner/learning/resources',
    },
    ASSESSMENT: {
      CAT: '/learner/assessment/cat',
      EXAMS: '/learner/assessment/exams',
      RESULTS: '/learner/assessment/results',
    },
    PORTFOLIO: {
      EVIDENCE: '/learner/portfolio/evidence',
      CERTIFICATES: '/learner/portfolio/certificates',
      WALLET: '/learner/portfolio/wallet',
    },
    ANALYTICS: {
      RADAR: '/learner/analytics/radar',
      SKILL_GAP: '/learner/analytics/skill-gap',
      PROGRESS: '/learner/analytics/progress',
    },
    AI: {
      COACH: '/learner/ai/coach',
      RECOMMENDATIONS: '/learner/ai/recommendations',
    },
  },

  // Organization (Teacher & Enterprise combined)
  ORG: {
    DASHBOARD: '/org',
    // From Teacher
    TEACHING: {
      COURSES: '/org/teaching/courses',
      CLASSES: '/org/teaching/classes',
      STUDENTS: '/org/teaching/students',
    },
    ASSESSMENT: {
      QUESTIONS: '/org/assessment/questions',
      ASSIGNMENTS: '/org/assessment/assignments',
      CAT_SESSIONS: '/org/assessment/cat-sessions',
      RESULTS: '/org/assessment/results',
    },
    PORTFOLIO: {
      REVIEW: '/org/portfolio/review',
      MANUAL_REVIEW: '/org/portfolio/manual-review',
    },
    // From Enterprise
    RECRUITMENT: {
      CAMPAIGNS: '/org/recruitment/campaigns',
      CANDIDATES: '/org/recruitment/candidates',
      SHORTLIST: '/org/recruitment/shortlist',
    },
    VERIFICATION: {
      VERIFY: '/org/verification/verify',
      SBT: '/org/verification/sbt',
      HISTORY: '/org/verification/history',
    },
    ANALYTICS: {
      STUDENT: '/org/analytics/student',
      COURSE: '/org/analytics/course',
      TALENT: '/org/analytics/talent',
      REPORTS: '/org/analytics/reports',
    },
    ORGANIZATION: {
      RECRUITERS: '/org/organization/recruiters',
      TEAMS: '/org/organization/teams',
    },
    BILLING: {
      SUBSCRIPTION: '/org/billing/subscription',
      CREDITS: '/org/billing/credits',
      INVOICES: '/org/billing/invoices',
    },
    AI: {
      GRADING: '/org/ai/grading',
      INSIGHTS: '/org/ai/insights',
    },
  },

  // Admin
  ADMIN: {
    DASHBOARD: '/admin',
    IDENTITY: {
      ORGANIZATIONS: '/admin/identity/organizations',
      USERS: '/admin/identity/users',
      ROLES: '/admin/identity/roles',
      PERMISSIONS: '/admin/identity/permissions',
    },
    COMPETENCY: {
      FRAMEWORK: '/admin/competency/framework',
      COMPETENCIES: '/admin/competency/competencies',
      RUBRICS: '/admin/competency/rubrics',
    },
    ASSESSMENT: {
      QUESTIONS: '/admin/assessment/questions',
      CAT: '/admin/assessment/cat',
      SESSIONS: '/admin/assessment/sessions',
    },
    PORTFOLIO: {
      QUEUE: '/admin/portfolio/queue',
      AI: '/admin/portfolio/ai',
      MANUAL: '/admin/portfolio/manual',
    },
    CERTIFICATES: {
      SBT: '/admin/certificates/sbt',
      VERIFY: '/admin/certificates/verify',
    },
    ANALYTICS: {
      REPORTS: '/admin/analytics/reports',
      SYSTEM: '/admin/analytics/system',
    },
    AI: {
      PROMPTS: '/admin/ai/prompts',
      MODELS: '/admin/ai/models',
      LOGS: '/admin/ai/logs',
    },
    SYSTEM: {
      AUDIT: '/admin/system/audit',
      INTEGRATIONS: '/admin/system/integrations',
      SETTINGS: '/admin/system/settings',
    },
  },
};
