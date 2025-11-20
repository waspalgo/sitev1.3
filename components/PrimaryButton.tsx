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
    'inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-4 rounded-full font-semibold text-base md:text-lg text-white transition-all duration-300 relative overflow-hidden group';

  const gradientClasses =
    'bg-gradient-to-r from-purple-primary via-purple-secondary to-purple-accent';

<<<<<<< HEAD
  // Pas d'effet glow/neon pour les boutons des formulaires
  const glowClasses = '';
=======
  // Réduire le glow quand le clavier est ouvert sur mobile
  const glowClasses = isKeyboardOpen
    ? 'shadow-[0_0_5px_rgba(168,85,247,0.2),0_0_10px_rgba(109,40,217,0.1)] hover:shadow-[0_0_8px_rgba(168,85,247,0.3),0_0_15px_rgba(109,40,217,0.15)]'
    : 'shadow-[0_0_20px_rgba(168,85,247,0.4),0_0_40px_rgba(109,40,217,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6),0_0_60px_rgba(109,40,217,0.3)]';
>>>>>>> 82a9afff82211ec552c4e205dc33ff711accf459

  const hoverClasses = disabled 
    ? '' 
    : 'hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 ease-out';

<<<<<<< HEAD
  const borderClasses = '';
=======
  const borderClasses = disabled
    ? ''
    : isKeyboardOpen
    ? 'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-purple-accent/50 before:via-purple-secondary/50 before:to-purple-primary/50 before:opacity-0 before:transition-opacity before:duration-300 before:-z-10 before:blur-sm'
    : 'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-purple-accent/50 before:via-purple-secondary/50 before:to-purple-primary/50 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10 before:blur-sm';
>>>>>>> 82a9afff82211ec552c4e205dc33ff711accf459

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  const combinedClasses = `${baseClasses} ${gradientClasses} ${glowClasses} ${hoverClasses} ${borderClasses} ${disabledClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses}>
      {children}
    </button>
  );
}

