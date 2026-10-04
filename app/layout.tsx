import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'awa — containers & models for impossible places',
  description:
    'awa (awa-omg) — Full Stack Developer & AI Engineer, founder of OpceanAI. Creator of Doki, ToS, Shadow, Yuuki and Imprint Theory.',
  authors: [{ name: 'awa' }],
  openGraph: {
    title: 'awa — aguita.site',
    description:
      'Creator of Doki, Yuuki and OpceanAI. Open source infrastructure for resource-constrained environments.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#F0EBDE',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Hanken+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
