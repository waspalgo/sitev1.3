'use client';

import { notFound, useParams } from 'next/navigation';
import { getArticleById, getLatestArticles } from '@/lib/articles';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { categoryLabels, categoryColors } from '@/types/article';
import GlassCard from '@/components/GlassCard';
import ArticleCard from '@/components/ArticleCard';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

export default function ArticleDetailPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const [article, setArticle] = useState(getArticleById(params?.id as string, language));
  const [latestArticles, setLatestArticles] = useState(getLatestArticles(3, language).filter(a => a.id !== params?.id));

  useEffect(() => {
    const art = getArticleById(params?.id as string, language);
    setArticle(art);
    if (art) {
      setLatestArticles(getLatestArticles(3, language).filter(a => a.id !== params?.id));
    }
  }, [params?.id, language]);

  if (!article) {
    notFound();
  }

  const formattedDate = format(new Date(article.date), 'd MMMM yyyy', { locale: language === 'fr' ? fr : enUS });
  const categoryLabelKey = `home.articles.categories.${article.category}`;
  const categoryLabel = t(categoryLabelKey) !== categoryLabelKey ? t(categoryLabelKey) : categoryLabels[article.category];
  const categoryColor = categoryColors[article.category];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-bg-primary relative">
        <div className="content-container">
          <ScrollReveal>
            <div className="mb-8">
              <Link
                href="/actualite"
                className="inline-flex items-center gap-2 text-purple-accent hover:text-purple-300 transition-colors duration-300 mb-6 group"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{t('home.articles.backToNews')}</span>
              </Link>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              {/* Category and Date */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${categoryColor}`}
                >
                  {categoryLabel}
                </span>
                <span className="text-text-muted text-sm">{formattedDate}</span>
                {article.author && (
                  <span className="text-text-muted text-sm">{t('home.articles.by')} {article.author}</span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight">
                {article.title}
              </h1>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal delay={100}>
              <GlassCard variant="feature" className="p-8 md:p-12 mb-12">
                <div
                  className="prose prose-invert prose-purple max-w-none
                    prose-headings:text-text-primary prose-headings:font-bold
                    prose-p:text-text-secondary prose-p:leading-relaxed
                    prose-a:text-purple-accent prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-text-primary
                    prose-ul:text-text-secondary prose-li:text-text-secondary
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: article.content
                      .split('\n')
                      .map((line) => {
                        // Simple markdown to HTML conversion
                        if (line.startsWith('# ')) {
                          return `<h1>${line.slice(2)}</h1>`;
                        }
                        if (line.startsWith('## ')) {
                          return `<h2>${line.slice(3)}</h2>`;
                        }
                        if (line.startsWith('### ')) {
                          return `<h3>${line.slice(4)}</h3>`;
                        }
                        if (line.startsWith('- ')) {
                          return `<li>${line.slice(2)}</li>`;
                        }
                        if (line.trim() === '') {
                          return '<br />';
                        }
                        if (line.includes('**')) {
                          return `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
                        }
                        return `<p>${line}</p>`;
                      })
                      .join(''),
                  }}
                />
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Related Articles */}
          {latestArticles.length > 0 && (
            <ScrollReveal delay={200}>
              <div className="max-w-7xl mx-auto mt-16">
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
                  {t('home.articles.otherArticles')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestArticles.map((relatedArticle, index) => (
                    <ScrollReveal key={relatedArticle.id} delay={index * 50}>
                      <ArticleCard article={relatedArticle} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}

