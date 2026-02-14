'use client'

import { localeLabels, supportedLocales, type Locale } from '@/lib/locales'
import { useLocale, useTranslations } from 'next-intl'
import { Globe } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface LanguageSwitcherProps {
  compact?: boolean
}

export function LanguageSwitcher({ compact = false }: Readonly<LanguageSwitcherProps>) {
  const locale = useLocale() as Locale
  const t = useTranslations('common')

  const changeLocale = (nextLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`
    window.location.reload()
  }

  const items = supportedLocales.map((code) => ({
    label: localeLabels[code],
    value: code
  }))

  return (
    <Select value={locale} onValueChange={(value) => changeLocale(value as Locale)}>
      <SelectTrigger
        className={
          compact
            ? 'h-8 w-auto gap-1.5 border-border/70 bg-background/70 px-2 text-[11px] font-medium backdrop-blur transition-opacity hover:opacity-100'
            : 'h-9 w-34 bg-background/80 text-xs backdrop-blur'
        }
        aria-label={t('language')}
      >
        {compact && <Globe className="h-3.5 w-3.5" />}
        <SelectValue placeholder={t('language')} />
      </SelectTrigger>

      <SelectContent className="z-[120]">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
