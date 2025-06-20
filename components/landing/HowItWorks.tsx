import { ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Path',
      description: 'Enter a stock symbol to generate a trade plan, or click “Find Momentum Stocks” to discover today’s top setups.',
    },
    {
      number: '02',
      title: 'Get Instant Results',
      description: 'Receive a detailed trade plan with entry, targets, and risk—or see the top 10 actionable momentum stocks for today.',
    },
    {
      number: '03',
      title: 'Review Analysis',
      description: 'Explore technical indicators, market context, and actionable insights for your selected stock or screener results.',
    },
    {
      number: '04',
      title: 'Act with Confidence',
      description: 'Use the generated plan or screener results to make informed trading decisions, every day.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-0">
            Instantly generate a trade plan <b>or</b> discover high momentum stocks in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative w-full min-h-[210px]">
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