'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalUser } from '../../../lib/auth';

export default function OnboardingRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = getLocalUser();
      if (user) {
        // Nếu đã đăng nhập, đưa thẳng vào dashboard tương ứng
        router.push(`/${user.role.toLowerCase()}`);
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  return null;
}
