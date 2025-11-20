'use client';

import GlassCard from '@/components/GlassCard';
import RiskDisclaimer from '@/components/RiskDisclaimer';
import PrimaryButton from '@/components/PrimaryButton';
import StatusBadge from '@/components/StatusBadge';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WaAmirStPage() {
  const { t } = useLanguage();
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              WA-AMIR ST V1 – Short Term
            </h1>
            <StatusBadge status="active" size="md" />
          </div>
        </ScrollReveal>
        <p className="text-lg text-text-secondary mb-12">
          {t('waAmirSt.intro')}
        </p>

        {/* Architecture générale */}
        <section className="mb-12">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t('waAmirSt.architecture.title')}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t('waAmirSt.architecture.p1')}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t('waAmirSt.architecture.p2')}
            </p>
          </GlassCard>
        </section>

        {/* Horizon & style */}
        <section className="mb-12">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {t('waAmirSt.horizon.title')}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t('waAmirSt.horizon.p1')}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t('waAmirSt.horizon.p2')}
            </p>
          </GlassCard>
        </section>

        {/* Actifs concernés */}
        <section className="mb-12">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t('waAmirSt.assets.title')}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t('waAmirSt.assets.p1')}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t('waAmirSt.assets.p2')}
            </p>
          </GlassCard>
        </section>

        {/* Backtests */}
        <section className="mb-12">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {t('waAmirSt.backtests.title')}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t('waAmirSt.backtests.p1')}
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t('waAmirSt.backtests.p2')}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t('waAmirSt.backtests.p3')}
            </p>
          </GlassCard>
        </section>

        {/* Votre rôle */}
        <section className="mb-12">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {t('waAmirSt.role.title')}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t('waAmirSt.role.p1')}
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t('waAmirSt.role.p2')}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t('waAmirSt.role.p3')}
            </p>
          </GlassCard>
        </section>

        {/* Risk Disclaimer */}
        <section className="mb-12">
          <RiskDisclaimer />
        </section>

        {/* CTA */}
        <section className="text-center">
          <PrimaryButton href="/acces?algo=wa-amir-st">
            {t('waAmirSt.cta')}
          </PrimaryButton>
        </section>
      </div>
    </div>
  );
}

