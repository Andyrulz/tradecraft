import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Minimal middleware that does nothing - authentication is handled directly in components
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Empty matcher means this middleware won't run on any routes
export const config = {
  matcher: [],
};
