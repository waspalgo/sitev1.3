interface NotificationField {
  label: string;
  value: string;
  highlight?: boolean;
}

interface NotificationSection {
  title: string;
  fields: NotificationField[];
}

export function buildAdminNotificationHtml(
  type: 'algo-access' | 'support' | 'contact' | 'info' | 'security' | 'partnership',
  title: string,
  sections: NotificationSection[],
  message?: string
): string {
  const typeLabels: Record<string, { label: string; color: string; bgColor: string }> = {
    'algo-access': { label: 'ACCÈS ALGORITHME', color: '#a855f7', bgColor: '#581c8f' },
    'support': { label: 'SUPPORT', color: '#3b82f6', bgColor: '#1e3a8a' },
    'contact': { label: 'CONTACT', color: '#10b981', bgColor: '#064e3b' },
    'info': { label: 'INFO', color: '#f59e0b', bgColor: '#78350f' },
    'security': { label: 'SÉCURITÉ', color: '#ef4444', bgColor: '#7f1d1d' },
    'partnership': { label: 'PARTENARIAT', color: '#8b5cf6', bgColor: '#4c1d95' },
  };

  const typeConfig = typeLabels[type] || typeLabels['contact'];

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style type="text/css">
        body { background-color: #000000; margin: 0 !important; padding: 0 !important; }
        .email-container { background-color: #000000; width: 100% !important; }
        .email-content { background-color: #02010a !important; }
      </style>
      <!--[if mso]>
      <style type="text/css">
        body, table, td, a { font-family: Arial, sans-serif !important; }
      </style>
      <![endif]-->
    </head>
    <body bgcolor="#000000" style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#000000" style="width:100%;background-color:#000000;mso-table-lspace:0pt;mso-table-rspace:0pt;" class="email-container">
        <tr>
          <td align="center" bgcolor="#000000" style="padding:40px 16px;background-color:#000000;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#02010a" style="max-width:700px;width:100%;background-color:#02010a;border-radius:24px;border:1px solid ${typeConfig.color};mso-table-lspace:0pt;mso-table-rspace:0pt;">
              <!-- Header -->
              <tr>
                <td bgcolor="#02010a" style="padding:28px 28px 16px 28px;text-align:center;background-color:#02010a;">
                  <div style="font-size:13px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#ffffff;margin-bottom:12px;">
                    WASPALGO
                  </div>
                  <div style="display:inline-block;padding:6px 14px;border-radius:999px;background-color:${typeConfig.bgColor};border:1px solid ${typeConfig.color};color:#ffffff;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">
                    ${typeConfig.label}
                  </div>
                </td>
              </tr>
              <!-- Title -->
              <tr>
                <td bgcolor="#02010a" style="padding:8px 28px 24px 28px;text-align:left;background-color:#02010a;">
                  <h1 style="margin:0 0 20px 0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:700;border-bottom:2px solid ${typeConfig.color};padding-bottom:12px;">
                    ${title}
                  </h1>
                </td>
              </tr>
              <!-- Sections -->
              ${sections.map(section => `
                <tr>
                  <td bgcolor="#02010a" style="padding:0 28px 20px 28px;background-color:#02010a;">
                    <h2 style="margin:0 0 12px 0;font-size:16px;font-weight:600;color:${typeConfig.color};text-transform:uppercase;letter-spacing:0.05em;">
                      ${section.title}
                    </h2>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;background-color:#0a0814;border-radius:12px;border:1px solid rgba(168,85,247,0.2);mso-table-lspace:0pt;mso-table-rspace:0pt;">
                      ${section.fields.map(field => `
                        <tr>
                          <td bgcolor="#0a0814" style="padding:12px 16px;background-color:#0a0814;${field.highlight ? `border-left:3px solid ${typeConfig.color};` : ''}">
                            <div style="display:flex;flex-direction:column;gap:4px;">
                              <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#9ca3af;">
                                ${field.label}
                              </span>
                              <span style="font-size:14px;font-weight:500;color:#ffffff;word-break:break-word;">
                                ${field.value || '—'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      `).join('')}
                    </table>
                  </td>
                </tr>
              `).join('')}
              <!-- Message (if provided) -->
              ${message ? `
                <tr>
                  <td bgcolor="#02010a" style="padding:0 28px 24px 28px;background-color:#02010a;">
                    <div style="background-color:#0a0814;border-radius:12px;border:1px solid rgba(168,85,247,0.2);padding:16px;">
                      <h3 style="margin:0 0 12px 0;font-size:14px;font-weight:600;color:${typeConfig.color};text-transform:uppercase;letter-spacing:0.05em;">
                        Message
                      </h3>
                      <p style="margin:0;font-size:14px;line-height:1.6;color:#d1d5db;white-space:pre-wrap;word-break:break-word;">
                        ${message.replace(/\n/g, '<br />')}
                      </p>
                    </div>
                  </td>
                </tr>
              ` : ''}
              <!-- Footer -->
              <tr>
                <td bgcolor="#02010a" style="padding:16px 28px 24px 28px;background-color:#02010a;">
                  <hr style="border:none;border-top:1px solid #374151;margin:0 0 12px 0;" />
                  <p style="margin:0;font-size:11px;line-height:1.5;color:#6b7280;text-align:center;">
                    Email automatique généré par WASPALGO • Ne pas répondre à cet email
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

