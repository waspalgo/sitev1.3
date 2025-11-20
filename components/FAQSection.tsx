'use client';

import { useState } from 'react';
import { FAQItem } from '@/lib/faq';
import PrimaryButton from './PrimaryButton';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItemWithText extends FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  showViewAllButton?: boolean;
  title?: string | null;
  subtitle?: string | null;
}

export default function FAQSection({
  items,
  showViewAllButton = false,
  title,
  subtitle,
}: FAQSectionProps) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const defaultTitle = t('home.faq.title');
  const defaultSubtitle = t('home.faq.subtitle');
  
  // Si title est explicitement null, ne pas afficher de titre
  // Sinon, utiliser title si fourni, sinon le defaultTitle
  const displayTitle = title === null ? null : (title !== undefined && title !== '' ? title : defaultTitle);
  const displaySubtitle = subtitle === null ? null : (subtitle !== undefined && subtitle !== '' ? subtitle : defaultSubtitle);

  // Convert FAQ items to include translated text
  const itemsWithText: FAQItemWithText[] = items.map(item => ({
    ...item,
    question: item.questionKey ? t(item.questionKey) : (item as any).question || '',
    answer: item.answerKey ? t(item.answerKey) : (item as any).answer || '',
  }));

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Icons for different question types
  const getQuestionIcon = (question: string) => {
    if (question.includes('argent') || question.includes('capital') || question.includes('money')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (question.includes('risque') || question.includes('risk')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    }
    if (question.includes('coûte') || question.includes('prix') || question.includes('cost') || question.includes('price')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (question.includes('fonctionne') || question.includes('24/7') || question.includes('works') || question.includes('function')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (question.includes('perdre') || question.includes('lose') || question.includes('loss')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    // Default icon
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <section className={`${title ? 'section-padding' : 'pt-6 pb-12 md:pt-8 md:pb-12'} px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden`}>
      <BackgroundLights 
        variant="subtle" 
        uniqueId="faq-section"
        positions={{
          orb1: { top: '25%', left: '60%' },
          orb2: { bottom: '25%', right: '25%' },
          orb3: { top: '50%', left: '20%' },
        }}
        sizes={{ orb1: 300, orb2: 350, orb3: 280 }}
      />
      <div className="content-container max-w-4xl relative" style={{ zIndex: 1 }}>
        {(displayTitle || displaySubtitle) && (
          <>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
              {displayTitle}
            </h2>
            <p className="text-text-secondary text-center mb-8 md:mb-10 text-lg">
              {displaySubtitle}
            </p>
          </>
        )}

        <div className="space-y-4">
          {itemsWithText.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl bg-gradient-to-br from-purple-primary/10 via-bg-secondary/80 to-bg-secondary p-0 border transition-all duration-500 ease-out overflow-hidden cursor-pointer group relative ${
                openIndex === index 
                  ? 'border-purple-accent/50 shadow-lg shadow-purple-accent/20 scale-[1.01]' 
                  : 'border-purple-accent/20 hover:border-purple-accent/40 hover:scale-[1.005]'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleItem(index);
              }}
            >
              {/* Glow effect when open */}
              {openIndex === index && (
                <div
                  className="absolute -inset-1 rounded-3xl blur-xl opacity-30 -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                  }}
                />
              )}

              <div className="p-6 relative">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-purple-accent/20 text-purple-accent scale-110'
                      : 'bg-purple-primary/10 text-purple-accent/70 group-hover:bg-purple-primary/20 group-hover:scale-105'
                  }`}>
                    {getQuestionIcon(item.question)}
                  </div>

                  {/* Question */}
                  <div className="flex-1 min-w-0">
                    <h3 
                      className={`text-lg font-semibold pr-8 transition-colors duration-300 ${
                        openIndex === index ? 'text-purple-accent' : 'text-text-primary'
                      }`}
                    >
                      {item.question.replace(/(\S)\s+(\?)/g, '$1\u00A0$2').replace(/(\S)(\?)/g, '$1\u00A0$2')}
                    </h3>
                  </div>
                  {/* Arrow */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full ${
                      openIndex === index 
                        ? 'rotate-180 text-purple-accent scale-110 bg-purple-accent/10' 
                        : 'rotate-0 text-purple-accent/70 group-hover:bg-purple-accent/5'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className="overflow-hidden"
                style={{
                  maxHeight: openIndex === index ? '1000px' : '0px',
                  opacity: openIndex === index ? 1 : 0,
                  transform: openIndex === index ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-out 0.1s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="px-6 pb-6 pt-4 ml-14 border-l-2 border-purple-accent/20">
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showViewAllButton && (
          <div className="text-center mt-12">
            <PrimaryButton href="/faq">
              {t('home.faq.viewAll')}
            </PrimaryButton>
          </div>
        )}
      </div>
    </section>
  );
}

