'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';
import BackgroundLights from '@/components/BackgroundLights';
import PrimaryButton from '@/components/PrimaryButton';
import Link from 'next/link';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactBlocks = [
    {
      title: t('contact.support.title'),
      email: t('contact.support.email'),
      description: t('contact.support.description'),
      button: t('contact.support.button'),
      href: '/contact/support',
    },
    {
      title: t('contact.general.title'),
      email: t('contact.general.email'),
      description: t('contact.general.description'),
      button: t('contact.general.button'),
      href: '/contact/info',
    },
    {
      title: t('contact.direct.title'),
      email: t('contact.direct.email'),
      description: t('contact.direct.description'),
      button: t('contact.direct.button'),
      href: '/contact/contact',
    },
    {
      title: t('contact.security.title'),
      email: t('contact.security.email'),
      description: t('contact.security.description'),
      button: t('contact.security.button'),
      href: '/contact/security',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="intense" 
        uniqueId="contact-hero"
        positions={{
          orb1: { top: '25%', left: '25%' },
          orb2: { bottom: '25%', right: '25%' },
          orb3: { top: '50%', right: '40%' },
        }}
        sizes={{ orb1: 500, orb2: 480, orb3: 450 }}
      />
      <BackgroundLights 
        variant="default" 
        uniqueId="contact-blocks"
        positions={{
          orb1: { top: '30%', right: '30%' },
          orb2: { bottom: '30%', left: '30%' },
          orb3: { top: '60%', right: '20%' },
        }}
        sizes={{ orb1: 400, orb2: 380, orb3: 360 }}
      />

      {/* Hero Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-block px-4 py-2 rounded-full bg-purple-primary/20 border border-purple-accent/30 mb-6">
              <span className="text-sm font-medium text-purple-accent">
                {t('common.contact')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8">
              {t('contact.subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Blocks */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-28 relative overflow-hidden -mt-8" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactBlocks.map((block, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <GlassCard variant="feature" className="h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
                      {block.title}
                    </h3>
                    <p className="text-text-muted mb-6">
                      {block.description}
                    </p>
                    <div className="flex items-center gap-3 mb-6">
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
                      <span className="text-purple-accent font-medium">
                        {block.email}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={block.href}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-primary/20 border border-purple-accent/30 hover:border-purple-accent/50 hover:bg-purple-primary/30 transition-all duration-300 text-purple-accent font-medium"
                  >
                    {block.button}
                  </Link>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Partnership Block */}
          <ScrollReveal delay={400}>
            <GlassCard variant="feature" glow className="mb-12">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  {t('contact.partnership.title')}
                </h3>
                <p className="text-text-muted mb-8 max-w-2xl mx-auto">
                  {t('contact.partnership.description')}
                </p>
                <PrimaryButton href="/partenariats">
                  {t('contact.partnership.button')}
                </PrimaryButton>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Response Time */}
          <ScrollReveal delay={500}>
            <div className="text-center">
              <p className="text-text-muted text-sm">
                {t('contact.responseTime')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

