import React from 'react';
import { CheckCircle, TrendingUp, Shield, BarChart2, Layers, RefreshCw } from 'lucide-react';

const benefits = [
	{
		title: 'Clarity & Confidence',
		description:
			'Instantly generate actionable trade plans with clear entry, exit, stop loss, and target levels for any stock.',
		icon: CheckCircle
	},
	{
		title: 'Momentum Stock Screener',
		description:
			'Discover high-potential momentum and small-cap stocks daily, with advanced filters and signals.',
		icon: TrendingUp
	},
	{
		title: 'Risk Management',
		description:
			'Built-in risk controls and position sizing help you protect capital and maximize gains.',
		icon: Shield
	},
	{
		title: 'Comprehensive Analysis',
		description:
			'Analyze technical and fundamental data in one place—no more switching tools.',
		icon: BarChart2
	},
	{
		title: 'Minimal, Distraction-Free',
		description:
			'A clean, modern interface focused on what matters—no clutter, no unnecessary colors.',
		icon: Layers
	},
	{
		title: 'Always Up-to-Date',
		description:
			'Market movers, news, and signals updated automatically throughout the day.',
		icon: RefreshCw
	}
];

export function BenefitsSection() {
	return (
		<section id="benefits" className="bg-background border-t border-b border-border py-16 md:py-20">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="mb-2 flex flex-col items-center">
					<span className="inline-block bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2">
						Benefits
					</span>
					<h2 className="text-3xl font-extrabold text-center text-primary tracking-tight mb-3">
						Why TradeCraft?
					</h2>
					<p className="text-base text-muted-foreground text-center max-w-2xl mb-8">
						TradeCraft gives you clarity, confidence, and actionable plans—so you can
						focus on trading, not second-guessing. Here’s what sets us apart:
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
					{benefits.map((benefit, idx) => (
						<div key={idx} className="flex flex-col items-center gap-4 p-5 sm:p-6 rounded-xl transition-shadow hover:shadow-lg border border-transparent hover:border-border/80 bg-background w-full min-h-[210px]">
							<benefit.icon className="h-10 w-10 text-primary mb-1" aria-hidden="true" />
							<div className="text-base sm:text-lg font-semibold text-primary text-center leading-snug">
								{benefit.title}
							</div>
							<div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
								{benefit.description}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
