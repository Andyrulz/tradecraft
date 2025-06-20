'use client';

import { useEffect } from 'react';

export function AdSenseAd() {
  // Only render on client
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently
    }
  }, []);

  return (
    <div className="flex justify-center my-6">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client="ca-pub-7507424386197703"
        data-ad-slot="2957844942"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}