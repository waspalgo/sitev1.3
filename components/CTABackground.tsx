'use client';

import { useEffect, useRef, useMemo, useState } from 'react';

export default function CTABackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetIntensity = useRef(0);
  const currentIntensity = useRef(0);

  useEffect(() => {
    const updateIntensity = () => {
      const diff = targetIntensity.current - currentIntensity.current;
      currentIntensity.current += diff * 0.3;
      
      if (Math.abs(diff) > 0.005) {
        setScrollIntensity(currentIntensity.current);
        rafRef.current = requestAnimationFrame(updateIntensity);
      } else {
        currentIntensity.current = targetIntensity.current;
        setScrollIntensity(currentIntensity.current);
      }
    };

    const handleScroll = () => {
      targetIntensity.current = 1;
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateIntensity);
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        targetIntensity.current = 0;
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(updateIntensity);
        }
      }, 150);
    };

    const handleWheel = () => {
      targetIntensity.current = 1;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateIntensity);
      }
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        targetIntensity.current = 0;
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(updateIntensity);
        }
      }, 150);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // État pour s'assurer que le composant est monté avant de générer les particules
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Générer des particules dans la zone néon (positionnées en bas à 70%)
  // Utiliser un générateur pseudo-aléatoire déterministe pour éviter les erreurs d'hydratation
  const neonParticles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 200 }).map((_, i) => {
      // Utiliser un seed basé sur l'index pour avoir des valeurs cohérentes
      const seed = i * 7919; // Nombre premier pour une meilleure distribution
      const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
      const random2 = ((seed * 7919 + 49297) % 233280) / 233280;
      const random3 = ((seed * 1237 + 49297) % 233280) / 233280;
      const random4 = ((seed * 4567 + 49297) % 233280) / 233280;
      const random5 = ((seed * 6789 + 49297) % 233280) / 233280;
      const random6 = ((seed * 3456 + 49297) % 233280) / 233280;
      
      const angle = random1 * Math.PI * 2;
      const distance = random2 * 25;
      const left = 50 + Math.cos(angle) * distance;
      const top = 70 + Math.sin(angle) * distance; // 70% pour être en bas
      
      const delay = random3 * 100;
      const size = random4 * 1.2 + 0.8; // 0.8-2.0px (un peu plus grandes)
      const opacity = random5 * 0.15 + 0.05;
      const driftType = (i % 4) + 1;
      const baseDuration = 18 + random6 * 12;
      const speedMultiplier = 0.85 + random1 * 0.3;

      return {
        id: `cta-particle-${i}`,
        delay,
        left,
        top,
        size,
        opacity,
        driftType,
        baseDuration,
        speedMultiplier,
      };
    });
  }, [isMounted]);

  const getAnimationDuration = (baseDuration: number, speedMultiplier: number) => {
    return baseDuration / speedMultiplier;
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
      style={{ 
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: '#000000' }} />

      {/* Gradient violet néon - positionné en bas */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 70%, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.1) 20%, rgba(109, 40, 217, 0.06) 35%, rgba(88, 28, 135, 0.03) 50%, rgba(0, 0, 0, 0) 65%)',
        }}
      />
      
      {/* Gradient supplémentaire */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 70%, rgba(168, 85, 247, 0.08) 0%, rgba(139, 92, 246, 0.05) 30%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Particules avec effet de brillance au scroll */}
      {isMounted && (
        <div className="absolute inset-0" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', zIndex: 0 }}>
          {neonParticles.map((particle) => {
          const driftClass = `particle-drift-${particle.driftType}`;
          const animationDuration = getAnimationDuration(particle.baseDuration, particle.speedMultiplier);
          
          const baseGlowSize = particle.size * 1.5;
          const baseGlowIntensity = particle.opacity * 0.7;
          
          const scrollGlowMultiplier = 1 + scrollIntensity * 1.5;
          const scrollOpacityBoost = scrollIntensity * 0.3;
          const enhancedGlowSize = baseGlowSize * scrollGlowMultiplier;
          const enhancedGlowIntensity = Math.min(baseGlowIntensity * scrollGlowMultiplier, 0.8);
          const enhancedOpacity = Math.min(particle.opacity + scrollOpacityBoost, 0.5);
          
          return (
            <div
              key={particle.id}
              className={`absolute rounded-full ${driftClass}`}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                opacity: enhancedOpacity,
                boxShadow: `
                  0 0 ${enhancedGlowSize}px rgba(255, 255, 255, ${enhancedGlowIntensity}),
                  0 0 ${enhancedGlowSize * 0.5}px rgba(255, 255, 255, ${enhancedGlowIntensity * 0.6})
                `,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${animationDuration}s`,
                animationTimingFunction: 'ease-in-out',
                animationFillMode: 'both',
                transition: 'opacity 0.15s ease-out, box-shadow 0.15s ease-out',
                willChange: 'transform, opacity, box-shadow',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitTransform: 'translateZ(0)',
              }}
            />
          );
        })}
        </div>
      )}
    </div>
  );
}


