/*
 * site.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Where the site lives. Absolute URLs are needed in three places that cannot
 * work from a relative path: Open Graph images, the canonical link, and
 * sitemap.xml.
 *
 * The domain comes from the environment rather than the source, so nothing
 * here changes when it does.
 *
 * VERCEL_PROJECT_PRODUCTION_URL, not VERCEL_URL. VERCEL_URL is the
 * per-deployment host, which on this project is behind deployment
 * protection: og:image pointed at it and every scraper got a 302 to a login
 * page, so the WhatsApp and LinkedIn cards arrived with no image.
 * VERCEL_PROJECT_PRODUCTION_URL is the stable production domain and is
 * public. NEXT_PUBLIC_SITE_URL overrides both once there is a real domain.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const siteName = 'Clement Ng'
export const siteTitle = 'Clement Ng | Senior Software Engineer · AI-assisted workflow'
export const siteDescription =
  'Portfolio of Clement Ng, a senior software engineer building desktop, mobile, and product-focused software with an AI-assisted workflow.'
