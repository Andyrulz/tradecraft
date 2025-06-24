'use client';

import { useEffect } from 'react';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Enhanced analytics for ad performance tracking
export function AdAnalytics() {
  useEffect(() => {
    // Track ad viewability and performance
    const trackAdPerformance = () => {
      try {
        // Custom ad performance tracking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'ad_page_view', {
            event_category: 'ads',
            event_label: 'free_content_page'
          });
        }

        // Track ad slots loaded
        const adSlots = document.querySelectorAll('.adsbygoogle');
        adSlots.forEach((ad, index) => {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (window.gtag) {
                  window.gtag('event', 'ad_impression', {
                    event_category: 'ads',
                    event_label: `slot_${index}`,
                    value: 1
                  });
                }
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.5 });
          
          observer.observe(ad);
        });
      } catch (e) {
        console.log('Ad analytics error:', e);
      }
    };

    // Delay to ensure ads are loaded
    setTimeout(trackAdPerformance, 2000);
  }, []);

  return null;
}

// A/B test different ad layouts
export function AdLayoutOptimizer() {
  useEffect(() => {
    // Simple A/B testing for ad placement optimization
    const userId = localStorage.getItem('user_id') || Math.random().toString(36).substring(7);
    localStorage.setItem('user_id', userId);
    
    // Hash user ID to consistently assign them to a test group
    const testGroup = parseInt(userId.slice(-1), 36) % 3; // 3 test groups
    
    // Store test group for analytics
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        custom_map: { custom_dimension_1: 'test_group' }
      });
      
      window.gtag('event', 'page_view', {
        custom_dimension_1: `ad_layout_${testGroup}`
      });
    }
  }, []);

  return null;
}
