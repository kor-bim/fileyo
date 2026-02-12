import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/app/providers'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  icons: {
    icon: [{ url: '/favicon.png' }],
    apple: [{ url: '/favicon.png' }]
  },
  title: 'Fileyo'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <div className="relative w-full min-h-screen min-w-90 py-8 flex flex-col items-center justify-center">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
