'use client';

import { HeroSection } from '@/components/landing/HeroSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
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

function TrustBadges() {
  return (
    <section className="w-full bg-background border-b border-border py-6">
      <div className="container mx-auto px-5 max-w-4xl flex flex-wrap items-center justify-center gap-6">
        <a
          href="https://producthunt.com/posts/tradecraft"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View TradeCraft on Product Hunt"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=966567&theme=light&t=1748065742670"
            alt="TradeCraft - Trade with Confidence and Clarity | Product Hunt"
            width={200}
            height={44}
            style={{ width: 200, height: 44 }}
            loading="lazy"
          />
        </a>
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
            width={100}
            height={32}
          />
        </a>
        <a
          href="https://www.linkedin.com/company/trade-craft-pro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View TradeCraft on LinkedIn"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="/badges/linkedin-badge.png"
            alt="View us on LinkedIn"
            width={100}
            height={32}
          />
        </a>
      </div>
    </section>
  );
}

export default function Home() {
	return (
		<main className="flex-1 bg-background">
			<Head>
        <title>Trade Plan Generator & Momentum Stock Screener | Stock Entry and Exit Tool</title>
        <meta name="description" content="TradeCraft is a trade plan generator and momentum stock screener. Instantly get detailed trading plans, entry/exit signals, stop loss, targets, and discover high-momentum and small cap stocks." />
        <meta property="og:title" content="Trade Plan Generator & Momentum Stock Screener | Stock Entry and Exit Tool" />
        <meta property="og:description" content="TradeCraft is a trade plan generator and momentum stock screener. Instantly get detailed trading plans, entry/exit signals, stop loss, targets, and discover high-momentum and small cap stocks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trade Plan Generator & Momentum Stock Screener | Stock Entry and Exit Tool" />
        <meta name="twitter:description" content="TradeCraft is a trade plan generator and momentum stock screener. Instantly get detailed trading plans, entry/exit signals, stop loss, targets, and discover high-momentum and small cap stocks." />
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
			</Head>
			<HeroSection />
      <TrustBadges />
			<BenefitsSection />
			<FeatureSection />
			<HowItWorks />
			<section className="container mx-auto px-4 max-w-4xl py-12">
				<h2 className="text-2xl font-bold mb-6 text-primary">From the Blog</h2>
				<div className="space-y-8">
					{blogPosts.map(post => (
						<div key={post.slug} className="border-b border-border pb-6">
							<h3 className="text-xl font-semibold mb-2 text-primary">
								<Link href={`/blog/${post.slug}`} aria-label={post.title}>{post.title}</Link>
							</h3>
							<p className="text-muted-foreground mb-2">
								{post.summary}
							</p>
							<span className="text-xs text-muted-foreground">{post.date}</span>
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