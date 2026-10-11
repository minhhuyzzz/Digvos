'use client';

import React from 'react';
import { NavigationProvider } from './providers/NavigationProvider';
import { Sidebar } from './components/sidebar/Sidebar';
import { Breadcrumb } from './components/header/Breadcrumb';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  role: 'learner' | 'org' | 'admin';
}

function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50 relative min-h-screen">
      {/* Top Breadcrumb Path Navigation */}
      <div className="mb-4">
        <Breadcrumb />
      </div>
      {children}
    </main>
  );
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children, role }) => {
  return (
    <NavigationProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased">
        {/* Unified Light Mode Sidebar (ChatGPT & Gemini Style) */}
        <Sidebar role={role} />

        {/* Main Workspace Area */}
        <MainContent>{children}</MainContent>
      </div>
    </NavigationProvider>
  );
};
