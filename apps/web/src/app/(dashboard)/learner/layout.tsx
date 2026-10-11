import React from 'react';
import { WorkspaceLayout } from '@/features/navigation';

export default function LearnerLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout role="learner">{children}</WorkspaceLayout>;
}
