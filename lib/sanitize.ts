/**
 * Sanitize string inputs to prevent XSS attacks
 */
export function sanitizeString(input: string | undefined | null): string {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 10000); // Limit length
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string | undefined | null): string {
  if (!email) return '';
  
  const sanitized = email.trim().toLowerCase().slice(0, 255);
  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  return sanitized;
}

/**
 * Escape HTML for safe display in emails
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


