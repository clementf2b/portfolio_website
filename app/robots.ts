/* Everything is public and meant to be indexed; the sitemap is the point. */
import type { MetadataRoute } from 'next'
import { siteUrl } from '../lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
