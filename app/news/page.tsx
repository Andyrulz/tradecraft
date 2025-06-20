import { Metadata } from 'next';
import Head from 'next/head';
import MarketNewsPage from '@/components/market-news/MarketNewsPage';

export const metadata: Metadata = {
  title: 'Market News | Latest Stock Market News',
  description: 'Get the latest stock market news, headlines, and analysis. Updated frequently.'
};

export default function Page() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
      </Head>
      <MarketNewsPage />
    </>
  );
}
