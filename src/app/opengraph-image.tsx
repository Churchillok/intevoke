import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Intevoke - The Decision Simulator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1E2761 0%, #0F172A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 32 32">
            <path d="M8 16L16 8L24 16L16 24Z" fill="#2DD4BF"/>
            <circle cx="26" cy="10" r="4" fill="#2DD4BF" opacity="0.6"/>
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: 'white',
            marginBottom: '24px',
            letterSpacing: '-2px',
          }}
        >
          intevoke
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 400,
            background: 'linear-gradient(90deg, #2DD4BF, #10B981)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          The Decision Simulator for Life&apos;s Hard Decisions
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#9CA3AF',
            marginTop: '32px',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Practice difficult conversations, career choices, and ethical dilemmas before they happen.
        </div>
      </div>
    ),
    { ...size }
  )
}
