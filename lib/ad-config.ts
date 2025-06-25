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
    // High-performance banner ads (Use your existing real ad unit)
    TOP_BANNER: '2957844942',
    BOTTOM_BANNER: '2957844942', // Reuse existing ad unit temporarily
      // In-content ads (highest revenue potential) - NEW SPECIALIZED UNITS
    IN_FEED_PRIMARY: '6142335506', // NEW: TradeCraft In-Feed Primary
    IN_FEED_SECONDARY: '2957844942', // Reuse until you create new ad units
    
    // Sidebar ads - NEW SPECIALIZED UNIT
    SIDEBAR_PRIMARY: '4185691359', // NEW: TradeCraft Sidebar Desktop
    SIDEBAR_SECONDARY: '2957844942',
      // Mobile-specific ads - NEW SPECIALIZED UNIT
    MOBILE_LARGE: '3320731043', // NEW: TradeCraft Mobile Large (fluid/native)
    MOBILE_STICKY: '2957844942',
    MOBILE_NATIVE: '2957844942',
    
    // Desktop-specific ads  
    LARGE_RECTANGLE: '2957844942',
    LEADERBOARD: '2957844942',
    
    // Multiplex/native ads
    MULTIPLEX: '2957844942',
    NATIVE_FEED: '2957844942'
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
