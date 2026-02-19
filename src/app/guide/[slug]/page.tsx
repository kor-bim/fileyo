import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Children, isValidElement, type ReactNode } from 'react'
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

function isImageOnlyParagraph(children: ReactNode) {
  const nodes = Children.toArray(children).filter((node) => !(typeof node === 'string' && node.trim().length === 0))
  if (nodes.length !== 1) return false

  const onlyNode = nodes[0]
  if (!isValidElement(onlyNode)) return false

  if (typeof onlyNode.type === 'string' && onlyNode.type === 'img') {
    return true
  }

  if (typeof onlyNode.type === 'string' && onlyNode.type === 'a') {
    const linkChildren = Children.toArray(onlyNode.props.children).filter(
      (node) => !(typeof node === 'string' && node.trim().length === 0)
    )
    if (linkChildren.length !== 1) return false
    const linkOnlyChild = linkChildren[0]
    return isValidElement(linkOnlyChild) && typeof linkOnlyChild.type === 'string' && linkOnlyChild.type === 'img'
  }

  return false
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
        <div className="guide-markdown prose prose-neutral max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              p({ children }) {
                const imageOnly = isImageOnlyParagraph(children)
                if (imageOnly) {
                  return <span className="md-image-item">{children}</span>
                }
                return <p>{children}</p>
              }
            }}
          >
            {post.markdown}
          </ReactMarkdown>
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
