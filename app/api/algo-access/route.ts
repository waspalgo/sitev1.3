import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { resend } from '@/lib/resendClient';
import { sendAutoReplyEmail } from '@/lib/sendAutoReply';
import { buildAdminNotificationHtml } from '@/lib/adminNotificationTemplate';
import { escapeHtml } from '@/lib/sanitize';

// Force dynamic rendering to avoid build-time analysis
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const {
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
      newsletter_consent,
      preferred_days,
      time_slots,
      contact_preference,
    } = (await req.json()) as {
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
      newsletter_consent?: string;
      preferred_days?: string;
      time_slots?: string;
      contact_preference?: string;
    };

    // Préparer les données pour l'insertion
    const insertData: Record<string, any> = {
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
    };

    // Ajouter les colonnes de disponibilités
    // preferred_days et time_slots sont optionnels (peuvent être vides)
    if (preferred_days) {
      insertData.preferred_days = preferred_days;
    }
    if (time_slots) {
      insertData.time_slots = time_slots;
    }
    // contact_preference est toujours envoyé (par défaut 'call' depuis le formulaire)
    insertData.contact_preference = contact_preference || 'call';
    // newsletter_consent : YES ou NO (par défaut NO si non coché)
    insertData.newsletter_consent = newsletter_consent || 'NO';

    const { error: supabaseError } = await supabaseServer.from('algo_access_requests').insert(insertData);

    if (supabaseError) {
      console.error('Erreur Supabase /api/algo-access:', supabaseError);
      return NextResponse.json({ 
        ok: false, 
        error: `Erreur lors de l'enregistrement: ${supabaseError.message}` 
      }, { status: 500 });
    }

    const preferredDaysText = preferred_days || '—';
    const timeSlotsText = time_slots || '—';
    const contactPreferenceText = contact_preference === 'call' 
      ? 'Être appelé sur WhatsApp avec un expert' 
      : contact_preference === 'documentation'
      ? 'Recevoir la documentation par message'
      : '—';

    const html = buildAdminNotificationHtml(
      'algo-access',
      'Nouvelle demande d\'accès à l\'algorithme',
      [
        {
          title: 'Informations générales',
          fields: [
            { label: 'Algorithme', value: escapeHtml(algorithm), highlight: true },
            { label: 'Nom complet', value: `${escapeHtml(first_name)} ${escapeHtml(last_name)}` },
            { label: 'Email', value: escapeHtml(email) },
            { label: 'WhatsApp', value: whatsapp_number ? escapeHtml(whatsapp_number) : '—' },
            { label: 'Pays', value: escapeHtml(country) },
          ],
        },
        {
          title: 'Profil d\'investissement',
          fields: [
            { label: 'Capital envisagé', value: escapeHtml(capital_range) },
            { label: 'Niveau d\'expérience', value: escapeHtml(experience_level) },
            { label: 'Risque accepté', value: risk_acknowledged ? 'Oui' : 'Non' },
            { label: 'Infos confirmées', value: info_confirmed ? 'Oui' : 'Non' },
            { label: 'Newsletter', value: newsletter_consent === 'YES' ? 'Oui' : 'Non' },
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
      expectations ? escapeHtml(expectations) : undefined
    );

    await resend.emails.send({
      from: `WASPALGO Access <${process.env.NO_REPLY_EMAIL!}>`,
      to: process.env.ALGO_ACCESS_EMAIL!,
      subject: `[Accès algo] Nouvelle demande - ${first_name} ${last_name} (${algorithm})`,
      html,
    });

    await sendAutoReplyEmail({
      to: email,
      name: first_name,
      context: `votre demande d’accès à l’algorithme ${algorithm}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur /api/algo-access', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}



