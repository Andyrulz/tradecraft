"use client";

import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { StructuredData } from '@/components/seo/StructuredData';

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Review schema data for SEO
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah K."
        },
        "reviewBody": "Generated a trade plan for NVDA that netted me 23% in 3 weeks. The AI insights on risk management saved me from a major loss when the market turned.",
        "itemReviewed": {
          "@type": "SoftwareApplication",
          "name": "TradeCraft Pro"
        }
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Michael R."
        },
        "reviewBody": "The momentum screener flagged TSLA before its 18% breakout. Found 3 winners last month that I would have completely missed otherwise.",
        "itemReviewed": {
          "@type": "SoftwareApplication",
          "name": "TradeCraft Pro"
        }
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "David L."
        },
        "reviewBody": "Market movers feature helped me catch AAPL's reversal at $185. The real-time alerts and data-driven insights have improved my win rate by 40%.",
        "itemReviewed": {
          "@type": "SoftwareApplication",
          "name": "TradeCraft Pro"
        }
      }
    ]
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let isScrolling = false;
    let isPaused = false;
    let currentPosition = 0;
    const scrollSpeed = 0.5; // Slower, smoother scrolling
    
    const startAutoScroll = () => {
      if (isPaused || isScrolling) return;
      
      isScrolling = true;
      
      const scroll = () => {
        if (!scrollContainer || isPaused) {
          isScrolling = false;
          return;
        }

        currentPosition += scrollSpeed;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        // Reset to beginning when reaching the end
        if (currentPosition >= maxScroll) {
          currentPosition = 0;
        }
        
        scrollContainer.scrollTo({
          left: currentPosition,
          behavior: 'auto'
        });
        
        requestAnimationFrame(scroll);
      };
      
      requestAnimationFrame(scroll);
    };

    // Start auto-scroll after initial delay
    const startTimer = setTimeout(() => {
      startAutoScroll();
    }, 3000);

    // Pause on hover/touch
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
      if (!isScrolling) {
        setTimeout(startAutoScroll, 1000);
      }
    };

    // Handle touch events for mobile
    const handleTouchStart = () => {
      isPaused = true;
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        isPaused = false;
        if (!isScrolling) {
          setTimeout(startAutoScroll, 2000);
        }
      }, 500);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      clearTimeout(startTimer);
      isPaused = true;
      isScrolling = false;
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer?.removeEventListener('touchstart', handleTouchStart);
      scrollContainer?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  return (
    <section className="bg-white py-24 px-4 text-center">
      <StructuredData data={reviewsSchema} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block text-slate-600 font-semibold text-sm tracking-wide uppercase mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            Trusted by Traders
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Hundreds of traders rely on our analysis to get clarity in the chaos — from swing setups to long-term holds.
          </p>
          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">
              4.9/5 from 200+ reviews
            </span>
          </div>
        </div>
        
        {/* Scrolling testimonials container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollBehavior: 'auto' }}
          >
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
              }, {
                initial: 'A',
                quote: "The real-time alerts helped me catch three breakouts last week. TradeCraft's analysis is incredibly accurate and timely.",
                name: 'Alex M.',
                role: 'Swing Trader, Florida',
              }, {
                initial: 'J',
                quote: "Best trading tool I've used. The AI recommendations have improved my success rate significantly over the past 6 months.",
                name: 'Jessica P.',
                role: 'Day Trader, Illinois',
              }, {
                initial: 'R',
                quote: "The technical indicators and chart analysis have been game-changing for my trading strategy. Highly recommend to any serious trader.",
                name: 'Robert T.',
                role: 'Technical Analyst, Nevada',
              }, {
                initial: 'L',
                quote: "Found my biggest winner this year using TradeCraft's screener. The platform's insights are consistently ahead of the market.",
                name: 'Linda S.',
                role: 'Portfolio Manager, Colorado',
              }].map((t, i) => (
                <div key={i} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow snap-start">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 leading-relaxed mb-6">
                    &quot;{t.quote}&quot;
                  </blockquote>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-700">{t.initial}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll indicators */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="text-sm text-gray-500">← Scroll to see more testimonials →</div>
            </div>
          </div>
          
          <div className="mt-16">
            <a 
              href="/trade-plan/start-here" 
              className="inline-block bg-gray-900 text-white font-semibold rounded-xl px-8 py-4 text-base shadow-md hover:bg-gray-800 transition-all hover:scale-105"
            >
              Join them – Try TradeCraft Free
            </a>
          </div>
        </div>
      </section>
  );
};

export default TestimonialsSection;