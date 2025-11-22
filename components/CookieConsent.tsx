'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import GlassCard from './GlassCard';

export default function CookieConsent() {
  const { t, language } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    // Initialize analytics here when ready
    // if (window.gtag) { window.gtag('consent', 'update', { analytics_storage: 'granted' }); }
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const translations = {
    fr: {
      title: 'Cookies et confidentialité',
      description: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre utilisation des cookies.',
      accept: 'Accepter',
      reject: 'Refuser',
      learnMore: 'En savoir plus',
    },
    en: {
      title: 'Cookies and Privacy',
      description: 'We use cookies to improve your experience on our site. By continuing to browse, you accept our use of cookies.',
      accept: 'Accept',
      reject: 'Reject',
      learnMore: 'Learn more',
    },
  };

  const t_cookies = translations[language as 'fr' | 'en'] || translations.fr;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-4 sm:p-6 border-purple-accent/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 id="cookie-consent-title" className="text-lg font-semibold text-text-primary mb-2">
                {t_cookies.title}
              </h3>
              <p id="cookie-consent-description" className="text-sm text-text-secondary leading-relaxed mb-3 sm:mb-0">
                {t_cookies.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-purple-primary hover:bg-purple-accent text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-accent focus:ring-offset-2 focus:ring-offset-black"
                aria-label={t_cookies.accept}
              >
                {t_cookies.accept}
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-2.5 bg-black/30 hover:bg-black/50 border border-purple-accent/30 hover:border-purple-accent/50 text-text-primary rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-accent focus:ring-offset-2 focus:ring-offset-black"
                aria-label={t_cookies.reject}
              >
                {t_cookies.reject}
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

