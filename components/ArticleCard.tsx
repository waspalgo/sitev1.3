'use client';

import Link from 'next/link';
import { Article, categoryLabels, categoryColors } from '@/types/article';
import GlassCard from './GlassCard';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { t, language } = useLanguage();
  const categoryLabelKey = `home.articles.categories.${article.category}`;
  const categoryLabel = t(categoryLabelKey) !== categoryLabelKey ? t(categoryLabelKey) : categoryLabels[article.category];
  const categoryColor = categoryColors[article.category];
  const formattedDate = format(new Date(article.date), 'd MMMM yyyy', { locale: language === 'fr' ? fr : enUS });

  return (
    <Link href={`/actualite/${article.id}`} className="h-full block">
      <GlassCard
        variant="feature"
        className="h-full flex flex-col group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-purple-accent/10"
      >
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor} transition-all duration-300 group-hover:scale-105`}
          >
            {categoryLabel}
          </span>
          {featured && (
            <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold border border-purple-500/30">
              {t('home.articleCard.featured')}
            </span>
          )}
        </div>

        {/* Date */}
        <p className="text-xs text-text-muted mb-3 flex-shrink-0">{formattedDate}</p>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-purple-accent transition-colors duration-300 line-clamp-2 flex-shrink-0">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Read more */}
        <div className="flex items-center gap-2 text-purple-accent text-sm font-medium group-hover:gap-3 transition-all duration-300 flex-shrink-0 mt-auto">
          <span>{t('home.articleCard.readMore')}</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </GlassCard>
    </Link>
  );
}

