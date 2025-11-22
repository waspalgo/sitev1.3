'use client';

import GlassCard from './GlassCard';
import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about-waspalgo" className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-20 md:pt-16">
      <BackgroundLights 
        variant="default" 
        uniqueId="about"
        positions={{
          orb1: { top: '25%', left: '70%' },
          orb2: { bottom: '25%', left: '20%' },
          orb3: { top: '60%', right: '20%' },
        }}
        sizes={{ orb1: 400, orb2: 360, orb3: 340 }}
      />
      <div className="content-container relative" style={{ zIndex: 1 }}>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {t('home.about.title')}
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              {t('home.about.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Qui sommes-nous - Main section */}
        <ScrollReveal delay={100}>
          <GlassCard variant="feature" className="p-8 md:p-10 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">{t('home.about.whoWeAre.title')}</h3>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>{t('home.about.whoWeAre.p1')}</p>
              <p>{t('home.about.whoWeAre.p2')}</p>
              
              {/* Moteur WA-AMIR */}
              <div className="mt-6 pt-6 border-t border-purple-accent/20">
                <h4 className="text-xl font-bold text-text-primary mb-3">{t('home.about.whoWeAre.engine.title')}</h4>
                <p>{t('home.about.whoWeAre.engine.description')}</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Une équipe multidisciplinaire */}
        <ScrollReveal delay={200}>
          <GlassCard variant="feature" className="p-8 md:p-10 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">{t('home.about.whoWeAre.team.title')}</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">{t('home.about.whoWeAre.team.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-primary/10 border border-purple-accent/20">
                <div className="w-8 h-8 rounded-lg bg-purple-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <p className="text-text-secondary leading-relaxed">{t('home.about.whoWeAre.team.developers')}</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-primary/10 border border-purple-accent/20">
                <div className="w-8 h-8 rounded-lg bg-purple-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-secondary leading-relaxed">{t('home.about.whoWeAre.team.financeExperts')}</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-primary/10 border border-purple-accent/20">
                <div className="w-8 h-8 rounded-lg bg-purple-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-text-secondary leading-relaxed">{t('home.about.whoWeAre.team.traders')}</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-primary/10 border border-purple-accent/20">
                <div className="w-8 h-8 rounded-lg bg-purple-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-purple-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-text-secondary leading-relaxed">{t('home.about.whoWeAre.team.analysts')}</p>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed mt-4 font-medium">{t('home.about.whoWeAre.team.conclusion')}</p>
          </GlassCard>
        </ScrollReveal>

        {/* Notre vision */}
        <ScrollReveal delay={200}>
          <GlassCard variant="feature" className="p-8 md:p-10 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">{t('home.about.vision.title')}</h3>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>{t('home.about.vision.p1')}</p>
              <p>{t('home.about.vision.p2')}</p>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Notre méthodologie - Separate card with clear spacing */}
        <ScrollReveal delay={300}>
          <div className="mb-12">
            <GlassCard variant="feature" className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">{t('home.about.methodology.title')}</h3>
              <div className="space-y-5 text-text-secondary">
                <p>
                  <strong className="text-text-primary">{t('home.about.methodology.internal').split(':')[0]}:</strong> {t('home.about.methodology.internal').split(':')[1]?.trim() || t('home.about.methodology.internal')}
                </p>
                <p>
                  <strong className="text-text-primary">{t('home.about.methodology.backtesting').split(':')[0]}:</strong> {t('home.about.methodology.backtesting').split(':')[1]?.trim() || t('home.about.methodology.backtesting')}
                </p>
                <p>
                  <strong className="text-text-primary">{t('home.about.methodology.transparency').split(':')[0]}:</strong> {t('home.about.methodology.transparency').split(':')[1]?.trim() || t('home.about.methodology.transparency')}
                </p>
                <p>
                  <strong className="text-text-primary">{t('home.about.methodology.control').split(':')[0]}:</strong> {t('home.about.methodology.control').split(':')[1]?.trim() || t('home.about.methodology.control')}
                </p>
                <p>
                  <strong className="text-text-primary">{t('home.about.methodology.continuousImprovement').split(':')[0]}:</strong> {t('home.about.methodology.continuousImprovement').split(':')[1]?.trim() || t('home.about.methodology.continuousImprovement')}
                </p>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* Ce que WASPALGO n'est pas - Separate card with clear spacing */}
        <ScrollReveal delay={400}>
          <div>
            <GlassCard variant="feature" className="p-8 md:p-10 bg-gradient-to-br from-negative/10 via-negative/5 to-bg-secondary border-negative/30">
              <h3 className="text-2xl md:text-3xl font-bold text-negative mb-6">
                {t('home.about.notWaspalgo.title')}
              </h3>
              <ul className="space-y-4 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-negative mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-text-primary">{t('home.about.notWaspalgo.notFundManager').split(':')[0]}:</strong>{' '}
                    {t('home.about.notWaspalgo.notFundManager').split(':')[1]?.trim() || t('home.about.notWaspalgo.notFundManager')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-negative mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-text-primary">{t('home.about.notWaspalgo.notProfitPromise').split(':')[0]}:</strong>{' '}
                    {t('home.about.notWaspalgo.notProfitPromise').split(':')[1]?.trim() || t('home.about.notWaspalgo.notProfitPromise')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-negative mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-text-primary">{t('home.about.notWaspalgo.notInvestmentAdvice').split(':')[0]}:</strong>{' '}
                    {t('home.about.notWaspalgo.notInvestmentAdvice').split(':')[1]?.trim() || t('home.about.notWaspalgo.notInvestmentAdvice')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-negative mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-text-primary">{t('home.about.notWaspalgo.notGetRichQuick').split(':')[0]}:</strong>{' '}
                    {t('home.about.notWaspalgo.notGetRichQuick').split(':')[1]?.trim() || t('home.about.notWaspalgo.notGetRichQuick')}
                  </span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
