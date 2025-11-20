import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  variant?: 'default' | 'feature' | 'dashboard';
}

export default function GlassCard({
  children,
  className = '',
  glow = false,
  variant = 'default',
}: GlassCardProps) {
  const baseClasses = 'rounded-3xl transition-transform duration-200 relative overflow-hidden';
  
  let variantClasses = '';
  if (variant === 'feature') {
    variantClasses =
      'bg-gradient-to-br from-purple-primary/10 via-purple-secondary/5 to-bg-secondary p-8 border border-purple-accent/20 shadow-lg hover:shadow-xl hover:border-purple-accent/30';
  } else if (variant === 'dashboard') {
    variantClasses =
      'bg-gradient-to-br from-bg-secondary/90 via-purple-primary/10 to-purple-primary/20 p-8 md:p-10 border border-purple-accent/30 backdrop-blur-2xl shadow-2xl';
  } else {
    variantClasses =
      'bg-gradient-to-br from-purple-primary/10 via-bg-secondary/80 to-bg-secondary p-6 border border-purple-accent/20 hover:border-purple-accent/40';
  }

  const glowClasses = glow
    ? 'shadow-glow-md hover:shadow-glow-lg'
    : 'hover:shadow-glow-sm';

  const hoverClasses = 'hover:scale-[1.02] hover:-translate-y-1 transition-transform duration-200 ease-out hover:shadow-2xl';

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${glowClasses} ${hoverClasses} ${className}`}
      style={{
        willChange: 'transform, box-shadow',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
      }}
    >
      {/* Barre néon animée en haut - effet flash intense */}
      {variant === 'dashboard' && (
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <div
            className="h-full w-full neon-bar"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.5) 15%, rgba(192, 132, 252, 0.9) 30%, rgba(255, 255, 255, 1) 50%, rgba(192, 132, 252, 0.9) 70%, rgba(168, 85, 247, 0.5) 85%, transparent 100%)',
              backgroundSize: '200% 100%',
              boxShadow:
                '0 0 15px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.6), 0 0 45px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.3)',
              animation: 'neon-bar-pulse 1.5s ease-in-out infinite, neon-bar-shimmer 3s linear infinite',
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
}

