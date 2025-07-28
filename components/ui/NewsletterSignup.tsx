"use client";

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'default' | 'compact' | 'sidebar';
  title?: string;
  description?: string;
}

export function NewsletterSignup({
  className = '',
  variant = 'default',
  title,
  description
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Using Formspree for newsletter signup
      const response = await fetch('https://formspree.io/f/xdkgepyw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'newsletter_signup',
          source: 'website'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! You\'ll receive our latest trading insights.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (variant) {
      case 'compact':
        return 'Get Trading Insights';
      case 'sidebar':
        return 'Stay Updated';
      default:
        return 'Get Free Trading Insights & Market Updates';
    }
  };

  const getDescription = () => {
    if (description) return description;
    switch (variant) {
      case 'compact':
        return 'Weekly market analysis and trade ideas.';
      case 'sidebar':
        return 'Weekly insights in your inbox.';
      default:
        return 'Join 1,000+ traders getting weekly market analysis, trade setups, and exclusive insights delivered to your inbox.';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-4 w-4 text-blue-600" />
          <h3 className="font-semibold text-sm">{getTitle()}</h3>
        </div>
        <p className="text-xs text-gray-600 mb-3">{getDescription()}</p>
        
        {status === 'success' ? (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Join'}
            </button>
          </form>
        )}
        
        {status === 'error' && (
          <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
            <AlertCircle className="h-3 w-3" />
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 ${className}`}>
        <div className="text-center">
          <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">{getTitle()}</h3>
          <p className="text-sm text-gray-600 mb-4">{getDescription()}</p>
          
          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Successfully subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? 'Subscribing...' : 'Get Free Updates'}
              </button>
            </form>
          )}
          
          {status === 'error' && (
            <div className="flex items-center justify-center gap-1 text-red-600 text-xs mt-2">
              <AlertCircle className="h-4 w-4" />
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 ${className}`}>
      <div className="text-center">
        <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">{getTitle()}</h3>
        <p className="text-gray-600 mb-6">{getDescription()}</p>
        
        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            <span className="font-medium">Successfully subscribed! Check your email for confirmation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        )}
        
        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 text-red-600 mt-3">
            <AlertCircle className="h-5 w-5" />
            <span>{message}</span>
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-4">
          No spam. Unsubscribe anytime. Join 1,000+ traders already subscribed.
        </p>
      </div>
    </div>
  );
}
