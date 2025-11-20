# 🔧 Dépannage - Formulaire ne fonctionne pas

Si vous voyez l'erreur "Une erreur est survenue. Merci de réessayer plus tard.", voici comment diagnostiquer :

## ✅ Vérifications à faire

### 1. Vérifier les variables d'environnement

Sur Infomaniak, vérifiez que le fichier `.env.local` contient **toutes** ces variables :

```env
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre_cle_supabase
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

### 2. Vérifier les logs de l'application

Sur Infomaniak :
1. Allez dans "Gestion de l'application"
2. Cliquez sur "Ouvrir la console"
3. Regardez les erreurs qui apparaissent quand vous envoyez le formulaire

### 3. Vérifier que Supabase fonctionne

- Vérifiez que `SUPABASE_URL` est correct
- Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est la clé **service_role** (pas la clé anon)
- Vérifiez que la table `support_requests` existe dans Supabase

### 4. Vérifier que Resend fonctionne

- Vérifiez que `RESEND_API_KEY` est correct
- Vérifiez que `NO_REPLY_EMAIL` est un email vérifié sur Resend
- Vérifiez que `SUPPORT_EMAIL` est un email valide

## 🐛 Erreurs courantes

### Erreur : "Supabase not configured"
**Solution** : Vérifiez que `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont dans `.env.local`

### Erreur : "Resend not configured"
**Solution** : Vérifiez que `RESEND_API_KEY` est dans `.env.local`

### Erreur : "Table does not exist"
**Solution** : Créez la table `support_requests` dans Supabase avec les colonnes :
- `name` (text)
- `email` (text)
- `subject` (text, nullable)
- `message` (text)
- `created_at` (timestamp, auto)

### Erreur : "Email not verified"
**Solution** : Vérifiez votre domaine `waspalgo.com` sur Resend et vérifiez que `NO_REPLY_EMAIL` utilise ce domaine

## 🔍 Comment voir l'erreur exacte

1. Ouvrez la console du navigateur (F12)
2. Allez dans l'onglet "Console"
3. Envoyez le formulaire
4. Regardez les erreurs affichées

## ✅ Checklist

- [ ] Fichier `.env.local` existe sur le serveur
- [ ] Toutes les variables sont présentes dans `.env.local`
- [ ] Les valeurs sont correctes (pas de typos)
- [ ] Supabase est accessible
- [ ] Les tables existent dans Supabase
- [ ] Resend est configuré
- [ ] Le domaine email est vérifié sur Resend
- [ ] L'application Node.js est bien démarrée

