'use client';

import { useEffect } from 'react';

// Component to help Google Auto Ads recognize content sections
export function AdBreakHelper({ 
  children, 
  adBreak = false,
  contentType = "article"
}: { 
  children: React.ReactNode;
  adBreak?: boolean;
  contentType?: "article" | "section" | "list-item";
}) {
  useEffect(() => {
    if (adBreak) {
      // Signal to Google that this is a good spot for an ad
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({
          google_ad_placement: "content_break",
          content_type: contentType
        });
      } catch (e) {
        // Fail silently
      }
    }
  }, [adBreak, contentType]);

  return (
    <div 
      data-ad-break={adBreak}
      data-content-type={contentType}
      className={adBreak ? "ad-break-opportunity" : ""}
    >
      {children}
      {/* Add invisible marker for Auto Ads */}
      {adBreak && <div className="google-auto-placed" style={{ height: 1 }}></div>}
    </div>
  );
}

// Content section wrapper that signals good ad placement opportunities
export function ContentSection({ 
  children, 
  title,
  className = ""
}: { 
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <section className={`content-section ${className}`} data-ad-placement="allowed">
      {title && (
        <h2 className="section-title" data-ad-nearby="true">
          {title}
        </h2>
      )}
      <div className="section-content">
        {children}
      </div>
      {/* Auto Ads placement hint */}
      <div className="ad-placement-hint" style={{ height: 1, width: 1, opacity: 0 }}></div>
    </section>
  );
}

// Enhanced news article wrapper for better ad recognition
export function NewsArticleWrapper({ 
  children, 
  isLast = false,
  index
}: { 
  children: React.ReactNode;
  isLast?: boolean;
  index: number;
}) {
  return (
    <article 
      className="news-article"
      data-article-index={index}
      data-ad-placement={index % 3 === 0 ? "preferred" : "allowed"}
    >
      {children}
      {/* Add content break after every article for Auto Ads */}
      {!isLast && (
        <div 
          className="article-separator" 
          data-ad-break="true"
          style={{ minHeight: 20, margin: "1rem 0" }}
        />
      )}
    </article>
  );
}
