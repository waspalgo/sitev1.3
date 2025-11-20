'use client';

import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import RiskDisclaimer from '@/components/RiskDisclaimer';
import ScrollReveal from '@/components/ScrollReveal';
import BackgroundLights from '@/components/BackgroundLights';
import PrimaryButton from '@/components/PrimaryButton';
import { useLanguage } from '@/contexts/LanguageContext';
import frTranslations from '@/translations/fr.json';
import enTranslations from '@/translations/en.json';

export default function LegalPage() {
  const { t, language } = useLanguage();
  return (
    <div className="min-h-screen bg-bg-primary relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <BackgroundLights 
          variant="intense" 
          uniqueId="legal-hero"
          positions={{
            orb1: { top: '25%', right: '25%' },
            orb2: { bottom: '25%', left: '25%' },
            orb3: { top: '55%', right: '45%' },
          }}
          sizes={{ orb1: 450, orb2: 420, orb3: 400 }}
        />
        <div className="content-container max-w-5xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <div className="text-center relative">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-negative/20 border border-negative/30 rounded-full text-sm text-negative font-medium mb-6">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {t('legal.badge')}
              </div>

              {/* Title with glow */}
              <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 relative">
                <span className="relative inline-block">
                  {t('legal.title')}
                  <span
                    className="absolute -inset-8 blur-3xl opacity-30 -z-10"
                    style={{
                      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(139, 92, 246, 0.3) 40%, transparent 70%)',
                      filter: 'blur(60px)',
                    }}
                  />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                {t('legal.subtitle')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Risk Warnings Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="default" 
          uniqueId="legal-risks"
          positions={{
            orb1: { top: '25%', left: '20%' },
            orb2: { bottom: '25%', right: '20%' },
            orb3: { top: '60%', left: '65%' },
          }}
          sizes={{ orb1: 400, orb2: 380, orb3: 360 }}
        />
        <div className="content-container max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {t('legal.riskWarnings.title')}
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                {t('legal.riskWarnings.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 items-stretch">
            <ScrollReveal delay={100}>
              <GlassCard className="p-8 h-full flex flex-col border-negative/20 hover:border-negative/40 transition-all duration-300">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-negative/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-negative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-text-primary mb-3">{t('legal.riskWarnings.capitalLoss.title')}</h3>
                    <p className="text-text-secondary leading-relaxed flex-1">
                      {t('legal.riskWarnings.capitalLoss.description')}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlassCard className="p-8 h-full flex flex-col border-negative/20 hover:border-negative/40 transition-all duration-300">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-negative/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-negative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-text-primary mb-3">{t('legal.riskWarnings.noPerformanceGuarantee.title')}</h3>
                    <p className="text-text-secondary leading-relaxed flex-1">
                      {t('legal.riskWarnings.noPerformanceGuarantee.description')}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <GlassCard className="p-8 h-full flex flex-col border-negative/20 hover:border-negative/40 transition-all duration-300">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-negative/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-negative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-text-primary mb-3">{t('legal.riskWarnings.noInvestmentAdvice.title')}</h3>
                    <p className="text-text-secondary leading-relaxed flex-1">
                      {t('legal.riskWarnings.noInvestmentAdvice.description')}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <GlassCard className="p-8 h-full flex flex-col border-negative/20 hover:border-negative/40 transition-all duration-300">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-negative/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-negative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-text-primary mb-3">{t('legal.riskWarnings.marketVolatility.title')}</h3>
                    <p className="text-text-secondary leading-relaxed flex-1">
                      {t('legal.riskWarnings.marketVolatility.description')}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Risk Disclaimer Component */}
          <ScrollReveal delay={500}>
            <div className="mb-12">
              <RiskDisclaimer />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* Nature of Service & Responsibilities */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="subtle" 
          uniqueId="legal-service"
          positions={{
            orb1: { top: '25%', right: '30%' },
            orb2: { bottom: '30%', left: '25%' },
            orb3: { top: '60%', right: '20%' },
          }}
          sizes={{ orb1: 380, orb2: 360, orb3: 340 }}
        />
        <div className="content-container max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
            <ScrollReveal delay={100}>
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-purple-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-text-primary">{t('legal.service.nature.title')}</h2>
                </div>
                <div className="flex-1 flex flex-col space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    <strong className="text-text-primary">WASPALGO</strong> {t('legal.service.nature.p1').replace('WASPALGO', '').trim()}
                  </p>
                  <p>
                    <strong className="text-text-primary">WA-AMIR</strong> {t('legal.service.nature.p2').replace('WA-AMIR (WASP Autonomous Market Intelligence Reactor)', '').trim()}
                  </p>
                  <p className="mt-auto">
                    {t('legal.service.nature.p3')}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-purple-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-text-primary">{t('legal.service.responsibilities.title')}</h2>
                </div>
                <ul className="flex-1 flex flex-col space-y-4 text-text-secondary">
                  {(() => {
                    // Access translations directly for arrays
                    const translations = language === 'fr' ? frTranslations : enTranslations;
                    const items = (translations as any).legal?.service?.responsibilities?.items || [];
                    return items.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-accent mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Data & Legal Info */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="default" 
          uniqueId="legal-data"
          positions={{
            orb1: { top: '25%', left: '25%' },
            orb2: { bottom: '25%', right: '25%' },
            orb3: { top: '60%', left: '60%' },
          }}
          sizes={{ orb1: 400, orb2: 380, orb3: 360 }}
        />
        <div className="content-container max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
            <ScrollReveal delay={100}>
              <GlassCard className="p-8 h-full flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {t('legal.data.title')}
                </h2>
                <div className="flex-1 flex flex-col space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    {t('legal.data.p1')}
                  </p>
                  <p className="mt-auto">
                    {t('legal.data.p2')}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlassCard className="p-8 h-full flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('legal.legalInfo.title')}
                </h2>
                <div className="flex-1 flex flex-col space-y-4 text-text-secondary">
                  <div>
                    <strong className="text-text-primary block mb-2">{t('legal.legalInfo.publisher')}</strong>
                    <p className="text-text-muted text-sm whitespace-pre-line">{`${t('legal.legalInfo.publisherName')}\n${t('legal.legalInfo.publisherDetails')}`}</p>
                  </div>
                  <div>
                    <strong className="text-text-primary block mb-2">{t('legal.legalInfo.hosting')}</strong>
                    <p className="text-text-muted text-sm whitespace-pre-line">{t('legal.legalInfo.hostingDetails')}</p>
                  </div>
                  <div className="mt-auto">
                    <strong className="text-text-primary block mb-2">{t('legal.legalInfo.contact')}</strong>
                    <p className="text-text-muted text-sm">{t('legal.legalInfo.email')}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* Privacy Policy */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="subtle" 
          uniqueId="legal-privacy"
          positions={{
            orb1: { top: '30%', right: '25%' },
            orb2: { bottom: '30%', left: '30%' },
            orb3: { top: '55%', right: '50%' },
          }}
          sizes={{ orb1: 360, orb2: 340, orb3: 320 }}
        />
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <GlassCard className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary">{t('legal.privacy.title')}</h2>
              </div>
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <p>
                  {t('legal.privacy.p1')}
                </p>
                <div>
                  <strong className="text-text-primary block mb-2">{t('legal.privacy.dataCollected.title')}</strong>
                  <p>{t('legal.privacy.dataCollected.description')}</p>
                </div>
                <div>
                  <strong className="text-text-primary block mb-2">{t('legal.privacy.usage.title')}</strong>
                  <p>{t('legal.privacy.usage.description')}</p>
                </div>
                <div>
                  <strong className="text-text-primary block mb-2">{t('legal.privacy.rights.title')}</strong>
                  <p>{t('legal.privacy.rights.description')}</p>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* CTA Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="default" 
          uniqueId="legal-cta"
          positions={{
            orb1: { top: '30%', left: '25%' },
            orb2: { bottom: '30%', right: '30%' },
            orb3: { top: '60%', left: '55%' },
          }}
          sizes={{ orb1: 380, orb2: 360, orb3: 340 }}
        />
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <GlassCard className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {t('legal.cta.title')}
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                {t('legal.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton href="/faq">
                  {t('legal.cta.faqButton')}
                </PrimaryButton>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base text-text-primary border border-purple-accent/30 hover:border-purple-accent/50 hover:bg-purple-primary/10 transition-all duration-300"
                >
                  {t('legal.cta.backButton')}
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
