"use client";

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Target, Award } from 'lucide-react';

export function SocialProofSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    tradePlans: 0,
    users: 0,
    accuracy: 0,
    stocks: 0,
  });

  const finalCounts = {
    tradePlans: 10000,
    users: 1500,
    accuracy: 95,
    stocks: 2000,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('social-proof');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateCounts = () => {
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setCounts({
            tradePlans: Math.floor(finalCounts.tradePlans * easeOut),
            users: Math.floor(finalCounts.users * easeOut),
            accuracy: Math.floor(finalCounts.accuracy * easeOut),
            stocks: Math.floor(finalCounts.stocks * easeOut),
          });

          if (currentStep >= steps) {
            clearInterval(timer);
            setCounts(finalCounts);
          }
        }, stepTime);
      };

      animateCounts();
    }
  }, [isVisible]);

  const metrics = [
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      value: counts.tradePlans.toLocaleString(),
      suffix: '+',
      label: 'Trade Plans Generated',
      description: 'Professional trade plans created by our AI system',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      value: counts.users.toLocaleString(),
      suffix: '+',
      label: 'Active Traders',
      description: 'Traders using our platform daily',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
    },
    {
      icon: <Target className="h-8 w-8 text-white" />,
      value: counts.accuracy,
      suffix: '%',
      label: 'Accuracy Rate',
      description: 'Success rate of our AI-generated signals',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      value: counts.stocks.toLocaleString(),
      suffix: '+',
      label: 'Stocks Analyzed',
      description: 'Comprehensive analysis across markets',
      gradient: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-50 to-purple-50',
      borderColor: 'border-indigo-200',
    },
  ];

  return (
    <section id="social-proof" className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-semibold text-sm tracking-wide uppercase mb-4">
            Proven Results
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary tracking-tight">
            Trusted by Thousands
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join a growing community of successful traders who rely on our AI-enhanced analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${metric.bgGradient} rounded-2xl p-6 shadow-lg border-2 ${metric.borderColor} flex flex-col items-center text-center transition-all hover:shadow-xl hover:scale-105 group min-h-[220px]`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {metric.icon}
              </div>
              
              <div className="text-3xl font-bold text-primary mb-2">
                {metric.value}{metric.suffix}
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-primary">
                {metric.label}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="font-semibold text-primary">Real-time Data</div>
                <div className="text-sm text-muted-foreground">Live market updates</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="font-semibold text-primary">AI-Powered</div>
                <div className="text-sm text-muted-foreground">Advanced algorithms</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="font-semibold text-primary">Proven Results</div>
                <div className="text-sm text-muted-foreground">Track record of success</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
