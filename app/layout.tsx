import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import StructuredData from '@/components/StructuredData';
// import CookieConsent from '@/components/CookieConsent'; // Désactivé pour l'instant - pas de cookies analytics
// import GoogleTagManager from '@/components/GoogleTagManager'; // Désactivé pour l'instant - pas d'analytics
import { LanguageProvider } from '@/contexts/LanguageContext';
import { KeyboardProvider } from '@/contexts/KeyboardContext';

export const metadata: Metadata = {
  title: 'WASPALGO - Algorithmes de trading avec WA-AMIR',
  description:
    'WASPALGO développe des algorithmes de trading automatisés avec le moteur WA-AMIR. Technologie algorithmique pour les marchés financiers.',
  keywords: ['trading algorithmique', 'WA-AMIR', 'algorithmes de trading', 'trading automatisé', 'XAUUSD', 'marchés financiers', 'or'],
  authors: [{ name: 'WASPALGO' }],
  creator: 'WASPALGO',
  publisher: 'WASPALGO',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/favicon-512.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://waspalgo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: 'WASPALGO - Algorithmes de trading avec WA-AMIR',
    description: 'WASPALGO développe des algorithmes de trading automatisés avec le moteur WA-AMIR. Technologie algorithmique pour les marchés financiers.',
    siteName: 'WASPALGO',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WASPALGO - Algorithmes de trading avec WA-AMIR',
      },
      // Fallback temporaire avec le favicon si og-image.png n'existe pas encore
      {
        url: '/favicon-512.png',
        width: 512,
        height: 512,
        alt: 'WASPALGO Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WASPALGO - Algorithmes de trading avec WA-AMIR',
    description: 'WASPALGO développe des algorithmes de trading automatisés avec le moteur WA-AMIR.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {/* Google Tag Manager - Désactivé pour l'instant (pas d'analytics avec cookies) */}
        {/* Réactiver quand vous voulez utiliser Google Analytics ou Plausible */}
        {/* <GoogleTagManager /> */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHMGSZZV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript> */}
        {/* Structured Data - Organization */}
        <StructuredData type="Organization" />
        {/* Structured Data - WebSite */}
        <StructuredData type="WebSite" />
        <LanguageProvider>
          <KeyboardProvider>
            <SmoothScroll />
            <Header />
            <main className="pt-16 md:pt-20 min-h-screen overflow-x-hidden">{children}</main>
            <Footer />
            {/* Cookie Consent Banner - Désactivé pour l'instant (pas de cookies analytics) */}
            {/* Réactiver si vous ajoutez Google Analytics ou d'autres cookies analytics */}
            {/* <CookieConsent /> */}
          </KeyboardProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


