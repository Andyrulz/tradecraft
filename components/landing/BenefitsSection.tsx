import React from 'react';
import { 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Zap, 
  Newspaper, 
  Lock 
} from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Data-Driven Trade Plans',
      description: 'Generate professional trade plans with AI insights, including precise entry zones, stop losses, and price targets for any stock.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Stock Screener',
      description: 'Discover high-momentum stocks with 20+ technical indicators, sector filters, and real-time market data.',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Smart position sizing and risk controls with dynamic stop-loss recommendations based on market volatility.',
    },
    {
      icon: Zap,
      title: 'Real-Time Market Movers',
      description: 'Track the biggest gainers, losers, and breakouts with instant alerts and detailed analysis.',
    },
    {
      icon: Newspaper,
      title: 'Curated Market News',
      description: 'AI-filtered market news and insights from trusted sources, prioritized by relevance to your trading strategy.',
    },
    {
      icon: Lock,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with real-time data updates and 99.9% uptime for consistent trading performance.',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 id="benefits-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">
            Why Choose TradeCraft?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional-grade trading tools designed to give you the edge in today&apos;s markets. 
            Make informed decisions with data-driven insights and advanced analytics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="/trade-plan/start-here"
            className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors shadow-lg"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </section>
  );
}
