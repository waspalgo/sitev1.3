'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SimulationDataPoint {
  month: string;
  value: number;
  date: string; // Format: MM/YY
}

interface SimulationChartProps {
  data: SimulationDataPoint[];
  initialAmount: number;
  width?: number;
  height?: number;
}

export default function SimulationChart({ data, initialAmount, width = 800, height = 200 }: SimulationChartProps) {
  const { t, language } = useLanguage();
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!data || data.length === 0) return null;

  // Ajuster les dimensions pour mobile
  const chartWidth = isMobile ? Math.min(width, typeof window !== 'undefined' ? window.innerWidth - 32 : width) : width;
  const chartHeight = isMobile ? Math.max(height * 0.7, 200) : height;

  // Calculer les valeurs cumulatives
  const cumulativeData: Array<{ month: string; value: number; date: string; cumulative: number }> = [];
  data.forEach((point, index) => {
    if (index === 0) {
      cumulativeData.push({
        ...point,
        cumulative: initialAmount * (1 + point.value / 100),
      });
    } else {
      const previousCumulative = cumulativeData[index - 1].cumulative;
      cumulativeData.push({
        ...point,
        cumulative: previousCumulative * (1 + point.value / 100),
      });
    }
  });

  // Trouver les min et max pour l'échelle
  const allValues = [initialAmount, ...cumulativeData.map(d => d.cumulative)];
  const maxValue = Math.max(...allValues);
  
  // Calculer un pas adaptatif basé sur la valeur maximale
  // On veut environ 5-7 lignes de grille pour une bonne lisibilité
  let step: number;
  if (maxValue < 1000) {
    step = 250; // Pour les petits montants (< 1000$), pas de 250
  } else if (maxValue < 2500) {
    step = 500; // Pour les montants moyens (< 2500$), pas de 500
  } else if (maxValue < 5000) {
    step = 1000; // Pour les montants moyens (< 5000$), pas de 1000
  } else if (maxValue < 10000) {
    step = 2000; // Pour les montants moyens (< 10000$), pas de 2000
  } else {
    step = 5000; // Pour les grands montants, pas de 5000
  }
  
  // Arrondir le max à la valeur supérieure multiple du pas
  const roundedMax = Math.ceil(maxValue / step) * step;
  
  // Min toujours à 0 pour commencer proprement
  const minValue = 0;
  const range = roundedMax - minValue;
  const padding = 0; // Pas de padding car on utilise des valeurs fixes

  // Dimensions du graphique (déjà ajustées pour mobile ci-dessus)
  const paddingX = isMobile ? 45 : 70; // Moins de padding sur mobile
  const paddingY = isMobile ? 30 : 40;
  const graphWidth = chartWidth - paddingX * 2;
  const graphHeight = chartHeight - paddingY * 2;

  // Fonction pour convertir une valeur en coordonnée Y
  const valueToY = (value: number) => {
    if (range === 0) return paddingY + graphHeight;
    const normalized = (value - minValue) / range;
    return paddingY + graphHeight - normalized * graphHeight;
  };

  // Fonction pour convertir un index en coordonnée X
  // On garde l'espacement original (comme avant avec juste 12/25)
  const originalTotalMonths = cumulativeData.length + 1; // +1 pour 12/25 (comme avant)
  const monthSpacing = graphWidth / (originalTotalMonths - 1); // Distance entre chaque mois
  
  // Dates futures à ajouter
  const futureMonths = ['12/25', '01/26', '02/26', '03/26'];
  const totalFutureMonths = futureMonths.length;
  
  const indexToX = (index: number) => {
    if (cumulativeData.length === 1) return paddingX;
    // Garder l'espacement original pour les mois existants
    return paddingX + (index * monthSpacing);
  };
  
  // Fonction pour obtenir la position X du dernier point de données (11/25) - positionné au 15.11.2025
  const getLastDataPointX = () => {
    if (cumulativeData.length === 1) return paddingX;
    const lastIndex = cumulativeData.length - 1;
    const baseX = paddingX + (lastIndex * monthSpacing); // Position normale de 11/25
    const nextX = paddingX + ((lastIndex + 1) * monthSpacing); // Position de 12/25
    // Positionner à 50% entre 11/25 et 12/25 (15/11 = milieu du mois)
    return baseX + (nextX - baseX) * 0.5;
  };
  
  // Fonction pour obtenir la position X des mois futurs (après les données réelles)
  const getFutureMonthX = (futureIndex: number) => {
    const lastDataIndex = cumulativeData.length - 1;
    // Position de 12/25 (premier mois futur)
    const firstFutureX = paddingX + ((lastDataIndex + 1) * monthSpacing);
    // Ajouter l'espacement pour les mois suivants
    return firstFutureX + (futureIndex * monthSpacing);
  };

  // Gérer le survol des points
  const handlePointMouseEnter = (index: number) => {
    setHoveredPoint(index);
    const x = indexToX(index);
    const y = valueToY(cumulativeData[index].cumulative);
    setTooltipPosition({ x, y });
  };

  const handlePointMouseLeave = () => {
    setHoveredPoint(null);
    setTooltipPosition(null);
  };

  // Créer le chemin SVG pour la ligne
  const points = cumulativeData.map((point, index) => {
    // Pour le dernier point, utiliser la position ajustée (15.11.2025)
    const x = index === cumulativeData.length - 1 ? getLastDataPointX() : indexToX(index);
    const y = valueToY(point.cumulative);
    return `${x},${y}`;
  });

  // Ajouter le point de départ
  const startPoint = `${paddingX},${valueToY(initialAmount)}`;
  const pathData = `M ${startPoint} L ${points.join(' L ')}`;

  // Créer le chemin pour l'aire sous la courbe
  const lastPointX = getLastDataPointX();
  const lastPointY = valueToY(cumulativeData[cumulativeData.length - 1].cumulative);
  const areaPath = `M ${startPoint} L ${points.join(' L ')} L ${lastPointX},${lastPointY} L ${paddingX},${valueToY(initialAmount)} Z`;

  // Valeur finale
  const finalValue = cumulativeData[cumulativeData.length - 1].cumulative;
  const totalReturn = ((finalValue - initialAmount) / initialAmount) * 100;

  // Données pour le tooltip
  const tooltipData = hoveredPoint !== null
    ? hoveredPoint === -1
      ? { date: '04/25', amount: initialAmount, return: 0 }
      : {
          date: cumulativeData[hoveredPoint].date,
          amount: cumulativeData[hoveredPoint].cumulative,
          return: cumulativeData[hoveredPoint].value,
        }
    : null;

  return (
    <div className="relative w-full">
      {/* Tooltip */}
      {tooltipData && tooltipPosition && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 90}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-black/95 border border-purple-accent/50 rounded-lg px-4 py-3 shadow-2xl backdrop-blur-sm min-w-[140px]">
            <div className="text-xs text-text-muted mb-1">{tooltipData.date}</div>
            <div className="text-lg font-bold text-text-primary">
              {tooltipData.amount.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
            {tooltipData.return > 0 && (
              <div className="text-xs text-positive mt-1">
                +{tooltipData.return.toFixed(2)}% {t('home.simulation.thisMonth')}
              </div>
            )}
            {/* Flèche pointant vers le point */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(139, 92, 246, 0.5)',
              }}
            />
          </div>
        </div>
      )}

      <svg width={chartWidth} height={chartHeight} className="w-full h-auto">
        {/* Définition du gradient pour l'aire */}
        <defs>
          <linearGradient id="simulationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.05)" />
          </linearGradient>
        </defs>

        {/* Grille de fond avec valeurs Y */}
        {(() => {
          // Utiliser le pas adaptatif calculé précédemment
          const steps = Math.ceil(roundedMax / step); // Nombre de lignes basé sur le pas
          // Position X de la fin du graphique (03/26)
          const endX = getFutureMonthX(futureMonths.length - 1);
          const lines = [];
          for (let i = 0; i <= steps; i++) {
            const value = i * step;
            const y = valueToY(value);
            lines.push(
              <g key={`grid-${i}`}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={endX}
                  y2={y}
                  stroke="rgba(139, 92, 246, 0.1)"
                  strokeWidth="1"
                />
                {/* Label de valeur à gauche */}
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="rgba(255, 255, 255, 0.6)"
                  fontSize={isMobile ? "8" : "10"}
                  fontFamily="system-ui"
                >
                  {value.toLocaleString('fr-FR')}
                </text>
              </g>
            );
          }
          return lines;
        })()}

        {/* Aire sous la courbe */}
        <path
          d={areaPath}
          fill="url(#simulationGradient)"
        />

        {/* Ligne principale */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(168, 85, 247, 1)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points sur la courbe */}
        {cumulativeData.map((point, index) => {
          // Pour le dernier point, utiliser la position ajustée (15.11.2025)
          const x = index === cumulativeData.length - 1 ? getLastDataPointX() : indexToX(index);
          const y = valueToY(point.cumulative);
          const isHovered = hoveredPoint === index;
          return (
            <circle
              key={`point-${index}`}
              cx={x}
              cy={y}
              r={isHovered ? 6 : 4}
              fill="rgba(168, 85, 247, 1)"
              stroke="#000"
              strokeWidth={isHovered ? 3 : 2}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => handlePointMouseEnter(index)}
              onMouseLeave={handlePointMouseLeave}
            />
          );
        })}

        {/* Point de départ */}
        <circle
          cx={paddingX}
          cy={valueToY(initialAmount)}
          r={hoveredPoint === -1 ? 6 : 4}
          fill="rgba(168, 85, 247, 1)"
          stroke="#000"
          strokeWidth={hoveredPoint === -1 ? 3 : 2}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={() => {
            setHoveredPoint(-1);
            setTooltipPosition({ x: paddingX, y: valueToY(initialAmount) });
          }}
          onMouseLeave={handlePointMouseLeave}
        />

        {/* Date labels on X-axis - all equidistant */}
        {cumulativeData.map((point, index) => {
          const x = indexToX(index);
          return (
            <g key={`label-${index}`}>
              <line
                x1={x}
                y1={chartHeight - paddingY}
                x2={x}
                y2={chartHeight - paddingY + 5}
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="1"
              />
              <text
                x={x}
                y={chartHeight - paddingY + 20}
                textAnchor="middle"
                fill="rgba(255, 255, 255, 0.6)"
                fontSize={isMobile ? "8" : "10"}
                fontFamily="system-ui"
              >
                {point.date}
              </text>
            </g>
          );
        })}
        
        {/* Labels for future months (12/25, 01/26, 02/26, 03/26) - same spacing */}
        {futureMonths.map((month, idx) => {
          const x = getFutureMonthX(idx);
          return (
            <g key={`future-${idx}`}>
              <line
                x1={x}
                y1={chartHeight - paddingY}
                x2={x}
                y2={chartHeight - paddingY + 5}
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="1"
              />
              <text
                x={x}
                y={chartHeight - paddingY + 20}
                textAnchor="middle"
                fill="rgba(255, 255, 255, 0.4)"
                fontSize={isMobile ? "8" : "10"}
                fontFamily="system-ui"
              >
                {month}
              </text>
            </g>
          );
        })}

        {/* Start date label */}
        <g>
          <line
            x1={paddingX}
            y1={chartHeight - paddingY}
            x2={paddingX}
            y2={chartHeight - paddingY + 5}
            stroke="rgba(139, 92, 246, 0.3)"
            strokeWidth="1"
          />
          <text
            x={paddingX}
            y={chartHeight - paddingY + 20}
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.6)"
            fontSize={isMobile ? "8" : "10"}
            fontFamily="system-ui"
          >
            04/25
          </text>
        </g>
      </svg>

      {/* Legend with important values */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm">
        <div className="text-text-muted">
          <span className="text-text-secondary font-semibold">{t('home.simulation.start')}:</span> {initialAmount.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </div>
        <div className="text-positive font-semibold">
          <span className="text-text-secondary">{t('home.simulation.final')}:</span> {finalValue.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </div>
        <div className="text-purple-accent font-semibold">
          <span className="text-text-secondary">{t('home.simulation.return')}:</span> +{totalReturn.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

