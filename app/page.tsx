'use client';

import { useState, lazy, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroBackground from '@/components/HeroBackground';
import CTABackground from '@/components/CTABackground';
import GlassCard from '@/components/GlassCard';
import Sparkline from '@/components/Sparkline';
import MetricCard from '@/components/MetricCard';
import MarketsSection from '@/components/MarketsSection';
import AlgorithmCard from '@/components/AlgorithmCard';
import ScrollReveal from '@/components/ScrollReveal';
import AboutSection from '@/components/AboutSection';
import FAQ from '@/components/FAQ';
import OnboardingSteps from '@/components/OnboardingSteps';
import PrimaryButton from '@/components/PrimaryButton';
import FeatureRow from '@/components/FeatureRow';
import HeroButton from '@/components/HeroButton';
import StatusBadge from '@/components/StatusBadge';
import BackgroundLights from '@/components/BackgroundLights';

// Lazy load heavy components
const BarChart = lazy(() => import('@/components/BarChart'));
const SimulationChart = lazy(() => import('@/components/SimulationChart'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const AlgorithmComparison = lazy(() => import('@/components/AlgorithmComparison'));
const PerformanceTimeline = lazy(() => import('@/components/PerformanceTimeline'));
const LatestArticles = lazy(() => import('@/components/LatestArticles'));

export default function Home() {
  const { t, language } = useLanguage();
  const [showRisk, setShowRisk] = useState(false);
  
  // Mémoriser les données pour éviter les recalculs à chaque render
  const sparklineData = useMemo(() => Array.from({ length: 20 }, () => Math.random() * 100 + 50), []);
  const dashboardSparklineData = useMemo(() => Array.from({ length: 30 }, () => Math.random() * 100 + 50), []);
  
  // Données de performance mensuelles
  const monthlyReturns = [
    { month: '04/25', value: 16.17 },
    { month: '05/25', value: 22.56 },
    { month: '06/25', value: 29.17 },
    { month: '07/25', value: 15.28 },
    { month: '08/25', value: 21.34 },
    { month: '09/25', value: 18.92 },
    { month: '10/25', value: 27.45 },
    { month: '11/25', value: 33.39 },
  ];
  
  // Données de bande de risque mensuelle (basées sur les rendements pour être crédibles)
  // Logique : rendements élevés peuvent avoir des risques modérés à élevés, mais pas toujours corrélés
  const monthlyRisk = [
    { month: '04/25', value: 3.2 }, // Rendement 16.17% -> risque modéré
    { month: '05/25', value: 4.5 }, // Rendement 22.56% -> risque modéré-élevé
    { month: '06/25', value: 5.8 }, // Rendement 29.17% -> risque élevé
    { month: '07/25', value: 2.1 }, // Rendement 15.28% (bas) -> risque faible
    { month: '08/25', value: 4.2 }, // Rendement 21.34% -> risque modéré-élevé
    { month: '09/25', value: 3.6 }, // Rendement 18.92% -> risque modéré
    { month: '10/25', value: 6.0 }, // Rendement 27.45% (élevé) -> risque maximum
    { month: '11/25', value: 2.0 }, // Rendement 33.39% -> risque faible
  ];
  
  // Calcul du YTD à partir des données mensuelles (somme simple des rendements)
  const calculateYTD = (returns: { value: number }[]) => {
    return returns.reduce((acc, r) => acc + r.value, 0);
  };
  
  const ytdReturn = calculateYTD(monthlyReturns); // YTD avec tous les mois (8 mois)
  const ytdReturnAtOpening = calculateYTD(monthlyReturns.slice(0, 7)); // YTD au 1er novembre (7 mois)
  const maxMonthlyReturn = 33.39;
  const currentRisk = 2.0; // Risque actuel (11/25)
  const maxRisk = Math.max(...monthlyRisk.map(d => d.value));

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('home.features.marketAnalysis.title'),
      description: t('home.features.marketAnalysis.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t('home.features.automatedExecution.title'),
      description: t('home.features.automatedExecution.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('home.features.secureConnection.title'),
      description: t('home.features.secureConnection.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: t('home.features.humanSupport.title'),
      description: t('home.features.humanSupport.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('home.features.rigorousBacktesting.title'),
      description: t('home.features.rigorousBacktesting.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('home.features.riskManagement.title'),
      description: t('home.features.riskManagement.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('home.features.continuousPerformance.title'),
      description: t('home.features.continuousPerformance.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: t('home.features.totalControl.title'),
      description: t('home.features.totalControl.description'),
    },
  ];

  const [initialInvestment, setInitialInvestment] = useState(2500);

  return (
    <div className="relative" style={{ background: '#000000' }}>
      {/* Hero Section - Style référence */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: 'transparent', position: 'relative' }}>
        <HeroBackground />
        
        {/* Badge "Latest integration" - Style référence, au-dessus du titre */}
        <div className="max-w-5xl mx-auto w-full text-center z-10 relative mb-6">
          <ScrollReveal>
            <div className="inline-flex items-center rounded-full border border-gray-400/30 bg-black px-4 py-2 mb-8">
              <span className="px-3 py-1 bg-purple-primary rounded-full text-white text-xs font-bold mr-3">
                NEW
              </span>
              <span className="text-purple-300 text-sm">
                {t('home.hero.badge')}
              </span>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Contenu principal - Centré */}
        <div className="max-w-5xl mx-auto w-full text-center z-10 relative">
          <ScrollReveal>
            {/* Titre principal - Style référence */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-text-primary">{t('home.hero.title1')}</span>
              <br />
              <span className="text-text-primary">{t('home.hero.title2')}</span>
              <br />
              <span className="text-purple-accent">{t('home.hero.title3')}</span>
            </h1>
            
            {/* Sous-titre - Centré avec max-width */}
            <p className="text-base md:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
              {t('home.hero.subtitle')}
            </p>
            
            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4">
              <HeroButton href="/acces">
                {t('home.hero.cta')}
              </HeroButton>
              <button
                type="button"
                onClick={() => {
                  const aboutSection = document.getElementById('about-waspalgo');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border-2 border-purple-accent/40 hover:border-purple-accent/60 text-purple-accent hover:bg-purple-accent/10 text-base font-semibold transition-transform duration-200 hover:scale-105 active:scale-100 whitespace-nowrap"
                style={{
                  boxShadow: '0 0 0 1px rgba(168, 85, 247, 0.2), 0 4px 12px rgba(168, 85, 247, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168, 85, 247, 0.4), 0 6px 16px rgba(168, 85, 247, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(168, 85, 247, 0.2), 0 4px 12px rgba(168, 85, 247, 0.1)';
                }}
              >
                {t('home.hero.learnMore')}
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Dashboard Card - En bas, centré, large, avec glow violet */}
        <ScrollReveal delay={200}>
          <div className="w-full max-w-6xl mx-auto z-10 relative mt-12 md:mt-16 -mb-10 md:-mb-16" style={{ contain: 'layout style' }}>
            <GlassCard glow variant="dashboard" className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
              {!showRisk ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 -mb-2 md:mb-8">
                    <div className="text-center">
                      <p className="text-text-muted text-lg sm:text-sm mb-4 sm:mb-2">{t('home.dashboard.ytdReturn')}</p>
                      <p className="text-5xl sm:text-5xl md:text-4xl font-bold text-positive">+{ytdReturn.toFixed(2)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-muted text-lg sm:text-sm mb-4 sm:mb-2">{t('home.dashboard.maxMonthlyReturn')}</p>
                      <p className="text-5xl sm:text-5xl md:text-4xl font-bold text-positive">+{maxMonthlyReturn.toFixed(2)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-muted text-lg sm:text-sm mb-4 sm:mb-2">{t('home.dashboard.currentMonthlyReturn')}</p>
                      <p className="text-5xl sm:text-5xl md:text-4xl font-bold text-positive">+33.39%</p>
                    </div>
                  </div>
                  <div className="h-[500px] sm:h-64 md:h-52 w-full overflow-hidden rounded-xl bg-black/20 p-1 sm:p-4 -mt-2 md:mt-0 md:mb-4">
                    <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="animate-pulse text-text-muted">{t('common.loading')}</div></div>}>
                      <BarChart data={monthlyReturns} width={800} height={200} maxValue={40} />
                    </Suspense>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 -mb-2 md:mb-8">
                    <div className="text-center">
                      <p className="text-text-muted text-lg sm:text-sm mb-4 sm:mb-2">{t('home.dashboard.averageRiskYTD')}</p>
                      <p className="text-5xl sm:text-5xl md:text-4xl font-bold text-text-primary">{((monthlyRisk.reduce((sum, r) => sum + r.value, 0) / monthlyRisk.length)).toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-muted text-lg sm:text-sm mb-4 sm:mb-2">{t('home.dashboard.maxMonthlyRisk')}</p>
                      <p className="text-5xl sm:text-5xl md:text-4xl font-bold text-text-primary">{maxRisk.toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-muted text-lg sm:text-sm mb-4 sm:mb-2">{t('home.dashboard.currentMonthlyRisk')}</p>
                      <p className="text-5xl sm:text-5xl md:text-4xl font-bold text-text-primary">{currentRisk.toFixed(1)}</p>
                    </div>
                  </div>
                  <div className="h-[500px] sm:h-64 md:h-52 w-full overflow-hidden rounded-xl bg-black/20 p-1 sm:p-4 -mt-2 md:mt-0 md:mb-4">
                    <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="animate-pulse text-text-muted">{t('common.loading')}</div></div>}>
                      <BarChart data={monthlyRisk} width={800} height={200} maxValue={10} />
                    </Suspense>
                  </div>
                </>
              )}
              <div className="-mt-2 md:mt-6 pt-1 sm:pt-2 md:pt-4 lg:pt-6 border-t border-purple-accent/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-text-primary leading-tight">
                    {t('home.dashboard.title')}
                  </h3>
                  <StatusBadge status="active" size="md" />
                </div>
                <button
                  onClick={() => setShowRisk(!showRisk)}
                  className="flex items-center gap-2 px-5 py-2.5 sm:px-4 sm:py-2 rounded-lg bg-purple-primary/20 border border-purple-accent/30 hover:border-purple-accent/50 hover:bg-purple-primary/30 transition-colors duration-200 hover:scale-105"
                >
                  <span className="text-base sm:text-sm text-purple-accent font-medium">
                    {showRisk ? t('home.dashboard.showReturns') : t('home.dashboard.showRisk')}
                  </span>
                  <svg
                    className={`w-5 h-5 sm:w-4 sm:h-4 text-purple-accent transition-transform duration-200 ${showRisk ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </section>

      {/* Dégradé de transition */}
      <div className="h-20 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Features Grid Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
        <BackgroundLights 
          variant="default" 
          uniqueId="features-grid"
          positions={{
            orb1: { top: '32%', right: '18%' },
            orb3: { top: '55%', right: '40%' },
          }}
          sizes={{ orb1: 330, orb3: 300 }}
        />
        <div className="content-container relative" style={{ zIndex: 1 }}>
          <ScrollReveal delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: t('home.features.realTimeAnalysis.title'),
                  description: t('home.features.realTimeAnalysis.description'),
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: t('home.features.fastExecution.title'),
                  description: t('home.features.fastExecution.description'),
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: t('home.features.enhancedSecurity.title'),
                  description: t('home.features.enhancedSecurity.description'),
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: t('home.features.riskManagement.title'),
                  description: t('home.features.riskManagement.description'),
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  title: t('home.features.continuousOptimization.title'),
                  description: t('home.features.continuousOptimization.description'),
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: t('home.features.userControl.title'),
                  description: t('home.features.userControl.description'),
                },
              ].map((feature, index) => (
                <ScrollReveal key={index} delay={100 + index * 50}>
                  <GlassCard className="p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-primary/20 border border-purple-accent/30 flex items-center justify-center text-purple-accent">
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-20 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* Market Snapshot */}
      <section className="relative">
        <MarketsSection />
        <div className="content-container mt-4 flex justify-center">
          <Link
            href="/gold"
            className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-purple-primary/80 hover:bg-purple-primary transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 shadow-glow-md"
          >
            {t('home.markets.viewMore')}
          </Link>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-20 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Dashboard + Features Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
        <BackgroundLights 
          variant="default" 
          uniqueId="dashboard"
          positions={{
            orb1: { top: '32%', right: '18%' },
            orb2: { bottom: '34%', left: '20%' },
            orb3: { top: '58%', right: '38%' },
          }}
          sizes={{ orb1: 360, orb2: 340, orb3: 320 }}
        />
        <div className="content-container relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-2 bg-purple-primary/20 border border-purple-accent/30 rounded-full text-sm text-purple-accent font-medium mb-4">
                {t('home.simulation.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6">
                {t('home.simulation.title')}
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-4">
                {t('home.simulation.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* Simulation Card */}
          <ScrollReveal delay={200}>
            <div className="max-w-6xl mx-auto mb-10">
              <GlassCard variant="dashboard" glow className="p-8 md:p-10">
                {/* Simulation data */}
                {(() => {
                  const initialAmount = initialInvestment;
                  const simulationData = monthlyReturns.map((ret, index) => ({
                    month: ret.month,
                    value: ret.value,
                    date: ret.month,
                  }));

                  const extendedData = simulationData;

                  // Calculer la valeur finale (seulement avec les données réelles)
                  const finalValue = simulationData.reduce((acc, point) => {
                    return acc * (1 + point.value / 100);
                  }, initialAmount);

                  const totalReturn = ((finalValue - initialAmount) / initialAmount) * 100;

                  return (
                    <>
                      {/* Slider d'investissement */}
                      <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                          <div className="text-left">
                            <p className="text-sm text-text-secondary mb-1">
                              {t('home.simulation.simulatedCapital')}
                            </p>
                            <p className="text-2xl md:text-3xl font-bold text-text-primary">
                              {initialAmount.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p className="text-xs text-text-muted mt-1">
                              {t('home.simulation.simulationDescription')}
                            </p>
                          </div>
                          <div className="w-full md:w-1/2">
                            <input
                              type="range"
                              min={500}
                              max={25000}
                              step={500}
                              value={initialAmount}
                              onChange={(e) => setInitialInvestment(Number(e.target.value))}
                              className="w-full accent-purple-accent"
                            />
                            <div className="flex justify-between text-xs text-text-muted mt-1">
                              <span>500 $</span>
                              <span>25 000 $</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12">
                        <div>
                          <p className="text-text-muted text-sm mb-2">{t('home.simulation.investedAmount')}</p>
                          <p className="text-3xl md:text-4xl font-bold text-text-primary">
                            {initialAmount.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-text-secondary text-sm mt-1">{t('home.simulation.depositedOn').replace('{date}', '04/25')}</p>
                        </div>
                        <div>
                          <p className="text-text-muted text-sm mb-2">{t('home.simulation.currentValue')}</p>
                          <p className="text-3xl md:text-4xl font-bold text-positive">
                            {finalValue.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-text-secondary text-sm mt-1">{t('home.simulation.asOf').replace('{date}', '11/25')}</p>
                        </div>
                        <div>
                          <p className="text-text-muted text-sm mb-2">{t('home.simulation.totalReturn')}</p>
                          <p className="text-3xl md:text-4xl font-bold text-purple-accent">
                            +{totalReturn.toFixed(2)}%
                          </p>
                          <p className="text-text-secondary text-sm mt-1">{t('home.simulation.overMonths').replace('{count}', '8')}</p>
                        </div>
                      </div>
                      <div className="h-64 md:h-80 w-full overflow-x-auto overflow-y-hidden rounded-xl bg-black/20 p-2 sm:p-4 md:p-6 mb-8 md:mb-10">
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="animate-pulse text-text-muted">{t('common.loading')}</div></div>}>
                          <div className="min-w-full">
                            <SimulationChart 
                              data={extendedData} 
                              initialAmount={initialAmount}
                              width={800}
                              height={280}
                            />
                          </div>
                        </Suspense>
                      </div>
                      <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-purple-accent/20">
                        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 md:mb-4">
                          {t('home.simulation.simulationTitle')}
                        </h3>
                        <p className="text-text-muted text-sm">
                          {t('home.simulation.disclaimer')}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </GlassCard>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Algorithms Teaser */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
        <BackgroundLights 
          variant="subtle" 
          uniqueId="algorithms"
          positions={{
            orb1: { bottom: '36%', left: '28%' },
            orb2: { top: '30%', right: '22%' },
            orb3: { top: '60%', left: '18%' },
          }}
          sizes={{ orb1: 320, orb2: 300, orb3: 280 }}
        />
        <div className="content-container relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 md:mb-6">
                {t('home.algorithms.title')}
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                {t('home.algorithms.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 items-stretch">
            <ScrollReveal delay={100}>
              <AlgorithmCard
                title="WA-AMIR ST V1"
                subtitle={t('home.algorithmCard.subtitleST')}
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
                subtitle={t('home.algorithmCard.subtitleLT')}
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
          <ScrollReveal delay={150}>
            <div className="text-center mt-12">
              <Link
                href="/algorithmes"
                className="inline-block px-8 py-3 border-2 border-purple-accent/30 hover:border-purple-accent rounded-2xl text-purple-accent hover:bg-purple-accent/10 font-semibold transition-transform duration-200 hover:scale-105"
              >
                {t('home.algorithms.seeAll')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* Algorithm Comparison */}
      <Suspense fallback={<div className="section-padding"><div className="animate-pulse text-center text-text-muted">{t('common.loading')}</div></div>}>
        <AlgorithmComparison />
      </Suspense>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Performance Timeline */}
      <Suspense fallback={<div className="section-padding"><div className="animate-pulse text-center text-text-muted">{t('common.loading')}</div></div>}>
        <PerformanceTimeline />
      </Suspense>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* About Section */}
      <AboutSection />

      {/* Onboarding Steps */}
      <OnboardingSteps />

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* Testimonials */}
      <Suspense fallback={<div className="section-padding"><div className="animate-pulse text-center text-text-muted">{t('common.loading')}</div></div>}>
        <Testimonials />
      </Suspense>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ zIndex: 1 }} />

      {/* Latest Articles */}
      <Suspense fallback={<div className="section-padding"><div className="animate-pulse text-center text-text-muted">{t('common.loading')}</div></div>}>
        <LatestArticles />
      </Suspense>

      {/* Dégradé de transition */}
      <div className="h-32 bg-gradient-to-b from-transparent via-black/50 to-black" style={{ zIndex: 1 }} />

      {/* FAQ Section */}
      <FAQ />

      {/* Dégradé de transition - plus long et plus doux */}
      <div 
        className="h-48 md:h-64 relative"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 0) 100%)',
          zIndex: 1 
        }} 
      />

      {/* Final CTA */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden -mt-48 md:-mt-64">
        <CTABackground />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <GlassCard glow variant="feature" className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                {t('home.cta.title')}
              </h2>
              <p className="text-lg text-text-secondary mb-10">
                {t('home.cta.subtitle')}
              </p>
              <PrimaryButton href="/acces">
                {t('home.cta.button')}
              </PrimaryButton>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
