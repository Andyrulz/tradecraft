import React from 'react';
import Script from 'next/script';
import { AD_CONFIG } from '@/lib/ad-config';

interface MobileLargeAdProps {
  className?: string;
}

/**
 * Mobile Large Ad Component
 * 
 * Specialized ad unit for mobile content breaks using fluid/native format.
 * This unit is optimized for mobile user experience and higher mobile RPM.
 */
export const MobileLargeAd: React.FC<MobileLargeAdProps> = ({ className = '' }) => {
  return (
    <div className={`my-6 flex justify-center ${className}`}>
      <div className="w-full max-w-md">
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CONFIG.CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-es+4i+9c-fs+32"
          data-ad-client={AD_CONFIG.CLIENT_ID}
          data-ad-slot={AD_CONFIG.SLOTS.MOBILE_LARGE}
        />
        <Script id="mobile-large-ad-init" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </div>
    </div>
  );
};

export default MobileLargeAd;
