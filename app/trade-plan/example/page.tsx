import Head from 'next/head';

export default function ExampleTradePlan() {
  return (
    <>
      <Head>
        <title>Example Trade Plan: MSFT | TradeCraft</title>
        <meta name="description" content="See a sample AI-generated trade plan for Microsoft (MSFT) with entry, targets, and risk management. No sign-in required." />
        <meta property="og:title" content="Example Trade Plan: MSFT | TradeCraft" />
        <meta property="og:description" content="See a sample AI-generated trade plan for Microsoft (MSFT) with entry, targets, and risk management. No sign-in required." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.tradingsetup.pro/trade-plan/example" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Example Trade Plan: MSFT | TradeCraft" />
        <meta name="twitter:description" content="See a sample AI-generated trade plan for Microsoft (MSFT) with entry, targets, and risk management. No sign-in required." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <link rel="canonical" href="https://www.tradingsetup.pro/trade-plan/example" />
      </Head>
      <iframe
        key={typeof window !== 'undefined' ? window.location.href : undefined}
        src="/example/index.html"
        title="Example Trade Plan for MSFT"
        style={{ minHeight: '100vh', width: '100vw', border: 'none', position: 'fixed', top: 0, left: 0, zIndex: 9999, background: '#fff' }}
        allowFullScreen
      />
    </>
  );
}
