export function buildAutoReplyHtml(name?: string, context?: string): string {
  const safeName = name?.trim();
  const greeting = safeName ? `Bonjour ${safeName},` : 'Bonjour,';
  const contextText = context
    ? `concernant <strong>${context}</strong>`
    : 'via notre site <strong>WASPALGO</strong>';

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style type="text/css">
        /* Style pour Gmail - Force le fond noir */
        body { background-color: #000000 !important; margin: 0 !important; padding: 0 !important; }
        .email-container { background-color: #000000 !important; width: 100% !important; }
        .email-content { background-color: #02010a !important; }
      </style>
      <!--[if mso]>
      <style type="text/css">
        body, table, td, a { font-family: Arial, sans-serif !important; }
      </style>
      <![endif]-->
    </head>
    <body bgcolor="#000000" style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <!-- Wrapper avec fond noir pour Gmail - Utiliser bgcolor HTML -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#000000" style="width:100%;background-color:#000000;mso-table-lspace:0pt;mso-table-rspace:0pt;" class="email-container">
        <tr>
          <td align="center" bgcolor="#000000" style="padding:40px 16px;background-color:#000000;">
            <!-- Table principale avec fond sombre - Utiliser bgcolor HTML -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#02010a" style="max-width:600px;width:100%;background-color:#02010a;border-radius:24px;border:1px solid #a855f7;mso-table-lspace:0pt;mso-table-rspace:0pt;">
              <tr>
                <td bgcolor="#02010a" style="padding:28px 28px 8px 28px;text-align:center;background-color:#02010a;">
                  <div style="font-size:13px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#ffffff;margin-bottom:10px;">
                    WASPALGO
                  </div>
                  <div style="display:inline-block;padding:6px 14px;border-radius:999px;background-color:#581c8f;border:1px solid #a855f7;color:#e9d5ff;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">
                    Confirmation de réception
                  </div>
                </td>
              </tr>
              <tr>
                <td bgcolor="#02010a" style="padding:8px 28px 0 28px;text-align:left;background-color:#02010a;">
                  <h1 style="margin:0 0 16px 0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:700;">
                    Nous avons bien pris en compte votre demande
                  </h1>
                  <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#ffffff;">
                    ${greeting}
                  </p>
                  <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#ffffff;">
                    Merci d'avoir pris contact avec <strong style="color:#c4b5fd;">WASPALGO</strong> ${contextText}.
                  </p>
                  <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#d1d5db;">
                    Votre demande a bien été reçue par notre équipe. Nous l'analysons et reviendrons vers vous dans les plus brefs délais si une suite est possible.
                  </p>
                  <p style="margin:0 0 10px 0;font-size:13px;line-height:1.6;color:#9ca3af;">
                    Ce message est envoyé automatiquement depuis une adresse <strong style="color:#9ca3af;">no-reply</strong>. Merci de ne pas y répondre directement.
                  </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#02010a" style="padding:8px 28px 24px 28px;text-align:left;background-color:#02010a;">
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#ffffff;">
                    Cordialement,<br />
                    <span style="font-weight:600;color:#c4b5fd;">L'équipe WASPALGO</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#02010a" style="padding:16px 28px 24px 28px;background-color:#02010a;">
                  <hr style="border:none;border-top:1px solid #374151;margin:0 0 12px 0;" />
                  <p style="margin:0;font-size:11px;line-height:1.5;color:#6b7280;">
                    Cet email contient des informations à caractère informatif et ne constitue en aucun cas un conseil en investissement ni une promesse de performance. Les marchés financiers comportent un risque de perte en capital.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}


