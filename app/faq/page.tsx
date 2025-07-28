import React from "react";
import Head from "next/head";
import { HybridAdStrategy } from '@/components/ui/HybridAds';
import { BannerWorkingAd, LargeWorkingAd } from '@/components/ui/WorkingAdUnit';
import MobileLargeAd from '@/components/ui/MobileLargeAd';
import { StructuredData } from '@/components/seo/StructuredData';

const faqs = [
	{
		question: "What is TradeCraft's AI-powered trade plan generator?",
		answer:
			"TradeCraft's trade plan generator uses advanced AI algorithms to analyze over 50 technical indicators, market trends, and risk management principles to create comprehensive trading strategies. Simply enter any stock symbol and receive instant, detailed plans with precise entry points, stop losses, profit targets, and risk-reward analysis - all optimized for your trading style and market conditions.",
	},
	{
		question: "How does the systematic trading strategy development work?",
		answer:
			"Our AI analyzes multiple factors including technical patterns, volume analysis, support/resistance levels, momentum indicators, and market sentiment to build systematic trading strategies. Each strategy includes detailed reasoning, risk assessment, position sizing recommendations, and contingency plans for different market scenarios, helping you trade with discipline and consistency.",
	},
	{
		question: "What makes TradeCraft's momentum stock screener different?",
		answer:
			"Our premium momentum screener uses proprietary algorithms to scan over 8,000 stocks daily, identifying high-probability momentum opportunities across all market caps. It combines technical momentum, institutional activity, earnings momentum, and sector rotation analysis to surface stocks with the highest probability of continued price movement. The screener includes real-time alerts and customizable filters for your specific trading strategy.",
	},
	{
		question: "How do I optimize stop loss and profit target levels?",
		answer:
			"TradeCraft automatically calculates optimal stop loss and profit targets using advanced volatility analysis, support/resistance mapping, and statistical probability models. Our AI considers Average True Range (ATR), Bollinger Bands, key technical levels, and your risk tolerance to provide mathematically sound exit strategies that maximize your risk-reward ratio while protecting capital.",
	},
	{
		question: "Can I customize trade plans for different trading strategies?",
		answer:
			"Absolutely! TradeCraft supports multiple trading strategies including swing trading, position trading, momentum breakouts, mean reversion, and trend following. You can specify your preferred time horizon (intraday to long-term), risk tolerance, and strategy type. The AI adapts its analysis and recommendations to match your specific trading approach and market outlook.",
	},
	{
		question: "Is TradeCraft suitable for beginner traders developing their first strategies?",
		answer:
			"Yes! TradeCraft is designed as an educational platform that helps beginners learn systematic trading strategy development. Each trade plan includes detailed explanations of technical analysis, risk management principles, and market psychology. Our blog section offers comprehensive trading education, and the platform gradually introduces more advanced concepts as you gain experience.",
	},
	{
		question: "What's included in the Premium trading strategy toolkit?",
		answer:
			"Premium features include: Advanced momentum screener with real-time alerts, portfolio analysis tools, backtesting capabilities, institutional-grade algorithmic strategies, extended technical analysis with 50+ indicators, sector rotation analysis, earnings calendar integration, market sentiment analysis, and priority customer support. Premium users also get access to our private trading community and weekly market analysis webinars.",
	},
	{
		question: "How accurate and reliable are the AI-generated trading strategies?",
		answer:
			"Our AI system is built on proven technical analysis principles and continuously backtested against historical data. While no system can guarantee profits (trading always involves risk), our strategies are designed to provide statistical edges and help you make more informed decisions. We provide transparent performance metrics, risk assessments, and educational context so you can evaluate each strategy objectively.",
	},
	{
		question: "Can I use TradeCraft for day trading and scalping strategies?",
		answer:
			"Yes, TradeCraft supports multiple timeframes from 1-minute charts to monthly analysis. For day trading and scalping, the platform provides intraday momentum analysis, key support/resistance levels, volume profile analysis, and real-time market data updates. Premium users get access to pre-market and after-hours analysis, which is crucial for day trading success.",
	},
	{
		question: "How current is the market data and news analysis?",
		answer:
			"Market data is updated in real-time during trading hours for Premium users, with 15-minute delays for free users. Our AI-curated news feed is refreshed continuously, filtering thousands of sources to surface only market-moving information relevant to your watchlist. Earnings announcements, analyst upgrades/downgrades, and breaking news are integrated directly into trade plan analysis.",
	},
	{
		question: "Does TradeCraft provide personalized investment advice?",
		answer:
			"No, TradeCraft is an educational technology platform that provides analysis tools and systematic frameworks for learning trading strategy development. We do not provide personalized investment advice or recommendations. All content is for educational purposes only. You are responsible for your own trading decisions and should always conduct independent research and consider consulting with qualified financial professionals.",
	},
	{
		question: "How do I cancel my subscription or get billing support?",
		answer:
			"For subscription cancellations, billing questions, or account changes, please use our contact form at /contact. Our support team will process your request within 24 hours. Cancellations take effect at the end of your current billing cycle, and you'll retain access to Premium features until then. We also offer refunds within 30 days if you're not satisfied with the platform.",
	},
	{
		question: "What payment methods and security measures do you use?",
		answer:
			"We accept payments through Gumroad and PayPal, which support all major credit cards, debit cards, digital wallets, and international payment methods. All transactions are processed with bank-level encryption and PCI DSS compliance. We never store your payment information directly - all sensitive data is handled by our certified payment processors using industry-standard security protocols.",
	},
	{
		question: "Can I access historical performance data and backtesting results?",
		answer:
			"Premium users have full access to historical trade plan performance, strategy backtesting results, and detailed analytics covering multiple market cycles. This includes win rates, average returns, maximum drawdowns, and performance across different market conditions. You can filter results by strategy type, timeframe, and market sector to understand how different approaches perform in various environments.",
	},
	{
		question: "How do I integrate TradeCraft analysis with my existing broker or trading platform?",
		answer:
			"TradeCraft is designed to complement any broker or trading platform. Our trade plans include all the information you need to execute trades manually: precise entry prices, stop losses, profit targets, and position sizing. We provide export features to save trade plans as PDFs or spreadsheets. While we don't offer direct broker integration, many users successfully use our analysis alongside platforms like TD Ameritrade, E*TRADE, Interactive Brokers, and others.",
	}
];

const FAQPage = () => {
  // BreadcrumbList JSON-LD structured data
  const breadcrumbSchema = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	"itemListElement": [
	  {
		"@type": "ListItem",
		"position": 1,
		"name": "Home",
		"item": "https://www.tradingsetup.pro"
	  },
	  {
		"@type": "ListItem",
		"position": 2,
		"name": "FAQ",
		"item": "https://www.tradingsetup.pro/faq"
	  }
	]
  };
  // FAQPage JSON-LD structured data
  const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((faq) => ({
	  "@type": "Question",
	  name: faq.question,
	  acceptedAnswer: {
		"@type": "Answer",
		text: faq.answer,
	  },
	})),
  };

 return (
   <HybridAdStrategy>
	 <div className="max-w-2xl mx-auto py-12 px-4">
	   <Head>
		 <title>
		   TradeCraft FAQ | Trading Strategy Development, AI Trade Plans & Momentum Screening
		 </title>
		 <meta
		   name="description"
		   content="Comprehensive FAQ about TradeCraft's AI-powered trading strategy development, systematic trade planning, momentum stock screening, and professional trading tools. Learn how to build winning trading strategies."
		 />
		 <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
	   </Head>
	   <StructuredData data={breadcrumbSchema} />
	   <StructuredData data={faqSchema} />
	   {/* Top banner ad */}
	   <BannerWorkingAd className="flex justify-center mb-8" />
	   <h1 className="text-3xl font-bold mb-8">
		 Frequently Asked Questions
	   </h1>
	   {/* Split FAQs for strategic ad placement */}
	   <div className="space-y-6">
		 {faqs.slice(0, 3).map((faq, idx) => (
		   <div key={idx} className="border-b pb-4">
			 <h2 className="text-xl font-semibold mb-2">
			   {faq.question}
			 </h2>
			 <p className="text-gray-700">{faq.answer}</p>
		   </div>
		 ))}
	   </div>
	   {/* Strategic ad placement between content sections */}
	   <div className="my-10">
		 <div className="md:hidden">
		   <MobileLargeAd />
		 </div>
		 <div className="hidden md:block">
		   <LargeWorkingAd />
		 </div>
	   </div>
	   <div className="space-y-6">
		 {faqs.slice(3).map((faq, idx) => (
		   <div key={idx + 3} className="border-b pb-4">
			 <h2 className="text-xl font-semibold mb-2">
			   {faq.question}
			 </h2>
			 <p className="text-gray-700">{faq.answer}</p>
		   </div>
		 ))}
	   </div>
	   
	   {/* CTA Section for conversion optimization */}
	   <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
		 <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Building Winning Trading Strategies?</h3>
		 <p className="text-gray-700 mb-6">
		   Get your first AI-powered trade plan free. No credit card required. Start making data-driven trading decisions today.
		 </p>
		 <div className="flex flex-col sm:flex-row gap-4">
		   <a 
			 href="/trade-plan" 
			 className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
		   >
			 Generate Free Trade Plan
		   </a>
		   <a 
			 href="/pricing" 
			 className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors text-center"
		   >
			 View Premium Features
		   </a>
		 </div>
	   </div>
	   
	   {/* Related Links for internal linking */}
	   <div className="mt-8 p-6 bg-gray-50 rounded-lg">
		 <h3 className="text-lg font-semibold mb-4">Learn More About Trading Strategy Development</h3>
		 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
		   <a href="/blog/trade-plan-generator" className="text-blue-600 hover:text-blue-800 underline">
			 How to Build Systematic Trading Strategies with AI
		   </a>
		   <a href="/blog/momentum-stock-screener" className="text-blue-600 hover:text-blue-800 underline">
			 Finding High-Momentum Stocks: Advanced Screening Techniques
		   </a>
		   <a href="/education" className="text-blue-600 hover:text-blue-800 underline">
			 Trading Education Resources
		   </a>
		   <a href="/screener" className="text-blue-600 hover:text-blue-800 underline">
			 Try Our Momentum Stock Screener
		   </a>
		 </div>
	   </div>
	 </div>
   </HybridAdStrategy>
 );
};

export default FAQPage;