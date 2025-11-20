# WASPALGO — Intégration complète des formulaires, de Supabase et des emails (Resend)

> **But :** après exécution de ce fichier, tous les formulaires du site WASPALGO doivent :  
> - enregistrer les données dans la bonne table Supabase  
> - envoyer un email interne structuré vers la bonne adresse `@waspalgo.com`  
> - envoyer un email automatique universel au client depuis `no-reply@waspalgo.com`  
> - fonctionner sans casser le design existant.

Ce document te donne des instructions détaillées, étape par étape.  
Tu es Cursor, éditeur avec IA sur un projet Next.js (App Router) en TypeScript ou JavaScript.

---

## 0. Contexte & hypothèses

- Le projet utilise **Next.js avec l’App Router** (`app/`), pas l’ancien `pages/`.
- Les formulaires existent déjà dans le frontend (pages du site WASPALGO avec les sections :
  - “Support & assistance”
  - “Questions générales”
  - “Sécurité & signalement”
  - “Contact direct”
  - “Demande de partenariat”
  - “Accès à l’algorithme”
- Un fichier `.env.local` existe déjà avec au minimum les variables suivantes (NE PAS les écraser, juste les utiliser) :
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `NO_REPLY_EMAIL=no-reply@waspalgo.com`
  - `SUPPORT_EMAIL=support@waspalgo.com`
  - `INFO_EMAIL=info@waspalgo.com`
  - `SECURITY_EMAIL=security@waspalgo.com`
  - `CONTACT_EMAIL=contact@waspalgo.com`
  - `PARTNERSHIP_EMAIL=partnership@waspalgo.com`
  - `ALGO_ACCESS_EMAIL=access@waspalgo.com`

- Les tables Supabase sont déjà créées avec les schémas suivants (tu dois t’aligner EXACTEMENT sur ces noms de colonnes) :

### 0.1 `support_requests`

- id (uuid, pk)
- name (text)
- email (text)
- subject (text)
- message (text)
- created_at (timestamptz, default now())

### 0.2 `info_requests`

- id (uuid, pk)
- name (text)
- email (text)
- subject (text)
- message (text)
- created_at (timestamptz, default now())

### 0.3 `security_reports`

- id (uuid, pk)
- name (text)
- email (text)
- subject (text)
- message (text)
- created_at (timestamptz, default now())

### 0.4 `contact_requests`

- id (uuid, pk)
- name (text)
- email (text)
- subject (text)
- message (text)
- created_at (timestamptz, default now())

### 0.5 `partnership_requests`

- id (uuid, pk)
- name (text)
- email (text)
- company (text, nullable)
- partnership_type (text, nullable)
- message (text)
- created_at (timestamptz, default now())

### 0.6 `algo_access_requests`

- id (uuid, pk)
- algorithm (text)
- first_name (text)
- last_name (text)
- email (text)
- whatsapp_number (text)
- country (text)
- capital_range (text)
- experience_level (text)
- expectations (text)
- risk_acknowledged (boolean)
- info_confirmed (boolean)
- created_at (timestamptz, default now())

Ne modifie PAS les schémas : contente-toi d’insérer les bonnes colonnes.

---

## 1. Installer les dépendances nécessaires

Dans un terminal à la racine du projet, exécute **une seule fois** :

```bash
npm install @supabase/supabase-js resend
```

Si ces packages sont déjà installés, ne fais rien de plus.

---

## 2. Helpers backend (Supabase, Resend, auto-reply)

Crée ces fichiers si ils n’existent pas, sinon mets-les à jour sans casser d’éventuel code existant utile.

### 2.1 `lib/supabaseServer.ts`

Créer (ou adapter) un client Supabase **côté serveur uniquement** :

```ts
import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

- Ne pas exposer `SUPABASE_SERVICE_ROLE_KEY` au client.
- Ce client doit être utilisé dans toutes les routes API.

---

### 2.2 `lib/resendClient.ts`

Créer :

```ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);
```

---

### 2.3 `lib/sendAutoReply.ts`

Créer un fichier pour gérer le template d’email automatique envoyé aux utilisateurs.

Il doit contenir :

1. Une fonction :

```ts
export function buildAutoReplyHtml(name?: string, context?: string): string {
  // construit un HTML stylé
}
```

2. Une fonction :

```ts
type AutoReplyParams = {
  to: string;
  name?: string;
  context?: string;
};

export async function sendAutoReplyEmail({ to, name, context }: AutoReplyParams) {
  // utilise Resend et buildAutoReplyHtml
}
```

#### 2.3.1 Règles pour `buildAutoReplyHtml`

- Le HTML doit être **propre, responsive et lisible sur mobile**.
- Style :
  - fond général #0b0b0f ou très foncé
  - carte centrale avec fond plus clair (#111319 ou similaire)
  - texte principal en blanc/gris clair
  - accents dorés/jaunes (pour rappeler le branding sérieux/financier)
- Le contenu texte doit être en français :

Pseudo-structure :

```html
<html>
  <body style="...">
    <table ...> <!-- layout mail classique -->
      <tr>
        <td>
          <h1>Merci pour votre message</h1>
          <p>Bonjour {name},</p> <!-- si name fournie -->
          <p>Merci d’avoir pris contact avec <strong>WASPALGO</strong> {context}.</p>
          <p>Votre demande a bien été reçue par notre équipe. Nous l’analysons et reviendrons vers vous dans les plus brefs délais si une suite est possible.</p>
          <p>Ce message est envoyé automatiquement depuis une adresse <strong>no-reply</strong>. Merci de ne pas y répondre directement.</p>
          <p>Cordialement,<br/>L’équipe WASPALGO</p>
        </td>
      </tr>
    </table>
  </body>
</html>
```

- Si `name` n’est pas fourni, mettre “Bonjour,” au lieu de “Bonjour {name},”.
- Si `context` est fourni, afficher : `concernant <strong>{context}</strong>`.
- Si `context` est absent, afficher : `via notre site WASPALGO`.

#### 2.3.2 Règles pour `sendAutoReplyEmail`

- Utiliser la fonction `buildAutoReplyHtml`.
- Utiliser Resend comme ceci :

```ts
import { resend } from './resendClient';

export async function sendAutoReplyEmail({ to, name, context }: AutoReplyParams) {
  const html = buildAutoReplyHtml(name, context);

  await resend.emails.send({
    from: `WASPALGO <${process.env.NO_REPLY_EMAIL!}>`,
    to,
    subject: 'Nous avons bien reçu votre demande',
    html,
  });
}
```

- Gérer les erreurs avec `try/catch` dans les routes API, pas forcément ici.

---

## 3. Création des routes API (App Router)

Créer ces fichiers :

- `app/api/support/route.ts`
- `app/api/info/route.ts`
- `app/api/security/route.ts`
- `app/api/contact/route.ts`
- `app/api/partnership/route.ts`
- `app/api/algo-access/route.ts`

Toutes les routes doivent :

- exposer une fonction `export async function POST(req: Request)`
- utiliser `NextResponse` depuis `next/server`
- lire le JSON du body
- insérer dans la table Supabase correspondante
- envoyer un email interne détaillé
- appeler `sendAutoReplyEmail` pour l’utilisateur
- renvoyer :

```ts
return NextResponse.json({ ok: true });
```

ou en cas d’erreur :

```ts
return NextResponse.json({ ok: false, error: '...' }, { status: 500 });
```

---

### 3.1 `/api/support` → table `support_requests`

Fichier : `app/api/support/route.ts`

Body JSON attendu :

```ts
{
  name: string;
  email: string;
  subject?: string;
  message: string;
}
```

Étapes :

1. `const { name, email, subject, message } = await req.json();`
2. Insertion Supabase :

```ts
await supabaseServer.from('support_requests').insert({
  name,
  email,
  subject,
  message,
});
```

3. Envoi d’un email interne :

- `to: process.env.SUPPORT_EMAIL!`
- `from: "WASPALGO Support" <${process.env.NO_REPLY_EMAIL!}>`
- `subject: [Support] ${subject || 'Nouvelle demande'}`

Contenu HTML (exemple) :

- titre “Nouvelle demande de support”
- paragraphe avec :
  - Nom
  - Email
  - Sujet
  - Message (avec les retours à la ligne respectés)

4. Appeler :

```ts
await sendAutoReplyEmail({
  to: email,
  name,
  context: 'votre demande de support',
});
```

5. Retourner `NextResponse.json({ ok: true })`.

---

### 3.2 `/api/info` → table `info_requests`

Fichier : `app/api/info/route.ts`

Body JSON identique à support :

```ts
{
  name: string;
  email: string;
  subject?: string;
  message: string;
}
```

Différences :

- Insertion dans `info_requests`
- Email interne :

  - `to: process.env.INFO_EMAIL!`
  - `from: "WASPALGO Info" <${process.env.NO_REPLY_EMAIL!}>`
  - `subject: [Info] ${subject || 'Nouvelle question'}`

- Auto-reply :

```ts
await sendAutoReplyEmail({
  to: email,
  name,
  context: 'vos questions générales',
});
```

---

### 3.3 `/api/security` → table `security_reports`

Fichier : `app/api/security/route.ts`

Body JSON :

```ts
{
  name: string;
  email: string;
  subject?: string;
  message: string;
}
```

Différences :

- Insertion dans `security_reports`
- Email interne :

  - `to: process.env.SECURITY_EMAIL!`
  - `from: "WASPALGO Security" <${process.env.NO_REPLY_EMAIL!}>`
  - `subject: [Sécurité] ${subject || 'Nouveau signalement'}`
  - HTML qui insiste sur le caractère “signalement de sécurité”

- Auto-reply :

```ts
await sendAutoReplyEmail({
  to: email,
  name,
  context: 'votre signalement de sécurité',
});
```

---

### 3.4 `/api/contact` → table `contact_requests`

Fichier : `app/api/contact/route.ts`

Body JSON :

```ts
{
  name: string;
  email: string;
  subject?: string;
  message: string;
}
```

Différences :

- Insertion dans `contact_requests`
- Email interne :

  - `to: process.env.CONTACT_EMAIL!`
  - `from: "WASPALGO Contact" <${process.env.NO_REPLY_EMAIL!}>`
  - `subject: [Contact] ${subject || 'Nouvelle demande de contact'}`

- Auto-reply :

```ts
await sendAutoReplyEmail({
  to: email,
  name,
  context: 'votre demande de contact',
});
```

---

### 3.5 `/api/partnership` → table `partnership_requests`

Fichier : `app/api/partnership/route.ts`

Body JSON :

```ts
{
  name: string;
  email: string;
  company?: string;
  partnership_type?: string;
  message: string;
}
```

Étapes :

1. Extraire les champs.
2. Insérer dans `partnership_requests` avec toutes les colonnes :

```ts
await supabaseServer.from('partnership_requests').insert({
  name,
  email,
  company,
  partnership_type,
  message,
});
```

3. Email interne :

- `to: process.env.PARTNERSHIP_EMAIL!`
- `from: "WASPALGO Partnerships" <${process.env.NO_REPLY_EMAIL!}>`
- `subject: [Partenariat] Nouvelle demande - ${name}`

HTML :

- Nom, Email
- Entreprise (si présente)
- Type de partenariat (si présent)
- Message formaté

4. Auto-reply :

```ts
await sendAutoReplyEmail({
  to: email,
  name,
  context: 'votre demande de partenariat',
});
```

---

### 3.6 `/api/algo-access` → table `algo_access_requests`

Fichier : `app/api/algo-access/route.ts`

Body JSON :

```ts
{
  algorithm: string;
  first_name: string;
  last_name: string;
  email: string;
  whatsapp_number?: string;
  country: string;
  capital_range: string;
  experience_level: string;
  expectations?: string;
  risk_acknowledged: boolean;
  info_confirmed: boolean;
}
```

Étapes :

1. Extraire tous les champs.
2. Insérer dans `algo_access_requests` :

```ts
await supabaseServer.from('algo_access_requests').insert({
  algorithm,
  first_name,
  last_name,
  email,
  whatsapp_number,
  country,
  capital_range,
  experience_level,
  expectations,
  risk_acknowledged,
  info_confirmed,
});
```

3. Email interne :

- `to: process.env.ALGO_ACCESS_EMAIL!`
- `from: "WASPALGO Access" <${process.env.NO_REPLY_EMAIL!}>`
- `subject: [Accès algo] Nouvelle demande - ${first_name} ${last_name} (${algorithm})`

HTML :

- Algorithme demandé
- Prénom + nom
- Email
- WhatsApp
- Pays
- Capital envisagé
- Niveau d’expérience
- Attentes (texte)
- “Risque accepté : Oui/Non”
- “Infos confirmées : Oui/Non”

4. Auto-reply :

```ts
await sendAutoReplyEmail({
  to: email,
  name: first_name,
  context: `votre demande d’accès à l’algorithme ${algorithm}`,
});
```

5. Retour : `NextResponse.json({ ok: true })` ou erreur 500.

---

## 4. Branchement des formulaires frontend

Pour chaque page contenant un formulaire, ajouter un `handleSubmit` et connecter au backend.

### 4.1 Règles générales

Pour chaque formulaire :

- Envelopper les champs dans un `<form onSubmit={handleSubmit}>...</form>`
- Ajouter un state :

```ts
const [isSubmitting, setIsSubmitting] = useState(false);
const [statusMessage, setStatusMessage] = useState<string | null>(null);
```

- Créer `handleSubmit` :

Exemple générique :

```ts
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsSubmitting(true);
  setStatusMessage(null);

  const formData = new FormData(e.currentTarget);

  const payload = {
    // adapter selon le formulaire
  };

  try {
    const res = await fetch('/api/xxx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setStatusMessage("Une erreur est survenue. Merci de réessayer plus tard.");
      return;
    }

    setStatusMessage("Votre demande a bien été envoyée. Merci.");
    e.currentTarget.reset();
  } catch (err) {
    console.error(err);
    setStatusMessage("Une erreur est survenue. Merci de réessayer plus tard.");
  } finally {
    setIsSubmitting(false);
  }
}
```

- Le bouton de soumission doit être désactivé si `isSubmitting === true`.
- Afficher `statusMessage` sous le formulaire, avec un style discret.

### 4.2 Mapping formulaires → routes

Cursor doit retrouver chaque formulaire par son titre/section :

1. Section “Support & assistance”  
   - Route : `/api/support`  
   - Payload : `{ name, email, subject, message }`

2. Section “Questions générales”  
   - Route : `/api/info`  
   - Payload : `{ name, email, subject, message }`

3. Section “Sécurité & signalement”  
   - Route : `/api/security`  
   - Payload : `{ name, email, subject, message }`

4. Section “Contact direct”  
   - Route : `/api/contact`  
   - Payload : `{ name, email, subject, message }`

5. Section “Demande de partenariat”  
   - Route : `/api/partnership`  
   - Payload : `{ name, email, company, partnership_type, message }`

6. Section “Accès à l’algorithme”  
   - Route : `/api/algo-access`  
   - Payload :
     ```ts
     {
       algorithm,
       first_name,
       last_name,
       email,
       whatsapp_number,
       country,
       capital_range,
       experience_level,
       expectations,
       risk_acknowledged,
       info_confirmed,
     }
     ```
   - Pour les checkboxes :
     - `risk_acknowledged` et `info_confirmed` sont `true` si la checkbox est cochée, sinon `false`.

### 4.3 Ne pas casser le design

- Ne pas modifier les classes CSS ou Tailwind existantes.
- Ne pas changer la structure visuelle à moins que ce soit nécessaire pour le `<form>`.
- Ajouter le minimum de code autour (form, states, handler).

---

## 5. Page de prévisualisation de l’email

Créer un fichier : `app/email-preview/page.tsx`.

Cette page doit :

- être accessible uniquement en dev (tu peux simplement ajouter un commentaire, ou ne rien faire de spécial, le développeur saura).
- importer `buildAutoReplyHtml` depuis `lib/sendAutoReply`.
- générer un HTML de test, par ex. :

```ts
const html = buildAutoReplyHtml(
  'Matteo',
  'votre demande d’accès à l’algorithme WA-AMIR'
);
```

- l’afficher via :

```tsx
export default function EmailPreviewPage() {
  const html = buildAutoReplyHtml(
    'Matteo',
    'votre demande d’accès à l’algorithme WA-AMIR'
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div
        className="max-w-2xl mx-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
```

Cette page sert uniquement à voir le rendu du mail dans le navigateur.

---

## 6. Gestion des erreurs & logs

Dans toutes les routes API :

- Envelopper la logique dans un `try/catch`.
- En cas d’erreur :

```ts
console.error('Erreur /api/xxx', error);
return NextResponse.json({ ok: false }, { status: 500 });
```

- Ne pas exposer les détails internes dans la réponse, juste logguer côté serveur.

---

## 7. Résumé attendu à la fin (pour le dev humain)

À la fin de l’exécution de ce fichier, les choses suivantes doivent être vraies :

1. Les fichiers helpers existent et sont fonctionnels :
   - `lib/supabaseServer.ts`
   - `lib/resendClient.ts`
   - `lib/sendAutoReply.ts`

2. Les routes API existent et fonctionnent :
   - `app/api/support/route.ts`
   - `app/api/info/route.ts`
   - `app/api/security/route.ts`
   - `app/api/contact/route.ts`
   - `app/api/partnership/route.ts`
   - `app/api/algo-access/route.ts`

3. Chaque formulaire du site :
   - envoie bien une requête POST vers la bonne route,
   - insère dans la bonne table Supabase,
   - envoie un mail interne vers la bonne adresse `@waspalgo.com`,
   - envoie un mail automatique “no-reply” à l’utilisateur.

4. La page `/email-preview` affiche le template d’email automatique.

---

# 🎯 FIN DE `instructions-waspalgo-integration-full.md`
