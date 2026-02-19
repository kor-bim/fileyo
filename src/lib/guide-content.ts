import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { getGuidePosts as getLegacyGuidePosts, type LocalizedGuidePost } from '@/lib/content'

const koGuideDir = path.join(process.cwd(), 'content', 'guide', 'ko')

export type MdGuidePost = LocalizedGuidePost & { markdown?: string }

type MdFile = {
  slug: string
  markdown: string
  frontmatter: Record<string, unknown>
}

function readMdFile(slug: string): MdFile | undefined {
  const candidates = [path.join(koGuideDir, slug, 'index.md'), path.join(koGuideDir, `${slug}.md`)]
  const filePath = candidates.find((candidate) => fs.existsSync(candidate))
  if (!filePath) return undefined

  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(raw)
  return { slug, markdown: parsed.content.trim(), frontmatter: parsed.data }
}

function listMdSlugs(): string[] {
  if (!fs.existsSync(koGuideDir)) return []
  const slugs = new Set<string>()

  for (const entry of fs.readdirSync(koGuideDir, { withFileTypes: true })) {
    if (entry.isDirectory() && fs.existsSync(path.join(koGuideDir, entry.name, 'index.md'))) {
      slugs.add(entry.name)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      slugs.add(entry.name.replace(/\.md$/, ''))
    }
  }

  return Array.from(slugs)
}

function getKoGuidePosts(): MdGuidePost[] {
  const legacyKo = getLegacyGuidePosts('ko')
  const legacyBySlug = new Map(legacyKo.map((post) => [post.slug, post]))

  const allSlugs = new Set<string>([...legacyBySlug.keys(), ...listMdSlugs()])
  const result: MdGuidePost[] = []

  for (const slug of allSlugs) {
    const legacy = legacyBySlug.get(slug)
    const md = readMdFile(slug)
    const fm = md?.frontmatter ?? {}

    result.push({
      slug,
      title: typeof fm.title === 'string' && fm.title.trim() ? fm.title : (legacy?.title ?? slug),
      description:
        typeof fm.description === 'string' && fm.description.trim() ? fm.description : (legacy?.description ?? ''),
      publishedAt:
        typeof fm.publishedAt === 'string' && fm.publishedAt.trim()
          ? fm.publishedAt
          : (legacy?.publishedAt ?? '2026-02-15'),
      sections: legacy?.sections ?? [],
      markdown: md?.markdown
    })
  }

  return result.sort((a, b) => a.slug.localeCompare(b.slug))
}

export function getGuidePosts(_locale: string): MdGuidePost[] {
  void _locale
  return getKoGuidePosts()
}

export function getGuidePost(slug: string, _locale: string): MdGuidePost | undefined {
  void _locale
  return getGuidePosts('ko').find((post) => post.slug === slug)
}

export function getGuideSlugs(): Array<{ slug: string }> {
  return getGuidePosts('ko').map((post) => ({ slug: post.slug }))
}
