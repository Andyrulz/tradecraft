import { Metadata } from 'next';
import { HeroSection } from '@/components/landing/HeroSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbStructuredData } from '@/lib/seo';

// Generate metadata for the homepage
export const metadata: Metadata = generateSEOMetadata({
  title: 'TradeCraft Pro - Advanced Stock Market Analysis & Trading Tools',
  description: 'Professional stock market analysis tools, real-time market news, momentum stock screeners, and automated trade plan generation. Make informed trading decisions with TradeCraft Pro.',
  keywords: [
    'stock market analysis',
    'trading tools',
    'momentum stock screener',
    'stock trade plans',
    'market news',
    'stock market research',
    'trading software',
    'stock analysis tools',
    'market data',
    'trading strategies'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro',
  ogImage: 'https://www.tradingsetup.pro/og-homepage.jpg',
  ogType: 'website'
});

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
          href="https://www.producthunt.com/products/tradecraft-2"
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
        <a
          href="https://www.facebook.com/profile.php?id=61576935563708"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow TradeCraft on Facebook"
          className="transition-transform hover:scale-105 flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg font-semibold text-sm"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="shrink-0"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Follow us
        </a>
      </div>
    </section>
  );
}

export default function Home() {
	const breadcrumbData = generateBreadcrumbStructuredData([
		{ name: 'Home', url: 'https://www.tradingsetup.pro' }
	]);

	return (
		<main className="flex-1 bg-background">
			{/* Homepage Structured Data */}
			<StructuredData data={breadcrumbData} />
			
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