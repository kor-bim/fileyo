import { useTranslations } from 'next-intl'
import { Download, Lock, Send, Smartphone, Upload, Zap } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  const t = useTranslations('home')
  const tUpload = useTranslations('upload')
  const tDownload = useTranslations('download')
  return (
    <section className="relative h-full overflow-hidden rounded-3xl border border-border/80 bg-linear-to-br from-primary/10 via-background to-background p-6 md:p-8 xl:min-h-[560px] xl:p-6">
      <div className="pointer-events-none absolute -left-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-30 top-5 h-54 w-110 rounded-full border border-primary/20 opacity-40" />
        <div className="absolute -right-12 top-20 h-42 w-90 rounded-full border border-primary/15 opacity-35" />
        <div className="absolute -left-24 bottom-4 h-44 w-88 rounded-full border border-primary/12 opacity-30" />
      </div>

      <div className="relative grid items-center gap-6 xl:gap-4 md:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight sm:text-5xl">
            <Image
              src="/favicon.png"
              alt="Fileyo logo"
              width={48}
              height={48}
              className="h-10 w-10 rounded-xl sm:h-12 sm:w-12"
              priority
            />
            <span>Fileyo</span>
          </h1>
          <p className="mt-3 max-w-[34ch] text-pretty text-base leading-snug font-medium text-foreground/90">
            {t('heroBrandLine')}
          </p>
          <p className="mt-2 max-w-[42ch] text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('heroSubtitle')}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 text-[12px] font-medium leading-none text-foreground/90">
              <Zap className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="leading-none">{t('heroChipFast')}</span>
            </span>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 text-[12px] font-medium leading-none text-foreground/90">
              <Send className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="leading-none">{t('heroChipDelivery')}</span>
            </span>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 text-[12px] font-medium leading-none text-foreground/90">
              <Lock className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="leading-none">{t('heroChipPassword')}</span>
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-border/80 bg-card/65 p-3">
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/65 px-3 py-2">
              <p className="text-xs text-muted-foreground">{tUpload('participantsTitle', { count: 3 })}</p>
              <span className="inline-flex items-center gap-1 text-xs text-foreground/90">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                LIVE
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg border border-border/70 bg-background/65 px-3 py-2">
              <p className="text-xs text-muted-foreground">{tUpload('sharedFilesTitle', { count: 12 })}</p>
              <p className="text-xs font-medium text-foreground/90">{tDownload('zipping')}</p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-4/5 rounded-full bg-primary" />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-border/70 bg-background/60 px-2 py-1 text-[11px] text-muted-foreground">
                PDF
              </span>
              <span className="rounded-md border border-border/70 bg-background/60 px-2 py-1 text-[11px] text-muted-foreground">
                ZIP
              </span>
              <span className="rounded-md border border-border/70 bg-background/60 px-2 py-1 text-[11px] text-muted-foreground">
                JPG
              </span>
              <span className="rounded-md border border-border/70 bg-background/60 px-2 py-1 text-[11px] text-muted-foreground">
                MP4
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Lock className="h-3.5 w-3.5 text-primary" />
                Protected
              </span>
            </div>
          </div>
        </div>

        <div className="hidden min-w-52 rounded-2xl border border-border/80 bg-background/75 p-4 backdrop-blur md:block">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Smartphone className="h-3.5 w-3.5" />
            <span>{t('startSharing')}</span>
          </div>
          <div className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-2">
            <div className="rounded-lg border border-border bg-card/70 p-2">
              <Upload className="h-4 w-4 text-primary" />
            </div>
            <div className="h-px w-full bg-linear-to-r from-primary/60 via-primary/20 to-transparent" />
            <div className="rounded-lg border border-border bg-card/70 p-2">
              <Download className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-border bg-card/60 p-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>PDF, ZIP, IMG</span>
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <Zap className="h-3 w-3" />
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">P2P Transfer • No Signup</p>
        </div>
      </div>
    </section>
  )
}
