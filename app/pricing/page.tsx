'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { StructuredData } from '@/components/seo/StructuredData';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const GUMROAD_PRO_URL = "https://labyrinthian8.gumroad.com/l/jynmay";
const GUMROAD_PREMIUM_URL = "https://labyrinthian8.gumroad.com/l/klcep";

const plans = [
	{
		name: 'Free',
		price: 'Free',
		description: 'Get started with the basics. Assigned by default to all users.',
		features: [
			'1 request per day',
			'Market News (realtime)',
			'Market Movers',
			'No access to momentum screener',
			'No on-demand support',
		],
		cta: 'Sign Up Free',
		ctaLink: '/auth/signin?mode=signup',
		highlight: false,
	},
	{
		name: 'Pro',
		price: '$9.75/mo',
		description:
			'For active traders who want more requests and support. Costs less than a single meal out—and you could make 2-5x this in a single trade by following a solid plan.',
		features: [
			'100 requests per day',
			'Market News (realtime)',
			'Market Movers',
			'No access to momentum screener',
			'On-demand support via email',
		],
		cta: 'Subscribe Now',
		ctaLink: '/subscribe?plan=pro',
		highlight: false,
	},
	{
		name: 'Premium',
		price: '$14.65/mo',
		description:
			'Unlimited access, screener, and premium support. For less than a night at the movies, unlock the screener and make back your subscription in just one good trade.',
		features: [
			'Unlimited requests per day',
			'Market News (realtime)',
			'Market Movers',
			'Access to momentum screener',
			'On-demand support via email',
			'Early acess to new features',
			'Premium Insights and Newsletters',
			'Champion Trading Course Access (coming soon)',
		],
		cta: 'Subscribe Now',
		ctaLink: '/subscribe?plan=premium',
		highlight: true,
	},
];

export default function PricingPage() {
	const { data: session } = useSession();
	const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'premium' | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPlan() {
			if (!session?.user?.email) return setLoading(false);
			const { data: user } = await supabase
				.from('users')
				.select('id')
				.eq('email', session.user.email)
				.single();
			if (!user) return setLoading(false);
			const { data: sub } = await supabase
				.from('user_subscriptions')
				.select('plan_type, lemonsqueezy_subscription_id')
				.eq('user_id', user.id)
				.single();
			setUserPlan(sub?.plan_type || 'free');
			setSubscriptionId(sub?.lemonsqueezy_subscription_id || null);
			setLoading(false);
		}
		fetchPlan();
	}, [session]);

	return (
		<>
			<Head>
				<title>Pricing - Your Service</title>
				<meta name="description" content="Choose the pricing plan that fits your needs." />
				<meta property="og:title" content="Pricing - Your Service" />
				<meta property="og:description" content="Choose the pricing plan that fits your needs." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://yourwebsite.com/pricing" />
				<meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Pricing - Your Service" />
				<meta name="twitter:description" content="Choose the pricing plan that fits your needs." />
				<meta name="twitter:image" content="https://yourwebsite.com/twitter-image.jpg" />
			</Head>
			<main className="min-h-screen bg-background pt-6 pb-16">
				<div className="container mx-auto px-4 max-w-5xl">
					<h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-primary">
						Pricing tailored to your needs
					</h1>
					{/* Intro text */}
					<p className="text-center text-base font-semibold text-primary mb-8 max-w-2xl mx-auto leading-relaxed tracking-wide">
  <span className="align-middle">
    Generate a trade plan for free everyday. If you love it, please help me run the product as a solo creator. <span className="text-primary/80">Cancel anytime.</span>
  </span>
</p>

					{loading ? (
						<div className="text-center py-12">Loading...</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
							{plans.map(plan => {
								const isCurrent = userPlan === plan.name.toLowerCase();
								const isFree = plan.name.toLowerCase() === 'free';
								const isPaid = plan.name.toLowerCase() === 'pro' || plan.name.toLowerCase() === 'premium';
								const planType = plan.name.toLowerCase();

								// Hide free plan CTA if user is on pro or premium
								if (isFree && (userPlan === 'pro' || userPlan === 'premium')) {
									return (
										<div
											key={plan.name}
											className={`rounded-2xl shadow-lg border border-sky-200 bg-white p-5 sm:p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105 ${plan.highlight ? 'ring-2 ring-sky-400' : ''} w-full min-h-[480px]`}
										>
											<h2 className="text-2xl font-bold mb-2 text-sky-800">
												{plan.name}
											</h2>
											{/* Pricing display */}
											<div className="text-3xl font-extrabold mb-2 text-sky-700">
												{plan.price}
											</div>
											<p className="text-base text-muted-foreground mb-6 text-center">
												{plan.description}
											</p>
											<ul className="mb-8 space-y-2 w-full">
												{plan.features.map((feature, i) => (
													<li
														key={i}
														className="flex items-center gap-2 text-sky-900"
													>
														<span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
														{feature}
													</li>
												))}
											</ul>
											<div className="w-full text-center py-3 rounded-xl font-semibold text-lg bg-sky-100 text-sky-400 cursor-not-allowed opacity-60">
												Not Available
											</div>
										</div>
									);
								}

								// Pro plan: show downgrade CTA if user is on premium
								if (planType === 'pro' && userPlan === 'premium') {
									return (
										<div
											key={plan.name}
											className={`rounded-2xl shadow-lg border border-sky-200 bg-white p-5 sm:p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105 ${plan.highlight ? 'ring-2 ring-sky-400' : ''} w-full min-h-[480px]`}
										>
											<h2 className="text-2xl font-bold mb-2 text-sky-800">
												{plan.name}
											</h2>
											{/* Pricing display */}
											<div className="text-3xl font-extrabold mb-2 text-sky-700">
												{plan.price}
											</div>
											<p className="text-base text-muted-foreground mb-6 text-center">
												{plan.description}
											</p>
											<ul className="mb-8 space-y-2 w-full">
												{plan.features.map((feature, i) => (
													<li
														key={i}
														className="flex items-center gap-2 text-sky-900"
													>
														<span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
														{feature}
													</li>
												))}
											</ul>
											<div className="w-full text-center py-3 rounded-xl font-semibold text-lg bg-sky-100 text-sky-400 cursor-not-allowed opacity-60">
												Downgrade to Pro from Premium in PayPal
											</div>
										</div>
									);
								}

								// Hide CTA for pro/premium if not logged in
								if ((planType === 'pro' || planType === 'premium') && !session) {
									return (
										<div
											key={plan.name}
											className={`rounded-2xl shadow-lg border border-sky-200 bg-white p-5 sm:p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105 ${plan.highlight ? 'ring-2 ring-sky-400' : ''} w-full min-h-[480px]`}
										>
											<h2 className="text-2xl font-bold mb-2 text-sky-800">{plan.name}</h2>
											{/* Pricing display */}
											<div className="text-3xl font-extrabold mb-2 text-sky-700">
												{plan.price}
											</div>
											<p className="text-base text-muted-foreground mb-6 text-center">{plan.description}</p>
											<ul className="mb-8 space-y-2 w-full">
												{plan.features.map((feature, i) => (
													<li key={i} className="flex items-center gap-2 text-sky-900">
														<span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
														{feature}
													</li>
												))}
											</ul>
											<div className="w-full text-center py-3 rounded-xl font-semibold text-lg bg-sky-100 text-sky-400 cursor-not-allowed opacity-60">
												Sign in to upgrade
											</div>
										</div>
									);
								}

								return (
									<div
										key={plan.name}
										className={`rounded-2xl shadow-lg border border-sky-200 bg-white p-5 sm:p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105 ${
											plan.highlight ? 'ring-2 ring-sky-400' : ''
										} w-full min-h-[480px]`}
									>
										<h2 className="text-2xl font-bold mb-2 text-sky-800">
											{plan.name}
										</h2>
										{/* Pricing display */}
										<div className="text-3xl font-extrabold mb-2 text-sky-700">
											{plan.price}
										</div>
										<p className="text-base text-muted-foreground mb-6 text-center">
											{plan.description}
										</p>
										<ul className="mb-8 space-y-2 w-full">
											{plan.features.map((feature, i) => (
												<li
													key={i}
													className="flex items-center gap-2 text-sky-900"
												>
													<span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
													{feature}
												</li>
											))}
										</ul>
										{/* CTA logic */}
										{isCurrent ? (
											<div className="w-full text-center py-3 rounded-xl font-semibold text-lg bg-sky-200 text-sky-800 cursor-not-allowed">
												Current Plan
											</div>
										) : isPaid ? (
											<a
												href={planType === 'pro' ? GUMROAD_PRO_URL : GUMROAD_PREMIUM_URL}
												target="_blank"
												rel="noopener noreferrer"
												className={`w-full text-center py-3 rounded-xl font-semibold text-lg ${planType === 'premium' ? 'bg-yellow-400 text-white hover:bg-yellow-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
											>
												{planType === 'pro' ? 'Subscribe to Pro' : 'Subscribe to Premium'}
											</a>
										) : isFree && session ? (
											<div className="w-full text-center py-3 rounded-xl font-semibold text-lg bg-sky-200 text-sky-800 cursor-not-allowed">
												Current Plan
											</div>
										) : (
											<Link
												href={plan.ctaLink}
												className={`w-full text-center py-3 rounded-xl font-semibold text-lg bg-sky-100 text-sky-800 hover:bg-sky-200`}
											>
												{plan.cta}
											</Link>
										)}
									</div>
								);
							})}
						</div>
					)}
					{/* Manage Subscription link for Pro/Premium users */}
					{(userPlan === 'pro' || userPlan === 'premium') && subscriptionId && (
						<div className="text-center mt-8">
							<a
								href={`https://www.paypal.com/myaccount/autopay/connect/${subscriptionId}`}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block px-6 py-3 rounded-xl bg-sky-700 text-white font-semibold text-lg shadow hover:bg-sky-800 transition-colors"
							>
								Manage Subscription
							</a>
						</div>
					)}
				</div>
			</main>
			
			{/* Structured Data for Pricing */}
			<StructuredData data={{
				"@context": "https://schema.org",
				"@type": "Product",
				"name": "TradeCraft Pro Trading Platform",
				"description": "Professional stock market analysis and trading tools",
				"brand": {
					"@type": "Brand",
					"name": "TradeCraft Pro"
				},
				"offers": [
					{
						"@type": "Offer",
						"name": "Free Plan",
						"description": "Basic trading tools with 1 request per day",
						"price": "0",
						"priceCurrency": "USD",
						"priceValidUntil": "2025-12-31",
						"availability": "https://schema.org/InStock",
						"url": "https://www.tradingsetup.pro/auth/signin?mode=signup"
					},
					{
						"@type": "Offer", 
						"name": "Pro Plan",
						"description": "Advanced trading tools with 100 requests per day",
						"price": "9.75",
						"priceCurrency": "USD",
						"priceValidUntil": "2025-12-31",
						"availability": "https://schema.org/InStock",
						"url": "https://www.tradingsetup.pro/subscribe?plan=pro",
						"billingIncrement": "P1M"
					},
					{
						"@type": "Offer",
						"name": "Premium Plan", 
						"description": "Full access with momentum screener and 1000 requests per day",
						"price": "14.65",
						"priceCurrency": "USD",
						"priceValidUntil": "2025-12-31",
						"availability": "https://schema.org/InStock",
						"url": "https://www.tradingsetup.pro/subscribe?plan=premium",
						"billingIncrement": "P1M"
					}
				],
				"category": "Financial Software",
				"applicationCategory": "FinanceApplication"
			}} />
			
			<StructuredData data={{
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				"name": "TradeCraft Pro",
				"applicationCategory": "FinanceApplication",
				"operatingSystem": "Web",
				"offers": {
					"@type": "AggregateOffer",
					"lowPrice": "0",
					"highPrice": "14.65",
					"priceCurrency": "USD",
					"offerCount": "3"
				},
				"aggregateRating": {
					"@type": "AggregateRating",
					"ratingValue": "4.8",
					"reviewCount": "127"
				}
			}} />
		</>
	);
}
