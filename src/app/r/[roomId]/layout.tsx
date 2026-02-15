import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
}

export default function DownloadRoomLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
