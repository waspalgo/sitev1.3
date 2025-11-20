import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { resend } from '@/lib/resendClient';
import { sendAutoReplyEmail } from '@/lib/sendAutoReply';
import { sanitizeString, sanitizeEmail, escapeHtml } from '@/lib/sanitize';
import { buildAdminNotificationHtml } from '@/lib/adminNotificationTemplate';

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

    // Sanitize inputs
    const sanitizedName = sanitizeString(name);
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedSubject = sanitizeString(subject);
    const sanitizedMessage = sanitizeString(message);

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const { error: supabaseError } = await supabaseServer.from('support_requests').insert({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject || null,
      message: sanitizedMessage,
    });

    if (supabaseError) {
      console.error('Erreur Supabase /api/support:', supabaseError);
      return NextResponse.json({ 
        ok: false, 
        error: `Erreur lors de l'enregistrement: ${supabaseError.message}` 
      }, { status: 500 });
    }

    const html = buildAdminNotificationHtml(
      'support',
      'Nouvelle demande de support',
      [
        {
          title: 'Informations du contact',
          fields: [
            { label: 'Nom', value: escapeHtml(sanitizedName) },
            { label: 'Email', value: escapeHtml(sanitizedEmail) },
            { label: 'Sujet', value: sanitizedSubject ? escapeHtml(sanitizedSubject) : '—', highlight: true },
          ],
        },
      ],
      escapeHtml(sanitizedMessage)
    );

    await resend.emails.send({
      from: `WASPALGO Support <${process.env.NO_REPLY_EMAIL!}>`,
      to: process.env.SUPPORT_EMAIL!,
      subject: `[Support] ${sanitizedSubject || 'Nouvelle demande'}`,
      html,
    });

    await sendAutoReplyEmail({
      to: sanitizedEmail,
      name: sanitizedName,
      context: 'votre demande de support',
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur /api/support', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      ok: false, 
      error: errorMessage 
    }, { status: 500 });
  }
}


