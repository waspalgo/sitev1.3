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
    const { name, email, subject, message } = (await req.json()) as {
      name: string;
      email: string;
      subject?: string;
      message: string;
    };

    const { error: supabaseError } = await supabaseServer.from('security_requests').insert({
      name,
      email,
      subject,
      message,
    });

    if (supabaseError) {
      console.error('Erreur Supabase /api/security:', supabaseError);
      return NextResponse.json({ 
        ok: false, 
        error: `Erreur lors de l'enregistrement: ${supabaseError.message}` 
      }, { status: 500 });
    }

    const html = buildAdminNotificationHtml(
      'security',
      'Nouvelle alerte de sécurité',
      [
        {
          title: 'Informations du signalement',
          fields: [
            { label: 'Nom', value: name ? escapeHtml(name) : '—' },
            { label: 'Email', value: escapeHtml(email) },
            { label: 'Sujet', value: subject ? escapeHtml(subject) : '—', highlight: true },
          ],
        },
      ],
      message ? escapeHtml(message) : undefined
    );

    await resend.emails.send({
      from: `WASPALGO Security <${process.env.NO_REPLY_EMAIL!}>`,
      to: process.env.SECURITY_EMAIL!,
      subject: `[Sécurité] ${subject || 'Nouveau signalement'}`,
      html,
    });

    await sendAutoReplyEmail({
      to: email,
      name,
      context: 'votre signalement de sécurité',
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur /api/security', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}



