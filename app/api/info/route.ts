import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { resend } from '@/lib/resendClient';
import { sendAutoReplyEmail } from '@/lib/sendAutoReply';
<<<<<<< HEAD
import { buildAdminNotificationHtml } from '@/lib/adminNotificationTemplate';
import { escapeHtml } from '@/lib/sanitize';
=======
>>>>>>> 82a9afff82211ec552c4e205dc33ff711accf459

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

    const { error: supabaseError } = await supabaseServer.from('info_requests').insert({
      name,
      email,
      subject,
      message,
    });

    if (supabaseError) {
      console.error('Erreur Supabase /api/info:', supabaseError);
      return NextResponse.json({ 
        ok: false, 
        error: `Erreur lors de l'enregistrement: ${supabaseError.message}` 
      }, { status: 500 });
    }

<<<<<<< HEAD
    const html = buildAdminNotificationHtml(
      'info',
      'Nouvelle question générale',
      [
        {
          title: 'Informations du contact',
          fields: [
            { label: 'Nom', value: name ? escapeHtml(name) : '—' },
            { label: 'Email', value: escapeHtml(email) },
            { label: 'Sujet', value: subject ? escapeHtml(subject) : '—', highlight: true },
          ],
        },
      ],
      message ? escapeHtml(message) : undefined
    );
=======
    const html = `
      <h1>Nouvelle question générale</h1>
      <p><strong>Nom :</strong> ${name || '-'}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${subject || '—'}</p>
      <p><strong>Message :</strong></p>
      <p>${(message || '').replace(/\n/g, '<br />')}</p>
    `;
>>>>>>> 82a9afff82211ec552c4e205dc33ff711accf459

    await resend.emails.send({
      from: `WASPALGO Info <${process.env.NO_REPLY_EMAIL!}>`,
      to: process.env.INFO_EMAIL!,
      subject: `[Info] ${subject || 'Nouvelle question'}`,
      html,
    });

    await sendAutoReplyEmail({
      to: email,
      name,
      context: 'vos questions générales',
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur /api/info', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}



