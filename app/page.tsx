import { Metadata } from 'next';
import { HeroSection } from '@/components/landing/HeroSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/seo/StructuredData';
import { HomepageStructuredData } from '@/components/seo/HomepageStructuredData';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbStructuredData } from '@/lib/seo';

// Generate metadata for the homepage
export const metadata: Metadata = generateSEOMetadata({
  title: 'TradeCraft Pro - AI Trading Strategy & Stock Analysis Tools',
  description: 'Build winning trading strategies with AI-powered analysis, systematic trade planning, and momentum screening. Professional trading strategy development platform.',
  keywords: [
    'trading strategy',
    'AI trading strategy',
    'systematic trading strategy',
    'trading strategy development',
    'momentum trading strategy',
    'professional trading strategy',
    'trading strategy framework',
    'AI enhanced stock analysis',
    'stock market trading strategies',
    'trading strategy tools',
    'trading strategy platform',
    'systematic trade planning',
    'trading strategy methodology'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro',
  ogImage: 'https://www.tradingsetup.pro/og-homepage.jpg',
  ogType: 'website'
});

const blogPosts = [
	{
		slug: 'trade-plan-generator',
		title: 'How to Build Systematic Trading Strategies with AI-Enhanced Analysis',
		summary:
			'Complete guide to developing systematic trading strategies using AI insights, risk management, and professional analysis for consistent market success.',
		date: '2025-07-08',
	},
	{
		slug: 'momentum-stock-screener',
		title: 'Finding High-Momentum Stocks: Advanced Screening Techniques',
		summary:
			'Master the art of momentum stock screening with 20+ technical indicators, sector filters, and real-time market data.',
		date: '2025-07-05',
	},
	{
		slug: 'market-movers-analysis',
		title: 'Market Movers Analysis: How to Profit from Daily Gainers and Losers',
		summary:
			'Learn to identify and capitalize on market-moving stocks with real-time alerts and detailed breakout analysis.',
		date: '2025-07-01',
	},
	{
		slug: 'ai-risk-management',
		title: 'AI-Powered Risk Management: Protecting Capital in Volatile Markets',
		summary:
			'Discover how AI-enhanced risk management can improve your trading performance with dynamic stop-losses and position sizing.',
		date: '2025-06-28',
	},
];

function TrustBadges() {
  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 font-medium">Trusted by traders worldwide</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <a
            href="https://www.producthunt.com/products/tradecraft-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View TradeCraft on Product Hunt"
            className="transition-all hover:scale-105 hover:shadow-md rounded-lg"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=966567&theme=light&t=1748065742670"
              alt="TradeCraft - Trade with Confidence and Clarity | Product Hunt"
              width={200}
              height={44}
              style={{ width: 200, height: 44 }}
              loading="lazy"
              className="rounded-lg shadow-sm"
            />
          </a>
          <a
            href="https://medium.com/@andrew.labyrinthventures"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read TradeCraft on Medium"
            className="transition-all hover:scale-105 hover:shadow-md rounded-lg p-2 bg-gray-50"
          >
            <Image
              src="/badges/medium-badge.png"
              alt="Read us on Medium"
              width={100}
              height={32}
              loading="lazy"
              sizes="(max-width: 768px) 80px, 100px"
              className="rounded"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/trade-craft-pro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View TradeCraft on LinkedIn"
            className="transition-all hover:scale-105 hover:shadow-md rounded-lg p-2 bg-gray-50"
          >
            <Image
              src="/badges/linkedin-badge.png"
              alt="View us on LinkedIn"
              width={100}
              height={32}
              loading="lazy"
              sizes="(max-width: 768px) 80px, 100px"
              className="rounded"
            />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61576935563708"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow TradeCraft on Facebook"
            className="transition-all hover:scale-105 hover:shadow-md flex items-center gap-2 bg-[#4267B2] text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-sm"
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
			<HomepageStructuredData />
			<HeroSection />
			{/* Section Separator */}
			<div className="border-b border-gray-100"></div>
			<TrustBadges />
			{/* Section Separator */}
			<div className="border-b border-gray-100"></div>
			<BenefitsSection />
			{/* Section Separator */}
			<div className="border-b border-gray-100"></div>
			<HowItWorks />
			{/* Section Separator */}
			<div className="border-b border-gray-100"></div>
			<section className="bg-white container mx-auto px-4 max-w-4xl py-20" aria-labelledby="blog-section">
				<h2 id="blog-section" className="text-2xl font-bold mb-6 text-primary">From the Blog</h2>
				<div className="space-y-8" role="list" aria-label="Blog posts">
					{blogPosts.map(post => (
						<article key={post.slug} className="border-b border-border pb-6" role="listitem">
							<h3 className="text-xl font-semibold mb-2 text-primary">
								<Link 
									href={`/blog/${post.slug}`} 
									className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
									aria-label={`Read blog post: ${post.title}`}
								>
									{post.title}
								</Link>
							</h3>
							<p className="text-muted-foreground mb-2">
								{post.summary}
							</p>
							<time className="text-xs text-muted-foreground" dateTime={post.date}>
								{new Date(post.date).toLocaleDateString('en-US', { 
									year: 'numeric', 
									month: 'long', 
									day: 'numeric' 
								})}
							</time>
						</article>
					))}
				</div>
				<div className="mt-8">
					<Link
						href="/blog"
						className="text-primary underline font-medium hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
						aria-label="View all blog posts"
					>
						View all blog posts →
					</Link>
				</div>
			</section>
			{/* Section Separator */}
			<div className="border-b border-gray-100"></div>
			<TestimonialsSection />
		</main>
	);
}