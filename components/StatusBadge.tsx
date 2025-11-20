'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface StatusBadgeProps {
  status: 'active' | 'inactive';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, className = '', size = 'md' }: StatusBadgeProps) {
  const { t } = useLanguage();
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const isActive = status === 'active';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 ${sizeClasses[size]} ${
        isActive
          ? 'bg-green-500/20 text-green-400 border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
          : 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
      } ${className}`}
      style={{ lineHeight: '1.2' }}
    >
      <span
        className={`relative flex h-2 w-2 ${isActive ? 'animate-pulse' : ''}`}
      >
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isActive ? 'animate-ping bg-green-400' : 'bg-red-400'
          }`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isActive ? 'bg-green-400' : 'bg-red-400'
          }`}
        />
      </span>
      <span className="font-medium">
        {isActive ? t('home.statusBadge.active') : t('home.statusBadge.inactive')}
      </span>
    </div>
  );
}

