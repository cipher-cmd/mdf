'use client'

import dynamic from 'next/dynamic'

const WhatsAppButton = dynamic(() => import('./WhatsAppButton').then(m => m.WhatsAppButton),               { ssr: false })
const CustomCursor   = dynamic(() => import('@/components/ui/CustomCursor').then(m => m.CustomCursor),     { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress').then(m => m.ScrollProgress), { ssr: false })

export function ClientShell() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <WhatsAppButton />
    </>
  )
}
