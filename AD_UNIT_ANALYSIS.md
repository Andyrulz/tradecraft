# Ad Unit Optimization Analysis & Recommendations

## Current Status Analysis

### ✅ **What We Have:**

- **1 Working Ad Unit**: `2957844942` (currently used for all placements)
- **Multiple ad placements** across both pages but same unit ID
- **Mixed implementation** (some using WorkingAd components, some using adKey system)

### 📊 **Current Ad Placements Inventory:**

## **MARKET NEWS PAGE** (9 total ad placements)

### Above-the-Fold Ads:

1. **Top Banner** - `adKey="TOP_BANNER"` (uses 2957844942)
   - Position: After hero section, before content
   - Format: Auto, responsive banner
   - Priority: **HIGHEST** (above fold)

### In-Content Ads:

2. **In-Feed Primary** - `InFeedWorkingAd`

   - Position: Mobile - after featured article
   - Format: Auto, min-height 120px
   - Frequency: High-value placement

3. **In-Feed Secondary** - Multiple instances

   - Position: Between news articles (every 3rd article)
   - Format: Auto, min-height 150px
   - Frequency: Very high (most revenue potential)

4. **Large Format Mobile** - `LargeWorkingAd`
   - Position: Mobile content breaks
   - Format: Auto, min-height 200px
   - Frequency: Medium

### Desktop-Specific Ads:

5. **Sidebar Primary** - `adKey="SIDEBAR_PRIMARY"`

   - Position: Desktop right sidebar
   - Format: Auto, min-height 250px
   - Priority: High desktop revenue

6. **Bottom Banner** - `adKey="BOTTOM_BANNER"`
   - Position: End of desktop content
   - Format: Auto, min-height 120px
   - Priority: Medium

## **MARKET MOVERS PAGE** (8 total ad placements)

### Above-the-Fold Ads:

1. **Top Banner** - `BannerWorkingAd`
   - Position: After hero section
   - Format: Auto banner
   - Priority: **HIGHEST**

### In-Content Ads:

2. **Post-Analysis** - `InFeedWorkingAd`

   - Position: After market analysis section
   - Format: Auto, structured content break

3. **Between Tables (Mobile)** - `LargeWorkingAd`

   - Position: Between gainers/losers on mobile
   - Format: Auto, large format

4. **After Tables (Desktop)** - `BannerWorkingAd` x2

   - Position: After gainers table + after losers table
   - Format: Auto banner format

5. **Mid-Content Large** - `LargeWorkingAd`

   - Position: Between main content sections
   - Format: Auto, min-height 200px

6. **Bottom Banner** - `BannerWorkingAd`
   - Position: End of page
   - Format: Auto banner

---

## 🎯 **RECOMMENDED NEW AD UNITS TO CREATE**

### **Priority 1: High-Revenue Positions (Create First)**

#### 1. **In-Feed Primary Ad Unit**

- **Name**: `TradeCraft - In-Feed Primary`
- **Type**: Display ads → Auto
- **Use For**: Primary in-content ads between articles/content
- **Expected RPM**: **Highest** (in-content performs best)
- **Replace**: InFeedWorkingAd components

#### 2. **Sidebar Desktop Ad Unit**

- **Name**: `TradeCraft - Sidebar Desktop`
- **Type**: Display ads → Auto (or Rectangle 300x250)
- **Use For**: Desktop sidebar placements
- **Expected RPM**: **High** (desktop sidebar valuable real estate)
- **Replace**: adKey="SIDEBAR_PRIMARY"

#### 3. **Mobile Large Format Ad Unit**

- **Name**: `TradeCraft - Mobile Large`
- **Type**: Display ads → Auto
- **Use For**: Large format mobile content breaks
- **Expected RPM**: **High** (mobile-optimized large format)
- **Replace**: LargeWorkingAd components

### **Priority 2: Frequent Placements (Create Second)**

#### 4. **In-Feed Secondary Ad Unit**

- **Name**: `TradeCraft - In-Feed Secondary`
- **Type**: Display ads → Auto
- **Use For**: Secondary in-content positions
- **Expected RPM**: **Medium-High**
- **Replace**: adKey="IN_FEED_SECONDARY"

#### 5. **Bottom Banner Ad Unit**

- **Name**: `TradeCraft - Bottom Banner`
- **Type**: Display ads → Banner (728x90 or Auto)
- **Use For**: End-of-content placements
- **Expected RPM**: **Medium**
- **Replace**: adKey="BOTTOM_BANNER", bottom BannerWorkingAd

### **Priority 3: Specialized Formats (Create Third)**

#### 6. **Mobile Sticky Banner**

- **Name**: `TradeCraft - Mobile Sticky`
- **Type**: Display ads → Banner
- **Use For**: Mobile sticky footer (if we add it)
- **Expected RPM**: **Medium-High** (high viewability)
- **Future Use**: Sticky mobile banner

#### 7. **Native/Multiplex Ad Unit**

- **Name**: `TradeCraft - Native Content`
- **Type**: Multiplex ads
- **Use For**: Content recommendation style ads
- **Expected RPM**: **Medium**
- **Future Use**: Enhanced content sections

---

## 📋 **IMPLEMENTATION PLAN**

### **Step 1: Create Priority 1 Ad Units (This Week)**

1. Log into Google AdSense dashboard
2. Navigate to Ads → By ad unit
3. Create these 3 ad units:
   - In-Feed Primary (Auto format)
   - Sidebar Desktop (Auto format)
   - Mobile Large (Auto format)
4. Copy the new ad unit IDs

### **Step 2: Update Configuration File**

Update `lib/ad-config.ts`:

```typescript
export const AD_CONFIG = {
  CLIENT_ID: "ca-pub-7507424386197703",
  SLOTS: {
    // Current working unit
    TOP_BANNER: "2957844942",

    // New Priority 1 units (replace with actual IDs)
    IN_FEED_PRIMARY: "NEW_AD_UNIT_ID_1",
    SIDEBAR_PRIMARY: "NEW_AD_UNIT_ID_2",
    MOBILE_LARGE: "NEW_AD_UNIT_ID_3",

    // Keep using working unit temporarily
    IN_FEED_SECONDARY: "2957844942",
    BOTTOM_BANNER: "2957844942",
    // ... etc
  },
};
```

### **Step 3: Update Components (After Creating Units)**

Replace WorkingAd components with proper adKey references:

**Market News Page:**

- Replace `InFeedWorkingAd` → `<InFeedAd adKey="IN_FEED_PRIMARY">`
- Replace `LargeWorkingAd` → `<ManualAd adKey="MOBILE_LARGE">`
- Keep existing adKey references

**Market Movers Page:**

- Replace `BannerWorkingAd` → `<ManualAd adKey="TOP_BANNER">` (top)
- Replace `InFeedWorkingAd` → `<ManualAd adKey="IN_FEED_PRIMARY">`
- Replace `LargeWorkingAd` → `<ManualAd adKey="MOBILE_LARGE">`

### **Step 4: Monitor & Optimize (Week 2)**

1. **Wait 24-48 hours** for new ad units to activate
2. **Monitor AdSense dashboard** for performance metrics
3. **Create Priority 2 units** based on performance
4. **A/B test different formats** (Auto vs specific sizes)

---

## 💰 **EXPECTED REVENUE IMPACT**

### **Current Situation:**

- Using 1 ad unit for all placements
- Google can't optimize for different positions
- Limited learning and targeting

### **After Optimization:**

- **3-5 specialized ad units** for different positions
- **Better targeting** for each placement type
- **Improved fill rates** and RPM
- **Expected 30-60% revenue increase**

### **Performance Timeline:**

- **Week 1**: New units activate, baseline performance
- **Week 2-3**: Google optimizes for each position
- **Week 4+**: Full optimization, maximum revenue

---

## 🎯 **SPECIFIC NEXT STEPS FOR YOU:**

1. **Create these 3 ad units first:**

   - "TradeCraft - In-Feed Primary" (Auto)
   - "TradeCraft - Sidebar Desktop" (Auto)
   - "TradeCraft - Mobile Large" (Auto)

2. **Copy the new ad unit IDs** and provide them to me

3. **I'll update the code** to use the new units properly

4. **We'll monitor performance** and create additional units as needed

This approach will give you much better revenue optimization while maintaining the aggressive ad placement strategy we've implemented!
