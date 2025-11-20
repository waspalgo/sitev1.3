import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WASPALGO - Algorithmes de trading avec WA-AMIR',
    short_name: 'WASPALGO',
    description: 'WASPALGO développe des algorithmes de trading automatisés avec le moteur WA-AMIR.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#A855F7',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}



