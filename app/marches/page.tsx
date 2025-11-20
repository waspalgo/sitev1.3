'use client';

import { lazy, Suspense } from 'react';
import Link from 'next/link';
import MarketsSection from '@/components/MarketsSection';
import ScrollReveal from '@/components/ScrollReveal';
import BackgroundLights from '@/components/BackgroundLights';
import GlassCard from '@/components/GlassCard';
import PrimaryButton from '@/components/PrimaryButton';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load chart components
const XAUUSDChart = lazy(() => import('@/components/XAUUSDChart'));
const BTCUSDChart = lazy(() => import('@/components/BTCUSDChart'));

export default function MarchesPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-bg-primary relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <BackgroundLights 
          variant="intense" 
          uniqueId="markets-hero"
          positions={{
            orb1: { top: '25%', left: '30%' },
            orb2: { bottom: '25%', right: '25%' },
            orb3: { top: '50%', left: '55%' },
          }}
          sizes={{ orb1: 450, orb2: 420, orb3: 400 }}
        />
        <div className="content-container max-w-5xl mx-auto relative" style={{ zIndex: 1 }}>
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                {t('home.markets.pageBadge')}
              </div>

              {/* Title with glow */}
              <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 relative">
                <span className="relative inline-block">
                  {t('home.markets.pageTitle')}
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
              <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
                {t('home.markets.pageSubtitle')}
                <br />
                <span className="text-text-muted text-lg">{t('home.markets.pageNote')}</span>
              </p>

              {/* Decorative elements */}
              <div className="flex items-center justify-center gap-4 mt-12">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-accent/50 to-transparent" />
                <div className="w-2 h-2 rounded-full bg-purple-accent animate-pulse" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-accent/50 to-transparent" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Markets Snapshot Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <MarketsSection />
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* Market Information Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="subtle" 
          uniqueId="markets-info"
          positions={{
            orb1: { top: '25%', left: '20%' },
            orb2: { bottom: '30%', right: '25%' },
            orb3: { top: '55%', left: '60%' },
          }}
          sizes={{ orb1: 380, orb2: 360, orb3: 340 }}
        />
        <div className="content-container max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <ScrollReveal delay={100}>
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">{t('home.markets.xauusdTitle')}</h3>
                </div>
                <div className="flex-1 flex flex-col space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    <strong className="text-text-primary">{t('home.markets.xauusdMain').split('—')[0]}</strong> — {t('home.markets.xauusdMain').split('—')[1]?.trim() || t('home.markets.xauusdMain')}
                  </p>
                  <p>
                    {t('home.markets.xauusdDescription')}
                  </p>
                  <p className="mt-auto">
                    {t('home.markets.xauusdAnalysis')}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">{t('home.markets.btcusdTitle')}</h3>
                </div>
                <div className="flex-1 flex flex-col space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    <strong className="text-text-primary">{t('home.markets.btcusdMain').split('—')[0]}</strong> — {t('home.markets.btcusdMain').split('—')[1]?.trim() || t('home.markets.btcusdMain')}
                  </p>
                  <p>
                    {t('home.markets.btcusdDescription')}
                  </p>
                  <p className="mt-auto">
                    {t('home.markets.btcusdAnalysis')}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <GlassCard className="p-6 md:p-8 mt-8 border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2">{t('home.markets.importantNote')}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t('home.markets.noteContent')}
                  </p>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* CTA Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="default" 
          uniqueId="markets-cta"
          positions={{
            orb1: { top: '30%', left: '30%' },
            orb2: { bottom: '30%', right: '30%' },
            orb3: { top: '60%', left: '50%' },
          }}
          sizes={{ orb1: 380, orb2: 360, orb3: 340 }}
        />
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <GlassCard className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {t('home.markets.ctaTitle')}
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                {t('home.markets.ctaSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton href="/acces?algo=wa-amir-st">
                  {t('home.markets.ctaButton')}
                </PrimaryButton>
                <Link
                  href="/algorithmes"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base text-text-primary border border-purple-accent/30 hover:border-purple-accent/50 hover:bg-purple-primary/10 transition-all duration-300"
                >
                  {t('home.markets.ctaLearnMore')}
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
