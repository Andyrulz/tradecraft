import React, { useState } from 'react';
import Image from 'next/image';

const DEFAULT_IMAGE = '/default-news.jpg';

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diff < 60) return `${diff} second${diff === 1 ? '' : 's'} ago`;
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  }
  if (diff < 86400) {
    const hrs = Math.floor(diff / 3600);
    return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  }
  if (diff < 86400 * 2) {
    return 'Yesterday';
  }
  if (diff < 86400 * 3) {
    return '2 days ago';
  }
  return date.toLocaleDateString();
}

// Helper to check if news is very recent (within last hour)
function isBreakingNews(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  return diff < 3600; // Less than 1 hour
}

export default function NewsCard({ item, featured = false }: { item: any; featured?: boolean }) {
  // Detect YouTube video
  const isYouTube = item.url && item.url.includes('youtube.com/watch');
  let videoId = '';
  if (isYouTube) {
    const match = item.url.match(/[?&]v=([^&]+)/);
    videoId = match ? match[1] : '';
  }

  const [imgSrc, setImgSrc] = useState(item.thumbnail_url || DEFAULT_IMAGE);
  if (featured) {
    return (
      <div className="rounded-xl bg-white shadow border border-gray-100 mb-6 lg:mb-8 p-0 w-full">
        {item.thumbnail_url && (
          <Image
            src={imgSrc}
            alt={item.title}
            className="w-full h-40 sm:h-48 lg:h-72 object-cover rounded-t-xl"
            width={800}
            height={288}
            style={{ objectFit: 'cover', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }}
            loading="lazy"
            onError={() => setImgSrc(DEFAULT_IMAGE)}
          />
        )}
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 text-xs mb-2">
            {isBreakingNews(item.published_at) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                BREAKING
              </span>
            )}
            <span className="text-gray-500">
              {item.source && <>{item.source} &middot; </>}{formatTimeAgo(item.published_at)}
            </span>
          </div>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800 hover:underline block mb-2 leading-tight">
            {item.title}
          </a>
          <div className="text-gray-700 text-sm sm:text-base mb-2 line-clamp-3">{item.summary}</div>
          {item.video_url ? (
            <div className="mt-4 rounded-lg overflow-hidden">
              <iframe
                src={item.video_url}
                title="Embedded video"
                width="100%"
                height="360"
                className="w-full h-72"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ border: 0, borderRadius: '0.75rem' }}
              ></iframe>
            </div>
          ) : isYouTube && videoId ? (
            <div className="mt-4">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
          ) : isYouTube && !videoId ? (
            <div className="mt-4 text-red-500 text-sm">YouTube video could not be embedded. (Invalid video ID)</div>
          ) : null}
        </div>
      </div>
    );
  }
  // Clean, single-line card for non-featured news
  return (
    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6 bg-white rounded-xl shadow border border-gray-100 overflow-hidden mb-4 sm:mb-6 p-3 sm:p-4 hover:shadow-md transition w-full">
      <div className="relative w-full sm:w-32 lg:w-40 h-32 sm:h-24 lg:h-28 flex-shrink-0 rounded-lg overflow-hidden mb-2 sm:mb-0">
        <Image
          src={imgSrc}
          alt={item.title}
          className="object-cover"
          width={160}
          height={112}
          style={{ borderRadius: '0.5rem', width: '100%', height: '100%' }}
          loading="lazy"
          onError={() => setImgSrc(DEFAULT_IMAGE)}
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs mb-1">
          {isBreakingNews(item.published_at) && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
              BREAKING
            </span>
          )}
          <span className="text-gray-500">
            {item.source && <>{item.source} &middot; </>}{formatTimeAgo(item.published_at)}
          </span>
        </div>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base lg:text-lg font-semibold text-blue-900 hover:underline block mb-1 leading-tight">
          {item.title}
        </a>
        <div className="text-gray-700 text-xs sm:text-sm mt-1 line-clamp-2">{item.summary}</div>
      </div>
    </div>
  );
}
