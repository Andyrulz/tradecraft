'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

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
			'2 requests per day (resets at midnight UTC)',
			'No access to momentum screener',
			'No on-demand support',
		],
		cta: 'Sign Up Free',
		ctaLink: '/auth/signin',
		highlight: false,
	},
	{
		name: 'Pro',
		price: '$7.5/mo',
		description:
			'For active traders who want more requests and support. Costs less than a single meal out—and you could make 2-5x this in a single trade by following a solid plan.',
		features: [
			'100 requests per day (resets at midnight UTC)',
			'No access to momentum screener',
			'On-demand support via email',
		],
		cta: 'Subscribe Now',
		ctaLink: '/subscribe?plan=pro',
		highlight: false,
	},
	{
		name: 'Premium',
		price: '$16.5/mo',
		description:
			'Unlimited access, screener, and premium support. For less than a night at the movies, unlock the screener and make back your subscription in just one good trade.',
		features: [
			'Unlimited requests per day',
			'Access to momentum screener',
			'On-demand support via email',
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
		<main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-16">
			<Head>
				<title>TradeCraft: AI-Powered Trade Plan Generator & Stock Screener</title>
				<meta name="description" content="Generate actionable trade plans, analyze stocks, and discover momentum opportunities. Upgrade for more requests, premium support, and advanced features." />
				<meta property="og:title" content="TradeCraft: AI-Powered Trade Plan Generator & Stock Screener" />
				<meta property="og:description" content="Generate actionable trade plans, analyze stocks, and discover momentum opportunities. Upgrade for more requests, premium support, and advanced features." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.tradingsetup.pro/pricing" />
				<meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="TradeCraft: AI-Powered Trade Plan Generator & Stock Screener" />
				<meta name="twitter:description" content="Generate actionable trade plans, analyze stocks, and discover momentum opportunities. Upgrade for more requests, premium support, and advanced features." />
				<meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
			</Head>
			<div className="container mx-auto px-4 max-w-5xl">
				<h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-sky-900">
					Pricing Plans
				</h1>
				<div className="text-center text-lg text-muted-foreground mb-14 max-w-2xl mx-auto space-y-4">
					<p>
						<span className="font-semibold text-sky-800">Trade smarter, not harder.</span> Start with the Free plan, or upgrade to unlock more daily trade plans, advanced features, and premium support.
					</p>
					<p>
						<span className="font-semibold text-sky-800">Cancel anytime</span> — no commitments, instant access, and make back your subscription in just one good trade.
					</p>
				</div>
				{loading ? (
					<div className="text-center py-12">Loading...</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
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
										className={`rounded-3xl shadow-xl border border-sky-200 bg-white p-10 flex flex-col items-center transition-transform duration-200 hover:scale-105 relative overflow-hidden ${plan.highlight ? 'ring-2 ring-yellow-400' : ''}`}
									>
										{plan.highlight && (
											<div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-bl-2xl rounded-tr-3xl shadow-md z-10">
												Best Value
											</div>
										)}
										<h2 className="text-2xl font-bold mb-2 text-sky-800 tracking-tight">
											{plan.name}
										</h2>
										<div className="text-4xl font-extrabold mb-2 text-sky-700">
											{plan.price}
										</div>
										<p className="text-base text-muted-foreground mb-6 text-center min-h-[60px]">
											{plan.description}
										</p>
										<ul className="mb-10 space-y-3 w-full">
											{plan.features.map((feature, i) => (
												<li
													key={i}
													className="flex items-center gap-3 text-sky-900 text-sm bg-sky-50 rounded-lg px-3 py-2 shadow-sm"
												>
													<span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400" />
													{feature}
												</li>
											))}
										</ul>
										{/* CTA logic */}
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
										className={`rounded-3xl shadow-xl border border-sky-200 bg-white p-10 flex flex-col items-center transition-transform duration-200 hover:scale-105 relative overflow-hidden ${plan.highlight ? 'ring-2 ring-yellow-400' : ''}`}
									>
										{plan.highlight && (
											<div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-bl-2xl rounded-tr-3xl shadow-md z-10">
												Best Value
											</div>
										)}
										<h2 className="text-2xl font-bold mb-2 text-sky-800 tracking-tight">
											{plan.name}
										</h2>
										<div className="text-4xl font-extrabold mb-2 text-sky-700">
											{plan.price}
										</div>
										<p className="text-base text-muted-foreground mb-6 text-center min-h-[60px]">
											{plan.description}
										</p>
										<ul className="mb-10 space-y-3 w-full">
											{plan.features.map((feature, i) => (
												<li
													key={i}
													className="flex items-center gap-3 text-sky-900 text-sm bg-sky-50 rounded-lg px-3 py-2 shadow-sm"
												>
													<span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400" />
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
										className={`rounded-3xl shadow-xl border border-sky-200 bg-white p-10 flex flex-col items-center transition-transform duration-200 hover:scale-105 relative overflow-hidden ${plan.highlight ? 'ring-2 ring-yellow-400' : ''}`}
									>
										{plan.highlight && (
											<div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-bl-2xl rounded-tr-3xl shadow-md z-10">
												Best Value
											</div>
										)}
										<h2 className="text-2xl font-bold mb-2 text-sky-800 tracking-tight">{plan.name}</h2>
										<div className="text-4xl font-extrabold mb-2 text-sky-700">{plan.price}</div>
										<p className="text-base text-muted-foreground mb-6 text-center min-h-[60px]">{plan.description}</p>
										<ul className="mb-10 space-y-3 w-full">
											{plan.features.map((feature, i) => (
												<li key={i} className="flex items-center gap-3 text-sky-900 text-sm bg-sky-50 rounded-lg px-3 py-2 shadow-sm">
													<span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400" />
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
									className={`rounded-3xl shadow-xl border border-sky-200 bg-white p-10 flex flex-col items-center transition-transform duration-200 hover:scale-105 relative overflow-hidden ${
										plan.highlight ? 'ring-2 ring-yellow-400' : ''
									}`}
								>
									{plan.highlight && (
										<div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-bl-2xl rounded-tr-3xl shadow-md z-10">
											Best Value
										</div>
									)}
									<h2 className="text-2xl font-bold mb-2 text-sky-800 tracking-tight">
										{plan.name}
									</h2>
									<div className="text-4xl font-extrabold mb-2 text-sky-700">
										{plan.price}
									</div>
									<p className="text-base text-muted-foreground mb-6 text-center min-h-[60px]">
										{plan.description}
									</p>
									<ul className="mb-10 space-y-3 w-full">
										{plan.features.map((feature, i) => (
											<li
												key={i}
												className="flex items-center gap-3 text-sky-900 text-sm bg-sky-50 rounded-lg px-3 py-2 shadow-sm"
											>
												<span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400" />
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
	);
}
