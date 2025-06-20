'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AuthSessionProvider from '@/components/SessionProvider';
import { Sidebar } from '@/components/layout/Sidebar';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703"
          crossOrigin="anonymous"
        ></script>
        {/* Google Analytics tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-79EFCZT0E0"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-79EFCZT0E0');
        `}} />
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
