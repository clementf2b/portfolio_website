import type { NextConfig } from 'next'

/*
 * Baseline security headers on every response. Vercel adds HSTS on its own;
 * these are the rest a static site can set without breaking anything.
 *
 * No full Content-Security-Policy: Next inlines bootstrap scripts, so a
 * useful script-src needs per-request nonces, which would turn this static
 * page into a dynamic one. frame-ancestors is the one CSP directive that
 * costs nothing here.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Nothing may frame the site; X-Frame-Options for browsers without CSP.
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
