'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('common.home') },
    { href: '/algorithmes', label: t('common.algorithms') },
    { href: '/actualite', label: t('common.news') },
    { href: '/faq', label: t('common.faq') },
    { href: '/contact', label: t('common.contact') },
  ];
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-bg-secondary border-l border-purple-accent/20 shadow-glow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-purple-accent/20">
            <span className="text-xl font-bold text-text-primary">{t('common.menu')}</span>
            <button
              onClick={onClose}
              className="p-2 text-text-primary hover:text-purple-accent transition-colors"
              aria-label={t('common.close')}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8 space-y-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`block text-lg transition-colors ${
                    isActive
                      ? 'text-purple-accent font-semibold'
                      : 'text-text-secondary hover:text-purple-accent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-purple-accent/20 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm" role="group" aria-label="Sélecteur de langue">
              <button
                type="button"
                className={language === 'fr' ? 'text-purple-accent font-semibold cursor-pointer' : 'text-text-muted hover:text-purple-accent transition-colors cursor-pointer'}
                onClick={() => setLanguage('fr')}
                aria-label="Changer la langue en français"
                aria-pressed={language === 'fr'}
              >
                FR
              </button>
              <span className="text-text-muted" aria-hidden="true">|</span>
              <button
                type="button"
                className={language === 'en' ? 'text-purple-accent font-semibold cursor-pointer' : 'text-text-muted hover:text-purple-accent transition-colors cursor-pointer'}
                onClick={() => setLanguage('en')}
                aria-label="Change language to English"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>
            <div onClick={onClose}>
              <PrimaryButton href="/acces" className="w-full text-center">
                {t('common.access')}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

