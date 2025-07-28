'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: string;
  cacheCategory?: 'static' | 'dynamic' | 'profile' | 'blog';
}

export function OptimizedImage({ 
  fallback, 
  cacheCategory = 'static',
  ...props 
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(props.src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Add cache-related attributes based on category
  const getCacheAttributes = (category: string) => {
    switch (category) {
      case 'static':
        return {
          'data-cache-duration': '31536000', // 1 year
          'data-cache-type': 'immutable'
        };
      case 'dynamic':
        return {
          'data-cache-duration': '86400', // 1 day
          'data-cache-type': 'public'
        };
      case 'profile':
        return {
          'data-cache-duration': '3600', // 1 hour
          'data-cache-type': 'public'
        };
      case 'blog':
        return {
          'data-cache-duration': '2592000', // 1 month
          'data-cache-type': 'public'
        };
      default:
        return {
          'data-cache-duration': '86400',
          'data-cache-type': 'public'
        };
    }
  };

  const cacheAttributes = getCacheAttributes(cacheCategory);

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ 
            width: typeof props.width === 'number' ? props.width : '100%',
            height: typeof props.height === 'number' ? props.height : '100%'
          }}
        />
      )}
      
      <Image
        {...props}
        src={hasError ? (fallback || '/images/placeholder.png') : imgSrc}
        alt={props.alt || ''}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
          if (fallback && imgSrc !== fallback) {
            setImgSrc(fallback);
          }
        }}
        // Add performance optimizations
        loading={props.loading || 'lazy'}
        decoding="async"
        // Add cache-related data attributes
        {...cacheAttributes}
        // Optimize for Core Web Vitals
        sizes={props.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        quality={props.quality || 85}
        style={{
          ...props.style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
}

// Specialized components for different use cases
export function StaticImage(props: Omit<OptimizedImageProps, 'cacheCategory'>) {
  return <OptimizedImage {...props} cacheCategory="static" />;
}

export function DynamicImage(props: Omit<OptimizedImageProps, 'cacheCategory'>) {
  return <OptimizedImage {...props} cacheCategory="dynamic" />;
}

export function ProfileImage(props: Omit<OptimizedImageProps, 'cacheCategory'>) {
  return <OptimizedImage {...props} cacheCategory="profile" />;
}

export function BlogImage(props: Omit<OptimizedImageProps, 'cacheCategory'>) {
  return <OptimizedImage {...props} cacheCategory="blog" />;
}
