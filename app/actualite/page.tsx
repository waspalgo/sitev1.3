'use client';

import { useState } from 'react';
import { Article, ArticleCategory, categoryLabels } from '@/types/article';
import { getArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import ScrollReveal from '@/components/ScrollReveal';
import GlassCard from '@/components/GlassCard';
import BackgroundLights from '@/components/BackgroundLights';
import { useLanguage } from '@/contexts/LanguageContext';

const categories: ArticleCategory[] = ['update', 'performance', 'info', 'bugfix', 'announcement'];

export default function ActualitePage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | null>(null);
  const allArticles = getArticles(selectedCategory || undefined, language);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative overflow-hidden">
        <BackgroundLights 
          variant="default" 
          uniqueId="actualites-hero"
          positions={{
            orb1: { top: '20%', left: '15%' },
            orb2: { bottom: '25%', right: '20%' },
            orb3: { top: '50%', right: '40%' },
          }}
          sizes={{ orb1: 400, orb2: 380, orb3: 360 }}
        />
        <BackgroundLights 
          variant="subtle" 
          uniqueId="actualites-content"
          positions={{
            orb1: { top: '60%', left: '30%' },
            orb2: { bottom: '20%', left: '50%' },
            orb3: { top: '30%', right: '25%' },
          }}
          sizes={{ orb1: 320, orb2: 300, orb3: 340 }}
        />
        <div className="content-container relative" style={{ zIndex: 1 }}>
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-purple-primary/20 border border-purple-accent/30 rounded-full text-sm text-purple-accent font-medium mb-4">
                {t('home.articles.badge')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                {t('home.articles.pageTitle')}
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                {t('home.articles.pageSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filters */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-purple-primary text-white border border-purple-accent shadow-lg shadow-purple-accent/20'
                    : 'bg-black/30 text-text-secondary border border-purple-accent/20 hover:border-purple-accent/40 hover:bg-black/40'
                }`}
              >
                {t('home.articles.all')}
              </button>
              {categories.map((category) => {
                const categoryLabelKey = `home.articles.categories.${category}`;
                const categoryLabel = t(categoryLabelKey) !== categoryLabelKey ? t(categoryLabelKey) : categoryLabels[category];
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-purple-primary text-white border border-purple-accent shadow-lg shadow-purple-accent/20'
                        : 'bg-black/30 text-text-secondary border border-purple-accent/20 hover:border-purple-accent/40 hover:bg-black/40'
                    }`}
                  >
                    {categoryLabel}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Articles Grid */}
          <ScrollReveal delay={200}>
            {allArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {allArticles.map((article, index) => (
                  <ScrollReveal key={article.id} delay={index * 50}>
                    <ArticleCard article={article} featured={article.featured} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <GlassCard variant="feature" className="p-12 text-center">
                <p className="text-text-secondary text-lg">
                  {t('home.articles.noArticles')}
                </p>
              </GlassCard>
            )}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

