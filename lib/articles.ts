import { Article, ArticleCategory } from '@/types/article';

// Structure interne avec traductions FR/EN
interface ArticleData {
  id: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  contentFr: string;
  contentEn: string;
  category: ArticleCategory;
  date: string;
  author?: string;
  image?: string;
  featured?: boolean;
}

const articlesData: ArticleData[] = [
  {
    id: '1',
    titleFr: 'WA-AMIR ST V1 maintenant ouvert au whitelist !',
    titleEn: 'WA-AMIR ST V1 now open to whitelist!',
    excerptFr: 'Après 7 mois de fonctionnement en phase privée, WA-AMIR ST V1 est désormais accessible aux membres whitelist.',
    excerptEn: 'After 7 months of operation in private phase, WA-AMIR ST V1 is now accessible to whitelist members.',
    contentFr: `
# WA-AMIR ST V1 - Ouverture pour les membres whitelist !

Nous sommes ravis d'annoncer que WA-AMIR ST V1 **ouvrira entre le 24.11 et 30.11** pour les **membres whitelist**.

## Phase privée réussie

WA-AMIR ST V1 fonctionne depuis **avril 2025** en phase privée, avec des résultats exceptionnels :
- Performance YTD de +150.89% au moment de l'ouverture (7 mois : avril à octobre)
- 7 mois de performance continue en phase privée
- Gestion des risques maîtrisée

## Ouverture pour les membres whitelist

Après cette période de test réussie, nous ouvrons WA-AMIR ST V1 aux membres whitelist entre le 24.11 et 30.11. Cette phase d'ouverture limitée permettra de garantir une expérience optimale pour tous les utilisateurs.

## Comment commencer

1. Déposez votre capital sur votre compte chez un broker partenaire
2. Nous connectons WA-AMIR à votre compte
3. L'algorithme trade automatiquement à votre place
4. Vous pouvez laisser votre investissement fonctionner en toute autonomie

Pour toute question, n'hésitez pas à nous contacter via le formulaire d'accès.
    `,
    contentEn: `
# WA-AMIR ST V1 - Opening for whitelist members!

We are pleased to announce that WA-AMIR ST V1 **will open between 24.11 and 30.11** for **whitelist members**.

## Successful private phase

WA-AMIR ST V1 has been operating since **April 2025** in private phase, with exceptional results:
- YTD performance of +150.89% at the time of opening (7 months: April to October)
- 7 months of continuous performance in private phase
- Controlled risk management

## Opening for whitelist members

After this successful testing period, we are opening WA-AMIR ST V1 to whitelist members between 24.11 and 30.11. This limited opening phase will ensure an optimal experience for all users.

## How to get started

1. Deposit your capital into your account with a partner broker
2. We connect WA-AMIR to your account
3. The algorithm trades automatically on your behalf
4. You can let your investment run completely autonomously

For any questions, please do not hesitate to contact us via the access form.
    `,
    category: 'announcement',
    date: '2025-11-01',
    author: 'WASPALGO Team',
    featured: true,
  },
  {
    id: '7',
    titleFr: 'Optimisation majeure de WA-AMIR ST V1 - Version 1.2.0',
    titleEn: 'Major optimization of WA-AMIR ST V1 - Version 1.2.0',
    excerptFr: 'Nouvelle version avec amélioration des performances et réduction du drawdown maximal.',
    excerptEn: 'New version with performance improvements and maximum drawdown reduction.',
    contentFr: `
# Optimisation majeure de WA-AMIR ST V1 - Version 1.2.0

Nous sommes ravis d'annoncer la sortie de la version 1.2.0 de WA-AMIR ST V1, qui apporte des améliorations significatives en termes de performance et de stabilité.

## Améliorations principales

### Performance
- Réduction du drawdown maximal de 15%
- Amélioration de la détection des signaux de 12%
- Optimisation de l'exécution des ordres pour réduire la latence

### Stabilité
- Correction de plusieurs bugs mineurs
- Amélioration de la gestion des risques
- Nouveau système de monitoring en temps réel

### Nouvelles fonctionnalités
- Interface de monitoring améliorée
- Alertes personnalisables
- Export des données de performance

## Prochaines étapes

Nous continuons à travailler sur l'amélioration continue de WA-AMIR ST V1. La prochaine version (1.3.0) devrait inclure des améliorations supplémentaires pour la gestion des positions.

Pour toute question, n'hésitez pas à nous contacter.
    `,
    contentEn: `
# Major optimization of WA-AMIR ST V1 - Version 1.2.0

We are pleased to announce the release of version 1.2.0 of WA-AMIR ST V1, which brings significant improvements in terms of performance and stability.

## Main improvements

### Performance
- Maximum drawdown reduction of 15%
- Signal detection improvement of 12%
- Order execution optimization to reduce latency

### Stability
- Fixed several minor bugs
- Improved risk management
- New real-time monitoring system

### New features
- Improved monitoring interface
- Customizable alerts
- Performance data export

## Next steps

We continue to work on continuous improvement of WA-AMIR ST V1. The next version (1.3.0) should include additional improvements for position management.

For any questions, please do not hesitate to contact us.
    `,
    category: 'update',
    date: '2025-10-20',
    author: 'WASPALGO Team',
    featured: false,
  },
  {
    id: '2',
    titleFr: 'Nouveau record de performance : +34.51% en novembre 2025',
    titleEn: 'New performance record: +34.51% in November 2025',
    excerptFr: 'WA-AMIR ST V1 bat son record avec +34.51% en novembre, combinant performance exceptionnelle et risque minimal.',
    excerptEn: 'WA-AMIR ST V1 breaks its record with +34.51% in November, combining exceptional performance with minimal risk.',
    contentFr: `
# Nouveau record de performance : +34.51% en novembre 2025

Nous sommes fiers d'annoncer que WA-AMIR ST V1 a établi un **nouveau record de performance** en novembre 2025 avec un rendement mensuel de **+34.51%**.

## Un mois exceptionnel

Ce résultat remarquable dépasse le précédent record de +29.17% obtenu en juin, tout en maintenant un **niveau de risque exceptionnellement faible de seulement 2.0**.

## Détails de la performance

Cette performance exceptionnelle a été obtenue grâce à :
- Une détection précise et optimale des tendances sur XAUUSD
- Une gestion des risques maîtrisée, avec un ratio rendement/risque de 17.26
- Des conditions de marché favorables exploitées efficacement
- L'ouverture prévue entre le 24.11 et 30.11 pour les membres whitelist, validant la robustesse de l'algorithme

## Analyse

Novembre 2025 marque une étape importante pour WA-AMIR ST V1. Non seulement l'algorithme a atteint sa meilleure performance mensuelle, mais il l'a fait avec un risque minimal, démontrant l'efficacité des optimisations continues apportées au système.

Le fait que ce record ait été établi lors de l'ouverture pour les membres whitelist démontre la stabilité et la fiabilité de WA-AMIR ST V1 dans différentes conditions de marché.

## Performance YTD

Avec ce résultat, la performance Year-To-Date (YTD) de WA-AMIR ST V1 atteint désormais **+185.40%** sur 8 mois d'activité (avril à novembre 2025).

## Perspectives

Bien que les performances passées ne garantissent pas les résultats futurs, ce nouveau record confirme le potentiel exceptionnel de WA-AMIR ST V1 et sa capacité à générer des rendements significatifs tout en maintenant une gestion des risques rigoureuse.
    `,
    contentEn: `
# New performance record: +34.51% in November 2025

We are proud to announce that WA-AMIR ST V1 has set a **new performance record** in November 2025 with a monthly return of **+34.51%**.

## An exceptional month

This remarkable result surpasses the previous record of +29.17% achieved in June, while maintaining an **exceptionally low risk level of only 2.0**.

## Performance details

This exceptional performance was achieved thanks to:
- Precise and optimal trend detection on XAUUSD
- Controlled risk management, with a return/risk ratio of 17.26
- Favorable market conditions exploited effectively
- Opening scheduled between 24.11 and 30.11 for whitelist members, validating the algorithm's robustness

## Analysis

November 2025 marks an important milestone for WA-AMIR ST V1. Not only did the algorithm achieve its best monthly performance, but it did so with minimal risk, demonstrating the effectiveness of continuous optimizations made to the system.

The fact that this record was set during the opening for whitelist members demonstrates the stability and reliability of WA-AMIR ST V1 under different market conditions.

## YTD Performance

With this result, WA-AMIR ST V1's Year-To-Date (YTD) performance now reaches **+185.40%** over 8 months of activity (April to November 2025).

## Outlook

Although past performance does not guarantee future results, this new record confirms the exceptional potential of WA-AMIR ST V1 and its ability to generate significant returns while maintaining rigorous risk management.
    `,
    category: 'performance',
    date: '2025-11-20',
    author: 'WASPALGO Team',
    featured: true,
  },
  {
    id: '3',
    titleFr: 'Correction : Bug de synchronisation résolu',
    titleEn: 'Fix: Synchronization bug resolved',
    excerptFr: 'Correction d\'un bug mineur affectant la synchronisation des données de marché.',
    excerptEn: 'Fix for a minor bug affecting market data synchronization.',
    contentFr: `
# Correction : Bug de synchronisation résolu

Nous avons identifié et corrigé un bug mineur qui pouvait affecter la synchronisation des données de marché dans certaines conditions.

## Problème identifié

Le bug se manifestait par un léger délai dans la mise à jour des prix de marché dans de rares cas, principalement lors de pics de volatilité.

## Solution

Une mise à jour a été déployée qui améliore la robustesse du système de synchronisation. Le problème est maintenant complètement résolu.

## Impact

Aucun impact sur les performances ou la sécurité des utilisateurs. La correction a été appliquée de manière transparente.
    `,
    contentEn: `
# Fix: Synchronization bug resolved

We have identified and fixed a minor bug that could affect market data synchronization under certain conditions.

## Identified issue

The bug manifested as a slight delay in market price updates in rare cases, mainly during volatility spikes.

## Solution

An update has been deployed that improves the robustness of the synchronization system. The issue is now completely resolved.

## Impact

No impact on performance or user security. The fix was applied transparently.
    `,
    category: 'bugfix',
    date: '2025-10-15',
    author: 'WASPALGO Team',
    featured: false,
  },
  {
    id: '4',
    titleFr: 'WA-AMIR LT V1 : Mise à jour sur le développement',
    titleEn: 'WA-AMIR LT V1: Development update',
    excerptFr: 'Point d\'avancement sur le développement de WA-AMIR LT V1, version long terme.',
    excerptEn: 'Progress update on the development of WA-AMIR LT V1, long-term version.',
    contentFr: `
# WA-AMIR LT V1 : Mise à jour sur le développement

Nous souhaitons vous tenir informés de l'avancement du développement de WA-AMIR LT V1, notre version long terme de l'algorithme.

## État actuel

Le développement de WA-AMIR LT V1 progresse bien. Nous sommes actuellement en phase d'optimisation et de tests approfondis.

## Fonctionnalités prévues

- Horizon de trading : plusieurs semaines à plusieurs mois
- Gestion de portefeuille multi-marchés
- Approche macro-économique
- Fréquence de trading réduite mais plus sélective

## Calendrier

Nous prévoyons de finaliser les tests et d'annoncer une date de disponibilité dans les prochains mois. Restez connectés pour plus d'informations !
    `,
    contentEn: `
# WA-AMIR LT V1: Development update

We would like to keep you informed of the progress in developing WA-AMIR LT V1, our long-term version of the algorithm.

## Current status

Development of WA-AMIR LT V1 is progressing well. We are currently in the optimization and thorough testing phase.

## Planned features

- Trading horizon: several weeks to several months
- Multi-market portfolio management
- Macro-economic approach
- Reduced but more selective trading frequency

## Timeline

We plan to finalize testing and announce an availability date in the coming months. Stay tuned for more information!
    `,
    category: 'info',
    date: '2025-10-10',
    author: 'WASPALGO Team',
    featured: false,
  },
  {
    id: '5',
    titleFr: 'Nouveau partenariat avec un broker premium',
    titleEn: 'New partnership with premium broker',
    excerptFr: 'WASPALGO annonce un nouveau partenariat stratégique pour améliorer l\'expérience utilisateur.',
    excerptEn: 'WASPALGO announces a new strategic partnership to improve user experience.',
    contentFr: `
# Nouveau partenariat avec un broker premium

Nous sommes ravis d'annoncer un nouveau partenariat stratégique qui permettra d'améliorer significativement l'expérience de nos utilisateurs.

## Avantages du partenariat

- Plus facile pour les personnes sans connaissance en trading
- Interface simplifiée
- Configuration plus simple
- Support client dédié

## Pour nos utilisateurs

Ce partenariat se traduira par une meilleure expérience globale, avec des conditions plus avantageuses et un support renforcé.

Plus de détails seront communiqués dans les prochaines semaines.
    `,
    contentEn: `
# New partnership with premium broker

We are pleased to announce a new strategic partnership that will significantly improve our users' experience.

## Partnership benefits

- Easier for people without trading knowledge
- Simplified interface
- Simpler configuration
- Dedicated customer support

## For our users

This partnership will result in an overall better experience, with more favorable conditions and enhanced support.

More details will be communicated in the coming weeks.
    `,
    category: 'announcement',
    date: '2025-10-29',
    author: 'WASPALGO Team',
    featured: false,
  },
  {
    id: '6',
    titleFr: 'Amélioration de la gestion des risques - Octobre 2025',
    titleEn: 'Risk management improvement - October 2025',
    excerptFr: 'Nouveaux paramètres de gestion des risques pour une meilleure protection du capital.',
    excerptEn: 'New risk management parameters for better capital protection.',
    contentFr: `
# Amélioration de la gestion des risques - Octobre 2025

Nous avons introduit de nouvelles améliorations dans la gestion des risques de WA-AMIR ST V1.

## Nouvelles fonctionnalités

- Système de stop-loss dynamique amélioré
- Gestion plus fine de la taille des positions
- Alertes automatiques en cas de risque élevé

## Bénéfices

Ces améliorations permettent une meilleure protection du capital tout en maintenant le potentiel de performance de l'algorithme.
    `,
    contentEn: `
# Risk management improvement - October 2025

We have introduced new improvements in WA-AMIR ST V1 risk management.

## New features

- Improved dynamic stop-loss system
- Finer position sizing management
- Automatic alerts in case of high risk

## Benefits

These improvements allow for better capital protection while maintaining the algorithm's performance potential.
    `,
    category: 'update',
    date: '2025-10-05',
    author: 'WASPALGO Team',
    featured: false,
  },
];

// Helper function to convert ArticleData to Article based on language
function articleDataToArticle(data: ArticleData, language: 'fr' | 'en' = 'fr'): Article {
  return {
    id: data.id,
    title: language === 'en' ? data.titleEn : data.titleFr,
    excerpt: language === 'en' ? data.excerptEn : data.excerptFr,
    content: language === 'en' ? data.contentEn : data.contentFr,
    category: data.category,
    date: data.date,
    author: data.author,
    image: data.image,
    featured: data.featured,
  };
}

// Export functions that accept language parameter
export function getArticles(category?: ArticleCategory, language: 'fr' | 'en' = 'fr'): Article[] {
  let filtered = articlesData;
  if (category) {
    filtered = articlesData.filter(article => article.category === category);
  }
  // Trier par date décroissante (du plus récent au plus ancien)
  const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sorted.map(data => articleDataToArticle(data, language));
}

export function getArticleById(id: string, language: 'fr' | 'en' = 'fr'): Article | undefined {
  const data = articlesData.find(article => article.id === id);
  return data ? articleDataToArticle(data, language) : undefined;
}

export function getFeaturedArticles(count: number = 3, language: 'fr' | 'en' = 'fr'): Article[] {
  return articlesData
    .filter(article => article.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
    .map(data => articleDataToArticle(data, language));
}

export function getLatestArticles(count: number = 3, language: 'fr' | 'en' = 'fr'): Article[] {
  return articlesData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
    .map(data => articleDataToArticle(data, language));
}
