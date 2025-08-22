# Customer Service Agent Knowledge Base - Tradecraft Platform

## Table of Contents

1. [Platform Overview](#platform-overview)
2. [Core Features & Services](#core-features--services)
3. [Common Customer Queries](#common-customer-queries)
4. [Technical Troubleshooting](#technical-troubleshooting)
5. [Account & Subscription Management](#account--subscription-management)
6. [Trading Education & Resources](#trading-education--resources)
7. [Data & API Information](#data--api-information)
8. [SEO & Content Strategy](#seo--content-strategy)
9. [Escalation Procedures](#escalation-procedures)
10. [Compliance & Legal](#compliance--legal)

---

## Platform Overview

### What is Tradecraft?

Tradecraft is a comprehensive stock trading platform that provides:

- Real-time market data and analysis
- Trading plan generation tools
- Stock screening capabilities
- Market movers tracking
- Educational content and resources
- Technical analysis tools

### Target Audience

- Beginner to advanced traders
- Swing traders and day traders
- Investors seeking market insights
- Users looking for educational trading content

### Platform Architecture

- Built on Next.js framework
- Uses Supabase for backend services
- Integrates with multiple financial data providers (Finnhub, FMP)
- Implements caching strategies for performance optimization
- Mobile-responsive design

---

## Core Features & Services

### 1. Stock Screener

**Purpose**: Help users find stocks based on specific criteria
**Features**:

- Momentum screening
- Custom filtering options
- Real-time data updates
- Export capabilities

**Common Issues**:

- Slow loading times (due to API rate limits)
- Timeout errors during heavy market hours
- Filtering not working as expected

**Solutions**:

- Explain that data refreshes every 15 minutes
- Suggest using filters during off-peak hours
- Guide users to bookmark frequently used screens

### 2. Trade Plan Generator

**Purpose**: Create detailed trading plans for specific stocks
**Features**:

- Risk assessment calculations
- Entry/exit point suggestions
- Position sizing recommendations
- Stop-loss calculations

**Key Components**:

- Risk hierarchy analysis
- Swing low identification
- Technical indicator integration
- Timeframe-specific recommendations

**Common User Questions**:

- "How accurate are the trading plans?"
- "Can I customize the risk parameters?"
- "Why do plans differ for different timeframes?"

**Responses**:

- Plans are based on technical analysis and historical data, not guaranteed predictions
- Risk parameters can be adjusted in user settings
- Different timeframes require different strategies (day trading vs. swing trading)

### 3. Market Movers

**Purpose**: Track stocks with significant price movements
**Features**:

- Top gainers and losers
- Volume leaders
- Real-time updates
- Detailed stock analysis

**Technical Details**:

- Data refreshes every 15 minutes
- Cached for performance optimization
- Filters available for different market caps

### 4. Market News

**Purpose**: Provide relevant financial news and analysis
**Features**:

- Curated news feed
- Stock-specific news
- Market sentiment analysis
- News scoring algorithm

**Content Sources**:

- Financial news APIs
- Market data providers
- Curated content team

---

## Common Customer Queries

### Account Access Issues

**Query**: "I can't log into my account"
**Response Steps**:

1. Verify email address used for registration
2. Check for typos in password
3. Suggest password reset if needed
4. Check if account is verified (email confirmation)
5. Escalate to technical team if issues persist

**Query**: "My data isn't loading"
**Response Steps**:

1. Check internet connection
2. Try refreshing the page
3. Clear browser cache and cookies
4. Check if using supported browser
5. Verify if it's a platform-wide issue

### Subscription & Billing

**Query**: "What's included in my subscription?"
**Response**:

- Detail the features available in their current plan
- Explain the difference between free and premium features
- Provide upgrade options if applicable

**Query**: "How do I cancel my subscription?"
**Response**:

1. Guide to account settings
2. Explain cancellation process
3. Mention refund policy if applicable
4. Offer to help resolve any issues causing cancellation

### Data Accuracy

**Query**: "Why is the stock price different from other platforms?"
**Response**:

- Explain data delay (usually 15-20 minutes for free tier)
- Mention data provider differences
- Clarify between real-time and delayed data
- Suggest premium subscription for real-time data

### Trading Plan Questions

**Query**: "Why did my trading plan show different results?"
**Response**:

- Market conditions change rapidly
- Plans are based on historical data and current technicals
- Risk tolerance settings may affect recommendations
- Encourage paper trading before real money

---

## Technical Troubleshooting

### Common Technical Issues

#### 1. Slow Loading Times

**Causes**:

- High API usage during market hours
- Cache expiration
- Network connectivity issues

**Solutions**:

- Explain caching mechanism (15-minute refresh cycles)
- Suggest optimal usage times
- Recommend checking internet connection

#### 2. Chart Display Issues

**Symptoms**:

- Charts not loading
- Incorrect timeframes
- Missing indicators

**Troubleshooting Steps**:

1. Refresh the page
2. Check browser compatibility
3. Disable ad blockers temporarily
4. Clear browser cache
5. Try incognito/private browsing mode

#### 3. Mobile App Issues

**Common Problems**:

- Layout not responsive
- Touch interactions not working
- Data not syncing

**Solutions**:

- Update browser to latest version
- Clear mobile browser cache
- Check mobile data/wifi connection
- Suggest using desktop version for complex tasks

### Browser Compatibility

**Supported Browsers**:

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Known Issues**:

- Internet Explorer not supported
- Older browser versions may have display issues

---

## Account & Subscription Management

### Account Types

1. **Free Account**

   - Basic screener access
   - Limited trade plans per day
   - Delayed market data
   - Basic educational content

2. **Premium Account**
   - Unlimited trade plans
   - Real-time data
   - Advanced screening options
   - Priority customer support
   - Exclusive educational content

### Payment Integration

- **Gumroad**: For digital products and courses
- **PayPal**: For subscription payments
- **Webhook system**: For automatic account updates

### Subscription Management

**Common Tasks**:

- Upgrade/downgrade plans
- Update payment methods
- View billing history
- Cancel subscriptions
- Handle failed payments

---

## Trading Education & Resources

### Educational Content Available

#### 1. Blog Articles

- "How to Analyze Stocks for Beginners"
- "Best Swing Trading Stocks 2025"
- "Day Trading Strategies That Work"
- "Complete Guide to Swing Trading Stocks"
- "Cryptocurrency Trading Strategies Guide"

#### 2. Trading Guides

- Risk management principles
- Technical analysis basics
- Position sizing strategies
- Market timing techniques

#### 3. Video Content

- Platform tutorials
- Trading strategy explanations
- Market analysis sessions

### Helping Users Find Resources

**When users ask for learning materials**:

1. Assess their experience level
2. Recommend appropriate starting content
3. Provide links to relevant blog posts
4. Suggest following educational sequence
5. Mention premium educational content if applicable

---

## Data & API Information

### Data Providers

1. **Finnhub**: Primary stock data provider
2. **FMP (Financial Modeling Prep)**: Alternative data source
3. **Internal algorithms**: For trade plan generation

### Data Refresh Rates

- **Market Movers**: Every 15 minutes
- **Stock Prices**: 15-20 minute delay (free), real-time (premium)
- **News**: Updated throughout the day
- **Technical Indicators**: Calculated in real-time based on available data

### API Rate Limits

**Why they exist**:

- Cost management
- Platform stability
- Fair usage across all users

**How they affect users**:

- May experience slower loading during peak hours
- Some features may timeout during high usage
- Premium users get priority access

---

## SEO & Content Strategy

### Content Focus Areas

1. **Educational Trading Content**

   - Beginner guides
   - Advanced strategies
   - Market analysis

2. **Tool-Specific Content**

   - How to use screener
   - Trade plan tutorials
   - Platform features

3. **Market Commentary**
   - Daily market analysis
   - Weekly reviews
   - Trend discussions

### User-Generated Content

- Trade plan sharing
- Strategy discussions
- Educational questions

---

## Escalation Procedures

### When to Escalate

#### Technical Issues

- Platform-wide outages
- Data feed problems
- Payment processing errors
- Account access issues after troubleshooting

#### Account Issues

- Billing disputes
- Subscription problems
- Data accuracy concerns
- Feature requests

### Escalation Process

1. **Level 1**: Customer service representative
2. **Level 2**: Technical support team
3. **Level 3**: Development team
4. **Level 4**: Management team

### Documentation Required

- User account information
- Steps already taken
- Error messages or screenshots
- Browser/device information
- Timeline of issues

---

## Compliance & Legal

### Important Disclaimers

#### Investment Advice

- Platform provides educational content, not investment advice
- Users should consult financial advisors
- Past performance doesn't guarantee future results
- Trading involves risk of loss

#### Data Accuracy

- Data provided for informational purposes
- May contain delays or inaccuracies
- Users should verify information independently
- Platform not liable for trading losses

### Privacy Policy Key Points

- Data collection practices
- Cookie usage
- Third-party integrations
- User rights and choices

### Terms of Service Highlights

- Acceptable use policy
- Subscription terms
- Refund policies
- Limitation of liability

---

## Communication Guidelines

### Tone and Style

- Professional but friendly
- Patient and understanding
- Educational when appropriate
- Clear and concise

### Response Templates

#### Greeting

"Thank you for contacting Tradecraft support. I'm here to help you with [specific issue]. Let me assist you with that."

#### Information Gathering

"To better assist you, could you please provide:

- Your account email
- The specific feature you're having trouble with
- Any error messages you're seeing
- The device/browser you're using"

#### Problem Resolution

"I understand your concern about [issue]. Here's what we can do to resolve this..."

#### Follow-up

"Is there anything else I can help you with today? Please don't hesitate to reach out if you have any other questions."

#### Escalation

"I want to make sure you get the best possible help with this issue. I'm going to connect you with our technical team who can provide more specialized assistance."

---

## Performance Metrics & KPIs

### Response Time Goals

- Initial response: Within 2 hours
- Resolution time: Within 24 hours for standard issues
- Escalated issues: Within 48 hours

### Quality Metrics

- Customer satisfaction score: Target 4.5/5
- First contact resolution rate: Target 80%
- Escalation rate: Target <15%

### Common Success Indicators

- User successfully completes intended action
- Issue resolved without escalation
- User expresses satisfaction
- No repeat contacts for same issue

---

## Additional Resources

### Internal Knowledge Base

- Technical documentation
- Feature specifications
- Known issues tracker
- FAQ database

### External Resources

- Financial education websites
- Regulatory information
- Market data provider documentation
- Trading platform comparisons

### Training Materials

- Platform navigation guides
- Trading basics courses
- Customer service best practices
- Communication skills training

---

## Emergency Procedures

### Platform Outages

1. Acknowledge the issue quickly
2. Provide estimated resolution time if available
3. Keep users updated on progress
4. Direct to status page if available

### Data Feed Issues

1. Verify if issue is platform-wide
2. Check with data provider status
3. Implement backup data sources if available
4. Communicate clearly about data reliability

### Security Incidents

1. Follow security incident response plan
2. Coordinate with security team
3. Communicate appropriately with affected users
4. Document incident for review

---

This knowledge base should be regularly updated based on:

- New platform features
- Common customer feedback
- Technical changes
- Market conditions
- Regulatory updates

Remember: The goal is to provide excellent customer service while maintaining the integrity and reputation of the Tradecraft platform. Always prioritize user education and safety in trading activities.
