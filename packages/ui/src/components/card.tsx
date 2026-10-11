import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'premium';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = 'rounded-2xl transition-all duration-300';
  const variants = {
    default: 'glass p-6',
    premium: 'glass-premium p-6',
  };

  return (
    <div
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
