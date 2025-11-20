'use client';

import { useState, useEffect } from 'react';

interface BarChartProps {
  data: { month: string; value: number }[];
  color?: string;
  width?: number;
  height?: number;
  maxValue?: number;
}

export default function BarChart({
  data,
  color = '#A855F7',
  width = 800,
  height = 200,
  maxValue,
}: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (data.length === 0) return null;

  // Utiliser maxValue si fourni, sinon calculer automatiquement
  const chartMaxValue = maxValue || Math.max(...data.map(d => d.value));
  const minValue = 0;
  const range = chartMaxValue - minValue || 1;

  // Ajuster la hauteur du SVG pour mobile (doit être défini avant son utilisation)
  const svgHeight = isMobile ? Math.max(height, 400) : height;

  // Ajuster les paddings pour mobile
  const leftPadding = isMobile ? 65 : 50; // Plus d'espace pour les labels sur mobile
  const rightPadding = isMobile ? 8 : 20;
  const padding = isMobile ? 3 : 20;
  const chartWidth = width - leftPadding - rightPadding - padding * 2;
  const chartHeight = svgHeight - (isMobile ? 20 : 50); // Moins d'espace pour les labels sur mobile
  const barSpacing = chartWidth / data.length;
  const barWidth = barSpacing * (isMobile ? 0.88 : 0.6); // Barres encore plus larges sur mobile
  const barGap = barSpacing * (isMobile ? 0.12 : 0.4);
  const labelY = svgHeight - (isMobile ? 2 : 15);

  // Générer les lignes de l'échelle selon maxValue
  const getScaleLines = () => {
    if (maxValue === 10) {
      // Pour le risque : 0, 2, 4, 6, 8, 10
      return [0, 2, 4, 6, 8, 10];
<<<<<<< HEAD
    } else if (maxValue === 40) {
      // Pour les rendements avec maxValue 40 : 0%, 5%, 10%, 15%, 20%, 25%, 30%, 35%, 40%
      return [0, 5, 10, 15, 20, 25, 30, 35, 40];
    } else {
      // Pour les rendements par défaut : 0%, 5%, 10%, 15%, 20%, 25%, 30%
=======
    } else {
      // Pour les rendements : 0%, 5%, 10%, 15%, 20%, 25%, 30%
>>>>>>> 82a9afff82211ec552c4e205dc33ff711accf459
      return [0, 5, 10, 15, 20, 25, 30];
    }
  };
  const scaleLines = getScaleLines();

  const handleMouseMove = (e: React.MouseEvent<SVGElement>, index: number) => {
    const container = e.currentTarget.closest('div');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      // Calculer la position optimale du tooltip
      // Tooltip width estimé: ~80px pour desktop, ~100px pour mobile
      const tooltipWidth = isMobile ? 100 : 80;
      const tooltipHeight = 40;
      const padding = 10;
      
      // Position X : centrer sur la souris, mais rester dans les limites
      let tooltipX = mouseX - tooltipWidth / 2;
      if (tooltipX < padding) {
        tooltipX = padding;
      } else if (tooltipX + tooltipWidth > containerRect.width - padding) {
        tooltipX = containerRect.width - tooltipWidth - padding;
      }
      
      // Position Y : au-dessus de la barre, mais rester dans les limites
      let tooltipY = mouseY - tooltipHeight - 10;
      if (tooltipY < padding) {
        // Si pas assez de place en haut, mettre en bas
        tooltipY = mouseY + 20;
      } else if (tooltipY + tooltipHeight > containerRect.height - padding) {
        // Si pas assez de place en bas, mettre en haut
        tooltipY = padding;
      }
      
      setTooltipPosition({
        x: tooltipX,
        y: tooltipY,
      });
    }
    setHoveredIndex(index);
  };

  return (
    <div className="relative w-full h-full">
      <svg 
        width={width} 
        height={svgHeight} 
        viewBox={`0 0 ${width} ${svgHeight}`}
        className="overflow-visible w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`barGradient-${width}-${height}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
          <filter id={`barGlow-${width}-${height}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id={`barNeonGlow-${width}-${height}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id={`barNeonStroke-${width}-${height}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Échelle à gauche - lignes et labels */}
        {scaleLines.map((value) => {
          const y = chartHeight - ((value - minValue) / range) * chartHeight;
          return (
            <g key={value}>
              {/* Ligne horizontale */}
              <line
                x1={leftPadding}
                y1={y}
                x2={width - rightPadding}
                y2={y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              {/* Label de la valeur */}
              <text
                x={leftPadding - (isMobile ? 18 : 10)}
                y={y + 7}
                textAnchor="end"
                fill="rgba(255, 255, 255, 1)"
                fontSize={isMobile ? "22" : "10"}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight={isMobile ? "900" : "400"}
              >
                {maxValue === 10 ? value : `${value}%`}
              </text>
            </g>
          );
        })}
        
        {data.map((item, index) => {
          const barHeight = ((item.value - minValue) / range) * chartHeight;
          const barX = leftPadding + padding + index * barSpacing + barGap / 2;
          const barY = chartHeight - barHeight;
          const isHovered = hoveredIndex === index;
          
          return (
            <g key={item.month}>
              {/* Barre avec gradient et glow */}
              <rect
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={`url(#barGradient-${width}-${height})`}
                filter={isHovered ? `url(#barNeonGlow-${width}-${height})` : `url(#barGlow-${width}-${height})`}
                stroke={isHovered ? 'rgba(168, 85, 247, 1)' : 'none'}
                strokeWidth={isHovered ? '2' : '0'}
                rx="3"
                ry="3"
                opacity={isHovered ? 1 : 0.8}
                style={{ 
                  cursor: 'pointer', 
                  transition: 'opacity 0.2s, stroke 0.2s, stroke-width 0.2s, filter 0.2s',
                }}
                onMouseEnter={(e) => handleMouseMove(e, index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {/* Contour néon supplémentaire au survol */}
              {isHovered && (
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.6)"
                  strokeWidth="1"
                  rx="3"
                  ry="3"
                  filter={`url(#barNeonStroke-${width}-${height})`}
                  style={{ 
                    pointerEvents: 'none',
                  }}
                />
              )}
              {/* Label du mois */}
              <text
                x={barX + barWidth / 2}
                y={labelY}
                textAnchor="middle"
                fill="rgba(255, 255, 255, 1)"
                fontSize={isMobile ? "20" : "11"}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight={isMobile ? "900" : "400"}
              >
                {item.month}
              </text>
              {/* Badge "Mois en cours" pour 11/25 */}
              {item.month === '11/25' && (
                <text
                  x={barX + barWidth / 2}
                  y={labelY + (isMobile ? 18 : 12)}
                  textAnchor="middle"
                  fill="rgba(168, 85, 247, 1)"
                  fontSize={isMobile ? "14" : "9"}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                >
                  En cours
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div
          className="absolute pointer-events-none z-50 bg-black/90 border border-purple-accent/50 rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateX(0)',
          }}
        >
          <div className="text-white text-sm font-semibold">
            {maxValue === 10 ? data[hoveredIndex].value.toFixed(1) : `+${data[hoveredIndex].value.toFixed(2)}%`}
          </div>
        </div>
      )}
    </div>
  );
}

