'use client';

import Link from 'next/link';
import AlgorithmCard from '@/components/AlgorithmCard';
import ScrollReveal from '@/components/ScrollReveal';
import BackgroundLights from '@/components/BackgroundLights';
import AlgorithmComparison from '@/components/AlgorithmComparison';
import PerformanceTimeline from '@/components/PerformanceTimeline';
import StatsSection from '@/components/StatsSection';
import PrimaryButton from '@/components/PrimaryButton';
import GlassCard from '@/components/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AlgorithmesPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-bg-primary relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <BackgroundLights 
          variant="intense" 
          uniqueId="algorithms-hero"
          positions={{
            orb1: { top: '25%', left: '25%' },
            orb2: { bottom: '25%', right: '25%' },
            orb3: { top: '50%', right: '40%' },
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                {t('home.algorithms.page.badge')}
              </div>

              {/* Title with glow */}
              <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 relative">
                <span className="relative inline-block">
                  {t('home.algorithms.page.title')}
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
                {(() => {
                  const subtitle = t('home.algorithms.page.subtitle');
                  const parts = subtitle.split('{waamir}');
                  return (
                    <>
                      {parts[0]}
                      <span className="text-purple-accent font-semibold">WA-AMIR</span>
                      {parts[1]?.split('{shortTerm}').map((p, i) => (
                        <span key={i}>
                          {i > 0 && <span className="text-purple-accent font-semibold">{t('home.comparison.shortTerm')}</span>}
                          {p.split('{longTerm}').map((q, j) => (
                            <span key={j}>
                              {j > 0 && <span className="text-purple-accent font-semibold">{t('home.comparison.longTerm')}</span>}
                              {q}
                            </span>
                          ))}
                        </span>
                      ))}
                    </>
                  );
                })()}
                <br />
                {t('home.algorithms.page.subtitle2')}
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

      {/* Algorithm Cards */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="default" 
          uniqueId="algorithms-cards"
          positions={{
            orb1: { top: '25%', left: '20%' },
            orb2: { bottom: '30%', right: '25%' },
            orb3: { top: '60%', left: '65%' },
          }}
          sizes={{ orb1: 400, orb2: 380, orb3: 360 }}
        />
        <div className="content-container max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal delay={100}>
              <AlgorithmCard
                title="WA-AMIR ST V1"
                subtitle="Autonomous Market Intelligence Reactor – Short Term"
                description={t('home.algorithmCard.descriptionST')}
                badge={t('home.algorithmCard.available')}
                badgeColor="available"
                status="active"
                bullets={[
                  `${t('home.comparison.horizon')} : ${t('home.algorithmCard.horizonShort')}`,
                  `${t('home.comparison.frequency')} : ${t('home.algorithmCard.frequencyHigh')}`,
                  `${t('home.algorithmCard.style')} : ${t('home.algorithmCard.styleReactive')}`,
                  `${t('home.algorithmCard.execution')} : ${t('home.algorithmCard.executionAutomated')}`,
                ]}
                learnMoreHref="/algorithmes/wa-amir-st"
                accessHref="/acces?algo=wa-amir-st"
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <AlgorithmCard
                title="WA-AMIR LT V1"
                subtitle="Autonomous Market Intelligence Reactor – Long Term"
                description={t('home.algorithmCard.descriptionLT')}
                badge={t('home.algorithmCard.comingSoon')}
                badgeColor="coming-soon"
                bullets={[
                  `${t('home.comparison.horizon')} : ${t('home.algorithmCard.horizonLong')}`,
                  `${t('home.comparison.frequency')} : ${t('home.algorithmCard.riskLow')}`,
                  `${t('home.algorithmCard.style')} : ${t('home.algorithmCard.styleMacro')}`,
                  `${t('home.algorithmCard.status')} : ${t('home.algorithmCard.statusOptimization')}`,
                ]}
                learnMoreHref="/algorithmes/wa-amir-lt"
                accessDisabled
                accessLabel={t('home.algorithmCard.accessSoon')}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* Stats Section */}
      <StatsSection />

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Algorithm Comparison */}
      <AlgorithmComparison />

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* Performance Timeline */}
      <PerformanceTimeline />

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* CTA Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-32">
        <BackgroundLights 
          variant="subtle" 
          uniqueId="algorithms-cta"
          positions={{
            orb1: { top: '30%', right: '30%' },
            orb2: { bottom: '25%', left: '30%' },
            orb3: { top: '60%', right: '20%' },
          }}
          sizes={{ orb1: 350, orb2: 330, orb3: 310 }}
        />
        <div className="content-container max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <GlassCard className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {t('home.algorithms.page.cta.title')}
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                {t('home.algorithms.page.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton href="/acces?algo=wa-amir-st">
                  {t('home.algorithms.page.cta.button')}
                </PrimaryButton>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base text-text-primary border border-purple-accent/30 hover:border-purple-accent/50 hover:bg-purple-primary/10 transition-all duration-300"
                >
                  {t('home.algorithms.page.cta.backButton')}
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
