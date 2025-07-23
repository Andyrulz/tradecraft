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
      title: 'AI Trading Strategy Builder',
      description: 'Generate systematic trading strategies with AI-powered trade plans, precise entry zones, stop losses, and price targets for any stock.',
    },
    {
      icon: BarChart3,
      title: 'Strategy-Based Stock Screener',
      description: 'Discover stocks that match your trading strategy with 20+ technical indicators, momentum filters, and real-time market data.',
    },
    {
      icon: Shield,
      title: 'Risk Management Strategy Tools',
      description: 'Build disciplined trading strategies with professional position sizing and dynamic risk controls based on market volatility analysis.',
    },
    {
      icon: Zap,
      title: 'Real-Time Strategy Monitoring',
      description: 'Track your trading strategy performance with market movers, breakout alerts, and detailed technical analysis for strategy optimization.',
    },
    {
      icon: Newspaper,
      title: 'Strategy-Focused Market News',
      description: 'AI-curated market insights filtered for trading strategy relevance, helping you adapt your approach to changing market conditions.',
    },
    {
      icon: Lock,
      title: 'Professional Strategy Platform',
      description: 'Enterprise-grade trading strategy development platform with real-time data updates and 99.9% uptime for consistent performance.',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 id="benefits-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">
             TradeCraft is your Smart Trade Manager
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional trading strategy development tools designed to build systematic approaches and consistent market performance. 
            Create winning strategies with data-driven insights and advanced market analysis.
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
