"use client";

import { useState } from 'react';
import Head from 'next/head';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch('https://formspree.io/f/xdkgepyw', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });
    if (res.ok) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <>
      <Head>
        <title>Contact TradeCraft</title>
        <meta name="description" content="Contact the TradeCraft team for support, feedback, or partnership inquiries. We're here to help you trade smarter." />
        <meta property="og:title" content="Contact TradeCraft" />
        <meta property="og:description" content="Contact the TradeCraft team for support, feedback, or partnership inquiries. We're here to help you trade smarter." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/contact" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact TradeCraft" />
        <meta name="twitter:description" content="Contact the TradeCraft team for support, feedback, or partnership inquiries. We're here to help you trade smarter." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Contact Me</h1>
          <p className="mb-6 text-gray-600">Have a question, suggestion, or just want to say hi? Fill out the form below and I&apos;ll get back to you soon!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows={5} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-primary text-white font-bold rounded-md hover:bg-primary/90 transition">Send Message</button>
          </form>
          {status === 'success' && <p className="mt-4 text-green-600">Thank you! Your message has been sent.</p>}
          {status === 'error' && <p className="mt-4 text-red-600">Oops! Something went wrong. Please try again or feel free to send a mail directly to me at andrew.labyrinthventures@gmail.com</p>}
        </div>
      </div>
    </>
  );
}