'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
}

export default function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  distance = 30,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Utiliser requestAnimationFrame pour une meilleure performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              setIsVisible(true);
              // Retirer will-change après l'animation pour économiser les ressources
              setTimeout(() => {
                if (element) {
                  element.style.willChange = 'auto';
                }
              }, 600);
            }, delay);
          });
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translate3d(0, ${distance}px, 0)`;
        case 'down':
          return `translate3d(0, -${distance}px, 0)`;
        case 'left':
          return `translate3d(${distance}px, 0, 0)`;
        case 'right':
          return `translate3d(-${distance}px, 0, 0)`;
        case 'fade':
          return 'translate3d(0, 0, 0)';
        default:
          return `translate3d(0, ${distance}px, 0)`;
      }
    }
    return 'translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'revealed' : ''} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: isVisible ? 'auto' : 'opacity, transform',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {children}
    </div>
  );
}


