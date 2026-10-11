import React from 'react';
import { WorkspaceLayout } from '@/features/navigation';

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout role="org">{children}</WorkspaceLayout>;
}
