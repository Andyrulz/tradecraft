"use client";

import { Suspense } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { BarChart2 } from 'lucide-react';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const isSignup = searchParams.get('mode') === 'signup';

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push(callbackUrl);
      }
    });
  }, [callbackUrl, router]);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('google', {
        callbackUrl,
        redirect: false
      });
      
      if (result?.error) {
        setError('Authentication failed. Please try again.');
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isSignup ? 'Sign Up for TradeCraft' : 'Sign In to TradeCraft'}</title>
        <meta name="description" content={isSignup ? 'Create your TradeCraft account to access trade plans, stock screener, and premium features.' : 'Sign in to TradeCraft to access your personalized trade plans, stock screener, and premium features.'} />
        <meta property="og:title" content={isSignup ? 'Sign Up for TradeCraft' : 'Sign In to TradeCraft'} />
        <meta property="og:description" content={isSignup ? 'Create your TradeCraft account to access trade plans, stock screener, and premium features.' : 'Sign in to TradeCraft to access your personalized trade plans, stock screener, and premium features.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/auth/signin" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isSignup ? 'Sign Up for TradeCraft' : 'Sign In to TradeCraft'} />
        <meta name="twitter:description" content={isSignup ? 'Create your TradeCraft account to access trade plans, stock screener, and premium features.' : 'Sign in to TradeCraft to access your personalized trade plans, stock screener, and premium features.'} />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-2xl text-gray-900">TradeCraft</span>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isSignup ? 'Create your account' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignup 
                ? 'Join thousands of traders making smarter decisions' 
                : 'Welcome back! Continue your trading journey'
              }
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            
            <div>
              <button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isSignup ? 'Creating account...' : 'Signing in...'}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isSignup ? 'Sign up with Google' : 'Sign in with Google'}
                  </div>
                )}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  onClick={() => router.push(isSignup ? '/auth/signin' : '/auth/signin?mode=signup')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {isSignup ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By {isSignup ? 'signing up' : 'signing in'}, you agree to our{' '}
                <a href="/terms-of-service" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Loading component for Suspense fallback
function SignInLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <BarChart2 className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-2xl text-gray-900">TradeCraft</span>
            </div>
          </div>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInContent />
    </Suspense>
  );
}