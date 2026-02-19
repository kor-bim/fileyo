import type { MetadataRoute } from 'next'
import { getGuideSlugs } from '@/lib/guide-content'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${appUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${appUrl}/guide`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${appUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${appUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${appUrl}/dmca`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 }
  ]

  const guidePages: MetadataRoute.Sitemap = getGuideSlugs().map(({ slug }) => ({
    url: `${appUrl}/guide/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  return [...staticPages, ...guidePages]
}
