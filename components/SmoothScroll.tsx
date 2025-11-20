'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll behavior
    if (typeof window !== 'undefined') {
      // CSS smooth scroll
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Polyfill pour les navigateurs qui ne supportent pas smooth scroll
      const handleClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a[href^="#"]');
        if (target) {
          const href = (target as HTMLAnchorElement).getAttribute('href');
          if (href && href.startsWith('#')) {
            const id = href.slice(1);
            const element = document.getElementById(id);
            if (element) {
              e.preventDefault();
              const headerOffset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              });
            }
          }
        }
      };

      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
        document.documentElement.style.scrollBehavior = 'auto';
      };
    }
  }, []);

  return null;
}



