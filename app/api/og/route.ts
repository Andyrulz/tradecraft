import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'TradeCraft Pro';
  const description = searchParams.get('description') || 'Advanced Stock Market Analysis & Trading Tools';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1f2937',
          fontSize: 60,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 20,
            padding: 40,
            margin: 40,
            width: '90%',
            height: '80%',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#1f2937',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#6b7280',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              fontSize: 24,
              color: '#1f2937',
              fontWeight: 600,
            }}
          >
            tradingsetup.pro
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
