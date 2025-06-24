'use client';

import { useEffect } from 'react';

// Google Auto Ads - Let Google optimize ad placement automatically
export function GoogleAutoAds() {
  useEffect(() => {
    // Enable Auto Ads (Google will automatically place and optimize ads)
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-7507424386197703",
        enable_page_level_ads: true
      });
    } catch (e) {
      // Fail silently
    }
  }, []);

  return null; // Auto ads don't need a visible component
}

// Manual ad placement for strategic high-value positions
interface ManualAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'banner' | 'leaderboard';
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
}

export function ManualAd({ 
  slot, 
  format = 'auto',
  className = 'flex justify-center my-6',
  style = { display: 'block', minHeight: 90 },
  responsive = true
}: ManualAdProps) {
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
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  );
}

// Hybrid approach: Auto ads + strategic manual placements
export function HybridAdStrategy({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAutoAds />
      {children}
    </>
  );
}

// Legacy components for backward compatibility
export const AdSenseAd = ManualAd;
export const StickyBannerAd = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
    <ManualAd 
      slot="1234567891"
      format="banner"
      className="w-full"
      style={{ display: 'block', width: '100%', height: '60px' }}
    />
  </div>
);

export const InFeedAd = ({ className = 'my-6' }: { className?: string }) => (
  <div className={className}>
    <div className="bg-gray-50 rounded-lg p-4 border">
      <p className="text-xs text-gray-500 mb-2">Advertisement</p>
      <ManualAd 
        slot="1234567893"
        format="auto"
        className="w-full"
        style={{ display: 'block', minHeight: 120 }}
      />
    </div>
  </div>
);

export const MultiplexAd = () => (
  <div className="my-8">
    <h3 className="text-lg font-semibold mb-4">Sponsored Content</h3>
    <ManualAd 
      slot="1234567894"
      format="auto"
      style={{ display: 'block', minHeight: 200 }}
    />
  </div>
);

export const LargeRectangleAd = ({ className = 'flex justify-center my-8' }: { className?: string }) => (
  <ManualAd 
    slot="1234567892"
    format="rectangle"
    className={className}
    style={{ display: 'block', width: '336px', height: '280px' }}
  />
);
