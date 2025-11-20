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

    const { error: supabaseError } = await supabaseServer.from('contact_requests').insert({
      name,
      email,
      subject,
      message,
    });

    if (supabaseError) {
      console.error('Erreur Supabase /api/contact:', supabaseError);
      return NextResponse.json({ 
        ok: false, 
        error: `Erreur lors de l'enregistrement: ${supabaseError.message}` 
      }, { status: 500 });
    }

<<<<<<< HEAD
    const html = buildAdminNotificationHtml(
      'contact',
      'Nouvelle demande de contact',
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
      <h1>Nouvelle demande de contact</h1>
      <p><strong>Nom :</strong> ${name || '-'}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${subject || '—'}</p>
      <p><strong>Message :</strong></p>
      <p>${(message || '').replace(/\n/g, '<br />')}</p>
    `;
>>>>>>> 82a9afff82211ec552c4e205dc33ff711accf459

    await resend.emails.send({
      from: `WASPALGO Contact <${process.env.NO_REPLY_EMAIL!}>`,
      to: process.env.CONTACT_EMAIL!,
      subject: `[Contact] ${subject || 'Nouvelle demande de contact'}`,
      html,
    });

    await sendAutoReplyEmail({
      to: email,
      name,
      context: 'votre demande de contact',
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur /api/contact', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}



