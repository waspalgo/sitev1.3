import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
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
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WASPALGO - Algorithmes de trading avec WA-AMIR',
    description: 'WASPALGO développe des algorithmes de trading automatisés avec le moteur WA-AMIR.',
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
        <LanguageProvider>
          <KeyboardProvider>
            <SmoothScroll />
            <Header />
            <main className="pt-16 md:pt-20 min-h-screen overflow-x-hidden">{children}</main>
            <Footer />
          </KeyboardProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


