import { revalidatePath } from 'next/cache'

/**
 * Every public page is cached as static HTML. After any admin change, throw the whole
 * cache away so the next visitor gets a freshly built page — changes go live instantly
 * while normal visits never touch the database.
 */
export function refreshWebsite() {
  revalidatePath('/', 'layout')
  // Route handlers sit outside the layout tree, so they are cleared by name
  revalidatePath('/sitemap.xml')
  revalidatePath('/llms.txt')
}
