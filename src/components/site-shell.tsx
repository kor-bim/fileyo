'use client'

import Link from 'next/link'
import Script from 'next/script'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { LanguageSwitcher } from '@/components/language-switcher'
import { AdSenseSlot } from '@/components/adsense-slot'
import { getFooterLabels } from '@/lib/content'

interface SiteShellProps {
  children: ReactNode
}

export function SiteShell({ children }: Readonly<SiteShellProps>) {
  const pathname = usePathname()
  const locale = useLocale()
  const labels = getFooterLabels(locale)
  const isHome = pathname === '/'
  const isGuide = pathname === '/guide' || pathname.startsWith('/guide/')
  const isLegal = pathname === '/terms' || pathname === '/privacy' || pathname === '/dmca'
  const showContentAds = isGuide || isLegal

  return (
    <div className="relative z-10 min-h-screen w-full pt-5 pb-4 md:pt-6 md:pb-5">
      <div className="fixed top-3 right-3 z-30 sm:top-auto sm:right-4 sm:bottom-4">
        <LanguageSwitcher />
      </div>

      {showContentAds && (
        <Script
          id="adsense-content-pages"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3568524879465237"
          crossOrigin="anonymous"
        />
      )}

      {isHome ? (
        <main className="relative mx-auto flex w-full max-w-6xl min-w-0 flex-col items-stretch justify-start px-4">
          {children}
        </main>
      ) : showContentAds ? (
        <>
          <div className="mx-auto mb-4 w-full max-w-6xl px-4 lg:hidden">
            <AdSenseSlot minHeight={90} label="Sponsored" />
          </div>
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-4 px-4 md:gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <main className="relative flex min-w-0 flex-col items-stretch justify-start">{children}</main>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <AdSenseSlot minHeight={560} label="Sponsored" />
              </div>
            </aside>
          </div>
        </>
      ) : (
        <main className="relative mx-auto flex w-full max-w-6xl min-w-0 flex-col items-stretch justify-start px-4">
          {children}
        </main>
      )}

      <footer className="mx-auto mt-8 w-full max-w-6xl px-4 pb-4 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
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
