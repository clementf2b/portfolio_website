import type { Metadata } from 'next'
import '../styles/globals.css'
import { Inter, Inter_Tight } from 'next/font/google'

import Providers from './providers'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

/*
 * Heading font. The style gate rejected the editorial serif that used to sit
 * here: a warm cream ground plus a serif display plus a terracotta accent is
 * the recognisable look of a generated template, and the site had all three.
 * Inter Tight at a tight negative tracking replaces it.
 */
const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

/*
 * Metadata API — replaces the old app/header.tsx, which used the abandoned
 * Next 13-beta `head.tsx` convention and was rendered as a sibling of <body>.
 * Title and description are carried over verbatim.
 */
export const metadata: Metadata = {
  title: 'Clement Ng | Senior Software Engineer',
  description:
    'Portfolio of Clement Ng, a senior software engineer building desktop, mobile, and product-focused software experiences.',
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /*
     * suppressHydrationWarning is required: next-themes writes the theme class
     * onto <html> before React hydrates, so server and client markup differ
     * here by design.
     */
    <html lang="en" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
