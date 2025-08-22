import './globals.css';
import './mobile-enhancements.css';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import AuthSessionProvider from '@/components/SessionProvider';
import { LayoutClient } from '../components/layout/LayoutClient';
import Script from 'next/script';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tradingsetup.pro'),
  title: {
    default: 'TradeCraft Pro - Advanced Stock Market Analysis & Trading Tools',
    template: '%s | TradeCraft Pro'
  },
  description: 'Professional stock market analysis tools, real-time market news, stock screeners, and automated trade plan generation. Make informed trading decisions with TradeCraft Pro.',
  keywords: 'stock market analysis, trading tools, market news, stock screener, trade plans, momentum stocks, market movers, financial analysis, stock research, trading strategies',
  authors: [{ name: 'TradeCraft Pro' }],
  creator: 'TradeCraft Pro',
  publisher: 'TradeCraft Pro',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.tradingsetup.pro',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tradingsetup.pro',
    siteName: 'TradeCraft Pro',
    title: 'TradeCraft Pro - Advanced Stock Market Analysis & Trading Tools',
    description: 'Professional stock market analysis tools, real-time market news, stock screeners, and automated trade plan generation.',
    images: [
      {
        url: 'https://www.tradingsetup.pro/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'TradeCraft Pro - Advanced Stock Market Analysis & Trading Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TradeCraft Pro - Advanced Stock Market Analysis & Trading Tools',
    description: 'Professional stock market analysis tools, real-time market news, stock screeners, and automated trade plan generation.',
    images: ['https://www.tradingsetup.pro/og-default.jpg'],
    creator: '@tradecraftpro',
    site: '@tradecraftpro',
  },
  verification: {
    google: 'iz8NGLR7L-w5Ez2rqw-HR0J9v_Y9R8psYhLjovnHMEg', // Google Search Console verification
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="application-name" content="TradeCraft Pro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TradeCraft Pro" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-TileImage" content="/favicon.png" />
        
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703"
          crossOrigin="anonymous"
        />
        {/* Google Analytics tag */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-79EFCZT0E0" />
        <Script id="ga-inline" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-79EFCZT0E0');
        `}</Script>
        {/* Microsoft Clarity */}
        <Script id="clarity-inline" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "s3caiqodiu");
        `}</Script>
        
        {/* Global Structured Data */}
        <StructuredData data={generateWebsiteStructuredData()} />
        <StructuredData data={generateOrganizationStructuredData()} />
      </head>
      <body className={inter.className}>
        <AuthSessionProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
