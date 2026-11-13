import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

export const alt = 'Muhammad Nafiz — Web Developer & Aspiring AI Engineer';
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
          background: '#0c0a12',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#f4f1fa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: '#7600ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            MN
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '2px' }}>
            MUHAMMAD NAFIZ
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1 }}>
            Web developer today,
          </div>
          <div style={{ fontSize: '64px', fontWeight: 800, color: '#a566ff', lineHeight: 1.1 }}>
            AI engineer in the making.
          </div>
          <div style={{ fontSize: '28px', color: '#9d96b0', marginTop: '12px' }}>
            {siteConfig.subTagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(244, 241, 250, 0.1)',
            paddingTop: '32px',
            fontSize: '20px',
            color: '#9d96b0',
          }}
        >
          <span>muhammadnafiz.dev</span>
          <span>Mymensingh, Bangladesh</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
