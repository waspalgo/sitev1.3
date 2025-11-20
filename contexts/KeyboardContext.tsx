'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface KeyboardContextType {
  isKeyboardOpen: boolean;
}

const KeyboardContext = createContext<KeyboardContextType>({
  isKeyboardOpen: false,
});

export function KeyboardProvider({ children }: { children: ReactNode }) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // Vérifier si c'est un input, textarea ou select
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        // Vérifier si on est sur mobile
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          setIsKeyboardOpen(true);
        }
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        // Attendre un peu pour voir si un autre input prend le focus
        setTimeout(() => {
          const activeElement = document.activeElement;
          if (
            !activeElement ||
            (activeElement.tagName !== 'INPUT' &&
              activeElement.tagName !== 'TEXTAREA' &&
              activeElement.tagName !== 'SELECT')
          ) {
            setIsKeyboardOpen(false);
          }
        }, 100);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return (
    <KeyboardContext.Provider value={{ isKeyboardOpen }}>
      {children}
    </KeyboardContext.Provider>
  );
}

export function useKeyboard() {
  return useContext(KeyboardContext);
}

