import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/seo/StructuredData';
import { HomepageStructuredData } from '@/components/seo/HomepageStructuredData';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbStructuredData } from '@/lib/seo';
import NewsletterForm from '@/components/ui/NewsletterForm';

// Dynamic imports for performance optimization
const HeroSection = dynamic(() => import('@/components/landing/HeroSection').then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="min-h-[600px] flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>
});

const BenefitsSection = dynamic(() => import('@/components/landing/BenefitsSection').then(mod => ({ default: mod.BenefitsSection })), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>
});

const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks').then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>
});

const TestimonialsSection = dynamic(() => import('@/components/landing/TestimonialsSection'), {
  loading: () => <div className="min-h-[300px] flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>
});

// Generate metadata for the homepage
export const metadata: Metadata = generateSEOMetadata({
  title: 'Free AI Stock Analysis Tool - TradeCraft Pro | Generate Trade Plans',
  description: 'Analyze any stock with AI-powered trade plans. Get entry points, stop losses, and profit targets. Free tool used by 10,000+ traders. Start your analysis now.',
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
slug: 'essential-technical-analysis-books-for-traders',
title: 'Essential Technical Analysis Books for Traders: Complete Reading List 2025',
summary:
'Discover the must-read technical analysis books recommended by professional traders. From beginner basics to advanced strategies, build your trading library with these expert-approved resources.',
date: '2025-01-22',
},
{
slug: 'how-to-achieve-consistently-super-performance-in-stock-market',
title: 'How to Achieve Consistently Super Performance in the Stock Market',
summary:
'Master the proven strategies and discipline required for consistent super performance. Learn risk management, market timing, and trading psychology from a 10-year veteran.',
date: '2025-01-13',
},
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
			
{/* Newsletter CTA Section */}
<section className="bg-gradient-to-r from-blue-50 to-sky-50 py-16">
<div className="container mx-auto px-4 max-w-4xl text-center">
<h2 className="text-3xl font-bold text-gray-900 mb-4">
Get Trading Insights Delivered to Your Inbox
</h2>
<p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
Join 10,000+ traders who receive our weekly market analysis, trade setups, educational content, and exclusive insights.
</p>
<NewsletterForm source="Homepage" />

{/* Social Proof */}
<div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-green-500 rounded-full"></div>
<span>10,000+ subscribers</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
<span>Weekly market insights</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
<span>No spam, ever</span>
</div>
</div>
</div>
</section>
			
			{/* Section Separator */}
			<div className="border-b border-gray-100"></div>
			<TestimonialsSection />
		</main>
	);
}
