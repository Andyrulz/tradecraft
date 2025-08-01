'use client';

import { useEffect } from 'react';
import { AD_CONFIG } from '@/lib/ad-config';

// Google Auto Ads - Enhanced configuration for better placement
export function GoogleAutoAds() {
  useEffect(() => {
    // Enable Auto Ads with more aggressive settings and delay to ensure proper loading
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: AD_CONFIG.CLIENT_ID,
          enable_page_level_ads: true,
          overlays: { 
            bottom: true,
            top: false // Disable top overlays to avoid conflicts
          },
          auto_ad_client: AD_CONFIG.CLIENT_ID,
          // Enhanced settings for better ad placement
          page_level_ad_types: ["anchor", "vignette"],
          frequency_cap: { interval: "page_view", number: 1 },
          // More aggressive content discovery
          auto_ads_settings: {
            prioritize_content: true,
            enable_in_content: true,
            enable_sidebar: true
          }
        });
        
        console.log('Enhanced Auto Ads initialized');
      } catch (e) {
        console.warn('Auto Ads initialization failed:', e);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null; // Auto ads don't need a visible component
}

// Manual ad placement for strategic high-value positions
interface ManualAdProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'banner' | 'leaderboard' | 'fluid';
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
  adKey?: keyof typeof AD_CONFIG.SLOTS;
  layoutKey?: string;
}

export function ManualAd({ 
  slot,
  adKey,
  format = 'auto',
  className = 'flex justify-center my-6',
  style = { display: 'block', minHeight: 90 },
  responsive = true,
  layoutKey
}: ManualAdProps) {
  // Use adKey from config or fallback to slot prop
  const adSlot = adKey ? AD_CONFIG.SLOTS[adKey] : slot || AD_CONFIG.SLOTS.TOP_BANNER;
  
  useEffect(() => {
    // Delay ad initialization to improve loading - matches Google's recommended approach
    const timer = setTimeout(() => {
      try {
        // Use the exact format from Google AdSense
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('Manual ad initialization failed:', e);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [adSlot]); // Add adSlot as dependency

  const adProps: any = {
    className: "adsbygoogle",
    style,
    "data-ad-client": AD_CONFIG.CLIENT_ID,
    "data-ad-slot": adSlot,
    "data-ad-format": format,
    "data-full-width-responsive": responsive ? "true" : "false"
  };

  // Add layout key for fluid ads
  if (layoutKey) {
    adProps["data-ad-layout-key"] = layoutKey;
  }

  return (
    <div className={className}>
      <ins {...adProps} />
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
      adKey="MOBILE_STICKY"
      format="banner"
      className="w-full"
      style={{ display: 'block', width: '100%', height: '60px' }}
    />
  </div>
);

export const InFeedAd = ({ className = 'my-6' }: { className?: string }) => (
  <div className={className}>
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <p className="text-xs text-gray-500 mb-2 text-center">Advertisement</p>
      <ManualAd 
        adKey="IN_FEED_PRIMARY"
        format="fluid"
        layoutKey="-fj+2x+at-az-73"
        className="w-full"
        style={{ display: 'block', minHeight: 120 }}
      />
    </div>
  </div>
);

// Specialized component for the new in-feed ad unit
export const InFeedPrimaryAd = ({ className = 'my-6' }: { className?: string }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('In-feed ad initialization failed:', e);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-xs text-gray-500 mb-2 text-center">Sponsored Content</p>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-fj+2x+at-az-73"
          data-ad-client={AD_CONFIG.CLIENT_ID}
          data-ad-slot="6142335506"
        />
      </div>
    </div>
  );
};

// Specialized component for the new sidebar desktop ad unit
export const SidebarDesktopAd = ({ className = 'w-full mb-8' }: { className?: string }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('Sidebar ad initialization failed:', e);
      }
    }, 200); // Slightly longer delay for sidebar ads

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <p className="text-xs text-gray-500 mb-3 text-center">Advertisement</p>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: 250 }}
          data-ad-client={AD_CONFIG.CLIENT_ID}
          data-ad-slot="4185691359"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export const MultiplexAd = () => (
  <div className="my-8">
    <h3 className="text-lg font-semibold mb-4">Related Content</h3>
    <ManualAd 
      adKey="MULTIPLEX"
      format="auto"
      style={{ display: 'block', minHeight: 200 }}
    />
  </div>
);

export const LargeRectangleAd = ({ className = 'flex justify-center my-8' }: { className?: string }) => (
  <ManualAd 
    adKey="LARGE_RECTANGLE"
    format="rectangle"
    className={className}
    style={{ display: 'block', width: '336px', height: '280px' }}
  />
);
