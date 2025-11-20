'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import WaspLogo from './WaspLogo';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('common.home') },
    { href: '/algorithmes', label: t('common.algorithms') },
    { href: '/actualite', label: t('common.news') },
    { href: '/faq', label: t('common.faq') },
    { href: '/contact', label: t('common.contact') },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24 relative">
            {/* Logo guêpe violet avec glow à gauche */}
            <div className="flex items-center justify-start flex-1">
              <Link
                href="/"
                className="flex items-center"
              >
                <div className="w-[160px] h-[160px] md:w-48 md:h-48 flex items-center justify-center -mt-2 md:-mt-3">
                  <WaspLogo className="w-[160px] h-[160px] md:w-48 md:h-48" />
                </div>
              </Link>
            </div>

            {/* Navigation centrée - alignée avec le contenu principal */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <nav className="hidden md:flex items-center h-full">
                <div className="flex items-center gap-6 px-4 py-2 bg-black/40 border border-white/10 rounded-full h-fit">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-sm font-medium relative transition-all duration-300 group ${
                          isActive
                            ? 'text-text-primary'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                        style={{
                          transform: 'translateZ(0)',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.transform = 'scale(1.1) translateZ(0)';
                            e.currentTarget.style.textShadow = '0 0 10px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.4)';
                            const underline = e.currentTarget.querySelector('.nav-underline');
                            if (underline) {
                              (underline as HTMLElement).style.width = '100%';
                            }
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                            e.currentTarget.style.textShadow = 'none';
                            const underline = e.currentTarget.querySelector('.nav-underline');
                            if (underline) {
                              (underline as HTMLElement).style.width = '0';
                            }
                          }
                        }}
                      >
                        {link.label}
                        <span 
                          className="nav-underline absolute bottom-0 left-0 h-0.5 bg-purple-accent transition-all duration-300"
                          style={{
                            width: isActive ? '100%' : '0',
                            boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
                          }}
                        />
                      </Link>
                    );
                  })}
                  {/* Séparateur pour le sélecteur de langue */}
                  <div className="h-4 w-px bg-white/20 mx-2" />
                  {/* Sélecteur de langue */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span 
                      className={language === 'fr' ? 'text-purple-accent font-semibold cursor-pointer hover:text-purple-300 transition-colors' : 'text-text-secondary hover:text-purple-accent transition-colors cursor-pointer'}
                      onClick={() => setLanguage('fr')}
                    >
                      FR
                    </span>
                    <span className="text-text-muted">|</span>
                    <span 
                      className={language === 'en' ? 'text-purple-accent font-semibold cursor-pointer hover:text-purple-300 transition-colors' : 'text-text-secondary hover:text-purple-accent transition-colors cursor-pointer'}
                      onClick={() => setLanguage('en')}
                    >
                      EN
                    </span>
                  </div>
                </div>
              </nav>
            </div>

            {/* Bouton CTA à droite */}
            <div className="hidden md:flex items-center justify-end flex-1 h-full">
              <Link
                href="/acces"
                className="px-4 py-2 rounded-2xl text-white text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-100 relative flex items-center whitespace-nowrap ml-16"
                style={{
                  background: 'linear-gradient(to bottom, rgba(168, 85, 247, 0.9), rgba(139, 92, 246, 1))',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 0 2px rgba(0, 0, 0, 0.9), 0 6px 16px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.3)';
                }}
              >
                {t('common.access')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-text-primary hover:text-purple-accent transition-colors"
              aria-label="Menu"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Ligne de séparation fine en dessous */}
        <div className="border-b border-white/10" />
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
