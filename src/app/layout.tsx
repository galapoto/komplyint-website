import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KOMPLYINT OY',
  description: 'KOMPLYINT OY - Compliance readiness support for organizations',
  icons: {
    icon: '/favicon.svg',
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
