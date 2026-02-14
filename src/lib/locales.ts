export const supportedLocales = ['ko', 'en', 'ja', 'zh-TW', 'zh-CN', 'es', 'fr', 'de', 'pt-BR'] as const

export type Locale = (typeof supportedLocales)[number]

export const defaultLocale: Locale = 'ko'

export const localeLabels: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  'pt-BR': 'Português (BR)'
}

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale)
}

const baseLanguageFallback: Record<string, Locale> = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  es: 'es',
  fr: 'fr',
  de: 'de',
  pt: 'pt-BR',
  zh: 'zh-CN'
}

function normalizeLocaleTag(tag: string): string {
  return tag.trim().replace('_', '-')
}

function mapLanguageTagToLocale(tag: string): Locale | null {
  const normalized = normalizeLocaleTag(tag)

  if (isLocale(normalized)) {
    return normalized
  }

  if (normalized.toLowerCase().startsWith('zh-')) {
    const lower = normalized.toLowerCase()
    if (lower.includes('tw') || lower.includes('hk') || lower.includes('hant')) {
      return 'zh-TW'
    }

    return 'zh-CN'
  }

  const base = normalized.split('-')[0]?.toLowerCase()
  if (!base) {
    return null
  }

  return baseLanguageFallback[base] ?? null
}

export function localeFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
  fallback: Locale = defaultLocale
): Locale {
  if (!acceptLanguage) {
    return fallback
  }

  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, qValue] = part.split(';q=')
      const quality = qValue ? Number(qValue) : 1
      return {
        tag: tag?.trim() ?? '',
        q: Number.isFinite(quality) ? quality : 0
      }
    })
    .filter((item) => item.tag && item.q > 0)
    .sort((a, b) => b.q - a.q)

  for (const candidate of candidates) {
    const mapped = mapLanguageTagToLocale(candidate.tag)
    if (mapped) {
      return mapped
    }
  }

  return fallback
}
