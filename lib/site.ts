/*
 * site.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Where the site lives. Absolute URLs are needed in three places that cannot
 * work from a relative path: Open Graph images, the canonical link, and
 * sitemap.xml.
 *
 * The domain is not decided yet, so it comes from the environment rather than
 * being written into the source. On Vercel VERCEL_URL is set for every
 * deployment including previews; NEXT_PUBLIC_SITE_URL overrides it once there
 * is a real domain. Locally it falls back to the dev server, which keeps the
 * cards renderable while developing.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const siteName = 'Clement Ng'
export const siteTitle = 'Clement Ng | Senior Software Engineer'
export const siteDescription =
  'Portfolio of Clement Ng, a senior software engineer building desktop, mobile, and product-focused software experiences.'
