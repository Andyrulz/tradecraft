import {
  TrendingUp,
  ShieldAlert,
  Layers,
  BookOpen,
} from 'lucide-react';
import DiscoverScreener from './DiscoverScreener';

export function FeatureSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-semibold text-sm tracking-wide uppercase mb-4">
            Premium Trading Tools
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary tracking-tight">
            Trade Plans & Momentum Stock Discovery
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            Instantly generate actionable trade plans for any stock <span className="font-semibold">or</span> discover today&apos;s top momentum stocks using our free, data-driven tools.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Make informed decisions with technical analysis and market context at your fingertips.
          </p>
        </div>
        
        <DiscoverScreener />
        
        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground font-medium">Trade Plans Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">2,000+</div>
              <div className="text-sm text-muted-foreground font-medium">Momentum Stocks Analyzed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-muted-foreground font-medium">User Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}