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
    const { name, email, company, partnership_type, message } = (await req.json()) as {
      name: string;
      email: string;
      company?: string;
      partnership_type?: string;
      message: string;
    };

    const { error: supabaseError } = await supabaseServer.from('partnership_requests').insert({
      name,
      email,
      company,
      partnership_type,
      message,
    });

    if (supabaseError) {
      console.error('Erreur Supabase /api/partnership:', supabaseError);
      return NextResponse.json({ 
        ok: false, 
        error: `Erreur lors de l'enregistrement: ${supabaseError.message}` 
      }, { status: 500 });
    }

    const html = buildAdminNotificationHtml(
      'partnership',
      'Nouvelle demande de partenariat',
      [
        {
          title: 'Informations du contact',
          fields: [
            { label: 'Nom', value: name ? escapeHtml(name) : '—' },
            { label: 'Email', value: escapeHtml(email) },
            { label: 'Entreprise', value: company ? escapeHtml(company) : '—' },
            { label: 'Type de partenariat', value: partnership_type ? escapeHtml(partnership_type) : '—', highlight: true },
          ],
        },
      ],
      message ? escapeHtml(message) : undefined
    );

    await resend.emails.send({
      from: `WASPALGO Partnerships <${process.env.NO_REPLY_EMAIL!}>`,
      to: process.env.PARTNERSHIP_EMAIL!,
      subject: `[Partenariat] Nouvelle demande - ${name}`,
      html,
    });

    await sendAutoReplyEmail({
      to: email,
      name,
      context: 'votre demande de partenariat',
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur /api/partnership', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}



