'use client';

import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import Link from 'next/link';

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
			<HeroSection />
			<FeatureSection />
			<HowItWorks />
			<section className="container mx-auto px-4 max-w-4xl py-12">
				<h2 className="text-2xl font-bold mb-6">From the Blog</h2>
				<div className="space-y-8">
					{blogPosts.map(post => (
						<div key={post.slug} className="border-b pb-6">
							<h3 className="text-xl font-semibold mb-2">
								<Link href={`/blog/${post.slug}`}>{post.title}</Link>
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
					>
						View all blog posts →
					</Link>
				</div>
			</section>
			<TestimonialsSection />
		</main>
	);
}