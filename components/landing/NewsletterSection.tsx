"use client";

import React, { useState } from 'react';
import { Mail, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-blue-50/50 to-primary/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232196F3' fill-opacity='0.1'%3E%3Cpath d='M54 54v6h6v-6h-6zm-6-6v6h6v-6h-6zm-6 0v6h6v-6h-6zm-6-6v6h6v-6h-6zm-6 0v6h6v-6h-6zm-6-6v6h6v-6h-6zm-6 0v6h6v-6h-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block bg-gradient-to-r from-primary/20 to-blue-600/20 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-6">
              📈 FREE MARKET INSIGHTS
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-primary to-blue-700 bg-clip-text text-transparent leading-tight">
              Stay ahead with our weekly market newsletter
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Get curated market insights, top momentum stocks, and AI-powered trade setups delivered to your inbox every week. Join 10,000+ smart traders who rely on our analysis.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'Weekly market outlook & analysis',
                'Top 5 momentum stocks to watch',
                'AI-generated trade setups',
                'Risk management insights'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-600 rounded-full" />
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Newsletter Form */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl shadow-primary/10 p-8 border border-primary/10">
              
              {!subscribed ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Join Our Newsletter
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Free insights delivered weekly
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white transition-all duration-200 outline-none text-gray-900 placeholder-gray-500"
                        required
                      />
                      <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Get Free Market Insights</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-500 leading-relaxed">
                      No spam, unsubscribe anytime. We respect your privacy and never share your email.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    You&apos;re all set!
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Welcome to our community of smart traders. Check your email for a welcome message.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>First newsletter coming this Friday!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
