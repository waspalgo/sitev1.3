# Guide : Réactiver les Analytics Plus Tard

## 📋 État Actuel

Les cookies analytics et le banner de consentement ont été **désactivés** pour simplifier le site au démarrage.

**Conservé :**
- ✅ localStorage pour la langue (FR/EN) - Essentiel et pas un cookie analytics

**Désactivé :**
- ❌ Google Tag Manager
- ❌ Banner de consentement cookies

---

## 🔄 Quand Réactiver les Analytics ?

Réactivez quand :
- Vous avez des revenus réguliers
- Vous voulez analyser le trafic
- Vous faites des campagnes publicitaires
- Vous avez besoin de statistiques détaillées

---

## 📝 Comment Réactiver Plus Tard ?

### Option 1 : Réactiver Google Tag Manager

1. **Décommenter dans `app/layout.tsx` :**
   ```typescript
   // Actuellement commenté :
   // import GoogleTagManager from '@/components/GoogleTagManager';
   // import CookieConsent from '@/components/CookieConsent';
   
   // Décommentez :
   import GoogleTagManager from '@/components/GoogleTagManager';
   import CookieConsent from '@/components/CookieConsent';
   ```

2. **Décommenter dans le body :**
   ```typescript
   // Décommentez :
   <GoogleTagManager />
   <noscript>
     <iframe
       src="https://www.googletagmanager.com/ns.html?id=GTM-MHMGSZZV"
       height="0"
       width="0"
       style={{ display: 'none', visibility: 'hidden' }}
       title="Google Tag Manager"
     />
   </noscript>
   <CookieConsent />
   ```

3. **Publier vos tags dans GTM** (vous les avez déjà créés)

**Temps estimé : 2 minutes**

---

### Option 2 : Ajouter Plausible Analytics (Recommandé)

1. **Créer un compte** sur [plausible.io](https://plausible.io)
2. **Ajouter votre domaine** : `waspalgo.com`
3. **Obtenir le script** (ils vous le donnent après inscription)
4. **Ajouter dans `app/layout.tsx` :**
   ```typescript
   // Dans le <head> ou juste après <body>
   <script
     defer
     data-domain="waspalgo.com"
     src="https://plausible.io/js/script.js"
   ></script>
   ```

**Avantages :**
- ✅ Pas de cookies = pas de banner
- ✅ Privacy-first
- ✅ Intégration très simple
- ✅ Conforme RGPD automatiquement

**Temps estimé : 5 minutes**

---

## 📌 Fichiers Conservés

Les fichiers suivants ont été **gardés** (juste commentés) pour pouvoir réactiver facilement :

- ✅ `components/GoogleTagManager.tsx` - Prêt à être réutilisé
- ✅ `components/CookieConsent.tsx` - Prêt à être réutilisé
- ✅ `lib/analytics.ts` - Structure d'analytics prête

**Vous pouvez les réactiver en quelques minutes quand vous en aurez besoin.**

---

## 💡 Recommandation Future

**Quand vous aurez des revenus :**

1. **Plausible Analytics** (~9€/mois)
   - Simple
   - Privacy-first
   - Pas de banner nécessaire

2. **OU Google Analytics** (gratuit)
   - Plus détaillé
   - Nécessite le banner de consentement
   - Configuration déjà faite dans GTM

---

## ✅ État Actuel du Site

**Site simplifié :**
- ✅ Pas de cookies analytics
- ✅ Pas de banner qui dérange
- ✅ localStorage pour la langue seulement (essentiel)
- ✅ Site plus rapide et plus simple
- ✅ Focus sur l'acquisition de clients

**Parfait pour le démarrage ! 🚀**

