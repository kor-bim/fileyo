'use client'

import { useEffect, useRef } from 'react'

const DEFAULT_ADSENSE_CLIENT_ID = 'ca-pub-3568524879465237'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

interface AdSenseSlotProps {
  slot?: string
  className?: string
  minHeight?: number
  label?: string
}

export function AdSenseSlot({
  slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID,
  className = '',
  minHeight = 110,
  label = 'AD'
}: Readonly<AdSenseSlotProps>) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || DEFAULT_ADSENSE_CLIENT_ID
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!clientId || !slot || loadedRef.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      loadedRef.current = true
    } catch {
      /* ignore */
    }
  }, [clientId, slot])

  if (!clientId || !slot) {
    return (
      <div
        className={`rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-center text-xs text-muted-foreground ${className}`}
        style={{ minHeight }}
      >
        {label}
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block overflow-hidden rounded-lg border border-border"
        style={{ minHeight }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
