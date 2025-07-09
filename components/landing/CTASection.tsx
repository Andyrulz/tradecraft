"use client";

import Link from 'next/link';
import { TrendingUp, BarChart3, Zap, Newspaper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CTASection() {
  const ctas = [
    {
      title: 'AI-Enhanced Trade Plans',
      description: 'Generate professional trade plans with AI-enhanced analysis for any stock',
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      href: '/trade-plan/start-here',
      buttonText: 'Generate Trade Plan',
      featured: true,
    },
    {
      title: 'Momentum Screener',
      description: 'Discover high-momentum stocks with our advanced screening tools',
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      href: '/screener',
      buttonText: 'Screen Stocks',
      featured: false,
    },
    {
      title: 'Market Movers',
      description: 'Track the biggest gainers and losers in real-time',
      icon: <Zap className="h-8 w-8 text-primary" />,
      href: '/market-movers',
      buttonText: 'View Movers',
      featured: false,
    },
    {
      title: 'Market News',
      description: 'Stay updated with AI-curated market news and insights',
      icon: <Newspaper className="h-8 w-8 text-primary" />,
      href: '/news',
      buttonText: 'Read News',
      featured: false,
    },
  ];

  return (
    <section className="w-full bg-background py-16 sm:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            AI-Enhanced Trading Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade tools powered by artificial intelligence to help you make better trading decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ctas.map((cta, index) => (
            <Card 
              key={index}
              className={`relative group hover:shadow-lg transition-all duration-300 border-border bg-card ${
                cta.featured ? 'ring-2 ring-primary/20 border-primary/30' : ''
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {cta.icon}
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold text-center text-primary">
                  {cta.title}
                </CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground">
                  {cta.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  asChild
                  className={`w-full ${
                    cta.featured 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Link href={cta.href} className="flex items-center justify-center gap-2">
                    {cta.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
              {cta.featured && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Popular
                </div>
              )}
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to start trading with confidence?
          </p>
          <Button size="lg" asChild className="px-8 py-3">
            <Link href="/pricing">
              View Pricing Plans
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
