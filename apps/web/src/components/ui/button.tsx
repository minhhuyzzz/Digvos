import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700',
    glass: 'glass hover:bg-white hover:text-slate-950 border border-slate-800',
    danger: 'bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
