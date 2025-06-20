import {
  TrendingUp,
  ShieldAlert,
  Layers,
  BookOpen,
} from 'lucide-react';
import DiscoverScreener from './DiscoverScreener';

export function FeatureSection() {
  const features = [
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: 'Basic Technical Analysis',
      description:
        'Get basic technical indicators and market analysis based on available data.',
    },
    {
      icon: <ShieldAlert className="h-10 w-10 text-chart-1" />,
      title: 'Market Context',
      description:
        'Understand the stock\'s sector, market cap, and current market position.',
    },
    {
      icon: <Layers className="h-10 w-10 text-chart-2" />,
      title: 'Simple Indicators',
      description:
        'Basic technical analysis using simple moving averages and price action.',
    },
    {
      icon: <BookOpen className="h-10 w-10 text-chart-3" />,
      title: 'Educational Insights',
      description:
        'Learn about basic technical analysis and market indicators.',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary tracking-tight">Trade Plans & Momentum Stock Discovery</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Instantly generate actionable trade plans for any stock <b>or</b> discover today’s top momentum stocks using our free, data-driven tools.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-0">
            Make informed decisions with technical analysis and market context at your fingertips.
          </p>
        </div>
        <DiscoverScreener />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-5 sm:p-6 shadow-sm border border-border flex flex-col items-center text-center transition-shadow hover:shadow-lg w-full min-h-[210px]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary leading-tight">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}