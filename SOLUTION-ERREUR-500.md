# 🔧 Solution erreur 500 sur /api/support

L'erreur 500 signifie que le serveur rencontre un problème. Voici comment la résoudre :

## 🔍 Diagnostic

### 1. Vérifier les logs de l'application sur Infomaniak

1. Allez dans "Gestion de l'application" sur Infomaniak
2. Cliquez sur "Ouvrir la console"
3. Regardez les erreurs qui apparaissent quand vous envoyez le formulaire
4. L'erreur exacte devrait être affichée (ex: "Supabase not configured", "Resend not configured", etc.)

### 2. Causes probables

#### A. Variables d'environnement manquantes

Vérifiez que `.env.local` contient **exactement** ces variables :

```env
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
RESEND_API_KEY=re_votre_cle_resend
NO_REPLY_EMAIL=no-reply@waspalgo.com
SUPPORT_EMAIL=support@waspalgo.com
INFO_EMAIL=info@waspalgo.com
SECURITY_EMAIL=security@waspalgo.com
CONTACT_EMAIL=contact@waspalgo.com
PARTNERSHIP_EMAIL=partners@waspalgo.com
ALGO_ACCESS_EMAIL=access@waspalgo.com
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://waspalgo.com
```

**Important** : 
- Pas d'espaces avant/après le `=`
- Pas de guillemets autour des valeurs
- Une variable par ligne

#### B. Table Supabase manquante

La table `support_requests` doit exister dans Supabase avec ces colonnes :
- `id` (uuid, primary key, auto)
- `name` (text)
- `email` (text)
- `subject` (text, nullable)
- `message` (text)
- `created_at` (timestamp, default now())

**Pour créer la table** :
1. Allez sur Supabase → SQL Editor
2. Exécutez cette requête :

```sql
CREATE TABLE IF NOT EXISTS support_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### C. Email non vérifié sur Resend

- Vérifiez que `NO_REPLY_EMAIL` utilise un domaine vérifié sur Resend
- Vérifiez que `SUPPORT_EMAIL` est un email valide

#### D. Clés API incorrectes

- `SUPABASE_SERVICE_ROLE_KEY` : doit être la clé **service_role** (pas anon)
- `RESEND_API_KEY` : doit commencer par `re_`

## ✅ Solution étape par étape

1. **Vérifier `.env.local`** sur le serveur Infomaniak
2. **Vérifier les logs** dans la console de l'application
3. **Créer la table** dans Supabase si elle n'existe pas
4. **Vérifier Resend** : domaine vérifié et clé API correcte
5. **Redémarrer l'application** après avoir modifié `.env.local`

## 🆘 Si ça ne fonctionne toujours pas

Partagez-moi :
1. L'erreur exacte des logs de l'application
2. Le contenu de `.env.local` (sans les vraies clés, juste les noms de variables)
3. Si la table `support_requests` existe dans Supabase

