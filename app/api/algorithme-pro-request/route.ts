import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { resend } from '@/lib/resendClient';
import { sendAutoReplyEmail } from '@/lib/sendAutoReply';
import { buildAdminNotificationHtml } from '@/lib/adminNotificationTemplate';
import { escapeHtml } from '@/lib/sanitize';

// Force dynamic rendering to avoid build-time analysis
export const dynamic = 'force-dynamic';

/**
 * API Route pour les demandes d'accès à WA-AMIR ST V1 PRO
 * 
 * SCHÉMA DE LA TABLE Supabase à créer :
 * 
 * Table: algo_pro_requests
 * 
 * Colonnes :
 * - id (uuid, primary key, default: gen_random_uuid())
 * - created_at (timestamptz, default: now())
 * - updated_at (timestamptz, default: now())
 * - first_name (text, not null)
 * - last_name (text, not null)
 * - email (text, not null)
 * - amount_planned (text, not null) - Montant envisagé (ex: "less_500", "500_1000", etc.)
 * - message (text, nullable) - Message/motivation optionnel
 * - strategy_name (text, default: 'WA-AMIR ST V1 PRO') - Pour identifier clairement la stratégie
 * 
 * SQL à exécuter dans Supabase :
 * 
 * CREATE TABLE IF NOT EXISTS algo_pro_requests (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW(),
 *   first_name TEXT NOT NULL,
 *   last_name TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   amount_planned TEXT NOT NULL,
 *   message TEXT,
 *   strategy_name TEXT DEFAULT 'WA-AMIR ST V1 PRO'
 * );
 * 
 * CREATE INDEX IF NOT EXISTS idx_algo_pro_requests_created_at ON algo_pro_requests(created_at DESC);
 * CREATE INDEX IF NOT EXISTS idx_algo_pro_requests_email ON algo_pro_requests(email);
 */

export async function POST(req: Request) {
  try {
    const {
      first_name,
      last_name,
      email,
      whatsapp_number,
      country,
      amount_planned,
      experience_level,
      message,
      risk_acknowledged,
      info_confirmed,
      newsletter_consent,
      preferred_days,
      time_slots,
      contact_preference,
      locale,
    } = (await req.json()) as {
      first_name: string;
      last_name: string;
      email: string;
      whatsapp_number?: string;
      country?: string;
      amount_planned: string;
      experience_level?: string;
      message?: string | null;
      risk_acknowledged?: boolean;
      info_confirmed?: boolean;
      newsletter_consent?: boolean;
      preferred_days?: string;
      time_slots?: string;
      contact_preference?: string;
      locale?: 'fr' | 'en';
    };

    // Validation des champs requis
    if (!first_name || !last_name || !email || !amount_planned) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Préparer les données pour l'insertion (même structure que algo_access_requests)
    const insertData: Record<string, any> = {
      algorithm: 'WA-AMIR ST V1 PRO',
      first_name,
      last_name,
      email,
      capital_range: amount_planned,
      expectations: message || null,
      risk_acknowledged: risk_acknowledged || false,
      info_confirmed: info_confirmed || false,
    };

    // Champs optionnels
    if (whatsapp_number) {
      insertData.whatsapp_number = whatsapp_number;
    }
    if (country) {
      insertData.country = country;
    }
    if (experience_level) {
      insertData.experience_level = experience_level;
    }
    if (preferred_days) {
      insertData.preferred_days = preferred_days;
    }
    if (time_slots) {
      insertData.time_slots = time_slots;
    }
    // contact_preference est toujours envoyé (par défaut 'call' depuis le formulaire)
    insertData.contact_preference = contact_preference || 'call';
    // newsletter_consent : YES ou NO (par défaut NO si non coché)
    insertData.newsletter_consent = newsletter_consent ? 'YES' : 'NO';

    // Insertion dans Supabase
    const { error: supabaseError } = await supabaseServer
      .from('algo_pro_requests')
      .insert(insertData);

    if (supabaseError) {
      console.error('Erreur Supabase /api/algorithme-pro-request:', supabaseError);
      return NextResponse.json(
        {
          ok: false,
          error: `Erreur lors de l'enregistrement: ${supabaseError.message}`,
        },
        { status: 500 }
      );
    }

    // Préparer les valeurs pour l'email (même format que algo-access)
    const capitalRangeText = {
      less_500: 'Moins de 500 $',
      '500_1000': '500 – 1 000 $',
      '1000_5000': '1 000 – 5 000 $',
      '5000_10000': '5 000 – 10 000 $',
      more_10000: 'Plus de 10 000 $',
    }[amount_planned] || amount_planned;

    const preferredDaysText = preferred_days || '—';
    const timeSlotsText = time_slots || '—';
    const contactPreferenceText = contact_preference === 'call' 
      ? 'Être appelé sur WhatsApp avec un expert' 
      : contact_preference === 'documentation'
      ? 'Recevoir la documentation par message'
      : '—';

    // Formater le niveau d'expérience
    const experienceLevelText = experience_level 
      ? experience_level === 'beginner' ? 'Débutant' 
        : experience_level === 'intermediate' ? 'Intermédiaire'
        : experience_level === 'advanced' ? 'Avancé'
        : experience_level
      : '—';
    
    const countryText = country || '—';
    const whatsappText = whatsapp_number || '—';

    // Construire l'email pour l'administration (même format que WA-AMIR ST V1)
    const html = buildAdminNotificationHtml(
      'algo-access', // Réutilise le type algo-access pour la couleur
      '[WA-AMIR ST V1 PRO] Nouvelle demande d\'accès',
      [
        {
          title: 'Informations générales',
          fields: [
            { label: 'Algorithme', value: 'WA-AMIR ST V1 PRO', highlight: true },
            { label: 'Nom complet', value: `${escapeHtml(first_name)} ${escapeHtml(last_name)}` },
            { label: 'Email', value: escapeHtml(email) },
            { label: 'WhatsApp', value: whatsappText !== '—' ? escapeHtml(whatsappText) : '—' },
            { label: 'Pays', value: countryText !== '—' ? escapeHtml(countryText) : '—' },
          ],
        },
        {
          title: 'Profil d\'investissement',
          fields: [
            { label: 'Capital envisagé', value: capitalRangeText },
            { label: 'Niveau d\'expérience', value: experienceLevelText !== '—' ? escapeHtml(experienceLevelText) : '—' },
            { label: 'Risque accepté', value: risk_acknowledged ? 'Oui' : 'Non' },
            { label: 'Infos confirmées', value: info_confirmed ? 'Oui' : 'Non' },
            { label: 'Newsletter', value: newsletter_consent ? 'Oui' : 'Non' },
          ],
        },
        {
          title: 'Disponibilités',
          fields: [
            { label: 'Jours préférés', value: preferredDaysText },
            { label: 'Plages horaires préférées', value: timeSlotsText },
            { label: 'Mode de contact préféré', value: contactPreferenceText },
          ],
        },
      ],
      message ? escapeHtml(message) : undefined
    );

    // Envoyer l'email à l'administrateur
    // Note: Vous pouvez créer une variable d'environnement ALGO_PRO_EMAIL si vous voulez un email séparé
    // Sinon, on utilise ALGO_ACCESS_EMAIL
    const adminEmail = process.env.ALGO_PRO_EMAIL || process.env.ALGO_ACCESS_EMAIL;

    if (!adminEmail) {
      console.warn('ALGO_PRO_EMAIL ou ALGO_ACCESS_EMAIL non défini, email non envoyé');
    } else {
      await resend.emails.send({
        from: `WASPALGO Pro <${process.env.NO_REPLY_EMAIL!}>`,
        to: adminEmail,
        subject: `[WA-AMIR ST V1 PRO] Nouvelle demande d'accès - ${first_name} ${last_name}`,
        html,
      });
    }

    // Envoyer l'email de confirmation à l'utilisateur
    await sendAutoReplyEmail({
      to: email,
      name: first_name,
      context: locale === 'en' ? 'your access request to WA-AMIR ST V1 PRO' : 'votre demande d\'accès à WA-AMIR ST V1 PRO',
      locale: locale || 'fr',
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur /api/algorithme-pro-request', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

