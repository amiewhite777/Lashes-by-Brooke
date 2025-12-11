import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lashes by Brooke | Bristol\'s Finest Lash Extensions',
  description: 'Heavenly results. London energy. Premium eyelash extensions in Bristol by Brooke. Book your set today.',
  keywords: ['lash extensions', 'eyelashes', 'Bristol', 'beauty', 'Russian volume', 'classic lashes'],
  authors: [{ name: 'Lashes by Brooke' }],
  openGraph: {
    title: 'Lashes by Brooke',
    description: 'Heavenly results. London energy.',
    type: 'website',
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
