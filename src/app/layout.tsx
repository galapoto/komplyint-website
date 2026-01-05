import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Komplyint Oy',
  description: 'KOMPLYINT OY - Compliance readiness support for organizations',
  icons: {
    icon: '/favicon.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
