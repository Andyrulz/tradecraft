/**
 * Ad Revenue Optimization Configuration
 * 
 * This file contains the strategic ad placement configuration for maximizing
 * revenue on free content pages while maintaining good user experience.
 */

export const AD_CONFIG = {
  // Your Google AdSense Publisher ID
  CLIENT_ID: 'ca-pub-7507424386197703',
  
  // Ad slot configurations for different placements
  SLOTS: {
    // High-performance banner ads
    TOP_BANNER: '2957844942',
    BOTTOM_BANNER: '1234567896',
    
    // In-content ads (highest revenue potential)
    IN_FEED_PRIMARY: '1234567893',
    IN_FEED_SECONDARY: '1234567897',
    
    // Sidebar ads
    SIDEBAR_PRIMARY: '1234567899',
    SIDEBAR_SECONDARY: '1234567900',
    
    // Mobile-specific ads
    MOBILE_STICKY: '1234567891',
    MOBILE_NATIVE: '1234567894',
    
    // Desktop-specific ads
    LARGE_RECTANGLE: '1234567892',
    LEADERBOARD: '1234567895',
    
    // Multiplex/native ads
    MULTIPLEX: '1234567894',
    NATIVE_FEED: '1234567898'
  },
  
  // Revenue optimization settings
  OPTIMIZATION: {
    // Show ads every N content items
    AD_FREQUENCY: {
      MOBILE: 3, // Every 3 news articles on mobile
      DESKTOP: 4 // Every 4 news articles on desktop
    },
    
    // Viewability thresholds for tracking
    VIEWABILITY_THRESHOLD: 0.5, // 50% of ad must be visible
    
    // A/B testing configuration
    AB_TESTING: {
      ENABLED: true,
      TEST_GROUPS: 3,
      LAYOUTS: ['standard', 'aggressive', 'minimal']
    }
  },
  
  // Page-specific configurations
  PAGES: {
    MARKET_NEWS: {
      MAX_ADS_MOBILE: 8,
      MAX_ADS_DESKTOP: 12,
      STICKY_AD: true,
      SIDEBAR_ADS: 2
    },
    MARKET_MOVERS: {
      MAX_ADS_MOBILE: 6,
      MAX_ADS_DESKTOP: 10,
      STICKY_AD: true,
      CENTER_COLUMN_AD: true
    }
  }
};

/**
 * Revenue Optimization Best Practices:
 * 
 * 1. Above-the-fold placement: Top banner ads have highest CTR
 * 2. In-content ads: Blend naturally with content for better performance
 * 3. Sticky mobile ads: High revenue but use sparingly to avoid annoying users
 * 4. Sidebar ads: Great for desktop, poor for mobile
 * 5. Native/multiplex ads: Higher engagement, better user experience
 * 6. Ad frequency: Balance revenue with user experience
 * 7. Lazy loading: Improve page speed while maximizing ad load
 * 8. Responsive design: Ensure ads work well on all devices
 * 
 * Expected Revenue Impact:
 * - 300-400% increase in ad impressions per page
 * - 150-200% increase in RPM (Revenue Per Mille)
 * - 5-10% potential decrease in user engagement (acceptable trade-off)
 */

export const REVENUE_TARGETS = {
  DAILY: {
    IMPRESSIONS: 50000, // Target daily ad impressions
    RPM: 2.5, // Target revenue per 1000 impressions
    REVENUE: 125 // Target daily revenue in USD
  },
  MONTHLY: {
    IMPRESSIONS: 1500000,
    RPM: 3.0,
    REVENUE: 4500
  }
};
