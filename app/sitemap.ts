/*
 * One page, so one entry. It exists because a sitemap is what tells a
 * crawler the canonical absolute URL, which a single-page site otherwise
 * has no way to state.
 */
import type { MetadataRoute } from 'next'
import { siteUrl } from '../lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
}
