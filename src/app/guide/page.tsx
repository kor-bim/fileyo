import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import { getGuideLabels, getGuidePosts } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const labels = getGuideLabels(locale)
  return {
    title: labels.pageTitle,
    description: labels.pageDescription
  }
}

export default async function GuideIndexPage() {
  const locale = await getLocale()
  const labels = getGuideLabels(locale)
  const guidePosts = getGuidePosts(locale)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-4">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{labels.pageTitle}</h1>
        <p className="text-sm text-muted-foreground">{labels.pageLead}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {guidePosts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-xs text-muted-foreground">{post.publishedAt}</p>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
            <Link href={`/guide/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-primary">
              {labels.readMore}
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
