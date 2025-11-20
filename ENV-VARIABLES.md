# Variables d'environnement requises

Copiez ce contenu dans votre fichier `.env.local` et remplissez avec vos vraies valeurs.

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Resend Email Configuration
RESEND_API_KEY=re_your_resend_api_key_here
NO_REPLY_EMAIL=no-reply@waspalgo.com

# Contact Emails
SUPPORT_EMAIL=support@waspalgo.com
INFO_EMAIL=info@waspalgo.com
SECURITY_EMAIL=security@waspalgo.com
CONTACT_EMAIL=contact@waspalgo.com
PARTNERSHIP_EMAIL=partners@waspalgo.com
ALGO_ACCESS_EMAIL=access@waspalgo.com

# Environment
NODE_ENV=production
```

## Où obtenir ces valeurs

### Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un projet ou utilisez un projet existant
3. Allez dans Settings > API
4. Copiez l'URL du projet → `SUPABASE_URL`
5. Copiez la clé `service_role` (⚠️ gardez-la secrète) → `SUPABASE_SERVICE_ROLE_KEY`

### Resend
1. Allez sur [resend.com](https://resend.com)
2. Créez un compte
3. Vérifiez votre domaine `waspalgo.com`
4. Allez dans API Keys
5. Créez une nouvelle clé → `RESEND_API_KEY`

### Emails
Configurez ces emails dans votre service d'email (Resend, SendGrid, etc.) :
- `no-reply@waspalgo.com` - Pour les auto-réponses
- `support@waspalgo.com` - Support technique
- `info@waspalgo.com` - Informations générales
- `security@waspalgo.com` - Signalements de sécurité
- `contact@waspalgo.com` - Contact général
- `partners@waspalgo.com` - Partenariats

## ⚠️ Important

- Ne commitez JAMAIS le fichier `.env.local` dans Git
- Gardez vos clés API secrètes
- Utilisez des clés différentes pour développement et production
- Sur Vercel/Netlify, configurez ces variables dans les paramètres du projet


