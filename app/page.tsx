'use client';

import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

const blogPosts = [
	{
		slug: 'how-to-spot-next-leading-momentum-stock-using-trade-craft',
		title: 'How to Spot the Next Leading Momentum Stock Using Trade Craft',
		summary:
			"A step-by-step guide to finding high-potential momentum stocks using Trade Craft's screeners, signals, and trade plans.",
		date: '2025-05-16',
	},
	{
		slug: 'identify-breakout-stocks-price-volume',
		title: 'How I Identify Breakout Stocks Using Price-Volume Analysis',
		summary:
			'A deep dive into the exact price and volume patterns I look for before entering a breakout, with real chart examples and actionable tips.',
		date: '2025-04-10',
	},
	{
		slug: 'top-5-momentum-indicators-midcap',
		title: 'Top 5 Momentum Indicators I Use for Midcap Trading',
		summary:
			'Discover the momentum indicators that consistently help me spot high-potential midcap stocks before they move.',
		date: '2025-04-20',
	},
	{
		slug: 'step-by-step-trade-plan-risk-management',
		title: 'Step-by-Step Guide: Creating a Trade Plan with Risk Management',
		summary:
			'A practical, step-by-step walkthrough of building a robust trade plan, including risk controls and real-world examples.',
		date: '2025-04-28',
	},
];

export default function Home() {
	return (
		<main className="flex-1">
			<Head>
        <title>TradeCraft: Smarter Trading Plans, Momentum Screener & Stock Analysis</title>
        <meta name="description" content="TradeCraft helps traders and investors generate actionable trade plans, screen for momentum stocks, and analyze technical and fundamental data. Start making smarter trades today!" />
        <meta property="og:title" content="TradeCraft: Smarter Trading Plans, Momentum Screener & Stock Analysis" />
        <meta property="og:description" content="TradeCraft helps traders and investors generate actionable trade plans, screen for momentum stocks, and analyze technical and fundamental data. Start making smarter trades today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeCraft: Smarter Trading Plans, Momentum Screener & Stock Analysis" />
        <meta name="twitter:description" content="TradeCraft helps traders and investors generate actionable trade plans, screen for momentum stocks, and analyze technical and fundamental data. Start making smarter trades today!" />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.tradingsetup.pro/" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          \"@context\": \"https://schema.org\",
          \"@type\": \"WebSite\",
          \"url\": \"https://www.tradingsetup.pro/\",
          \"name\": \"TradeCraft by TradingSetup.pro\",
          \"description\": \"TradeCraft helps traders and investors generate actionable trade plans, screen for momentum stocks, and analyze technical and fundamental data.\",
          \"publisher\": {
            \"@type\": \"Organization\",
            \"name\": \"TradingSetup.pro\",
            \"url\": \"https://www.tradingsetup.pro/\",
            \"logo\": {
              \"@type\": \"ImageObject\",
              \"url\": \"https://www.tradingsetup.pro/bull-bear.png\"
            }
          },
          \"potentialAction\": {
            \"@type\": \"SearchAction\",
            \"target\": \"https://www.tradingsetup.pro/screener?query={search_term_string}\",
            \"query-input\": \"required name=search_term_string\"
          },
          \"sameAs\": [
            \"https://twitter.com/TradeCraftPro\"
          ]
        }` }} />
			</Head>
			<HeroSection />
			{/* Social Proof & Badges (cleaned up, only main badges remain) */}
			<section className="container mx-auto px-5 max-w-4xl py-6 flex items-center justify-between">
				<div className="flex flex-row items-center w-full justify-between gap-x-8">
					<div className="flex flex-row items-center gap-x-8">
						{/* Product Hunt Badge (external, keep as <img>) */}
						<a
							href="https://www.producthunt.com/posts/tradecraft-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-tradecraft-2"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="View TradeCraft on Product Hunt"
							className="transition-transform hover:scale-105"
						>
							<img
								src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=966567&theme=light&t=1748065742670"
								alt="TradeCraft - Trade with Confidence and Clarity | Product Hunt"
								width="250"
								height="54"
								style={{ width: 250, height: 54 }}
							/>
						</a>
						{/* Medium Badge */}
						<a
							href="https://medium.com/@andrew.labyrinthventures"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Read TradeCraft on Medium"
							className="transition-transform hover:scale-105"
						>
							<Image
								src="/badges/medium-badge.png"
								alt="Read us on Medium"
								width={120}
								height={40}
							/>
						</a>
						{/* Gravatar Badge */}
						<a
							href="https://gravatar.com/honestlycolorfulda51a20b53"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="View Gravatar Profile"
							className="transition-transform hover:scale-105"
						>
							<Image
								src="https://gravatar.com/avatar/da51a20b53c2e7e2e7e2e7e2e7e2e7e2?s=120"
								alt="Gravatar Profile"
								width={40}
								height={40}
								style={{ borderRadius: '50%' }}
							/>
						</a>
						{/* LinkedIn Badge */}
						<a
							href="https://www.linkedin.com/company/trade-craft-pro"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="View TradeCraft on LinkedIn"
							className="transition-transform hover:scale-105"
						>
							<Image
								src="/badges/linkedin-badge.png"
								alt="LinkedIn Company Page"
								width={120}
								height={40}
							/>
						</a>
						{/* Twelve Tools Badge */}
						<a
							href="https://twelve.tools"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Featured on Twelve Tools"
							className="transition-transform hover:scale-105"
						>
							<Image
								src="https://twelve.tools/badge1-white.svg"
								alt="Featured on Twelve Tools"
								width={200}
								height={54}
							/>
						</a>
					</div>
				</div>
			</section>
			{/* Move Featured Insight card for Medium article further down, before FeatureSection */}
			<div className="container mx-auto px-4 max-w-2xl flex justify-center mt-8 mb-8">
				<a
					href="https://medium.com/p/c49513bcd37b"
					target="_blank"
					rel="noopener noreferrer"
					className="group block w-full rounded-2xl border border-sky-200 bg-gradient-to-br from-white to-sky-50 shadow-md hover:shadow-lg transition-shadow p-5 flex items-center gap-4 hover:border-sky-400"
					aria-label="Featured Insight: How to Spot the Next Leading Momentum Stock Using TradeCraft (Medium)"
				>
					<Image
						src="/badges/medium.png"
						alt="Medium logo"
						width={48}
						height={48}
						className="w-12 h-12 rounded-lg border border-gray-200 bg-white shadow-sm group-hover:scale-105 transition-transform"
					/>
					<div className="flex-1">
						<div className="text-xs uppercase tracking-wider text-sky-500 font-bold mb-1">Featured Insight</div>
						<div className="text-lg font-semibold text-sky-900 group-hover:text-sky-700 transition-colors">How to Spot the Next Leading Momentum Stock Using TradeCraft</div>
						<div className="text-xs text-muted-foreground mt-1">Read our latest Medium article for actionable tips & real examples.</div>
					</div>
					<svg className="w-6 h-6 text-sky-400 group-hover:text-sky-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
				</a>
			</div>
			<FeatureSection />
			<HowItWorks />
			<section className="container mx-auto px-4 max-w-4xl py-12">
				<h2 className="text-2xl font-bold mb-6">From the Blog</h2>
				<div className="space-y-8">
					{blogPosts.map(post => (
						<div key={post.slug} className="border-b pb-6">
							<h3 className="text-xl font-semibold mb-2">
								<Link href={`/blog/${post.slug}`} aria-label={post.title}>{post.title}</Link>
							</h3>
							<p className="text-muted-foreground mb-2">
								{post.summary}
							</p>
							<span className="text-xs text-gray-500">{post.date}</span>
						</div>
					))}
				</div>
				<div className="mt-8">
					<Link
						href="/blog"
						className="text-primary underline font-medium"
						aria-label="View all blog posts"
					>
						View all blog posts →
					</Link>
				</div>
			</section>
			<TestimonialsSection />
		</main>
	);
}