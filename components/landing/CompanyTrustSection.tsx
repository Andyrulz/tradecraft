import React from 'react';
import Image from 'next/image';

const trustedCompanies = [
  {
    name: 'Yahoo Finance',
    logo: '/logos/yahoo-finance.svg',
    description: 'Financial data provider'
  },
  {
    name: 'Alpha Vantage',
    logo: '/logos/alpha-vantage.svg',
    description: 'Market data API'
  },
  {
    name: 'Polygon.io',
    logo: '/logos/polygon.svg',
    description: 'Real-time market data'
  },
  {
    name: 'Finnhub',
    logo: '/logos/finnhub.svg',
    description: 'Stock market data'
  },
  {
    name: 'IEX Cloud',
    logo: '/logos/iex-cloud.svg',
    description: 'Financial data platform'
  },
  {
    name: 'News API',
    logo: '/logos/news-api.svg',
    description: 'Market news aggregation'
  },
  {
    name: 'Seeking Alpha',
    logo: '/logos/seeking-alpha.svg',
    description: 'Investment research'
  }
];

export function CompanyTrustSection() {
  return (
    <section className="w-full bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-border py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Powered by trusted data sources and industry-leading platforms
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {trustedCompanies.map((company, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 bg-white/50 backdrop-blur-sm border border-transparent hover:border-primary/20"
              title={company.description}
            >
              {/* For now, show text-based logos since we don't have the actual logo files */}
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-2 group-hover:from-primary/10 group-hover:to-primary/5 transition-colors duration-300">
                <span className="text-xs font-bold text-gray-600 text-center leading-tight">
                  {company.name.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-600 text-center group-hover:text-primary transition-colors duration-300">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Integrating with the best financial data providers to deliver accurate, real-time market insights
          </p>
        </div>
      </div>
    </section>
  );
}
