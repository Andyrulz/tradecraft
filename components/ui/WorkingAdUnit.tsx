'use client';

import { useEffect } from 'react';

// Direct implementation using your working Google AdSense ad unit
export function WorkingAdUnit({ 
  className = 'my-6',
  style = { display: 'block' },
  label = 'Advertisement'
}: {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) {
  useEffect(() => {
    // Use Google's exact recommended timing
    const timer = setTimeout(() => {
      try {
        // @ts-ignore - Google's exact format
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('Ad initialization failed:', e);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      {label && (
        <div className="text-center mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
        </div>
      )}
      
      {/* Your exact working Google AdSense ad unit */}
      <ins 
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-7507424386197703"
        data-ad-slot="2957844942"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// High-frequency in-feed ad using your working unit
export function InFeedWorkingAd({ className = 'my-8' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <WorkingAdUnit 
          style={{ display: 'block', minHeight: 120 }}
          label="Sponsored Content"
        />
      </div>
    </div>
  );
}

// Banner ad using your working unit
export function BannerWorkingAd({ className = 'flex justify-center my-6' }: { className?: string }) {
  return (
    <WorkingAdUnit 
      className={className}
      style={{ display: 'block', minHeight: 90 }}
      label="Advertisement"
    />
  );
}

// Large format ad using your working unit
export function LargeWorkingAd({ className = 'my-8' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <WorkingAdUnit 
          style={{ display: 'block', minHeight: 200 }}
          label="Related Content"
        />
      </div>
    </div>
  );
}
