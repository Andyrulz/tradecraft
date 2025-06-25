"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BarChart2 } from 'lucide-react';

const GUMROAD_PRO_URL = "https://labyrinthian8.gumroad.com/l/jynmay";
const GUMROAD_PREMIUM_URL = "https://labyrinthian8.gumroad.com/l/klcep";

export default function SubscribeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  
  const plan = searchParams.get('plan');

  useEffect(() => {
    if (status === 'loading') return; // Still loading session
    
    if (!session) {
      // User not signed in, redirect to signin with callback
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(`/subscribe?plan=${plan}`)}`);
      return;
    }
    
    // User is signed in, redirect to appropriate Gumroad URL
    if (plan === 'pro') {
      window.location.href = GUMROAD_PRO_URL;
    } else if (plan === 'premium') {
      window.location.href = GUMROAD_PREMIUM_URL;
    } else {
      // Invalid plan, redirect to pricing
      router.push('/pricing');
    }
  }, [session, status, plan, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-2xl text-gray-900">TradeCraft</span>
          </div>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          {!session ? 'Redirecting to sign in...' : `Redirecting to ${plan} subscription...`}
        </p>
      </div>
    </div>
  );
}
