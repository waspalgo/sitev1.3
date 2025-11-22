'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useKeyboard } from '@/contexts/KeyboardContext';

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function PrimaryButton({
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
}: PrimaryButtonProps) {
  const { isKeyboardOpen } = useKeyboard();

  const baseClasses =
    'inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-4 rounded-full font-semibold text-base md:text-lg text-white transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-purple-accent focus:ring-offset-2 focus:ring-offset-black';

  const gradientClasses =
    'bg-gradient-to-r from-purple-primary via-purple-secondary to-purple-accent';

  // Pas d'effet glow/neon pour les boutons des formulaires
  const glowClasses = '';

  const hoverClasses = disabled 
    ? '' 
    : 'hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 ease-out';

  const borderClasses = '';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  const combinedClasses = `${baseClasses} ${gradientClasses} ${glowClasses} ${hoverClasses} ${borderClasses} ${disabledClasses} ${className}`;

  const ariaLabel = typeof children === 'string' ? children : undefined;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
      aria-busy={disabled}
    >
      {children}
    </button>
  );
}

