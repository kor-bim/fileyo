import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { getLegalContent } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const legal = getLegalContent(locale)
  return {
    title: legal.terms.title,
    description: legal.terms.description
  }
}

export default async function TermsPage() {
  const locale = await getLocale()
  const legal = getLegalContent(locale)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-4">
      <h1 className="text-3xl font-semibold tracking-tight">{legal.terms.title}</h1>
      <p className="text-sm text-muted-foreground">
        {legal.updatedLabel}: {legal.updatedAt}
      </p>
      {legal.terms.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}
