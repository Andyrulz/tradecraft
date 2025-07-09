import { ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Select Your Tool',
      description: 'Choose from Trade Plans, Momentum Screener, Market Movers, or News - each designed for different trading strategies.',
    },
    {
      number: '02',
      title: 'Get AI-Enhanced Analysis',
      description: 'Receive data-driven insights enhanced with AI analysis, including risk management, entry zones, and market context.',
    },
    {
      number: '03',
      title: 'Review & Customize',
      description: 'Analyze technical indicators, adjust parameters, and customize alerts based on your trading style and risk tolerance.',
    },
    {
      number: '04',
      title: 'Execute with Confidence',
      description: 'Trade with clear entry/exit points, stop-losses, and position sizing - all backed by real-time market data.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="how-it-works-heading" className="text-3xl font-bold mb-6 text-primary tracking-tight">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-0">
            Generate data-driven trade plans enhanced with AI insights in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" role="list" aria-label="How TradeCraft works">
          {steps.map((step, index) => (
            <div key={index} className="relative w-full min-h-[210px]" role="listitem">
              <div className="bg-background rounded-xl p-5 sm:p-6 shadow-sm border border-border/50 transition-shadow hover:shadow-lg flex flex-col items-center text-center w-full h-full">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-3">{step.number}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary leading-tight">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
