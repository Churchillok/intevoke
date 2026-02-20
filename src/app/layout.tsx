import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Intevoke - The Decision Simulator for Life\'s Hard Decisions',
  description: 'Practice difficult conversations, career choices, and ethical dilemmas before they happen. Like a flight simulator for life\'s biggest decisions.',
  keywords: ['decision making', 'practice decisions', 'life simulator', 'conversation practice', 'career decisions'],
  metadataBase: new URL('https://intevoke.com'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Intevoke - The Decision Simulator',
    description: 'Practice life\'s hard decisions before they happen.',
    type: 'website',
    siteName: 'Intevoke',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intevoke - The Decision Simulator',
    description: 'Practice life\'s hard decisions before they happen.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
