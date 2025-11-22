'use client';

import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import TradingViewWidget from './TradingViewWidget';
import GlassCard from './GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Section "Aperçu du cours de l'or" avec widget TradingView
 */
export default function MarketsSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary py-16 md:py-20 relative overflow-hidden">
      <BackgroundLights 
        variant="intense" 
        uniqueId="markets"
        positions={{
          // Orbe principal plus haut et légèrement recentré pour rester dans la section
          orb1: { top: '28%', right: '26%' },
          // Orbe gauche (sous XAUUSD) remonté et légèrement réduit, pour ne plus toucher la séparation
          orb2: { top: '48%', left: '24%' },
          // Orbe arrière légèrement plus haut pour rester dans la zone centrale
          orb3: { top: '52%', right: '48%' },
        }}
        sizes={{ orb1: 420, orb2: 320, orb3: 300 }}
      />
      <div className="content-container max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary relative inline-block">
              <span className="relative">
                {t('home.markets.title')}
                <span
                  className="absolute -inset-4 blur-3xl opacity-35 -z-10"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(139, 92, 246, 0.4) 30%, rgba(109, 40, 217, 0.2) 60%, transparent 100%)',
                    filter: 'blur(36px)',
                  }}
                />
              </span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="w-full">
          <ScrollReveal delay={200}>
            <GlassCard glow className="p-0 w-full overflow-hidden">
              <TradingViewWidget />
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

