'use client';

import GlassCard from './GlassCard';
import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

interface Stat {
  value: string;
  labelKey: string;
  icon: React.ReactNode;
  color: 'purple' | 'green' | 'blue' | 'gold';
}

export default function StatsSection() {
  const { t } = useLanguage();

  const stats: Stat[] = [
    {
      value: '+185.40%',
      labelKey: 'home.stats.performanceYTD',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'green',
    },
    {
      value: '8',
      labelKey: 'home.stats.monthsOfPerformance',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'purple',
    },
    {
      value: '99%+',
      labelKey: 'home.stats.xauusdExposure',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lingot d'or - couleur or directe */}
          <rect x="4" y="7" width="16" height="10" rx="1.5" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
          <rect x="5" y="6" width="14" height="2.5" rx="0.5" fill="#FFA500"/>
          <rect x="5" y="15.5" width="14" height="2.5" rx="0.5" fill="#FFA500"/>
          {/* Reflets brillants */}
          <rect x="6" y="9.5" width="12" height="1.5" fill="#FFEB3B" opacity="0.7"/>
          <rect x="6" y="12.5" width="12" height="1.5" fill="#FFEB3B" opacity="0.7"/>
        </svg>
      ),
      color: 'gold',
    },
    {
      value: '2.0',
      labelKey: 'home.stats.currentRisk',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'purple',
    },
  ];
  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="subtle" 
        uniqueId="stats"
        positions={{
          orb1: { top: '40%', right: '25%' },
          orb2: { bottom: '30%', left: '25%' },
          orb3: { top: '25%', right: '50%' },
        }}
        sizes={{ orb1: 320, orb2: 340, orb3: 300 }}
      />
      <div className="content-container relative" style={{ zIndex: 1 }}>
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <GlassCard variant="feature" className="p-6 text-center group hover:scale-105 transition-transform duration-300">
                  <div
                    className={`inline-flex p-3 rounded-xl mb-4 ${
                      stat.color === 'green'
                        ? 'bg-positive/20 text-positive'
                        : stat.color === 'blue'
                        ? 'bg-blue-500/20 text-blue-400'
                        : stat.color === 'gold'
                        ? 'bg-yellow-500/20'
                        : 'bg-purple-primary/20 text-purple-accent'
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-text-secondary">{t(stat.labelKey)}</div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

