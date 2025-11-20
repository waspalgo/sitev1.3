'use client';

import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';
import type { MarketsResponse } from '@/types/markets';

/**
 * Section "Aperçu des marchés" avec données en temps réel
 * 
 * Rafraîchit automatiquement les données toutes les 15 secondes
 */
export default function MarketsSection() {
  const { t } = useLanguage();
  const [markets, setMarkets] = useState<MarketsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMarkets = async () => {
    try {
      const response = await fetch('/api/markets');
      if (!response.ok) {
        throw new Error('Failed to fetch markets data');
      }
      const data: MarketsResponse = await response.json();
      setMarkets(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching markets:', error);
      setIsLoading(false);
      // En cas d'erreur, on garde les données précédentes ou on utilise les fallbacks
    }
  };

  useEffect(() => {
    // Charger immédiatement
    fetchMarkets();

    // Rafraîchir toutes les 15 secondes (configurable)
    // Note: Alpha Vantage limite à 5 appels/min, donc 15s est un bon compromis
    const REFRESH_INTERVAL = 15000; // 15 secondes
    const interval = setInterval(fetchMarkets, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Formatage des prix
  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  // Valeurs de fallback pendant le chargement ou en cas d'erreur
  const fallbackData: MarketsResponse = {
    gold: {
      symbol: 'XAUUSD',
      price: 4085.825,
      changePercent: -3.01,
      history: Array.from({ length: 20 }, () => Math.random() * 100 + 4000),
    },
    btc: {
      symbol: 'BTCUSD',
      price: 63245.80,
      changePercent: -1.23,
      history: Array.from({ length: 20 }, () => Math.random() * 5000 + 60000),
    },
    index: {
      symbol: 'GLOBAL',
      price: 1234.56,
      changePercent: 0.42,
      history: Array.from({ length: 20 }, () => Math.random() * 100 + 1200),
    },
  };

  const data = markets || fallbackData;

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
          <div className="mb-12 text-center">
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
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          <ScrollReveal delay={200}>
            <MetricCard
              title={
                <span className="flex items-center gap-2">
                  XAUUSD – Or
                  <span className="text-xs px-2 py-1 bg-text-muted/20 text-text-muted rounded-full">
                    Désactivé temporairement
                  </span>
                </span>
              }
              value={isLoading ? '—' : formatPrice(data.gold.price)}
              change={data.gold.changePercent}
              sparklineData={data.gold.history}
              isLoading={isLoading}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

