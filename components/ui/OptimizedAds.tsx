'use client';

import { useEffect } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'banner' | 'leaderboard';
  className?: string;
  style?: React.CSSProperties;
}

export function AdSenseAd({ 
  slot, 
  format = 'auto',
  className = 'flex justify-center my-6',
  style = { display: 'block', minHeight: 90 }
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-7507424386197703"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

// High-revenue sticky banner ad for mobile
export function StickyBannerAd() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '60px' }}
        data-ad-client="ca-pub-7507424386197703"
        data-ad-slot="1234567891"
        data-ad-format="banner"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

// Large rectangle ad for high visibility
export function LargeRectangleAd({ className = 'flex justify-center my-8' }: { className?: string }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '336px', height: '280px' }}
        data-ad-client="ca-pub-7507424386197703"
        data-ad-slot="1234567892"
        data-ad-format="rectangle"
      ></ins>
    </div>
  );
}

// In-feed ad that blends with content
export function InFeedAd({ className = 'my-6' }: { className?: string }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently
    }
  }, []);

  return (
    <div className={className}>
      <div className="bg-gray-50 rounded-lg p-4 border">
        <p className="text-xs text-gray-500 mb-2">Advertisement</p>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: 120 }}
          data-ad-client="ca-pub-7507424386197703"
          data-ad-slot="1234567893"
          data-ad-format="fluid"
          data-ad-layout-key="-gw-1+2a-9x+5c"
        ></ins>
      </div>
    </div>
  );
}

// Multiplex ad for native-like experience
export function MultiplexAd() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently
    }
  }, []);

  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-4">Sponsored Content</h3>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 200 }}
        data-ad-client="ca-pub-7507424386197703"
        data-ad-slot="1234567894"
        data-ad-format="autorelaxed"
      ></ins>
    </div>
  );
}

// High-revenue interstitial ad for key user interactions
export function InterstitialAd({ 
  isVisible, 
  onClose 
}: { 
  isVisible: boolean; 
  onClose: () => void;
}) {
  useEffect(() => {
    if (isVisible) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Fail silently
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
        <div className="pt-4">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: 280 }}
            data-ad-client="ca-pub-7507424386197703"
            data-ad-slot="1234567895"
            data-ad-format="auto"
          ></ins>
        </div>
      </div>
    </div>
  );
}

// Floating action button ad - high engagement
export function FloatingAdButton() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently
    }
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-40 lg:bottom-4">
      <div className="bg-white rounded-lg shadow-lg border p-2 w-60">
        <p className="text-xs text-gray-500 mb-1">Sponsored</p>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: 100 }}
          data-ad-client="ca-pub-7507424386197703"
          data-ad-slot="1234567896"
          data-ad-format="auto"
        ></ins>
      </div>
    </div>
  );
}

// Enhanced ad component with refresh and tracking
export function EnhancedAdSenseAd({ 
  slot, 
  format = 'auto',
  className = 'flex justify-center my-6',
  style = { display: 'block', minHeight: 90 },
  refreshInterval = 300000, // 5 minutes
  trackClicks = true
}: AdSenseAdProps & { 
  refreshInterval?: number;
  trackClicks?: boolean;
}) {
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const initAd = () => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Fail silently
      }
    };

    initAd();

    // Auto-refresh for higher revenue (respects Google policies)
    if (refreshInterval > 300000) { // Minimum 5 minutes
      interval = setInterval(() => {
        const adElement = document.querySelector(`[data-ad-slot="${slot}"]`);
        if (adElement) {
          // Clear and reinitialize
          adElement.innerHTML = '';
          initAd();
        }
      }, refreshInterval);    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [slot, refreshInterval]);

  const handleClick = () => {
    if (trackClicks) {
      // Track ad clicks for analytics
      try {
        // @ts-ignore
        gtag?.('event', 'ad_click', {
          ad_slot: slot,
          ad_format: format
        });
      } catch (e) {
        // Fail silently
      }
    }
  };

  return (
    <div className={className} onClick={handleClick}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-7507424386197703"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
