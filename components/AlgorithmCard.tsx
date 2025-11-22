'use client';

import Link from 'next/link';
import GlassCard from './GlassCard';
import PrimaryButton from './PrimaryButton';
import StatusBadge from './StatusBadge';
import { useLanguage } from '@/contexts/LanguageContext';

interface AlgorithmCardProps {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor?: 'available' | 'coming-soon';
  bullets: string[];
  learnMoreHref: string;
  accessHref?: string;
  accessDisabled?: boolean;
  accessLabel?: string;
  status?: 'active' | 'inactive';
  proHref?: string;
}

export default function AlgorithmCard({
  title,
  subtitle,
  description,
  badge,
  badgeColor = 'available',
  bullets,
  learnMoreHref,
  accessHref,
  accessDisabled = false,
  accessLabel,
  status,
  proHref,
}: AlgorithmCardProps) {
  const { t } = useLanguage();
  const defaultAccessLabel = t('home.algorithmCard.access');
  const isComingSoon = badgeColor === 'coming-soon';
  const showStatus = title.includes('ST V1') && status;

  return (
    <GlassCard
      className={`${isComingSoon ? 'opacity-75' : ''} h-full flex flex-col transition-transform duration-200 hover:scale-[1.05] hover:-translate-y-2`}
      glow={!isComingSoon}
    >
      <div className="flex items-start justify-between mb-4 flex-shrink-0">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                badgeColor === 'available'
                  ? 'bg-positive/20 text-positive border border-positive/30'
                  : 'bg-text-muted/20 text-text-muted border border-text-muted/30'
              }`}
            >
              {badge}
            </span>
            {showStatus && <StatusBadge status={status} size="sm" />}
            {isComingSoon && (
              <svg className="w-5 h-5 text-text-muted" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1 group-hover:text-purple-accent transition-colors duration-200">{title}</h3>
          <p className="text-text-muted text-sm mb-3">{subtitle}</p>
        </div>
      </div>

      <p className="text-text-secondary mb-4 flex-shrink-0">{description}</p>

      <ul className="space-y-2 mb-6 flex-1">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start text-sm text-text-muted">
            <span className="text-purple-accent mr-2">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <Link
          href={learnMoreHref}
          className="inline-flex items-center justify-center px-6 py-2 border border-purple-accent/30 hover:border-purple-accent rounded-2xl text-purple-accent hover:bg-purple-accent/10 text-center font-medium transition-colors duration-200"
        >
          {t('home.algorithmCard.learnMore')}
        </Link>
        <div className="flex gap-2">
          {accessHref && !accessDisabled ? (
            <PrimaryButton href={accessHref} className="text-sm px-6 py-2 flex-1">
              {accessLabel || defaultAccessLabel}
            </PrimaryButton>
          ) : (
            <button
              disabled
              className="px-6 py-2 bg-text-muted/20 text-text-muted rounded-2xl text-center font-medium cursor-not-allowed opacity-50 flex-1"
            >
              {accessLabel || t('home.algorithmCard.accessSoon')}
            </button>
          )}
          {proHref && (
            <Link
              href={proHref}
              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 text-white rounded-2xl text-center font-semibold text-sm transition-all duration-300 hover:scale-105 hover:from-slate-500 hover:via-slate-400 hover:to-slate-300"
            >
              PRO
            </Link>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

