'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig } from 'framer-motion'
import { COPY_DEFAULTS, waHref, type CopyKey, type SiteCopy } from '@/lib/content/copy'
import { categories as defaultCategories, type Category } from '@/lib/data/categories'

/** Admin-managed text and departments, loaded once by the root layout and shared with every component. */
interface Site {
  copy: SiteCopy
  departments: Category[]
}

const SiteContext = createContext<Site>({ copy: COPY_DEFAULTS, departments: defaultCategories })

export function SiteProvider({ value, children }: { value: Site; children: ReactNode }) {
  // reducedMotion="user": every framer animation on the site honours the visitor's reduce-motion setting
  return (
    <SiteContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SiteContext.Provider>
  )
}

export const useCopy = <K extends CopyKey>(key: K): SiteCopy[K] => useContext(SiteContext).copy[key]
export const useDepartments = () => useContext(SiteContext).departments

/**
 * WhatsApp link builder using the admin's number. With no text it uses the admin's greeting,
 * except on a department page, where it names that department so the shop knows what was being browsed.
 */
export function useWhatsApp() {
  const contact = useCopy('contact')
  const departments = useDepartments()
  const pathname = usePathname()
  const dept = pathname?.startsWith('/products/') ? departments.find(d => d.id === pathname.split('/')[2]) : undefined
  const fallback = dept ? `Hi ${contact.business_name}, I'd like to enquire about your ${dept.label} range.` : contact.whatsapp_greeting
  return (text?: string) => waHref(contact.whatsapp_number, text ?? fallback)
}
