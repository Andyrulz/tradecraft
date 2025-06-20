import React from 'react';
import Image from 'next/image';

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
  return date.toLocaleDateString();
}

export default function NewsCard({ item, featured = false }: { item: any; featured?: boolean }) {
  // Detect YouTube video
  const isYouTube = item.url && item.url.includes('youtube.com/watch');
  let videoId = '';
  if (isYouTube) {
    const match = item.url.match(/[?&]v=([^&]+)/);
    videoId = match ? match[1] : '';
  }

  if (featured) {
    return (
      <div className="rounded-xl bg-white shadow border border-gray-100 mb-8 p-0 w-full">
        {item.thumbnail_url && (
          <Image
            src={item.thumbnail_url}
            alt={item.title}
            className="w-full h-48 sm:h-72 object-cover rounded-t-xl"
            width={800}
            height={288}
            style={{ objectFit: 'cover', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }}
            priority
          />
        )}
        <div className="p-4 sm:p-6">
          <div className="text-gray-500 text-xs mb-2">
            {item.source && <>{item.source} &middot; </>}{formatTimeAgo(item.published_at)}
          </div>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl font-bold text-blue-800 hover:underline block mb-2">
            {item.title}
          </a>
          <div className="text-gray-700 text-base mb-2 line-clamp-3">{item.summary}</div>
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
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white rounded-xl shadow border border-gray-100 overflow-hidden mb-6 p-4 hover:shadow-md transition w-full">
      {item.thumbnail_url && (
        <div className="relative w-full sm:w-40 h-36 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden mb-3 sm:mb-0">
          <Image
            src={item.thumbnail_url}
            alt={item.title}
            fill
            className="object-cover"
            sizes="100vw, (min-width: 640px) 160px"
            style={{ borderRadius: '0.5rem' }}
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="text-gray-500 text-xs mb-1">
          {item.source && <>{item.source} &middot; </>}{formatTimeAgo(item.published_at)}
        </div>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg font-semibold text-blue-900 hover:underline block mb-1">
          {item.title}
        </a>
        <div className="text-gray-700 text-sm mt-1 line-clamp-2">{item.summary}</div>
      </div>
    </div>
  );
}
