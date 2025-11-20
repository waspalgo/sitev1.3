# Guide de déploiement - WASPALGO Website

## 📋 Prérequis

- Node.js 18+ installé
- Compte Supabase configuré
- Compte Resend configuré
- Variables d'environnement configurées

## 🚀 Déploiement sur Vercel (Recommandé)

### Option 1 : Déploiement via GitHub

1. **Pousser le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <votre-repo-github>
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "New Project"
   - Importer votre repository GitHub
   - Vercel détectera automatiquement Next.js

3. **Configurer les variables d'environnement**
   Dans les paramètres du projet Vercel, ajouter :
   ```
   SUPABASE_URL=votre_url_supabase
   SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
   RESEND_API_KEY=votre_cle_resend
   NO_REPLY_EMAIL=no-reply@waspalgo.com
   SUPPORT_EMAIL=support@waspalgo.com
   INFO_EMAIL=info@waspalgo.com
   SECURITY_EMAIL=security@waspalgo.com
   CONTACT_EMAIL=contact@waspalgo.com
   PARTNERSHIP_EMAIL=partners@waspalgo.com
   ```

4. **Déployer**
   - Vercel déploiera automatiquement à chaque push sur `main`
   - Le site sera disponible sur `votre-projet.vercel.app`

### Option 2 : Déploiement via CLI Vercel

```bash
npm i -g vercel
vercel login
vercel
```

## 🌐 Déploiement sur Netlify

1. **Installer Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build et déployer**
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. **Configurer les variables d'environnement**
   - Dans le dashboard Netlify, aller dans Site settings > Environment variables
   - Ajouter toutes les variables d'environnement listées ci-dessus

## 🖥️ Déploiement sur serveur VPS/Dedicated

### 1. Préparer le serveur

```bash
# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2 pour gérer le processus
sudo npm install -g pm2
```

### 2. Cloner et installer

```bash
git clone <votre-repo>
cd waspalgo-website
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` :
```env
SUPABASE_URL=votre_url_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
RESEND_API_KEY=votre_cle_resend
NO_REPLY_EMAIL=no-reply@waspalgo.com
SUPPORT_EMAIL=support@waspalgo.com
INFO_EMAIL=info@waspalgo.com
SECURITY_EMAIL=security@waspalgo.com
CONTACT_EMAIL=contact@waspalgo.com
PARTNERSHIP_EMAIL=partners@waspalgo.com
NODE_ENV=production
```

### 4. Build et démarrer

```bash
npm run build
pm2 start npm --name "waspalgo" -- start
pm2 save
pm2 startup
```

### 5. Configurer Nginx (optionnel mais recommandé)

Créer `/etc/nginx/sites-available/waspalgo` :
```nginx
server {
    listen 80;
    server_name waspalgo.com www.waspalgo.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer le site :
```bash
sudo ln -s /etc/nginx/sites-available/waspalgo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Configurer SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d waspalgo.com -d www.waspalgo.com
```

## 📦 Structure des fichiers nécessaires

Les fichiers suivants sont essentiels pour le déploiement :

```
waspalgo-website/
├── app/                    # Pages et routes Next.js
├── components/             # Composants React
├── lib/                    # Utilitaires et clients API
├── public/                 # Assets statiques
├── translations/           # Fichiers de traduction
├── contexts/              # Contextes React
├── types/                 # Types TypeScript
├── .env.local            # Variables d'environnement (à créer)
├── next.config.ts        # Configuration Next.js
├── package.json          # Dépendances
├── tailwind.config.ts    # Configuration Tailwind
└── tsconfig.json         # Configuration TypeScript
```

## 🔐 Variables d'environnement requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SUPABASE_URL` | URL de votre projet Supabase | `https://xxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service_role Supabase | `eyJhbGc...` |
| `RESEND_API_KEY` | Clé API Resend | `re_xxx...` |
| `NO_REPLY_EMAIL` | Email pour les auto-réponses | `no-reply@waspalgo.com` |
| `SUPPORT_EMAIL` | Email support | `support@waspalgo.com` |
| `INFO_EMAIL` | Email informations | `info@waspalgo.com` |
| `SECURITY_EMAIL` | Email sécurité | `security@waspalgo.com` |
| `CONTACT_EMAIL` | Email contact | `contact@waspalgo.com` |
| `PARTNERSHIP_EMAIL` | Email partenariats | `partners@waspalgo.com` |

## 🗄️ Configuration Supabase

### Tables requises

Assurez-vous que les tables suivantes existent dans Supabase :

1. **support_requests**
   - id (uuid, primary key)
   - name (text)
   - email (text)
   - subject (text)
   - message (text)
   - created_at (timestamp)

2. **info_requests**
   - id (uuid, primary key)
   - name (text)
   - email (text)
   - subject (text)
   - message (text)
   - created_at (timestamp)

3. **security_reports**
   - id (uuid, primary key)
   - name (text)
   - email (text)
   - subject (text)
   - message (text)
   - created_at (timestamp)

4. **contact_requests**
   - id (uuid, primary key)
   - name (text)
   - email (text)
   - subject (text)
   - message (text)
   - created_at (timestamp)

5. **partnership_requests**
   - id (uuid, primary key)
   - name (text)
   - email (text)
   - company (text, nullable)
   - message (text)
   - created_at (timestamp)

6. **algo_access_requests**
   - id (uuid, primary key)
   - firstName (text)
   - lastName (text)
   - email (text)
   - phone (text)
   - country (text)
   - capital (text)
   - experience (text)
   - preferredDays (text[])
   - preferredTimeSlots (text[])
   - contactPreference (text)
   - algorithm (text)
   - created_at (timestamp)

## 📧 Configuration Resend

1. Créer un compte sur [resend.com](https://resend.com)
2. Vérifier votre domaine `waspalgo.com`
3. Obtenir votre clé API
4. Configurer l'email `no-reply@waspalgo.com` comme expéditeur

## ✅ Checklist de déploiement

- [ ] Variables d'environnement configurées
- [ ] Tables Supabase créées
- [ ] Domaine Resend vérifié
- [ ] Build réussi (`npm run build`)
- [ ] Tests des formulaires de contact
- [ ] Tests des emails automatiques
- [ ] Configuration SSL (HTTPS)
- [ ] Redirection www vers domaine principal
- [ ] Google Analytics / Tracking (si nécessaire)
- [ ] Backup de la base de données configuré

## 🐛 Dépannage

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur de build
```bash
npm run build
# Vérifier les erreurs TypeScript
```

### Emails non envoyés
- Vérifier les variables d'environnement Resend
- Vérifier que le domaine est vérifié dans Resend
- Vérifier les logs dans Resend dashboard

### Erreurs Supabase
- Vérifier que les tables existent
- Vérifier les permissions RLS (Row Level Security)
- Vérifier la clé service_role (doit avoir tous les droits)

## 📞 Support

Pour toute question sur le déploiement, contactez l'équipe de développement.

---

**Dernière mise à jour :** 2025-11-16

