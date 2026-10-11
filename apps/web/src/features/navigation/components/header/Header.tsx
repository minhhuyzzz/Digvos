'use client';

import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { GlobalSearch } from './GlobalSearch';
import { NotificationDropdown } from './NotificationDropdown';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { UserMenu } from './UserMenu';
import { LearnerActions } from './actions/LearnerActions';
import { OrgActions } from './actions/OrgActions';
import { AdminActions } from './actions/AdminActions';

interface HeaderProps {
  role: 'learner' | 'org' | 'admin';
}

export const Header: React.FC<HeaderProps> = ({ role }) => {
  const renderActions = () => {
    switch (role) {
      case 'learner':
        return <LearnerActions />;
      case 'org':
        return <OrgActions />;
      case 'admin':
        return <AdminActions />;
      default:
        return null;
    }
  };

  const getUserDetails = () => {
    switch (role) {
      case 'learner':
        return { name: 'Người học', displayRole: 'Học viên', letter: 'L' };
      case 'org':
        return { name: 'Tổ chức', displayRole: 'Quản trị', letter: 'O' };
      case 'admin':
        return { name: 'Super Admin', displayRole: 'Hệ thống', letter: 'A' };
      default:
        return { name: 'User Name', displayRole: 'User', letter: 'U' };
    }
  };

  const user = getUserDetails();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center">
        <Breadcrumb />
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <GlobalSearch />

        {renderActions()}

        <div className="flex items-center space-x-1 border-r border-gray-200 pr-4 mr-2">
          <NotificationDropdown />
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <UserMenu name={user.name} role={user.displayRole} avatarLetter={user.letter} />
      </div>
    </header>
  );
};
