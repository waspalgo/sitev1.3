'use client';

import { useState } from 'react';
import GlassCard from './GlassCard';
import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimelineEvent {
  month: string;
  return: number;
  risk: number;
  description: string;
  highlight?: boolean;
}

const timelineDataFr: TimelineEvent[] = [
  {
    month: '04/25',
    return: 16.17,
    risk: 3.2,
    description: 'Lancement de WA-AMIR ST V1 en phase privée. Premiers résultats positifs.',
    highlight: true,
  },
  {
    month: '05/25',
    return: 22.56,
    risk: 4.5,
    description: 'Optimisation des paramètres. Performance en hausse.',
  },
  {
    month: '06/25',
    return: 29.17,
    risk: 5.8,
    description: 'Très bonne performance avec +29.17%. Risque maîtrisé.',
    highlight: true,
  },
  {
    month: '07/25',
    return: 15.28,
    risk: 2.1,
    description: 'Période de consolidation. Risque réduit.',
  },
  {
    month: '08/25',
    return: 21.34,
    risk: 4.2,
    description: 'Retour à la croissance. Stabilité améliorée.',
  },
  {
    month: '09/25',
    return: 18.92,
    risk: 3.6,
    description: 'Performance régulière. Risque modéré.',
  },
  {
    month: '10/25',
    return: 27.45,
    risk: 6.0,
    description: 'Excellent mois. Attention au risque élevé.',
    highlight: true,
  },
  {
    month: '11/25',
    return: 34.51,
    risk: 2.0,
    description: 'Meilleur mois avec +34.51%. Ouverture prévue entre le 24.11 et 30.11 pour les membres whitelist. Performance exceptionnelle avec risque minimal.',
    highlight: true,
  },
];

const timelineDataEn: TimelineEvent[] = [
  {
    month: '04/25',
    return: 16.17,
    risk: 3.2,
    description: 'Launch of WA-AMIR ST V1 in private phase. First positive results.',
    highlight: true,
  },
  {
    month: '05/25',
    return: 22.56,
    risk: 4.5,
    description: 'Parameter optimization. Rising performance.',
  },
  {
    month: '06/25',
    return: 29.17,
    risk: 5.8,
    description: 'Very good performance with +29.17%. Risk controlled.',
    highlight: true,
  },
  {
    month: '07/25',
    return: 15.28,
    risk: 2.1,
    description: 'Consolidation period. Reduced risk.',
  },
  {
    month: '08/25',
    return: 21.34,
    risk: 4.2,
    description: 'Return to growth. Improved stability.',
  },
  {
    month: '09/25',
    return: 18.92,
    risk: 3.6,
    description: 'Regular performance. Moderate risk.',
  },
  {
    month: '10/25',
    return: 27.45,
    risk: 6.0,
    description: 'Excellent month. Watch for high risk.',
    highlight: true,
  },
  {
    month: '11/25',
    return: 34.51,
    risk: 2.0,
    description: 'Best month with +34.51%. Opening scheduled between 24.11 and 30.11 for whitelist members. Exceptional performance with minimal risk.',
    highlight: true,
  },
];

export default function PerformanceTimeline() {
  const { t, language } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  
  const timelineData = language === 'fr' ? timelineDataFr : timelineDataEn;

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="intense" 
        uniqueId="timeline"
        positions={{
          orb1: { top: '25%', left: '40%' },
          orb2: { bottom: '25%', left: '60%' },
          orb3: { top: '55%', right: '30%' },
        }}
        sizes={{ orb1: 450, orb2: 420, orb3: 400 }}
      />
      <div className="content-container relative" style={{ zIndex: 1 }}>
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-purple-primary/20 border border-purple-accent/30 rounded-full text-sm text-purple-accent font-medium mb-4">
              {t('home.timeline.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {t('home.timeline.title')}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {t('home.timeline.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="max-w-6xl mx-auto">
            <GlassCard variant="feature" className="p-6 md:p-8">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-purple-accent/20 hidden md:block" />

                {/* Events */}
                <div className="space-y-8">
                  {timelineData.map((event, index) => (
                    <div
                      key={event.month}
                      className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
                    >
                      {/* Month marker */}
                      <div className="flex items-center gap-4 md:w-32 flex-shrink-0">
                        <div
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                            selectedMonth === event.month || event.highlight
                              ? 'bg-purple-accent border-purple-accent scale-125'
                              : 'bg-bg-primary border-purple-accent/50'
                          }`}
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-lg font-bold transition-colors ${
                                selectedMonth === event.month || event.highlight
                                  ? 'text-purple-accent'
                                  : 'text-text-primary'
                              }`}
                            >
                              {event.month}
                            </span>
                            {event.month === '11/25' && (
                              <span className="text-xs px-2 py-0.5 bg-purple-accent/20 text-purple-accent rounded-full font-medium whitespace-nowrap">
                                {language === 'fr' ? 'En cours' : 'Current'}
                              </span>
                            )}
                          </div>
                          {event.highlight && event.month !== '11/25' && (
                            <span className="text-xs text-purple-accent">Point clé</span>
                          )}
                        </div>
                      </div>

                      {/* Event card */}
                      <div
                        className={`flex-1 p-4 md:p-6 rounded-xl border transition-all duration-200 cursor-pointer ${
                          selectedMonth === event.month
                            ? 'bg-purple-primary/20 border-purple-accent/50 shadow-lg shadow-purple-accent/10'
                            : 'bg-black/20 border-purple-accent/20 hover:border-purple-accent/40 hover:bg-black/30'
                        }`}
                        onClick={() => setSelectedMonth(selectedMonth === event.month ? null : event.month)}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-text-muted mb-1">Rendement</p>
                            <p className="text-2xl font-bold text-positive">+{event.return}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-text-muted mb-1">Risque</p>
                            <p className="text-2xl font-bold text-text-primary">{event.risk}</p>
                          </div>
                          <div className="hidden md:block">
                            <p className="text-xs text-text-muted mb-1">Ratio</p>
                            <p className="text-2xl font-bold text-purple-accent">
                              {(event.return / event.risk).toFixed(1)}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-text-secondary">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

