'use client';

import React, { useState, createContext, useContext } from 'react';

interface NavigationContextProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationContext = createContext<NavigationContextProps>({
  collapsed: false,
  setCollapsed: () => {},
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <NavigationContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(NavigationContext);
  return {
    collapsed: context.collapsed,
    setCollapsed: context.setCollapsed,
  };
};
