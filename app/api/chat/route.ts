import { NextRequest, NextResponse } from 'next/server';

// Environment variables
const AZURE_AI_ENDPOINT = process.env.AZURE_AI_ENDPOINT || 'https://aabishek-aifoundry1.services.ai.azure.com/api/projects/Aifoundry';
const AZURE_AGENT_ID = process.env.AZURE_AGENT_ID || 'asst_iCPILl2X9CpPcXf6MzGj4Yg8';
const AZURE_API_KEY = process.env.AZURE_API_KEY;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatRequest {
  message: string;
  threadId?: string;
  sessionId?: string;
}

interface AzureAgentResponse {
  success: boolean;
  response: string;
  threadId: string;
  conversation?: ChatMessage[];
  error?: string;
}

// Store for managing threads (in production, use Redis or database)
const threadStore = new Map<string, string>();

async function callAzureAgent(message: string, threadId?: string): Promise<AzureAgentResponse> {
  try {
    // For now, we'll create a simplified interface that can be enhanced with actual Azure AI integration
    // This is a placeholder implementation that you can replace with the actual Azure AI client code
    
    // Generate or use existing thread ID
    const currentThreadId = threadId || `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store conversation context
    if (!threadStore.has(currentThreadId)) {
      threadStore.set(currentThreadId, JSON.stringify([]));
    }
    
    const conversation: ChatMessage[] = JSON.parse(threadStore.get(currentThreadId) || '[]');
    
    // Add user message
    conversation.push({
      role: 'user',
      content: message,
      timestamp: Date.now()
    });
    
    // Simulate AI response based on TradeCraft context
    const response = generateTradeCraftResponse(message, conversation);
    
    // Add assistant response
    conversation.push({
      role: 'assistant',
      content: response,
      timestamp: Date.now()
    });
    
    // Store updated conversation
    threadStore.set(currentThreadId, JSON.stringify(conversation.slice(-20))); // Keep last 20 messages
    
    return {
      success: true,
      response,
      threadId: currentThreadId,
      conversation: conversation.slice(-10) // Return last 10 for context
    };
    
  } catch (error) {
    console.error('Azure Agent Error:', error);
    return {
      success: false,
      response: 'I apologize, but I\'m experiencing technical difficulties. Please try again later.',
      threadId: threadId || 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function generateTradeCraftResponse(message: string, conversation: ChatMessage[]): string {
  const lowerMessage = message.toLowerCase();
  
  // Blog and Educational Content queries
  if (lowerMessage.includes('blog') || lowerMessage.includes('article') || lowerMessage.includes('guide')) {
    if (lowerMessage.includes('beginner')) {
      return "Perfect! Here are our top beginner resources:\n\n📚 **Essential Guides:**\n• \"How to Analyze Stocks for Beginners: Complete 2025 Guide\"\n• \"Complete Guide to Swing Trading Stocks\"\n• \"Technical Analysis Guide for Stock Trading\"\n• \"Risk Management in Stock Trading\"\n\n🎯 **Learning Path:**\n1. Start with stock analysis basics\n2. Learn technical analysis\n3. Practice with our free trade plan generator\n4. Focus on risk management\n\nWhich topic would you like to explore first?";
    }
    return "Our blog has 25+ comprehensive trading guides! Here are some popular categories:\n\n📈 **Strategy Guides:**\n• Day Trading Strategies That Work\n• Best Swing Trading Stocks for 2025\n• Options Trading for Beginners\n• Cryptocurrency Trading Guide\n\n🛠️ **Platform Tutorials:**\n• Trade Plan Generator Guide\n• Momentum Stock Screener\n• Market Analysis Tools\n\n🧠 **Psychology & Performance:**\n• Trading Psychology: Master Your Mind\n• How to Achieve Super Performance\n\nWhat type of content interests you most?";
  }

  // Stock-related queries - Enhanced
  if (lowerMessage.includes('stock') || lowerMessage.includes('trade')) {
    if (lowerMessage.includes('plan') || lowerMessage.includes('strategy')) {
      return "🚀 **Trade Plan Generator** - Our AI-powered tool creates professional trading plans!\n\n**What it includes:**\n✅ Entry and exit price recommendations\n✅ Stop-loss calculations based on technical analysis\n✅ Position sizing suggestions\n✅ Risk-reward ratio analysis\n✅ Support/resistance levels\n✅ Technical indicator analysis (RSI, MACD, etc.)\n\n**How to use:** Simply enter a stock symbol and timeframe. The AI analyzes the stock and generates a complete trading plan.\n\n**Best for:** Swing traders, day traders, and structured investors.\n\nWant me to explain any specific aspect?";
    }
    if (lowerMessage.includes('screen') || lowerMessage.includes('find')) {
      return "📊 **Stock Screener** - Find your next trading opportunity!\n\n**Available Screeners:**\n🎯 Momentum Screener - Strong price/volume momentum\n📈 Small Cap Screener - High-growth opportunities  \n💥 Breakout Scanner - Stocks breaking key levels\n⚙️ Custom Filters - Create your own criteria\n\n**Key Metrics:**\n• Price performance (1D, 5D, 1M, 3M)\n• Volume analysis & unusual volume alerts\n• Market cap & sector filtering\n• Technical pattern recognition\n\n**Update:** Data refreshes every 15 minutes during market hours.\n\nWhich type of stocks are you looking for?";
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('data')) {
      return "📊 **Market Data Sources:**\n\n**Primary:** Finnhub API (reliable market data)\n**Backup:** Financial Modeling Prep (FMP)\n**Coverage:** All major US exchanges (NYSE, NASDAQ, AMEX)\n\n**Data Delays:**\n• Free Plan: 15-20 minute delay\n• Premium Plan: Real-time data\n\n**Includes:** Prices, volume, technical indicators, news, and fundamentals.\n\nThis delay is standard due to exchange data fees. Premium subscribers get immediate access for faster trading decisions. Would you like to know more about upgrading?";
    }
  }
  
  // Platform features - Enhanced
  if (lowerMessage.includes('feature') || lowerMessage.includes('tool')) {
    return "🛠️ **TradeCraft Pro Core Tools:**\n\n📈 **Trade Plan Generator**\n• AI-powered plan creation\n• Entry/exit recommendations\n• Risk management built-in\n\n📊 **Stock Screener** (Premium)\n• Momentum & breakout scanning\n• Custom filter creation\n• Real-time alerts\n\n📰 **Market News & Analysis**\n• Curated financial news\n• Stock-specific updates\n• Market sentiment indicators\n\n🔥 **Market Movers**\n• Top gainers/losers\n• Volume leaders\n• Unusual activity alerts\n\n📚 **Educational Resources**\n• 25+ trading guides\n• Video tutorials\n• Trading courses (coming soon)\n\nWhich tool interests you most?";
  }
  
  // Subscription and pricing - Enhanced
  if (lowerMessage.includes('subscription') || lowerMessage.includes('premium') || lowerMessage.includes('upgrade') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "💰 **TradeCraft Pro Pricing Plans:**\n\n🆓 **Free - $0/month**\n• 1 trade plan per day\n• Market news & movers\n• Basic educational content\n• Perfect for getting started\n\n⭐ **Pro - $9.75/month**\n• 100 trade plans per day\n• Email support\n• Premium blog content\n• Less than a meal cost!\n\n🏆 **Premium - $14.65/month** (Most Popular)\n• Unlimited trade plans\n• Full momentum screener access\n• Priority support\n• Early feature access\n• Premium newsletters\n• Champion Trading Course (coming soon)\n\n💡 **ROI:** Most users recover the cost with just one successful trade!\n\nCancel anytime through PayPal. Which plan interests you?";
  }
  
  // Mobile and technical support
  if (lowerMessage.includes('mobile') || lowerMessage.includes('phone') || lowerMessage.includes('tablet')) {
    return "📱 **Mobile Optimization:**\n\n✅ **Full mobile functionality**\n• Responsive design for all devices\n• Touch-optimized interface\n• Mobile charts & analysis\n• Fast trade plan generation\n\n📊 **Mobile Features:**\n• Complete stock screening\n• Real-time market movers\n• All educational content\n• Chat support (like this!)\n\n🔧 **Tips for Mobile:**\n• Use landscape mode for charts\n• Bookmark frequently used screens\n• Clear cache if experiencing issues\n\n**Supported:** All modern mobile browsers. Dedicated mobile app coming soon!\n\nAny specific mobile features you'd like help with?";
  }
  
  // Learning and education - Enhanced
  if (lowerMessage.includes('learn') || lowerMessage.includes('education') || lowerMessage.includes('beginner') || lowerMessage.includes('start')) {
    return "🎓 **TradeCraft Education Hub:**\n\n**📚 For Complete Beginners:**\n1. \"How to Analyze Stocks for Beginners\"\n2. \"Technical Analysis Guide\"\n3. \"Risk Management Essentials\"\n4. Practice with free trade plans\n5. \"Complete Guide to Swing Trading\"\n\n**📈 For Intermediate Traders:**\n• \"Day Trading Strategies That Work\"\n• \"Trading Psychology: Master Your Mind\" \n• Platform mastery tutorials\n• Pro plan for more practice\n\n**🚀 For Advanced Traders:**\n• \"How to Achieve Super Performance\"\n• Premium screener access\n• Options & crypto guides\n• Premium newsletters\n\n**🎯 Recommended Learning Path:**\nBeginner → Technical Analysis → Risk Management → Strategy Selection → Platform Mastery\n\nWhat's your current trading experience level?";
  }

  // Trading strategies and methodology
  if (lowerMessage.includes('strategy') || lowerMessage.includes('trading') || lowerMessage.includes('method')) {
    if (lowerMessage.includes('day')) {
      return "⚡ **Day Trading with TradeCraft:**\n\n📊 **Best Strategies:**\n• Momentum trading (5-15 min charts)\n• Breakout trading with volume\n• Gap trading at market open\n• Scalping with tight stops\n\n🛠️ **Tools to Use:**\n• Trade Plan Generator (short timeframes)\n• Market Movers for momentum\n• Real-time data (Premium)\n• Volume alerts\n\n⚠️ **Risk Management:**\n• Never risk more than 1-2% per trade\n• Use tight stop-losses\n• Have a daily loss limit\n• Start with paper trading\n\n📚 **Read:** \"Day Trading Strategies That Actually Work\"\n\nNew to day trading? I recommend starting with swing trading first!";
    }
    if (lowerMessage.includes('swing')) {
      return "🎯 **Swing Trading with TradeCraft:**\n\n📊 **Perfect Strategy for:**\n• Working professionals\n• Part-time traders\n• Learning technical analysis\n• Building consistent profits\n\n🛠️ **Key Tools:**\n• Daily/weekly trade plans\n• Support/resistance levels\n• Moving average analysis\n• Risk-reward calculations\n\n📈 **Entry Signals:**\n• Breakouts from consolidation\n• Pullbacks to support\n• Moving average bounces\n• Volume confirmation\n\n⏰ **Timeframes:** Daily charts recommended\n📚 **Guide:** \"Complete Guide to Swing Trading Stocks\"\n📝 **Read:** \"Best Swing Trading Stocks for 2025\"\n\nWant help finding swing trading opportunities?";
    }
    return "📊 **Trading Strategies Available:**\n\n⚡ **Day Trading** - Quick profits, active monitoring\n🎯 **Swing Trading** - Hold days to weeks\n📈 **Momentum Trading** - Ride strong trends\n💥 **Breakout Trading** - Trade key level breaks\n📉 **Options Trading** - Advanced strategies\n\nEach strategy needs different:\n• Timeframes\n• Risk management\n• Tools and indicators\n• Time commitment\n\n**Beginner-friendly:** Start with swing trading using daily charts\n**Experienced:** Day trading requires more skill and time\n\nWhat's your experience level and available time for trading?";
  }

  // Technical issues and troubleshooting
  if (lowerMessage.includes('error') || lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('bug')) {
    return "🔧 **Technical Support:**\n\n**Common Solutions:**\n🔄 Refresh the page\n🧹 Clear browser cache & cookies\n🔐 Try incognito/private mode\n📱 Update browser to latest version\n\n**Data Issues:**\n• Check if outside market hours\n• Verify subscription includes real-time data\n• Try different stock symbol\n\n**Login Problems:**\n• Verify email/password\n• Use password reset\n• Clear browser cookies\n\n**Mobile Issues:**\n• Check internet connection\n• Update mobile browser\n• Clear mobile cache\n\n**Still need help?**\nPro/Premium users: Email support@tradingsetup.pro\nResponse time: 24 hours (faster for Premium)\n\nWhat specific issue are you experiencing?";
  }

  // Account and billing
  if (lowerMessage.includes('account') || lowerMessage.includes('billing') || lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
    return "👤 **Account & Billing Help:**\n\n**Subscription Management:**\n• Upgrade/downgrade anytime\n• Cancel through PayPal (no fees)\n• Changes take effect next billing cycle\n• No long-term commitments\n\n**Billing Questions:**\n• All subscriptions through PayPal\n• Secure payment processing\n• Automatic renewals (can disable)\n• Email receipts sent automatically\n\n**Refund Policy:**\n• Case-by-case evaluation\n• Contact within 7 days of purchase\n• Email support@tradingsetup.pro\n\n**Account Access:**\n• Email/password login\n• Secure authentication\n• Data synchronized across devices\n\n**Need help with:** Login issues, billing questions, or account changes?";
  }
  
  // Greeting - Enhanced
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || message.trim().length < 10) {
    return "Hello! Welcome to TradeCraft Pro! 👋\n\nI'm your AI trading assistant, ready to help you succeed in the markets! I can help with:\n\n🎯 **Platform Navigation:**\n• Trade plan generation\n• Stock screening tools\n• Market analysis features\n\n📚 **Education & Learning:**\n• 25+ trading guides\n• Strategy tutorials\n• Beginner to advanced content\n\n💰 **Subscriptions & Pricing:**\n• Plan comparisons\n• Feature explanations\n• Upgrade guidance\n\n🔧 **Technical Support:**\n• Troubleshooting help\n• Account assistance\n• Mobile optimization\n\nWhat brings you to TradeCraft today? Are you new to trading or looking to improve your current strategy?";
  }
  
  // Default response - Enhanced
  return "Thanks for your question! 🤔\n\nI'm here to help with everything TradeCraft Pro! I can assist with:\n\n🛠️ **Platform Tools:**\n• Trade Plan Generator walkthrough\n• Stock Screener tutorials\n• Market data explanations\n\n📚 **Educational Content:**\n• Trading strategy guides\n• Technical analysis tutorials\n• Risk management principles\n\n💡 **Getting Started:**\n• Account setup help\n• Subscription explanations\n• Feature recommendations\n\n🔧 **Technical Support:**\n• Troubleshooting issues\n• Mobile optimization\n• Browser compatibility\n\nCould you be more specific about what you'd like help with? For example:\n• \"How do I create a trade plan?\"\n• \"What's included in Premium?\"\n• \"Show me beginner trading guides\"\n• \"Help with mobile issues\"\n\nWhat can I help you with today?";
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, threadId } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long. Please keep messages under 1000 characters.' },
        { status: 400 }
      );
    }

    const result = await callAzureAgent(message, threadId);
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'An unexpected error occurred',
        response: 'I apologize, but I\'m experiencing technical difficulties. Please try again later.',
        threadId: 'error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle GET request for health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'TradeCraft AI Chat Agent',
    timestamp: new Date().toISOString()
  });
}
