/**
 * Cache Headers Utility
 * Provides standardized cache headers for different types of content
 */

export interface CacheConfig {
  maxAge: number;
  staleWhileRevalidate?: number;
  immutable?: boolean;
  public?: boolean;
}

export const CACHE_CONFIGS = {
  // Static assets that never change (1 year)
  STATIC_ASSETS: {
    maxAge: 31536000, // 1 year
    immutable: true,
    public: true
  },
  
  // Images and media (1 month)
  IMAGES: {
    maxAge: 2592000, // 1 month
    staleWhileRevalidate: 86400, // 1 day
    public: true
  },
  
  // Blog images (1 week)
  BLOG_IMAGES: {
    maxAge: 604800, // 1 week
    staleWhileRevalidate: 3600, // 1 hour
    public: true
  },
  
  // Profile/avatar images (1 day)
  PROFILE_IMAGES: {
    maxAge: 86400, // 1 day
    staleWhileRevalidate: 3600, // 1 hour
    public: true
  },
  
  // Dynamic content (1 hour)
  DYNAMIC: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 300, // 5 minutes
    public: true
  },
  
  // API responses (5 minutes)
  API: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 60, // 1 minute
    public: true
  }
} as const;

/**
 * Generate Cache-Control header value
 */
export function generateCacheControlHeader(config: CacheConfig): string {
  const parts: string[] = [];
  
  if (config.public) {
    parts.push('public');
  }
  
  parts.push(`max-age=${config.maxAge}`);
  
  if (config.staleWhileRevalidate) {
    parts.push(`stale-while-revalidate=${config.staleWhileRevalidate}`);
  }
  
  if (config.immutable) {
    parts.push('immutable');
  }
  
  return parts.join(', ');
}

/**
 * Generate Expires header value
 */
export function generateExpiresHeader(maxAge: number): string {
  return new Date(Date.now() + maxAge * 1000).toUTCString();
}

/**
 * Get complete cache headers object
 */
export function getCacheHeaders(configKey: keyof typeof CACHE_CONFIGS): Record<string, string> {
  const config = CACHE_CONFIGS[configKey];
  
  return {
    'Cache-Control': generateCacheControlHeader(config),
    'Expires': generateExpiresHeader(config.maxAge),
    'Last-Modified': new Date().toUTCString(),
    'ETag': `"${Date.now()}"` // Simple ETag based on timestamp
  };
}

/**
 * Apply cache headers to a Response object
 */
export function applyCacheHeaders(
  response: Response, 
  configKey: keyof typeof CACHE_CONFIGS
): Response {
  const headers = getCacheHeaders(configKey);
  
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Apply cache headers to Next.js Response object
 */
export function applyNextCacheHeaders(
  headers: Headers, 
  configKey: keyof typeof CACHE_CONFIGS
): void {
  const cacheHeaders = getCacheHeaders(configKey);
  
  Object.entries(cacheHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
}

/**
 * Utility for API routes to set cache headers
 */
export function setApiCacheHeaders(
  response: Response,
  configKey: keyof typeof CACHE_CONFIGS = 'API'
): Response {
  return applyCacheHeaders(response, configKey);
}

/**
 * Get image cache headers based on image type/source
 */
export function getImageCacheHeaders(imageType: 'static' | 'blog' | 'profile' | 'dynamic' = 'static'): Record<string, string> {
  const configMap = {
    static: 'STATIC_ASSETS',
    blog: 'BLOG_IMAGES', 
    profile: 'PROFILE_IMAGES',
    dynamic: 'IMAGES'
  } as const;
  
  return getCacheHeaders(configMap[imageType]);
}
