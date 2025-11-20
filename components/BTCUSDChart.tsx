'use client';

import { useEffect, useRef } from 'react';
import GlassCard from './GlassCard';

export default function BTCUSDChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Placeholder for TradingView Lightweight Charts integration
    // This will be replaced with actual TradingView integration in future version
    if (chartContainerRef.current) {
      // For now, we'll use a placeholder SVG chart
      // In V3, this will be replaced with:
      // import { createChart } from 'lightweight-charts';
      // const chart = createChart(chartContainerRef.current, { ... });
    }
  }, []);

  return (
    <GlassCard glow className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">BTCUSD – Bitcoin</h2>
          <p className="text-text-muted text-sm">Prix actuel</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-text-primary">$63,245.80</p>
          <p className="text-negative text-sm font-semibold">-1.23%</p>
        </div>
      </div>
      <div ref={chartContainerRef} className="h-64 mb-6 bg-black/20 rounded-xl flex items-center justify-center border border-purple-accent/10">
        <div className="text-center">
          <p className="text-text-muted text-sm mb-2">Graphique TradingView</p>
          <p className="text-text-muted text-xs">Intégration à venir</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-text-muted text-xs mb-1">24h High</p>
          <p className="text-text-primary font-semibold">$64,120.50</p>
        </div>
        <div>
          <p className="text-text-muted text-xs mb-1">24h Low</p>
          <p className="text-text-primary font-semibold">$62,890.30</p>
        </div>
        <div>
          <p className="text-text-muted text-xs mb-1">Volume</p>
          <p className="text-text-primary font-semibold">$2.5B</p>
        </div>
      </div>
    </GlassCard>
  );
}








