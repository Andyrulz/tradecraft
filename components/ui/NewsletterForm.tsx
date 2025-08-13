"use client";

import { useState } from 'react';

interface NewsletterFormProps {
  source?: string;
  className?: string;
}

export default function NewsletterForm({ source = 'Homepage', className = '' }: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation function
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Handle email field changes
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    
    // Validate email before submission
    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setEmailError('');
    
    try {
      const res = await fetch('https://formspree.io/f/xnndpbwn', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      
      if (res.ok) {
        setStatus('success');
        form.reset();
        setEmailError('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === 'success') {
    return (
      <div className={`max-w-md mx-auto ${className}`}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-4xl mb-3">✓</div>
          <h3 className="text-lg font-bold text-green-900 mb-2">Welcome to TradeCraft Pro!</h3>
          <p className="text-green-800 text-sm">
            Thank you for subscribing! You&apos;re now part of 10,000+ traders who receive our exclusive insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {emailError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm font-medium">⚠️ {emailError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          onChange={handleEmailChange}
          className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-base ${
            emailError 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        <input type="hidden" name="_subject" value={`New TradeCraft Newsletter Subscription from ${source}`} />
        <button 
          type="submit"
          disabled={isSubmitting || !!emailError}
          className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
            isSubmitting || emailError
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              ...
            </span>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      
      {status === 'error' && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm font-medium">✗ Something went wrong. Please try again.</p>
        </div>
      )}
      
      <p className="text-sm text-gray-500 mt-2 text-center">Free. Unsubscribe anytime.</p>
    </div>
  );
}
