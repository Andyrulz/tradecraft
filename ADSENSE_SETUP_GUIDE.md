# Google AdSense Ad Unit Setup Guide

## Current Status

- **Publisher ID**: `ca-pub-7507424386197703`
- **Working Ad Unit**: `2957844942` (Currently used for all placements)
- **Issue**: Using the same ad unit for all placements limits optimization

## Step 1: Create Additional Ad Units in Google AdSense

1. **Log into Google AdSense** at https://www.google.com/adsense/
2. **Navigate to "Ads" → "By ad unit"**
3. **Create the following ad units:**

### Required Ad Units to Create:

#### High-Priority Ad Units (Create First):

1. **In-Feed Primary Ad**

   - Name: "TradeCraft - In-Feed Primary"
   - Type: "Display ads" → "Auto"
   - Save the ad unit ID

2. **Sidebar Primary Ad**

   - Name: "TradeCraft - Sidebar Primary"
   - Type: "Display ads" → "Auto"
   - Save the ad unit ID

3. **Mobile Sticky Banner**
   - Name: "TradeCraft - Mobile Sticky"
   - Type: "Display ads" → "Banner"
   - Save the ad unit ID

#### Medium-Priority Ad Units:

4. **In-Feed Secondary Ad**

   - Name: "TradeCraft - In-Feed Secondary"
   - Type: "Display ads" → "Auto"

5. **Bottom Banner Ad**

   - Name: "TradeCraft - Bottom Banner"
   - Type: "Display ads" → "Auto"

6. **Multiplex/Native Ad**
   - Name: "TradeCraft - Multiplex"
   - Type: "Display ads" → "Auto"

## Step 2: Update Ad Configuration

Once you have the new ad unit IDs, update `lib/ad-config.ts`:

```typescript
export const AD_CONFIG = {
  CLIENT_ID: "ca-pub-7507424386197703",
  SLOTS: {
    TOP_BANNER: "2957844942", // Your existing working ad unit
    IN_FEED_PRIMARY: "NEW_AD_UNIT_ID_1", // Replace with new ID
    SIDEBAR_PRIMARY: "NEW_AD_UNIT_ID_2", // Replace with new ID
    MOBILE_STICKY: "NEW_AD_UNIT_ID_3", // Replace with new ID
    // ... etc
  },
};
```

## Step 3: Revenue Optimization Tips

### Best Practices:

1. **Auto ads format** works best for most placements
2. **Above-the-fold placements** generate highest revenue
3. **In-content ads** (between articles) perform very well
4. **Mobile sticky banners** have high viewability

### Strategic Placement Order (by Revenue Potential):

1. **Top Banner** (Above fold) - Highest revenue
2. **In-Feed Ads** (Between content) - High revenue
3. **Sidebar Ads** (Desktop only) - Medium revenue
4. **Bottom Banner/Footer** - Lower revenue
5. **Mobile Sticky** - High mobile revenue

## Step 4: Testing and Optimization

### A/B Testing Strategy:

1. Start with **Auto format** for all new ad units
2. Monitor performance for 1-2 weeks
3. Test different ad sizes for top-performing placements
4. Adjust ad frequency based on user engagement metrics

### Key Metrics to Monitor:

- **RPM (Revenue per 1000 impressions)**
- **CTR (Click-through rate)**
- **Viewability percentage**
- **User bounce rate** (ensure ads don't hurt UX)

## Step 5: Implementation Checklist

- [ ] Create new ad units in Google AdSense
- [ ] Update `lib/ad-config.ts` with new ad unit IDs
- [ ] Test ad loading on development server
- [ ] Deploy to production
- [ ] Monitor Google AdSense dashboard for ad serving
- [ ] Check Google Search Console for any ad-related issues
- [ ] Monitor site performance and user metrics

## Common Issues and Solutions

### Ads Not Showing:

1. **Wait 24-48 hours** after creating new ad units
2. **Check ad unit status** in AdSense dashboard
3. **Verify site is approved** for AdSense
4. **Ensure proper AdSense script loading** in app/layout.tsx

### Low Revenue:

1. **Increase ad frequency** (but monitor user experience)
2. **Test different ad formats** (rectangle, banner, auto)
3. **Optimize ad placement** (above fold, in-content)
4. **Enable Auto Ads** for additional placements

### Technical Issues:

1. **Console errors**: Check browser developer tools
2. **Ad blocker detection**: Test without ad blockers
3. **Mobile optimization**: Test on real mobile devices
4. **Page speed**: Ensure ads load asynchronously

## Next Steps After Setup

1. **Monitor for 1 week** to gather baseline metrics
2. **Create additional ad units** for A/B testing
3. **Implement lazy loading** for below-fold ads
4. **Add ad analytics** for detailed performance tracking
5. **Consider header bidding** for premium inventory
