'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const WhatsAppButton = dynamic(() => import('./WhatsAppButton').then(m => m.WhatsAppButton),               { ssr: false })

export function ClientShell() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <>
      <WhatsAppButton />
    </>
  )
}
