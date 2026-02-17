import { getGuideSlugs } from '@/lib/content'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

function buildSitemapXml() {
  const now = new Date().toISOString()
  const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/guide', changefreq: 'weekly', priority: '0.8' },
    { path: '/terms', changefreq: 'monthly', priority: '0.4' },
    { path: '/privacy', changefreq: 'monthly', priority: '0.4' },
    { path: '/dmca', changefreq: 'monthly', priority: '0.4' }
  ]

  const guidePages = getGuideSlugs().map(({ slug }) => ({
    path: `/guide/${slug}`,
    changefreq: 'monthly',
    priority: '0.7'
  }))

  const urls = [...staticPages, ...guidePages]
    .map(
      ({ path, changefreq, priority }) =>
        `<url><loc>${appUrl}${path}</loc><lastmod>${now}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
}

export async function GET() {
  return new Response(buildSitemapXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600'
    }
  })
}
