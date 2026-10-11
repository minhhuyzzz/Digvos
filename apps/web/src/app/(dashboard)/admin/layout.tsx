import React from 'react';
import { WorkspaceLayout } from '@/features/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout role="admin">{children}</WorkspaceLayout>;
}
