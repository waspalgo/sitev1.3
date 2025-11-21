'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-text-primary mb-4">{t('common.waspalgo')}</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span 
                className={language === 'fr' ? 'text-purple-accent font-semibold' : 'text-text-muted hover:text-purple-accent transition-colors cursor-pointer'}
                onClick={() => setLanguage('fr')}
              >
                FR
              </span>
              <span className="text-text-muted">|</span>
              <span 
                className={language === 'en' ? 'text-purple-accent font-semibold' : 'text-text-muted hover:text-purple-accent transition-colors cursor-pointer'}
                onClick={() => setLanguage('en')}
              >
                EN
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{t('common.navigation')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-text-muted hover:text-purple-accent transition-colors text-sm block"
                >
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/gold"
                  className="text-text-muted hover:text-purple-accent transition-colors text-sm block"
                >
                  {t('common.markets')}
                </Link>
              </li>
              <li>
                <Link
                  href="/algorithmes"
                  className="text-text-muted hover:text-purple-accent transition-colors text-sm block"
                >
                  {t('common.algorithms')}
                </Link>
              </li>
              <li className="pt-3 border-t border-white/10">
                <Link
                  href="/acces"
                  className="text-text-muted hover:text-purple-accent transition-colors text-sm block"
                >
                  {t('common.access')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{t('common.information')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal"
                  className="text-text-muted hover:text-purple-accent transition-colors text-sm block"
                >
                  {t('legal.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@waspalgo.com"
                  className="text-text-muted hover:text-purple-accent transition-colors text-sm block flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-purple-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t('footer.supportEmail')}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@waspalgo.com"
                  className="text-text-muted hover:text-purple-accent transition-colors text-sm block flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-purple-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t('footer.infoEmail')}
                </a>
              </li>
              <li className="pt-3 border-t border-white/10">
                <Link
                  href="/contact"
                  className="text-text-muted hover:text-purple-accent transition-colors text-sm block"
                >
                  {t('footer.contactPage')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Warning */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4 pb-4 border-b border-white/10">{t('common.warning')}</h4>
            <div className="p-4 bg-negative/10 rounded-xl border border-negative/30">
              <p className="text-xs text-text-secondary leading-relaxed">
                <strong className="text-negative">{t('footer.important')}</strong> {t('footer.riskWarning')}
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex items-center justify-center gap-6 mb-6">
            <a
              href="https://x.com/waspalgo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-purple-accent transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/waspalgo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-purple-accent transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61583628369579"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-purple-accent transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-text-muted text-sm">
            {t('common.copyright').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}

