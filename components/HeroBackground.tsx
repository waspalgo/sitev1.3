'use client';

import { useEffect, useRef, useMemo, useState } from 'react';

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetIntensity = useRef(0);
  const currentIntensity = useRef(0);

  useEffect(() => {
    const updateIntensity = () => {
      const diff = targetIntensity.current - currentIntensity.current;
      // Interpolation très rapide pour réactivité instantanée
      currentIntensity.current += diff * 0.3; // Facteur plus élevé pour réactivité immédiate
      
      if (Math.abs(diff) > 0.005) {
        setScrollIntensity(currentIntensity.current);
        rafRef.current = requestAnimationFrame(updateIntensity);
      } else {
        currentIntensity.current = targetIntensity.current;
        setScrollIntensity(currentIntensity.current);
      }
    };

    const handleScroll = () => {
      // Pas de parallaxe - les particules ne bougent pas
      
      // Augmenter l'intensité de brillance instantanément au scroll
      targetIntensity.current = 1;
      
      // Démarrer l'interpolation immédiatement
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateIntensity);
      }

      // Réduire progressivement après un délai sans scroll
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

    // Utiliser wheel pour détecter immédiatement le scroll
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

  // Détecter si on est sur mobile pour réduire les particules
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Générer des particules UNIQUEMENT dans la zone néon (plus nombreuses et plus petites comme l'image)
  // Reduce on mobile for performance
  // Ne générer les particules qu'après le montage pour éviter les erreurs d'hydratation
  const particleCount = isMobile ? 150 : 300;
  const neonParticles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: particleCount }).map((_, i) => {
      // Utiliser un seed basé sur l'index pour avoir des valeurs cohérentes
      const seed = i * 7919; // Nombre premier pour une meilleure distribution
      const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
      const random2 = ((seed * 7919 + 49297) % 233280) / 233280;
      const random3 = ((seed * 1237 + 49297) % 233280) / 233280;
      const random4 = ((seed * 4567 + 49297) % 233280) / 233280;
      const random5 = ((seed * 6789 + 49297) % 233280) / 233280;
      const random6 = ((seed * 3456 + 49297) % 233280) / 233280;
      
      // Concentrer les particules dans une zone plus petite et plus proche du titre
      const angle = random1 * Math.PI * 2;
      const distance = random2 * 25; // Zone légèrement plus large mais toujours concentrée
      const left = 50 + Math.cos(angle) * distance;
      const top = 30 + Math.sin(angle) * distance; // 30% pour être plus proche du titre
      
      const delay = random3 * 100;
      const size = random4 * 1 + 0.5; // 0.5-1.5px (particules plus petites comme l'image)
      const opacity = random5 * 0.15 + 0.05; // 0.05-0.2 (plus subtiles)
      const driftType = (i % 4) + 1;
      const baseDuration = 18 + random6 * 12; // 18-30s (mouvement plus lent et subtil)
      const speedMultiplier = 0.85 + random1 * 0.3;

      return {
        id: `neon-particle-${i}`,
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
  }, [particleCount, isMounted]);

  // Cercles concentriques pour la sphère (lignes) - réduits pour ne pas dépasser
  const circleRadii = [80, 120, 160, 200, 240, 280];
  
  // Boules qui orbitent sur les cercles (rayons) - réduites
  const orbits = [
    { radius: 80, nodes: 6, speed: 60, delay: 0, direction: 1 },
    { radius: 120, nodes: 8, speed: 70, delay: 10, direction: -1 },
    { radius: 160, nodes: 10, speed: 80, delay: 20, direction: 1 },
    { radius: 200, nodes: 12, speed: 90, delay: 30, direction: -1 },
    { radius: 240, nodes: 14, speed: 100, delay: 40, direction: 1 },
    { radius: 280, nodes: 16, speed: 110, delay: 50, direction: -1 },
  ];

  // Durée d'animation constante - pas d'effet de scroll
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
      {/* Base black background - FULL BLACK */}
      <div className="absolute inset-0" style={{ backgroundColor: '#000000' }} />

      {/* Gradient violet néon subtil et progressif comme l'image */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.1) 20%, rgba(109, 40, 217, 0.06) 35%, rgba(88, 28, 135, 0.03) 50%, rgba(0, 0, 0, 0) 65%)',
        }}
      />
      
      {/* Gradient supplémentaire pour effet plus doux et progressif */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(168, 85, 247, 0.08) 0%, rgba(139, 92, 246, 0.05) 30%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Masque pour cacher la partie basse de la sphère (derrière l'image) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.8) 48%, rgba(0, 0, 0, 1) 52%, rgba(0, 0, 0, 1) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Cercles concentriques (lignes de la sphère) - plus subtils comme l'image */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.15, zIndex: 0 }}
      >
        {circleRadii.map((radius, index) => (
          <circle
            key={`circle-${index}`}
            cx="50%"
            cy="30%"
            r={radius}
            fill="none"
            stroke="rgba(168, 85, 247, 0.4)"
            strokeWidth="1"
            style={{
              filter: 'blur(1px)',
            }}
          />
        ))}
      </svg>

      {/* Boules qui orbitent sur les cercles (rayons) - plus subtiles et petites comme l'image */}
      {isMounted && orbits.map((orbit, orbitIndex) =>
        Array.from({ length: orbit.nodes }).map((_, nodeIndex) => {
          const angle = (360 / orbit.nodes) * nodeIndex;
          // Utiliser un seed déterministe basé sur l'index pour éviter les erreurs d'hydratation
          const seed = orbitIndex * 1000 + nodeIndex;
          const pseudoRandom = ((seed * 7919 + 49297) % 233280) / 233280;
          const nodeSize = pseudoRandom * 1.5 + 1; // 1-2.5px (plus petites)
          const nodeDelay = (orbit.delay + (nodeIndex * orbit.speed) / orbit.nodes) % orbit.speed;

          return (
            <div
              key={`orbit-node-${orbitIndex}-${nodeIndex}`}
              className="absolute left-1/2 rounded-full"
              style={{
                top: '30%',
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
                backgroundColor: 'rgba(168, 85, 247, 0.6)',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${orbit.radius}px)`,
                transformOrigin: '50% 50%',
                animation: `orbit-sphere-${orbitIndex} ${orbit.speed}s linear infinite`,
                animationDelay: `${nodeDelay}s`,
                boxShadow: `
                  0 0 ${nodeSize * 1.5}px rgba(168, 85, 247, 0.5),
                  0 0 ${nodeSize * 0.8}px rgba(168, 85, 247, 0.3)
                `,
                opacity: 0.4,
                zIndex: 0,
              }}
            />
          );
        })
      )}

      {/* Particules UNIQUEMENT dans la zone néon (derrière le titre) */}
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
