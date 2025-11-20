'use client';

import { faqData } from '@/lib/faq';
import FAQSection from '@/components/FAQSection';
import ScrollReveal from '@/components/ScrollReveal';
import BackgroundLights from '@/components/BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Large gradient orbs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(109, 40, 217, 0.3) 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.5)" stopOpacity="0" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.5)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="20%"
            x2="100%"
            y2="20%"
            stroke="url(#lineGradient)"
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
            stroke="url(#lineGradient)"
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
            stroke="url(#lineGradient)"
            strokeWidth="1"
            style={{
              animation: 'linePulse 4s ease-in-out infinite 1s',
            }}
          />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
        <div className="content-container max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center relative">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-purple-primary/20 border border-purple-accent/30 rounded-full text-sm text-purple-accent font-medium mb-6">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t('faq.badge')}
              </div>

              {/* Title with glow effect */}
              <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 relative">
                <span className="relative inline-block">
                  {t('faq.title')}
                  {/* Glow behind title */}
                  <span
                    className="absolute -inset-8 blur-3xl opacity-40 -z-10"
                    style={{
                      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(139, 92, 246, 0.4) 30%, rgba(109, 40, 217, 0.2) 60%, transparent 100%)',
                      filter: 'blur(60px)',
                    }}
                  />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-4">
                {t('faq.subtitle')}
              </p>

              {/* Decorative elements */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-accent/50 to-transparent" />
                <div className="w-2 h-2 rounded-full bg-purple-accent animate-pulse" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-accent/50 to-transparent" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-8 md:h-12 bg-gradient-to-b from-transparent via-black/50 to-black relative" style={{ zIndex: 1 }} />

      {/* FAQ Section */}
      <div className="relative" style={{ zIndex: 1 }}>
        <FAQSection
          items={faqData}
          showViewAllButton={false}
          title={null}
          subtitle={null}
        />
      </div>

      {/* Bottom decorative section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ zIndex: 1 }}>
        <BackgroundLights 
          variant="default" 
          uniqueId="faq-bottom"
          positions={{
            orb1: { top: '20%', left: '20%' },
            orb2: { bottom: '20%', right: '20%' },
            orb3: { top: '50%', left: '50%' },
          }}
          sizes={{ orb1: 450, orb2: 420, orb3: 400 }}
        />
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 2 }}>
          <ScrollReveal delay={200}>
            <div className="text-center">
              <div className="inline-block px-8 py-6 rounded-3xl bg-gradient-to-br from-purple-primary/10 via-bg-secondary/80 to-bg-secondary border border-purple-accent/20">
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {t('faq.cta.title')}
                </h3>
                <p className="text-text-secondary mb-6">
                  {t('faq.cta.subtitle')}
                </p>
                <a
                  href="/acces"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-primary/20 border border-purple-accent/30 text-purple-accent font-semibold hover:bg-purple-primary/30 hover:border-purple-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-accent/20"
                >
                  <span>{t('faq.cta.button')}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
