# WASPALGO Website

Site officiel de WASPALGO, plateforme de technologie algorithmique de trading avec le moteur WA-AMIR.

## Technologies

- Next.js 15 (App Router)
- React 19
- TypeScript 5.6
- TailwindCSS 3.4
- Design système custom avec thème dark/purple

## Installation

```bash
npm install
npm run dev
```

Le site sera accessible sur http://localhost:3000

## Structure des pages

- `/` - Homepage avec hero animé, market snapshot, et teasers
- `/marches` - Graphiques de marché (XAUUSD, BTCUSD)
- `/algorithmes` - Liste des algorithmes (ST V1 & LT V1)
- `/algorithmes/wa-amir-st` - Détails WA-AMIR ST V1
- `/algorithmes/wa-amir-lt` - Détails WA-AMIR LT V1
- `/acces` - Formulaire multi-étapes d'accès
- `/legal` - Mentions légales et avertissements risques

## IMPORTANT - Logo manquant

 Le fichier `public/waspalgo-logo.png` n'existe pas encore.
Veuillez ajouter le logo WASPALGO (500x500px) dans le dossier /public/ avant de lancer le site.

## Design

Thème dark/purple avec glassmorphism et animations subtiles.
Entièrement responsive (mobile, tablet, desktop).

Référez-vous à instructions/instructions.txt pour toutes les spécifications.
