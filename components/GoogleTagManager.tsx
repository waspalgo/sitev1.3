import Script from 'next/script';

const GTM_ID = 'GTM-MHMGSZZV';

/**
 * Google Tag Manager Component
 * 
 * This component integrates Google Tag Manager into the site.
 * The script is injected in the head section (as high as possible)
 * and the noscript fallback is placed right after the opening <body> tag.
 * 
 * GTM ID: GTM-MHMGSZZV
 */
export default function GoogleTagManager() {
  return (
    <>
      {/* Google Tag Manager - Script dans le <head> */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}

