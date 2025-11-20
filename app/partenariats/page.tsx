'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';
import BackgroundLights from '@/components/BackgroundLights';
import PrimaryButton from '@/components/PrimaryButton';
import Link from 'next/link';

export default function PartnershipsPage() {
  const { t } = useLanguage();

  const partnershipTypes = [
    {
      title: t('partnerships.types.influencer.title'),
      description: t('partnerships.types.influencer.description'),
    },
    {
      title: t('partnerships.types.broker.title'),
      description: t('partnerships.types.broker.description'),
    },
    {
      title: t('partnerships.types.community.title'),
      description: t('partnerships.types.community.description'),
    },
    {
      title: t('partnerships.types.other.title'),
      description: t('partnerships.types.other.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="default" 
        uniqueId="partnerships-hero"
        positions={{
          orb1: { top: '25%', left: '30%' },
          orb2: { bottom: '25%', right: '25%' },
          orb3: { top: '50%', right: '45%' },
        }}
        sizes={{ orb1: 450, orb2: 380, orb3: 320 }}
      />

      {/* Hero Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              {t('partnerships.title')}
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto">
              {t('partnerships.intro')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12 text-center">
              {t('partnerships.types.title')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {partnershipTypes.map((type, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <GlassCard variant="feature" className="h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
                      {type.title}
                    </h3>
                    <p className="text-text-muted">
                      {type.description}
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact Section */}
          <ScrollReveal delay={400}>
            <GlassCard variant="feature" glow className="max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  {t('partnerships.contact.title')}
                </h3>
                <p className="text-text-muted mb-6">
                  {t('partnerships.contact.description')}
                </p>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <svg
                    className="w-5 h-5 text-purple-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-purple-accent font-medium text-lg">
                    {t('partnerships.contact.email')}
                  </span>
                </div>
                <Link
                  href="/partenariats/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-purple-primary/20 border border-purple-accent/30 hover:border-purple-accent/50 hover:bg-purple-primary/30 transition-all duration-300 text-purple-accent font-medium"
                >
                  {t('partnerships.contact.button')}
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

