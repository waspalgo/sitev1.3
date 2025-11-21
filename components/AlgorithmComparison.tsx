'use client';

import { useState } from 'react';
import Link from 'next/link';
import GlassCard from './GlassCard';
import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonFeature {
  label: string;
  st: string | number;
  lt: string | number;
  highlight?: boolean;
}

export default function AlgorithmComparison() {
  const { t, language } = useLanguage();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const unavailableText = language === 'fr' ? 'Indisponible' : 'Unavailable';

  const comparisonData: ComparisonFeature[] = [
    { label: t('home.comparison.horizon'), st: t('home.comparison.shortTerm'), lt: t('home.comparison.longTerm'), highlight: true },
    { label: t('home.comparison.markets'), st: 'XAUUSD', lt: t('home.comparison.unknown') },
    { label: t('home.comparison.risk'), st: t('home.comparison.moderateRisk'), lt: t('home.comparison.moderateToLow') },
    { label: t('home.comparison.performance'), st: '+177.74%', lt: unavailableText, highlight: true },
    { label: t('home.comparison.availability'), st: t('home.comparison.available'), lt: t('home.comparison.soonAvailable'), highlight: true },
  ];

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="default" 
        uniqueId="comparison"
        positions={{
          orb1: { bottom: '25%', right: '30%' },
          orb2: { top: '25%', left: '25%' },
          orb3: { top: '60%', right: '20%' },
        }}
        sizes={{ orb1: 380, orb2: 400, orb3: 360 }}
      />
      <div className="content-container relative" style={{ zIndex: 1 }}>
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-purple-primary/20 border border-purple-accent/30 rounded-full text-sm text-purple-accent font-medium mb-4">
              {t('home.comparison.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {t('home.comparison.title')}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {t('home.comparison.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="max-w-5xl mx-auto">
            <GlassCard variant="feature" className="p-4 sm:p-6 md:p-8">
              {/* Desktop version - Table */}
              <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* Header */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-purple-accent/20">
                    <div className="font-semibold text-text-primary">{t('home.comparison.feature')}</div>
                    <div className="text-center font-semibold text-text-primary">WA-AMIR ST V1</div>
                    <div className="text-center font-semibold text-text-primary">WA-AMIR LT V1</div>
                  </div>

                  {/* Rows */}
                  <div className="space-y-3">
                    {comparisonData.map((feature, index) => (
                      <div
                        key={index}
                        className={`grid grid-cols-3 gap-4 p-4 rounded-lg transition-all duration-200 ${
                          hoveredFeature === index
                            ? 'bg-purple-primary/20 border border-purple-accent/30'
                            : feature.highlight
                            ? 'bg-purple-primary/10'
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredFeature(index)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="text-text-secondary font-medium">{feature.label}</div>
                        <div className="text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              feature.st === t('home.comparison.available')
                                ? 'bg-positive/20 text-positive'
                                : feature.st === t('home.comparison.soonAvailable')
                                ? 'bg-text-muted/20 text-text-muted'
                                : typeof feature.st === 'string' && feature.st.includes('%')
                                ? 'bg-purple-accent/20 text-purple-accent font-bold'
                                : 'text-text-primary'
                            }`}
                          >
                            {feature.st}
                          </span>
                        </div>
                        <div className="text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              feature.lt === t('home.comparison.available')
                                ? 'bg-positive/20 text-positive'
                                : feature.lt === t('home.comparison.soonAvailable') || feature.lt === unavailableText
                                ? 'bg-text-muted/20 text-text-muted'
                                : typeof feature.lt === 'string' && feature.lt.includes('%')
                                ? 'bg-purple-accent/20 text-purple-accent font-bold'
                                : 'text-text-primary'
                            }`}
                          >
                            {feature.lt}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile version - Stacked cards */}
              <div className="md:hidden space-y-4">
                {comparisonData.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border border-purple-accent/20 ${
                      feature.highlight ? 'bg-purple-primary/10' : 'bg-black/20'
                    }`}
                  >
                    <div className="text-sm font-semibold text-text-secondary mb-3">{feature.label}</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">WA-AMIR ST V1</span>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            feature.st === t('home.comparison.available')
                              ? 'bg-positive/20 text-positive'
                              : feature.st === t('home.comparison.soonAvailable')
                              ? 'bg-text-muted/20 text-text-muted'
                              : typeof feature.st === 'string' && feature.st.includes('%')
                              ? 'bg-purple-accent/20 text-purple-accent font-bold'
                              : 'text-text-primary'
                          }`}
                        >
                          {feature.st}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">WA-AMIR LT V1</span>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            feature.lt === t('home.comparison.available')
                              ? 'bg-positive/20 text-positive'
                              : feature.lt === t('home.comparison.soonAvailable') || feature.lt === unavailableText
                              ? 'bg-text-muted/20 text-text-muted'
                              : typeof feature.lt === 'string' && feature.lt.includes('%')
                              ? 'bg-purple-accent/20 text-purple-accent font-bold'
                              : 'text-text-primary'
                          }`}
                        >
                          {feature.lt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-purple-accent/20">
                  <Link
                    href="/algorithmes/wa-amir-st"
                    className="px-6 py-3 rounded-xl bg-purple-primary text-white font-semibold hover:bg-purple-accent transition-all duration-200 text-center border border-purple-accent/30 hover:border-purple-accent/50 hover:shadow-lg hover:shadow-purple-accent/20"
                  >
                    {t('home.comparison.learnMoreST')}
                  </Link>
                  <Link
                    href="/algorithmes/wa-amir-lt"
                    className="px-6 py-3 rounded-xl bg-purple-primary/20 border border-purple-accent/30 text-purple-accent font-semibold hover:bg-purple-primary/30 hover:border-purple-accent/50 transition-all duration-200 text-center"
                  >
                    {t('home.comparison.learnMoreLT')}
                  </Link>
                </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

