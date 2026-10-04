'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const WhatsAppButton = dynamic(() => import('./WhatsAppButton').then(m => m.WhatsAppButton),               { ssr: false })
const CustomCursor   = dynamic(() => import('@/components/ui/CustomCursor').then(m => m.CustomCursor),     { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress').then(m => m.ScrollProgress), { ssr: false })

export function ClientShell() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <WhatsAppButton />
    </>
  )
}
