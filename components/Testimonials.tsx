'use client';

import { useState } from 'react';
import GlassCard from './GlassCard';
import ScrollReveal from './ScrollReveal';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}

const testimonialsFr: Testimonial[] = [
  {
    name: 'Alexandre M.',
    role: 'Étudiant',
    content: 'Cet algorithme me permet de me faire un revenu passif tout en continuant mes études. Il s\'occupe de tout automatiquement. Les bénéfices sont au rendez-vous. Je recommande vivement.',
    rating: 5,
    date: 'Novembre 2025',
  },
  {
    name: 'Mehdi A.',
    role: 'Livreur',
    content: 'Je n\'y connais rien en investissement, finance, etc. et pourtant grâce à cet algorithme je peux générer des bénéfices. C\'est simple, je dépose mon argent et l\'algorithme travaille pour moi. Parfait pour quelqu\'un comme moi qui n\'a pas le temps de s\'occuper de ça.',
    rating: 5,
    date: 'Novembre 2025',
  },
  {
    name: 'Tom S.',
    role: 'Cuisinier',
    content: 'Depuis que j\'ai testé cet algorithme, je n\'ai plus envie de garder autant d\'argent qui dort à la banque. Maintenant mon épargne travaille pour moi automatiquement. Les résultats sont là et je peux me concentrer sur mon travail sans m\'inquiéter.',
    rating: 5,
    date: 'Novembre 2025',
  },
  {
    name: 'Emma C.',
    role: 'Employée de commerce',
    content: 'Enfin une solution qui me permet de profiter des marchés sans avoir à surveiller constamment. L\'accompagnement humain au début est un vrai plus. Cela me permet de me faire un revenu passif supplémentaire tout en gardant mon emploi.',
    rating: 5,
    date: 'Novembre 2025',
  },
];

const testimonialsEn: Testimonial[] = [
  {
    name: 'Alexandre M.',
    role: 'Student',
    content: 'This algorithm allows me to generate passive income while continuing my studies. It handles everything automatically. The profits are there. I highly recommend it.',
    rating: 5,
    date: 'November 2025',
  },
  {
    name: 'Mehdi A.',
    role: 'Delivery Driver',
    content: 'I know nothing about investment, finance, etc. and yet thanks to this algorithm I can generate profits. It\'s simple, I deposit my money and the algorithm works for me. Perfect for someone like me who doesn\'t have time to manage this.',
    rating: 5,
    date: 'November 2025',
  },
  {
    name: 'Tom S.',
    role: 'Chef',
    content: 'Since I tried this algorithm, I no longer want to keep so much money sitting in the bank. Now my savings work for me automatically. The results are there and I can focus on my work without worrying.',
    rating: 5,
    date: 'November 2025',
  },
  {
    name: 'Emma C.',
    role: 'Retail Employee',
    content: 'Finally, a solution that allows me to benefit from markets without constantly monitoring. The human support at the beginning is a real plus. This allows me to generate additional passive income while keeping my job.',
    rating: 5,
    date: 'November 2025',
  },
];

export default function Testimonials() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = language === 'fr' ? testimonialsFr : testimonialsEn;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="subtle" 
        uniqueId="testimonials"
        positions={{
          orb1: { top: '30%', right: '30%' },
          orb2: { bottom: '30%', left: '30%' },
          orb3: { top: '25%', left: '50%' },
        }}
        sizes={{ orb1: 350, orb2: 320, orb3: 300 }}
      />
      <div className="content-container relative" style={{ zIndex: 1 }}>
        <ScrollReveal>
          <div className="text-center mb-12 relative">
            <span className="inline-block px-4 py-2 bg-purple-primary/20 border border-purple-accent/30 rounded-full text-sm text-purple-accent font-medium mb-4">
              {t('home.testimonials.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 relative z-10">
              <span className="relative">
                {t('home.testimonials.title')}
                {/* Lumière néon violette qui déborde */}
                <span 
                  className="absolute -inset-4 blur-3xl opacity-40 -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(139, 92, 246, 0.4) 30%, rgba(109, 40, 217, 0.2) 60%, transparent 100%)',
                    filter: 'blur(40px)',
                  }}
                />
              </span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Découvrez les retours de ceux qui investissent déjà avec WA-AMIR.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="max-w-4xl mx-auto">
            <GlassCard variant="feature" className="p-8 md:p-12 relative overflow-hidden min-h-[500px] md:min-h-[550px] flex flex-col">
              {/* Navigation buttons - repositioned for mobile */}
              <button
                onClick={prevTestimonial}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-primary/30 border-2 border-purple-accent/50 hover:bg-purple-primary/40 hover:border-purple-accent/70 transition-all duration-200 flex items-center justify-center group shadow-lg"
                aria-label="Témoignage précédent"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-purple-accent group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-primary/30 border-2 border-purple-accent/50 hover:bg-purple-primary/40 hover:border-purple-accent/70 transition-all duration-200 flex items-center justify-center group shadow-lg"
                aria-label="Témoignage suivant"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-purple-accent group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center flex-shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-lg md:text-xl lg:text-2xl text-text-primary mb-6 md:mb-8 text-center leading-relaxed flex-1 flex items-center justify-center min-h-[200px] px-8 md:px-4">
                &ldquo;{currentTestimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="text-center flex-shrink-0">
                <p className="text-lg font-semibold text-text-primary mb-1">{currentTestimonial.name}</p>
                <p className="text-sm text-text-secondary mb-2">{currentTestimonial.role}</p>
                <p className="text-xs text-text-muted">{currentTestimonial.date}</p>
              </div>

              {/* Dots indicator */}
              <div className="flex gap-2 justify-center mt-8 flex-shrink-0">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-purple-accent w-8'
                        : 'bg-purple-accent/30 hover:bg-purple-accent/50'
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

