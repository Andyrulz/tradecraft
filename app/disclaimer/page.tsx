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
          <h1 className="text-3xl font-bold mb-6">Investment and Trading Disclaimer</h1>
          <p className="mb-4">Last updated: June 25, 2025</p>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="font-bold text-red-800 mb-2">IMPORTANT RISK WARNING</p>
            <p className="text-red-700">Trading and investing in financial markets involves substantial risk of loss and is not suitable for all investors. You may lose some or all of your invested capital. Never invest money you cannot afford to lose.</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Educational Purpose Only</h2>
          <p className="mb-4">The information provided by TradeCraft (tradingsetup.pro) is for educational and informational purposes only. It is not intended as financial, investment, tax, or legal advice. You should consult with qualified professionals before making any investment decisions.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">No Investment Advice</h2>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>General Information:</strong> All content is general information, not personalized investment advice</li>
            <li><strong>Not Recommendations:</strong> Trade plans and analysis are educational tools, not investment recommendations</li>
            <li><strong>Independent Decision:</strong> All investment decisions are solely your responsibility</li>
            <li><strong>Professional Consultation:</strong> Always consult qualified financial advisors for personalized advice</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Risk Factors</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Market Risks</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>Stock prices can fluctuate dramatically and unpredictably</li>
              <li>Market conditions can change rapidly due to economic, political, or other factors</li>
              <li>Past performance is not indicative of future results</li>
              <li>Individual stocks may become worthless</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2">Technology Risks</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>Data delays or inaccuracies may occur</li>
              <li>System outages may prevent access to information</li>
              <li>Algorithm-generated analysis may contain errors</li>
              <li>Third-party data providers may experience disruptions</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2">Trading-Specific Risks</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>Day trading and short-term strategies carry higher risks</li>
              <li>Leverage amplifies both gains and losses</li>
              <li>Options and derivatives involve complex risks</li>
              <li>Small-cap and penny stocks are particularly volatile</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">No Performance Guarantees</h2>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>No Guarantees:</strong> We make no guarantees about investment performance or outcomes</li>
            <li><strong>Historical Performance:</strong> Past results do not predict future performance</li>
            <li><strong>Market Conditions:</strong> Future market conditions may differ significantly from historical patterns</li>
            <li><strong>Individual Results:</strong> Your results may vary significantly from any examples or case studies</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Accuracy and Reliability</h2>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Third-Party Data:</strong> We rely on third-party financial data providers and cannot guarantee absolute accuracy</li>
            <li><strong>Real-Time Data:</strong> Market data may be delayed; check with data providers for exact timing</li>
            <li><strong>System Errors:</strong> Technical errors, bugs, or system failures may affect data accuracy</li>
            <li><strong>User Verification:</strong> Always verify information independently before making trading decisions</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Regulatory Compliance</h2>
          <p className="mb-4">TradeCraft is not a registered investment advisor, broker-dealer, or financial institution. We are not subject to the same regulatory oversight as licensed financial professionals. Our services are provided as educational tools only.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Geographic Limitations</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Our content focuses primarily on U.S. financial markets</li>
            <li>Information may not be applicable to other jurisdictions</li>
            <li>Local laws and regulations may restrict certain investment activities</li>
            <li>Tax implications vary by jurisdiction and individual circumstances</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">External Links and Third-Party Content</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Our website may contain links to third-party sites and services</li>
            <li>We are not responsible for the content, accuracy, or privacy practices of external sites</li>
            <li>Third-party content does not constitute endorsement by TradeCraft</li>
            <li>Use of external links is at your own risk</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="font-medium text-yellow-800 mb-2">LIABILITY LIMITATIONS:</p>
            <ul className="list-disc ml-6 text-yellow-700">
              <li>TradeCraft and its affiliates are not liable for any financial losses</li>
              <li>We disclaim all warranties, express or implied</li>
              <li>Our maximum liability is limited to fees paid for our services</li>
              <li>We are not responsible for indirect, consequential, or punitive damages</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">User Responsibilities</h2>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Due Diligence:</strong> Conduct your own research and analysis</li>
            <li><strong>Risk Assessment:</strong> Evaluate your risk tolerance and financial situation</li>
            <li><strong>Professional Advice:</strong> Consult qualified professionals for personalized guidance</li>
            <li><strong>Regulatory Compliance:</strong> Ensure compliance with applicable laws and regulations</li>
            <li><strong>Continuous Learning:</strong> Stay informed about market conditions and risks</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Updates and Changes</h2>
          <p className="mb-4">This disclaimer may be updated periodically to reflect changes in our services or legal requirements. The &quot;Last updated&quot; date indicates the most recent revision. Continued use of our services constitutes acceptance of any updates.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
          <p className="mb-4">If you have questions about this disclaimer or need clarification on any aspects of our services:</p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Contact Form:</strong> <a href="/contact" className="text-blue-600 underline">Submit an inquiry</a></li>
            <li><strong>Website:</strong> tradingsetup.pro</li>
            <li><strong>Response Time:</strong> We typically respond within 48 hours</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
            <p className="font-medium text-blue-800 mb-2">REMEMBER:</p>
            <p className="text-blue-700">Successful trading requires education, practice, and careful risk management. Never risk more than you can afford to lose, and always prioritize learning over quick profits.</p>
          </div>
        </div>
      </main>
    </>
  );
}