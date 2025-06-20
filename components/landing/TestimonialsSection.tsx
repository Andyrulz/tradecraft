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
            quote: "The technical analysis and trade plans have been spot on. I've seen consistent returns since I started following the recommendations.",
            name: 'Sarah K.',
            role: 'Day Trader, New York',
          }, {
            initial: 'M',
            quote: "The stock screener has helped me identify opportunities I would have otherwise missed. It's become an essential part of my trading routine.",
            name: 'Michael R.',
            role: 'Swing Trader, California',
          }, {
            initial: 'D',
            quote: "The combination of fundamental and technical analysis gives me confidence in my trades. The platform has transformed my trading strategy.",
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