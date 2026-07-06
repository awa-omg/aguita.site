import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'awa - Full Stack Developer & AI Engineer',
  description: 'Full Stack Developer and AI Engineer. Creator of Doki (OCI containers on Android), Yuuki/Yumo/ELIZA models, and Imprint Theory. Open source advocate and founder of OpceanAI.',
  keywords: ['developer', 'full stack', 'AI', 'machine learning', 'open source', 'Doki', 'Yuuki', 'OpceanAI'],
  authors: [{ name: 'awa' }],
  openGraph: {
    title: 'awa - Full Stack Developer & AI Engineer',
    description: 'Creator of Doki, Yuuki, and OpceanAI. Open source advocate democratizing AI for everyone.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d1117',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
