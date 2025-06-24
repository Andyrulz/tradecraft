'use client';

import { useEffect, useState } from 'react';
import { ManualAd } from './HybridAds';
import { AD_CONFIG } from '@/lib/ad-config';

interface OptimizedAdPlacementProps {
  adKey: keyof typeof AD_CONFIG.SLOTS;
  priority?: 'high' | 'medium' | 'low';
  className?: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'rectangle' | 'banner' | 'leaderboard';
  fallbackContent?: React.ReactNode;
}

export function OptimizedAdPlacement({
  adKey,
  priority = 'medium',
  className = 'my-6',
  style,
  format = 'auto',
  fallbackContent
}: OptimizedAdPlacementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loadDelay, setLoadDelay] = useState(0);

  useEffect(() => {
    // Prioritize ad loading based on priority
    const delays = {
      high: 0,
      medium: 500,
      low: 1000
    };
    
    setLoadDelay(delays[priority]);
    
    // Use Intersection Observer to load ads only when they're about to be visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), loadDelay);
          }
        });
      },
      { rootMargin: '200px' } // Load 200px before the ad becomes visible
    );

    const adContainer = document.getElementById(`ad-${adKey}`);
    if (adContainer) {
      observer.observe(adContainer);
    }

    return () => observer.disconnect();
  }, [adKey, priority, loadDelay]);

  const defaultStyle = {
    display: 'block',
    minHeight: format === 'banner' ? 60 : format === 'rectangle' ? 280 : 120,
    ...style
  };

  return (
    <div 
      id={`ad-${adKey}`} 
      className={`${className} transition-opacity duration-300`}
    >
      {isVisible ? (
        <ManualAd
          adKey={adKey}
          format={format}
          className="w-full"
          style={defaultStyle}
        />
      ) : (
        <div 
          className="bg-gray-100 rounded animate-pulse flex items-center justify-center"
          style={defaultStyle}
        >
          {fallbackContent || (
            <span className="text-gray-400 text-sm">Loading...</span>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-configured ad components for common placements
export const HighPriorityBannerAd = (props: Omit<OptimizedAdPlacementProps, 'priority' | 'format'>) => (
  <OptimizedAdPlacement {...props} priority="high" format="banner" />
);

export const MediumPriorityInFeedAd = (props: Omit<OptimizedAdPlacementProps, 'priority' | 'format'>) => (
  <OptimizedAdPlacement {...props} priority="medium" format="auto" />
);

export const LowPrioritySidebarAd = (props: Omit<OptimizedAdPlacementProps, 'priority' | 'format'>) => (
  <OptimizedAdPlacement {...props} priority="low" format="auto" />
);
