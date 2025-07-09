import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="bg-background py-20 px-4 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-primary tracking-tight">Trusted by Traders</h2>
        <p className="text-lg text-muted-foreground mb-14 max-w-xl mx-auto">
          Hundreds of traders rely on our analysis to get clarity in the chaos — from swing setups to long-term holds.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {[{
            initial: 'S',
            quote: "Generated a trade plan for NVDA that netted me 23% in 3 weeks. The AI insights on risk management saved me from a major loss when the market turned.",
            name: 'Sarah K.',
            role: 'Day Trader, New York',
          }, {
            initial: 'M',
            quote: "The momentum screener flagged TSLA before its 18% breakout. Found 3 winners last month that I would have completely missed otherwise.",
            name: 'Michael R.',
            role: 'Swing Trader, California',
          }, {
            initial: 'D',
            quote: "Market movers feature helped me catch AAPL's reversal at $185. The real-time alerts and data-driven insights have improved my win rate by 40%.",
            name: 'David L.',
            role: 'Position Trader, Texas',
          }].map((t, i) => (
            <div key={i} className="bg-background p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border flex flex-col items-center w-full min-h-[260px]">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">{t.initial}</span>
              </div>
              <p className="text-muted-foreground italic mb-4 text-sm sm:text-base">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center justify-center">
                <div className="text-xs sm:text-sm text-muted-foreground text-center">
                  <div className="font-semibold">{t.name}</div>
                  <div>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <a href="/trade-plan/start-here" className="inline-block bg-primary text-primary-foreground font-semibold rounded-lg px-8 py-4 text-base shadow-lg hover:bg-primary/90 transition">Join them – Try TradeCraft Free</a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;