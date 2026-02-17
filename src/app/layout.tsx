import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { defaultLocale, isLocale } from '@/lib/locales'
import { localeSeo } from '@/lib/seo'
import { BackgroundWaveCanvas } from '@/components/background-wave-canvas'
import { SiteShell } from '@/components/site-shell'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const siteUrl = new URL(appUrl)

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

  return (
    <html lang={locale} className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3568524879465237" />
        <meta name="naver-site-verification" content="5c916b137e26861b4e42ba548688f397527620bd" />
      </head>
      <body className="font-sans antialiased">
        <BackgroundWaveCanvas />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteShell>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
