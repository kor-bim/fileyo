'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createRoom } from '@/app/actions'
import { formatBytes } from '@/lib/utils'
import { Hero } from '@/components/hero'
import { getHomeInfoContent } from '@/lib/content'

export default function HomePage() {
  const router = useRouter()
  const t = useTranslations('home')
  const locale = useLocale()
  const homeInfo = getHomeInfoContent(locale)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [password, setPassword] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [inputKey, setInputKey] = useState(0)

  const addFiles = (newFiles: FileList | File[]) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files)
  }

  const handleCreate = async () => {
    if (files.length === 0) return
    setIsCreating(true)

    try {
      const result = await createRoom(password || undefined)
      window.__fileyo_pending_files = files
      router.push(`/room/${result.roomId}`)
    } catch {
      alert(t('createFail'))
      setIsCreating(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="grid items-stretch gap-6 xl:grid-cols-2 xl:items-center">
        <Card className="order-1 mx-auto w-full xl:order-2 xl:h-full xl:min-h-[560px]">
          <CardHeader>
            <CardTitle>{t('cardTitle')}</CardTitle>
            <CardDescription>{t('cardDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 xl:flex xl:h-full xl:flex-col">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
            >
              <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm font-medium">{t('dropTitle')}</p>
              <p className="text-xs text-muted-foreground">{t('dropSub')}</p>
            </div>

            <input
              key={inputKey}
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) addFiles(e.target.files)
                setInputKey((k) => k + 1)
              }}
            />

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">{t('selectedFiles', { count: files.length })}</p>
                <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
                  {files.map((file, i) => (
                    <div
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between rounded-md border border-border bg-muted px-3 py-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile(i)
                        }}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium">{t('passwordLabel')}</label>
              <Input
                type="password"
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full xl:mt-auto" disabled={files.length === 0 || isCreating} onClick={handleCreate}>
              {isCreating ? t('creating') : t('startSharing')}
            </Button>
          </CardContent>
        </Card>

        <div className="order-2 xl:order-1 xl:h-full">
          <Hero />
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-card/80 p-6">
        <h2 className="text-xl font-semibold">{homeInfo.guideTitle}</h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
          {homeInfo.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-card/80 p-6">
        <h2 className="text-xl font-semibold">{homeInfo.faqTitle}</h2>
        <div className="mt-3 space-y-4 text-sm">
          {homeInfo.faqItems.map((item) => (
            <div key={item.q}>
              <h3 className="font-medium">{item.q}</h3>
              <p className="mt-1 text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

declare global {
  interface Window {
    __fileyo_pending_files?: File[]
  }
}
