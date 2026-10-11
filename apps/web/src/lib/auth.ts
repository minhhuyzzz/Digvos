const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface LocalUser {
  id: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'TEACHER' | 'EMPLOYER' | 'ADMIN';
  requireOnboarding?: boolean;
}

export interface SyncResponse {
  requireRoleSelection: boolean;
  email?: string;
  auth0Sub?: string;
  name?: string;
  accessToken?: string;
  expiresIn?: number;
  user?: LocalUser;
}

export const syncAuth0UserWithBackend = async (payload: {
  auth0Sub: string;
  email: string;
  name?: string;
  role?: string;
}): Promise<SyncResponse> => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/auth/sync-auth0`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Failed to sync with backend');
    }

    const resJson = await response.json();
    // NestJS has a response interceptor that wraps everything in { data: ... } or similar
    return resJson.data || resJson;
  } catch (error) {
    console.error('Error syncing user with backend:', error);
    throw error;
  }
};

export const getDashboardRoute = (role: string): string => {
  switch (role) {
    case 'STUDENT':
      return '/learner';
    case 'TEACHER':
    case 'EMPLOYER':
    case 'ORG':
      return '/org';
    case 'ADMIN':
      return '/admin';
    default:
      return '/select-role';
  }
};

export const saveLocalSession = (accessToken: string, user: LocalUser) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('digvos_access_token', accessToken);
    localStorage.setItem('digvos_user', JSON.stringify(user));
    
    // Đồng thời lưu vào Cookie cho Middleware
    const maxAge = 86400; // 1 ngày
    document.cookie = `digvos_access_token=${accessToken}; path=/; max-age=${maxAge}; samesite=lax`;
    document.cookie = `digvos_user_role=${user.role}; path=/; max-age=${maxAge}; samesite=lax`;
  }
};

export const clearLocalSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('digvos_access_token');
    localStorage.removeItem('digvos_user');
    
    // Xóa cookie
    document.cookie = `digvos_access_token=; path=/; max-age=0; samesite=lax`;
    document.cookie = `digvos_user_role=; path=/; max-age=0; samesite=lax`;
  }
};

export const getLocalUser = (): LocalUser | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('digvos_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export const getLocalToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('digvos_access_token');
  }
  return null;
};

export const onboardUserWithBackend = async (role: 'STUDENT' | 'TEACHER' | 'EMPLOYER'): Promise<any> => {
  const token = getLocalToken();
  if (!token) {
    throw new Error('Chưa đăng nhập hệ thống.');
  }

  try {
    const response = await fetch(`${BACKEND_API_URL}/auth/onboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Lỗi lưu vai trò onboarding.');
    }

    const resJson = await response.json();
    return resJson.data || resJson;
  } catch (error) {
    console.error('Error in onboardUserWithBackend:', error);
    throw error;
  }
};
