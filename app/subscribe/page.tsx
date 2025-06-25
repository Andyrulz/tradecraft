import { Suspense } from 'react';
import SubscribeClient from './SubscribeClient';

export default function SubscribePage() {
  return (
    <Suspense fallback={<SubscribeLoading />}>
      <SubscribeClient />
    </Suspense>
  );
}

function SubscribeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded"></div>
            <span className="font-bold text-2xl text-gray-900">TradeCraft</span>
          </div>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
