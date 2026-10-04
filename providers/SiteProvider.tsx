'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { COPY_DEFAULTS, waHref, type CopyKey, type SiteCopy } from '@/lib/content/copy'
import { categories as defaultCategories, type Category } from '@/lib/data/categories'

/** Admin-managed text and departments, loaded once by the root layout and shared with every component. */
interface Site {
  copy: SiteCopy
  departments: Category[]
}

const SiteContext = createContext<Site>({ copy: COPY_DEFAULTS, departments: defaultCategories })

export function SiteProvider({ value, children }: { value: Site; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export const useCopy = <K extends CopyKey>(key: K): SiteCopy[K] => useContext(SiteContext).copy[key]
export const useDepartments = () => useContext(SiteContext).departments

/** WhatsApp link builder using the admin's number; no text = the default greeting. */
export function useWhatsApp() {
  const contact = useCopy('contact')
  return (text?: string) => waHref(contact.whatsapp_number, text ?? contact.whatsapp_greeting)
}
