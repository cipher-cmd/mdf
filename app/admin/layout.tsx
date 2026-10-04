import type { Metadata } from 'next'
import AdminLayoutShell from '@/components/admin/AdminLayoutShell'

export const metadata: Metadata = {
  title: 'MDF Enterprises · Store Manager Portal',
  description: 'Manage store products, website text, sports departments, and daily Kashmir sports blog articles.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>
}
