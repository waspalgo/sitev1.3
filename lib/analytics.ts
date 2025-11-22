/**
 * Analytics helper functions
 * To use: Add your Google Analytics ID to NEXT_PUBLIC_GA_ID environment variable
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Initialize Google Analytics (call this in layout or app component)
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return; // Analytics not configured

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: any[]) {
    window.dataLayer!.push(args);
  };

  // Configure gtag
  window.gtag('js', new Date());
  window.gtag('config', gaId, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
    page_path: url,
  });
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Common event tracking functions
export const analytics = {
  // Track form submissions
  trackFormSubmission: (formName: string) => {
    trackEvent('submit', 'form', formName);
  },

  // Track button clicks
  trackButtonClick: (buttonName: string, location: string) => {
    trackEvent('click', 'button', `${buttonName} - ${location}`);
  },

  // Track link clicks
  trackLinkClick: (linkName: string, destination: string) => {
    trackEvent('click', 'link', `${linkName} - ${destination}`);
  },

  // Track algorithm access requests
  trackAlgorithmAccess: (algorithm: string) => {
    trackEvent('request_access', 'algorithm', algorithm);
  },

  // Track article views
  trackArticleView: (articleId: string, articleTitle: string) => {
    trackEvent('view', 'article', `${articleId} - ${articleTitle}`);
  },

  // Track newsletter subscriptions
  trackNewsletterSignup: (location: string) => {
    trackEvent('signup', 'newsletter', location);
  },
};

