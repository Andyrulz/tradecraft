'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import AuthSessionProvider from '@/components/SessionProvider';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Track if any overlay (sidebar/mobile nav) is open
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  // Pass setOverlayOpen to Sidebar and Header
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
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
      </head>
      <body className={cn(
        `${inter.className} vsc-initialized`,
        isOverlayOpen ? 'overflow-hidden' : ''
      )} suppressHydrationWarning>
        <AuthSessionProvider>
          <Header setOverlayOpen={setOverlayOpen} />
          <Sidebar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} setOverlayOpen={setOverlayOpen} />
          <main className={cn(
            "pt-16 min-h-[calc(100vh-4rem)] bg-white flex flex-col transition-all duration-300 ease-in-out px-1 sm:px-0",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          )}>
            {children}
          </main>
          <div className={cn(
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          )}>
            <Footer />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
