'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size]} border-purple-accent/30 border-t-purple-accent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Chargement en cours"
    >
      <span className="sr-only">Chargement en cours</span>
    </div>
  );
}

