'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
    __adsense_loaded: boolean;
  }
}

export function AdSenseLoader() {
  useEffect(() => {
    // Prevent loading AdSense script multiple times
    if (window.__adsense_loaded) return;

    const loadAdSense = () => {
      try {
        // Initialize adsbygoogle array
        window.adsbygoogle = window.adsbygoogle || [];
        
        // Mark as loaded
        window.__adsense_loaded = true;
        
        // Push Auto Ads configuration
        window.adsbygoogle.push({
          google_ad_client: "ca-pub-7507424386197703",
          enable_page_level_ads: true,
          overlays: { bottom: true },
          tag_partner: "site_kit"
        });

        console.log('AdSense initialized successfully');
      } catch (error) {
        console.warn('AdSense initialization failed:', error);
      }
    };

    // Load AdSense after page is fully loaded
    if (document.readyState === 'complete') {
      loadAdSense();
    } else {
      window.addEventListener('load', loadAdSense);
      return () => window.removeEventListener('load', loadAdSense);
    }
  }, []);

  return null;
}

// Hook for manual ad initialization
export function useAdSense() {
  const initializeAd = (element: HTMLElement) => {
    try {
      if (window.adsbygoogle && element.querySelector('.adsbygoogle')) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.warn('Manual ad initialization failed:', error);
    }
  };

  return { initializeAd };
}

// Enhanced ad loading with retry mechanism
export function loadAdWithRetry(adElement: HTMLElement, maxRetries = 3) {
  let retryCount = 0;
  
  const attemptLoad = () => {
    try {
      if (window.adsbygoogle && adElement.querySelector('.adsbygoogle')) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      retryCount++;
      if (retryCount < maxRetries) {
        setTimeout(attemptLoad, 1000 * retryCount); // Exponential backoff
      } else {
        console.warn(`Ad loading failed after ${maxRetries} attempts:`, error);
      }
    }
  };

  // Initial attempt with slight delay
  setTimeout(attemptLoad, 100);
}
