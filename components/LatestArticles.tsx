'use client';

import { getLatestArticles } from '@/lib/articles';
import ArticleCard from './ArticleCard';
import ScrollReveal from './ScrollReveal';
import Link from 'next/link';
import BackgroundLights from './BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LatestArticles() {
  const { t, language } = useLanguage();
  const articles = getLatestArticles(3, language);

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="default" 
        uniqueId="articles"
        positions={{
          orb1: { bottom: '25%', left: '25%' },
          orb2: { top: '30%', right: '30%' },
          orb3: { bottom: '50%', right: '20%' },
        }}
        sizes={{ orb1: 380, orb2: 360, orb3: 340 }}
      />
      <div className="content-container relative" style={{ zIndex: 1 }}>
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-purple-primary/20 border border-purple-accent/30 rounded-full text-sm text-purple-accent font-medium mb-4">
              {t('home.articles.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {t('home.articles.title')}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {t('home.articles.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
            {articles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 50}>
                <ArticleCard article={article} featured={article.featured} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center">
            <Link
              href="/actualite"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-primary/20 border border-purple-accent/30 text-purple-accent font-semibold hover:bg-purple-primary/30 hover:border-purple-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-accent/20"
            >
              <span>{t('home.articles.viewAll')}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

