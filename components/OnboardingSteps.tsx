'use client';

import GlassCard from './GlassCard';
import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

export default function OnboardingSteps() {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      title: t('home.onboarding.steps.step1.title'),
      description: t('home.onboarding.steps.step1.description'),
    },
    {
      number: 2,
      title: t('home.onboarding.steps.step2.title'),
      description: t('home.onboarding.steps.step2.description'),
    },
    {
      number: 3,
      title: t('home.onboarding.steps.step3.title'),
      description: t('home.onboarding.steps.step3.description'),
    },
    {
      number: 4,
      title: t('home.onboarding.steps.step4.title'),
      description: t('home.onboarding.steps.step4.description'),
    },
    {
      number: 5,
      title: t('home.onboarding.steps.step5.title'),
      description: t('home.onboarding.steps.step5.description'),
    },
  ];
  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="intense" 
        uniqueId="onboarding"
        positions={{
          orb1: { top: '25%', left: '20%' },
          orb2: { bottom: '30%', right: '20%' },
          orb3: { top: '50%', left: '70%' },
        }}
        sizes={{ orb1: 420, orb2: 400, orb3: 380 }}
      />
      <div className="content-container relative" style={{ zIndex: 1 }}>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {t('home.onboarding.title')}
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              {t('home.onboarding.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-purple-accent/20 transform -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 100}>
                <div className="flex items-start gap-8">
                  {/* Step Number */}
                  <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-purple-primary/20 border-2 border-purple-accent items-center justify-center relative z-10">
                    <span className="text-2xl font-bold text-purple-accent">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 relative">
                    <div className="md:hidden mb-4">
                      <div className="inline-flex w-12 h-12 rounded-full bg-purple-primary/20 border-2 border-purple-accent items-center justify-center">
                        <span className="text-xl font-bold text-purple-accent">{step.number}</span>
                      </div>
                    </div>
                    {/* Lumière néon violette qui déborde derrière le bloc */}
                    <div 
                      className="absolute -inset-8 blur-3xl opacity-30 -z-10"
                      style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(139, 92, 246, 0.3) 40%, rgba(109, 40, 217, 0.15) 70%, transparent 100%)',
                        filter: 'blur(50px)',
                      }}
                    />
                    <GlassCard className="p-8 relative z-0">
                      <h3 className="text-2xl font-bold text-text-primary mb-3">{step.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{step.description}</p>
                    </GlassCard>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

