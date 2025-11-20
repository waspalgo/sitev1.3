# 📊 Intégration des données de marché en temps réel

## 🎯 Vue d'ensemble

La section "Aperçu des marchés" affiche maintenant des données en temps réel pour :
- **XAUUSD** (Or)
- **BTCUSD** (Bitcoin)
- **Indice global** (S&P 500)

Les données se rafraîchissent automatiquement toutes les 15 secondes.

## ⚙️ Configuration

### 1. Obtenir une clé API

**Recommandé : Alpha Vantage (gratuit)**
1. Inscrivez-vous sur [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Obtenez votre clé API gratuite (5 appels/min, 500 appels/jour)

**Alternative : Twelve Data (meilleur support Forex/Crypto)**
1. Inscrivez-vous sur [Twelve Data](https://twelvedata.com/)
2. Obtenez votre clé API gratuite (800 appels/jour)

### 2. Configurer la clé API

1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez votre clé API :

```env
MARKET_DATA_API_KEY=votre_cle_api_ici
```

3. Redémarrez le serveur de développement (`npm run dev`)

## 📁 Structure des fichiers

```
├── app/
│   └── api/
│       └── markets/
│           └── route.ts          # Route API Next.js
├── components/
│   └── MarketsSection.tsx       # Composant client avec rafraîchissement auto
├── lib/
│   └── marketData.ts             # Utilitaires pour appeler l'API externe
└── types/
    └── markets.ts                # Types TypeScript
```

## 🔄 Fonctionnement

1. **Route API** (`/api/markets`) :
   - Appelle l'API externe (Alpha Vantage)
   - Retourne les données formatées en JSON
   - Cache les réponses pendant 60 secondes
   - Retourne des valeurs de fallback en cas d'erreur

2. **Composant client** (`MarketsSection`) :
   - Charge les données au montage
   - Rafraîchit automatiquement toutes les 15 secondes
   - Affiche "—" pendant le chargement initial
   - Utilise les valeurs de fallback si l'API échoue

## 🎨 Design

Le design reste **exactement identique** à la version précédente :
- Même structure visuelle
- Mêmes couleurs (violet, dark theme)
- Même sparkline (courbe violette)
- Même formatage des prix

## ⚠️ Limitations Alpha Vantage

- **5 appels par minute maximum**
- **500 appels par jour maximum**
- Ne supporte pas directement XAUUSD → utilise GLD (ETF Or) comme proxy
- Ne supporte pas directement BTCUSD → utilise BITO (ETF Bitcoin) comme proxy

Pour un usage en production avec de vraies données Forex/Crypto, considérez **Twelve Data** qui supporte directement ces symboles.

## 🐛 Dépannage

### Les données ne se chargent pas

1. Vérifiez que `.env.local` existe et contient `MARKET_DATA_API_KEY`
2. Vérifiez que la clé API est valide
3. Vérifiez la console du navigateur pour les erreurs
4. Vérifiez les logs du serveur Next.js

### Erreur "API rate limit exceeded"

Alpha Vantage limite à 5 appels/min. Solutions :
- Augmentez l'intervalle de rafraîchissement (dans `MarketsSection.tsx`)
- Utilisez une autre API (Twelve Data recommandé)
- Implémentez un cache plus agressif

### Les valeurs affichées sont les fallbacks

Cela signifie que l'API ne répond pas. Vérifiez :
- Votre connexion internet
- La validité de votre clé API
- Les limites de votre plan API

## 🔧 Personnalisation

### Changer l'intervalle de rafraîchissement

Dans `components/MarketsSection.tsx`, modifiez :

```typescript
const REFRESH_INTERVAL = 15000; // 15 secondes (en millisecondes)
```

### Changer le provider d'API

Modifiez `lib/marketData.ts` pour utiliser une autre API. Les fonctions `getQuote()` et `getIntradayHistory()` doivent être adaptées selon le format de réponse de l'API choisie.

### Ajouter d'autres actifs

1. Ajoutez une fonction dans `lib/marketData.ts` (ex: `getETHData()`)
2. Ajoutez le type dans `types/markets.ts`
3. Mettez à jour `app/api/markets/route.ts`
4. Ajoutez une nouvelle `MetricCard` dans `components/MarketsSection.tsx`



