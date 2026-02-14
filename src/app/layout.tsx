import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { LanguageSwitcher } from '@/components/language-switcher'
import { defaultLocale, isLocale } from '@/lib/locales'
import { localeSeo } from '@/lib/seo'
import { AdSenseSlot } from '@/components/adsense-slot'
import { BackgroundWaveCanvas } from '@/components/background-wave-canvas'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const siteUrl = new URL(appUrl)
const DEFAULT_ADSENSE_CLIENT_ID = 'ca-pub-3568524879465237'

export const viewport: Viewport = {
  themeColor: '#1f1a16'
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const safeLocale = isLocale(locale) ? locale : defaultLocale
  const seo = localeSeo[safeLocale]

  return {
    metadataBase: siteUrl,
    title: {
      default: seo.title,
      template: '%s | Fileyo'
    },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: '/' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: '/',
      siteName: 'Fileyo',
      locale: seo.ogLocale,
      type: 'website',
      images: [
        {
          url: '/logo-mark.svg',
          width: 128,
          height: 128,
          alt: 'Fileyo'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/logo-mark.svg']
    },
    icons: {
      icon: [{ url: '/favicon.png' }],
      shortcut: [{ url: '/favicon.png' }],
      apple: [{ url: '/apple-touch-icon.png' }]
    },
    category: 'technology'
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()
  const adsClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || DEFAULT_ADSENSE_CLIENT_ID

  return (
    <html lang={locale} className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3568524879465237" />
        <meta name="naver-site-verification" content="5c916b137e26861b4e42ba548688f397527620bd" />
        {adsClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="font-sans antialiased">
        <BackgroundWaveCanvas />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative z-10 min-h-screen w-full pt-5 pb-4 md:pt-6 md:pb-5">
            <div className="fixed top-3 right-3 z-30 sm:top-auto sm:right-4 sm:bottom-4">
              <LanguageSwitcher />
            </div>
            <div className="mx-auto mb-4 w-full max-w-6xl px-4 lg:hidden">
              <AdSenseSlot minHeight={90} label="Sponsored" />
            </div>
            <div className="mx-auto grid w-full max-w-[1850px] grid-cols-1 items-start gap-4 px-4 md:gap-6 lg:min-h-[calc(100vh-5.5rem)] lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center 2xl:grid-cols-[220px_minmax(0,1fr)_220px]">
              <aside className="hidden 2xl:block">
                <div className="sticky top-24">
                  <AdSenseSlot minHeight={560} label="Sponsored" />
                </div>
              </aside>
              <main className="relative flex min-w-0 flex-col items-stretch justify-start">
                {children}
              </main>

              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <AdSenseSlot minHeight={560} label="Sponsored" />
                </div>
              </aside>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
