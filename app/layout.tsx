import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lashes by Brooke | Premium Lash Extensions Bristol',
  description: 'Book your perfect lash set with Brooke in Bristol. Classic, Volume, Hybrid, and Wispy styles. Heavenly results, London energy. Expert eyelash extensions.',
  keywords: ['lash extensions Bristol', 'eyelash technician Bristol', 'Russian volume lashes', 'classic lashes Bristol', 'hybrid lashes', 'wispy lashes', 'mega volume lashes', 'lash artist Bristol'],
  authors: [{ name: 'Lashes by Brooke' }],
  openGraph: {
    title: 'Lashes by Brooke | Premium Lash Extensions Bristol',
    description: 'Heavenly results. London energy. Book your perfect lash set today.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Lashes by Brooke',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lashes by Brooke',
    description: 'Heavenly results. London energy.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0A0A0A',
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
        <div className="grain-overlay" />
      </body>
    </html>
  )
}
