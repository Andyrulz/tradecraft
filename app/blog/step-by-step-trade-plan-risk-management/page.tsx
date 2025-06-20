import Image from 'next/image';
import Head from 'next/head';

export default function StepByStepTradePlanRiskManagementBlog() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
      </Head>
      <main className="max-w-3xl mx-auto px-4 mt-28 mb-16">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Step-by-Step Guide: Creating a Trade Plan with Risk Management
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              A robust trade plan is the backbone of consistent trading success. In this guide, I’ll walk you through the exact steps I use to create a trade plan, inspired by the disciplined approaches of Mark Minervini and Dan Zanger. You’ll learn how to define your setup, manage risk, and execute with confidence.
            </p>
            <Image src="/blog/trade-plan-overview.png" alt="Trade Plan Overview" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </header>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">1. Define Your Setup</h2>
            <p>Start by clearly defining the technical setup you’re trading. Is it a breakout, pullback, or trend continuation? Use strict criteria—such as price above key moving averages, tight consolidation, and volume patterns—to filter for A+ setups.</p>
            <Image src="/blog/setup-criteria.png" alt="Setup Criteria Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">2. Entry and Exit Rules</h2>
            <ul className="list-disc list-inside space-y-2 text-base pl-2">
              <li>Entry: Enter only when all criteria are met. Avoid chasing extended moves.</li>
              <li>Stop-Loss: Place your stop just below a logical support level or the low of the base.</li>
              <li>Targets: Set realistic profit targets based on risk/reward (at least 2:1).</li>
            </ul>
            <Image src="/blog/entry-exit-rules.png" alt="Entry and Exit Rules" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">3. Position Sizing</h2>
            <p>Calculate your position size based on your risk tolerance. For example, risking 1% of your capital per trade. Use the distance from entry to stop-loss to determine the number of shares.</p>
            <Image src="/blog/position-sizing.png" alt="Position Sizing Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">4. Risk Management Checklist</h2>
            <ul className="list-disc list-inside space-y-2 text-base pl-2">
              <li>Is your risk per trade defined and acceptable?</li>
              <li>Is your stop-loss logical and not arbitrary?</li>
              <li>Are you avoiding overexposure to one sector or theme?</li>
              <li>Do you have a plan for partial profits or trailing stops?</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">5. Review and Refine</h2>
            <p>After each trade, review your plan and execution. Did you follow your rules? What can you improve? Keep a trading journal with annotated charts and notes.</p>
            <Image src="/blog/trading-journal.png" alt="Trading Journal Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">Conclusion</h2>
            <p>A well-crafted trade plan is your edge in the market. By following these steps and maintaining discipline, you’ll avoid emotional decisions and trade with confidence. For more trade plan templates and real-world examples, explore the rest of the TradeCraft blog.</p>
          </section>
          <footer className="mt-10 text-center">
            <a href="/" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition">Generate a Trade Plan</a>
          </footer>
        </article>
      </main>
    </>
  );
}