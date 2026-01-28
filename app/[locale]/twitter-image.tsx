import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Jo V - Web Application Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#000',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
            }}
          >
            Jo V
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: '#a3a3a3',
            }}
          >
            Web Application Developer
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#737373',
              maxWidth: '800px',
              marginTop: '20px',
            }}
          >
            13+ years building ERP systems, SaaS platforms, and modern web applications
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            display: 'flex',
            gap: '16px',
            fontSize: 20,
            color: '#525252',
          }}
        >
          <span>AI Integration</span>
          <span>•</span>
          <span>Blockchain</span>
          <span>•</span>
          <span>Full Stack</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
