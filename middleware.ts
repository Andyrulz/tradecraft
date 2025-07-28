import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Enhanced middleware for cache headers optimization
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  // Add cache headers for static assets
  if (isStaticAsset(pathname)) {
    const cacheHeaders = getCacheHeadersForPath(pathname);
    
    Object.entries(cacheHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }
  
  // Add security headers for all requests
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

function isStaticAsset(pathname: string): boolean {
  const staticExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico',
    '.woff', '.woff2', '.ttf', '.eot', '.otf',
    '.css', '.js', '.map'
  ];
  
  return staticExtensions.some(ext => pathname.toLowerCase().endsWith(ext)) ||
         pathname.startsWith('/_next/static/') ||
         pathname.startsWith('/_next/image/') ||
         pathname.startsWith('/images/') ||
         pathname.startsWith('/badges/') ||
         pathname === '/favicon.ico' ||
         pathname === '/site.webmanifest' ||
         pathname === '/robots.txt';
}

function getCacheHeadersForPath(pathname: string): Record<string, string> {
  const now = new Date();
  
  // Static assets (images, fonts, etc.) - 1 year cache
  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot|otf)$/i)) {
    const oneYear = 31536000; // 1 year in seconds
    const expires = new Date(now.getTime() + oneYear * 1000);
    
    return {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Expires': expires.toUTCString(),
      'Last-Modified': new Date(2024, 0, 1).toUTCString(), // Static date for immutable assets
    };
  }
  
  // Next.js static files - 1 year cache
  if (pathname.startsWith('/_next/static/')) {
    const oneYear = 31536000;
    const expires = new Date(now.getTime() + oneYear * 1000);
    
    return {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Expires': expires.toUTCString(),
      'Last-Modified': new Date(2024, 0, 1).toUTCString(),
    };
  }
  
  // Next.js optimized images - 1 week cache with revalidation
  if (pathname.startsWith('/_next/image/')) {
    const oneWeek = 604800;
    const expires = new Date(now.getTime() + oneWeek * 1000);
    
    return {
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      'Expires': expires.toUTCString(),
      'Last-Modified': now.toUTCString(),
    };
  }
  
  // Blog images - 1 month cache
  if (pathname.startsWith('/blog/') && pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    const oneMonth = 2592000;
    const expires = new Date(now.getTime() + oneMonth * 1000);
    
    return {
      'Cache-Control': 'public, max-age=2592000',
      'Expires': expires.toUTCString(),
      'Last-Modified': now.toUTCString(),
    };
  }
  
  // Badges and external assets - 1 week cache
  if (pathname.startsWith('/badges/')) {
    const oneWeek = 604800;
    const expires = new Date(now.getTime() + oneWeek * 1000);
    
    return {
      'Cache-Control': 'public, max-age=604800',
      'Expires': expires.toUTCString(),
      'Last-Modified': now.toUTCString(),
    };
  }
  
  // Profile images (avatars) - 1 day cache
  if (pathname.match(/\/avatar\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    const oneDay = 86400;
    const expires = new Date(now.getTime() + oneDay * 1000);
    
    return {
      'Cache-Control': 'public, max-age=86400',
      'Expires': expires.toUTCString(),
      'Last-Modified': now.toUTCString(),
    };
  }
  
  // Manifest and other meta files - 1 week cache
  if (pathname.match(/\/(favicon\.ico|site\.webmanifest|robots\.txt)$/)) {
    const oneWeek = 604800;
    const expires = new Date(now.getTime() + oneWeek * 1000);
    
    return {
      'Cache-Control': 'public, max-age=604800',
      'Expires': expires.toUTCString(),
      'Last-Modified': now.toUTCString(),
    };
  }
  
  // Default for other static assets - 1 day cache
  const oneDay = 86400;
  const expires = new Date(now.getTime() + oneDay * 1000);
  
  return {
    'Cache-Control': 'public, max-age=86400',
    'Expires': expires.toUTCString(),
    'Last-Modified': now.toUTCString(),
  };
}

// Apply middleware to static assets and key routes
export const config = {
  matcher: [
    // Static assets
    '/((?!api/|_next/static/|_next/image/|favicon.ico).*)',
    // Include Next.js optimized images and static files
    '/_next/image/:path*',
    '/_next/static/:path*',
    // Include common asset paths
    '/images/:path*',
    '/badges/:path*',
    '/blog/:path*',
    // Include meta files
    '/favicon.ico',
    '/site.webmanifest', 
    '/robots.txt'
  ],
};
