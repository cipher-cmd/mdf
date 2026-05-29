'use client'

import dynamic from 'next/dynamic'

const Preloader      = dynamic(() => import('./Preloader').then(m => m.Preloader),                       { ssr: false })
const WhatsAppButton = dynamic(() => import('./WhatsAppButton').then(m => m.WhatsAppButton),             { ssr: false })
const CustomCursor   = dynamic(() => import('@/components/ui/CustomCursor').then(m => m.CustomCursor),   { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress').then(m => m.ScrollProgress), { ssr: false })

export function ClientShell() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <WhatsAppButton />
    </>
  )
}
