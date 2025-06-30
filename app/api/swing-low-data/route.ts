import { NextResponse } from 'next/server';

const twelveDataApiKeys = [
  process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY_1 || '4b0c95181f434ef5be044c825bd15b37',
  process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY_2 || '4b0c95181f434ef5be044c825bd15b37',
];
let apiKeyIndex = 0;

function getNextApiKey() {
  const key = twelveDataApiKeys[apiKeyIndex];
  apiKeyIndex = (apiKeyIndex + 1) % twelveDataApiKeys.length;
  return key;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const interval = searchParams.get('interval') || '1day';
  const outputsize = searchParams.get('outputsize') || '60';

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const apiKey = getNextApiKey();
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${apiKey}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data from Twelve Data' }, { status: response.status });
    }

    const data = await response.json();

    if (data.status === 'error') {
      return NextResponse.json({ error: data.message || 'API error' }, { status: 400 });
    }

    // Transform the data to match our expected format
    const transformedData = data.values?.map((item: any) => ({
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      datetime: item.datetime
    })) || [];

    return NextResponse.json({
      values: transformedData.reverse(), // Reverse to get chronological order
      meta: data.meta
    });

  } catch (error) {
    console.error('Error fetching swing low data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
