import React from "react";
import Head from "next/head";

const faqs = [
	{
		question: "What is a trade plan generator?",
		answer:
			"A trade plan generator helps you create a detailed trading plan for any stock, including entry, exit, stop loss, and target levels. TradeCraft lets you generate these plans instantly for free.",
	},
	{
		question: "How do I use the stock entry and exit tool?",
		answer:
			"Enter your stock symbol and get a clear, actionable plan showing where to buy, sell, or hold, with risk management built in.",
	},
	{
		question: "What is a momentum stock screener?",
		answer:
			"A momentum stock screener helps you discover stocks with strong price momentum, including small caps. TradeCraft scans the market daily to find the best opportunities.",
	},
	{
		question: "How do I set stop loss and targets?",
		answer:
			"TradeCraft automatically calculates stop loss and target levels for each trade plan, so you can manage risk and lock in profits with confidence.",
	},
	{
		question: "Can I get a detailed trading plan for any stock?",
		answer:
			"Yes! Just enter the stock name or symbol and TradeCraft will generate a detailed plan with entry, exit, stop loss, and targets.",
	},
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
			<h1 className="text-3xl font-bold mb-8">
				Frequently Asked Questions
			</h1>
			<div className="space-y-6">
				{faqs.map((faq, idx) => (
					<div key={idx} className="border-b pb-4">
						<h2 className="text-xl font-semibold mb-2">
							{faq.question}
						</h2>
						<p className="text-gray-700">{faq.answer}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default FAQPage;