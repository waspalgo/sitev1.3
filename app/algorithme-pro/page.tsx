'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import BackgroundLights from '@/components/BackgroundLights';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

export default function AlgorithmeProPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <BackgroundLights
          variant="default"
          uniqueId="algorithme-pro-hero"
          positions={{
            orb1: { top: '10%', left: '10%' },
            orb2: { bottom: '20%', right: '15%' },
            orb3: { top: '50%', left: '70%' },
          }}
          sizes={{ orb1: 400, orb2: 380, orb3: 360 }}
        />
        <div className="max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-purple-primary/20 text-purple-accent border border-purple-accent/30 rounded-full text-sm font-semibold mb-6">
                {t('algorithmePro.hero.versionPro')}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-4">
                {t('algorithmePro.hero.title')}
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-purple-accent mb-6">
                {t('algorithmePro.hero.subtitle')}
              </h2>
              <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                {t('algorithmePro.hero.description')}
              </p>
              
              {/* Restricted Access Notice */}
              <GlassCard className="p-4 sm:p-6 mb-8 max-w-2xl mx-auto border-2 border-purple-accent/40 bg-purple-primary/10">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="flex items-center gap-3 justify-center">
                    <svg className="w-6 h-6 text-purple-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-text-primary font-semibold">{t('algorithmePro.hero.restrictedAccess.title')}</p>
                  </div>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{t('algorithmePro.hero.restrictedAccess.description')}</p>
                </div>
              </GlassCard>

              <Link
                href="/acces-pro"
                className="inline-flex items-center justify-center px-8 py-4 text-lg bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:from-slate-500 hover:via-slate-400 hover:to-slate-300"
              >
                {t('algorithmePro.hero.cta')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-1 md:-mt-32">
        <BackgroundLights
          variant="default"
          uniqueId="algorithme-pro-how"
          positions={{
            orb1: { top: '15%', right: '20%' },
            orb2: { bottom: '25%', left: '15%' },
            orb3: { top: '60%', right: '10%' },
          }}
          sizes={{ orb1: 350, orb2: 330, orb3: 310 }}
        />
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-8 text-center">
              {t('algorithmePro.howItWorks.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="p-6 sm:p-8 mb-8">
              <p className="text-text-secondary mb-4">{t('algorithmePro.howItWorks.p1')}</p>
              <p className="text-text-secondary mb-4">{t('algorithmePro.howItWorks.p2')}</p>
              <ul className="space-y-3 mb-4 list-disc list-inside text-text-secondary ml-4">
                <li>{t('algorithmePro.howItWorks.list1')}</li>
                <li>{t('algorithmePro.howItWorks.list2')}</li>
                <li>{t('algorithmePro.howItWorks.list3')}</li>
              </ul>
              <p className="text-text-secondary">{t('algorithmePro.howItWorks.p3')}</p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Differences Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="content-container max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 text-center">
              {t('algorithmePro.differences.title')}
            </h2>
            <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
              {t('algorithmePro.differences.subtitle')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal delay={100}>
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-bold text-purple-accent mb-3">
                  {t('algorithmePro.howItWorks.supervision.title')}
                </h3>
                <p className="text-text-secondary text-sm">
                  {t('algorithmePro.howItWorks.supervision.description')}
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-bold text-purple-accent mb-3">
                  {t('algorithmePro.howItWorks.targetedHours.title')}
                </h3>
                <p className="text-text-secondary text-sm">
                  {t('algorithmePro.howItWorks.targetedHours.description')}
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-bold text-purple-accent mb-3">
                  {t('algorithmePro.howItWorks.reactivity.title')}
                </h3>
                <p className="text-text-secondary text-sm">
                  {t('algorithmePro.howItWorks.reactivity.description')}
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-bold text-purple-accent mb-3">
                  {t('algorithmePro.howItWorks.sameDna.title')}
                </h3>
                <p className="text-text-secondary text-sm">
                  {t('algorithmePro.howItWorks.sameDna.description')}
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-bold text-purple-accent mb-3">
                  {t('algorithmePro.howItWorks.riskManagement.title')}
                </h3>
                <p className="text-text-secondary text-sm">
                  {t('algorithmePro.howItWorks.riskManagement.description')}
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Follow-up Organization Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-8 text-center">
              {t('algorithmePro.followUp.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="p-6 sm:p-8">
              <p className="text-text-secondary mb-4">{t('algorithmePro.followUp.p1')}</p>
              <p className="text-text-secondary mb-4">{t('algorithmePro.followUp.p2')}</p>
              <ul className="space-y-3 text-text-secondary ml-4">
                <li className="flex items-start">
                  <span className="text-purple-accent mr-3">•</span>
                  <span>{t('algorithmePro.followUp.preMarket')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-accent mr-3">•</span>
                  <span>{t('algorithmePro.followUp.monitoring')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-accent mr-3">•</span>
                  <span>{t('algorithmePro.followUp.postSession')}</span>
                </li>
              </ul>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Investor Profile Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 text-center">
              {t('algorithmePro.investorProfile.title')}
            </h2>
            <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
              {t('algorithmePro.investorProfile.subtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard className="p-6 sm:p-8">
              <ul className="space-y-4 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-purple-accent mr-3 text-xl">•</span>
                  <span className="text-lg">{t('algorithmePro.investorProfile.item1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-accent mr-3 text-xl">•</span>
                  <span className="text-lg">{t('algorithmePro.investorProfile.item2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-accent mr-3 text-xl">•</span>
                  <span className="text-lg">{t('algorithmePro.investorProfile.item3')}</span>
                </li>
              </ul>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Risk Warning Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <GlassCard className="p-6 sm:p-8 border-2 border-negative/30">
              <h3 className="text-2xl font-bold text-negative mb-4">
                {t('algorithmePro.riskWarning.title')}
              </h3>
              <p className="text-text-secondary">{t('algorithmePro.riskWarning.content')}</p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}

