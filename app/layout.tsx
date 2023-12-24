"use client" // this is a client component
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'

import Header from './header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['Helvetica', 'sans-serif'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <Header />
      <body>
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
