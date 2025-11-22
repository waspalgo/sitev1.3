import { resend } from './resendClient';
import { buildAutoReplyHtml } from './autoReplyTemplate';

type AutoReplyParams = {
  to: string;
  name?: string;
  context?: string;
  locale?: 'fr' | 'en';
};

const emailSubjects = {
  fr: 'Nous avons bien reçu votre demande',
  en: 'We have received your request',
};

export async function sendAutoReplyEmail({ to, name, context, locale = 'fr' }: AutoReplyParams) {
  const html = buildAutoReplyHtml(name, context, locale);
  const subject = emailSubjects[locale];

  await resend.emails.send({
    from: `WASPALGO <${process.env.NO_REPLY_EMAIL!}>`,
    to,
    subject,
    html,
  });
}


