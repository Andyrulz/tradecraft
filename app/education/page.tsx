import React from "react";
import Head from "next/head";
import { HybridAdStrategy } from '@/components/ui/HybridAds';
import { BannerWorkingAd, LargeWorkingAd } from '@/components/ui/WorkingAdUnit';
import MobileLargeAd from '@/components/ui/MobileLargeAd';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ShieldCheck, Brain, LineChart } from "lucide-react";

const topics = [
  {
    title: "1. Risk Management: Risk, Reward, Sizing, and More",
    summary:
      "Master the statistical and practical aspects of risk, reward, position sizing, and expectancy for consistent trading performance.",
    points: [
      "Brutal facts about losses",
      "Importance of Stop Loss for risk control",
      "Position Sizing Formula & Capital Allocation",
      "Balancing Risk Reward Ratio & Win Rate",
      "Capital, Account Value, Exposure, ROI, Leverage",
      "Expectancy Metrics",
      "Intensity Metrics",
      "Open Risk Matrix",
      "Significance of market conditions",
      "Robust Risk Management Rules",
      "Setting standard metrics",
      "Compounding quarterly for high performance",
      "Metrics behind triple-digit returns",
    ],
  },
  {
    title: "2. Technical Analysis: Mastering the Basics",
    summary:
      "Build a solid foundation in technical analysis by focusing on price/volume interpretation, breakouts, volatility, and essential chart patterns.",
    points: [
      "Technical Analysis and its effectiveness",
      "Approach to Technical Analysis",
      "Types of charts and their interpretation",
      "How price moves in auction mechanism",
      "Types of orders and their practical application",
      "Significance of Supports and Resistances in trading",
      "Examples of Supports and Resistances in real-world scenarios",
      "Interpretation of candlesticks without memorizing patterns",
      "Understanding volatility through TRP indicator",
      "Importance of volume analysis",
      "Identification and analysis of pivotal candles using TRP and volumes",
      "Correct identification of breakouts and breakdowns",
      "Essential chart patterns to look for in trading",
    ],
  },
  {
    title: "3. Stage Analysis: Understanding Market Cycles",
    summary:
      "Learn the four distinct stages of a stock’s lifecycle, how to identify them, and how to spot high-probability opportunities in any market.",
    points: [
      "The four stages of the market and their characteristics",
      "Quick scan using moving averages",
      "Volume transitions, bases, and breakouts",
      "Tops, bottoms, and trends",
      "Decoding big players’ actions",
      "Lots of practical examples",
    ],
  },
  {
    title: "4. Daily Setup: A Winning Strategy",
    summary:
      "Develop a clear set of rules for buying and selling, with a focus on effective entries, exits, and stress-free trading routines.",
    points: [
      "What is Swing Trading",
      "Technical parameters for stock selection",
      "Liquidity",
      "Buying Before the Breakout",
      "Entry Triggers and Methods",
      "Setting Stop Loss",
      "Mathematical, Extensions, and Weakness Exits",
      "Exit Guidelines",
      "Discretionary Elements",
    ],
  },
  {
    title: "5. Practical Trade Examples: Putting Concepts Into Action",
    summary:
      "See detailed, real-world trade examples to understand entries, exits, and advanced concepts in action.",
    points: [
      "Base-on-base",
      "Mini Base Breakout",
      "Relative Volume Analysis",
      "Wake-up Calls",
      "Climax",
      "Mega Extensions",
      "Earnings Shock",
      "Earnings Turnaround",
      "Wavy Bottom Pattern",
      "Flush",
      "Extended Entries",
    ],
  },
  {
    title: "6. Trading Routine: A Precise Schedule To Follow",
    summary:
      "Incorporate a structured daily, post-market, and weekend routine to cover your entire trading process efficiently.",
    points: [
      "During Market Routine: Trade Management and Executions",
      "Post Market Routine: Scanning, Shortlisting, and Tracking",
      "Weekend Routine: Performance Review and Historical Study",
      "Evaluating Market Conditions and Determining Market Stance",
      "Using Custom Scanners To Save A Lot Of Time",
      "Watchlists: Know the exact watchlists to maintain",
      "Trackers: Recording significant market action in sheets",
      "Journal: Track, Measure and Improve with a powerful in-house journal",
    ],
  },
  {
    title: "7. Trading Psychology: Build a Champion Mindset",
    summary:
      "Understand and manage the psychological aspects of trading, including emotions, discipline, and mindset for long-term success.",
    points: [
      "Significance of psychological understanding in trading",
      "Why the “Logic” wins, and “Emotion” loses",
      "How to always be self-aware",
      "Discussion on each emotion: fear, hope, greed, anger, patience, FOMO, etc.",
      "Champion Mindset Affirmations for everyday",
    ],
  },
];

export default function EducationPage() {
  return (
    <HybridAdStrategy>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="max-w-2xl mx-auto py-10 px-4 md:px-0 relative">
        
        {/* Top banner ad */}
        <BannerWorkingAd className="flex justify-center mb-8" />
        
        {/* Decorative Accent */}
        <div className="flex justify-center mb-4">
          <span className="inline-block w-16 h-1 rounded-full bg-gradient-to-r from-primary/70 via-accent to-primary/70 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary text-center tracking-tight drop-shadow-lg">
          Education Module – Coming Soon
        </h1>
        <p className="text-muted-foreground mb-8 text-lg text-center max-w-xl mx-auto">
          A comprehensive, step-by-step education module is coming soon. Explore
          the course structure below. Check back for updates!
        </p>
        {/* Three Pillars Visual */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 sm:gap-6 mb-12">
          {[
            {
              icon: (
                <LineChart className="h-8 w-8 text-blue-600" />
              ),
              bg: "bg-gradient-to-br from-blue-200 via-blue-100 to-white",
              title: "A Winning Strategy",
              desc: "You’ll get a proven technical analysis based trading strategy with an edge in the markets.",
            },
            {
              icon: (
                <ShieldCheck className="h-8 w-8 text-green-600" />
              ),
              bg: "bg-gradient-to-br from-green-200 via-green-100 to-white",
              title: "Managing Risk",
              desc: "You’ll be able to apply the correct risk management rules to minimise losses.",
            },
            {
              icon: (
                <Brain className="h-8 w-8 text-yellow-600" />
              ),
              bg: "bg-gradient-to-br from-yellow-200 via-yellow-100 to-white",
              title: "Mastering Mind",
              desc: "You’ll not let emotions rule you while trading. You&apos;ll be in control and trade logically.",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className={`flex flex-col items-center text-center flex-1 min-h-[220px] p-5 sm:p-6 rounded-xl bg-white/90 shadow-lg border border-border transition-transform hover:scale-105 group w-full`}
            >
              <span
                className={`flex items-center justify-center w-14 h-14 rounded-full ${pillar.bg} mb-3 group-hover:from-blue-300 group-hover:via-blue-200 transition-colors`}
              >
                {pillar.icon}
              </span>
              <div className="font-bold text-lg text-primary">
                {pillar.title}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {pillar.desc}
              </div>
            </div>          ))}
        </div>

        {/* Strategic ad placement between content sections */}
        <div className="my-12">
          <div className="md:hidden">
            <MobileLargeAd />
          </div>
          <div className="hidden md:block">
            <LargeWorkingAd />
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border border-border bg-white/90 shadow-2xl divide-y divide-border backdrop-blur-sm"
        >
          {topics.map((topic, idx) => (
            <AccordionItem key={topic.title} value={String(idx)}>
              <AccordionTrigger className="text-lg font-semibold text-primary px-6 py-4 bg-muted/60 hover:bg-accent/60 transition-all rounded-t-xl">
                {topic.title}
              </AccordionTrigger>
              <AccordionContent className="bg-background/90 px-8 pb-8 pt-3 rounded-b-xl">
                <div className="mb-2 text-muted-foreground font-medium">
                  {topic.summary}
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {topic.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12 p-5 rounded-xl bg-gradient-to-r from-muted/80 to-background border border-border text-center text-primary font-semibold shadow-lg">
          <span>
            This module is under development. Please keep checking back for the
            latest updates!
          </span>
        </div>
        {/* Soft background accent */}
        <div className="pointer-events-none fixed inset-0 z-[-1] opacity-60">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-yellow-50" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-blue-100 blur-3xl" />        </div>
      </div>
    </HybridAdStrategy>
  );
}
