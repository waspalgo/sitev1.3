export type ArticleCategory = 'update' | 'performance' | 'info' | 'bugfix' | 'announcement';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  date: string;
  author?: string;
  image?: string;
  featured?: boolean;
}

// Note: categoryLabels are now translated in components using useLanguage hook
// This is kept for backward compatibility but should not be used directly
export const categoryLabels: Record<ArticleCategory, string> = {
  update: 'Mise à jour',
  performance: 'Performance',
  info: 'Information',
  bugfix: 'Correction',
  announcement: 'Annonce',
};

export const categoryColors: Record<ArticleCategory, string> = {
  update: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  performance: 'bg-green-500/20 text-green-400 border-green-500/30',
  info: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  bugfix: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  announcement: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

