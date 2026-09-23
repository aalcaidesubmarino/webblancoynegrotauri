import React from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'zen' | 'dorado' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'zen',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl active:scale-[0.98]';

    const variants = {
      zen: 'bg-zen-bosque-500 hover:bg-zen-bosque-600 text-white shadow-zen focus:ring-zen-bosque-500',
      dorado: 'bg-zen-dorado-500 hover:bg-zen-dorado-600 text-white shadow-zen focus:ring-zen-dorado-500',
      secondary: 'bg-zen-crema-dark hover:bg-stone-200 text-zen-carbon focus:ring-stone-400',
      outline:
        'border border-zen-bosque-500 text-zen-bosque-500 hover:bg-zen-bosque-50 focus:ring-zen-bosque-500',
      danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
      ghost: 'bg-transparent text-zen-bosque-700 hover:bg-zen-bosque-50 focus:ring-zen-bosque-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5',
      icon: 'p-2 w-10 h-10',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
