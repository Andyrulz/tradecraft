'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface LayoutClientProps {
  children: React.ReactNode;
}

export function LayoutClient({ children }: LayoutClientProps) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  return (
    <body className={cn(
      `${inter.className} vsc-initialized`,
      isOverlayOpen ? 'overflow-hidden' : ''
    )} suppressHydrationWarning>
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
    </body>
  );
}
