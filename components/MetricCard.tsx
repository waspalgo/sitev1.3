import Sparkline from './Sparkline';
import GlassCard from './GlassCard';

interface MetricCardProps {
  title: string | React.ReactNode;
  value: string;
  change: number;
  sparklineData?: number[];
  isLoading?: boolean;
}

export default function MetricCard({ title, value, change, sparklineData, isLoading = false }: MetricCardProps) {
  const isPositive = change >= 0;
  const defaultData = Array.from({ length: 20 }, () => Math.random() * 100);

  return (
    <GlassCard className="p-6 hover:border-purple-accent/40 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-secondary text-sm group-hover:text-text-primary transition-colors duration-300">
          {isLoading ? (
            <span className="inline-block h-3 w-24 rounded-full bg-white/5 animate-pulse" />
          ) : (
            title
          )}
        </h3>
        {!isLoading && (
          <span className="text-[10px] text-text-muted/60 font-medium">
            15s
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-2xl font-bold text-text-primary group-hover:text-purple-accent transition-colors duration-300">
          {isLoading ? (
            <span className="inline-block h-6 w-20 rounded-full bg-white/10 animate-pulse" />
          ) : (
            value
          )}
        </span>
        {isLoading ? (
          <span className="inline-block h-4 w-14 rounded-full bg-white/10 animate-pulse" />
        ) : (
          <span
            className={`text-sm font-semibold transition-all duration-300 ${
              isPositive ? 'text-positive' : 'text-negative'
            } group-hover:scale-110`}
          >
            {isPositive ? '+' : ''}
            {change.toFixed(2)}%
          </span>
        )}
      </div>
      <div className="h-16">
        {isLoading ? (
          <div className="w-full h-full rounded-lg bg-white/5 animate-pulse" />
        ) : (
          <Sparkline data={sparklineData || defaultData} />
        )}
      </div>
    </GlassCard>
  );
}

