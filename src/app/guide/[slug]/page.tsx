import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { getGuideLabels } from '@/lib/content'
import { getGuidePost, getGuideSlugs } from '@/lib/guide-content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getGuideSlugs()
}

export async function generateMetadata({ params }: Readonly<PageProps>): Promise<Metadata> {
  const { slug } = await params
  const post = getGuidePost(slug, 'ko')
  if (!post) return {}

  return {
    title: post.title,
    description: post.description
  }
}

export default async function GuidePostPage({ params }: Readonly<PageProps>) {
  const labels = getGuideLabels('ko')
  const { slug } = await params
  const post = getGuidePost(slug, 'ko')
  if (!post) notFound()

  return (
    <article className="mx-auto w-full max-w-3xl space-y-6 px-4 py-4">
      <Link href="/guide" className="inline-block text-sm text-muted-foreground hover:text-foreground">
        {labels.backToList}
      </Link>
      <header className="space-y-2">
        <p className="text-xs text-muted-foreground">{post.publishedAt}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <p className="text-sm text-muted-foreground">{post.description}</p>
      </header>
      {post.markdown ? (
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{post.markdown}</ReactMarkdown>
        </div>
      ) : (
        <div className="space-y-5">
          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-foreground/90">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      )}
    </article>
  )
}
