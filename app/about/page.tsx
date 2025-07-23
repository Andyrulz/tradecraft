import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Brain, 
  BarChart3, 
  Target, 
  CheckCircle, 
  Users, 
  Code, 
  Quote,
  ArrowRight,
  Lightbulb,
  Shield,
  Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Andrew - Trading Strategy Expert & TradeCraft Creator',
  description: 'Meet Andrew, Microsoft technologist with 10+ years developing winning trading strategies. Learn about the systematic trading strategy methodology behind TradeCraft Pro platform.',
  keywords: [
    'Andrew TradeCraft',
    'trading strategy expert',
    'systematic trading strategy',
    'momentum trading strategy',
    'Microsoft technologist',
    'stock market trading strategies',
    'professional trading strategy',
    'trading strategy development',
    'AI trading strategy',
    'trading strategy framework'
  ],
  openGraph: {
    title: 'About Andrew - Trading Strategy Expert & TradeCraft Creator',
    description: 'Meet Andrew, Microsoft technologist with 10+ years developing winning trading strategies. Learn about the systematic trading strategy methodology behind TradeCraft Pro platform.',
    type: 'profile',
    url: 'https://www.tradingsetup.pro/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Andrew - Trading Strategy Expert & TradeCraft Creator',
    description: 'Meet Andrew, Microsoft technologist with 10+ years developing winning trading strategies. Learn about the systematic trading strategy methodology behind TradeCraft Pro platform.',
  },
  alternates: {
    canonical: 'https://www.tradingsetup.pro/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <Image
              src="/avatar.png"
              alt="Andrew - Creator of TradeCraft Pro"
              width={128}
              height={128}
              className="rounded-full border-4 border-slate-200 shadow-lg"
              priority
            />
            
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Hi, I&apos;m Andrew
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-2xl text-gray-700 font-medium leading-relaxed">
              Trading Strategy Developer with <span className="text-slate-700 font-bold">10+ years</span> of systematic market experience
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Product technologist at <span className="font-semibold text-blue-600">Microsoft</span> • Creator of <span className="font-semibold text-slate-700">TradeCraft Pro Trading Strategy Platform</span>
            </p>
          </div>

          {/* Credentials Bar */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-slate-50">
              <Code className="w-4 h-4 mr-2" />
              Product @ Microsoft
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-blue-50">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trading Strategy Expert
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-green-50">
              <Award className="w-4 h-4 mr-2" />
              Strategy Platform Creator
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12 text-gray-700 leading-relaxed">
          
          {/* Professional Background */}
          <div>
            <p className="text-lg mb-4">
              By day, I work at <strong>Microsoft</strong>, building world-class technology products. 
              By night (and early mornings), I develop systematic trading strategies — studying price action, 
              refining methodologies, and building tools that give strategy-focused traders a real edge.
            </p>
            <p className="text-lg">
              I created TradeCraft to help independent traders develop the same level of systematic trading strategies, 
              discipline, and clarity that institutional pros rely on — <strong>without the fluff or noise</strong>.
            </p>
          </div>

          {/* Trading Experience & Journey */}
          <div className="space-y-8">
            
            {/* Trading Journey */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Trading Strategy Development Journey</h2>
              
              <div className="bg-gray-50 border-l-4 border-blue-500 p-6 mb-6">
                <p className="text-lg font-medium text-gray-800 italic">
                  &ldquo;Over 10 years developing trading strategies has taught me that successful trading isn&apos;t about predicting the future — it&apos;s about having a systematic strategy framework that manages risk while capturing opportunities.&rdquo;
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">A Decade Developing Trading Strategies</h3>
                  <p className="text-lg mb-4">
                    I&apos;ve been actively developing and refining trading strategies for <strong>over 10 years</strong>, navigating multiple market cycles and learning what creates systematic profitability. My journey started in 2012 during the post-financial crisis recovery, and I&apos;ve built trading strategies through every major market event since — from the 2015-2016 correction to the 2020 pandemic crash and the 2021-2022 growth-to-value rotation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">From Chaos to Systematic Trading Strategy</h3>
                  <p className="text-lg mb-4">
                    Early in my career, I made every mistake in the book — overtrading, ignoring risk management, chasing momentum without a coherent trading strategy. These costly lessons taught me that <strong>systematic strategy beats intuition</strong> and that <strong>process-driven trading trumps prediction</strong> every single time.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">A Battle-Tested Trading Strategy Framework</h3>
                  <p className="text-lg mb-4">
                    Over the years, I developed and refined a systematic trading strategy framework that combines technical analysis, fundamental research, and disciplined risk management. This isn&apos;t theoretical — it&apos;s a proven trading strategy methodology battle-tested through bull markets, bear markets, and everything in between. Every component of TradeCraft reflects real lessons learned from implementing these trading strategies with real money on the line.
                  </p>
                </div>
              </div>
            </div>

            {/* Why I Built TradeCraft */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why I Built TradeCraft Trading Strategy Platform</h2>

              <p className="text-lg mb-6">
                After developing and refining systematic trading strategies over the past decade, I realized something: Most retail traders don&apos;t lose because they lack ideas. 
                They lose because they lack a systematic trading strategy framework. They chase. They hesitate. They second-guess. <strong>I&apos;ve been there.</strong>
              </p>

              <p className="text-lg mb-4">
                TradeCraft was born to solve that — a clean, powerful trading strategy platform that helps you:
              </p>

              <ul className="space-y-2 text-lg mb-6 pl-6">
                <li>• Build systematic trading strategies with momentum screening</li>
                <li>• Develop disciplined trading strategy frameworks with precision</li>
                <li>• Monitor strategy performance with live market data</li>
                <li>• Maintain trading strategy discipline with systematic rules</li>
              </ul>

              <p className="text-lg font-medium">
                It&apos;s built to make your trading strategy <span className="text-green-600 font-semibold">consistent</span> — not <span className="text-red-600 font-semibold">impulsive</span>.
              </p>
            </div>
          </div>

          {/* Trading Philosophy */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Trading Strategy Philosophy</h2>

            <p className="text-lg mb-6">
              I blend trading strategy principles from <strong>Mark Minervini</strong>, <strong>Dan Zanger</strong>, and 
              <strong> Stan Druckenmiller</strong> — focusing on systematic strategy development:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <ul className="space-y-3 text-lg">
                <li>• Momentum-based trading strategy selection</li>
                <li>• Breakout-focused trading strategy timing</li>
              </ul>
              <ul className="space-y-3 text-lg">
                <li>• Risk-first trading strategy position sizing</li>
                <li>• Rule-based trading strategy exits and re-entries</li>
              </ul>
            </div>

            <div className="bg-slate-800 text-white p-6 rounded-lg text-center mb-6">
              <p className="text-lg font-semibold mb-1">Core Trading Strategy Belief</p>
              <p className="text-slate-200">Price action drives all successful trading strategies</p>
            </div>

            <p className="text-lg">
              TradeCraft reflects this trading strategy mindset — <strong>it&apos;s not just a tool, it&apos;s a systematic strategy framework.</strong>
            </p>
          </div>

          {/* Built by a Technologist */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Built by a Technologist, For Traders</h2>

            <p className="text-lg mb-6">
              With my background in tech at Microsoft, I bring the same standards of <strong>performance</strong>, 
              <strong> simplicity</strong>, and <strong>reliability</strong> to TradeCraft 
              that go into building global-scale software.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <p className="text-lg font-medium text-center text-gray-800">
                Every feature is something I personally use in my trading — designed to reduce noise, save time, and improve execution.
              </p>
            </div>
          </div>

          {/* Personal Note */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">A Personal Note</h2>
            
            <p className="text-lg mb-6">
              I didn&apos;t build TradeCraft for the masses.<br />
              <strong>I built it for focused traders</strong> — the ones who are serious about improving, not just gambling.
            </p>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-6">
              <p className="text-lg text-gray-800">
                If you value <strong>process over prediction</strong>, 
                <strong> rules over rumors</strong>, and 
                <strong> data over drama</strong> — you&apos;re in the right place.
              </p>
            </div>

            <div className="text-center mb-8">
              <p className="text-2xl font-bold text-gray-900 mb-2">Welcome to TradeCraft.</p>
              <p className="text-xl text-blue-600 font-semibold">Let&apos;s get to work.</p>
            </div>

            <div className="text-center border-t pt-8">
              <p className="text-lg font-medium text-gray-800">– Andrew</p>
              <p className="text-gray-600 mt-1">
                Trader | Product @ Microsoft | Creator of TradeCraft
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-slate-800 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Trade with Structure?</h2>
            <p className="text-slate-200 mb-6 text-lg">
              Join thousands of traders who&apos;ve transformed their approach with TradeCraft&apos;s systematic methodology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trade-plan/start-here">
                <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-100 font-semibold px-8">
                  Generate Your First Trade Plan
                </Button>
              </Link>
              <Link href="/trade-plan/demo">
                <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 font-semibold px-8 transition-colors">
                  Try Free Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}