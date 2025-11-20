import { Resend } from 'resend';

// Lazy initialization - only create client when actually used
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('Resend not configured. Please set RESEND_API_KEY environment variable.');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Export a proxy that initializes on first use (allows build to succeed)
export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    const client = getResendClient();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  }
});



