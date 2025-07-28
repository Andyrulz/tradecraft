"use client";

import { useState } from 'react';
import Head from 'next/head';
import { HybridAdStrategy } from '@/components/ui/HybridAds';
import { BannerWorkingAd } from '@/components/ui/WorkingAdUnit';
import { StructuredData } from '@/components/seo/StructuredData';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ContactPage schema for SEO
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact TradeCraft Pro",
    "description": "Get in touch with TradeCraft Pro support team for questions about AI trading strategies, technical support, or subscription assistance.",
    "url": "https://www.tradingsetup.pro/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "TradeCraft Pro",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@tradingsetup.pro",
        "availableLanguage": "English"
      }
    }
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.tradingsetup.pro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://www.tradingsetup.pro/contact"
      }
    ]
  };

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
      const res = await fetch('https://formspree.io/f/xdkgepyw', {
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
      console.error('Form submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <HybridAdStrategy>
      <Head>
        <title>Contact TradeCraft Pro - Support & Questions | AI Trading Platform</title>
        <meta name="description" content="Contact TradeCraft Pro support team for questions about AI trading strategies, technical support, subscription assistance, or partnership inquiries. We're here to help you trade smarter." />
        <meta property="og:title" content="Contact TradeCraft Pro - Support & Questions" />
        <meta property="og:description" content="Contact TradeCraft Pro support team for questions about AI trading strategies, technical support, subscription assistance, or partnership inquiries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/contact" />
        <meta property="og:image" content="https://www.tradingsetup.pro/og-contact.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact TradeCraft Pro - Support & Questions" />
        <meta name="twitter:description" content="Contact TradeCraft Pro support team for questions about AI trading strategies, technical support, subscription assistance, or partnership inquiries." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/og-contact.jpg" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
      </Head>
      <StructuredData data={contactSchema} />
      <StructuredData data={breadcrumbSchema} />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        {/* Minimal top banner ad */}
        <BannerWorkingAd className="flex justify-center mb-8" />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact TradeCraft Pro</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Have a question about our trading tools, need technical support, or want to share feedback? We&apos;re here to help you succeed in your trading journey.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Send us a Message</h2>
              {emailError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm font-medium">⚠️ Please fix the following error before submitting:</p>
                  <p className="text-red-600 text-sm mt-1">• {emailError}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    onChange={handleEmailChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                      emailError 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {emailError}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select id="subject" name="subject" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a topic...</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="billing">Billing & Subscriptions</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea id="message" name="message" rows={5} required placeholder="Please provide as much detail as possible..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !!emailError}
                  className={`w-full py-3 px-4 font-medium rounded-md transition duration-200 ${
                    isSubmitting || emailError
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-700 font-medium">✓ Thank you! Your message has been sent successfully.</p>
                  <p className="text-green-600 text-sm mt-1">We typically respond within 24-48 hours.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 font-medium">✗ Something went wrong. Please try again.</p>
                  <p className="text-red-600 text-sm mt-1">If the problem persists, you can email us directly.</p>
                </div>
              )}
            </div>
            
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Get in Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Response Time</h3>
                  <p className="text-gray-600 text-sm">We typically respond to all inquiries within 24-48 hours during business days.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Support Hours</h3>
                  <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST<br />Weekend: Limited support for urgent issues</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Before You Contact Us</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Check our <a href="/faq" className="text-blue-600 hover:underline">FAQ page</a> for quick answers</li>
                    <li>• Review our <a href="/education" className="text-blue-600 hover:underline">educational resources</a></li>
                    <li>• Try refreshing the page or clearing your browser cache</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">What to Include</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Detailed description of your issue or question</li>
                    <li>• Screenshots (if applicable)</li>
                    <li>• Your browser and device information</li>
                    <li>• Steps you&apos;ve already tried</li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-800 mb-2">Quick Links</h3>
                  <div className="space-y-2 text-sm">
                    <a href="/faq" className="block text-blue-600 hover:underline">→ Frequently Asked Questions</a>
                    <a href="/education" className="block text-blue-600 hover:underline">→ Trading Education & Guides</a>
                    <a href="/pricing" className="block text-blue-600 hover:underline">→ Pricing & Subscription Info</a>
                    <a href="/terms-of-service" className="block text-blue-600 hover:underline">→ Terms of Service</a>
                    <a href="/privacy-policy" className="block text-blue-600 hover:underline">→ Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HybridAdStrategy>
  );
}