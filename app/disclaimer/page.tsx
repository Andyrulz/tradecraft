import Head from 'next/head';

export default function DisclaimerPage() {
  return (
    <>
      <Head>
        <title>TradeCraft Disclaimer</title>
        <meta name="description" content="Read the TradeCraft disclaimer. All information is for educational purposes only. Always do your own research before making investment decisions." />
        <meta property="og:title" content="TradeCraft Disclaimer" />
        <meta property="og:description" content="Read the TradeCraft disclaimer. All information is for educational purposes only. Always do your own research before making investment decisions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/disclaimer" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeCraft Disclaimer" />
        <meta name="twitter:description" content="Read the TradeCraft disclaimer. All information is for educational purposes only. Always do your own research before making investment decisions." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="flex-1 pt-[68px] pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
          <p className="mb-4">Last updated: 5 May 2025</p>
          <p className="mb-4">The information provided by TradeCraft (tradingsetup.pro) is for educational and informational purposes only. It is not intended as financial, investment, or legal advice. You should consult with a qualified professional before making any investment decisions.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">No Financial Advice</h2>
          <p className="mb-4">TradeCraft does not guarantee the accuracy, completeness, or reliability of any information on this site. All trading and investment decisions are made at your own risk.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">External Links</h2>
          <p className="mb-4">Our website may contain links to third-party sites. We are not responsible for the content or privacy practices of those sites.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
          <p>If you have questions about this disclaimer, please <a href="/contact" className="text-primary underline">contact us</a>.</p>
        </div>
      </main>
    </>
  );
}