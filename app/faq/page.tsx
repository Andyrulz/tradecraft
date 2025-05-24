import Head from 'next/head';

const faqs = [
  {
    question: 'How do I generate a trade plan?',
    answer: 'Go to the Trade Plan page, enter a stock symbol, select your time horizon, and click Generate. You’ll get entry, stop, targets, and risk management instantly.'
  },
  {
    question: 'What is the daily request limit?',
    answer: 'Free users get 2 requests per day (resets at midnight UTC). Pro and Premium users get higher limits.'
  },
  {
    question: 'How does the screener work?',
    answer: 'The screener lets you filter stocks by technical, fundamental, and momentum criteria. Adjust filters to match your strategy.'
  },
  {
    question: 'Can I analyze any stock?',
    answer: 'Yes, you can analyze any supported stock using the Stock Analysis page for technical and fundamental breakdowns.'
  },
  {
    question: 'How do I upgrade my plan?',
    answer: 'Visit the Pricing page and select your desired plan. You’ll be redirected to a secure payment provider.'
  },
];

export default function FAQPage() {
  return (
    <main className="flex-1 pt-24 pb-12">
      <Head>
        <title>TradeCraft FAQ</title>
        <meta name="description" content="Frequently asked questions about TradeCraft: trade plans, screener, analysis, quotas, and more." />
        <meta property="og:title" content="TradeCraft FAQ" />
        <meta property="og:description" content="Frequently asked questions about TradeCraft: trade plans, screener, analysis, quotas, and more." />
        <meta property="og:type" content="faq" />
        <meta property="og:url" content="https://www.tradingsetup.pro/faq" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeCraft FAQ" />
        <meta name="twitter:description" content="Frequently asked questions about TradeCraft: trade plans, screener, analysis, quotas, and more." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          \"@context\": \"https://schema.org\",
          \"@type\": \"FAQPage\",
          \"mainEntity\": [
            ${faqs.map(faq => `{
              \\"@type\\": \\\"Question\\",\n              \\"name\\": \\\"${faq.question.replace(/"/g, '\\"')}\\\",\n              \\"acceptedAnswer\\": {\n                \\"@type\\": \\\"Answer\\",\n                \\"text\\": \\\"${faq.answer.replace(/"/g, '\\"')}\\\"\n              }\n            }`).join(',')}
          ]
        }` }} />
      </Head>
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
