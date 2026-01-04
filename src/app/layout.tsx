import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KOMPLYINT OY — Compliance readiness, clearly and responsibly',
  description: 'KOMPLYINT OY - Compliance readiness support for organizations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

