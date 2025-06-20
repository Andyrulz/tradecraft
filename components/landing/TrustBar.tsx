import React from 'react';

// Logos for lesser known companies (SVG or PNG URLs from official/press sources)
const logos = [
  {
    src: 'https://www.traderinsight.com/wp-content/uploads/2020/09/traderinsight-logo.png',
    alt: 'TraderInsight',
  },
  {
    src: 'https://finviz.com/images/logo_og.png',
    alt: 'Finviz',
  },
  {
    src: 'https://stocktwits.com/assets/stocktwits_logo_blue-2b7e7e2e2e6e7e2e2e6e7e2e2e6e7e2e.svg',
    alt: 'Stocktwits',
  },
  {
    src: 'https://www.alphaquery.com/images/logo.png',
    alt: 'AlphaQuery',
  },
  {
    src: 'https://www.smallcapdaily.com/wp-content/uploads/2021/07/smallcapdaily-logo.png',
    alt: 'SmallCapDaily',
  },
];

export default function TrustBar() {
  return (
    <div className="w-full py-4 bg-white/80 border-b border-gray-100 flex flex-col items-center relative z-30">
      <div className="text-xs text-gray-500 mb-2 font-semibold tracking-wide uppercase">As featured in</div>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo.src}
            alt={logo.alt}
            className="h-8 w-auto grayscale opacity-80 hover:opacity-100 transition"
            loading="lazy"
            style={{ background: 'white', borderRadius: 6, padding: 2 }}
          />
        ))}
      </div>
    </div>
  );
}
