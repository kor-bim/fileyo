import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { defaultLocale, isLocale, localeFromAcceptLanguage } from '@/lib/locales'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const fromCookie = cookieStore.get('NEXT_LOCALE')?.value
  const locale =
    fromCookie && isLocale(fromCookie)
      ? fromCookie
      : localeFromAcceptLanguage(headerStore.get('accept-language'), defaultLocale)

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
