'use client';

interface BackgroundLightsProps {
  variant?: 'default' | 'subtle' | 'intense';
  uniqueId?: string;
  positions?: {
    orb1?: { top?: string; left?: string; right?: string; bottom?: string };
    orb2?: { top?: string; left?: string; right?: string; bottom?: string };
    orb3?: { top?: string; left?: string; right?: string; bottom?: string };
  };
  sizes?: {
    orb1?: number;
    orb2?: number;
    orb3?: number;
  };
}

export default function BackgroundLights({ 
  variant = 'default', 
  uniqueId = 'default',
  positions,
  sizes,
}: BackgroundLightsProps) {
  const opacity = variant === 'subtle' ? { orbs: 0.08, grid: 0.015, lines: 0.05 } : 
                  variant === 'intense' ? { orbs: 0.20, grid: 0.03, lines: 0.12 } :
                  { orbs: 0.15, grid: 0.02, lines: 0.08 };

  // Positions par défaut
  const defaultPositions = {
    orb1: { top: '25%', left: '25%' },
    orb2: { top: '50%', right: '25%' },
    orb3: { bottom: '25%', left: '50%' },
  };

  const finalPositions = {
    orb1: { ...defaultPositions.orb1, ...positions?.orb1 },
    orb2: { ...defaultPositions.orb2, ...positions?.orb2 },
    orb3: { ...defaultPositions.orb3, ...positions?.orb3 },
  };

  const finalSizes = {
    orb1: sizes?.orb1 || 384,
    orb2: sizes?.orb2 || 320,
    orb3: sizes?.orb3 || 288,
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden" 
      style={{ 
        zIndex: 0,
        contain: 'layout style paint',
        willChange: 'contents',
      }}
    >
      {/* Large gradient orbs */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite',
          opacity: opacity.orbs,
          width: `${finalSizes.orb1}px`,
          height: `${finalSizes.orb1}px`,
          ...finalPositions.orb1,
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          animation: 'float 25s ease-in-out infinite reverse',
          opacity: opacity.orbs * 0.8,
          width: `${finalSizes.orb2}px`,
          height: `${finalSizes.orb2}px`,
          ...finalPositions.orb2,
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(109, 40, 217, 0.3) 0%, transparent 70%)',
          animation: 'float 30s ease-in-out infinite',
          opacity: opacity.orbs * 0.7,
          width: `${finalSizes.orb3}px`,
          height: `${finalSizes.orb3}px`,
          ...finalPositions.orb3,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: opacity.grid,
        }}
      />

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: opacity.lines }}>
        <defs>
          <linearGradient id={`lineGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.5)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.5)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="30%"
          x2="100%"
          y2="30%"
          stroke={`url(#lineGradient-${uniqueId})`}
          strokeWidth="1"
          style={{
            animation: 'linePulse 4s ease-in-out infinite',
          }}
        />
        <line
          x1="0"
          y1="60%"
          x2="100%"
          y2="60%"
          stroke={`url(#lineGradient-${uniqueId})`}
          strokeWidth="1"
          style={{
            animation: 'linePulse 4s ease-in-out infinite 2s',
          }}
        />
        <line
          x1="0"
          y1="80%"
          x2="100%"
          y2="80%"
          stroke={`url(#lineGradient-${uniqueId})`}
          strokeWidth="1"
          style={{
            animation: 'linePulse 4s ease-in-out infinite 1s',
          }}
        />
      </svg>
    </div>
  );
}

