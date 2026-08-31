"use client"

import { ThemeProvider } from 'next-themes'

/*
 * Providers
 * ─────────────────────────────────────────────────────────────────────────────
 * next-themes reads localStorage and matchMedia, so it can only run in the
 * browser.  Isolating it here is what lets app/layout.tsx stay a server
 * component — which in turn is what makes the Metadata API available.
 *
 * Only this subtree is client-rendered; the layout shell around it is not.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}
