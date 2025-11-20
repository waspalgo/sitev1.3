import { resend } from './resendClient';
import { buildAutoReplyHtml } from './autoReplyTemplate';

type AutoReplyParams = {
  to: string;
  name?: string;
  context?: string;
};

export async function sendAutoReplyEmail({ to, name, context }: AutoReplyParams) {
  const html = buildAutoReplyHtml(name, context);

  await resend.emails.send({
    from: `WASPALGO <${process.env.NO_REPLY_EMAIL!}>`,
    to,
    subject: 'Nous avons bien reçu votre demande',
    html,
  });
}


