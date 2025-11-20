'use client';

import GlassCard from './GlassCard';
import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about-waspalgo" className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
          <ScrollReveal delay={100}>
            <GlassCard variant="feature" className="p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-text-primary mb-4">{t('home.about.whoWeAre.title')}</h3>
              <div className="flex-1 flex flex-col">
                <p className="text-text-secondary leading-relaxed mb-4">
                  {t('home.about.whoWeAre.p1')}
                </p>
                <p className="text-text-secondary leading-relaxed mt-auto">
                  {t('home.about.whoWeAre.p2')}
                </p>
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <GlassCard variant="feature" className="p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-text-primary mb-4">{t('home.about.vision.title')}</h3>
              <div className="flex-1 flex flex-col">
                <p className="text-text-secondary leading-relaxed mb-4">
                  {t('home.about.vision.p1')}
                </p>
                <p className="text-text-secondary leading-relaxed mt-auto">
                  {t('home.about.vision.p2')}
                </p>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>

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
