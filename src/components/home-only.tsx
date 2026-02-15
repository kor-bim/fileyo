'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface HomeOnlyProps {
  children: ReactNode
}

export function HomeOnly({ children }: Readonly<HomeOnlyProps>) {
  const pathname = usePathname()
  if (pathname !== '/') return null
  return <>{children}</>
}
