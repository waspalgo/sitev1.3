interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Article';
  data?: Record<string, any>;
}

export default function StructuredData({ type, data = {} }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waspalgo.com';

  const getStructuredData = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'WASPALGO',
          url: baseUrl,
          logo: `${baseUrl}/favicon-512.png`,
          description: 'WASPALGO développe des algorithmes de trading automatisés avec le moteur WA-AMIR.',
          sameAs: [
            'https://x.com/waspalgo',
            'https://www.instagram.com/waspalgo/',
            'https://www.facebook.com/profile.php?id=61583628369579',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@waspalgo.com',
            contactType: 'customer support',
          },
          ...data,
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'WASPALGO',
          url: baseUrl,
          description: 'WASPALGO développe des algorithmes de trading automatisés avec le moteur WA-AMIR.',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
          ...data,
        };

      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items || [],
        };

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          publisher: {
            '@type': 'Organization',
            name: 'WASPALGO',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/favicon-512.png`,
            },
          },
          ...data,
        };

      default:
        return data;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
}

