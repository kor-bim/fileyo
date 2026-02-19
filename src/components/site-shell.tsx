'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { LanguageSwitcher } from '@/components/language-switcher'
import { getFooterLabels } from '@/lib/content'

interface SiteShellProps {
  children: ReactNode
}

export function SiteShell({ children }: Readonly<SiteShellProps>) {
  const pathname = usePathname()
  const locale = useLocale()
  const labels = getFooterLabels(locale)
  const isHome = pathname === '/'

  return (
    <div className="relative z-10 min-h-screen w-full pt-5 pb-4 md:pt-6 md:pb-5">
      <div className="fixed top-3 right-3 z-30 sm:top-auto sm:right-4 sm:bottom-4">
        <LanguageSwitcher />
      </div>

      {isHome ? (
        <main className="relative mx-auto flex w-full max-w-6xl min-w-0 flex-col items-stretch justify-start px-4">
          {children}
        </main>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="mb-4 flex items-center justify-start">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← {labels.home}
            </Link>
          </div>
          <main className="relative min-w-0">{children}</main>
        </div>
      )}

      <footer
        className={`mx-auto mt-8 w-full px-4 pb-4 text-xs text-muted-foreground ${isHome ? 'max-w-6xl' : 'max-w-7xl'}`}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/" className="hover:text-foreground">
            {labels.home}
          </Link>
          <Link href="/guide" className="hover:text-foreground">
            {labels.guide}
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            {labels.terms}
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            {labels.privacy}
          </Link>
          <Link href="/dmca" className="hover:text-foreground">
            {labels.dmca}
          </Link>
        </div>
      </footer>
    </div>
  )
}
