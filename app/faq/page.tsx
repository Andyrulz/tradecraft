import React from "react";
import Head from "next/head";
import { HybridAdStrategy } from '@/components/ui/HybridAds';
import { BannerWorkingAd, LargeWorkingAd } from '@/components/ui/WorkingAdUnit';
import MobileLargeAd from '@/components/ui/MobileLargeAd';

const faqs = [
	{
		question: "What is a trade plan generator?",
		answer:
			"A trade plan generator helps you create a detailed trading plan for any stock, including entry, exit, stop loss, and target levels. TradeCraft lets you generate these plans instantly for free using AI-powered analysis of technical indicators, market trends, and risk management principles.",
	},
	{
		question: "How do I use the stock entry and exit tool?",
		answer:
			"Simply enter your stock symbol in our trade plan generator. Our AI analyzes the stock's technical indicators, support/resistance levels, and market conditions to provide clear entry points, profit targets, and stop-loss levels with detailed reasoning for each recommendation.",
	},
	{
		question: "What is a momentum stock screener?",
		answer:
			"A momentum stock screener helps you discover stocks with strong price momentum, including small caps. TradeCraft's premium screener uses proprietary algorithms to scan thousands of stocks daily, identifying those with the highest probability of continued price movement based on volume, price action, and technical indicators.",
	},
	{
		question: "How do I set stop loss and targets?",
		answer:
			"TradeCraft automatically calculates stop loss and target levels for each trade plan based on technical analysis, volatility, and risk-reward ratios. The AI considers support/resistance levels, average true range, and your risk tolerance to provide optimal exit strategies.",
	},
	{
		question: "Can I get a detailed trading plan for any stock?",
		answer:
			"Yes! Just enter the stock name or symbol and TradeCraft will generate a comprehensive plan with entry, exit, stop loss, and targets. The AI analyzes over 50 technical indicators and market factors to create a detailed, actionable trading strategy.",
	},
	{
		question: "Is TradeCraft suitable for beginners?",
		answer:
			"Absolutely! TradeCraft is designed for traders of all experience levels. Our free tools provide educational explanations with each trade plan, and our blog section offers comprehensive guides on trading strategies, risk management, and market analysis basics.",
	},
	{
		question: "What's the difference between free and premium features?",
		answer:
			"Free features include basic trade plan generation, market news, and educational content. Premium features offer advanced momentum screening, real-time alerts, portfolio analysis tools, and access to our professional-grade algorithmic strategies with enhanced technical analysis.",
	},
	{
		question: "How accurate are the trade plans?",
		answer:
			"While no trading system can guarantee profits, our AI-powered analysis is based on proven technical analysis principles and extensive backtesting. We provide educational tools to help you understand market dynamics, but all trading involves risk and past performance doesn't guarantee future results.",
	},
	{
		question: "Can I use TradeCraft for day trading?",
		answer:
			"Yes, TradeCraft supports both short-term and long-term trading strategies. Our trade plans can be customized for different time frames, from intraday scalping to swing trading and long-term investing. The AI adjusts its analysis based on your preferred trading style.",
	},
	{
		question: "How often is market data updated?",
		answer:
			"Our market data is updated in real-time during market hours for premium users, and with a 15-minute delay for free users. News and market movers are refreshed continuously throughout the trading day to ensure you have the latest market information.",
	},
	{
		question: "Do you provide investment advice?",
		answer:
			"No, TradeCraft provides educational tools and analysis for informational purposes only. We do not provide personalized investment advice. All trading decisions are your responsibility, and you should always conduct your own research and consult with qualified financial professionals.",
	},
	{
		question: "How do I cancel my subscription?",
		answer:
			"You can cancel your subscription at any time through your account settings or by contacting our support team. Cancellations take effect at the end of your current billing cycle, and you'll retain access to premium features until then.",
	},
	{
		question: "What payment methods do you accept?",
		answer:
			"We accept payments through Gumroad and PayPal, which support major credit cards, debit cards, and PayPal balance. All payments are processed securely through these trusted payment processors with industry-standard encryption.",
	},
	{
		question: "Can I get historical performance data?",
		answer:
			"Premium users have access to historical trade plan performance data and backtesting results. This helps you understand how our strategies have performed in different market conditions and refine your trading approach based on historical data.",
	}
];

const FAQPage = () => {
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
						TradeCraft FAQ | Trade Plan Generator, Stock Entry & Exit Tool,
						Momentum Stock Screener
					</title>
					<meta
						name="description"
						content="Frequently asked questions about TradeCraft's trade plan generator, stock entry and exit tool, momentum stock screener, and more. Learn how to set stop loss, targets, and get detailed trading plans for any stock."
					/>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(faqSchema),
						}}
					/>
					<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
				</Head>
				
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
			</div>
		</HybridAdStrategy>
	);
};

export default FAQPage;