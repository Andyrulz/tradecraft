import { ArrowRight, Target, Search, Settings, TrendingUp } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Select Your Tool',
      description: 'Choose from Trade Plans, Momentum Screener, Market Movers, or News - each designed for different trading strategies.',
      icon: <Target className="h-6 w-6 text-white" />,
      gradient: 'from-slate-600 to-slate-700',
      bgGradient: 'from-slate-50 to-gray-50',
      borderColor: 'border-slate-200',
    },
    {
      number: '02',
      title: 'Get AI-Enhanced Analysis',
      description: 'Receive data-driven insights enhanced with AI analysis, including risk management, entry zones, and market context.',
      icon: <Search className="h-6 w-6 text-white" />,
      gradient: 'from-emerald-600 to-emerald-700',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
    },
    {
      number: '03',
      title: 'Review & Customize',
      description: 'Analyze technical indicators, adjust parameters, and customize alerts based on your trading style and risk tolerance.',
      icon: <Settings className="h-6 w-6 text-white" />,
      gradient: 'from-amber-600 to-amber-700',
      bgGradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
    },
    {
      number: '04',
      title: 'Execute with Confidence',
      description: 'Trade with clear entry/exit points, stop-losses, and position sizing - all backed by real-time market data.',
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      gradient: 'from-gray-600 to-gray-700',
      bgGradient: 'from-gray-50 to-slate-50',
      borderColor: 'border-gray-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent font-semibold text-sm tracking-wide uppercase mb-4">
            Simple Process
          </div>
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary tracking-tight">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Generate data-driven trade plans enhanced with AI insights in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="How TradeCraft works">
          {steps.map((step, index) => (
            <div key={index} className="relative w-full" role="listitem">
              <div className={`bg-gradient-to-br ${step.bgGradient} rounded-2xl p-6 shadow-lg border-2 ${step.borderColor} transition-all hover:shadow-xl hover:scale-105 flex flex-col items-center text-center w-full min-h-[260px] group`}>
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
                  <span className="text-lg font-bold text-primary">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold mb-3 text-primary leading-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <a 
            href="/trade-plan/start-here" 
            className="inline-block bg-gray-900 text-white font-semibold rounded-xl px-8 py-4 text-base shadow-lg hover:bg-gray-800 transition-all hover:scale-105"
          >
            Start Your First Trade Plan
          </a>
        </div>
      </div>
    </section>
  );
}
