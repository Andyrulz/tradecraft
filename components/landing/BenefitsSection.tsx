import React from 'react';
import { CheckCircle, TrendingUp, Shield, BarChart2, Layers, RefreshCw, ArrowUpRight, DollarSign } from 'lucide-react';

const benefits = [
	{
		title: 'AI-Enhanced Trade Plans',
		description:
			'Generate professional data-driven trade plans with AI insights, including precise entry zones, stop losses, and price targets for any stock.',
		icon: CheckCircle,
		stats: '95% accuracy',
		gradient: 'from-blue-500 to-blue-600',
		accentColor: 'text-blue-600'
	},
	{
		title: 'Advanced Momentum Screener',
		description:
			'Discover high-momentum stocks with 20+ technical indicators, sector filters, and real-time market data for profitable opportunities.',
		icon: TrendingUp,
		stats: '500+ stocks daily',
		gradient: 'from-green-500 to-green-600',
		accentColor: 'text-green-600'
	},
	{
		title: 'Smart Risk Management',
		description:
			'AI-powered position sizing and risk controls with dynamic stop-loss recommendations based on market volatility and trends.',
		icon: Shield,
		stats: 'Reduce risk by 40%',
		gradient: 'from-purple-500 to-purple-600',
		accentColor: 'text-purple-600'
	},
	{
		title: 'Real-Time Market Movers',
		description:
			'Track biggest gainers, losers, and breakouts with instant alerts and detailed analysis of significant price movements.',
		icon: BarChart2,
		stats: 'Live updates',
		gradient: 'from-orange-500 to-orange-600',
		accentColor: 'text-orange-600'
	},
	{
		title: 'Curated Market News',
		description:
			'AI-filtered market news and insights from trusted sources, prioritized by relevance to your watchlist and trading strategy.',
		icon: Layers,
		stats: '50+ sources',
		gradient: 'from-teal-500 to-teal-600',
		accentColor: 'text-teal-600'
	},
	{
		title: 'Live Data & Alerts',
		description:
			'Real-time stock data, price alerts, and momentum signals updated continuously throughout trading hours for optimal timing.',
		icon: RefreshCw,
		stats: 'Real-time',
		gradient: 'from-indigo-500 to-indigo-600',
		accentColor: 'text-indigo-600'
	}
];

export function BenefitsSection() {
	return (
		<section id="benefits" className="bg-background border-t border-b border-border py-16 md:py-20" aria-labelledby="benefits-heading">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="mb-2 flex flex-col items-center">
					<span className="inline-block bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2">
						Benefits
					</span>
					<h2 id="benefits-heading" className="text-3xl font-extrabold text-center text-primary tracking-tight mb-3">
						Why TradeCraft?
					</h2>
					<p className="text-base text-muted-foreground text-center max-w-2xl mb-8">
						TradeCraft gives you clarity, confidence, and actionable plans—so you can
						focus on trading, not second-guessing. Here’s what sets us apart:
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8" role="list" aria-label="TradeCraft benefits">
					{benefits.map((benefit, idx) => (
						<div key={idx} className="flex flex-col items-center gap-4 p-5 sm:p-6 rounded-xl transition-shadow hover:shadow-lg border border-transparent hover:border-border/80 bg-background w-full min-h-[210px]" role="listitem">
							<benefit.icon className="h-10 w-10 text-primary mb-1" aria-hidden="true" />
							<h3 className="text-base sm:text-lg font-semibold text-primary text-center leading-snug">
								{benefit.title}
							</h3>
							<p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
								{benefit.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
