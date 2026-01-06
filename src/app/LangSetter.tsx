'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LangSetter() {
  const pathname = usePathname()

  useEffect(() => {
    // Update HTML lang attribute based on route
    const lang = pathname === '/en' ? 'en' : 'fi'
    document.documentElement.lang = lang
  }, [pathname])

  return null
}
